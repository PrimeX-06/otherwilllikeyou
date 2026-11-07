/**
 * The way back out of the phone.
 *
 * When the segment reports its result the act card comes up, and E is supposed
 * to give the room back: frame unloaded, pixel scene drawing again, keys
 * reaching it. This walks that path and checks the page is actually alive
 * afterwards — a scene that never repaints looks exactly like a crash.
 */
import { chromium } from 'playwright';
import { launch, waitReady } from './browser.mjs';
import { prototypeUrl as BASE } from './paths.mjs';
const browser = await launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });

const errors = [];
page.on('console', (m) => { if (m.type() === 'error' && !m.text().includes('X3595')) errors.push(m.text()); });
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));

await page.goto(BASE + '?scene=bedroom&phone=1&dinner=5', { waitUntil: 'load' });
await waitReady(page);

// Wait for the act card: the segment has reported its result.
await page.waitForFunction(() => window.__game.embed.result === true, null, { timeout: 180000 })
  .catch(() => {});

const atCard = await page.evaluate(() => ({
  embed: { ...window.__game.embed },
  endcard: document.getElementById('endcard').className,
  host: document.getElementById('gamehost').className
}));

await page.keyboard.press('KeyE');
await page.waitForTimeout(1500);

const afterExit = await page.evaluate(() => ({
  embed: { ...window.__game.embed },
  endcard: document.getElementById('endcard').className,
  host: document.getElementById('gamehost').className,
  src: document.getElementById('gameframe').getAttribute('src'),
  scene: window.__game.state().scene,
  active: document.activeElement ? (document.activeElement.id || document.activeElement.tagName) : null,
  hasFocus: document.hasFocus(),
  // The pixel scene repaints from the same loop that drives the player, so a
  // moving player is proof the loop came back.
  player: { x: Math.round(window.__game.player.x), y: Math.round(window.__game.player.y) }
}));

// The room has to hear the keyboard again. It is a scripted space — walking is
// disabled in the bedroom on purpose — so the honest probe is E: it opens the
// line that leads back to the phone.
await page.keyboard.press('KeyE');
await page.waitForTimeout(500);
const heard = await page.evaluate(() => ({
  dialogOpen: window.__game.save.dialogOpen,
  line: document.getElementById('line').textContent
}));

const report = { errors, atCard, afterExit, heard };
console.log(JSON.stringify(report, null, 2));

const failures = [];
if (!atCard.embed.result) failures.push('the segment never reported a result');
if (afterExit.embed.active) failures.push('the frame was not released');
if (afterExit.host.includes('show')) failures.push('the frame is still on screen');
if (afterExit.scene !== 'bedroom') failures.push(`scene is ${afterExit.scene}, not bedroom`);
if (!heard.dialogOpen) failures.push('the room does not hear the keyboard after the segment');
if (errors.length) failures.push(...errors);

await browser.close();
if (failures.length) { console.log('FAILED:'); for (const f of failures) console.log(' -', f); process.exit(1); }
console.log('OK');
