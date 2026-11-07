/**
 * The interface, measured inside the frame.
 *
 * The last run of this page lost its stylesheet to CORS and everything the
 * player needed was still in the DOM — a few thousand pixels below the fold,
 * invisible. So the question is never "does the element exist", it is "where is
 * it, and is anything drawn there". This asks the embedded document directly.
 */
import { chromium } from 'playwright';
import { launch, waitReady } from './browser.mjs';
import { prototypeUrl as BASE } from './paths.mjs';
import { writeFileSync } from 'node:fs';
const browser = await launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });

const errors = [];
page.on('console', (m) => { if (m.type() === 'error' && !m.text().includes('X3595')) errors.push(m.text()); });
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));

await page.goto(BASE + '?scene=bedroom&phone=1&dinner=6', { waitUntil: 'load' });
await waitReady(page);

const frame = () => page.frames().find((f) => f.url().includes('dust-corridor'));

// Wait for the handover: the CG is up, the player owns the phone, the click
// prompt is showing. That single frame has every piece of interface at once.
for (let i = 0; i < 70; i++) {
  const f = frame();
  if (f) {
    const ready = await f.evaluate(() => {
      const g = window.__game;
      return !!g && g.story?.index >= 6 && !!g.cgPlaying;
    }).catch(() => false);
    if (ready) break;
  }
  await page.waitForTimeout(1000);
}

const report = await frame().evaluate(() => {
  const out = { failures: [], viewport: [innerWidth, innerHeight], doc: null };
  const fail = (m) => out.failures.push(m);
  const box = (el) => {
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) };
  };
  const inside = (r) => r && r.x >= -2 && r.y >= -2
    && r.x + r.w <= innerWidth + 2 && r.y + r.h <= innerHeight + 2;

  out.doc = {
    scrollHeight: document.documentElement.scrollHeight,
    bodyHeight: Math.round(document.body.getBoundingClientRect().height),
    canvas: box(document.querySelector('#scene')),
    sheetRules: [...document.styleSheets].reduce((n, s) => {
      try { return n + s.cssRules.length; } catch { return n; }
    }, 0)
  };
  if (out.doc.sheetRules < 50) fail(`stylesheet is missing (${out.doc.sheetRules} rules)`);
  if (out.doc.scrollHeight > innerHeight + 4) fail(`document scrolls (${out.doc.scrollHeight}px)`);

  const sub = document.querySelector('#subtitle');
  const subBox = box(sub);
  out.subtitle = {
    text: sub?.querySelector('.line')?.textContent ?? null,
    speaker: sub?.querySelector('.speaker')?.textContent ?? null,
    box: subBox,
    opacity: sub ? getComputedStyle(sub).opacity : null,
    z: sub ? getComputedStyle(sub).zIndex : null
  };
  if (!subBox || !inside(subBox)) fail('subtitle is not inside the viewport');
  if (out.subtitle.opacity === '0') fail('subtitle is transparent');

  const cg = document.querySelector('#cg-cut');
  const cgBox = box(cg);
  out.cg = {
    visible: cg?.classList.contains('show'),
    box: cgBox,
    loaded: cg?.naturalWidth > 0,
    size: cg ? [cg.naturalWidth, cg.naturalHeight] : null
  };
  if (!out.cg.loaded) fail('the handover CG did not load');

  const chips = [...document.querySelectorAll('.cp-chip')].map((c) => ({ text: c.textContent, box: box(c), disabled: c.disabled }));
  out.panel = {
    // No owner badge: the script names the owner, not a corner label.
    badgeGone: !document.querySelector('#cp-badge') && !document.querySelector('#cp-toggle'),
    chips,
    needClick: box(document.querySelector('#cp-need-click')),
    needClickShown: document.querySelector('#cp-need-click')?.classList.contains('show')
  };
  if (!out.panel.badgeGone) fail('the owner badge is back');
  if (!out.panel.chips.length) fail('no prompt chips');

  const cx = innerWidth / 2, cy = innerHeight / 2;
  const covers = (r) => r && r.x < cx && r.x + r.w > cx && r.y < cy && r.y + r.h > cy;
  for (const c of chips) if (covers(c.box)) fail(`chip "${c.text}" covers the reticle`);

  return out;
});

const shot = { errors, report };
writeFileSync('shots/embed-ui.json', JSON.stringify(shot, null, 2));
console.log(JSON.stringify(shot, null, 2));
await browser.close();
if (report.failures.length) { console.log(`FAILED: ${report.failures.length}`); process.exit(1); }
console.log('OK');
