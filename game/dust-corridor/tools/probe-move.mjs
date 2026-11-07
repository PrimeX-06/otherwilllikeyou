import { chromium } from '@playwright/test';

const port = process.env.PORT || 5199;
const browser = await chromium.launch({
  channel: 'chrome',
  args: ['--use-gl=angle', '--use-angle=gl', '--enable-unsafe-swiftshader',
    '--ignore-gpu-blocklist', '--disable-frame-rate-limit']
});
const page = await browser.newPage({ viewport: { width: 960, height: 540 } });
page.on('pageerror', (e) => console.log('[pageerror]', e.message));
await page.goto(`http://localhost:${port}/?auto=1&dynres=0&nomb`, { waitUntil: 'load' });
await page.waitForFunction(() => window.__ready === true, null, { timeout: 180000 });

const out = await page.evaluate(async () => {
  const g = window.__game;
  const h = window.__harness;
  const log = [];
  h.control.set('SISTER_AI');
  await h.wait(3);
  h.control.set('PLAYER');
  log.push({ where: 'after switch', state: g.state, mode: g.input.mode, enabled: g.rawInput.enabled, alive: g.player.alive });

  h.key('KeyW', true);
  log.push({ where: 'injected', key: g.rawInput.keys.get('KeyW'), action: g.input.action('forward'), enabled: g.rawInput.enabled });
  await h.wait(0.5);
  log.push({
    where: 'after 0.5s', action: g.input.action('forward'), speed: +g.player.speed2D.toFixed(2),
    pos: { x: +g.player.position.x.toFixed(2), z: +g.player.position.z.toFixed(2) },
    grounded: g.player.controller.grounded, state: g.state, mode: g.input.mode
  });
  await h.wait(1.0);
  log.push({
    where: 'after 1.5s', action: g.input.action('forward'), speed: +g.player.speed2D.toFixed(2),
    pos: { x: +g.player.position.x.toFixed(2), z: +g.player.position.z.toFixed(2) },
    keys: [...g.rawInput.keys.entries()].filter(([, v]) => v).map(([k]) => k)
  });
  h.key('KeyW', false);
  return log;
});
console.log(JSON.stringify(out, null, 2));
await browser.close();
