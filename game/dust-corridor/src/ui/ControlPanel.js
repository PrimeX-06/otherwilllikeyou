import './control.css';

/**
 * What the player can say to her while she plays.
 *
 * Deliberately a sibling of the HUD rather than part of it: the upstream HUD is
 * a tuned thing that writes only when a value changes, and the one piece of
 * interface this project adds should not risk its frame budget. Both are DOM,
 * both sit above the canvas, and neither knows about the other.
 *
 * There is no badge saying who is holding the controller. The story says it —
 * she says "喏，给你" and the game changes hands on that line — and a label
 * repeating it in the corner is interface explaining a scene that is already
 * clear. What is left is the prompt strip and her reply, in the band between
 * the crosshair and the bottom corners where the game's own readouts live.
 */

const PROMPTS = [
  { kind: 'LOOK_LEFT', label: '左边有人' },
  { kind: 'LOOK_RIGHT', label: '右边有人' },
  { kind: 'COVER', label: '先躲一下' },
  { kind: 'RELOAD', label: '子弹不多了' },
  { kind: 'ADVANCE', label: '往前走' }
];

const FEEDBACK_LIFE = 3.4;

export class ControlPanel {
  constructor(root, { onPrompt } = {}) {
    this.onPrompt = onPrompt;

    this.el = document.createElement('div');
    this.el.id = 'control-panel';
    this.el.className = 'cp';
    this.el.innerHTML = TEMPLATE;
    root.appendChild(this.el);

    const q = (sel) => this.el.querySelector(sel);
    this.dom = {
      prompts: q('#cp-prompts'),
      feedback: q('#cp-feedback'),
      needClick: q('#cp-need-click')
    };

    for (const prompt of PROMPTS) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'cp-chip';
      button.dataset.kind = prompt.kind;
      button.textContent = prompt.label;
      button.addEventListener('click', () => {
        this.onPrompt?.(prompt.kind);
        button.blur();
      });
      this.dom.prompts.appendChild(button);
    }
    this.chips = [...this.dom.prompts.querySelectorAll('.cp-chip')];

    this._feedbackTimer = 0;
    this._needClick = false;
    this.mode = null;
    this.setVisible(false);
  }

  setVisible(visible) {
    this.el.classList.toggle('show', !!visible);
  }

  /**
   * Only the chips change with the owner: they are things to say to someone
   * else's hands, and once the hands are the player's own there is nobody to
   * say them to. No label, no switch — the switch belongs to the script.
   */
  setMode(mode) {
    if (mode === this.mode) return;
    this.mode = mode;
    const ai = mode === 'SISTER_AI';
    this.el.classList.toggle('ai', ai);
    for (const chip of this.chips) chip.disabled = !ai;
    this.dom.prompts.classList.toggle('muted', !ai);
  }

  /** What she said back. Cleared on its own so it never becomes wallpaper. */
  say(text, ok = true) {
    const el = this.dom.feedback;
    el.textContent = text;
    el.classList.toggle('bad', !ok);
    el.classList.add('show');
    this._feedbackTimer = FEEDBACK_LIFE;
  }

  /**
   * The player has the character but not the mouse.
   *
   * Only a real click can take the pointer lock back, so after a story beat
   * hands over, the interface asks for one instead of pretending the mouse is
   * there.
   */
  setNeedClick(needed) {
    if (needed === this._needClick) return;
    this._needClick = needed;
    this.dom.needClick.classList.toggle('show', needed);
  }

  update(dt) {
    if (this._feedbackTimer <= 0) return;
    this._feedbackTimer -= dt;
    if (this._feedbackTimer <= 0) this.dom.feedback.classList.remove('show');
  }
}

const TEMPLATE = `
  <div id="cp-need-click">点击画面接管</div>
  <div id="cp-prompts"></div>
  <div id="cp-feedback"></div>
`;
