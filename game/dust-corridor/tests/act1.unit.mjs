import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { StoryRunner, PHONE_BEATS, PLAYER_FIRST_BEATS } from '../src/story/StoryScript.js';
import { SisterAI } from '../src/control/SisterAI.js';
import { SegmentStats } from '../src/story/SegmentStats.js';
import { PromptCoach } from '../src/story/PromptCoach.js';

const playerContext = { controlMode: 'PLAYER', alive: true, hp: 1, playerTime: 0, dinnerAt: 150 };
function sister() {
  const ai = new SisterAI({ bus: {}, player: { position: new THREE.Vector3(), yaw: 0, pitch: 0,
    health: 100, maxHealth: 100, alive: true },
    weapon: { ammo: 10, reserve: 60, reloading: false, spec: { magSize: 30 } },
    nav: { isWalkableAt: () => true }, world: { bvh: { raycast: () => ({ hit: false }) } },
    director: { get characters() { throw new Error('reports must use her senses'); } }, rng: { next: () => 0.5 } });
  ai.active = true;
  return ai;
}
const enemy = (x = -10, z = -10) => ({ position: new THREE.Vector3(x, 0, z), alive: true });

test('reactions wait for the current beat and fire once across a restart', () => {
  const seen = [];
  const runner = new StoryRunner({ beats: [{ text: 'opening', hold: 1 }, { text: 'next', hold: 1 }],
    reactions: [{ id: 'kill', when: (c) => c.kills > 0, lines: [{ text: 'reaction', hold: 0.2 }] }],
    onBeat: (b) => seen.push(b.text) });
  runner.start();
  runner.update(0.5, { ...playerContext, kills: 1 });
  assert.deepEqual(seen, ['opening']);
  runner.update(0.5, { ...playerContext, kills: 1 });
  assert.deepEqual(seen, ['opening', 'reaction']);
  runner.update(0.2, { ...playerContext, kills: 1 });
  runner.update(2, { ...playerContext, kills: 1 });
  assert.equal(seen.filter((s) => s === 'reaction').length, 1);
  runner.start();
  runner.update(1, { ...playerContext, kills: 1 });
  assert.equal(seen.filter((s) => s === 'reaction').length, 2);
});

test('short combat events are retained while a beat is still speaking', () => {
  const seen = [];
  const runner = new StoryRunner({ beats: [{ text: 'opening', hold: 1 }, { text: 'next' }],
    onBeat: (b) => seen.push(b.text) });
  runner.start();
  runner.update(0.2, { ...playerContext, hp: 0.2 });
  runner.update(0.8, playerContext);
  assert.equal(seen.at(-1), '血快没了，先缓一缓。');
});

test('the call outranks pending reactions and freezes without waiting on the pool', () => {
  const seen = [];
  const runner = new StoryRunner({ beats: [{ text: 'before', hold: 1 }, { speaker: '妈妈', text: 'call',
    until: (c) => c.forceCall, freeze: true, minHold: 0.3 }, { text: 'end', hold: 0.2 }],
    onBeat: (b) => seen.push(b.text) });
  runner.start();
  runner.enqueue([{ text: 'queued' }]);
  runner.update(1, { ...playerContext, forceCall: true });
  assert.deepEqual(seen, ['before', 'call']);
  runner.update(0.3, { ...playerContext, kills: 1 });
  assert.equal(seen.at(-1), 'end');
  assert.equal(runner.enqueue([{ text: 'late' }]), false);
});

test('continuous prompts allow one exchange per gap and cannot starve the script', () => {
  const seen = [];
  const runner = new StoryRunner({ beats: [{ text: 'one', hold: 0.1 }, { text: 'two', hold: 0.1 },
    { text: 'call', until: () => true, freeze: true, minHold: 0.1 }], reactions: [], onBeat: (b) => seen.push(b.text) });
  runner.start();
  for (let i = 0; i < 100 && runner.running; i++) {
    runner.enqueue([{ text: 'prompt', hold: 0.1 }]);
    runner.update(0.1, playerContext);
  }
  assert.ok(seen.includes('two'));
  assert.ok(seen.includes('call'));
  assert.equal(runner.running, false);
});

test('silence hides the subtitle once, and snapshots retain coaching variants', () => {
  let hides = 0;
  const runner = new StoryRunner({ beats: [{ text: 'before', hold: 0.1 },
    { text: 'coach', variant: () => 'variant', hold: 0.1 }, { text: 'call', until: () => false }],
    reactions: [], onBetween: () => { hides++; } });
  runner.start();
  runner.update(0.1, { ...playerContext, prompts: { issued: 1 } });
  assert.equal(runner.snapshot().text, 'variant');
  for (let i = 0; i < 100; i++) runner.update(0.1, playerContext);
  assert.equal(hides, 1);
});

test('skipTo and stop retire an active reaction and its remaining lines', () => {
  const seen = [];
  const runner = new StoryRunner({ beats: [{ text: 'before', hold: 1 },
    { text: 'call', until: (c) => c.forceCall, minHold: 1 }, { text: 'end' }], reactions: [],
    onBeat: (b) => seen.push(b.text) });
  runner.start();
  runner.enqueue([{ text: 'reaction' }, { text: 'must not appear' }]);
  runner.update(1, playerContext);
  assert.equal(runner.phase, 'reacting');
  assert.equal(runner.skipTo((b) => b.until), true);
  runner.update(1, playerContext);
  assert.equal(seen.includes('must not appear'), false);
  runner.stop();
  assert.equal(runner.enqueue([{ text: 'late' }]), false);
});

for (const [name, beats] of [['sister first', PHONE_BEATS], ['player first', PLAYER_FIRST_BEATS]]) {
  test(`${name} reaches both controls, the call and the final return`, () => {
    const seen = [];
    let mode = null, ended = false, time = 0;
    const runner = new StoryRunner({ beats, reactions: [], onBeat: (b) => { seen.push(b); mode = b.control ?? mode; },
      onEnd: () => { ended = true; } });
    runner.start();
    for (let i = 0; i < 5000 && !ended; i++) {
      if (mode === 'PLAYER') time += 0.1;
      runner.update(0.1, { ...playerContext, controlMode: mode, playerTime: time });
    }
    assert.equal(ended, true);
    assert.ok(seen.some((b) => b.control === 'PLAYER'));
    assert.ok(seen.some((b) => b.control === 'SISTER_AI'));
    const call = seen.findIndex((b) => b.speaker === '妈妈');
    assert.ok(call > 0);
    assert.equal(seen[call + 1].speaker, '和臣');
    assert.equal(seen.at(-1).text, '我妈叫你了，手机给我吧。');
    assert.ok(seen.find((b) => b.cg)?.control === 'PLAYER');
  });
}

for (const [name, setup, expected] of [
  ['nobody', () => {}, '左边没人啊。'],
  ['new perceived target', (ai) => { ai.target = enemy(); ai.targetVisible = true; }, '真有，交给我。'],
  ['already locked', (ai) => { ai.target = enemy(); ai.targetVisible = true; }, '我早看见了。']
]) {
  test(`scan completion: ${name}`, () => {
    const ai = sister();
    const replies = [];
    ai.onFeedback = (text, ok, meta) => { if (meta.complete) replies.push(text); };
    if (name === 'already locked') setup(ai);
    assert.equal(ai.issueIntent('LOOK_LEFT').ok, true);
    if (name !== 'already locked') setup(ai);
    ai._scanTimer = 0;
    ai._updatePromptReports(0.1);
    assert.deepEqual(replies, [expected]);
    ai._updatePromptReports(0.1);
    assert.equal(replies.length, 1);
    assert.equal(ai.promptStats.accepted, 1);
  });
}

test('an unrelated locked target does not answer a left scan', () => {
  const ai = sister();
  ai.target = enemy(10);
  ai.targetVisible = true;
  ai.issueIntent('LOOK_LEFT');
  let reply;
  ai.onFeedback = (text) => { reply = text; };
  ai._scanTimer = 0;
  ai._updatePromptReports(0.1);
  assert.equal(reply, '左边没人啊。');
});

test('a hidden global enemy never becomes a scan result', () => {
  const ai = sister();
  const c = enemy();
  c.team = 'B'; c.getEyePosition = (out) => out.copy(c.position).setY(1.6);
  ai.director = { characters: [c] };
  ai.player.team = 'A';
  ai.world.bvh.raycast = () => ({ hit: true });
  ai.issueIntent('LOOK_LEFT');
  ai._sense(0.1);
  ai._scanTimer = 0;
  let reply;
  ai.onFeedback = (text) => { reply = text; };
  ai._updatePromptReports(0.1);
  assert.equal(reply, '左边没人啊。');
});

test('rapid prompts halve TTL, keep validation and preserve accounting', () => {
  const ai = sister();
  ai.issueIntent('LOOK_LEFT');
  assert.equal(ai.intent.ttl, 1.4);
  assert.match(ai.issueIntent('LOOK_RIGHT').text, /慢点说/);
  assert.equal(ai.intent.ttl, 0.7);
  assert.equal(ai.issueIntent('COVER').ok, false);
  assert.equal(ai.issueIntent('RELOAD').ok, true);
  ai._promptClock += 3.1;
  ai.issueIntent('LOOK_LEFT');
  assert.equal(ai.intent.ttl, 1.4);
  assert.deepEqual(ai.promptStats, { issued: 5, accepted: 4, refused: 1, savedHer: 0 });
});

test('reload refuses a full magazine, an active reload and no reserve', () => {
  const ai = sister();
  ai.weapon.ammo = 30;
  assert.equal(ai.issueIntent('RELOAD').ok, false);
  ai.weapon.ammo = 10; ai.weapon.reloading = true;
  assert.equal(ai.issueIntent('RELOAD').ok, false);
  ai.weapon.reloading = false; ai.weapon.reserve = 0;
  assert.equal(ai.issueIntent('RELOAD').ok, false);
});

test('a new match clears prompt memory, timers and pending reports', () => {
  const ai = sister();
  ai.issueIntent('LOOK_LEFT');
  ai.resetPrompts();
  assert.equal(ai.intent, null);
  assert.equal(ai._scanTimer, 0);
  assert.equal(ai._promptScan, null);
  assert.deepEqual(ai.promptStats, { issued: 0, accepted: 0, refused: 0, savedHer: 0 });
  assert.doesNotMatch(ai.issueIntent('LOOK_LEFT').text, /慢点说/);
  assert.equal(ai.intent.ttl, 1.4);
});

test('low-health cover counts a save only after a living escape from threat', () => {
  const ai = sister();
  ai.player.health = 20;
  ai.target = enemy(); ai.targetVisible = true;
  ai.issueIntent('COVER');
  ai._updatePromptReports(0.8);
  assert.equal(ai.promptStats.savedHer, 0);
  ai.targetVisible = false;
  ai._updatePromptReports(0.6);
  assert.equal(ai.promptStats.savedHer, 1);
  ai._updatePromptReports(0.6);
  assert.equal(ai.promptStats.savedHer, 1);
  ai.issueIntent('COVER');
  ai._updatePromptReports(1);
  assert.equal(ai.promptStats.savedHer, 1, 'a stale remembered target is already safe');
  ai.targetVisible = true; ai.issueIntent('COVER'); ai.player.alive = false;
  ai._updatePromptReports(1);
  assert.equal(ai.promptStats.savedHer, 1);
});

test('context slots require current damage cues, health or exposed movement', () => {
  const ai = sister();
  assert.equal(ai.contextualPrompt(), null);
  ai.hasSuspicion = true; ai.suspicion.set(0, 0, 10); ai.suspicionTime = 0;
  assert.equal(ai.contextualPrompt().kind, 'LOOK_BACK');
  ai.suspicionTime = 10;
  assert.equal(ai.contextualPrompt(), null);
  assert.equal(ai.issueIntent('LOOK_BACK').ok, false);
  ai.player.health = 20;
  assert.equal(ai.contextualPrompt().kind, 'COVER');
  ai.player.health = 100; ai.suspicion.set(0, 0, -10); ai.suspicionTime = 0; ai._wantsMove = true;
  assert.equal(ai.contextualPrompt().kind, 'HOLD');
  ai.world.bvh.raycast = () => ({ hit: true });
  assert.equal(ai.contextualPrompt(), null);
});

test('stats split turns and reset streaks at her death', () => {
  const stats = new SegmentStats();
  stats.recordKill({ involvesPlayer: 'killer' }, 'SISTER_AI');
  stats.recordKill({ involvesPlayer: 'victim' }, 'SISTER_AI');
  stats.recordKill({ involvesPlayer: 'killer' }, 'PLAYER');
  stats.recordKill({ involvesPlayer: 'victim' }, 'PLAYER');
  assert.equal(stats.herStreak, 0);
  const result = stats.result({ A: 3, B: 2 });
  assert.deepEqual(result, { winner: 'A', playerKills: 1, playerDeaths: 1, herKills: 1, herDeaths: 1,
    prompts: { issued: 0, accepted: 0, refused: 0, savedHer: 0 } });
  stats.reset();
  assert.equal(stats.result({ A: 0, B: 0 }).winner, null);
  assert.equal(stats.playerKills, 0);
});

for (const followed of [true, false]) {
  test(`coach response starts timing on its displayed subtitle: followed=${followed}`, () => {
    const coach = new PromptCoach();
    const ai = sister(); ai.target = enemy(); ai.targetVisible = true;
    const lines = [], flashes = [];
    const story = { clock: 0, enqueue: (line) => { lines.push(line[0]); return true; } };
    const ctx = { sister: ai, player: ai.player, story, panel: { flash: (...args) => flashes.push(args) }, enabled: true };
    coach.update(11, ctx);
    assert.equal(lines[0].text, '左边！');
    coach.update(3, ctx);
    assert.equal(lines.length, 1);
    lines[0].onShow();
    assert.equal(flashes[0][0], 'LOOK_LEFT');
    if (followed) ai.player.yaw += 0.4;
    coach.update(followed ? 0.1 : 1.6, ctx);
    assert.equal(lines[1].text, followed ? '对，就是那儿。' : '……算了，你自己打吧。');
  });
}
