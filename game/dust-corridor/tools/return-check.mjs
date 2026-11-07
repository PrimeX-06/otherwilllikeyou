/**
 * Scene 06 after the phone: up, out, home, dark.
 *
 * The segment used to end on a card over a frozen frame, and pressing E put the
 * player back in a bedroom they could not leave. This walks the path the script
 * actually describes — the phone goes dark, she is left sitting there, the
 * corridor comes back, and the act only ends at the player's own door.
 */
import { launch, waitReady } from './browser.mjs';
import { prototypeUrl as BASE } from './paths.mjs';
const browser = await launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });

const errors = [];
page.on('console', (m) => { if (m.type() === 'error' && !m.text().includes('X3595')) errors.push(m.text()); });
page.on('pageerror', (e) => {
  // school-preview reads a local image back out of a canvas for its pixelation;
  // on file:// that canvas is tainted and the read throws. The page keeps the
  // original image, so this noise does not mean the transition failed.
  if (!/toDataURL|Tainted canvases/.test(e.message)) errors.push('pageerror: ' + e.message);
});

await page.goto(BASE + '?scene=bedroom&phone=1&dinner=5', { waitUntil: 'load' });
await waitReady(page);

const snap = () => page.evaluate(() => ({
  ...window.__game.state(),
  endcard: document.getElementById('endcard').className,
  epi: document.getElementById('epilogue').textContent,
  note: document.getElementById('gameNote').textContent,
  host: document.getElementById('gamehost').className,
  player: { x: Math.round(window.__game.player.x), y: Math.round(window.__game.player.y) }
}));

// ---- 1. the phone goes dark
await page.waitForFunction(() => window.__game.embed.result === true, null, { timeout: 180000 });
const atResult = await snap();

// ---- 2. E gets up: the frame goes away and the corridor comes back
await page.keyboard.press('KeyE');
await page.waitForTimeout(900);
const up = await snap();

// Read the two lines she is left behind to, then walk.
for (let i = 0; i < 4; i++) {
  const s = await snap();
  if (!s.dialogOpen) break;
  await page.keyboard.press('KeyE');
  await page.waitForTimeout(500);
}

// ---- 3. walk to 301. He starts at the far end of the corridor, so this is a
// real walk, not a nudge: hold left until the door is in reach.
await page.keyboard.down('ArrowLeft');
for (let i = 0; i < 40; i++) {
  const x = await page.evaluate(() => window.__game.player.x);
  if (x <= 190) break;
  await page.waitForTimeout(200);
}
await page.keyboard.up('ArrowLeft');
// ...and step up out of the middle of the floor, or the door is still "down
// there" as far as the interaction check is concerned.
await page.keyboard.down('ArrowUp');
for (let i = 0; i < 20; i++) {
  const y = await page.evaluate(() => window.__game.player.y);
  if (y <= 210) break;
  await page.waitForTimeout(150);
}
await page.keyboard.up('ArrowUp');
const walked = await snap();

// ---- 4. open the door: two lines, then the fade. Press E only while the act
// is still running — a press after it has ended would start it over.
for (let i = 0; i < 8; i++) {
  const s = await snap();
  if (s.done) break;
  await page.keyboard.press('KeyE');
  await page.waitForTimeout(700);
}
await page.waitForTimeout(2600);
const home = await snap();

// ---- 5. the black page prints the closing note; the first E finishes the
// printing, the second goes on to Act 2, which starts from its own opening
await page.keyboard.press('KeyE');
await page.waitForTimeout(400);
const read = await snap();
await page.keyboard.press('KeyE');
await page.waitForFunction(() => window.__game.state().story.active, null, { timeout: 5000 });
const act2Frame = await (async () => {
  const start = Date.now();
  for (;;) {
    const f = page.frames().find((x) => x !== page.mainFrame() && x.url().includes('school-preview.html'));
    if (f) return f;
    if (Date.now() - start > 15000) throw new Error('story frame never reached school-preview.html');
    await page.waitForTimeout(100);
  }
})();
await act2Frame.waitForFunction(() => typeof state !== 'undefined' && state === 'sky', null, { timeout: 10000 });
await page.waitForTimeout(900);
const act2 = await act2Frame.evaluate(() => ({
  url: location.href,
  state: typeof state !== 'undefined' ? state : null,
  dialog: !!document.querySelector('.dialog'),
  heading: document.querySelector('h1')?.textContent
}));

const report = { errors, atResult, up, walked, home, read, act2 };
console.log(JSON.stringify(report, null, 2));

const failures = [];
if (atResult.endcard.includes('show')) failures.push('the act card came up while the phone was still on screen');
if (atResult.note !== 'E 起身') failures.push(`the prompt after the segment is "${atResult.note}"`);
if (!up.returning) failures.push('E did not hand the picture back to the corridor');
if (up.scene !== 'corridor') failures.push(`after standing up the scene is ${up.scene}`);
if (up.embed.active) failures.push('the frame is still running after standing up');
if (walked.player.x > 216) failures.push(`still at x=${walked.player.x}, not at 301`);
if (!home.done) failures.push('the act never ended at the door');
if (home.fade < 0.9) failures.push(`the screen is not black at the end (${home.fade})`);
if (!home.endcard.includes('show')) failures.push('no closing page after the walk home');
if (!home.epilogue.active) failures.push('the closing note never started printing');
if (home.epilogue.done) failures.push('the note was already finished a few seconds in');
if (!(home.epi.length > 0 && home.epi.length < home.epilogue.len)) {
  failures.push(`the note is not printing a character at a time (${home.epi.length}/${home.epilogue.len})`);
}
if (!read.epilogue.done) failures.push('E did not finish the printing');
if (read.epi.length !== read.epilogue.len) failures.push('the finished note is missing characters');
if (!read.epi.includes('pubg') || !read.epi.includes('离谱')) failures.push('the printed note is not the closing text');
if (!read.endcard.includes('done')) failures.push('the title and the way back did not arrive after the note');
if (!act2.url.includes('school-preview.html')) failures.push('E after the note did not go on to Act 2');
if (act2.state !== 'sky') failures.push(`Act 2 started at state=${act2.state}`);
if (!act2.dialog) failures.push('Act 2 has no opening line');
if (!act2.heading?.includes('第二幕')) failures.push(`Act 2 heading is ${act2.heading}`);
if (errors.length) failures.push(...errors);

await browser.close();
if (failures.length) { console.log('FAILED:'); for (const f of failures) console.log(' -', f); process.exit(1); }
console.log('OK');
