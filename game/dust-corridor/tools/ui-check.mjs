import { chromium } from '@playwright/test';
import { launch, waitReady } from './browser.mjs';

/**
 * Layout check for the handover interface.
 *
 * Pixels are not available in this environment — a headless WebGL surface never
 * hands the compositor a frame, so both `page.screenshot` and CDP capture hang.
 * Geometry is the part that actually regresses anyway: nothing may sit on the
 * reticle and the chips must stay clear of the bottom readouts.
 */
const port = process.env.PORT || 5199;
const browser = await launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
page.on('pageerror', (e) => console.log('[pageerror]', e.message));
await page.goto(`http://localhost:${port}/?auto=1&dynres=0&nomb`, { waitUntil: 'load' });
await waitReady(page);

const report = await page.evaluate(async () => {
  const h = window.__harness;
  const out = { failures: [], states: {} };
  const fail = (m) => out.failures.push(m);
  const rect = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) };
  };

  h.control.stopStory();
  h.control.set('SISTER_AI');
  await h.wait(3);
  h.control.prompt('COVER');
  await h.wait(0.2);

  const panel = document.querySelector('#control-panel');
  const prompts = rect('#cp-prompts');
  const feedback = document.querySelector('#cp-feedback');
  const chips = [...document.querySelectorAll('.cp-chip')];

  out.states.ai = {
    visible: panel.classList.contains('show'),
    opacity: getComputedStyle(panel).opacity,
    // The badge was removed on purpose: the script names the owner, not a
    // corner label. Asserted so it does not creep back in.
    badgeGone: !document.querySelector('#cp-badge') && !document.querySelector('#cp-toggle'),
    chipsEnabled: chips.every((c) => !c.disabled),
    chipLabels: chips.map((c) => c.textContent),
    feedback: feedback.textContent,
    feedbackShown: feedback.classList.contains('show'),
    prompts
  };

  if (!out.states.ai.visible) fail('panel hidden in AI mode');
  if (!out.states.ai.badgeGone) fail('the owner badge is back');
  if (!out.states.ai.chipsEnabled) fail('prompt chips disabled in AI mode');
  if (!out.states.ai.feedbackShown) fail('no feedback shown after a prompt');

  // Geometry: nothing may sit on the reticle (centre of the viewport), and the
  // chips must not reach into the corner readouts.
  const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
  const coversCentre = (r) => r && r.x < cx && r.x + r.w > cx && r.y < cy && r.y + r.h > cy;
  if (coversCentre(prompts)) fail('prompt strip covers the reticle');
  if (prompts && prompts.y + prompts.h > window.innerHeight - 60) fail('prompt strip overlaps the bottom readouts');

  // Pointer events: only the buttons may catch clicks, or the canvas loses them.
  out.states.pointer = {
    panel: getComputedStyle(panel).pointerEvents,
    chip: getComputedStyle(chips[0]).pointerEvents
  };
  if (out.states.pointer.panel !== 'none') fail('panel swallows pointer events');
  if (out.states.pointer.chip !== 'auto') fail('chips are not clickable');

  h.control.set('PLAYER');
  await h.wait(0.3);
  out.states.player = {
    chipsDisabled: chips.every((c) => c.disabled),
    mode: h.control.mode()
  };
  if (!out.states.player.chipsDisabled) fail('prompt chips still active in player mode');

  return out;
});

console.log(JSON.stringify(report, null, 2));
await browser.close();
if (report.failures.length) { console.log(`FAILED: ${report.failures.length}`); process.exit(1); }
console.log('OK');
