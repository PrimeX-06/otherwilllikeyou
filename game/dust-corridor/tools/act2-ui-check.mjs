/**
 * Shared controls between the acts: E advances, Esc pauses, R restarts.
 * Also checks that Act 2 still drops its own save when entered with ?start=1.
 */
import { launch } from './browser.mjs';
import { STORY_ROOT as ROOT } from './paths.mjs';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const OUT = path.join(os.tmpdir(), 'ui-parity');
fs.mkdirSync(OUT, { recursive: true });
const failures = [];
const browser = await launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const errors = [];
page.on('pageerror', (e) => { if (!/toDataURL|Tainted canvases/.test(e.message)) errors.push(e.message); });

// ---- Act 2: the opening E prompt is a keycap, not a clickable button
await page.goto(`${ROOT}/school-preview.html?start=1`, { waitUntil: 'load' });
await page.waitForTimeout(700);
await page.evaluate(() => go('exterior'));
await page.waitForTimeout(250);
const hot = await page.evaluate(() => {
  const el = document.querySelector('.hot');
  return el && {
    text: el.textContent.replace(/\s+/g, ' ').trim(),
    kbd: el.querySelector('kbd')?.textContent,
    span: el.querySelector('span')?.textContent,
    cursor: getComputedStyle(el).cursor
  };
});
await page.screenshot({ path: `${OUT}/act2-hot.png` });
if (!hot) failures.push('the exterior prompt is not on screen');
else {
  if (hot.kbd !== 'E') failures.push(`the prompt keycap is ${hot.kbd}`);
  if (hot.span !== '走进教学楼') failures.push(`the prompt says ${hot.span}`);
}

// ---- E advances the opening narration, Esc freezes input, Esc again resumes
await page.evaluate(() => { localStorage.removeItem(KEY); go('sky'); });
await page.waitForTimeout(200);
const beforePause = await page.evaluate(() => state);
await page.keyboard.press('Escape');
await page.waitForTimeout(350);
const paused = await page.evaluate(() => ({
  pausedClass: document.body.classList.contains('paused'),
  text: getComputedStyle(document.querySelector('.stage'), '::after').content
}));
await page.keyboard.press('e');            // must be swallowed
await page.waitForTimeout(250);
const stillPaused = await page.evaluate(() => ({ state, paused }));
await page.screenshot({ path: `${OUT}/act2-pause-check.png` });
await page.keyboard.press('Escape');
await page.waitForTimeout(300);
const resumed = await page.evaluate(() => ({ paused, pausedClass: document.body.classList.contains('paused') }));
if (!paused.pausedClass) failures.push('Esc did not show the pause veil in Act 2');
if (!paused.text.includes('已暂停')) failures.push(`the pause veil says ${paused.text}`);
if (stillPaused.state !== beforePause) failures.push('E changed state while Act 2 was paused');
if (resumed.paused || resumed.pausedClass) failures.push('Esc did not resume Act 2');

// ---- R restarts Act 2 from the opening
await page.evaluate(() => go('doorCall'));
await page.waitForTimeout(350);
await page.keyboard.press('r');
await page.waitForTimeout(400);
const restarted = await page.evaluate(() => ({ state, dialog: !!document.querySelector('.dialog') }));
if (restarted.state !== 'sky') failures.push(`R restarted at ${restarted.state}`);
if (!restarted.dialog) failures.push('R went to sky without the opening line');

// ---- the end page still takes E back to the start
await page.evaluate(() => go('end'));
await page.waitForTimeout(250);
const endHint = await page.evaluate(() => document.querySelector('.end .hint')?.textContent);
await page.keyboard.press('e');
await page.waitForTimeout(300);
const afterEnd = await page.evaluate(() => state);
if (endHint !== 'E 重新体验') failures.push(`the end hint is ${endHint}`);
if (afterEnd !== 'sky') failures.push(`E on the end page went to ${afterEnd}`);

// ---- ?start=1 still throws away an old save
await page.evaluate(() => localStorage.setItem(KEY, JSON.stringify({ state: 'end' })));
await page.goto(`${ROOT}/school-preview.html?start=1`, { waitUntil: 'load' });
await page.waitForTimeout(500);
const fresh = await page.evaluate(() => ({ state, search: location.search }));
if (fresh.state !== 'sky') failures.push(`?start=1 opened at ${fresh.state}`);
if (fresh.search) failures.push(`?start=1 left its query behind: ${fresh.search}`);

// ---- Act 1: Esc pause / resume, and E is frozen while paused
await page.goto(`${ROOT}/prototype.html?dialog=1`, { waitUntil: 'load' });
await page.waitForTimeout(1200);
await page.keyboard.press('Escape');
await page.waitForTimeout(400);
const a1paused = await page.evaluate(() => ({
  shown: document.getElementById('pause').classList.contains('show'),
  scene: window.__game.state().scene,
  dialog: window.__game.state().dialogOpen
}));
await page.keyboard.press('e');
await page.waitForTimeout(300);
const a1afterE = await page.evaluate(() => window.__game.state().dialogOpen);
await page.screenshot({ path: `${OUT}/act1-pause-check.png` });
await page.keyboard.press('Escape');
await page.waitForTimeout(300);
const a1resumed = await page.evaluate(() => document.getElementById('pause').classList.contains('show'));
if (!a1paused.shown) failures.push('Esc did not show the pause veil in Act 1');
if (a1afterE !== a1paused.dialog) failures.push('E acted while Act 1 was paused');
if (a1resumed) failures.push('Esc did not resume Act 1');

if (errors.length) failures.push(...errors);
await browser.close();
if (failures.length) {
  console.log('FAILED:');
  failures.forEach((f) => console.log(' -', f));
  process.exit(1);
}
console.log('OK');
