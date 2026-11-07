/**
 * 临时验收：她给主图填色 + 画板期间的字幕。
 * 输出 out/f1-sub.png（刚进板面，字幕）、out/f2-fill.png（填到一半）、out/f3-fill.png（填完）。
 */
const path = require('path');
const { chromium } = require(path.resolve(__dirname, '../../game/dust-corridor/node_modules/playwright-core'));

const PAGE = 'file:///D:/%E8%A7%A3%E5%86%B3%E5%86%85%E5%88%86%E6%B3%8C%E5%A4%B1%E8%B0%83/pixel-act1/act2/blackboard.html?fresh=1';
const OUT = path.join(__dirname, 'out');

(async () => {
  const b = await chromium.launch({ channel: 'chrome' });
  const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
  const err = [];
  p.on('pageerror', (e) => err.push(e.message));
  await p.goto(PAGE, { waitUntil: 'load' });
  await p.waitForFunction(() => window.__board && window.__board.state, null, { timeout: 30000 });

  for (let i = 0; i < 14; i++) {
    if (await p.evaluate(() => window.__board.state().state) !== 'class') break;
    await p.keyboard.press('KeyE');
    await p.waitForTimeout(140);
  }
  await p.waitForFunction(() => window.__board.state().state === 'board', null, { timeout: 9000 });
  await p.waitForTimeout(1600);
  await p.screenshot({ path: path.join(OUT, 'f1-sub.png') });

  const toS = async (bx, by) => {
    const r = await p.evaluate(() => {
      const q = document.getElementById('game').getBoundingClientRect();
      return { x: q.x, y: q.y, w: q.width, h: q.height };
    });
    return { x: r.x + (bx + 32) / 512 * r.w, y: r.y + (by + 24) / 288 * r.h };
  };
  const drag = async (x0, y0, x1, y1, n = 40) => {
    const a = await toS(x0, y0), c = await toS(x1, y1);
    await p.mouse.move(a.x, a.y);
    await p.mouse.down();
    for (let i = 1; i <= n; i++) await p.mouse.move(a.x + (c.x - a.x) * i / n, a.y + (c.y - a.y) * i / n);
    await p.mouse.up();
    await p.waitForTimeout(40);
  };
  const stroke = async (pts) => {
    const f = await toS(pts[0][0], pts[0][1]);
    await p.mouse.move(f.x, f.y);
    await p.mouse.down();
    for (let i = 1; i < pts.length; i++) {
      const s = await toS(pts[i][0], pts[i][1]);
      await p.mouse.move(s.x, s.y);
    }
    await p.mouse.up();
    await p.waitForTimeout(30);
  };

  // 她别插手，先自己把边框、标题、图案摆好
  await p.evaluate(() => {
    const g = window.__board.girl;
    g.__origUpdate = g.update;
    g.update = () => {};
  });
  await p.evaluate(() => { const b = window.__board.board; b.setTool('rect'); b.setWidth(2); b.setColor(0); });
  await drag(6, 6, 442, 234, 46);
  await p.evaluate(() => window.__board.board.commitText('春天来了', 184, 30, 20));
  await p.evaluate(() => {
    const b = window.__board.board;
    const put = (pid, color, x, y) => { b.setPattern(pid); b.setColor(color); b.placePattern(x, y); };
    put('flower', 2, 90, 208);
    put('grass', 4, 224, 208);
    put('star', 1, 358, 208);
  });

  // 主图：只描个轮廓（模拟玩家刚开始）
  await p.evaluate(() => { const b = window.__board.board; b.setTool('pen'); b.setWidth(3); b.setColor(0); });
  const P = (rx, ry) => [160 + rx * 128, 48 + ry * 128];
  const OUTLINE = [
    [[0.06, 0.02], [0.10, 0.20], [0.14, 0.42], [0.17, 0.62], [0.24, 0.74]],
    [[0.46, 0.10], [0.33, 0.28], [0.28, 0.46], [0.32, 0.62], [0.44, 0.70], [0.54, 0.70], [0.66, 0.62], [0.73, 0.46], [0.74, 0.24], [0.70, 0.10]],
    [[0.70, 0.05], [0.77, 0.26], [0.80, 0.48], [0.79, 0.68], [0.82, 0.80]]
  ];
  for (const pts of OUTLINE) await stroke(pts.map(([rx, ry]) => P(rx, ry)));

  const before = await p.evaluate(() => window.__board.state().regions.main);
  console.log('玩家只描了轮廓：', JSON.stringify(before));

  // 放开她，逼她做一次
  await p.evaluate(() => { const g = window.__board.girl; g.update = g.__origUpdate; });
  await p.evaluate(() => { window.__board.girl.skipCooldown(); });
  const kind = await p.evaluate(() => window.__board.girl.force());
  console.log('她接的任务：', kind);
  await p.waitForTimeout(900);
  await p.screenshot({ path: path.join(OUT, 'f2-fill.png') });
  await p.waitForTimeout(1200);

  const mid = await p.evaluate(() => window.__board.state().regions.main);
  console.log('填了一次之后：', JSON.stringify(mid));

  // 接着填，直到主图达标
  for (let i = 0; i < 5; i++) {
    if (await p.evaluate(() => window.__board.state().regions.main.done)) break;
    await p.evaluate(() => { window.__board.girl.skipCooldown(); });
    const k = await p.evaluate(() => window.__board.girl.force());
    console.log('  再填一次：', k);
    await p.waitForTimeout(1600);
  }
  await p.waitForTimeout(600);
  await p.screenshot({ path: path.join(OUT, 'f3-fill.png') });
  console.log('填完：', JSON.stringify(await p.evaluate(() => window.__board.state().regions.main)));

  console.log('err:', err.length ? err.join(' | ') : 'none');
  await b.close();
})();
