/**
 * The school arc as one flow.
 *
 * Act 1 ends on its black page; E hands the whole screen to the story frame,
 * and from there nothing navigates the top page again: the corridor preview →
 * blackboard → broadcast room → after-broadcast → the railing CG all happen
 * inside that frame. This check walks the chain and confirms the final picture
 * is the corridor lean.
 *
 * The blackboard intro is played for real (E through the lines, then the leave
 * card's "先去广播室"). The bridge and broadcast room are interactive games of
 * their own; their forward links are activated directly, because the point here
 * is the chain's wiring and the frame boundaries, not those games.
 */
import { launch, waitReady } from './browser.mjs';
import { prototypeUrl as BASE } from './paths.mjs';
const browser = await launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const errors = [];
page.on('pageerror', (e) => {
  if (!/toDataURL|Tainted canvases/.test(e.message)) errors.push('pageerror: ' + e.message);
});
page.on('console', (m) => { if (m.type() === 'error' && !m.text().includes('X3595')) errors.push(m.text()); });

async function waitFrame(part, timeout = 15000) {
  const start = Date.now();
  for (;;) {
    const f = page.frames().find((x) => x !== page.mainFrame() && x.url().includes(part));
    if (f) return f;
    if (Date.now() - start > timeout) {
      throw new Error(`frame never reached ${part}; frames=${page.frames().map((x) => x.url()).join(', ')}`);
    }
    await page.waitForTimeout(100);
  }
}

// ---- 1. Act 1's closing note hands over to the school frame
await page.goto(BASE + '?end=1', { waitUntil: 'load' });
await waitReady(page);
await page.waitForFunction(() => window.__game.state().epilogue.active, null, { timeout: 15000 });
await page.keyboard.press('KeyE');
await page.waitForTimeout(300);
await page.keyboard.press('KeyE');
await page.waitForFunction(() => window.__game.state().story.active, null, { timeout: 5000 });
const preview = await waitFrame('school-preview.html');
await preview.waitForFunction(() => typeof state !== 'undefined' && state === 'sky', null, { timeout: 10000 });
const started = await page.evaluate(() => ({
  top: location.href,
  story: window.__game.state().story,
  focus: document.activeElement?.id
}));
await preview.waitForFunction(
  () => (document.querySelector('.dialog p')?.textContent || '').includes('学校里'),
  null,
  { timeout: 5000 }
).catch(() => {});
const firstLine = await preview.evaluate(() => document.querySelector('.dialog p')?.textContent || '');

// ---- 2. preview → blackboard
await preview.evaluate(() => go('boardIntro'));
await page.waitForTimeout(1400);
await page.keyboard.press('KeyE');
await preview.waitForSelector('.hot', { timeout: 5000 });
await page.keyboard.press('KeyE');
const board = await waitFrame('blackboard.html');
// Play the corridor intro: E finishes each typed line, the next E advances.
for (let i = 0; i < 40; i += 1) {
  await page.keyboard.press('KeyE');
  await page.waitForTimeout(120);
}
await board.waitForFunction(() => window.__board && window.__board.state().state === 'board', null, { timeout: 30000 });
await board.evaluate(() => window.__board.leave());
await board.waitForSelector('#bye.show', { timeout: 5000 });
const boardLeaveVisible = await board.evaluate(() => {
  const b = document.getElementById('nextBroadcast');
  return !!b && b.offsetParent !== null;
});
await board.click('#nextBroadcast');

// ---- 3. blackboard → broadcast bridge → broadcast room → after-broadcast
const bridge = await waitFrame('/broadcast-bridge/index.html');
await page.waitForTimeout(800);
const bridgeUrl = bridge.url();
await bridge.evaluate(() => document.getElementById('start-broadcast').click());

const act3 = await waitFrame('/act3/broadcast.html');
await page.waitForTimeout(800);
const act3Url = act3.url();
await act3.evaluate(() => document.getElementById('out').click());

const act4 = await waitFrame('/act4/after-broadcast/index.html');
await act4.waitForFunction(() => !!window.__afterBroadcast, null, { timeout: 20000 });

// ---- 4. walking caption uses the subtitle style; final is the lean CG
await act4.evaluate(() => {
  window.__afterBroadcast.enter('doorWalk');
  document.getElementById('auto').click();
});
await act4.waitForFunction(
  () => !document.getElementById('caption').hidden && document.getElementById('captionLine').textContent.length > 0,
  null,
  { timeout: 20000 }
);
const caption = await act4.evaluate(() => {
  const el = document.getElementById('caption');
  const s = getComputedStyle(el);
  const b = getComputedStyle(el.querySelector('b'));
  return {
    text: document.getElementById('captionLine').textContent,
    background: s.backgroundColor,
    border: s.borderTopWidth,
    who: b.color
  };
});
await act4.evaluate(() => window.__afterBroadcast.enter('final'));
await page.waitForTimeout(500);
const lean = await act4.evaluate(() => ({
  hidden: document.getElementById('cg').hidden,
  src: document.getElementById('cg').getAttribute('src'),
  scene: window.__afterBroadcast.scene
}));
// The last two lines over the CG are narration: no box, subtitle colors.
await act4.waitForSelector('#dialog.subtitle-style:not([hidden])', { timeout: 10000 });
const finalLines = await act4.evaluate(() => {
  const el = document.getElementById('dialog');
  const s = getComputedStyle(el);
  const b = getComputedStyle(el.querySelector('b'));
  return {
    text: document.getElementById('line').textContent,
    background: s.backgroundColor,
    border: s.borderTopWidth,
    align: s.textAlign,
    who: b.color
  };
});

// ---- 5. after-broadcast → 第三幕剧情：故事继续在同一个 storyframe 里往下走
await act4.evaluate(() => window.__afterBroadcast.enter('ending'));
await act4.waitForSelector('#ending:not([hidden])', { timeout: 5000 });
const narrativeHref = await act4.evaluate(() =>
  document.querySelector('#ending a[href*="act5/narrative"]')?.getAttribute('href') || '');
await act4.evaluate(() => document.querySelector('#ending a[href*="act5/narrative"]')?.click());
const narrative = await waitFrame('act5/narrative/index.html');
await narrative.waitForFunction(
  () => window.__narrative && window.__narrative.scene !== 'loading',
  null,
  { timeout: 20000 }
);
await narrative.waitForFunction(
  () => window.__narrative?.scene === 'nextDay',
  null,
  { timeout: 20000 }
).catch(() => {});
const narrativeScene = await narrative.evaluate(() => window.__narrative?.scene || '');
const topAfterStory = await page.evaluate(() => location.href);

const topUrl = await page.evaluate(() => location.href);
console.log(JSON.stringify({ started, firstLine, boardLeaveVisible, bridgeUrl, act3Url, caption, lean, finalLines, narrativeHref, narrativeScene, topAfterStory, topUrl, errors }, null, 2));

const failures = [];
if (!started.story.active || !started.story.shown) failures.push('the story frame did not open');
if (!started.story.src.includes('start=1')) failures.push('the story frame did not ask for a fresh start');
if (!started.top.includes('prototype.html')) failures.push('Act 1 navigated away instead of hosting the arc');
if (started.focus !== 'storyframe') failures.push(`focus stayed on ${started.focus}, not the story frame`);
if (!firstLine.includes('学校里')) failures.push(`preview opened with "${firstLine}"`);
if (!boardLeaveVisible) failures.push('blackboard leave card did not offer 先去广播室');
if (!bridgeUrl.includes('board=deferred')) failures.push(`bridge got ${bridgeUrl}`);
if (!act3Url.includes('/act3/broadcast.html')) failures.push(`broadcast room got ${act3Url}`);
if (!act3Url.includes('from=bridge')) failures.push('broadcast room lost its bridge origin');
if (!topUrl.includes('prototype.html')) failures.push(`top page left Act 1: ${topUrl}`);
if (!caption.text) failures.push('walking caption never appeared');
if (caption.background !== 'rgba(0, 0, 0, 0)') failures.push(`caption has a box background: ${caption.background}`);
if (caption.border !== '0px') failures.push(`caption has a border: ${caption.border}`);
if (lean.hidden) failures.push('the final CG is hidden');
if (!lean.src?.includes('cg_corridor_lean_back.png')) failures.push(`final CG is ${lean.src}`);
if (lean.scene !== 'final') failures.push(`after-broadcast is at scene ${lean.scene}`);
if (finalLines.background !== 'rgba(0, 0, 0, 0)') failures.push(`final narration has a box: ${finalLines.background}`);
if (finalLines.border !== '0px') failures.push(`final narration has a border: ${finalLines.border}`);
if (finalLines.align !== 'center') failures.push(`final narration is ${finalLines.align}-aligned`);
if (finalLines.who !== 'rgb(255, 201, 143)') failures.push(`final speaker color is ${finalLines.who}`);
if (!finalLines.text) failures.push('final narration never printed');
if (!narrativeHref.includes('act5/narrative/index.html')) failures.push(`after-broadcast ending points at ${narrativeHref || '(nothing)'}`);
if (narrativeScene !== 'nextDay') failures.push(`story frame reached narrative scene ${narrativeScene || '(none)'}`);
if (!topAfterStory.includes('prototype.html')) failures.push(`the narrative left the top page: ${topAfterStory}`);
if (errors.length) failures.push(...errors);

await browser.close();
if (failures.length) { console.log('FAILED:'); for (const f of failures) console.log(' -', f); process.exit(1); }
console.log('OK');
