/**
 * 预设底稿演示：进板面什么都不画 → 只描边框 → 加主图 → 全画完 → 关掉底稿对比。
 * 输出 out/g1..g5，并在控制台打出每一步的 regions 和底稿淡出系数。
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
  await p.waitForTimeout(700);

  const toS = async (bx, by) => {
    const r = await p.evaluate(() => {
      const q = document.getElementById('game').getBoundingClientRect();
      return { x: q.x, y: q.y, w: q.width, h: q.height };
    });
    return { x: r.x + (bx + 32) / 512 * r.w, y: r.y + (by + 24) / 288 * r.h };
  };
  const drag = async (x0, y0, x1, y1, n = 24) => {
    const a = await toS(x0, y0), c = await toS(x1, y1);
    await p.mouse.move(a.x, a.y);
    await p.mouse.down();
    for (let i = 1; i <= n; i++) {
      await p.mouse.move(a.x + (c.x - a.x) * i / n, a.y + (c.y - a.y) * i / n);
    }
    await p.mouse.up();
    await p.waitForTimeout(45);
  };
  /** 一次按下、沿着一串点拖、抬起。描折线用。 */
  const stroke = async (pts, pause = 32) => {
    const first = await toS(pts[0][0], pts[0][1]);
    await p.mouse.move(first.x, first.y);
    await p.mouse.down();
    for (let i = 1; i < pts.length; i++) {
      const s = await toS(pts[i][0], pts[i][1]);
      await p.mouse.move(s.x, s.y);
    }
    await p.mouse.up();
    await p.waitForTimeout(pause);
  };
  /** 描一段椭圆弧。turn < 1 就不闭合，像手画的。 */
  const traceOval = async (cx, cy, rx, ry, n = 16, turn = 0.9, from = -1.6) => {
    const pts = [];
    for (let i = 0; i <= n; i++) {
      const a = from + (i / n) * Math.PI * 2 * turn;
      pts.push([cx + Math.cos(a) * rx, cy + Math.sin(a) * ry]);
    }
    await stroke(pts);
  };
  const shot = async (name, label) => {
    const st = await p.evaluate(() => ({
      r: window.__board.state().regions,
      g: window.__board.board.ghostState()
    }));
    await p.screenshot({ path: path.join(OUT, name) });
    const done = Object.entries(st.r).map(([k, v]) => k + (v.done ? '✓' : '·')).join(' ');
    const fade = Object.entries(st.g.fade).map(([k, v]) => k + ':' + v.toFixed(2)).join(' ');
    console.log(`${label.padEnd(10)} ${done}   fade[${fade}]`);
  };

  // 1. 只有淡稿
  await shot('g1-ghost.png', '只有底稿');

  // 2. 描边框：底稿的四条虚线正好在 12px 环带中线，玩家的框就压在它上面
  await p.evaluate(() => { const b = window.__board.board; b.setTool('rect'); b.setWidth(2); b.setColor(0); });
  await drag(6, 6, 442, 234, 46);
  await p.waitForTimeout(1300);
  await shot('g2-frame.png', '描完边框');

  // 3. 主图：照着底稿描画稿里的人像。
  // 坐标都写成画稿内的相对位置（0~1），再乘上画稿在板面上的方框——
  // 以后换画稿、挪位置，这段不用跟着改。
  // 先把她的 AI 关掉——这一套图是给玩家看底稿的，她一边补一边填会看不清
  await p.evaluate(() => {
    const g = window.__board.girl;
    g.__origUpdate = g.update;
    g.update = () => {};
  });
  await p.evaluate(() => { const b = window.__board.board; b.setTool('pen'); b.setWidth(3); });

  const pic = await p.evaluate(() => window.__board.board.ghostPic());
  const P = (rx, ry) => [pic.x + rx * pic.w, pic.y + ry * pic.h];
  const R = (n) => n * pic.w;

  const MAIN = [
    // 左边那一大片头发的外缘
    [[0.06, 0.02], [0.09, 0.14], [0.13, 0.28], [0.145, 0.42], [0.16, 0.56], [0.20, 0.67], [0.27, 0.75]],
    // 脸的轮廓：额头的尖 → 左颊 → 下巴 → 右颊
    [[0.46, 0.10], [0.33, 0.26], [0.28, 0.42], [0.31, 0.56], [0.42, 0.67], [0.51, 0.70],
      [0.62, 0.65], [0.70, 0.54], [0.75, 0.38], [0.74, 0.22], [0.70, 0.10]],
    // 右边那绺头发的外缘
    [[0.70, 0.05], [0.76, 0.24], [0.79, 0.44], [0.78, 0.62], [0.80, 0.78]],
    // 垂在两眼之间那一绺
    [[0.46, 0.10], [0.45, 0.28], [0.52, 0.48], [0.61, 0.64]],
    // 额头上的缝合线
    [[0.60, 0.20], [0.75, 0.22]],
    [[0.60, 0.26], [0.74, 0.28]],
    [[0.58, 0.31], [0.72, 0.33]],
    // 嘴
    [[0.50, 0.545], [0.61, 0.545], [0.61, 0.635], [0.50, 0.635], [0.50, 0.545]],
    // 脖子
    [[0.46, 0.72], [0.45, 0.80]],
    [[0.58, 0.72], [0.59, 0.80]]
  ];
  for (const pts of MAIN) await stroke(pts.map(([rx, ry]) => P(rx, ry)));

  // 眼睛、瞳孔是弧线
  await traceOval(...P(0.363, 0.383), R(0.075), R(0.070), 14, 0.94, -1.6);
  await traceOval(...P(0.686, 0.383), R(0.075), R(0.075), 14, 0.94, -1.6);
  await traceOval(...P(0.363, 0.383), R(0.020), R(0.020), 8, 0.92, -1.6);
  await traceOval(...P(0.686, 0.383), R(0.020), R(0.020), 8, 0.92, -1.6);

  // 她接手：照画稿把暗部一格一格填起来。这一版的分工就是「你描轮廓，她填色」，
  // 光描一圈主图不算完成（NEED.mainCover 是 0.10，只描轮廓大概 0.03）。
  await p.evaluate(() => {
    const g = window.__board.girl;
    g.update = g.__origUpdate;
    g.skipCooldown();
  });
  const herJob = await p.evaluate(() => window.__board.girl.force());
  console.log('她接的分工：', herJob);
  await p.waitForTimeout(2400);
  await p.evaluate(() => {
    const g = window.__board.girl;
    g.update = () => {};
  });

  await p.waitForTimeout(400);
  await shot('g3-main.png', '加上主图');

  // 4. 标题 + 三个图案。标题压在底稿那条下划线上（88..360，y=42）。
  await p.evaluate(() => window.__board.board.commitText('春天来了', 184, 30, 20));
  await p.waitForTimeout(150);
  const put = async (pid, color, x, y) => {
    await p.evaluate(([pid, color]) => {
      const b = window.__board.board;
      b.setColor(color);
      b.setPattern(pid);
    }, [pid, color]);
    const s = await toS(x, y);
    await p.mouse.click(s.x, s.y);
    await p.waitForTimeout(70);
  };
  await put('flower', 2, 90, 208);
  await put('grass', 4, 224, 208);
  await put('star', 1, 358, 208);
  await p.keyboard.press('KeyB');   // 收回图案面板、去掉选中框，截一张干净的
  await p.waitForTimeout(1400);
  await shot('g4-all.png', '全部完成');

  // 5. 关掉底稿（其实这时已经全淡掉了，把画清空再看一眼开关）
  await p.keyboard.press('KeyG');
  await p.waitForTimeout(300);
  const off = await p.evaluate(() => window.__board.board.ghostState().on);
  console.log('按 G 之后底稿开关 =', off);
  await p.keyboard.press('KeyG');
  await p.waitForTimeout(300);

  // 6. 一张干净的「只有底稿」大图：新开一页，只进板面
  await p.goto(PAGE, { waitUntil: 'load' });
  await p.waitForFunction(() => window.__board && window.__board.state, null, { timeout: 30000 });
  for (let i = 0; i < 14; i++) {
    if (await p.evaluate(() => window.__board.state().state) !== 'class') break;
    await p.keyboard.press('KeyE');
    await p.waitForTimeout(140);
  }
  await p.waitForFunction(() => window.__board.state().state === 'board', null, { timeout: 9000 });
  await p.waitForTimeout(2600);   // 等她说完开场那句
  await p.screenshot({ path: path.join(OUT, 'g0-alone.png') });
  console.log('err:', err.length ? err.join(' | ') : 'none');
  await b.close();
})();
