import * as THREE from 'three';
import { RayHit } from '../physics/BVH.js';

/**
 * The sister, playing.
 *
 * A rule-driven controller for the same character the human drives. It is not
 * the enemy AI with the safety off: it produces *input* — held actions and a
 * turn for this frame — and hands them to the control bus, so it can only do
 * what a player sitting at the keyboard could do. No teleporting, no wallhack,
 * no free ammunition. If a behaviour here looks wrong, it is wrong in a way a
 * human could also produce, which is the point.
 *
 * Structure follows the enemy agent because that structure is right: senses
 * that only know what was seen or heard, a small state machine, finite turn
 * rate, aiming error that settles while a target is tracked, and an unstick
 * path for the times the navmesh and the world disagree.
 *
 * Everything about *how good she is* lives in `SISTER_PROFILE` — the numbers
 * are the characterisation, and they are meant to be retuned by the story, not
 * by the code.
 */

export const SISTER_STATE = {
  EXPLORE: 'explore',
  INVESTIGATE: 'investigate',
  ENGAGE: 'engage',
  COVER: 'cover',
  RELOAD: 'reload'
};

/**
 * Tuning. Read as "what kind of player is she".
 *
 * The defaults describe someone competent but not frightening: she wins most
 * fights she picks, misses under pressure, and takes a beat to notice.
 */
export const SISTER_PROFILE = {
  // --- body
  turnRate: 5.6,             // rad/s of yaw slew — a fast wrist, not a turret
  pitchRate: 4.0,
  sprintChase: 24,           // metres beyond which she runs to close

  // --- eyes
  fovCos: Math.cos(1.15),    // ~132° total, same cone the enemy AI uses
  sightRange: 90,

  // --- gun
  reaction: 0.30,            // seconds between seeing and the first shot
  fireTolerance: 0.075,      // radians of aim error she will accept
  aimJitter: 0.020,          // steady-state wobble, radians
  jitterRate: 2.1,
  settleTime: 1.6,           // tracking time that halves the wobble
  burst: [3, 6],
  burstGap: [0.34, 0.62],
  reloadAt: 7,               // top up when the mag gets this low and it is quiet

  // --- judgement
  lowHealth: 45,             // below this she looks for cover
  engageBand: [8, 22],       // distance she tries to hold while shooting
  strafeEvery: [1.1, 2.3]
};

const RELOAD_POLL = 0.5;
const REPATH_EVERY = 1.3;
const STUCK_WINDOW = 0.6;
const STUCK_DISTANCE = 0.22;
const INTENT_TTL = {
  COVER: 4.0, ADVANCE: 4.0, HOLD: 2.0, RELOAD: 1.2,
  LOOK_LEFT: 1.4, LOOK_RIGHT: 1.4
};

export class SisterAI {
  constructor({ bus, player, weapon, world, nav, director, rng, profile = {} }) {
    this.bus = bus;
    this.player = player;
    this.weapon = weapon;
    this.world = world;
    this.nav = nav;
    this.director = director;
    this.rng = rng;
    this.profile = { ...SISTER_PROFILE, ...profile };

    this.active = false;
    this.state = SISTER_STATE.EXPLORE;
    this.stateTime = 0;

    // ---- senses
    this.target = null;
    this.targetVisible = false;
    this.lastSeenPos = new THREE.Vector3();
    this.lastSeenTime = 99;
    this.trackTime = 0;
    this.suspicion = new THREE.Vector3();
    this.hasSuspicion = false;
    this.suspicionTime = 0;
    this._seenDamage = null;
    this._scanYaw = 0;
    this._scanTimer = 0;

    // ---- pathing
    this.path = [];
    this.pathIndex = 0;
    this.repathTimer = 0;
    this._lastPos = new THREE.Vector3();
    this._stuckTimer = 0;
    this._stuckCount = 0;
    this._wantsMove = false;

    // ---- cover
    this.coverPoint = new THREE.Vector3();
    this.hasCover = false;
    this.peeking = false;
    this.peekTimer = 0;

    // ---- gun state
    this._burstLeft = 0;
    this._burstTimer = 0;
    this._firing = false;
    this._reloadPoll = 0;
    this._aimNoisePhase = rng.next() * 100;
    this._desired = { yaw: 0, pitch: 0 };
    this._adsHeld = false;
    this._strafeDir = rng.next() < 0.5 ? -1 : 1;
    this._strafeTimer = 0;

    // ---- intents (player prompts)
    this.intent = null;        // { kind, ttl }

    this.onFeedback = null;    // (text, ok) => void
    this._hit = new RayHit();
    this._eye = new THREE.Vector3();
  }

  // ------------------------------------------------------------------ lifecycle

  onControlTaken(active) {
    this.active = active;
    if (active) {
      this._lastPos.copy(this.player.position);
      this._stuckTimer = 0;
      this._stuckCount = 0;
      this.path.length = 0;
      this.pathIndex = 0;
      this._firing = false;
      this._burstLeft = 0;
      this._burstTimer = 0;
      // Re-acquire from scratch: whatever she "knew" belongs to the previous
      // turn at the controls, and pretending otherwise hands her free
      // information about a fight she was not watching.
      this.target = null;
      this.targetVisible = false;
      this.trackTime = 0;
      this.hasSuspicion = false;
      this.hasCover = false;
      this.state = SISTER_STATE.EXPLORE;
      this.stateTime = 0;
      this.intent = null;
    } else {
      this._firing = false;
      this.path.length = 0;
    }
  }

  /** The one thing the frame loop calls. Fixed step, 120 Hz. */
  update(dt) {
    if (!this.active) return;
    const bus = this.bus;
    bus.aiBeginStep();

    this.stateTime += dt;
    this.trackTime = Math.max(0, this.trackTime);
    this._tickIntent(dt);

    // Dead: the match is waiting on a keypress that only a human would give.
    // Press it for her, at a rate that cannot outrun the respawn delay.
    if (!this.player.alive) {
      this._deadTimer = (this._deadTimer ?? 0) + dt;
      if (this._deadTimer > 0.35) {
        this._deadTimer = 0;
        bus.aiPress('jump');
      }
      this._firing = false;
      return;
    }

    this._readDamage();
    this._sense(dt);
    this._think(dt);
    this._aim(dt);
    this._move(dt);
    this._shoot(dt);
  }

  // -------------------------------------------------------------------- senses

  _eyePoint(out) {
    const p = this.player;
    out.copy(p.position);
    out.y += p.crouched ? 0.86 : 1.62;
    return out;
  }

  /** Taking a hit tells her roughly where it came from — nothing more. */
  _readDamage() {
    const dmg = this.player.lastDamage;
    if (!dmg || dmg === this._seenDamage) return;
    this._seenDamage = dmg;
    const src = dmg.source;
    if (src?.position) {
      this.suspicion.copy(src.position);
      this.hasSuspicion = true;
      this.suspicionTime = 0;
      this._scanYaw = yawTo(src.position.x - this.player.position.x, src.position.z - this.player.position.z);
      this._scanTimer = 1.2;
    }
  }

  _sense(dt) {
    const p = this.player;
    const eye = this._eyePoint(this._eye);
    let best = null;
    let bestScore = -Infinity;

    for (const c of this.director.characters) {
      if (!c.alive || c.team === p.team) continue;
      const aimPoint = this._aimPointFor(c, _probe);
      if (!this._canSee(eye, aimPoint)) continue;

      const dist = p.position.distanceTo(c.position);
      const centrality = this._centrality(c.position);
      const score = 100 - dist * 0.8 + centrality * 24 + (c === this.target ? 18 : 0);
      if (score > bestScore) { bestScore = score; best = c; }
    }

    if (best) {
      if (best !== this.target) this.trackTime = 0;
      this.target = best;
      this.targetVisible = true;
      this.lastSeenPos.copy(best.position);
      this.lastSeenTime = 0;
      this.trackTime += dt;
      this.hasSuspicion = false;
    } else {
      this.targetVisible = false;
      this.lastSeenTime += dt;
      this.trackTime = Math.max(0, this.trackTime - dt * 1.5);
      if (this.lastSeenTime > 6) this.target = null;
    }
    this.suspicionTime += dt;
  }

  _aimPointFor(character, out) {
    character.getEyePosition(out);
    out.y -= 0.26;                 // chest, not eyeballs
    return out;
  }

  _canSee(eye, point) {
    _dir.subVectors(point, eye);
    const dist = _dir.length();
    if (dist > this.profile.sightRange || dist < 1e-3) return false;
    _dir.multiplyScalar(1 / dist);
    if (this._centrality(point) < this.profile.fovCos) return false;
    return !this.world.bvh.raycast(eye, _dir, dist - 0.3, this._hit).hit;
  }

  _centrality(point) {
    const yaw = this.player.yaw;
    const dx = point.x - this.player.position.x;
    const dz = point.z - this.player.position.z;
    const len = Math.hypot(dx, dz) || 1e-4;
    return (dx / len) * -Math.sin(yaw) + (dz / len) * -Math.cos(yaw);
  }

  // --------------------------------------------------------------------- think

  _think(dt) {
    const p = this.player;
    const intent = this.intent;

    // Prompts outrank the machine for as long as they last, but never outrank
    // survival: a sister who keeps walking into fire because someone typed
    // "往前走" is not a character, it is a bug.
    if (intent && intent.kind === 'COVER') {
      this._enter(SISTER_STATE.COVER);
      return;
    }
    if (intent && intent.kind === 'HOLD') {
      this._setStateIfChanged(SISTER_STATE.ENGAGE);
      return;
    }
    if (intent && intent.kind === 'RELOAD') this._pollReload(dt, true);

    if (this._needsReload()) {
      this._setStateIfChanged(SISTER_STATE.RELOAD);
      this._pollReload(dt, true);
      return;
    }

    if (p.health < this.profile.lowHealth && this.target && this.state !== SISTER_STATE.COVER) {
      this._enter(SISTER_STATE.COVER);
      return;
    }

    if (this.targetVisible && this.target) {
      this._setStateIfChanged(SISTER_STATE.ENGAGE);
      return;
    }

    if (this.hasSuspicion && this.suspicionTime < 12) {
      this._setStateIfChanged(SISTER_STATE.INVESTIGATE);
      return;
    }

    if (this.state === SISTER_STATE.COVER && this.stateTime < 3.2) return;

    this._setStateIfChanged(SISTER_STATE.EXPLORE);
  }

  _setStateIfChanged(next) {
    if (this.state === next) return;
    this.state = next;
    this.stateTime = 0;
    this.path.length = 0;
    this.pathIndex = 0;
    this.repathTimer = 0;
    if (next !== SISTER_STATE.COVER) this.hasCover = false;
  }

  _enter(next) { this._setStateIfChanged(next); }

  _needsReload() {
    const w = this.weapon;
    if (w.reloading) return true;
    if (w.ammo <= 0) return true;
    return !this.targetVisible && w.ammo <= this.profile.reloadAt;
  }

  _pollReload(dt, want) {
    this._reloadPoll -= dt;
    if (!want || this._reloadPoll > 0) return;
    this._reloadPoll = RELOAD_POLL;
    this.bus.aiPress('reload');
  }

  // ----------------------------------------------------------------------- aim

  _aim(dt) {
    const p = this.player;
    const prof = this.profile;
    const want = this._solveAim(dt);

    // Solve against where the body is going to be, not where it was when this
    // step began. The turn asked for here is applied by the next rendered
    // frame, and a fixed step runs up to five times per frame: without this the
    // same correction is asked for again on every step, the camera overshoots
    // by that factor, and the view oscillates at frame rate.
    const pending = this.bus.aiPendingLook?.() ?? { x: 0, y: 0 };
    const yawNow = p.yaw - pending.x;
    const pitchNow = p.pitch - pending.y;

    let dy = wrapAngle(want.yaw - yawNow);
    let dp = want.pitch - pitchNow;

    const maxYaw = prof.turnRate * dt;
    const maxPitch = prof.pitchRate * dt;
    dy = THREE.MathUtils.clamp(dy, -maxYaw, maxYaw);
    dp = THREE.MathUtils.clamp(dp, -maxPitch, maxPitch);

    // `player.look` subtracts, the way a right-handed mouse delta does.
    this.bus.aiLookBy(-dy, -dp);

    // Aiming down sights only once the shot is already lined up: a scope that
    // slows the turn while she is still swinging onto a target is a scope that
    // makes her worse. Hysteresis, because the threshold is a boundary the
    // residual crosses constantly while tracking — without it the sight pumps
    // in and out and the zoom reads as the camera breathing.
    const ranged = this.state === SISTER_STATE.ENGAGE && this.targetVisible
      && this.target.position.distanceTo(p.position) > 12;
    if (ranged && Math.abs(dy) < 0.05) this._adsHeld = true;
    else if (!ranged || Math.abs(dy) > 0.12) this._adsHeld = false;
    if (this._adsHeld) this.bus.aiHold('aim');
  }

  /** Where she wants to be looking this step, jitter included. */
  _solveAim(dt) {
    const p = this.player;
    let wantYaw = p.yaw;
    let wantPitch = p.pitch;

    if (this.target && this.targetVisible) {
      const point = this._aimPointFor(this.target, _probe);
      _dir.subVectors(point, this._eyePoint(this._eye));
      const dist = _dir.length() || 1e-4;
      wantYaw = yawTo(_dir.x, _dir.z);
      wantPitch = Math.asin(THREE.MathUtils.clamp(_dir.y / dist, -1, 1));
    } else if (this._scanTimer > 0) {
      wantYaw = this._scanYaw;
      wantPitch = 0;
    } else if (this.hasSuspicion) {
      _dir.subVectors(this.suspicion, p.position);
      wantYaw = yawTo(_dir.x, _dir.z);
      wantPitch = 0;
    } else if (this.path.length && this.pathIndex < this.path.length) {
      const wp = this.path[this.pathIndex];
      wantYaw = yawTo(wp.x - p.position.x, wp.z - p.position.z);
      wantPitch = 0;
    }

    // Wobble: strongest on the first shot of an engagement, halved once she has
    // held the target for a while. This is what makes her miss.
    this._aimNoisePhase += dt * this.profile.jitterRate;
    const settle = 1 / (1 + this.trackTime * this.profile.settleTime);
    const jitter = this.profile.aimJitter * (0.35 + settle);
    wantYaw += Math.sin(this._aimNoisePhase * 2.7) * jitter;
    wantPitch += Math.sin(this._aimNoisePhase * 3.9 + 1.3) * jitter * 0.6;

    return this._desired = { yaw: wantYaw, pitch: wantPitch };
  }

  // ---------------------------------------------------------------------- move

  _move(dt) {
    const bus = this.bus;
    this._wantsMove = false;

    _wish.set(0, 0, 0);
    let sprint = false;

    switch (this.state) {
      case SISTER_STATE.ENGAGE: this._moveEngage(dt); break;
      case SISTER_STATE.COVER: this._moveCover(dt); break;
      case SISTER_STATE.RELOAD: this._moveHold(); break;
      case SISTER_STATE.INVESTIGATE: this._moveInvestigate(dt); break;
      default: this._moveExplore(dt); break;
    }

    if (this.intent?.kind === 'HOLD') _wish.set(0, 0, 0);
    if (this.state === SISTER_STATE.COVER && this.hasCover && this._atCover()) _wish.set(0, 0, 0);

    if (_wish.lengthSq() > 1e-6) {
      this._wantsMove = true;
      this._toLocalKeys(_wish.x, _wish.z);
      const dist = this._pathRemaining();
      sprint = this.state === SISTER_STATE.COVER
        ? dist > 6
        : (this.state === SISTER_STATE.EXPLORE || this.state === SISTER_STATE.INVESTIGATE) && dist > this.profile.sprintChase;
      if (sprint) bus.aiHold('sprint');
    }

    // Crouching behind cover, and while waiting out a reload in the open.
    if (this.state === SISTER_STATE.COVER && this._atCover() && !this.peeking) bus.aiHold('crouch');

    this._unstick(dt);
  }

  _moveExplore(dt) {
    this.repathTimer -= dt;
    if (!this.path.length || this.pathIndex >= this.path.length || this.repathTimer <= 0) {
      const point = this.nav.randomPoint(this.rng, _dest, this.player.position, 16);
      if (point) this._repath(point);
      this.repathTimer = REPATH_EVERY + this.rng.next() * 1.4;
    }
    this._followPath();
  }

  _moveInvestigate(dt) {
    this.repathTimer -= dt;
    if (this.player.position.distanceTo(this.suspicion) < 3.2) {
      this.hasSuspicion = false;
      this._setStateIfChanged(SISTER_STATE.EXPLORE);
      return;
    }
    if (!this.path.length || this.pathIndex >= this.path.length || this.repathTimer <= 0) {
      this._repath(this.suspicion);
      this.repathTimer = REPATH_EVERY;
    }
    this._followPath();
  }

  _moveEngage(dt) {
    const t = this.target;
    if (!t) return;
    _dir.subVectors(t.position, this.player.position);
    _dir.y = 0;
    const dist = _dir.length() || 1e-4;
    _dir.multiplyScalar(1 / dist);
    _side.set(-_dir.z, 0, _dir.x).multiplyScalar(this._strafeDir);

    // Hold a band: push in when far, ease out when she is standing in his lap.
    const [near, far] = this.profile.engageBand;
    const push = dist > far ? 0.8 : dist < near ? -0.8 : 0;

    _wish.copy(_side).multiplyScalar(0.9).addScaledVector(_dir, push);
    if (_wish.lengthSq() > 1e-6) _wish.normalize();

    // Do not strafe into a wall and stand there. If the side step is not
    // walkable, take the other side.
    _probe.copy(this.player.position).addScaledVector(_side, 1.6);
    if (!this.nav.isWalkableAt(_probe.x, _probe.z)) {
      this._strafeDir *= -1;
      _wish.multiplyScalar(-1);
    }

    this._strafeTimer -= dt;
    if (this._strafeTimer <= 0) {
      this._strafeTimer = this.profile.strafeEvery[0]
        + this.rng.next() * (this.profile.strafeEvery[1] - this.profile.strafeEvery[0]);
      if (this.rng.next() < 0.45) this._strafeDir *= -1;
    }
  }

  _moveCover(dt) {
    if (!this.hasCover) {
      const threat = this.target ? this.target.position : (this.hasSuspicion ? this.suspicion : null);
      const found = threat ? this.nav.findCover(this.player.position, threat, 18, this.rng, _dest) : null;
      if (found) {
        this.coverPoint.copy(found);
        this.hasCover = true;
        this._repath(found);
      } else if (threat) {
        // Nowhere better than here: back away from the threat instead.
        _dir.subVectors(this.player.position, threat);
        _dir.y = 0;
        if (_dir.lengthSq() > 1e-6) _wish.copy(_dir).normalize();
        return;
      } else {
        this._setStateIfChanged(SISTER_STATE.EXPLORE);
        return;
      }
    }

    if (this._atCover()) {
      this.peekTimer -= dt;
      if (this.peekTimer <= 0) {
        this.peeking = !this.peeking;
        this.peekTimer = this.peeking ? 1.0 + this.rng.next() * 1.2 : 0.8 + this.rng.next() * 1.4;
      }
      if (this.player.health > this.profile.lowHealth + 25 && this.stateTime > 4.5) {
        this.hasCover = false;
        this._setStateIfChanged(SISTER_STATE.ENGAGE);
      }
      return;
    }

    if (!this.path.length || this.pathIndex >= this.path.length) this._repath(this.coverPoint);
    this._followPath();
  }

  _moveHold() { _wish.set(0, 0, 0); }

  _atCover() { return this.player.position.distanceTo(this.coverPoint) < 1.3; }

  _repath(goal) {
    const p = this.nav.findPath(
      this.player.position.x, this.player.position.z, goal.x, goal.z, this.path
    );
    this.pathIndex = 0;
    if (!p) this.path.length = 0;
  }

  _followPath() {
    if (!this.path.length || this.pathIndex >= this.path.length) return;
    const wp = this.path[this.pathIndex];
    const dx = wp.x - this.player.position.x;
    const dz = wp.z - this.player.position.z;
    const d2 = dx * dx + dz * dz;
    const arrive = this.pathIndex === this.path.length - 1 ? 0.7 : 1.0;
    if (d2 < arrive * arrive) {
      this.pathIndex++;
      return;
    }
    const inv = 1 / Math.sqrt(d2);
    _wish.set(dx * inv, 0, dz * inv);
  }

  _pathRemaining() {
    if (!this.path.length || this.pathIndex >= this.path.length) return 0;
    const wp = this.path[this.path.length - 1];
    return this.player.position.distanceTo(wp);
  }

  /**
   * World direction to the eight keys the character actually has.
   *
   * Movement is expressed in the body's own frame, so a direction has to be
   * projected onto forward and right before it can be asked for.
   */
  _toLocalKeys(dx, dz) {
    const yaw = this.player.yaw;
    const fx = -Math.sin(yaw), fz = -Math.cos(yaw);
    const rx = Math.cos(yaw), rz = -Math.sin(yaw);
    const f = dx * fx + dz * fz;
    const r = dx * rx + dz * rz;
    const T = 0.38;
    if (f > T) this.bus.aiHold('forward');
    else if (f < -T) this.bus.aiHold('back');
    if (r > T) this.bus.aiHold('right');
    else if (r < -T) this.bus.aiHold('left');
  }

  _unstick(dt) {
    this._stuckTimer += dt;
    if (this._stuckTimer < STUCK_WINDOW) return;
    const moved = this.player.position.distanceTo(this._lastPos);
    if (this._wantsMove && moved < STUCK_DISTANCE) {
      this._stuckCount++;
      this.path.length = 0;
      this.pathIndex = 0;
      this._strafeDir *= -1;
      this.repathTimer = 0;
      // Repeated failures in the same spot are usually a lip she can hop.
      if (this._stuckCount >= 3) {
        this.bus.aiPress('jump');
        this._stuckCount = 0;
      }
    } else if (moved > STUCK_DISTANCE) {
      this._stuckCount = 0;
    }
    this._lastPos.copy(this.player.position);
    this._stuckTimer = 0;
  }

  // --------------------------------------------------------------------- shoot

  _shoot(dt) {
    const prof = this.profile;
    const w = this.weapon;

    const allowed = (this.state === SISTER_STATE.ENGAGE
      || (this.state === SISTER_STATE.COVER && this.peeking))
      && this.targetVisible && this.target && !w.reloading && w.ammo > 0;

    if (!allowed) {
      this._firing = false;
      this._burstLeft = 0;
      this._burstTimer = 0;
      return;
    }

    // Reaction time, measured from the moment she could actually shoot.
    if (this.trackTime < prof.reaction) return;

    const t = this.target;
    const aimErr = Math.abs(wrapAngle(yawTo(
      t.position.x - this.player.position.x,
      t.position.z - this.player.position.z
    ) - this.player.yaw));
    if (aimErr > prof.fireTolerance) {
      this._firing = false;
      return;
    }

    this._burstTimer -= dt;
    if (this._burstTimer > 0) {
      if (this._firing) this.bus.aiHold('fire');
      return;
    }

    if (this._firing) {
      this._firing = false;
      this._burstTimer = rand(this.rng, prof.burstGap);
    } else {
      this._firing = true;
      const n = Math.round(rand(this.rng, prof.burst));
      this._burstTimer = n * 0.0857;
    }
    if (this._firing) this.bus.aiHold('fire');
  }

  // ------------------------------------------------------------------- prompts

  /**
   * A prompt from the player.
   *
   * Intents are short-lived and are checked against what the game will allow —
   * a prompt is a suggestion about where to put her attention, not a cheat
   * code. Anything she cannot do right now is refused out loud and the fight
   * carries on.
   */
  issueIntent(kind) {
    const ttl = INTENT_TTL[kind];
    if (!ttl) return this._feedback('没听懂这句话。', false);

    if (kind === 'COVER' && !this.target && !this.hasSuspicion) {
      return this._feedback('没看到敌人，先别躲。', false);
    }
    if (kind === 'ADVANCE' && this.state === SISTER_STATE.RELOAD) {
      return this._feedback('正在换弹，等一下。', false);
    }
    if (kind === 'LOOK_LEFT' || kind === 'LOOK_RIGHT') {
      // Turning to look is something a body can do; seeing through the wall it
      // turns toward is not. The scan only changes where she is facing.
      this._scanYaw = this.player.yaw + (kind === 'LOOK_LEFT' ? 0.9 : -0.9);
      this._scanTimer = ttl;
      this.intent = { kind, ttl };
      return this._feedback(kind === 'LOOK_LEFT' ? '好，我看左边。' : '好，我看右边。', true);
    }

    if (kind === 'RELOAD') {
      const w = this.weapon;
      if (w.reloading) return this._feedback('已经在换了。', false);
      if (w.ammo >= w.spec.magSize) return this._feedback('弹匣是满的。', false);
      if (w.reserve <= 0) return this._feedback('没有备弹了。', false);
      // No key press here: an edge raised outside the fixed step can be retired
      // by `endFrame` before anything reads it. The intent is picked up on the
      // next simulation step, where the press is guaranteed to be seen.
      this.intent = { kind, ttl };
      return this._feedback('好，换弹。', true);
    }

    this.intent = { kind, ttl };
    if (kind === 'COVER') return this._feedback('好，找掩体。', true);
    if (kind === 'ADVANCE') {
      this.path.length = 0;
      this.repathTimer = 0;
      return this._feedback('好，往前走。', true);
    }
    return this._feedback('好。', true);
  }

  _tickIntent(dt) {
    this._scanTimer = Math.max(0, this._scanTimer - dt);
    if (!this.intent) return;
    this.intent.ttl -= dt;
    if (this.intent.ttl <= 0) this.intent = null;
  }

  _feedback(text, ok) {
    this.onFeedback?.(text, ok);
    return { ok, text };
  }

  // -------------------------------------------------------------------- report

  snapshot() {
    const p = this.player;
    return {
      active: this.active,
      state: this.state,
      targetId: this.target?.id ?? null,
      visible: this.targetVisible,
      ammo: this.weapon.ammo,
      reserve: this.weapon.reserve,
      reloading: this.weapon.reloading,
      health: Math.round(p.health),
      alive: p.alive,
      position: { x: +p.position.x.toFixed(2), y: +p.position.y.toFixed(2), z: +p.position.z.toFixed(2) },
      stuck: this._stuckCount,
      intent: this.intent?.kind ?? null,
      held: this.bus.aiSnapshot()
    };
  }
}

function rand(rng, [lo, hi]) { return lo + rng.next() * (hi - lo); }

function yawTo(dx, dz) { return Math.atan2(-dx, -dz); }

function wrapAngle(a) {
  while (a > Math.PI) a -= Math.PI * 2;
  while (a < -Math.PI) a += Math.PI * 2;
  return a;
}

const _dir = new THREE.Vector3();
const _wish = new THREE.Vector3();
const _side = new THREE.Vector3();
const _dest = new THREE.Vector3();
const _probe = new THREE.Vector3();
