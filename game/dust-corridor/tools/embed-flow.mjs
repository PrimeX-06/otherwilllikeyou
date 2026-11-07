/**
 * Watch one full framed run: file://, one iframe, `?embed=1`, short dinner.
 *
 * Every sample is something the player would have seen. Nothing is asserted
 * here; this is the observation pass that says which of the four complaints is
 * real and which is a consequence of another.
 */
import { chromium } from 'playwright';
import { launch, waitReady } from './browser.mjs';
import { prototypeUrl as BASE } from './paths.mjs';
import { writeFileSync, mkdirSync } from 'node:fs';

const OUTER = BASE + '?scene=bedroom&phone=1&dinner=6';

mkdirSync('shots', { recursive: true });

const browser = await launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });

const log = [];
page.on('console', (m) => {
  const t = m.text();
  if (t.includes('X3595')) return;
  log.push(`[console:${m.type()}] ${t}`);
});
page.on('pageerror', (e) => log.push(`[pageerror] ${e.message}`));
page.on('requestfailed', (r) => log.push(`[requestfailed] ${r.url().slice(-60)} — ${r.failure()?.errorText}`));

await page.goto(OUTER, { waitUntil: 'load' });
await waitReady(page);

const inner = async () => {
  const f = page.frames().find((x) => x.url().includes('dust-corridor'));
  if (!f) return { missing: true };
  try {
    return await f.evaluate(() => {
      const g = window.__game;
      if (!g) return { booted: false };
      const subEl = document.querySelector('#subtitle');
      const line = subEl?.querySelector('.line');
      const r = subEl?.getBoundingClientRect();
      const cs = subEl ? getComputedStyle(subEl) : null;
      const cgEl = document.querySelector('#cg-cut');
      return {
        state: g.state,
        mode: g.input?.mode,
        frozen: !!g.frozen,
        cg: !!g.cgPlaying,
        beat: g.story?.index,
        running: !!g.story?.running,
        sub: line?.textContent || '',
        subBox: r ? [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)] : null,
        subOpacity: cs ? cs.opacity : null,
        subFont: cs ? cs.fontSize : null,
        subZ: cs ? cs.zIndex : null,
        cgVisible: !!cgEl && cgEl.classList.contains('show'),
        playerTime: +(g.playerControlTime ?? 0).toFixed(1),
        pos: g.player ? [g.player.position.x.toFixed(1), g.player.position.z.toFixed(1)] : null,
        sister: g.sister ? [g.sister.state, g.sister.player.position.x.toFixed(1), g.sister.player.position.z.toFixed(1)] : null,
        fps: Math.round(g.frameStats?.fps ?? 0),
        size: [innerWidth, innerHeight],
        locked: !!document.pointerLockElement
      };
    });
  } catch (err) {
    return { error: String(err).slice(0, 100) };
  }
};

const outer = async () => page.evaluate(() => ({
  host: document.getElementById('gamehost').className,
  note: document.getElementById('gameNote').textContent,
  endcard: document.getElementById('endcard').className,
  embed: { ...window.__game.embed }
}));

const rows = [];
for (let i = 0; i < 75; i++) {
  rows.push({ t: i, o: await outer(), i: await inner() });
  await page.waitForTimeout(1000);
}

writeFileSync('shots/embed-flow.json', JSON.stringify({ log, rows }, null, 2));

console.log('--- log ---');
for (const l of log.slice(0, 30)) console.log(l);
console.log('--- samples ---');
for (const { t, o, i } of rows) {
  console.log(
    `t=${String(t).padStart(2)} host=${o.host.padEnd(16)} card=${o.endcard.padEnd(8)}` +
    ` | ${i.state ?? '-'}/${i.mode ?? '-'} beat=${i.beat ?? '-'} run=${i.running} frz=${i.frozen} cg=${i.cg}/${i.cgVisible}` +
    ` sub=${JSON.stringify(i.sub)} box=${JSON.stringify(i.subBox)} op=${i.subOpacity} ${i.subFont} z=${i.subZ}` +
    ` fps=${i.fps} pTime=${i.playerTime} sister=${JSON.stringify(i.sister)} ${i.error ?? ''}`
  );
}

await browser.close();
