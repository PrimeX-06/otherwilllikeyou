/* 第三幕 · 校园日常 — 自检
 *
 * 前半是静态检查：资源尺寸、题库自洽、场景连线对称、线索分类齐全、文案不越界。
 * 后半开浏览器把四个小游戏各走一遍，断言状态机、存档和画面几何。
 * 《校园寻物》走两遍：一遍一句话不问直接找到（设计稿要求允许），一遍看全了再找。
 *
 * 用法：node act5/tools/check.cjs
 * 截图落在 act5/tools/out/。
 */
const fs = require("fs");
const path = require("path");
const { chromium } = require(path.resolve(__dirname, "../../game/dust-corridor/node_modules/playwright-core"));

const ROOT = path.resolve(__dirname, "../..");
const DIR = path.join(ROOT, "act5");
const OUT = path.join(__dirname, "out");
const PAGE = "file:///" + path.join(DIR, "daily.html").replace(/\\/g, "/") + "?fresh=" + Date.now();

const fails = [];
const oks = [];
const fail = (m) => fails.push(m);
const ok = (m) => oks.push(m);

function read(f) { return fs.readFileSync(path.join(DIR, f), "utf8"); }

// ---------------------------------------------------------------- 1. 静态

function checkStatic() {
  // 1.1 三人 v2 精灵表：48×72 一帧，宽度 = 帧数 × 48
  const sheets = { boy: 31, girl: 33, friend: 36 };
  const frames = {};
  for (const who of Object.keys(sheets)) {
    const file = path.join(ROOT, `assets/characters/${who}/v2/${who}_sheet_v2.png`);
    if (!fs.existsSync(file)) { fail(`没有 ${who}_sheet_v2.png`); continue; }
    const data = fs.readFileSync(file);
    if (data.readUInt32BE(0) !== 0x89504e47) fail(`${who}_sheet_v2.png 不是 PNG`);
    const w = data.readUInt32BE(16), h = data.readUInt32BE(20);
    if (h !== 72) fail(`${who}_sheet_v2.png 高 ${h}，应该是 72`);
    if (w % 48 !== 0) fail(`${who}_sheet_v2.png 宽 ${w} 不是 48 的整数倍`);
    frames[who] = w / 48;
    if (frames[who] !== sheets[who]) {
      fail(`${who}_sheet_v2.png 有 ${frames[who]} 帧，帧位表按 ${sheets[who]} 帧写的`);
    }
  }

  // 1.1b 头像裁切的宽度必须跟着帧数走。换了精灵表却忘了改这里，
  //      浏览器会把整张表缩放，每帧被压窄，取出来的窗口跨到隔壁帧——
  //      头像就变成两个小人的拼贴（v2 换图时就踩过这个坑）。
  const css = read("daily.css");
  const FACE = 54;      // 48 × 1.125
  for (const who of Object.keys(frames)) {
    const cls = "f-" + who;
    const m = css.match(new RegExp("\\." + cls + "\\s*\\{[^}]*background-size:\\s*(\\d+)px"));
    if (!m) { fail(`daily.css 里找不到 .${cls} 的 background-size`); continue; }
    const want = frames[who] * FACE;
    if (Number(m[1]) !== want) {
      fail(`.${cls} 的 background-size 宽是 ${m[1]}px，${frames[who]} 帧应该是 ${want}px`);
    }
  }

  // 1.2 六个脚本都在，且没有明显的 ES module 语法（file:// 下不能用）
  const scripts = ["core.js", "trio.js", "explore.js", "errand.js", "search.js",
                   "wordgame.js", "ball.js", "shell.js"];
  for (const f of scripts) {
    if (!fs.existsSync(path.join(DIR, f))) { fail(`缺少 ${f}`); continue; }
    const src = read(f);
    if (/^\s*(import|export)\s/m.test(src)) fail(`${f} 用了 ES module 语法，file:// 下会挂`);
  }

  // 1.3 题库自洽
  const wg = read("wordgame.js");
  const qBlock = wg.slice(wg.indexOf("const QUESTIONS = ["), wg.indexOf("const WHO ="));
  const answers = [...qBlock.matchAll(/answer:\s*"([^"]+)"/g)].map((m) => m[1]);
  const optionSets = [...qBlock.matchAll(/options:\s*\[([^\]]+)\]/g)].map((m) =>
    m[1].split(",").map((s) => s.trim().replace(/^"|"$/g, "")));
  if (answers.length !== 3) fail(`题库 ${answers.length} 题，回合数应该是 3`);
  if (optionSets.length !== answers.length) fail("有题目没有选项");
  optionSets.forEach((opts, i) => {
    if (opts.length !== 4) fail(`第 ${i + 1} 题选项 ${opts.length} 个，应该是 4 个`);
    if (opts.indexOf(answers[i]) < 0) fail(`第 ${i + 1} 题的答案「${answers[i]}」不在选项里`);
  });
  const clueCount = [...qBlock.matchAll(/clues:\s*\[([\s\S]*?)\]/g)]
    .map((m) => (m[1].match(/"/g) || []).length / 2);
  clueCount.forEach((n, i) => {
    if (n < 2) fail(`第 ${i + 1} 题只有 ${n} 条线索，太少了`);
  });

  // 1.4 场景连线必须对称，不然会走进死路（两个探索型小游戏都要查）
  const er = read("errand.js");
  const se = read("search.js");
  const parseScenes = (src, stopAt) => {
    const out = {};
    const from = src.indexOf("const SCENES = {");
    if (from < 0) return out;
    const to = src.indexOf(stopAt, from);
    const block = src.slice(from, to < 0 ? src.length : to);
    for (const m of block.matchAll(/(\w+):\s*\{([^}]*)\}/g)) {
      const body = m[2];
      const get = (k) => { const r = body.match(new RegExp(k + ':\\s*"([^"]+)"')); return r ? r[1] : null; };
      out[m[1]] = { left: get("left"), right: get("right") };
    }
    return out;
  };
  const checkSymmetry = (scenes, who) => {
    for (const name of Object.keys(scenes)) {
      const s = scenes[name];
      if (s.left && scenes[s.left] && scenes[s.left].right !== name) {
        fail(`${who}：${name} 往左通到 ${s.left}，但 ${s.left} 往右不通回 ${name}`);
      }
      if (s.right && scenes[s.right] && scenes[s.right].left !== name) {
        fail(`${who}：${name} 往右通到 ${s.right}，但 ${s.right} 往左不通回 ${name}`);
      }
    }
  };
  const scenes = parseScenes(er, "const BOX_X");
  const searchScenes = parseScenes(se, "// 卡在楼梯口窗台上");
  checkSymmetry(scenes, "G01");
  checkSymmetry(searchScenes, "G02");
  if (Object.keys(searchScenes).length < 2) fail("G02 只解析出不到两个场景");

  // 1.5 文案红线：不许出现好感度 / 提前点名「她喜欢谁」
  //     先把注释剥掉——代码里写着「不要存她有多喜欢你」这种注释是正常的
  const stripComments = (src) => src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[^:])\/\/.*$/gm, "$1");
  const allText = scripts.map((f) => stripComments(read(f))).join("\n");
  const banned = ["好感度", "心动值", "认可度", "她喜欢的人是谁", "喜欢你"];
  for (const w of banned) {
    if (allText.indexOf(w) >= 0) fail(`文案里出现了「${w}」，设计稿第 5.11 / 8.3 节明确不要`);
  }

  // 1.6 闺蜜的台词不能占满全场（她不该每次都起哄、每次都说话）
  const lines = [...er.matchAll(/\["(旁白|我|朱里|闺蜜)",\s*"([^"]+)"\]/g)];
  const friendLines = lines.filter((m) => m[1] === "闺蜜").length;
  if (!lines.length) fail("没找到任何对白");
  else if (friendLines / lines.length > 0.5) {
    fail(`闺蜜说了 ${friendLines}/${lines.length} 句，超过一半，重心跑偏了`);
  }

  // 1.7 三种线索齐全，而且「猜的」那条必须在对话里说破——
  //     只在笔记本上贴个标签、嘴上却说得跟亲眼看见一样，等于没分开
  for (const k of ["see", "remember", "guess"]) {
    if (se.indexOf('kind: "' + k + '"') < 0) fail(`G02 里没有 ${k} 类线索`);
  }
  if (se.indexOf("这是猜的") < 0) fail("G02 里那条猜出来的线索，对话没有说破「这是猜的」");

  const pBlock = se.slice(se.indexOf("const POINTS = {"), se.indexOf("// 三级提示"));
  const points = (pBlock.match(/\bid:\s*"/g) || []).length;
  if (points < 6 || points > 8) fail(`G02 有 ${points} 个可看的东西，设计稿要求 6–8 个`);

  // 1.8 闺蜜在 G02 里人不在场（她在教室门口等她），只发消息，不该抢戏
  const seLines = [...se.matchAll(/\["(旁白|我|朱里|闺蜜)",\s*"([^"]+)"\]/g)];
  const seFriend = seLines.filter((m) => m[1] === "闺蜜").length;
  if (!seLines.length) fail("G02 没有对白");
  else if (seFriend / seLines.length > 0.34) {
    fail(`G02 里闺蜜说了 ${seFriend}/${seLines.length} 句，她人不在场，不该这么多`);
  }

  // 1.9 G04 足球：接球三档窗口、5 次目标、NPC 互相传、不大会踢球、不射门不计分
  const bg = read("ball.js");
  for (const n of [120, 260, 400]) {
    if (bg.indexOf("good: " + n) < 0 && bg.indexOf("ok: " + n) < 0 && bg.indexOf("late: " + n) < 0) {
      fail(`G04 接球窗口里找不到 ${n}ms`);
    }
  }
  if (!/target:\s*5\b/.test(bg)) fail("G04 的有效传接目标不是 5 次");
  if (bg.indexOf("npcToNpc") < 0 || bg.indexOf("chooseTarget") < 0) {
    fail("G04 没有 NPC 自主选人 / 互相传球的判定");
  }
  if (bg.indexOf("wobbleFor") < 0 || bg.indexOf("我不太会踢") < 0) {
    fail("G04 没有把「女生不大会踢球」写进机制和台词");
  }
  if (bg.indexOf("girlSweet") < 0) fail("G04 没有「传给她要更轻」的力度上限");
  // 球在飞的时候不许弹完整对白框
  const flyingBlock = bg.slice(bg.indexOf("ball.phase === \"flying\" && pass"), bg.indexOf("} else if (ball.phase === \"loose\")"));
  if (/D\.lines\s*\(/.test(flyingBlock)) fail("G04 在球飞行的判定里弹了完整对白框");
  for (const w of ["好球", "得分", "赢了", "输了", "比分"]) {
    if (bg.indexOf(w) >= 0) fail(`G04 出现了竞技化用词「${w}」，这里不是比赛`);
  }

  // 1.10 章节壳必须在 host.done() 时收掉小游戏自己的面板 / HUD
  if (read("shell.js").indexOf("game.dispose") < 0) {
    fail("章节壳没有调用 dispose()，退回目录后 G04 的 HUD 会一直挂着");
  }

  ok(`静态：男 ${frames.boy} / 女 ${frames.girl} / 闺蜜 ${frames.friend} 帧、题库 ${answers.length} 题、` +
     `场景 G01 ${Object.keys(scenes).length} 个 / G02 ${Object.keys(searchScenes).length} 个、` +
     `G02 可看点 ${points} 处、对白 ${lines.length + seLines.length} 句（闺蜜 ${friendLines + seFriend} 句）、` +
     `G04 接球窗口 120/260/400ms`);
}

// ---------------------------------------------------------------- 2. 浏览器

const S = (page) => page.evaluate(() => {
  const g = window.__daily.current;
  const px = g ? (g.trio ? g.trio.boy.x : g.x) : null;
  return {
    has: !!g,
    state: g && g.state,
    scene: g && g.scene,
    boy: px == null ? null : px,
    girl: g && g.trio ? g.trio.girl.x : null,
    fr: g && g.trio ? g.trio.friend.x : null,
    dlg: window.DAILY.dialogOpen(),
    hint: document.getElementById("hint").classList.contains("show")
      ? document.getElementById("hint").textContent : null,
    obj: document.getElementById("obj").classList.contains("show")
      ? document.getElementById("objSub").textContent : null
  };
});

/** 等一会儿，如果这期间弹出了对白（换场景的 onEnter 要等淡入结束才出来），把它读完。 */
async function settle(page, ms = 1600) {
  const t0 = Date.now();
  while (Date.now() - t0 < ms) {
    if (await page.evaluate(() => window.DAILY.dialogOpen())) {
      await advanceAll(page);
      return true;
    }
    await page.waitForTimeout(90);
  }
  return false;
}

async function advanceAll(page, max = 60) {
  for (let i = 0; i < max; i++) {
    const d = await page.evaluate(() => window.DAILY.dialogOpen());
    if (!d) return true;
    await page.keyboard.press("KeyE");
    await page.waitForTimeout(80);
  }
  return false;
}

/** 按住方向键，直到场景变了 / 弹出对白 / 到目标 x。 */
async function walk(page, key, opt = {}) {
  const start = await S(page);
  await page.keyboard.down(key);
  const t0 = Date.now();
  let out = start;
  while (Date.now() - t0 < (opt.timeout || 15000)) {
    out = await S(page);
    if (out.dlg) break;
    if (opt.untilScene && out.scene !== start.scene) break;
    if (opt.untilX != null && Math.abs(out.boy - opt.untilX) < 8) break;
    await page.waitForTimeout(50);
  }
  await page.keyboard.up(key);
  return out;
}

/** 走到本场景里的某个 x。方向自己判断，被打断就补一次。
 *
 *  必须这么写的原因：换场景之后那句旁白不是立刻弹出来的（要等淡入结束），
 *  而 settle 只等 1.6 秒。旁白要是晚到，人物就被冻在原地，
 *  walk 第一圈就看见 dlg 直接退出，位置一步没动，后面的断言全部对不上。 */
async function approach(page, targetX, timeout = 14000) {
  for (let i = 0; i < 3; i++) {
    if ((await S(page)).dlg) await settle(page);
    const a = await S(page);
    if (a.boy == null) return a;
    if (Math.abs(a.boy - targetX) < 10) return a;
    const b = await walk(page, a.boy < targetX ? "KeyD" : "KeyA", { untilX: targetX, timeout });
    if (b.scene !== a.scene) return b;
    if (Math.abs(b.boy - targetX) < 10) return b;
  }
  return await S(page);
}

/** 走到指定场景，走不到就再试两次。每次重试前先把挡路的对白读完——
 *  换场景那句旁白要等淡入结束才弹，撞上它人物就动不了。 */
async function ensureScene(page, want, key, ms = 16000) {
  for (let i = 0; i < 3; i++) {
    if ((await S(page)).dlg) await settle(page);
    const a = await S(page);
    if (a.scene === want) return a;
    await walk(page, key, { untilScene: true, timeout: ms });
    await settle(page);
    await page.waitForTimeout(220);
  }
  const s = await S(page);
  if (s.scene !== want) fail(`应该走到 ${want}，实际在 ${s.scene}`);
  return s;
}

/** 等提示条出现并且写的是某段字。提示每帧都在刷，但可能被对白挡住，
 *  所以给它一点时间，而不是 sleep 一下就看。 */
async function waitHint(page, text, ms = 4000) {
  await page.waitForFunction(function (want) {
    const h = document.getElementById("hint");
    return h.classList.contains("show") && h.textContent.indexOf(want) >= 0;
  }, text, { timeout: ms }).catch(function () { /* 交给调用方报错 */ });
  const s = await S(page);
  if (!s.hint || s.hint.indexOf(text) < 0) fail(`提示条应该是「${text}」，实际是「${s.hint}」`);
  return s;
}

async function runErrand(page) {
  await page.click('#hubList li[data-id="errand"]');
  await page.waitForTimeout(1100);
  let s = await S(page);
  if (s.state !== "intro") fail(`进「一起去办事」后状态是 ${s.state}`);
  await page.screenshot({ path: path.join(OUT, "d1-corridor.png") });

  // 对白期间人物不许动
  const before = (await S(page)).boy;
  await page.keyboard.down("KeyD");
  await page.waitForTimeout(320);
  await page.keyboard.up("KeyD");
  const during = (await S(page)).boy;
  if (Math.abs(during - before) > 1) fail("对白打开的时候人物还能走");

  await advanceAll(page);
  await page.waitForTimeout(1500);   // walkOut
  await advanceAll(page);
  await page.waitForTimeout(400);

  s = await S(page);
  if (s.state !== "walk") fail(`开场对白读完之后状态是 ${s.state}，应该是 walk`);
  if (!s.obj) fail("出发后没有目标卡");
  if (!s.hint && s.scene === "corridor") { /* 提示可能已经淡出，不算错 */ }
  await page.screenshot({ path: path.join(OUT, "d2-walk.png") });

  // 往左走到楼梯口
  s = await walk(page, "KeyA", { untilScene: true, timeout: 12000 });
  if (s.scene !== "stair") fail(`走到走廊左端之后场景是 ${s.scene}，应该是 stair`);
  await settle(page);
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(OUT, "d3-stair.png") });

  // 再往左到楼上
  s = await walk(page, "KeyA", { untilScene: true, timeout: 14000 });
  if (s.scene !== "railing") fail(`走到楼梯口左端之后场景是 ${s.scene}，应该是 railing`);
  await settle(page);
  await page.waitForTimeout(300);

  // 走到箱子旁边
  s = await walk(page, "KeyA", { untilX: 200, timeout: 12000 });
  await page.waitForTimeout(400);
  s = await S(page);
  if (!s.hint || s.hint.indexOf("材料") < 0) fail(`走到箱子旁边提示是「${s.hint}」`);
  await page.screenshot({ path: path.join(OUT, "d4-box.png") });

  await page.keyboard.press("KeyE");
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(OUT, "d5-handover.png") });
  await advanceAll(page);
  await page.waitForTimeout(1200);
  await advanceAll(page);
  await page.waitForTimeout(1400);

  const done = await page.evaluate(() => ({
    hub: document.getElementById("hub").classList.contains("show"),
    saved: window.__daily.store().errandCompleted === true,
    cur: !!window.__daily.current
  }));
  if (!done.hub) fail("交付完没有回到目录");
  if (!done.saved) fail("交付完没有存下 errandCompleted");
  if (done.cur) fail("交付完之后小游戏还没释放");
  return done;
}

async function runWord(page) {
  await page.click('#hubList li[data-id="word"]');
  await page.waitForFunction(() => !document.getElementById("wg").hidden, null, { timeout: 15000 });
  await page.waitForTimeout(400);

  const panel = await page.evaluate(() => ({
    open: !document.getElementById("wg").hidden,
    chips: document.querySelectorAll("#wg .chip").length,
    round: document.getElementById("wgRound").textContent
  }));
  if (!panel.open) fail("猜词面板没打开");
  if (panel.chips !== 3) fail(`猜词面板上有 ${panel.chips} 个人，应该是 3 个`);

  const answers = ["粉笔", "课表", "晚自习"];
  for (let round = 0; round < 3; round++) {
    // state === "ask" 才是真的轮到玩家，不能只看按钮在不在
    await page.waitForFunction(
      () => window.__daily.current && window.__daily.current.state === "ask",
      null, { timeout: 25000 }
    );
    const opts = await page.evaluate(() => document.querySelectorAll("#wgOpts button").length);
    if (opts !== 4) fail(`第 ${round + 1} 回合选项 ${opts} 个，应该是 4 个`);
    if (round === 0) await page.screenshot({ path: path.join(OUT, "d6-word.png") });

    if (round === 1) {
      const n0 = await page.evaluate(() => document.getElementById("wgClues").children.length);
      await page.click("#wgHint");
      await page.waitForTimeout(300);
      const n1 = await page.evaluate(() => document.getElementById("wgClues").children.length);
      if (n1 <= n0) fail(`按了提示线索数没变（${n0} → ${n1}）`);
      await page.screenshot({ path: path.join(OUT, "d7-clue.png") });
    }

    await page.evaluate((ans) => {
      const btns = Array.prototype.slice.call(document.querySelectorAll("#wgOpts button"));
      const b = btns.find((x) => x.textContent === ans);
      if (b) b.click();
    }, answers[round]);
    await page.waitForTimeout(1500);
  }

  await page.waitForFunction(() => document.getElementById("wg").hidden, null, { timeout: 25000 })
    .catch(() => fail("三回合走完，猜词面板没有关掉"));
  await page.waitForTimeout(400);
  await advanceAll(page);
  await page.waitForTimeout(1200);
  await advanceAll(page);
  await page.waitForTimeout(1500);

  const done = await page.evaluate(() => ({
    hub: document.getElementById("hub").classList.contains("show"),
    saved: window.__daily.store().wordGameCompleted === true,
    correct: window.__daily.store().wordGameCorrect
  }));
  if (!done.hub) fail("猜词结束没有回到目录");
  if (!done.saved) fail("猜词结束没有存下 wordGameCompleted");
  if (done.correct !== 3) fail(`三题都点对了，存档里 correct 是 ${done.correct}`);
  return done;
}

/** 一直读到目录重新出现。用于收尾那段——中间隔着两次淡入淡出，
 *  不能靠固定 sleep 猜时间。只在真的有对白的时候按 E，否则会误触发互动点。 */
async function drain(page, ms = 14000) {
  const t0 = Date.now();
  while (Date.now() - t0 < ms) {
    if (await page.evaluate(() => document.getElementById("hub").classList.contains("show"))) return true;
    if (await page.evaluate(() => window.DAILY.dialogOpen())) {
      await page.keyboard.press("KeyE");
      await page.waitForTimeout(90);
    } else {
      await page.waitForTimeout(150);
    }
  }
  return false;
}

/** G02 第一条路：一句话都不问，直接走到楼梯口把卡捡起来。
 *  设计稿明确要求「允许提前找到物品，不能因为没听完线索就禁止拾取」。 */
async function runSearchEarly(page) {
  await page.click('#hubList li[data-id="search"]');
  await page.waitForTimeout(1200);
  await advanceAll(page);
  await page.waitForTimeout(300);

  let s = await S(page);
  if (s.state !== "search") fail(`G02 开场读完状态是 ${s.state}，应该是 search`);
  if (!s.obj) fail("G02 开始后没有目标卡");

  await ensureScene(page, "stair", "KeyA");
  await page.waitForTimeout(200);

  await approach(page, 300);
  await waitHint(page, "窗台");
  // 她俩只在走廊门口等，不该跟着上楼
  const who = await page.evaluate(() => window.__daily.current.girlVisible);
  if (who) fail("到了楼梯口，朱里和闺蜜还画在画面上——她们没跟过来");
  await page.screenshot({ path: path.join(OUT, "s1-card.png") });

  await page.keyboard.press("KeyE");
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(OUT, "s2-found.png") });
  await drain(page, 16000);

  const done = await page.evaluate(() => ({
    hub: document.getElementById("hub").classList.contains("show"),
    saved: window.__daily.store().searchCompleted === true,
    clues: window.__daily.store().searchClues
  }));
  if (!done.hub) fail("G02 提前找到之后没有回到目录");
  if (!done.saved) fail("G02 没有存下 searchCompleted");
  if (done.clues !== 0) fail(`G02 一条线索都没看，存档里却是 ${done.clues} 条`);
  return done;
}

/** G02 第二条路：看三处、翻线索本、问三级提示，再去捡卡。 */
async function runSearch(page) {
  const trace = [];
  const mark = async (tag) => {
    const s = await S(page);
    trace.push(tag + " scene=" + s.scene + " x=" + (s.boy == null ? "-" : Math.round(s.boy)) + " dlg=" + s.dlg);
  };
  await page.click('#hubList li[data-id="search"]');
  await page.waitForTimeout(1200);
  await advanceAll(page);
  await page.waitForTimeout(300);

  let s = await S(page);
  if (s.state !== "search") fail(`G02 重玩时状态是 ${s.state}`);
  await page.screenshot({ path: path.join(OUT, "s3-start.png") });

  // 门缝
  await approach(page, 256);
  await mark("门缝");
  await waitHint(page, "门缝");
  await page.keyboard.press("KeyE");
  await page.waitForTimeout(300);
  await advanceAll(page);
  await page.waitForTimeout(250);

  // 左边窗台：这一处给两条线索（看见印子 + 想起接水要刷卡）
  await approach(page, 95);
  await mark("窗台");
  await waitHint(page, "窗台");
  await page.keyboard.press("KeyE");
  await page.waitForTimeout(300);
  await advanceAll(page);
  await page.waitForTimeout(250);

  // 线索本
  await page.keyboard.press("Tab");
  await page.waitForTimeout(320);
  const nb = await page.evaluate(() => ({
    open: !document.getElementById("nb").hidden && document.getElementById("nb").classList.contains("show"),
    n: document.querySelectorAll("#nbList li").length,
    see: document.querySelectorAll("#nbList li.k-see").length,
    rem: document.querySelectorAll("#nbList li.k-rem").length,
    badge: document.getElementById("nbBtn").textContent
  }));
  if (!nb.open) fail("按 Tab 没打开线索本");
  if (nb.n !== 3) fail(`看过两处，线索本里却有 ${nb.n} 条`);
  if (nb.see !== 2) fail(`线索本里「亲眼看见」${nb.see} 条，应该是 2 条`);
  if (nb.rem !== 1) fail(`线索本里「我记得」${nb.rem} 条，应该是 1 条`);
  if (nb.badge.indexOf("3") < 0) fail(`线索本入口上写的是「${nb.badge.trim()}」，应该是 3`);
  await page.screenshot({ path: path.join(OUT, "s4-notebook.png") });

  // 线索本打开的时候人不能走
  const bx = (await S(page)).boy;
  await page.keyboard.down("KeyD");
  await page.waitForTimeout(340);
  await page.keyboard.up("KeyD");
  if (Math.abs((await S(page)).boy - bx) > 1) fail("线索本打开的时候人物还能走");

  // 三级提示：一次比一次具体，第三次之后按钮不能再按
  await page.click("#nbHint");
  await page.waitForTimeout(280);
  const m1 = await page.evaluate(() => document.getElementById("msg").textContent);
  if (!m1 || m1.indexOf("出去过一次") < 0) fail(`第一次问闺蜜，消息是「${m1}」`);
  if (!(await page.evaluate(() => document.getElementById("msg").classList.contains("show")))) {
    fail("问了闺蜜，消息条没显示出来");
  }
  await page.screenshot({ path: path.join(OUT, "s6-msg.png") });
  await page.click("#nbHint");
  await page.waitForTimeout(280);
  const m2 = await page.evaluate(() => document.getElementById("msg").textContent);
  if (!m2 || m2 === m1) fail("第二次问闺蜜，消息没变");
  await page.click("#nbHint");
  await page.waitForTimeout(280);
  const asked = await page.evaluate(() => document.getElementById("nbHint").disabled);
  if (!asked) fail("三级提示都问完了，按钮还可以按");
  await page.keyboard.press("Tab");
  await page.waitForTimeout(280);

  // 楼梯口扶手 —— 唯一一条「猜的」
  s = await ensureScene(page, "stair", "KeyA");
  await mark("换场景后");
  await page.waitForTimeout(200);
  await approach(page, 120);
  await mark("到扶手");
  // 按 E 之前先确认提示条真的是「扶手」。不然一旦人站偏了，
  // E 会点到别的东西上，最后只报一句「线索少一条」，看不出是哪一步错的。
  await waitHint(page, "扶手");
  if ((await S(page)).scene !== "stair") fail("走到扶手那儿，场景却不是楼梯口");
  await page.keyboard.press("KeyE");
  await page.waitForTimeout(300);
  await advanceAll(page);
  await page.waitForTimeout(250);

  await page.keyboard.press("Tab");
  await page.waitForTimeout(320);
  const gue = await page.evaluate(() => ({
    n: document.querySelectorAll("#nbList li").length,
    gue: document.querySelectorAll("#nbList li.k-gue").length
  }));
  if (gue.n !== 4) fail(`看过三处，线索本里却有 ${gue.n} 条`);
  if (gue.gue !== 1) fail(`「我猜的」那一类有 ${gue.gue} 条，应该是 1 条`);
  await page.screenshot({ path: path.join(OUT, "s5-guess.png") });
  await page.keyboard.press("Tab");
  await page.waitForTimeout(280);

  // 去把卡捡起来
  await approach(page, 300);
  await mark("回到窗台");
  await waitHint(page, "窗台");
  await page.keyboard.press("KeyE");
  await page.waitForTimeout(500);
  await drain(page, 16000);

  const done = await page.evaluate(() => ({
    hub: document.getElementById("hub").classList.contains("show"),
    saved: window.__daily.store().searchCompleted === true,
    clues: window.__daily.store().searchClues,
    hints: window.__daily.store().searchHints
  }));
  if (!done.hub) fail("G02 找完没有回到目录");
  if (!done.saved) fail("G02 找完没有存下 searchCompleted");
  if (done.clues !== 4) fail(`看了三处（窗台给两条），存档里是 ${done.clues} 条 ｜ 轨迹：${trace.join(" → ")}`);
  if (done.hints !== 3) fail(`问了三次提示，存档里是 ${done.hints}`);
  return done;
}

/** G04：故意漏一球看自然恢复 → 选人 / 蓄力 / 传重了她停不住 → 打满五回合。 */
async function runBall(page) {
  await page.click('#hubList li[data-id="ball"]');
  // 开场对白不是点完就有的：章节壳先淡出 220ms，start 再淡入 420ms + 200ms。
  // 固定 sleep 会扑空，advanceAll 直接返回，后面全在 intro 状态里空转。
  await page.waitForFunction(() => {
    const g = window.__daily.current;
    return g && (g.state === "play" || window.DAILY.dialogOpen());
  }, null, { timeout: 15000 });
  await advanceAll(page);
  await page.waitForFunction(() => {
    const g = window.__daily.current;
    return g && g.state === "play";
  }, null, { timeout: 10000 }).catch(() => { });

  const B = () => page.evaluate(() => {
    const g = window.__daily.current;
    const act = document.getElementById("bgAct");
    return {
      id: g && g.id, state: g && g.state, phase: g && g.phase,
      holder: g && g.holder, to: g && g.to, from: g && g.from,
      arrival: g && g.arrivalIn, rally: g && g.rally, misses: g && g.misses,
      npc: g && g.npcToNpc, selected: g && g.selected, power: g && g.power,
      charging: g && g.charging, shifted: g && g.shifted,
      ball: g && g.ball, logs: g && g.logs,
      dlg: window.DAILY.dialogOpen(),
      hud: document.getElementById("bgHud").classList.contains("show"),
      tip: document.getElementById("bgTip").textContent,
      ctl: !document.getElementById("bgCtl").hidden,
      hub: document.getElementById("hub").classList.contains("show"),
      actSize: act ? act.getBoundingClientRect().width : 0,
      obj: document.getElementById("objSub").textContent
    };
  });

  let s = await B();
  if (s.id !== "ball_pass") fail(`点「体育活动」，进的是 ${s.id}`);
  if (s.state !== "play") fail(`G04 开场对白读完，状态是 ${s.state}`);
  if (!s.hud || !s.ctl) fail("G04 的进度条或触控区没显示");
  if (s.actSize < 70) fail(`G04 触控按钮只有 ${s.actSize}px，手指按不住`);
  if (s.obj.indexOf("不是比赛") < 0) fail(`G04 目标卡写的是「${s.obj}」`);
  await page.waitForTimeout(320);        // 等对白框淡完，不然拍到半透明的上一句
  await page.screenshot({ path: path.join(OUT, "b0-start.png") });

  // 第一球故意不按：漏了以后球滚开、有人去捡，不能进失败画面
  await page.waitForFunction(() => {
    const g = window.__daily.current;
    return g && g.misses >= 1;
  }, null, { timeout: 10000 }).catch(() => { });
  s = await B();
  if (s.misses < 1) fail("G04 第一球不按，居然没判漏接");
  if (s.state !== "play") fail("G04 漏接一球就退出了，应该继续");

  let sawLoose = false, sawFetch = false;
  const tRecover = Date.now();
  while (Date.now() - tRecover < 9000) {
    s = await B();
    if (s.phase === "loose") sawLoose = true;
    if (s.phase === "fetch") sawFetch = true;
    if (sawFetch && s.phase === "held" && s.holder !== "boy") break;
    await page.waitForTimeout(30);
  }
  if (!sawLoose) fail("G04 漏接之后球没有滚开");
  if (!sawFetch) fail("G04 漏接之后没人去捡球");
  if (s.dlg) fail("G04 失误恢复的时候弹了完整对白框");
  await page.screenshot({ path: path.join(OUT, "b1-recover.png") });

  // 第一次拿球：验证选人、蓄力条，以及「传太用力她停不住」。
  // 这段不能干等——等的时候不按空格，飞过来的球全漏了，永远轮不到玩家持球。
  let gotHold = false;
  const tHold = Date.now();
  while (Date.now() - tHold < 25000) {
    const q = await B();
    if (q.dlg) { await advanceAll(page); continue; }
    if (q.phase === "held" && q.holder === "boy") { gotHold = true; break; }
    if (q.phase === "flying" && q.to === "boy" && q.arrival != null &&
        q.arrival <= 40 && q.arrival > -220) {
      await page.keyboard.press("Space");
      await page.waitForTimeout(20);
      continue;
    }
    await page.waitForTimeout(22);
  }
  s = await B();
  if (!gotHold) fail("G04 等了 25 秒都没轮到玩家拿球");

  await page.keyboard.press("KeyD");
  if ((await B()).selected !== "friend") fail("G04 按 D 没有选中闺蜜");
  await page.keyboard.press("KeyA");
  if ((await B()).selected !== "girl") fail("G04 按 A 没有选中朱里");

  await page.keyboard.down("Space");
  await page.waitForTimeout(430);
  const mid = await B();
  if (!mid.charging || mid.power <= 0.1) {
    fail(`G04 按住空格没有蓄力（charging=${mid.charging}, power=${mid.power}）`);
  }
  await page.screenshot({ path: path.join(OUT, "b2-power.png") });
  await page.waitForTimeout(400);       // 合计约 830ms → power≈0.75，超出她的舒服区
  await page.keyboard.up("Space");
  await page.waitForTimeout(140);
  s = await B();
  const mine = s.logs.filter((l) => l.from === "boy");
  if (!mine.length) fail("G04 松开空格没有把球传出去");
  else if (mine[mine.length - 1].control) {
    fail(`G04 力度 ${mine[mine.length - 1].power} 传给她，居然还算停得住`);
  }

  // 剩下按正常节奏打到 5 次：球到脚边按空格接，拿到球就轻轻传出去
  let dialogInFlight = false, outOfBounds = false, catchTries = 0, passTries = 0;
  let lastGood = s;
  const t0 = Date.now();
  while (Date.now() - t0 < 90000) {
    s = await B();
    if (s.id) lastGood = s;        // 收尾之后 current 会被清空，留下最后一份快照
    if (s.phase === "flying" && s.dlg) dialogInFlight = true;
    // 先判收尾。反过来写的话，收尾对白会在循环里被 advanceAll 读掉，
    // 游戏直接退回目录，循环还得空转到超时才退出。
    if (s.state === "rest" || s.state === "done" || (s.id == null && s.hub)) break;
    if (s.dlg) { await advanceAll(page); continue; }
    if (s.ball && (s.ball.x < -2 || s.ball.x > 514)) outOfBounds = true;

    if (s.phase === "flying" && s.to === "boy" && s.arrival != null &&
        s.arrival <= 40 && s.arrival > -220) {
      await page.keyboard.press("Space");
      catchTries++;
      await page.waitForTimeout(20);
      continue;
    }
    if (s.phase === "held" && s.holder === "boy") {
      await page.keyboard.down("Space");
      await page.waitForTimeout(300);   // power≈0.27，稳在舒服区
      await page.keyboard.up("Space");
      passTries++;
      await page.waitForTimeout(60);
      continue;
    }
    await page.waitForTimeout(22);
  }
  const ended = lastGood;
  if (dialogInFlight) fail("G04 球在飞的时候弹了完整对白框");
  if (outOfBounds) fail("G04 球滚出了画面边界");
  if (ended.state !== "rest" && ended.state !== "done") {
    fail(`G04 没打完，停在 ${JSON.stringify({ state: ended.state, phase: ended.phase, rally: ended.rally })}`);
  }
  // 目标卡是 CSS 淡出（0.25s），截图别卡在半透明那一帧
  await page.waitForTimeout(340);
  await page.screenshot({ path: path.join(OUT, "b3-rest.png") });
  await advanceAll(page);
  await page.waitForFunction(() => document.getElementById("hub").classList.contains("show"),
    null, { timeout: 12000 }).catch(() => { });

  const store = await page.evaluate(() => window.__daily.store());
  if (ended.rally < 5) fail(`G04 收尾时只有 ${ended.rally} 次有效传接`);
  if (!ended.shifted) fail("G04 没有出现「换个位置」的节奏变化");
  if (ended.npc < 1) fail("G04 两个 NPC 一次都没互相传过球");
  if (!ended.logs.some((l) => l.wobble !== 0)) fail("G04 一脚都没踢歪，「不大会踢球」没落进玩法");
  if (store.ballGameCompleted !== true) fail("G04 没写存档");
  if (store.ballGameNpcToNpc < 1) fail("G04 存档里没有记下 NPC 互相传球");
  if (catchTries < 2 || passTries < 2) fail(`G04 操作次数太少（接 ${catchTries} / 传 ${passTries}）`);
  const hudLeft = await page.evaluate(() =>
    document.getElementById("bgHud").classList.contains("show"));
  if (hudLeft) fail("G04 退回目录后顶部「传接 5/5」HUD 还留着");
  // 目录是 rAF + CSS 淡入，等一下再拍，否则只拍到空背景
  await page.waitForTimeout(380);
  await page.screenshot({ path: path.join(OUT, "b4-hub.png") });

  ok(`G04：漏接 ${ended.misses} 次自然恢复、NPC 互传 ${ended.npc} 次、踢歪 ` +
     `${ended.logs.filter((l) => l.wobble !== 0).length} 脚、${ended.rally} 次传接收尾`);
  return { rally: ended.rally, misses: ended.misses, npc: ended.npc,
           saved: store.ballGameCompleted === true };
}

async function runBrowser() {
  const browser = await chromium.launch({
    channel: "chrome",
    args: ["--autoplay-policy=no-user-gesture-required"]
  });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
  page.on("console", (m) => { if (m.type() === "error") errors.push("console: " + m.text()); });

  await page.goto(PAGE, { waitUntil: "load", timeout: 60000 });
  await page.waitForFunction(() => window.__daily && window.__daily.events, null, { timeout: 30000 });
  await page.waitForTimeout(1600);

  const hub = await page.evaluate(() => ({
    items: document.querySelectorAll("#hubList li").length,
    playable: document.querySelectorAll("#hubList li.playable").length,
    locked: document.querySelectorAll("#hubList li.locked").length
  }));
  if (hub.items !== 4) fail(`目录 ${hub.items} 项，应该是 4 项`);
  if (hub.playable !== 4) fail(`目录里可玩 ${hub.playable} 项，四个都该能点`);
  if (hub.locked !== 0) fail(`目录里还锁着 ${hub.locked} 项`);
  await page.screenshot({ path: path.join(OUT, "d0-hub.png") });

  // 先走「一句话不问直接找到」，再走「看全了再找」——两种都要成立
  const seEarly = await runSearchEarly(page);
  const se = await runSearch(page);
  const er = await runErrand(page);
  const wd = await runWord(page);
  const bl = await runBall(page);

  await page.screenshot({ path: path.join(OUT, "d8-hub-done.png") });

  if (errors.length) fails.push(...errors.slice(0, 6));
  else ok("浏览器无报错");

  await browser.close();
  return { hub, seEarly, se, er, wd, bl };
}

// ---------------------------------------------------------------- 跑

(async () => {
  if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });
  checkStatic();

  let br = null;
  try {
    br = await runBrowser();
  } catch (e) {
    fail("浏览器部分抛异常：" + e.message);
  }

  const report = { ok: oks, failures: fails, browser: br };
  console.log(JSON.stringify(report, null, 2));
  console.log(fails.length ? "\n✗ " + fails.length + " 条没过" : "\n✓ 全部通过（" + oks.length + " 项）");
  process.exit(fails.length ? 1 : 0);
})();
