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

export const PROMPTS = [
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
    this.context = null;
    this.visible = false;

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

    for (const [index, prompt] of [...PROMPTS, { kind: '', label: '留意周围' }].entries()) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'cp-chip';
      button.dataset.kind = prompt.kind;
      button.innerHTML = `<span>${prompt.label}</span><kbd>${index + 1}</kbd>`;
      button.addEventListener('click', () => {
        this.activate(index);
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
    this.visible = !!visible;
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
    for (const [index, chip] of this.chips.entries()) chip.disabled = !ai || (index === 5 && !this.context);
    this.dom.prompts.classList.toggle('muted', !ai);
  }

  setContext(prompt) {
    if ((prompt?.kind ?? null) === (this.context?.kind ?? null)
      && (prompt?.label ?? null) === (this.context?.label ?? null)) return;
    this.context = prompt;
    const chip = this.chips[5];
    chip.dataset.kind = prompt?.kind ?? '';
    chip.querySelector('span').textContent = prompt?.label ?? '留意周围';
    chip.disabled = this.mode !== 'SISTER_AI' || !prompt;
    chip.classList.toggle('contextual', !!prompt);
  }

  activate(index) {
    const chip = this.chips[index];
    if (!this.visible || !chip || chip.disabled) return false;
    this.onPrompt?.(chip.dataset.kind, chip.querySelector('span').textContent);
    return true;
  }

  handleKey(code) {
    const match = /^Digit([1-6])$/.exec(code);
    return !!match && this.activate(Number(match[1]) - 1);
  }

  flash(kind, label) {
    const chip = this.chips.find((item) => item.dataset.kind === kind) ?? this.chips[5];
    if (chip === this.chips[5]) chip.querySelector('span').textContent = label;
    this._flashChip?.classList.remove('calling');
    chip.classList.add('calling');
    this._flashChip = chip;
    this._flashTimer = 1.5;
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
    if (this._flashTimer > 0) {
      this._flashTimer -= dt;
      if (this._flashTimer <= 0) this._flashChip?.classList.remove('calling');
    }
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
