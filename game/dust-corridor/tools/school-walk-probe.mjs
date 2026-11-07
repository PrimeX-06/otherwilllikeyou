/**
 * Look at the walk-to-door step of school-preview.html and at E-driven flow.
 *
 * Jumps straight to a state, presses the same keys a player would, and records
 * where "me" actually is so the movement can be judged rather than guessed.
 */
import { launch } from './browser.mjs';
import { schoolPreviewUrl as URL } from './paths.mjs';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const OUT = process.env.OUT || path.join(os.tmpdir(), 'school-shots');
fs.mkdirSync(OUT, { recursive: true });

const browser = await launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
page.on('pageerror', (e) => { if (!/toDataURL/.test(e.message)) console.log('pageerror:', e.message); });

await page.goto(URL, { waitUntil: 'load' });
await page.evaluate(() => { localStorage.clear(); go('walkToDoor'); });
await page.waitForTimeout(400);

const snap = async (tag) => {
  const info = await page.evaluate(() => {
    const me = document.querySelector('#people .actor.me');
    const her = document.querySelector('#people .actor.her');
    const stage = document.querySelector('.stage').getBoundingClientRect();
    const r = me?.getBoundingClientRect();
    const h = her?.getBoundingClientRect();
    return {
      state: state,
      me: r ? {
        left: +((r.left - stage.left) / stage.width * 100).toFixed(1),
        bottom: +((stage.bottom - r.bottom) / stage.height * 100).toFixed(1),
        width: +(r.width / stage.width * 100).toFixed(1)
      } : null,
      her: h ? { left: +((h.left - stage.left) / stage.width * 100).toFixed(1) } : null,
      status: document.getElementById('status').textContent,
      hot: document.querySelector('.hot')?.textContent ?? null,
      controls: document.querySelector('.door-controls')?.textContent ?? null
    };
  });
  await page.screenshot({ path: `${OUT}/${tag}.png` });
  console.log(tag, JSON.stringify(info));
};

await snap('01-start');
for (let i = 0; i < 6; i++) { await page.keyboard.press('e'); await page.waitForTimeout(240); }
await snap('02-aisle');
for (let i = 0; i < 5; i++) { await page.keyboard.press('e'); await page.waitForTimeout(240); }
await snap('03-at-door');
await page.waitForTimeout(900);
await snap('04-arrival');

// E finishes the dialogue and then triggers the prompt that used to be a button.
await page.keyboard.press('e'); // finish line 1
await page.waitForTimeout(300);
await page.keyboard.press('e'); // next line
await page.waitForTimeout(300);
await page.keyboard.press('e'); // finish line 2
await page.waitForTimeout(1200);
await snap('05-prompt');
await page.keyboard.press('e');
await page.waitForTimeout(400);
await snap('06-after-prompt');

// The very first hotspot: E on the exterior.
await page.evaluate(() => go('exterior'));
await page.waitForTimeout(300);
await snap('07-exterior-prompt');
await page.keyboard.press('e');
await page.waitForTimeout(300);
await snap('08-after-exterior-e');

// Keyboard-only pass through the whole school opening: no clicks at all.
await page.evaluate(() => { localStorage.clear(); go('exterior'); });
const seen = [];
for (let i = 0; i < 80; i++) {
  const st = await page.evaluate(() => state);
  if (!seen.includes(st)) seen.push(st);
  if (st === 'hallway') break;
  await page.keyboard.press('e');
  await page.waitForTimeout(120);
}
console.log('E-only run:', seen.join(' -> '));

await browser.close();
