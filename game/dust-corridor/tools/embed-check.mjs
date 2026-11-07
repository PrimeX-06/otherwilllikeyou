/**
 * Reproduce the framed run the way the story page does it: file://, one iframe,
 * `?embed=1`, messages across the boundary.
 *
 * The point is not to assert the design but to watch it — every line printed is
 * something the player would have seen or failed to see.
 */
import { chromium } from 'playwright';
import { launch, waitReady } from './browser.mjs';
import { prototypeUrl } from './paths.mjs';
import { writeFileSync, mkdirSync } from 'node:fs';

const OUTER = process.env.OUTER_URL
  || prototypeUrl + '?scene=bedroom&phone=1';

mkdirSync('shots', { recursive: true });

const browser = await launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });

const log = [];
page.on('console', (m) => log.push(`[console:${m.type()}] ${m.text()}`));
page.on('pageerror', (e) => log.push(`[pageerror] ${e.message}`));
page.on('requestfailed', (r) => log.push(`[requestfailed] ${r.url()} — ${r.failure()?.errorText}`));

await page.goto(OUTER, { waitUntil: 'load' });
await waitReady(page);

const outer = async () => page.evaluate(() => {
  const s = window.__game.state();
  return {
    embed: s.embed,
    note: document.getElementById('gameNote').textContent,
    host: document.getElementById('gamehost').className,
    iframeSrc: document.getElementById('gameframe').getAttribute('src'),
    endcard: document.getElementById('endcard').className
  };
});

const frames = () => page.frames().filter((f) => f.url().includes('dust-corridor'));

const inner = async () => {
  const f = frames()[0];
  if (!f) return { missing: true };
  try {
    return await f.evaluate(() => {
      const g = window.__game;
      if (!g) return { booted: false, ready: !!window.__ready };
      const subEl = document.querySelector('#subtitle');
      const sub = subEl ? subEl.querySelector('.line') : null;
      return {
        booted: true,
        state: g.state,
        mode: g.input?.mode,
        frozen: !!g.frozen,
        cgPlaying: !!g.cgPlaying,
        storyRunning: !!g.story?.running,
        beat: g.story?.index,
        subtitle: sub ? sub.textContent : null,
        subtitleVisible: !!subEl?.classList.contains('show'),
        subtitleEnabled: !!subEl?.classList.contains('enabled'),
        pauseMenu: !!g.menu?.pausedOpen,
        lock: !!document.querySelector('canvas')?.ownerDocument.pointerLockElement,
        sister: g.sister ? { state: g.sister.state, target: g.sister.targetId ?? null } : null,
        fps: Math.round(g.frameStats?.fps ?? 0)
      };
    });
  } catch (err) {
    return { error: String(err).slice(0, 120) };
  }
};

const timeline = [];
for (let i = 0; i < 24; i++) {
  timeline.push({ t: i * 0.5, outer: await outer(), inner: await inner() });
  await page.waitForTimeout(500);
}

// After the segment is up, click inside the frame the way a player would.
const before = await inner();
const f = frames()[0];
if (f) {
  const el = await f.frameElement();
  if (el) await el.click({ position: { x: 640, y: 360 } }).catch(() => {});
}
await page.waitForTimeout(1200);
const afterClick = await inner();

const report = { log, timeline, click: { before, afterClick } };
writeFileSync('shots/embed-check.json', JSON.stringify(report, null, 2));

console.log('--- console ---');
for (const l of log.slice(0, 40)) console.log(l);
console.log('--- timeline ---');
for (const row of timeline) {
  const i = row.inner || {};
  console.log(
    `t=${row.t.toFixed(1)} outer{note="${row.outer.note}" host="${row.outer.host}" endcard="${row.outer.endcard}"}` +
    ` inner{state=${i.state} mode=${i.mode} frozen=${i.frozen} cg=${i.cgPlaying} story=${i.storyRunning} beat=${i.beat}` +
    ` sub=${JSON.stringify(i.subtitle)} vis=${i.subtitleVisible} lock=${i.lock} fps=${i.fps}${i.error ? ' ERR=' + i.error : ''}${i.missing ? ' MISSING' : ''}}`
  );
}
console.log('--- click ---');
console.log('before', JSON.stringify(before));
console.log('after ', JSON.stringify(afterClick));

await browser.close();
