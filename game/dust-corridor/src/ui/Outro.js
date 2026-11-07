import './outro.css';

/**
 * The end of the segment: the room goes dark and the act closes.
 *
 * A fade to black rather than a scoreboard — the match is not what ended here,
 * the evening did. The restart button only exists because this is a build
 * someone is watching repeatedly; the shipping version returns to the story
 * instead.
 */
export class Outro {
  constructor(root, { onRestart } = {}) {
    this.onRestart = onRestart;
    this.el = document.createElement('div');
    this.el.id = 'outro';
    this.el.innerHTML = TEMPLATE;
    root.appendChild(this.el);
    this.dom = {
      act: this.el.querySelector('.act'),
      title: this.el.querySelector('.title'),
      note: this.el.querySelector('.note'),
      restart: this.el.querySelector('button')
    };
    this.dom.restart.addEventListener('click', () => {
      this.hide();
      this.onRestart?.();
    });
  }

  show({ act = '第一幕', title = '结束', note = '手机上的那一局，到此为止。' } = {}) {
    this.dom.act.textContent = act;
    this.dom.title.textContent = title;
    this.dom.note.textContent = note;
    this.el.classList.add('show');
  }

  hide() {
    this.el.classList.remove('show');
  }

  get visible() {
    return this.el.classList.contains('show');
  }
}

const TEMPLATE = `
  <div class="inner">
    <div class="act">第一幕</div>
    <div class="title">结束</div>
    <div class="rule"></div>
    <div class="note"></div>
    <button type="button">重看这段</button>
  </div>
`;
