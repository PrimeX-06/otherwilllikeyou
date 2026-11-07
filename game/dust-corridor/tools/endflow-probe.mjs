/**
 * Fast-forward the embedded segment through the dinner call and the handoff.
 *
 * Headless renders at a fraction of real time, so this drives the game's own
 * fixed step directly instead of waiting: the story, the freeze, the last line,
 * the `result` message and the host's way back all run through their real code.
 */
import { launch, waitReady } from './browser.mjs';
import { prototypeUrl as BASE } from './paths.mjs';

const browser = await launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const errors = [];
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
page.on('console', (m) => { if (m.type() === 'error' && !m.text().includes('X3595')) errors.push(m.text()); });

await page.goto(BASE + '?scene=bedroom&phone=1', { waitUntil: 'load' });
await waitReady(page);

const frame = () => page.frames().find((f) => f.url().includes('dust-corridor'));
for (let i = 0; i < 120 && !frame(); i++) await page.waitForTimeout(250);
const f = frame();
if (!f) { console.log('no frame'); process.exit(1); }
await f.waitForFunction(() => window.__game && window.__ready === true, null, { timeout: 60000 });
await f.waitForFunction(() => window.__game.state === 'playing', null, { timeout: 30000 });

// Skip only the still's real-time hold; everything else is the real code.
const log = await f.evaluate(async () => {
  const g = window.__game;
  g.cg.show = () => Promise.resolve(true);

  const out = [];
  const note = (tag) => {
    const s = g.story;
    out.push({
      tag,
      state: g.state,
      index: s.index,
      phase: s.phase,
      text: s.beats[s.index]?.text ?? null,
      frozen: !!g.frozen,
      ptime: +g.playerControlTime.toFixed(1),
      mode: g.input.mode,
      sub: document.querySelector('#subtitle').className
    });
  };

  note('start');
  let seenBeat = -1;
  let seenPhase = '';
  for (let i = 0; i < 4000 && g.state === 'playing'; i++) {
    g._fixedUpdate(0.05);
    if (g.story.phase !== seenPhase) {
      seenPhase = g.story.phase;
      note('phase:' + seenPhase);
    }
    if (g.story.index !== seenBeat) {
      seenBeat = g.story.index;
      note('beat' + seenBeat);
    }
    if (i % 10 === 0) await new Promise((r) => setTimeout(r, 0));
  }
  note('end');
  return out;
});

console.log(log.map((l) => `t=${l.ptime}s ${l.tag} state=${l.state} beat=${l.index} ${l.phase} frozen=${l.frozen} ${l.sub} ${JSON.stringify(l.text)}`).join('\n'));

await page.waitForTimeout(600);
const host = await page.evaluate(() => ({
  host: document.getElementById('gamehost').className,
  note: document.getElementById('gameNote').textContent,
  result: window.__game.embed.result,
  scene: window.__game.state().scene
}));
console.log('host after result:', host);

// E in the frame is what a player would press; it has to reach the host.
await f.evaluate(() => {
  window.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyE', key: 'e', bubbles: true }));
});
await page.waitForTimeout(1200);
const after = await page.evaluate(() => ({
  embed: { ...window.__game.embed },
  state: window.__game.state(),
  scene: document.getElementById('sceneTitle').textContent
}));
console.log('after E:', JSON.stringify({ embed: after.embed, scene: after.state.scene, returning: after.state.returning }));

console.log('errors:', errors.slice(0, 5));
await browser.close();
