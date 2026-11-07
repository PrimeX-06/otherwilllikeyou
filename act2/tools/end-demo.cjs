/**
 * 结尾对白的演示图。
 *
 * 走一遍「四区画满 → 完成 → 读结尾五句 → 出卡」，看的是对白区（两个像素小人
 * + 对话框）在完成镜头里的样子：板子必须完整可见，一句都不能被盖住。
 *
 *   node act2/tools/end-demo.cjs
 *
 * 出三张：e3-end1.png（第一句）、e4-end2.png（朱里那句）、e5-card.png（对白读完、
 * 对白区让出高度、完成卡出现）。
 */
const path = require('path');
const { chromium } = require(path.resolve(__dirname, '../../game/dust-corridor/node_modules/playwright-core'));

const PAGE = 'file:///D:/%E8%A7%A3%E5%86%B3%E5%86%85%E5%88%86%E6%B3%8C%E5%A4%B1%E8%B0%83/pixel-act1/act2/blackboard.html?fresh=1';
const OUT = path.resolve(__dirname, 'out');

(async () => {
  const fs = require('fs');
  if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

  const browser = await chromium.launch({ channel: 'chrome' });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  await page.goto(PAGE, { waitUntil: 'load' });
  await page.waitForFunction(() => window.__board && window.__board.state, null, { timeout: 30000 });

  // 开场对白，一路 E 推过去
  for (let i = 0; i < 14; i++) {
    if (await page.evaluate(() => window.__board.state().state) !== 'class') break;
    await page.keyboard.press('KeyE');
    await page.waitForTimeout(140);
  }
  await page.waitForFunction(() => window.__board.state().state === 'board', null, { timeout: 9000 });

  // 她别插手：这一遍是给玩家看结尾的，中间冒出来补两笔会打断
  await page.evaluate(() => { window.__board.girl.update = () => {}; });

  const rect = () => page.evaluate(() => document.getElementById('game').getBoundingClientRect().toJSON());
  const at = async (bx, by) => {
    const r = await rect();
    return { x: r.x + (bx + 32) / 512 * r.width, y: r.y + (by + 24) / 288 * r.height };
  };
  const drag = async (x0, y0, x1, y1, n = 24) => {
    const a = await at(x0, y0), b = await at(x1, y1);
    await page.mouse.move(a.x, a.y);
    await page.mouse.down();
    for (let i = 1; i <= n; i++) {
      await page.mouse.move(a.x + (b.x - a.x) * i / n, a.y + (b.y - a.y) * i / n);
    }
    await page.mouse.up();
    await page.waitForTimeout(60);
  };

  // 四区画满（和自检里那套一样，只是这里要一张好看的图）
  await page.evaluate(() => { const b = window.__board.board; b.setTool('rect'); b.setWidth(2); });
  await drag(6, 6, 442, 234, 40);
  await page.evaluate(() => { window.__board.board.setTool('pen'); window.__board.board.setWidth(3); });
  await drag(120, 90, 300, 150, 30);
  await drag(150, 140, 260, 80, 26);
  await drag(120, 120, 320, 120, 24);
  await drag(200, 70, 200, 165, 20);
  await drag(90, 165, 350, 165, 26);
  await page.evaluate(() => window.__board.board.setWidth(6));
  for (let y = 68; y <= 170; y += 18) await drag(60, y, 400, y, 18);
  await page.evaluate(() => { const b = window.__board.board; b.setWidth(3); b.setTool('stamp'); });
  for (const [x, y] of [[30, 210], [410, 210], [30, 30]]) {
    const p = await at(x, y);
    await page.mouse.click(p.x, p.y);
    await page.waitForTimeout(80);
  }
  await page.evaluate(() => window.__board.board.commitText('春天来了', 120, 30, 18));
  await page.waitForTimeout(300);

  const ready = await page.evaluate(() => window.__board.state().allDone);
  console.log('四区齐了：', ready);
  if (!ready) {
    console.log('没画满，后面不用看了');
    await browser.close();
    process.exit(1);
  }

  await page.evaluate(() => window.__board.finish());
  await page.waitForTimeout(1700);
  await page.screenshot({ path: path.join(OUT, 'e3-end1.png') });

  for (let i = 0; i < 2; i++) { await page.keyboard.press('KeyE'); await page.waitForTimeout(320); }
  await page.screenshot({ path: path.join(OUT, 'e4-end2.png') });

  for (let i = 0; i < 8; i++) { await page.keyboard.press('KeyE'); await page.waitForTimeout(320); }
  await page.waitForTimeout(700);
  await page.screenshot({ path: path.join(OUT, 'e5-card.png') });

  const end = await page.evaluate(() => ({
    state: window.__board.state().state,
    card: document.getElementById('card').classList.contains('show'),
    subsH: Math.round(document.getElementById('subs').getBoundingClientRect().height),
    dlg: document.getElementById('dlg').classList.contains('show')
  }));
  console.log('结尾：', JSON.stringify(end));
  await browser.close();
})();
