import { chromium } from '@playwright/test';
import { writeFileSync, mkdirSync } from 'node:fs';

/** Capture the handover UI while she is actually playing. */
const port = process.env.PORT || 5199;
mkdirSync('shots', { recursive: true });

const browser = await chromium.launch({
  channel: 'chrome',
  args: ['--use-gl=angle', '--use-angle=gl', '--enable-unsafe-swiftshader',
    '--ignore-gpu-blocklist', '--disable-frame-rate-limit']
});
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
page.on('pageerror', (e) => console.log('[pageerror]', e.message));
await page.goto(`http://localhost:${port}/?auto=1&dynres=0&nomb`, { waitUntil: 'load' });
await page.waitForFunction(() => window.__ready === true, null, { timeout: 180000 });

const state = await page.evaluate(async () => {
  const g = window.__game;
  const h = window.__harness;
  h.control.set('SISTER_AI');
  await h.wait(6);
  h.control.prompt('ADVANCE');
  await h.wait(0.4);
  return { mode: h.control.mode(), sister: h.control.sister(), fps: Math.round(g.frameStats.fps) };
});

writeFileSync('shots/handover-state.json', JSON.stringify(state, null, 2));

// `page.screenshot` never returns here: the tab is animating a WebGL surface
// continuously and the compositor never hands Playwright the stable frame it
// waits for. The CDP call does not wait for that, and is bounded anyway so a
// still-stubborn capture fails the shot instead of the run.
const client = await page.context().newCDPSession(page);
const shot = await Promise.race([
  client.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false }),
  new Promise((r) => setTimeout(() => r(null), 45000))
]);
if (shot) writeFileSync('shots/handover-ai.png', Buffer.from(shot.data, 'base64'));
console.log(JSON.stringify(state, null, 2));
console.log(shot ? 'shot: ok' : 'shot: timed out');
await browser.close();
