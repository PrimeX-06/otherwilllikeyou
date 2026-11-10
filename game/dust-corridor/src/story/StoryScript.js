import { CONTROL_MODE } from '../control/ControlBus.js';

/**
 * The beat sheet for the phone-game segment.
 *
 * This is scenes 04–06 of the first act, seen from inside the phone: the sister
 * plays, the player watches and calls out, she hands the phone over, the player
 * plays for a while, and then a voice from the corridor ends it.
 *
 * A line can do four things beyond being read:
 *
 *   control  — hand the character over on the frame the line appears
 *   cg       — a full-frame cut in, before the line continues
 *   freeze   — stop the simulation while the line is up
 *   until    — do not appear until a condition is true; the beat before it
 *              ends and the story goes quiet in the meantime
 *   minHold  — for an `until` line, how long it stays up once it has appeared
 *
 * Timings are simulated seconds, not wall clock, so a line that says it holds
 * for four seconds holds for four seconds on any machine.
 */

export const PHONE_BEATS = [
  {
    speaker: '朱里',
    text: '这关我打了好几遍了，你看着。',
    control: CONTROL_MODE.SISTER_AI,
    hold: 6.0
  },
  { speaker: '朱里', text: '看着就行，有情况就喊我。', hold: 4.0 },
  {
    speaker: '朱里',
    text: '左边那个，别急着冲。',
    hold: 6.5
  },
  {
    speaker: '朱里',
    text: '等他们换弹再上。',
    hold: 7.0
  },
  {
    speaker: '朱里',
    text: '你看，这样一枪一个。',
    hold: 6.5
  },
  {
    speaker: '朱里',
    text: '这把枪后坐力大，点着打。',
    hold: 7.0
  },
  {
    // The beat that makes the handover a decision rather than a cut. Without
    // it the phone changes hands the moment she stops talking about the gun,
    // and the player is holding a controller they never saw asked for.
    speaker: '朱里',
    text: '等一下，这关打完。',
    hold: 4.5
  },
  { speaker: '和臣', text: '我？……行吧。', hold: 2.5 },
  {
    // The handover. `cg` is the full-frame cut of her passing the phone; the
    // controls change hands when that still is gone, not while it is up.
    speaker: '朱里',
    text: '喏，给你。',
    control: CONTROL_MODE.PLAYER,
    cg: 'handover',
    hold: 5.5
  },
  {
    speaker: '朱里',
    text: '我去看电视，你打。',
    hold: 6.0
  },
  {
    speaker: '朱里',
    text: '别站中间，贴着墙走。',
    variant: (ctx) => ctx.prompts?.refused > ctx.prompts?.accepted
      ? '刚才喊得太急了。你自己打，记得贴着墙。' : '刚才提醒得挺准。自己打也记得贴着墙。',
    hold: 8.0
  },
  {
    speaker: '朱里',
    text: '打不过就躲，别硬顶。',
    variant: (ctx) => ctx.prompts?.refused > ctx.prompts?.accepted
      ? '慢慢来，看清楚再动。' : '有情况我也喊你，别硬顶。',
    hold: 8.0
  },
  {
    // Scene 06. Not a timer the script owns: the player is allowed to keep
    // playing, and the call comes when it comes. Until it does, this line is
    // not on screen at all — the story sits between lines and the world runs.
    speaker: '妈妈',
    text: '——回家吃饭了！',
    until: (ctx) => ctx.playerTime > ctx.dinnerAt || ctx.forceCall,
    minHold: 3.0,
    freeze: true
  },
  { speaker: '和臣', text: '……这就来。', hold: 2.5 },
  {
    speaker: '朱里',
    text: '我妈叫你了，手机给我吧。',
    hold: 4.0
  }
];

// The other opening keeps both turns, with her comments following his play.
export const PLAYER_FIRST_BEATS = [
  { speaker: '朱里', text: '那你先来，我在旁边看着。', control: CONTROL_MODE.PLAYER, hold: 5 },
  { speaker: '朱里', text: '这把枪后坐力大，点着打。', hold: 6 },
  { speaker: '朱里', text: '别站中间，贴着墙走。', hold: 8 },
  { speaker: '和臣', text: '……你来试试。', hold: 2.5 },
  { speaker: '朱里', text: '给我，我打一会儿，你看。', control: CONTROL_MODE.SISTER_AI, hold: 5.5 },
  { speaker: '朱里', text: '看着就行，有情况就喊我。', hold: 4 },
  { speaker: '朱里', text: '刚才冲早了。等他们换弹再上。', hold: 7 },
  { speaker: '朱里', text: '看，贴着这面墙就好打了。', hold: 7 },
  { speaker: '和臣', text: '……再打一会儿。', hold: 2.5 },
  { speaker: '朱里', text: '喏，再试试。', control: CONTROL_MODE.PLAYER, cg: 'handover', hold: 5.5 },
  { speaker: '朱里', text: '有情况我也喊你，别硬顶。', hold: 8 },
  ...PHONE_BEATS.slice(PHONE_BEATS.findIndex((beat) => beat.speaker === '妈妈'))
];

export const REACTIONS = [
  { id: 'her-streak', when: (c) => c.controlMode === CONTROL_MODE.SISTER_AI && c.herStreak >= 3,
    lines: [{ speaker: '和臣', text: '……三个了。' }, { speaker: '朱里', text: '看见没，跟着我学。' }] },
  { id: 'her-hurt', when: (c) => c.controlMode === CONTROL_MODE.SISTER_AI && (c.herDeaths > 0 || c.hp < 0.3),
    lines: [{ speaker: '和臣', text: '小心点。' }, { speaker: '朱里', text: '知道啦，还撑得住。' }] },
  { id: 'first-kill', when: (c) => c.controlMode === CONTROL_MODE.PLAYER && c.kills > 0,
    lines: [{ speaker: '朱里', text: '不错啊。' }, { speaker: '和臣', text: '……运气好。' }] },
  { id: 'first-death', when: (c) => c.controlMode === CONTROL_MODE.PLAYER && c.deaths > 0,
    lines: [{ speaker: '朱里', text: '又冲到中间去了吧。' }, { speaker: '和臣', text: '……再来。' }] },
  { id: 'low-hp', when: (c) => c.controlMode === CONTROL_MODE.PLAYER && c.alive && c.hp < 0.3,
    lines: [{ speaker: '朱里', text: '血快没了，先缓一缓。' }] },
  { id: 'empty', when: (c) => c.controlMode === CONTROL_MODE.PLAYER && c.ammoEmpty,
    lines: [{ speaker: '和臣', text: '……没子弹了。' }] }
];

export class StoryRunner {
  constructor({ beats = PHONE_BEATS, reactions = REACTIONS, onBeat = null, onEnd = null, onBetween = null } = {}) {
    this.beats = beats;
    this.onBeat = onBeat;
    this.onEnd = onEnd;
    this.onBetween = onBetween;
    this.index = -1;
    this.timer = 0;
    // idle | holding | between   — `between` is the silence before a line whose
    // moment has not come yet (the call from the corridor, for one).
    this.phase = 'idle';
    this.running = false;
    this.reactions = reactions;
    this.used = new Set();
    this.queue = [];
    this.reaction = null;
    this.reactionsEnabled = true;
    this.clock = 0;
    this.quiet = false;
    this.currentBeat = null;
  }

  start(beats = this.beats) {
    this.beats = beats;
    this.index = -1;
    this.timer = 0;
    this.phase = 'idle';
    this.running = true;
    this.used.clear();
    this.queue.length = 0;
    this.reaction = null;
    this.reactionsEnabled = true;
    this.clock = 0;
    this.quiet = false;
    this._advance();
  }

  stop() {
    this.running = false;
    this.phase = 'idle';
    this.queue.length = 0;
    this.reaction = null;
    this.reactionsEnabled = false;
  }

  enqueue(lines, { key = null, mode = null, ttl = 8 } = {}) {
    if (!this.running || !this.reactionsEnabled || this.beats[this.index]?.freeze) return false;
    if (key && this.queue.some((item) => item.key === key)) return false;
    if (this.queue.length >= 6) return false;
    this.queue.push({ lines, key, mode, expires: this.clock + ttl });
    return true;
  }

  _collect(ctx) {
    if (!this.reactionsEnabled || this.beats[this.index]?.freeze) return;
    for (const reaction of this.reactions) {
      if (this.used.has(reaction.id) || !reaction.when(ctx)) continue;
      if (this.enqueue(reaction.lines, { key: reaction.id, mode: ctx.controlMode, ttl: 20 })) {
        this.used.add(reaction.id);
      }
    }
  }

  _react(ctx) {
    while (this.queue.length) {
      const item = this.queue.shift();
      if (item.expires < this.clock || (item.mode && item.mode !== ctx.controlMode)) continue;
      this.reaction = { ...item, index: 0 };
      this.phase = 'reacting';
      this._reactionLine();
      return true;
    }
    return false;
  }

  _reactionLine() {
    const line = this.reaction.lines[this.reaction.index];
    this.quiet = false;
    this.timer = line.hold ?? 2.2;
    this.onBeat?.(line, this.index);
  }

  /**
   * Fixed step. `ctx` carries what a line may be waiting on: how long the
   * player has actually had the controls, and whether they asked to leave.
   *
   * A line with `until` does not *appear* until its condition is true. The line
   * before it simply ends and the story goes quiet — freezing the world the
   * moment the call is *due* is a two-minute pause on screen, not a call.
   */
  update(dt, ctx = {}) {
    if (!this.running) return;
    this.clock += dt;
    this._collect(ctx);
    const beat = this.beats[this.index];
    if (!beat) return;

    if (this.phase === 'reacting') {
      this.timer -= dt;
      if (this.timer > 0) return;
      const next = this.beats[this.index + 1];
      if (!ctx.forceCall && !(next?.until && next.until(ctx))
        && ++this.reaction.index < this.reaction.lines.length) {
        this._reactionLine();
        return;
      }
      this.reaction = null;
      if (next && (!next.until || next.until(ctx))) { this._advance(ctx); return; }
      this.phase = 'between';
    }

    if (this.phase === 'between') {
      const next = this.beats[this.index + 1];
      if (next?.until && next.until(ctx)) { this._advance(ctx); return; }
      if (this._react(ctx)) return;
      if (next && next.until && !next.until(ctx)) {
        if (!this.quiet) { this.onBetween?.(beat, next); this.quiet = true; }
        return;
      }
      this._advance(ctx);
      return;
    }

    this.timer -= dt;
    if (this.timer > 0) return;

    const next = this.beats[this.index + 1];
    if (next?.until && next.until(ctx)) { this._advance(ctx); return; }
    if (this._react(ctx)) return;
    if (next && next.until && !next.until(ctx)) {
      this.phase = 'between';
      this.timer = 0;
      this.onBetween?.(beat, next);
      this.quiet = true;
      return;
    }
    this._advance(ctx);
  }

  /** Cut to the next line now — used when the player asks to leave early. */
  requestAdvance() {
    if (!this.running) return;
    const beat = this.beats[this.index];
    if (!beat) return;
    if (this.phase === 'between') { this._advance(); return; }
    this.timer = Math.min(this.timer, 0.4);
  }

  /**
   * Jump straight to the first later beat that matches.
   *
   * Used for leaving early: the lines in between are her talking to a player
   * who is still at the controls, and reading them out to somebody who has
   * already stood up is worse than skipping them.
   */
  skipTo(predicate) {
    if (!this.running) return false;
    for (let i = this.index + 1; i < this.beats.length; i++) {
      if (predicate(this.beats[i])) {
        this.queue.length = 0;
        this.reaction = null;
        this.reactionsEnabled = false;
        this.index = i - 1;
        this._advance();
        return true;
      }
    }
    return false;
  }

  _advance(ctx = {}) {
    this.index++;
    if (this.index >= this.beats.length) {
      this.running = false;
      this.phase = 'idle';
      this.onEnd?.();
      return;
    }
    const beat = this.beats[this.index];
    this.phase = 'holding';
    this.quiet = false;
    if (beat.freeze) {
      this.queue.length = 0;
      this.reactionsEnabled = false;
    }
    // A line that waited on the world still needs time on screen once it has
    // been said; its `hold` is that time, with `minHold` as the floor.
    this.timer = beat.until ? (beat.minHold ?? 2) : (beat.hold ?? 4);
    this.currentBeat = beat.variant && ctx.prompts?.issued ? { ...beat, text: beat.variant(ctx) } : beat;
    this.onBeat?.(this.currentBeat, this.index);
  }

  snapshot() {
    const beat = this.beats[this.index];
    return {
      running: this.running,
      phase: this.phase,
      index: this.index,
      total: this.beats.length,
      text: this.running ? (this.reaction?.lines[this.reaction.index]?.text ?? this.currentBeat?.text ?? null) : null,
      control: beat?.control ?? null
    };
  }
}
