/**
 * Act 1 → Act 2: the closing note, the way on, and the preview's fresh start.
 *
 * Jumps to the end of Act 1 with ?end=1, finishes the note, checks that R still
 * restarts the act, then goes through E into Act 2. Since the school arc now
 * runs in a full-screen frame inside prototype.html, the check follows the
 * frame instead of a top-level navigation.
 */
import { launch, waitReady } from './browser.mjs';
import { prototypeUrl as BASE } from './paths.mjs';
const browser = await launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const errors = [];
page.on('pageerror', (e) => {
  // school-preview's pixelation reads a local image back out of a canvas; on
  // file:// Chrome treats that canvas as tainted and the read throws. The page
  // keeps the original image, so this is noise here, not a broken transition.
  if (!/toDataURL|Tainted canvases/.test(e.message)) errors.push('pageerror: ' + e.message);
});
page.on('console', (m) => { if (m.type() === 'error' && !m.text().includes('X3595')) errors.push(m.text()); });

const state = () => page.evaluate(() => ({
  ...window.__game.state(),
  hint: document.querySelector('#endcard .hint')?.textContent,
  endcard: document.getElementById('endcard')?.className,
  epi: document.getElementById('epilogue')?.textContent
}));

// ---- 1. R still restarts the act from the finished note
await page.goto(BASE + '?end=1', { waitUntil: 'load' });
await waitReady(page);
await page.waitForFunction(() => window.__game.state().epilogue.active, null, { timeout: 15000 });
await page.keyboard.press('KeyE');
await page.waitForTimeout(400);
const read = await state();
await page.keyboard.press('KeyR');
await page.waitForTimeout(600);
const restarted = await state();

// ---- 2. E goes on to Act 2, in the full-screen story frame
await page.goto(BASE + '?end=1', { waitUntil: 'load' });
await waitReady(page);
await page.waitForFunction(() => window.__game.state().epilogue.active, null, { timeout: 15000 });
await page.keyboard.press('KeyE');
await page.waitForTimeout(400);
await page.keyboard.press('KeyE');
await page.waitForFunction(() => window.__game.state().story.active, null, { timeout: 5000 });
const host = await page.evaluate(() => window.__game.state().story);
// The frame only takes the picture once its document has loaded; then focus
// moves into it so E reaches Act 2 instead of the finished act card.
const frame = await (async () => {
  const start = Date.now();
  for (;;) {
    const f = page.frames().find((x) => x !== page.mainFrame() && x.url().includes('school-preview.html'));
    if (f) return f;
    if (Date.now() - start > 15000) throw new Error('story frame never reached school-preview.html');
    await page.waitForTimeout(100);
  }
})();
await frame.waitForFunction(() => typeof state !== 'undefined' && state === 'sky', null, { timeout: 10000 });
await page.waitForTimeout(900);
const act2 = await frame.evaluate(() => ({
  url: location.href,
  state: typeof state !== 'undefined' ? state : null,
  dialog: !!document.querySelector('.dialog'),
  dialogText: document.querySelector('.dialog p')?.textContent ?? null,
  title: document.title,
  heading: document.querySelector('h1')?.textContent
}));
const hostCheck = await page.evaluate(() => ({
  active: window.__game.state().story.active,
  shown: window.__game.state().story.shown,
  ready: window.__game.state().story.ready,
  focus: document.activeElement?.id,
  topUrl: location.href
}));

console.log(JSON.stringify({ read: {
  done: read.done,
  epilogue: read.epilogue,
  endcard: read.endcard,
  hint: read.hint,
  epiLen: read.epi.length
}, restarted: {
  done: restarted.done,
  scene: restarted.scene,
  epilogue: restarted.epilogue,
  dialogOpen: restarted.dialogOpen
}, host, hostCheck, act2 }, null, 2));

const failures = [];
if (!read.epilogue.done) failures.push('E did not finish the note');
if (!read.endcard.includes('done')) failures.push('the title and hint did not arrive');
if (!read.hint.includes('进入第二幕') || !read.hint.includes('重看第一幕')) failures.push(`hint is "${read.hint}"`);
if (restarted.done) failures.push('R did not restart the act');
if (restarted.scene !== 'corridor') failures.push(`R restarted in ${restarted.scene}`);
if (restarted.epilogue.active) failures.push('R left the closing note active');
if (!hostCheck.active || !hostCheck.shown || !hostCheck.ready) failures.push(`story host is ${JSON.stringify(hostCheck)}`);
if (!host.src.includes('school-preview.html')) failures.push(`story frame src is ${host.src}`);
if (!host.src.includes('start=1')) failures.push('story frame does not ask Act 2 for a fresh start');
if (hostCheck.focus !== 'storyframe') failures.push(`focus stayed on ${hostCheck.focus}`);
if (!hostCheck.topUrl.includes('prototype.html')) failures.push(`top page changed to ${hostCheck.topUrl}`);
if (!act2.url.includes('school-preview.html')) failures.push(`frame landed on ${act2.url}`);
if (act2.state !== 'sky') failures.push(`Act 2 opened at state=${act2.state}`);
if (!act2.dialog) failures.push('Act 2 opened without its first line');
if (!act2.heading?.includes('第二幕')) failures.push(`Act 2 heading is ${act2.heading}`);
if (errors.length) failures.push(...errors);

await browser.close();
if (failures.length) { console.log('FAILED:'); for (const f of failures) console.log(' -', f); process.exit(1); }
console.log('OK');
