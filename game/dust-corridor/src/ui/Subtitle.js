import './subtitle.css';

/**
 * Dialogue lines for the handover beats.
 *
 * No panel, no border: the original interface draws with type, shadow and
 * spacing, and a box here would look bolted on. The scrim is a soft gradient
 * that only exists so the line stays readable against a sunlit street.
 */
export class Subtitle {
  constructor(root) {
    this.el = document.createElement('div');
    this.el.id = 'subtitle';
    this.el.innerHTML = '<div class="speaker"></div><div class="line"></div>';
    root.appendChild(this.el);
    this.dom = {
      speaker: this.el.querySelector('.speaker'),
      line: this.el.querySelector('.line')
    };
    this.text = '';
  }

  show(speaker, text) {
    if (text === this.text) return;
    this.text = text;
    this.dom.speaker.textContent = speaker ? `${speaker}：` : '';
    this.dom.line.textContent = text;
    this.el.classList.remove('show');
    // Restart the fade even when the previous line was still on screen.
    void this.el.offsetWidth;
    this.el.classList.add('show');
  }

  hide() {
    this.text = '';
    this.el.classList.remove('show');
  }

  setVisible(visible) {
    this.el.classList.toggle('enabled', !!visible);
    if (!visible) this.hide();
  }
}
