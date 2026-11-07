/**
 * Does the mouse actually come back inside the frame?
 *
 * After the story hands the phone over, the game shows "点击画面接管" and waits
 * for a click — pointer lock cannot be granted to a timer. On file:// the frame
 * is a cross-origin document, so whether that click is honoured is not obvious
 * from the code; this asks the browser.
 */
import { chromium } from 'playwright';
import { prototypeUrl as BASE } from './paths.mjs';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });

const errors = [];
page.on('console', (m) => {
  if (m.type() === 'error' && !m.text().includes('X3595')) errors.push(m.text());
});
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));

await page.goto(BASE + '?scene=bedroom&phone=1&dinner=6', { waitUntil: 'load' });
await page.waitForFunction(() => window.__ready === true, null, { timeout: 60000 });

const frame = () => page.frames().find((f) => f.url().includes('dust-corridor'));

// Wait for the handover line: that is the first moment a click can be useful.
await page.waitForFunction(() => {
  const f = [...document.querySelectorAll('iframe')][0];
  return !!f;
}, null, { timeout: 30000 }).catch(() => {});

for (let i = 0; i < 40; i++) {
  const f = frame();
  if (f) {
    const mode = await f.evaluate(() => window.__game?.input?.mode).catch(() => null);
    if (mode === 'PLAYER') break;
  }
  await page.waitForTimeout(1000);
}

const probe = async () => {
  const f = frame();
  if (!f) return { missing: true };
  return f.evaluate(() => {
    const g = window.__game;
    const badge = document.querySelector('#cp-need-click');
    return {
      state: g.state,
      mode: g.input.mode,
      locked: !!document.pointerLockElement,
      needClick: !!badge && badge.classList.contains('show'),
      mode_: g.input.locked,
      fps: Math.round(g.frameStats.fps),
      yaw: +g.player.yaw.toFixed(3)
    };
  });
};

const before = await probe();

// A real click on the canvas, as the prompt asks for.
const el = await frame().frameElement();
const box = await el.boundingBox();
await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
await page.waitForTimeout(600);
const afterClick = await probe();

// Now move the mouse: with the lock held this is a look, without it nothing.
await page.mouse.move(box.x + box.width / 2 + 260, box.y + box.height / 2, { steps: 12 });
await page.waitForTimeout(400);
const afterLook = await probe();

// Escape is the browser's own unlock; the segment must survive it.
await page.keyboard.press('Escape');
await page.waitForTimeout(800);
const afterEscape = await probe();

console.log(JSON.stringify({ errors, before, afterClick, afterLook, afterEscape }, null, 2));
await browser.close();
