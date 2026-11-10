import { test, expect } from '@playwright/test';
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

test.use({ channel: process.env.DUST_BROWSER || undefined, viewport: { width: 1280, height: 720 },
  launchOptions: { args: ['--enable-unsafe-swiftshader', '--autoplay-policy=no-user-gesture-required'] } });
let site, base;
const root = path.resolve(fileURLToPath(new URL('../../..', import.meta.url)));
test.beforeAll(async () => {
  site = http.createServer(async (req, res) => {
    try {
      const filename = path.resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://local').pathname));
      if (!filename.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
      const data = await readFile(filename);
      const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg' };
      res.writeHead(200, { 'Content-Type': types[path.extname(filename)] ?? 'application/octet-stream' });
      res.end(data);
    } catch { res.writeHead(404).end(); }
  });
  await new Promise((resolve) => site.listen(0, '127.0.0.1', resolve));
  base = `http://127.0.0.1:${site.address().port}/prototype.html`;
});
test.afterAll(async () => { await new Promise((resolve) => site.close(resolve)); });

async function openRoom(page) {
  await page.goto(base + '?scene=bedroom&ui=clean&freeze=1');
  await page.waitForFunction(() => window.__ready);
}
async function dismiss(page) {
  await page.evaluate(() => {
    for (let i = 0; i < 12 && window.__game.save.dialogOpen; i++) window.__game.advanceDialog();
  });
}

test('bedroom hotspots, snack choices and keyboard selection share the dialogue flow', async ({ page }) => {
  await openRoom(page);
  for (const [id, x, y, text] of [['tv', 418, 150, '电视'], ['desk', 405, 235, '课本']]) {
    await page.evaluate(({ x, y }) => { const g = window.__game; g.bedWalk.boy.x = x; g.bedWalk.boy.y = y; g.interact(); }, { x, y });
    expect(await page.evaluate(() => window.__game.state().line)).toContain(text);
    await dismiss(page);
    expect(await page.evaluate((id) => window.__game.room.seen.has(id), id)).toBe(true);
  }
  await page.evaluate(() => { const g = window.__game; g.bedWalk.boy.x = 177; g.bedWalk.boy.y = 132; g.interact(); });
  await expect(page.locator('#choices button')).toHaveCount(2);
  await page.keyboard.press('2');
  expect(await page.evaluate(() => window.__game.room.snack)).toBe(false);
  await dismiss(page);
  await page.evaluate(() => { const g = window.__game; g.bedWalk.boy.x = 185; g.bedWalk.boy.y = 185; g.interact(); });
  await page.screenshot({ path: test.info().outputPath('room-choice.png') });
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('KeyE');
  await page.keyboard.press('KeyE');
  expect(await page.evaluate(() => window.__game.room.firstControl)).toBe('player');
  await dismiss(page);
  expect(await page.evaluate(() => window.__game.state().shot.active)).toBe(true);
});

test('all optional bedroom inspections can be skipped', async ({ page }) => {
  await openRoom(page);
  await page.keyboard.press('KeyE');
  await page.locator('#choices button').first().click();
  await dismiss(page);
  const state = await page.evaluate(() => ({ first: window.__game.room.firstControl,
    seen: [...window.__game.room.seen], shot: window.__game.state().shot.active }));
  expect(state).toEqual({ first: 'sister', seen: ['seat'], shot: true });
});

test('the doorway walk ends in free bedroom movement before sitting down', async ({ page }) => {
  await page.goto(base + '?scene=bedroom&walk=1');
  await page.waitForFunction(() => window.__ready);
  await page.waitForFunction(() => window.__game.bedWalk.girl.mode === 'sit' && window.__game.save.dialogOpen, null, { timeout: 30000 });
  await dismiss(page);
  await page.waitForFunction(() => !window.__game.state().walk.active && !window.__game.save.dialogOpen, null, { timeout: 30000 });
  const start = await page.evaluate(() => window.__game.bedWalk.boy.x);
  await page.keyboard.down('ArrowRight');
  await page.waitForTimeout(350);
  await page.keyboard.up('ArrowRight');
  expect(await page.evaluate(() => window.__game.bedWalk.boy.x)).toBeGreaterThan(start + 10);
  await page.evaluate(() => { const g = window.__game; g.bedWalk.boy.x = 185; g.bedWalk.boy.y = 185; g.interact(); });
  await expect(page.locator('#line')).toContainText('你看着，还是你先打');
  await page.screenshot({ path: test.info().outputPath('room-choice-live.png') });
  await page.keyboard.press('1');
  expect(await page.evaluate(() => window.__game.room.seated)).toBe(true);
  await page.keyboard.press('KeyR');
  expect(await page.evaluate(() => ({ seen: window.__game.room.seen.size, seated: window.__game.room.seated })))
    .toEqual({ seen: 0, seated: false });
});

test('legacy results, performance variants, stair choices and restart remain compatible', async ({ page }) => {
  await page.goto(base + '?ui=clean&freeze=1');
  await page.waitForFunction(() => window.__ready);
  const variants = [
    [null, '走廊里比刚才暗了'],
    [{ playerKills: 4, playerDeaths: 1 }, '打得还行'],
    [{ playerKills: 0, playerDeaths: 3 }, '少往中间冲'],
    [{ prompts: { savedHer: 1 } }, '帮上忙'],
    [{ prompts: { issued: 2, accepted: 2, refused: 0 } }, '挺准'],
    [{ prompts: { issued: 3, accepted: 0, refused: 3 } }, '一句一句喊']
  ];
  for (const [payload, expected] of variants) {
    const line = await page.evaluate((payload) => {
      const g = window.__game;
      g.embed.active = true;
      window.dispatchEvent(new MessageEvent('message', { data: { source: 'dust-corridor', type: 'result', result: payload } }));
      g.beginReturn(); g.advanceDialog(); g.advanceDialog();
      return g.state().line;
    }, payload);
    expect(line).toContain(expected);
    await dismiss(page);
  }
  await page.evaluate(() => { const g = window.__game; g.embed.active = false; g.player.x = 435; g.player.y = 235; g.interact(); });
  await page.keyboard.press('1');
  expect(await page.evaluate(() => window.__game.corridor.lookedBack)).toBe(true);
  await dismiss(page);
  await page.evaluate(() => { const g = window.__game; g.player.x = 180; g.player.y = 205; g.interact(); });
  await dismiss(page);
  expect(await page.evaluate(() => window.__game.state().done)).toBe(true);
  await page.evaluate(() => window.__game.restartAct());
  expect(await page.evaluate(() => ({ seen: window.__game.room.seen.size, stopped: window.__game.corridor.stopped,
    lookedBack: window.__game.corridor.lookedBack, payload: window.__game.embed.payload })))
    .toEqual({ seen: 0, stopped: false, lookedBack: null, payload: null });
});

test('301 repeats change its line and both stairs options can be omitted', async ({ page }) => {
  await page.goto(base + '?ui=clean&freeze=1&player=180,205');
  await page.waitForFunction(() => window.__ready);
  await page.evaluate(() => window.__game.interact());
  expect(await page.evaluate(() => window.__game.state().line)).toContain('301 的门关着');
  await dismiss(page);
  await page.evaluate(() => window.__game.interact());
  expect(await page.evaluate(() => window.__game.state().line)).toContain('广告');
  await dismiss(page);
  await page.evaluate(() => { const g = window.__game; g.beginReturn(); });
  await dismiss(page);
  await page.evaluate(() => { const g = window.__game; g.player.x = 180; g.player.y = 205; g.interact(); });
  await dismiss(page);
  expect(await page.evaluate(() => window.__game.state().done)).toBe(true);
  expect(await page.evaluate(() => window.__game.corridor.lookedBack)).toBe(null);
});

for (const first of ['sister', 'player']) {
  test(`${first} first: embedded game hands over, prompts use 1–6, and the result returns to the corridor`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto(base + `?game=1&ui=clean&dinner=8&first=${first}`);
    await page.waitForFunction(() => window.__game?.embed.ready, null, { timeout: 90000 });
    const frame = page.frames().find((f) => f.url().includes('dust-corridor/dist/index.html'));
    await frame.waitForFunction(() => window.__game?.state === 'playing', null, { timeout: 90000 });
    await frame.evaluate(() => window.__game.loop.stop());
    expect(await frame.evaluate(() => window.__game.input.mode)).toBe(first === 'sister' ? 'SISTER_AI' : 'PLAYER');
    const modes = [];
    let testedPrompts = false, checkedCg = false;
    for (let i = 0; i < 220; i++) {
      const state = await frame.evaluate(() => {
        const g = window.__game;
        for (let j = 0; j < 240 && !g.cgPlaying && g.state === 'playing'; j++) {
          g._fixedUpdate(1 / 120); g.input.endFrame();
        }
        return { state: g.state, mode: g.input.mode, cg: g.cgPlaying,
          text: g.subtitle.text, context: g.storyCtx, stats: { ...g.sister.promptStats } };
      });
      modes.push(state.mode);
      if (state.cg) {
        expect(state.mode).toBe('SISTER_AI');
        await frame.waitForFunction(() => !window.__game.cgPlaying);
        expect(await frame.evaluate(() => window.__game.input.mode)).toBe('PLAYER');
        checkedCg = true;
      }
      if (state.mode === 'SISTER_AI' && !state.cg && !testedPrompts) {
        await frame.locator('.cp-chip').first().click();
        await frame.press('body', '2');
        const prompts = await frame.evaluate(() => {
          const g = window.__game;
          g.player.health = 20;
          g.sister.hasSuspicion = true; g.sister.suspicionTime = 0;
          g.sister.suspicion.copy(g.player.position).add({ x: -Math.sin(g.player.yaw) * 5, y: 0, z: -Math.cos(g.player.yaw) * 5 });
          g.controlPanel.setContext(g.sister.contextualPrompt());
          g.handleKey('Digit6');
          return { stats: g.sister.promptStats, ttl: g.sister.intent.ttl, queued: g.story.queue.map((q) => q.lines[0].speaker) };
        });
        expect(prompts.stats.issued).toBe(3);
        expect(prompts.stats.accepted).toBe(3);
        expect(prompts.queued).toContain('和臣');
        expect(prompts.ttl).toBe(2);
        testedPrompts = true;
      }
      if (state.state === 'outro') break;
    }
    expect(modes).toContain('SISTER_AI'); expect(modes).toContain('PLAYER');
    expect(checkedCg).toBe(true); expect(testedPrompts).toBe(true);
    await page.waitForFunction(() => window.__game.embed.result);
    const result = await page.evaluate(() => window.__game.embed.payload);
    expect(result).toMatchObject({ playerKills: expect.any(Number), playerDeaths: expect.any(Number),
      herKills: expect.any(Number), prompts: { issued: 3, accepted: 3, refused: 0 } });
    await frame.press('body', 'KeyE');
    await page.waitForFunction(() => window.__game.state().returning);
    expect(await page.evaluate(() => window.__game.state().scene)).toBe('corridor');
    expect(errors).toEqual([]);
  });
}
