import { chromium } from '@playwright/test';
import { launch, waitReady } from './browser.mjs';

/**
 * Handover check: does the AI actually play, and does the switch actually
 * switch?
 *
 * Runs against the dev server with the same seam the Playwright suite uses.
 * Deliberately not a spec file — it prints a report and exits non-zero on a
 * failed assertion, so it can be run on its own while iterating.
 */

const port = process.env.PORT || 5199;
const browser = await launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });

const errors = [];
page.on('pageerror', (e) => errors.push(String(e.message)));
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });

await page.goto(`http://localhost:${port}/?auto=1&dynres=0&nomb`, { waitUntil: 'load' });
await waitReady(page);

const report = await page.evaluate(async () => {
  const g = window.__game;
  const h = window.__harness;
  const out = { steps: [], failures: [] };
  const fail = (m) => out.failures.push(m);
  const snap = () => h.control.sister();

  const dist = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);

  // ---------------------------------------------------------------- 1. AI plays
  // The beat sheet would hand the character back mid-test; this run is about
  // the bus, not the script.
  h.control.stopStory();
  h.control.set('SISTER_AI');
  if (h.control.mode() !== 'SISTER_AI') fail('mode did not become SISTER_AI');

  const start = snap();
  const samples = [];
  let minAmmo = Infinity;
  let reloaded = false;
  for (let i = 0; i < 8; i++) {
    await h.wait(1.5);
    const s = snap();
    samples.push({ t: +g.time.toFixed(1), state: s.state, x: s.position.x, z: s.position.z, ammo: s.ammo, hp: s.health });
    minAmmo = Math.min(minAmmo, s.ammo);
    if (s.reloading) reloaded = true;
  }
  const end = snap();
  const travelled = dist(start.position, end.position);
  out.steps.push({ phase: 'ai', start: start.position, end: end.position, travelled: +travelled.toFixed(2), samples });

  if (travelled < 3) fail(`AI barely moved (${travelled.toFixed(2)} m)`);
  if (end.stuck > 2) fail(`AI reports stuck ${end.stuck} times`);

  // She has to be doing something with the gun: fired, or at least reloaded.
  const weaponMoved = minAmmo < 30 || end.ammo < 30 || reloaded;
  if (!weaponMoved) fail('AI never fired or reloaded in 12 s');

  // ------------------------------------------------------- 2. switch to player
  const beforeSwitch = snap();
  h.control.set('PLAYER');
  if (h.control.mode() !== 'PLAYER') fail('mode did not become PLAYER');
  const heldAfter = h.control.held();
  if (heldAfter.length) fail(`AI still holding ${heldAfter.join(',')} after handover`);

  // She may well have stopped facing a wall — walking into one is not a failed
  // handover, so both directions are tried before calling it broken.
  const p0 = { x: g.player.position.x, z: g.player.position.z };
  let playerMoved = 0;
  for (const key of ['KeyW', 'KeyS']) {
    const from = { x: g.player.position.x, z: g.player.position.z };
    h.key(key, true);
    await h.wait(1.0);
    h.key(key, false);
    playerMoved = Math.max(playerMoved, dist(from, { x: g.player.position.x, z: g.player.position.z }));
    if (playerMoved > 1) break;
  }
  out.steps.push({ phase: 'player', moved: +playerMoved.toFixed(2), from: p0 });
  if (playerMoved < 1) fail(`player did not move on W/S (${playerMoved.toFixed(2)} m)`);

  // The state must have carried over, not reset.
  if (Math.abs(g.player.health - beforeSwitch.health) > 45) {
    fail(`health jumped across the handover: ${beforeSwitch.health} -> ${g.player.health}`);
  }

  // ------------------------------------------------------- 3. switch back to AI
  h.key('KeyW', true);                       // deliberately left held
  h.control.set('SISTER_AI');
  const residual = h.control.held();
  const rawKeys = [...g.rawInput.keys.entries()].filter(([, v]) => v).map(([k]) => k);
  out.steps.push({ phase: 'back', residual, rawKeys });
  if (rawKeys.includes('KeyW')) fail('W stayed held in the device layer after handing back');

  const a0 = snap();
  await h.wait(4);
  const a1 = snap();
  out.steps.push({ phase: 'ai-again', from: a0.position, to: a1.position, moved: +dist(a0.position, a1.position).toFixed(2) });
  if (dist(a0.position, a1.position) < 1) fail('AI did not resume moving after taking back control');

  // ------------------------------------------------------------- 4. prompts
  const promptResults = {};
  for (const kind of ['COVER', 'LOOK_LEFT', 'ADVANCE', 'RELOAD']) {
    promptResults[kind] = h.control.prompt(kind);
    await h.wait(0.4);
  }
  out.steps.push({ phase: 'prompts', promptResults });
  const refused = Object.entries(promptResults).filter(([, r]) => r && r.ok === false);
  if (refused.length === 4) fail('every prompt was refused');

  out.mode = h.control.mode();
  out.final = snap();
  out.gameTime = +g.time.toFixed(1);
  out.fps = Math.round(g.frameStats.fps);
  return out;
});

await page.screenshot({ path: 'shots/control-check.png', timeout: 5000 }).catch(() => {});
await browser.close();

console.log(JSON.stringify(report, null, 2));
if (errors.length) {
  console.log('--- page errors ---');
  for (const e of errors.slice(0, 8)) console.log(e);
}
if (report.failures.length) {
  console.log(`FAILED: ${report.failures.length}`);
  process.exit(1);
}
console.log('OK');
