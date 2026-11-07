import './cg.css';

/**
 * Full-frame cut-ins.
 *
 * One image, held long enough to read, faded in and out of the live frame. The
 * game is frozen underneath while a cut is up — a still is not a window, and
 * letting the fight continue behind it means the player loses ground they
 * cannot see.
 *
 * Images are imported rather than fetched: the build inlines every asset so
 * the whole thing runs from a directory with no server behind it.
 */

/**
 * Served from `public/`, not imported. An import would be inlined as base64 by
 * the build's `assetsInlineLimit`, which would put a third of a megabyte of
 * text into the bundle for one still. A plain `<img src>` works from a
 * `file://` directory just as well, which is the only thing the inlining was
 * there to protect.
 */
const CUTS = {
  handover: './cg/handover.jpg'
};

const FADE_OUT = 520;

export class CgCut {
  constructor(root) {
    this.el = document.createElement('img');
    this.el.id = 'cg-cut';
    this.el.alt = '';
    this.el.decoding = 'async';
    root.appendChild(this.el);

    this._token = 0;
    this._timer = 0;
    this._resolve = null;
    this.visible = false;

    // Warm the decoder now so the first cut does not open on a blank frame.
    for (const src of Object.values(CUTS)) {
      const pre = new Image();
      pre.src = src;
    }
  }

  /**
   * Show a cut and resolve when it has finished fading out.
   *
   * `hold` is the time the still is fully on screen, in milliseconds — this is
   * real time, not simulated, because the simulation is stopped underneath.
   */
  show(name, { hold = 2400 } = {}) {
    const src = CUTS[name];
    if (!src) return Promise.resolve(false);

    this._token++;
    const token = this._token;
    clearTimeout(this._timer);
    this._settle(false);

    this.el.src = src;
    this.el.classList.add('show');
    this.visible = true;

    return new Promise((resolve) => {
      this._resolve = resolve;
      this._timer = setTimeout(() => {
        if (token !== this._token) return;
        this.el.classList.remove('show');
        this.visible = false;
        // Resolve after the fade, so whatever resumes does so on a clean frame.
        this._timer = setTimeout(() => {
          if (token === this._token) this._settle(true);
        }, FADE_OUT);
      }, hold);
    });
  }

  hide() {
    this._token++;
    clearTimeout(this._timer);
    this.el.classList.remove('show');
    this.visible = false;
    this._settle(true);
  }

  _settle(value) {
    const resolve = this._resolve;
    this._resolve = null;
    resolve?.(value);
  }
}
