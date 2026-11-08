/**
 * 黑板报自检。
 *
 * 这个模块没有 WebGL，2D 画布可以直接截图，所以这里既能断言状态也能出图。
 * 覆盖设计文档第 7 节的验收清单里能自动化的几条：
 *   1 板面几何   2 四区互不误判   3 她不落在玩家笔迹上   4 一次撤销撤掉她整笔
 *   5 导出含她的笔迹   6 完成镜头用玩家作品   8 file:// 无报错
 *
 * 跑：node act2/tools/check.cjs
 */
const path = require('path');
const { chromium } = require(path.resolve(__dirname, '../../game/dust-corridor/node_modules/playwright-core'));

const PAGE = 'file:///D:/%E8%A7%A3%E5%86%B3%E5%86%85%E5%88%86%E6%B3%8C%E5%A4%B1%E8%B0%83/pixel-act1/act2/blackboard.html';
const OUT = path.resolve(__dirname, 'out');

(async () => {
  const fs = require('fs');
  if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

  const browser = await chromium.launch({ channel: 'chrome' });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));

  const failures = [];
  const fail = (m) => failures.push(m);

  await page.goto(PAGE, { waitUntil: 'load' });
  await page.waitForFunction(() => window.__board && window.__board.state, null, { timeout: 30000 });
  await page.waitForTimeout(700);
  await page.screenshot({ path: path.join(OUT, '00-scene.png') });

  // ---- 开场对白与由乃短暂经过，一路 E 推过去
  let sawFriend = false;
  for (let i = 0; i < 100; i++) {
    const s = await page.evaluate(() => window.__board.state().state);
    if (s !== 'class') break;
    const phase = await page.evaluate(() => window.__board.friendCameo.phase);
    if (phase === 'talk' && !sawFriend) {
      sawFriend = true;
      await page.waitForTimeout(1300);
      await page.screenshot({ path: path.join(OUT, '00a-friend-cameo.png') });
    }
    await page.keyboard.press('KeyE');
    await page.waitForTimeout(130);
  }
  if (!sawFriend) fail('第二幕没有出现由乃铺垫');
  // 推镜头的中途抓一张：这一段是「从走廊走到黑板前」
  const midPush = await page.evaluate(() => window.__board.state().state);
  if (midPush === 'push') {
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUT, '00b-push.png') });
  }
  await page.waitForFunction(() => window.__board.state().state === 'board', null, { timeout: 8000 });

  // ---- 1. 几何
  const geo = await page.evaluate(() => {
    const b = window.ACT2.Board;
    return { inner: b.INNER, region: b.REGION, bw: b.BW, bh: b.BH };
  });
  if (geo.bw !== 448 || geo.bh !== 240) fail(`板面 ${geo.bw}×${geo.bh}，应为 448×240`);
  if (geo.inner.x !== 32 || geo.inner.y !== 24) fail('板面原点不是 (32,24)');
  const R = geo.region;
  if (R.title.y + R.title.h !== R.main.y) fail('标题区与主图区之间有缝');
  if (R.main.y + R.main.h !== R.deco.y) fail('主图区与装饰区之间有缝');

  // ---- 1.5 底稿：淡线是她打的稿，不是笔迹
  // 底稿只在 render 里叠上去，不进 inkMap——否则玩家什么都不画也会「达标」。
  const g0 = await page.evaluate(() => ({
    g: window.__board.board.ghostState(),
    r: window.__board.state().regions
  }));
  if (!g0.g.on) fail('底稿默认应该是开着的');
  for (const k of ['title', 'frame', 'main', 'deco']) {
    if (g0.g.fade[k] < 0.99) fail(`底稿 ${k} 一开始就没显示（fade=${g0.g.fade[k]}）`);
    if (g0.r[k].done) fail(`什么都没画，${k} 却已经达标——底稿被算成了笔迹`);
  }
  // 底稿不进导出：开、关各导一张，必须逐字节相同
  const pngOn = await page.evaluate(() => window.__board.board.toPNG(1));
  const pngOff = await page.evaluate(() => {
    const b = window.__board.board;
    b.setGhost(false);
    const s = b.toPNG(1);
    b.setGhost(true);
    return s;
  });
  if (pngOn !== pngOff) fail('底稿被画进了导出图');

  // 画稿要正好落在主图区里：越界的话，主图区画完淡掉了，
  // 越界那几笔头发还挂在装饰区上面，看着像没擦干净。
  const picBox = await page.evaluate(() => window.__board.board.ghostPic());
  if (!picBox) fail('底稿画稿没加载上（ghost-art.js 没跑或者 data URL 坏了）');
  else {
    const m = geo.region.main;
    if (picBox.x < m.x || picBox.y < m.y ||
      picBox.x + picBox.w > m.x + m.w || picBox.y + picBox.h > m.y + m.h) {
      fail(`画稿 ${JSON.stringify(picBox)} 超出主图区 ${JSON.stringify(m)}`);
    }
  }

  // 画布尺寸会被图案面板改变（面板展开时画布变小），所以每次都要重算，
  // 不能像以前那样在开头抓一次 rect 用到底。
  const rectNow = () => page.evaluate(() => {
    const r = document.getElementById('game').getBoundingClientRect();
    return { x: r.x, y: r.y, w: r.width, h: r.height };
  });
  const toScreen = async (bx, by) => {
    const r = await rectNow();
    return {
      x: r.x + (bx + 32) / 512 * r.w,
      y: r.y + (by + 24) / 288 * r.h
    };
  };
  const drag = async (x0, y0, x1, y1, steps = 24) => {
    const a = await toScreen(x0, y0), b = await toScreen(x1, y1);
    await page.mouse.move(a.x, a.y);
    await page.mouse.down();
    for (let i = 1; i <= steps; i++) {
      await page.mouse.move(a.x + (b.x - a.x) * i / steps, a.y + (b.y - a.y) * i / steps);
    }
    await page.mouse.up();
    await page.waitForTimeout(60);
  };
  const clickAt = async (bx, by) => {
    const p = await toScreen(bx, by);
    await page.mouse.click(p.x, p.y);
    await page.waitForTimeout(60);
  };

  // ---- 1.6 字幕：画板期间一直在滚，不用玩家按任何键
  if (!(await page.evaluate(() => !!document.getElementById('subs')))) fail('没有字幕条 #subs');
  const chatOn = await page.evaluate(() => !!(window.__board.chat && window.__board.chat.on));
  if (!chatOn) fail('进了板面，字幕轮播没开');
  const subSeen = [];
  const subHeights = new Set();
  let subBlank = 0;
  for (let i = 0; i < 26; i++) {
    const s = await page.evaluate(() => {
      const e = document.getElementById('subs');
      return {
        on: e.classList.contains('show'),
        line: document.getElementById('subsLine').textContent,
        who: document.getElementById('subsWho').textContent,
        h: Math.round(e.getBoundingClientRect().height)
      };
    });
    if (!s.on || !s.line) subBlank++;
    else if (subSeen[subSeen.length - 1] !== s.line) subSeen.push(s.line);
    if (s.on) subHeights.add(s.h);
    await page.waitForTimeout(400);
  }
  const subRate = 1 - subBlank / 26;
  if (subRate < 0.6) fail(`字幕在场率太低（${Math.round(subRate * 100)}%），画板大部分时间是哑的`);
  if (subSeen.length < 3) fail(`10 秒里只换过 ${subSeen.length} 句字幕，没有「一直交谈」`);
  if (subHeights.size > 1) {
    fail(`对白区高度跟着字数变了（${[...subHeights].join(' / ')}px），画布会跟着抖`);
  }
  for (let i = 1; i < subSeen.length; i++) {
    if (subSeen[i] === subSeen[i - 1]) fail('字幕连着重复同一句');
  }
  // 字幕不该盖在画布上：它得是画布下面独立的一行
  const subGeom = await page.evaluate(() => {
    const s = document.getElementById('subs').getBoundingClientRect();
    const g = document.getElementById('game').getBoundingClientRect();
    return { subTop: s.top, gameBottom: g.bottom, h: s.height };
  });
  if (subGeom.subTop < subGeom.gameBottom - 1) fail('字幕压在画布上了');
  if (subGeom.h < 60) fail(`对白区只有 ${Math.round(subGeom.h)}px 高，装不下小人`);

  // ---- 1.6b 对白区是「像素小人 + 对话框」：两个小人站在画布**下面**
  // 要求原话是「可以用像素小人展示对话框，不要挡黑板」。所以这里卡三件事：
  // 小人在画布外、精灵图真的加载了、说话的那个人是亮的。
  const dock = await page.evaluate(() => {
    const subs = document.getElementById('subs');
    const g = document.getElementById('game').getBoundingClientRect();
    const read = (sel) => {
      const e = document.querySelector(sel);
      if (!e) return null;
      const r = e.getBoundingClientRect();
      const cs = getComputedStyle(e.querySelector('i'));
      return {
        top: r.top, w: r.width, h: r.height,
        bg: cs.backgroundImage,
        op: +getComputedStyle(e).opacity
      };
    };
    return {
      her: read('#subs .pix.her'),
      me: read('#subs .pix.me'),
      gameBottom: g.bottom,
      who: subs.dataset.who,
      label: document.getElementById('subsWho').textContent
    };
  });
  if (!dock.her || !dock.me) fail('对白区里没有两个像素小人');
  else {
    if (dock.her.top < dock.gameBottom - 1 || dock.me.top < dock.gameBottom - 1) {
      fail('像素小人压在黑板上了');
    }
    if (!/girl_sheet\.png/.test(dock.her.bg)) fail('左边小人没加载到朱里的精灵图');
    if (!/boy_sheet\.png/.test(dock.me.bg)) fail('右边小人没加载到和臣的精灵图');
    if (dock.her.h < 40 || dock.her.w < 40) fail(`小人只有 ${Math.round(dock.her.w)}×${Math.round(dock.her.h)}，看不清`);
    if (Math.abs(dock.her.op - dock.me.op) < 0.3) {
      fail(`两个小人明暗差不多（${dock.her.op} / ${dock.me.op}），看不出谁在说话`);
    }
    if (dock.who !== dock.label) fail(`谁在说话和亮着的那个对不上（${dock.who} / ${dock.label}）`);
  }

  // ---- 1.7 字幕的内容：是闲聊，不是一直在讲这块板
  // 要求原话是「聊天应该不只是聚焦于画画，更多是日常」。这条把它变成可测的：
  // 至少六成段落完全不提画/板/粉笔，而且每段都得是来回（≥2 句、每句别太长）。
  const talk = await page.evaluate(() => window.ACT2.Lines.chatStats());
  if (talk.total < 24) fail(`字幕对话只有 ${talk.total} 段，撑不住几分钟`);
  if (talk.daily < talk.total * 0.6) {
    fail(`日常闲聊只占 ${talk.daily}/${talk.total}，还是太围着画画转`);
  }
  const badChat = await page.evaluate(() => window.ACT2.Lines.CHAT
    .filter((ex) => ex.length < 2 || ex.some((q) => !q[1] || q[1].length > 26))
    .map((ex) => ex[0][1]));
  if (badChat.length) {
    fail(`这些对话段不是来回、或者一句太长：${badChat.slice(0, 2).join(' / ')}`);
  }
  // 洗牌袋：连着抽 12 段，一轮之内不该出现重复
  const draw = await page.evaluate(() => {
    const seen = new Set(), dup = [];
    for (let i = 0; i < 12; i++) {
      const ex = window.ACT2.Lines.exchange();
      const key = ex.map((q) => q[1]).join('|');
      if (seen.has(key)) dup.push(key); else seen.add(key);
    }
    return dup;
  });
  if (draw.length) fail(`12 段字幕里出现了重复：${draw[0].slice(0, 18)}`);

  // 测图案这几组先把她按住：装饰区空着的时候她会自己添一个，
  // 一添就把「第几个图案」「图案落在哪」全部错位。到第 4 组再放她出来。
  await page.evaluate(() => {
    const g = window.__board.girl;
    g.__origUpdate = g.update;
    g.update = () => {};
  });

  // ---- 2. 只画边框：应该只有 frame 变真
  await page.evaluate(() => {
    const b = window.__board.board;
    b.setTool('rect');
    b.setWidth(2);
  });
  await drag(6, 6, 442, 234, 40);
  const afterFrame = await page.evaluate(() => window.__board.state().regions);
  if (!afterFrame.frame.done) fail('画了一圈边框，frame 没有判定为完成');
  if (afterFrame.title.done) fail('只画边框，标题区不该完成');
  if (afterFrame.deco.done) fail('只画边框，装饰区不该完成');
  // 描完边框，边框那张底稿该自己淡掉，另外三张还亮着
  await page.waitForTimeout(1100);
  const gh1 = await page.evaluate(() => window.__board.board.ghostState());
  if (gh1.fade.frame > 0.15) fail(`边框画完了，边框底稿还没淡掉（fade=${gh1.fade.frame.toFixed(2)}）`);
  for (const k of ['title', 'main', 'deco']) {
    if (gh1.fade[k] < 0.8) fail(`${k} 还没画，底稿却先淡掉了（fade=${gh1.fade[k].toFixed(2)}）`);
  }
  await page.screenshot({ path: path.join(OUT, '01-frame.png') });

  // ---- 3. 图案面板 + 主图 + 标题
  const drawScene = async () => {
    await page.evaluate(() => { window.__board.board.setTool('pen'); window.__board.board.setWidth(3); });
    // 先描轮廓
    await drag(120, 90, 300, 150, 30);
    await drag(150, 140, 260, 80, 26);
    await drag(120, 120, 320, 120, 24);
    await drag(200, 70, 200, 165, 20);
    await drag(90, 165, 350, 165, 26);
    // 再把中间那片涂起来：主图现在要求真的填满，光描一圈不算完
    await page.evaluate(() => window.__board.board.setWidth(6));
    for (let y = 68; y <= 170; y += 18) await drag(60, y, 400, y, 18);
    await page.evaluate(() => window.__board.board.setWidth(3));
  };
  await drawScene();

  // 图案面板：点工具按钮展开，缩略图必须是真图案（不是 7×7 的小点）
  await page.click('#tools button[data-tool="stamp"]');
  await page.waitForTimeout(260);
  const panel = await page.evaluate(() => ({
    shown: getComputedStyle(document.getElementById('pats')).display !== 'none',
    thumbs: document.querySelectorAll('#pats button').length,
    cats: document.querySelectorAll('#pats em').length,
    canvasW: (document.querySelector('#pats button canvas') || {}).width || 0
  }));
  if (!panel.shown) fail('选了图案工具，图案面板没有出现');
  if (panel.thumbs < 16) fail(`图案面板只有 ${panel.thumbs} 个图案`);
  if (panel.cats < 3) fail(`图案面板没有分组（${panel.cats} 组）`);
  if (panel.canvasW < 16) fail(`图案缩略图只有 ${panel.canvasW}px，太小了`);
  // 面板展开会把画布压小：压可以，拉变形不行
  const pr = await rectNow();
  const pratio = pr.w / pr.h;
  if (Math.abs(pratio - 16 / 9) > 0.02) fail(`图案面板展开后画布变形了（${pratio.toFixed(3)}）`);
  if (pr.w < 600) fail(`图案面板展开后画布只剩 ${Math.round(pr.w)}px 宽`);

  await page.click('#pats button[data-pid="flower"]');
  await page.waitForTimeout(120);
  for (const [x, y] of [[30, 210], [410, 210], [30, 30]]) await clickAt(x, y);
  const placed = await page.evaluate(() => window.__board.board.decos().map((d) => ({ pid: d.pid, x: d.x, y: d.y })));
  if (placed.length !== 3) fail(`放了 3 个图案，板面上有 ${placed.length} 个`);
  if (placed[0] && placed[0].pid !== 'flower') fail(`放的图案不是选中的那个（${placed[0].pid}）`);
  if (placed[0] && Math.abs(placed[0].x - 30) > 3) fail(`图案没有落在点击处（x=${placed[0].x}）`);

  // 拖动：点住已经放下的图案能挪——这是「修正」的前提
  await drag(30, 210, 110, 208, 16);
  const moved = await page.evaluate(() => window.__board.board.decos()[0]);
  if (Math.abs(moved.x - 110) > 6) fail(`拖动图案没跟上（x=${moved.x}）`);
  if ((await page.evaluate(() => window.__board.board.decos().length)) !== 3) fail('拖动图案变成了又放一个');

  // 方向键微调
  await page.evaluate(() => { window.__board.board.state.sel = window.__board.board.decos()[0].uid; });
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(120);
  const nudged = await page.evaluate(() => window.__board.board.decos()[0].x);
  if (nudged <= moved.x) fail(`方向键没有微调图案（${moved.x} → ${nudged}）`);

  // 撤销：两次微调 + 一次拖动，撤三次应该正好回到点击处，图案还在
  for (let i = 0; i < 3; i++) {
    await page.evaluate(() => window.__board.board.undo());
    await page.waitForTimeout(260);
  }
  const undone = await page.evaluate(() => window.__board.board.decos().map((d) => d.x));
  if (undone.length !== 3) fail(`撤销拖动之后图案数量变成了 ${undone.length}`);
  if (Math.abs(undone[0] - 30) > 4) fail(`撤销没有把图案放回去（x=${undone[0]}）`);

  await page.evaluate(() => {
    window.__board.board.commitText('春天来了', 120, 30, 18);
  });
  await page.waitForTimeout(150);
  const all = await page.evaluate(() => window.__board.state());
  for (const k of ['title', 'frame', 'main', 'deco']) {
    if (!all.regions[k].done) fail(`四个区里 ${k} 没有完成：${JSON.stringify(all.regions[k])}`);
  }
  await page.screenshot({ path: path.join(OUT, '02-full.png') });

  // ---- 3c. 橡皮碰到图案，图案整个消失（不然玩家会发现擦不动）
  await page.evaluate(() => window.__board.board.setTool('erase'));
  const beforeErase = await page.evaluate(() => window.__board.board.decos().length);
  await drag(30, 30, 44, 36, 8);
  const afterErase = await page.evaluate(() => window.__board.board.decos().length);
  if (afterErase >= beforeErase) fail(`橡皮擦不掉图案（${beforeErase} → ${afterErase}）`);
  await page.evaluate(() => window.__board.board.undo());
  await page.waitForTimeout(300);
  const backErase = await page.evaluate(() => window.__board.board.decos().length);
  if (backErase !== beforeErase) fail(`撤销没有把擦掉的图案还回来（${backErase}）`);

  // ---- 3b. 文字工具走真实路径：点一下 → 输入框 → 回车落笔
  await page.evaluate(() => window.__board.board.setTool('text'));
  const tp = await toScreen(60, 20);
  await page.mouse.click(tp.x, tp.y);
  await page.waitForTimeout(250);
  const inputShown = await page.evaluate(() =>
    getComputedStyle(document.getElementById('textin')).display !== 'none');
  if (!inputShown) fail('文字工具没有弹出输入框');
  const charsBefore = await page.evaluate(() => window.__board.board.state.chars);
  await page.keyboard.type('秋');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(300);
  const charsAfter = await page.evaluate(() => window.__board.board.state.chars);
  if (charsAfter <= charsBefore) fail(`输入框里写的字没有落笔（${charsBefore} → ${charsAfter}）`);

  // 放她出来，下面几组都要她真的动
  await page.evaluate(() => {
    const g = window.__board.girl;
    if (g.__origUpdate) g.update = g.__origUpdate;
  });

  // ---- 3b. 主图不是描一圈就算完：她照画稿像素级填色
  await page.evaluate(() => {
    const b = window.__board.board;
    window.__board.girl.reset();
    b.clearAll();
    b.setTool('rect');
    b.setWidth(2);
  });
  await drag(6, 6, 442, 234, 40);   // 边框先补齐，否则她先去接边框
  await page.evaluate(() => { window.__board.board.setTool('pen'); window.__board.board.setWidth(3); });
  await drag(120, 90, 300, 150, 24);
  await drag(150, 140, 260, 80, 20);
  const outlineOnly = await page.evaluate(() => window.__board.state().regions.main);
  if (outlineOnly.done) fail('主图只描了两笔就达标了——应该要求真的填起来');
  if (!outlineOnly.cover || outlineOnly.cover > 0.06) {
    fail(`主图轮廓的覆盖率不对（${outlineOnly.cover}），应该远低于达标线`);
  }
  const cellCount = await page.evaluate(() => (window.__board.board.ghostInk() || []).length);
  if (cellCount < 800) fail(`画稿的填色格子表太小（${cellCount}）`);
  const fillKind = await page.evaluate(() => window.__board.girl.force());
  if (fillKind !== 'fill') fail(`主图只有轮廓，她做的是 ${fillKind} 而不是填色`);
  await page.waitForTimeout(2600);
  const filledMain = await page.evaluate(() => window.__board.state().regions.main);
  if (!filledMain.done) fail(`她填完色，主图还没达标（cover=${filledMain.cover.toFixed(3)}）`);
  if (filledMain.cover < outlineOnly.cover + 0.05) {
    fail(`填色没让覆盖率涨起来（${outlineOnly.cover.toFixed(3)} → ${filledMain.cover.toFixed(3)}）`);
  }
  await page.screenshot({ path: path.join(OUT, '02b-fill.png') });
  await page.evaluate(() => { window.__board.girl.reset(); window.__board.board.clearAll(); });

  // ---- 4. 她在空白处画：先记下玩家笔迹，再强制触发一次辅助
  const assistBefore = await page.evaluate(() => {
    const b = window.__board.board;
    return { ink: b.assist.count(), player: countPlayer() };
    function countPlayer() {
      const d = b.layers.player.getContext('2d').getImageData(0, 0, b.BW, b.BH).data;
      let n = 0;
      for (let i = 3; i < d.length; i += 4) if (d[i] > 8) n++;
      return n;
    }
  });
  // 清空重来一次，专门测「她不在已有笔迹上落笔」
  const filledInk = await page.evaluate(() => {
    const b = window.__board.board;
    b.clearAll();
    b.setTool('pen');
    // 把整块板面涂满（直接写她那一层，模拟一块已经写满的黑板）
    for (let y = 4; y < b.BH; y += 8) b.assist.line([[4, y], [b.BW - 4, y]], { w: 6, alpha: 0.9 });
    b.assist.settle();
    return b.assist.count();
  });
  const forced = await page.evaluate(() => window.__board.girl.force());
  await page.waitForTimeout(1600);
  const afterForce = await page.evaluate(() => ({
    assists: window.__board.girl.assists,
    ink: window.__board.board.assist.count(),
    state: window.__board.girl.state
  }));
  if (forced !== null) fail(`板面涂满后她还接了任务：${forced}`);
  if (afterForce.ink !== filledInk) {
    fail(`板面涂满后她还是落了笔（${filledInk} → ${afterForce.ink}）`);
  }

  // ---- 5. 她的笔一次撤销干净
  await page.evaluate(() => {
    const b = window.__board.board;
    b.clearAll();
    b.setTool('pen');
  });
  await drag(200, 100, 240, 120, 8);
  const beforeAssist = await page.evaluate(() => window.__board.board.assist.count());
  await page.evaluate(() => window.__board.girl.force());
  await page.waitForTimeout(1700);
  const afterAssist = await page.evaluate(() => window.__board.board.assist.count());
  if (afterAssist <= beforeAssist) fail(`她的辅助没有落笔（${beforeAssist} → ${afterAssist}）`);
  await page.evaluate(() => window.__board.board.undo());
  await page.waitForTimeout(300);
  const afterUndo = await page.evaluate(() => window.__board.board.assist.count());
  if (afterUndo >= afterAssist) fail(`撤销一次没撤掉她整笔（${afterAssist} → ${afterUndo}）`);
  await page.screenshot({ path: path.join(OUT, '03-assist.png') });

  // ---- 5b. 边框齐了、装饰区还空着：她自己放一个图案进去
  await page.evaluate(() => {
    const b = window.__board.board;
    b.clearAll();
    b.setTool('rect');
    b.setWidth(2);
  });
  await drag(6, 6, 442, 234, 40);
  const decoBefore = await page.evaluate(() => window.__board.board.decos().length);
  const herKind = await page.evaluate(() => window.__board.girl.force());
  await page.waitForTimeout(1400);
  const decoAfter = await page.evaluate(() => {
    const ds = window.__board.board.decos();
    return {
      n: ds.length,
      reveal: ds[0] ? ds[0].reveal : -1,
      pid: ds[0] ? ds[0].pid : '',
      stamps: window.__board.state().regions.deco.stamps
    };
  });
  if (herKind !== 'deco') fail(`边框齐了、装饰区空着，她做的是 ${herKind} 而不是放图案`);
  if (decoAfter.n <= decoBefore) fail('她说要添图案，板面上却没多出东西');
  if (decoAfter.stamps < 1) fail('她放的图案没有算进装饰区');
  if (decoAfter.reveal < 1) fail(`她的图案没有画完（reveal=${decoAfter.reveal}）`);
  if (!decoAfter.pid) fail('她放的图案没有 id');
  await page.screenshot({ path: path.join(OUT, '03c-herdeco.png') });

  // ---- 5c. 修正：两个图案挤在一起，她把后放的那个挪开
  await page.evaluate(() => {
    const b = window.__board.board;
    b.decos().slice().forEach((d) => b.removeDeco(d.uid));
    b.setPattern('star');
  });
  await clickAt(160, 205);
  await clickAt(300, 205);
  await drag(300, 205, 176, 207, 12);       // 拖过去，和第一个叠上
  const beforeFix = await page.evaluate(() => window.__board.board.decos().map((d) => ({ x: d.x, y: d.y })));
  const fixKind = await page.evaluate(() => window.__board.girl.force());
  await page.waitForTimeout(1400);
  const afterFix = await page.evaluate(() => window.__board.board.decos().map((d) => ({ x: d.x, y: d.y })));
  const gapOf = (p) => Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y);
  if (fixKind !== 'tidy') fail(`两个图案叠在一起，她做的是 ${fixKind} 而不是挪开`);
  if (afterFix.length !== 2) fail(`她挪图案时把数量改成了 ${afterFix.length}`);
  if (gapOf(afterFix) <= gapOf(beforeFix) + 4) {
    fail(`她没有把叠在一起的图案挪开（${gapOf(beforeFix).toFixed(1)} → ${gapOf(afterFix).toFixed(1)}）`);
  }
  await page.screenshot({ path: path.join(OUT, '03b-tidy.png') });

  // ---- 6. 完成：导出与镜头用的是同一张图
  await page.evaluate(() => {
    const b = window.__board.board;
    b.clearAll();
    b.setTool('rect');
    b.setWidth(2);
  });
  await drag(6, 6, 442, 234, 40);
  await drawScene();
  await page.evaluate(() => window.__board.board.setTool('stamp'));
  for (const [x, y] of [[30, 210], [410, 210], [30, 30]]) await clickAt(x, y);
  await page.evaluate(() => window.__board.board.commitText('春天来了', 120, 30, 18));
  await page.waitForTimeout(200);

  const ready = await page.evaluate(() => window.__board.state().allDone);
  if (!ready) fail('第二次画完，四区仍不齐');

  await page.evaluate(() => window.__board.finish());
  await page.waitForTimeout(900);
  const done = await page.evaluate(() => ({
    state: window.__board.state().state,
    locked: window.__board.state().locked,
    href: document.getElementById('download').getAttribute('href') || ''
  }));
  if (done.state !== 'done') fail(`完成后状态是 ${done.state}`);
  if (!done.locked) fail('完成后板面没有锁定');
  if (!done.href.startsWith('data:image/png')) fail('下载链接不是 PNG');
  if (done.href.length < 5000) fail(`导出的 PNG 太小（${done.href.length}），可能是空图`);
  // 完成后字幕要停：接下来是完成卡和结尾对白，两个文字通道不能同时开着
  const chatAfter = await page.evaluate(() => ({
    on: window.__board.chat.on,
    shown: document.getElementById('subs').classList.contains('show')
  }));
  if (chatAfter.on) fail('完成之后字幕轮播还在跑');
  if (chatAfter.shown) fail('完成之后字幕还挂在画面上');

  // 导出图里必须真的有图案：取第一个图案的框，看里面有没有亮像素
  const inPng = await page.evaluate(async () => {
    const b = window.__board.board;
    const d = b.decos()[0];
    if (!d) return null;
    const url = b.toPNG(1);
    const im = new Image();
    await new Promise((r) => { im.onload = r; im.src = url; });
    const c = document.createElement('canvas');
    c.width = b.BW; c.height = b.BH;
    const g = c.getContext('2d');
    g.drawImage(im, 0, 0);
    const half = b.assist.half(d);
    const px = g.getImageData(Math.round(d.x - half), Math.round(d.y - half), half * 2, half * 2).data;
    let bright = 0;
    for (let i = 0; i < px.length; i += 4) {
      if (px[i] + px[i + 1] + px[i + 2] > 420) bright++;
    }
    return { bright, area: half * half * 4, pid: d.pid };
  });
  if (!inPng) fail('完成时板面上一个图案都没有');
  else if (inPng.bright < 30) fail(`导出图里没有图案（${inPng.pid} 的框里只有 ${inPng.bright} 个亮像素）`);

  // 结尾几句走画布下面那条对白区（不压板面），按 E 推进；读完了卡才出来
  for (let i = 0; i < 24; i++) {
    const shown = await page.evaluate(() => document.getElementById('card').classList.contains('show'));
    if (shown) break;
    await page.keyboard.press('KeyE');
    await page.waitForTimeout(220);
  }
  const cardShown = await page.evaluate(() => document.getElementById('card').classList.contains('show'));
  if (!cardShown) fail('结尾对白读完后完成卡没有出现');
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(OUT, '04-done.png') });

  // 存档能恢复
  const saved = await page.evaluate(() => {
    const raw = localStorage.getItem('our-story-act2-board-v2');
    return raw ? JSON.parse(raw) : null;
  });
  if (!saved || !saved.png) fail('作品没有存进 localStorage');
  if (saved && (!saved.decos || saved.decos.length !== 3)) {
    fail(`存档里的图案数量不对（${saved && saved.decos ? saved.decos.length : 'none'}）`);
  }

  // ---- 7. 自然触发：重开一块板，玩家画一笔，然后什么都不做，她自己应该会动手
  await page.click('#again');
  await page.waitForFunction(() => window.__board.state().state === 'board', null, { timeout: 5000 });
  const re = await page.evaluate(() => ({ locked: window.__board.state().locked, done: window.__board.state().allDone }));
  if (re.locked) fail('「再画一次」之后板面还锁着');
  if (re.done) fail('「再画一次」之后旧的完成状态没有清掉');

  await page.evaluate(() => { window.__board.board.clearAll(); window.__board.board.setTool('pen'); });
  await drag(200, 100, 260, 130, 10);
  const beforeIdle = await page.evaluate(() => ({
    assists: window.__board.girl.assists,
    ink: window.__board.board.assist.count()
  }));
  let natural = null;
  for (let i = 0; i < 40; i++) {
    await page.waitForTimeout(600);
    natural = await page.evaluate(() => ({
      assists: window.__board.girl.assists,
      state: window.__board.girl.state,
      ink: window.__board.board.assist.count()
    }));
    if (natural.assists > beforeIdle.assists) break;
  }
  if (natural.assists <= beforeIdle.assists) fail('玩家画了一笔之后，她自己没有动手');
  if (natural.ink <= beforeIdle.ink) fail('她的辅助没有真正落到画面上');
  await page.screenshot({ path: path.join(OUT, '05-natural.png') });

  // ---- 8. 存档恢复：刷新页面，上一张应该还在
  await page.goto(PAGE, { waitUntil: 'load' });
  await page.waitForFunction(() => window.__board && window.__board.state, null, { timeout: 30000 });
  for (let i = 0; i < 100; i++) {
    const s = await page.evaluate(() => window.__board.state().state);
    if (s !== 'class') break;
    await page.keyboard.press('KeyE');
    await page.waitForTimeout(130);
  }
  await page.waitForFunction(() => window.__board.state().state === 'board', null, { timeout: 8000 });
  await page.waitForTimeout(900);
  const restored = await page.evaluate(() => window.__board.state());
  if (!restored.regions.title.done) fail('刷新后存档没有恢复（标题区丢了）');
  if (!restored.allDone) fail('刷新后存档不完整');

  // ---- 8.5 底稿的开关与复位
  await page.keyboard.press('KeyG');
  await page.waitForTimeout(220);
  const gOff = await page.evaluate(() => ({
    on: window.__board.board.ghostState().on,
    btn: document.getElementById('ghost').classList.contains('on')
  }));
  if (gOff.on) fail('按 G 没能关掉底稿');
  if (gOff.btn) fail('底稿关掉了，按钮还亮着');
  await page.keyboard.press('KeyG');
  await page.waitForTimeout(220);
  if (!(await page.evaluate(() => window.__board.board.ghostState().on))) fail('再按 G 没能打开底稿');

  // 重开一张：四张底稿都该回到全亮，不然第二遍就没稿可照了
  await page.evaluate(() => window.__board.board.clearAll());
  await page.waitForTimeout(150);
  const gClear = await page.evaluate(() => window.__board.board.ghostState());
  for (const k of ['title', 'frame', 'main', 'deco']) {
    if (gClear.fade[k] < 0.99) fail(`清空之后底稿 ${k} 没有回来（fade=${gClear.fade[k].toFixed(2)}）`);
  }

  // ---- 9. 随时可退出：不画完也能走，走之前存盘，回来接着画
  await page.evaluate(() => { window.__board.board.setTool('pen'); window.__board.board.setWidth(3); });
  await drag(120, 100, 300, 150, 20);
  const leaveBtn = await page.evaluate(() => {
    const e = document.getElementById('leave');
    const r = e.getBoundingClientRect();
    const g = document.getElementById('game').getBoundingClientRect();
    return {
      op: +getComputedStyle(e).opacity,
      inCanvas: r.left >= g.left - 1 && r.top >= g.top - 1 && r.bottom <= g.bottom + 1,
      w: r.width
    };
  });
  if (leaveBtn.op < 0.5) fail('画板期间「离开」按钮没显示出来');
  if (!leaveBtn.inCanvas) fail('「离开」按钮跑到画布外面了');
  if (leaveBtn.w < 24) fail(`「离开」按钮只有 ${Math.round(leaveBtn.w)}px 宽，点不着`);

  await page.keyboard.press('Escape');
  await page.waitForTimeout(320);
  const left = await page.evaluate(() => ({
    state: window.__board.state().state,
    veil: window.__board.state().veil,
    chat: window.__board.chat.on,
    bar: document.getElementById('bar').classList.contains('show'),
    line: document.getElementById('subsLine').textContent,
    sub: document.getElementById('subs').classList.contains('show')
  }));
  if (left.state !== 'leave') fail(`按 Esc 之后状态是 ${left.state}，没退出`);
  if (left.bar) fail('退出之后工具条还挂在画面上');
  if (left.chat) fail('退出之后字幕轮播还在跑');
  if (!left.sub || !left.line) fail('退出时她没说那句「先走」的话');
  if (left.veil <= 0) fail('退出时画面没有压暗');

  await page.waitForTimeout(1200);
  const bye = await page.evaluate(() => ({
    show: document.getElementById('bye').classList.contains('show'),
    line: document.getElementById('byeLine').textContent,
    subs: document.getElementById('subs').classList.contains('show')
  }));
  if (!bye.show) fail('退出之后没有出现「先到这儿」的收尾卡');
  if (!bye.line || bye.line.length < 4) fail('收尾卡上没有她那句话');
  if (bye.subs) fail('收尾卡出来了，字幕还留着，两个文字通道叠在一起');
  // 存档：中途退出也要能回来，而且存的是这一版的笔迹
  const midSave = await page.evaluate(() => {
    const raw = localStorage.getItem('our-story-act2-board-v2');
    if (!raw) return null;
    const d = JSON.parse(raw);
    return { png: d.png ? d.png.length : 0, main: d.regions && d.regions.main ? d.regions.main.cover : 0 };
  });
  if (!midSave || midSave.png < 10000) fail('中途退出没有把板面存进 localStorage');
  else if (!midSave.main) fail('中途退出存的是一张空板（主图覆盖率 0）');
  await page.screenshot({ path: path.join(OUT, '06-leave.png') });

  // 接着画：回到板前，遮罩退掉，字幕接着滚
  await page.click('#resume');
  await page.waitForTimeout(600);
  const back = await page.evaluate(() => ({
    state: window.__board.state().state,
    veil: window.__board.state().veil,
    chat: window.__board.chat.on,
    bar: document.getElementById('bar').classList.contains('show'),
    bye: document.getElementById('bye').classList.contains('show')
  }));
  if (back.state !== 'board') fail(`「接着画」之后状态是 ${back.state}`);
  if (back.bye) fail('「接着画」之后收尾卡没收起来');
  if (!back.bar) fail('「接着画」之后工具条没回来');
  if (!back.chat) fail('「接着画」之后字幕没有接着滚');
  if (back.veil > 0.15) fail(`「接着画」之后画面还压着暗（veil=${back.veil}）`);

  // ---- 9.2 真的离开：回宿主页（默认是走廊）。这条放最后，页面会真的走掉
  const errorsBeforeQuit = errors.length;
  await page.evaluate(() => {
    window.__quitFired = false;
    window.addEventListener('board:quit', () => { window.__quitFired = true; });
  });
  await page.click('#leave');
  await page.waitForTimeout(1450);
  await page.click('#quit');
  await page.waitForTimeout(1500);
  if (!/school-preview\.html/.test(page.url())) fail(`离开之后没有回到走廊（${page.url()}）`);
  // 宿主页自己的加载报错不算这块板的问题
  errors.length = errorsBeforeQuit;

  // ---- 10. 报错
  if (errors.length) failures.push(...errors.slice(0, 6));

  await browser.close();

  console.log(JSON.stringify({
    geo, afterFrame: afterFrame.frame,
    assists: afterForce.assists,
    assistPixels: { beforeAssist, afterAssist, afterUndo },
    saved: saved ? { len: saved.png.length, regions: saved.regions } : null,
    talk,
    dock: dock.her ? { her: Math.round(dock.her.w) + 'x' + Math.round(dock.her.h), op: [dock.her.op, dock.me.op], who: dock.who } : null,
    leave: { state: left.state, veil: left.veil, bye: bye.line, save: midSave, back: back.state },
    errors, failures
  }, null, 2));

  if (failures.length) { console.log(`FAILED: ${failures.length}`); process.exit(1); }
  console.log('OK');
})();
