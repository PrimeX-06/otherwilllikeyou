/**
 * Check the aggregator: site plays inside the wrapper, its ending stays closed
 * until the last character has landed, and then E lands on the pixel game.
 *
 * Uses ?ending=1 so the film's own ending path runs (not a hand call), just
 * without waiting out all eight chapters. The ending text itself takes about
 * 22.2 s (189 characters), so this check waits for it for real.
 */
import { launch } from './browser.mjs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
// The aggregator is a sibling of pixel-act1 in the local workspace and is not
// part of the public game repository; point AGGREGATOR_URL at it elsewhere.
const BASE = process.env.AGGREGATOR_URL
  || pathToFileURL(path.resolve(HERE, '../../../../index.html')).href;
const browser = await launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const errors = [];
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); });

const promptState = (frame) => frame.evaluate(() => {
  const el = document.getElementById('endingEnter');
  const cs = getComputedStyle(el);
  return {
    phase,
    shown: el.classList.contains('is-visible'),
    visible: cs.visibility,
    opacity: cs.opacity,
    text: el.textContent.replace(/\s+/g, ' ').trim()
  };
});
const pressE = (frame) => frame.evaluate(() => {
  window.dispatchEvent(new KeyboardEvent('keydown', { key: 'e', code: 'KeyE', bubbles: true }));
});

await page.goto(BASE + '?ending=1', { waitUntil: 'load' });
await page.waitForTimeout(1500);
console.log('frames:', page.frames().map((f) => f.url()));

const site = page.frames().find((f) => f.url().includes('mono-koi-story/index.html'));
if (!site) { console.log('no site frame'); process.exit(1); }

// Mid-typing: the prompt must still be hidden, and E must not skip the text.
await page.waitForTimeout(14000); // ≈15.5 s in
console.log('mid-text:', JSON.stringify(await promptState(site)));
await pressE(site);
await page.waitForTimeout(800);
console.log('url after early E:', page.url());

// Ending text: 189 chars, last animation delay 20.8 s, +0.9 s reveal +0.5 s pause ⇒ 22.2 s.
await page.waitForTimeout(9500); // ≈25.8 s in
console.log('after text:', JSON.stringify(await promptState(site)));
await page.screenshot({ path: 'C:/Users/yueqi/AppData/Local/Temp/school-shots/aggregator-ending.png' });

await pressE(site);
await page.waitForTimeout(2600);
console.log('url after E:', page.url());
await page.waitForTimeout(2500);
const game = await page.evaluate(() => ({
  hasGame: typeof window.__game !== 'undefined',
  scene: window.__game?.state?.().scene,
  title: document.title
}));
console.log('game:', JSON.stringify(game));
await page.screenshot({ path: 'C:/Users/yueqi/AppData/Local/Temp/school-shots/aggregator-game.png' });

console.log('errors:', errors.slice(0, 6));
await browser.close();
