/**
 * Control arbitration between the human and the sister AI.
 *
 * The whole game reads its controls through one object — `Player` asks it for
 * `action()` and the frame loop asks it for `actionPressed()` / `consumeLook()`
 * / `endFrame()`. This sits in that slot and forwards to whichever controller
 * currently owns the character, so nothing downstream has to know that the
 * owner changed.
 *
 * The surface is deliberately identical to `Input`'s. Everything that is not
 * about control — pointer lock, focus handling, the automation seam — is
 * delegated to the raw device layer unchanged.
 *
 * Switching is a transaction, not a flag flip. Both sides are disarmed first
 * (held keys, mouse buttons, accumulated look, the AI's pending edges), then
 * the owner changes. Nothing about the character, the weapon, the enemies or
 * the clock is touched: a handover must not be a restart.
 */

export const CONTROL_MODE = {
  PLAYER: 'PLAYER',
  SISTER_AI: 'SISTER_AI'
};

export class ControlBus {
  constructor(raw) {
    this.raw = raw;
    this.mode = CONTROL_MODE.PLAYER;
    this.sister = null;

    /** Set by whoever owns the HUD badge. */
    this.onModeChange = null;

    // ---- AI side state
    this._aiHeld = new Set();
    this._aiEdges = new Set();
    this._aiLook = { x: 0, y: 0 };
    this._look = { x: 0, y: 0 };

    // ---- pointer lock, filtered
    //
    // The game treats "lost the mouse" as "pause the match", which is right for
    // a human and wrong for the AI: handing control to the sister releases the
    // lock on purpose, and pausing the match for it would defeat the point.
    // Only the human's own loss is forwarded.
    this._lockChange = null;
    this._lockError = null;
    raw.onPointerLockChange = (locked) => {
      if (locked) this._lockChange?.(true);
      else if (this.mode === CONTROL_MODE.PLAYER) this._lockChange?.(false);
    };
    raw.onPointerLockError = () => {
      if (this.mode === CONTROL_MODE.PLAYER) this._lockError?.();
    };
  }

  // ------------------------------------------------------- delegated surface

  get onPointerLockChange() { return this._lockChange; }
  set onPointerLockChange(fn) { this._lockChange = fn; }

  get onPointerLockError() { return this._lockError; }
  set onPointerLockError(fn) { this._lockError = fn; }

  get locked() { return this.raw.locked; }
  get enabled() { return this.raw.enabled; }
  set enabled(v) { this.raw.enabled = !!v; }
  get discardedLookSpikes() { return this.raw.discardedLookSpikes; }

  get aiControlled() { return this.mode === CONTROL_MODE.SISTER_AI; }

  /**
   * The mouse belongs to the human. While the AI is playing there is nothing to
   * aim with, and holding the lock would swallow every keystroke — including
   * the ones going into the prompt box.
   */
  requestLock() {
    if (this.aiControlled) return Promise.resolve();
    return this.raw.requestLock();
  }

  releaseLock() { this.raw.releaseLock(); }

  /** Test seam, unchanged — the harness pushes input as if it were a device. */
  inject(payload) { this.raw.inject(payload); }

  // ------------------------------------------------------------- arbitration

  /**
   * Hand the character to the other controller.
   *
   * `gesture` says whether a human asked for this directly — a click on the
   * badge, a key press. Only a gesture may take the mouse back: a pointer lock
   * requested from a timer is refused by the browser, and a story beat that
   * tried it would leave the match paused for a reason nobody could see.
   *
   * Returns false when the mode was already current, so a caller can tell a
   * real handover from a no-op without comparing strings itself.
   */
  setMode(next, { gesture = false } = {}) {
    if (next !== CONTROL_MODE.PLAYER && next !== CONTROL_MODE.SISTER_AI) return false;
    if (next === this.mode) return false;
    const previous = this.mode;

    // The mode flips before the lock is released. `pointerlockchange` is
    // delivered asynchronously, but the handler reads `mode` at delivery time
    // and a handover to the AI that still looked like the human's would pause
    // the match on the way out.
    this.mode = next;
    this._disarmAll();

    // The human's device layer goes quiet while the sister plays: not just
    // ignored, actually disabled, or its keydown handler keeps calling
    // preventDefault and the prompt box cannot be typed into.
    this.raw.enabled = !this.aiControlled;
    if (!this.aiControlled) this.raw.keys?.clear();

    this.sister?.onControlTaken(this.aiControlled);
    this.onModeChange?.(next, previous, gesture);
    return true;
  }

  toggleMode(options) {
    return this.setMode(this.aiControlled ? CONTROL_MODE.PLAYER : CONTROL_MODE.SISTER_AI, options);
  }

  /**
   * Everything either side was holding, dropped together.
   *
   * A trigger held down across a handover is the classic way a character ends
   * up firing forever, and a stale `pressedThisFrame` entry is the classic way
   * a reload fires on the frame after the switch.
   */
  _disarmAll() {
    this._aiHeld.clear();
    this._aiEdges.clear();
    this._aiLook.x = 0;
    this._aiLook.y = 0;
    this._look.x = 0;
    this._look.y = 0;

    const raw = this.raw;
    raw.keys?.clear();
    raw.pressedThisFrame?.clear();
    raw.releasedThisFrame?.clear();
    raw.buttons = [false, false, false];
    raw.buttonsPressed = [false, false, false];
    raw.mouseDX = 0;
    raw.mouseDY = 0;
    raw.wheel = 0;

    // Losing the mouse is the only way the browser hands back Ctrl and Escape,
    // so a handover always gives it back rather than keeping it for a
    // controller that cannot use it.
    if (raw.locked) raw.releaseLock();
  }

  // ------------------------------------------------------------------ reads

  action(name) {
    if (this.aiControlled) return this._aiHeld.has(name);
    return this.raw.action(name);
  }

  actionPressed(name) {
    if (this.aiControlled) {
      if (!this._aiEdges.has(name)) return false;
      this._aiEdges.delete(name);
      return true;
    }
    return this.raw.actionPressed(name);
  }

  /**
   * Look for this frame, in radians.
   *
   * The device path converts pixels through the player's sensitivity setting;
   * the AI already speaks in radians and must not be scaled by a mouse
   * preference it never had. Both are consumed once per rendered frame.
   */
  consumeLook() {
    if (this.aiControlled) {
      this._look.x = this._aiLook.x;
      this._look.y = this._aiLook.y;
      this._aiLook.x = 0;
      this._aiLook.y = 0;
      return this._look;
    }
    return this.raw.consumeLook();
  }

  endFrame() {
    this.raw.endFrame();
    // The AI rebuilds its held set every fixed step, so only the edges need
    // retiring here — and only the ones nobody read, exactly like the device
    // layer's own bookkeeping.
    this._aiEdges.clear();
  }

  // -------------------------------------------------------------- AI writes

  /** Called once per fixed step, before the AI decides anything. */
  aiBeginStep() {
    this._aiHeld.clear();
  }

  aiHold(name) { this._aiHeld.add(name); }

  aiPress(name) { this._aiEdges.add(name); }

  /** Accumulate a turn, in radians, applied by the next `consumeLook()`. */
  aiLookBy(dx, dy) {
    this._aiLook.x += dx;
    this._aiLook.y += dy;
  }

  /**
   * The turn that has been asked for but not yet applied.
   *
   * The AI steps at a fixed rate and the look is consumed once per rendered
   * frame, so there is always a residue. Whoever solves the next aim has to
   * measure the error against the body it will actually have, or every fixed
   * step re-asks for a correction that is already in flight — two steps per
   * frame means the camera overshoots by double and swings back, which is a
   * 15-degree oscillation at frame rate, not a wobble.
   */
  aiPendingLook() {
    return this._aiLook;
  }

  /** Held actions, for the debug badge and for tests. */
  aiSnapshot() {
    return [...this._aiHeld];
  }
}
