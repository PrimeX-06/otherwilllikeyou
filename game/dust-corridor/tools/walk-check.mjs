import { launch } from './browser.mjs';
import { prototypeUrl } from './paths.mjs';

/**
 * The bedroom arrival, end to end: corridor -> doorway CG -> both of them walk
 * in from the hall -> she sits -> the invitation -> the phone close-up.
 *
 * This is the part of the act that has no debug shortcut worth trusting: the
 * walk is driven by the cut from the CG, and the dialogue gates the next thing
 * that happens. Every step here is asserted against `window.__game.state()`,
 * not against a screenshot.
 */

const URL = prototypeUrl
  + '?opened=1&player=350,200&dir=up';

const ok = (label, value) => console.log(`${value ? 'PASS' : 'FAIL'}  ${label}`);
const state = (page) => page.evaluate(() => window.__game.state());
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function until(page, fn, timeout = 20000, step = 100) {
  const t0 = Date.now();
  for (;;) {
    const s = await state(page);
    if (fn(s)) return s;
    if (Date.now() - t0 > timeout) throw new Error('timeout: ' + JSON.stringify(s));
    await wait(step);
  }
}

const browser = await launch();
const page = await browser.newPage({ viewport: { width: 960, height: 540 } });
page.on('pageerror', (e) => console.log('PAGEERROR', e.message));
await page.goto(URL, { waitUntil: 'load' });
await page.waitForFunction(() => window.__ready === true, null, { timeout: 20000 });

let s = await state(page);
ok('starts in the corridor with the door unlocked', s.scene === 'corridor');

await page.keyboard.press('e');            // 进去 -> doorway CG
await until(page, (x) => x.scene === 'bedroom', 20000);
s = await state(page);
ok('CG hands over to the room', s.scene === 'bedroom');
ok('walk is running', s.walk.active === true);
ok('both start walking in', s.walk.boy.mode === 'walk' && s.walk.girl.mode === 'walk');

s = await until(page, (x) => x.walk.girl.mode === 'sit', 15000);
ok('she is on the bed', s.walk.girl.mode === 'sit');
ok('she sits at the old spot', Math.abs(s.girlY - 170) < 0.01);

s = await until(page, (x) => x.walk.boy.mode !== 'walk', 15000);
ok('he has reached the bedside', s.walk.boy.mode === 'stand' || s.walk.boy.mode === 'hop' || s.walk.boy.mode === 'sit');

s = await until(page, (x) => x.walk.boy.mode === 'sit', 15000);
ok('he climbs up after her line', s.walk.boy.mode === 'sit');
ok('sitting feet land on the still pose', Math.abs(s.walk.boy.x - 142) < 0.01 && Math.abs(s.walk.boy.y - 160) < 0.01);

s = await until(page, (x) => x.walk.active === false, 8000);
ok('walk hands back to the static scene', s.walk.active === false);

// the intro dialogue: narration, then her line (auto-holds 1.8 s)
const introLine = await page.evaluate(() => document.getElementById('line').textContent);
console.log('line now:', introLine);

await page.screenshot({ path: 'D:/解决内分泌失调/pixel-act1/ref/e2e_walk_settled.png' });

// close her line if it is the one open, then the phone prompt is live
await page.keyboard.press('e');
await until(page, (x) => x.dialogOpen === false, 8000);
await wait(300);
s = await state(page);
ok('phone prompt is the only thing left', s.dialogOpen === false && s.walk.active === false);
const prompt = await page.evaluate(() => ({
  shown: document.getElementById('prompt').classList.contains('show'),
  text: document.getElementById('promptText').textContent,
}));
ok('prompt reads 看手机', prompt.shown && prompt.text.includes('看手机'));
await page.screenshot({ path: 'D:/解决内分泌失调/pixel-act1/ref/e2e_walk_prompt.png' });

await page.keyboard.press('e');            // -> her line about the volume
await wait(400);
s = await state(page);
ok('line about keeping it quiet', s.line && s.line.includes('小声'), s.line);
await page.screenshot({ path: 'D:/解决内分泌失调/pixel-act1/ref/e2e_walk_quiet.png' });

await page.keyboard.press('e');            // -> the camera goes into the phone
await wait(300);
s = await state(page);
ok('phone close-up starts', s.shot.active === true);

await browser.close();
