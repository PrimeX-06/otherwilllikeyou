/**
 * Visual parity pass: Act 1 and Act 2 at the same viewport.
 *
 * Screenshots the shared shell (topbar, dialog, E prompt, pause veil, end page)
 * in both acts so the two can be compared side by side, and records the fonts
 * and boxes the eye is judging.
 */
import { launch } from './browser.mjs';
import { STORY_ROOT as ROOT } from './paths.mjs';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const OUT = process.env.OUT || path.join(os.tmpdir(), 'ui-parity');
fs.mkdirSync(OUT, { recursive: true });

const browser = await launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const errors = [];
page.on('pageerror', (e) => { if (!/toDataURL|Tainted canvases/.test(e.message)) errors.push(e.message); });

const shot = async (tag) => {
  await page.screenshot({ path: `${OUT}/${tag}.png` });
  console.log('shot', tag);
};

const metrics = () => page.evaluate(() => {
  const cs = (el) => el ? getComputedStyle(el) : null;
  const box = (el) => {
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const s = getComputedStyle(el);
    return {
      x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height),
      font: s.fontSize, color: s.color, bg: s.backgroundColor, border: s.borderColor,
      letterSpacing: s.letterSpacing
    };
  };
  const topbar = document.querySelector('.topbar');
  const dialog = document.querySelector('.dialog');
  const hot = document.querySelector('.hot');
  return {
    viewport: [innerWidth, innerHeight],
    topbar: box(topbar),
    topbarText: topbar?.textContent.replace(/\s+/g, ' ').trim(),
    dialog: box(dialog),
    dialogWho: box(dialog?.querySelector('b')),
    dialogLine: box(dialog?.querySelector('p')),
    hot: box(hot),
    hotText: hot?.textContent.replace(/\s+/g, ' ').trim(),
    stage: box(document.querySelector('.stage') || document.getElementById('stage')),
    status: box(document.getElementById('status') || document.getElementById('goal')),
    pause: box(document.getElementById('pause') || null),
    pausedClass: document.body.className || document.documentElement.className
  };
});

// ---------------- Act 1 ----------------
await page.goto(`${ROOT}/prototype.html?dialog=1`, { waitUntil: 'load' });
await page.waitForTimeout(1600);
await shot('act1-rest');
console.log('act1', JSON.stringify(await metrics(), null, 2));
await page.keyboard.press('Escape');
await page.waitForTimeout(500);
await shot('act1-pause');
console.log('act1 paused', JSON.stringify(await metrics(), null, 2));
await page.keyboard.press('Escape');

await page.goto(`${ROOT}/prototype.html?end=1`, { waitUntil: 'load' });
await page.waitForTimeout(1600);
await page.keyboard.press('e');   // finish the closing note
await page.waitForTimeout(1400);  // title + hint fade in
await shot('act1-end');

// ---------------- Act 2 ----------------
await page.goto(`${ROOT}/school-preview.html?start=1`, { waitUntil: 'load' });
await page.waitForTimeout(1400);
await shot('act2-rest');
console.log('act2', JSON.stringify(await metrics(), null, 2));

// finish the opening line and step out to the first E prompt
await page.keyboard.press('e');
await page.waitForTimeout(250);
await page.keyboard.press('e');
await page.waitForTimeout(450);
await shot('act2-exterior');
console.log('act2 exterior', JSON.stringify(await metrics(), null, 2));

// classroom with the door opening, and the walk prompt
await page.evaluate(() => go('doorCall'));
await page.waitForTimeout(1200);
await shot('act2-doorcall');
await page.evaluate(() => go('walkToDoor'));
await page.waitForTimeout(400);
await shot('act2-walk');
console.log('act2 walk', JSON.stringify(await metrics(), null, 2));

await page.keyboard.press('Escape');
await page.waitForTimeout(500);
await shot('act2-pause');

// opened door + arrival dialog (E prompt in the dialogue)
await page.evaluate(() => { paused = false; document.body.classList.remove('paused'); go('doorArrival'); });
await page.waitForTimeout(600);
await shot('act2-arrival');

// end page
await page.evaluate(() => go('end'));
await page.waitForTimeout(500);
await shot('act2-end');
console.log('act2 end', JSON.stringify(await metrics(), null, 2));

// narrow 4:3 viewport: the stage letterboxes, the HUD must stay on the stage
await page.setViewportSize({ width: 1024, height: 768 });
await page.evaluate(() => go('intro'));
await page.waitForTimeout(700);
await shot('act2-4x3');
console.log('act2 4x3', JSON.stringify(await metrics(), null, 2));

await page.goto(`${ROOT}/prototype.html?dialog=1`, { waitUntil: 'load' });
await page.waitForTimeout(1600);
await shot('act1-4x3');

console.log('errors', JSON.stringify(errors));
await browser.close();
