/** 手动玩一遍：画边框、画主图、写标题、放几个不同颜色的图案，截图看观感。 */
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
    await p.waitForTimeout(150);
  }
  await p.waitForFunction(() => window.__board.state().state === 'board', null, { timeout: 9000 });
  await p.waitForTimeout(400);

  const rectNow = () => p.evaluate(() => {
    const r = document.getElementById('game').getBoundingClientRect();
    return { x: r.x, y: r.y, w: r.width, h: r.height };
  });
  const toS = async (bx, by) => {
    const r = await rectNow();
    return { x: r.x + (bx + 32) / 512 * r.w, y: r.y + (by + 24) / 288 * r.h };
  };
  const drag = async (x0, y0, x1, y1, n = 26) => {
    const a = await toS(x0, y0), c = await toS(x1, y1);
    await p.mouse.move(a.x, a.y); await p.mouse.down();
    for (let i = 1; i <= n; i++) await p.mouse.move(a.x + (c.x - a.x) * i / n, a.y + (c.y - a.y) * i / n);
    await p.mouse.up(); await p.waitForTimeout(50);
  };
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

  // 边框
  await p.evaluate(() => { const b = window.__board.board; b.setTool('rect'); b.setWidth(2); b.setColor(0); });
  await drag(6, 6, 442, 234, 44);
  // 主图：一棵树 + 草地 + 太阳
  await p.evaluate(() => { const b = window.__board.board; b.setTool('pen'); b.setWidth(3); });
  await drag(120, 170, 130, 90, 20);
  await drag(130, 90, 118, 60, 12);
  await drag(130, 90, 148, 62, 12);
  await drag(130, 110, 108, 88, 12);
  await drag(130, 110, 154, 86, 12);
  await p.evaluate(() => { window.__board.board.setWidth(1); });
  await drag(60, 176, 380, 176, 30);
  await drag(64, 170, 372, 172, 30);
  // 标题
  await p.evaluate(() => window.__board.board.commitText('春天来了', 150, 26, 20));
  await p.waitForTimeout(120);
  // 装饰区：不同颜色不同图案
  await put('flower', 2, 56, 206);
  await put('grass', 4, 96, 214);
  await put('star', 1, 300, 206);
  await put('heart', 3, 350, 212);
  await put('cloud', 1, 30, 30);
  await put('sun', 1, 412, 34);
  await p.waitForTimeout(300);

  const st = await p.evaluate(() => window.__board.state());
  await p.screenshot({ path: path.join(OUT, '06-play.png') });
  console.log(JSON.stringify({ allDone: st.allDone, regions: Object.fromEntries(Object.entries(st.regions).map(([k, v]) => [k, v.done])), err }));
  await b.close();
})();
