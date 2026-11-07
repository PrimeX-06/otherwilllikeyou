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
    hold: 8.0
  },
  {
    speaker: '朱里',
    text: '打不过就躲，别硬顶。',
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
  {
    speaker: '朱里',
    text: '我妈叫你了，手机给我吧。',
    hold: 4.0
  }
];

export class StoryRunner {
  constructor({ beats = PHONE_BEATS, onBeat = null, onEnd = null, onBetween = null } = {}) {
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
  }

  start(beats = this.beats) {
    this.beats = beats;
    this.index = -1;
    this.timer = 0;
    this.phase = 'idle';
    this.running = true;
    this._advance();
  }

  stop() {
    this.running = false;
    this.phase = 'idle';
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
    const beat = this.beats[this.index];
    if (!beat) return;

    if (this.phase === 'between') {
      const next = this.beats[this.index + 1];
      if (next && next.until && !next.until(ctx)) return;
      this._advance();
      return;
    }

    this.timer -= dt;
    if (this.timer > 0) return;

    const next = this.beats[this.index + 1];
    if (next && next.until && !next.until(ctx)) {
      this.phase = 'between';
      this.timer = 0;
      this.onBetween?.(beat, next);
      return;
    }
    this._advance();
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
        this.index = i - 1;
        this._advance();
        return true;
      }
    }
    return false;
  }

  _advance() {
    this.index++;
    if (this.index >= this.beats.length) {
      this.running = false;
      this.phase = 'idle';
      this.onEnd?.();
      return;
    }
    const beat = this.beats[this.index];
    this.phase = 'holding';
    // A line that waited on the world still needs time on screen once it has
    // been said; its `hold` is that time, with `minHold` as the floor.
    this.timer = beat.until ? (beat.minHold ?? 2) : (beat.hold ?? 4);
    this.onBeat?.(beat, this.index);
  }

  snapshot() {
    const beat = this.beats[this.index];
    return {
      running: this.running,
      phase: this.phase,
      index: this.index,
      total: this.beats.length,
      text: this.running && beat ? beat.text : null,
      control: beat?.control ?? null
    };
  }
}
