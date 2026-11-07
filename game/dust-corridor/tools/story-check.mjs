import { chromium } from '@playwright/test';
import { launch, waitReady } from './browser.mjs';

/**
 * Does the segment follow the beat sheet?
 *
 * Records every subtitle transition instead of sampling at fixed times: a line
 * that appears early or late still has to appear, in order, with the control
 * state it promised. Then checks the two ways out — the call arriving on its
 * own, and the player leaving early.
 */
const port = process.env.PORT || 5199;
const browser = await launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const errors = [];
page.on('pageerror', (e) => errors.push(String(e.message)));

// Eight seconds of player control: long enough to be a real handover, short
// enough that the end is reachable in a test.
await page.goto(`http://localhost:${port}/?auto=1&dynres=0&nomb&dinner=8`, { waitUntil: 'load' });
await waitReady(page);

const report = await page.evaluate(async () => {
  const g = window.__game;
  const h = window.__harness;
  const out = { seen: [], failures: [] };
  const fail = (m) => out.failures.push(m);

  const expected = [
    ['这关我打了好几遍了，你看着。', 'SISTER_AI'],
    ['左边那个，别急着冲。', 'SISTER_AI'],
    ['等他们换弹再上。', 'SISTER_AI'],
    ['你看，这样一枪一个。', 'SISTER_AI'],
    ['这把枪后坐力大，点着打。', 'SISTER_AI'],
    ['等一下，这关打完。', 'SISTER_AI'],
    // Still hers while the still is up: the controls follow the picture.
    ['喏，给你。', 'SISTER_AI'],
    ['我去看电视，你打。', 'PLAYER'],
    ['别站中间，贴着墙走。', 'PLAYER'],
    ['打不过就躲，别硬顶。', 'PLAYER'],
    ['——回家吃饭了！', 'PLAYER'],
    ['我妈叫你了，手机给我吧。', 'PLAYER']
  ];

  // ---- pass 1: let the evening run its course
  let last = null;
  for (let i = 0; i < 400; i++) {
    const snap = {
      text: h.control.subtitle(),
      speaker: h.control.speaker(),
      mode: h.control.mode(),
      frozen: h.control.frozen(),
      outro: h.control.outro(),
      needClick: h.control.needClick(),
      cg: h.control.cg(),
      t: +g.time.toFixed(1)
    };
    const key = `${snap.text}|${snap.mode}|${snap.outro}`;
    if (key !== last) { out.seen.push(snap); last = key; }
    if (snap.outro) break;
    await h.wait(0.25);
  }

  // A line can stay on screen while the mode changes under it — the handover
  // lands when the still goes away — so collapse repeats of the same text.
  const lines = [];
  for (const snap of out.seen) {
    if (!snap.text) continue;
    if (lines.length && lines[lines.length - 1].text === snap.text) continue;
    lines.push(snap);
  }
  if (lines.length !== expected.length) {
    fail(`saw ${lines.length} lines, expected ${expected.length}: ${lines.map((l) => l.text).join(' / ')}`);
  }
  for (let i = 0; i < Math.min(lines.length, expected.length); i++) {
    const [text, mode] = expected[i];
    if (lines[i].text !== text) fail(`line ${i} is "${lines[i].text}", expected "${text}"`);
    if (lines[i].mode !== mode) fail(`line ${i} mode is ${lines[i].mode}, expected ${mode}`);
  }

  const mom = lines.find((l) => l.text === '——回家吃饭了！');
  if (!mom) fail('the call never came');
  else {
    if (mom.speaker !== '妈妈：') fail(`call speaker is ${mom.speaker}`);
    if (!mom.frozen) fail('the call did not freeze the game');
  }

  // She is named in the subtitles now, not called by her relation to him.
  const her = lines.filter((l) => l.text !== '——回家吃饭了！');
  const unnamed = her.find((l) => l.speaker !== '朱里：');
  if (unnamed) fail(`her line "${unnamed.text}" is credited to ${unnamed.speaker}`);

  const hIdx = lines.findIndex((l) => l.text === '喏，给你。');
  if (hIdx < 0) fail('handover line never played');
  else {
    if (lines[hIdx].mode !== 'SISTER_AI') fail('the controls changed hands before the still was up');
    const after = lines[hIdx + 1];
    if (!after) fail('nothing followed the handover');
    else {
      if (after.mode !== 'PLAYER') fail(`controls are ${after.mode} after the cut, not the player's`);
      if (!after.needClick) fail('no click prompt after the story handover');
    }
  }
  if (h.control.lastCg() !== 'handover') fail(`handover CG hook not fired (${h.control.lastCg()})`);

  const cut = out.seen.find((s) => s.cg && s.cg.visible);
  if (!cut) fail('the handover CG never appeared');
  else {
    if (!cut.cg.playing) fail('the CG did not freeze the world');
    if (!cut.cg.loaded) fail('the CG image failed to load');
    if (cut.text !== '喏，给你。') fail(`the CG appeared on "${cut.text}", not the handover line`);
  }

  if (!h.control.outro()) fail('no act card at the end');
  if (h.control.state() !== 'outro') fail(`state is ${h.control.state()} at the end`);

  // ---- pass 2: leaving early
  //
  // Wait for the handover rather than sleeping to it: her stretch is five lines
  // long now, and a fixed wait would either be too short to reach it or so long
  // that the simulation never gets there inside the harness budget.
  h.start();
  let reached = false;
  for (let i = 0; i < 160; i++) {
    await h.wait(0.5, 60000);
    if (h.control.mode() === 'PLAYER') { reached = true; break; }
  }
  if (!reached) fail('second run never reached the player');
  const before = h.control.subtitle();
  h.control.leaveEarly();
  let jumped = null;
  for (let i = 0; i < 24; i++) {
    await h.wait(0.25);
    if (h.control.subtitle() === '——回家吃饭了！') { jumped = true; break; }
  }
  out.earlyExit = { from: before, jumped: !!jumped, t: +g.time.toFixed(1) };
  if (!jumped) fail('H did not cut to the call');

  return out;
});

console.log(JSON.stringify(report, null, 2));
if (errors.length) console.log('--- page errors ---\n' + errors.slice(0, 5).join('\n'));
await browser.close();
if (report.failures.length) { console.log(`FAILED: ${report.failures.length}`); process.exit(1); }
console.log('OK');
