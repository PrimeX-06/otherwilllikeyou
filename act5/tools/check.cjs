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
const PAGE = "file:///" + path.join(DIR, "daily.html").replace(/\\/g, "/") + "?hub=1&fresh=" + Date.now();

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

  // 1.2 所有脚本都在，且没有明显的 ES module 语法（file:// 下不能用）
  const scripts = ["core.js", "trio.js", "explore.js", "errand.js", "search.js",
                   "solo.js", "wordgame.js", "ball.js", "shell.js"];
  for (const f of scripts) {
    if (!fs.existsSync(path.join(DIR, f))) { fail(`缺少 ${f}`); continue; }
    const src = read(f);
    if (/^\s*(import|export)\s/m.test(src)) fail(`${f} 用了 ES module 语法，file:// 下会挂`);
  }

  // 1.2b 背景路人：四向行走表，每张 4 帧、48×72
  for (const who of ["boy", "girl"]) {
    for (const dir of ["down", "up", "left", "right"]) {
      const file = path.join(ROOT, `assets/characters/npc_generated/${who}_walk_${dir}_sheet.png`);
      if (!fs.existsSync(file)) { fail(`缺少 ${who}_walk_${dir}_sheet.png`); continue; }
      const b = fs.readFileSync(file);
      const w = b.readUInt32BE(16), h = b.readUInt32BE(20);
      if (w !== 4 * 48 || h !== 72) fail(`${who}_walk_${dir}_sheet.png 是 ${w}×${h}，应该是 192×72`);
    }
  }
  for (const icon of ["mon", "tue", "wed", "thu", "fri", "nextmon"]) {
    if (!fs.existsSync(path.join(ROOT, `assets/minigame/icon_day_${icon}.png`))) {
      fail(`缺少 icon_day_${icon}.png`);
    }
  }

  // 1.3 题库自洽
  const wg = read("wordgame.js");
  const qBlock = wg.slice(wg.indexOf("const QUESTIONS = ["), wg.indexOf("const WHO ="));
  const answers = [...qBlock.matchAll(/answer:\s*"([^"]+)"/g)].map((m) => m[1]);
  const optionSets = [...qBlock.matchAll(/options:\s*\[([^\]]+)\]/g)].map((m) =>
    m[1].split(",").map((s) => s.trim().replace(/^"|"$/g, "")));
  if (answers.length < 5) fail(`题库只有 ${answers.length} 题，太短了（六个回合起）`);
  if (optionSets.length !== answers.length) fail("有题目没有选项");
  const ansAt = [];
  optionSets.forEach((opts, i) => {
    if (opts.length !== 4) fail(`第 ${i + 1} 题选项 ${opts.length} 个，应该是 4 个`);
    const at = opts.indexOf(answers[i]);
    if (at < 0) fail(`第 ${i + 1} 题的答案「${answers[i]}」不在选项里`);
    ansAt.push(at);
  });
  // 正确答案不许全放第一个：闭眼点第一个就全对，题面再有意思也白搭
  if (ansAt.length > 1 && ansAt.every((n) => n === 0)) {
    fail("所有题的正确答案都在第一个选项，闭眼点第一个就全对了");
  }
  if (wg.indexOf('dataset.ans = "1"') < 0) {
    fail("猜词选项没有标出正确答案，自动化脚本只能靠硬编码答案数组");
  }
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
  const scenes = parseScenes(er, "const BOX =");
  const searchScenes = parseScenes(se, "// 卡在楼梯口窗台上");
  checkSymmetry(scenes, "G01");
  checkSymmetry(searchScenes, "G02");
  if (Object.keys(searchScenes).length < 2) fail("G02 只解析出不到两个场景");

  // 1.4b S3：G01 从「三个场景来回走」改成「一个场景 + 三个站位」。
  //      三个人原地做事，切人靠 active / switchTo，三件事各自一个函数、都能重来。
  if (Object.keys(scenes).length !== 1) {
    fail(`G01 应该只剩一个场景（一个场景 + 三个站位），现在有 ${Object.keys(scenes).length} 个`);
  }
  if (!/let active\s*=\s*"girl"/.test(er)) fail("G01 没有 active 变量（现在是哪个人在做事）");
  for (const fn of ["switchTo", "postNotice", "countPapers", "carryBox"]) {
    if (er.indexOf("function " + fn + "(") < 0) fail(`G01 没有 ${fn}()`);
  }
  // 三个人一起抬箱子：按住空格抬、A / D 扶正；歪了就放下重来，没有失败态。
  for (const fn of ["startCarry", "updateCarry", "dropCarry", "syncCarryTrio"]) {
    if (er.indexOf("function " + fn + "(") < 0) fail(`G01 没有一起抬箱子的 ${fn}()`);
  }
  if (er.indexOf("CARRY") < 0) fail("G01 没有抬箱子用的 CARRY 参数");
  if (er.indexOf("carry.misses++") < 0) fail("G01 抬箱子歪倒没有记下重试");
  // 抬箱动画用的是已有的弯腰 / 抬箱帧：先 pickup，抬起来再换 carry。
  if (er.indexOf("function setCarryPose(") < 0 || er.indexOf("function clearCarryPose(") < 0) {
    fail("G01 没有把已有的弯腰 / 抬箱帧接进来（setCarryPose / clearCarryPose）");
  }
  if (er.indexOf("carry.rise") < 0) fail("G01 抬箱子没有起手 / 放下的抬升动画");
  if (er.indexOf('setCarryPose("carry")') < 0 ||
      er.indexOf('"pickup"') < 0 || er.indexOf('"carry"') < 0) {
    fail("G01 抬箱子没有用 pickup / carry 帧");
  }
  if (er.indexOf("trio.girl.flip") < 0) fail("G01 朱里弯腰时没有转向箱子");
  const coreSrc = read("core.js");
  if (coreSrc.indexOf("a.pose") < 0 || coreSrc.indexOf("a.flip") < 0) {
    fail("core.js 的 drawActor 没接剧情动作帧（pose）和翻转（flip）");
  }
  for (const range of ["carry: [43, 46]", "carry: [50, 53]", "carry: [56, 59]"]) {
    if (coreSrc.indexOf(range) < 0) fail(`core.js 缺少三人的抬箱帧段 ${range}`);
  }
  const carryShell = read("shell.js");
  for (const sheet of ["boy_sheet_act5.png", "girl_sheet_act5_carry.png",
                       "friend_sheet_act5_carry.png"]) {
    if (carryShell.indexOf(sheet) < 0) fail(`章节壳没有加载抬箱用的精灵表 ${sheet}`);
  }
  if (er.indexOf("Tab") < 0) fail("G01 没有 Tab 换人");
  const doneAt = (er.match(/host\.done\(/g) || []).length;
  if (doneAt !== 1) fail(`G01 有 ${doneAt} 个收尾点；做错只该重来，不该结束这一场`);
  for (const k of ["notice.misses++", "papers.misses++", "box.misses++"]) {
    if (er.indexOf(k) < 0) fail(`G01 少了一处「做错重来」的记录（${k}）`);
  }
  const htmlTags = read("daily.html");
  if (htmlTags.indexOf('id="erTags"') < 0) fail("daily.html 缺少 G01 换人条 #erTags");
  for (const who of ["girl", "friend", "boy"]) {
    if (htmlTags.indexOf('data-who="' + who + '"') < 0) fail(`G01 换人条缺少 ${who}`);
  }
  const cssTags = read("daily.css");
  if (cssTags.indexOf(".er-tags") < 0) fail("daily.css 没有换人条样式 .er-tags");

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

  // 1.6 由乃的台词不能占满全场（她不该每次都起哄、每次都说话）
  const lines = [...er.matchAll(/\["(旁白|我|朱里|由乃)",\s*"([^"]+)"\]/g)];
  const friendLines = lines.filter((m) => m[1] === "由乃").length;
  if (!lines.length) fail("没找到任何对白");
  else if (friendLines / lines.length > 0.5) {
    fail(`由乃说了 ${friendLines}/${lines.length} 句，超过一半，重心跑偏了`);
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

  // 1.7b G02 解谜：平面图上的地点、答案路线、每条线索钉在哪儿
  const spotBlock = se.slice(se.indexOf("const SPOTS = {"), se.indexOf("const ROUTE ="));
  const spotIds = [...spotBlock.matchAll(/^\s{4}(\w+):\s*\{/gm)].map((m) => m[1]);
  if (spotIds.length < 6) fail(`G02 平面图只有 ${spotIds.length} 个地点，至少要 6 个`);
  const routeM = se.match(/const ROUTE = \[([^\]]+)\]/);
  const route = routeM ? routeM[1].split(",").map((s) => s.trim().replace(/^"|"$/g, "")) : [];
  if (route.length !== 3) fail(`G02 答案路线有 ${route.length} 站，应该是 3 站`);
  route.forEach((id) => {
    if (spotIds.indexOf(id) < 0) fail(`G02 答案路线里的「${id}」不在 SPOTS 里`);
  });
  const pins = [...se.matchAll(/pin:\s*"(\w+)"/g)].map((m) => m[1]);
  if (pins.length < 6) fail(`G02 只有 ${pins.length} 条线索标了地点，地图上没得钉`);
  pins.forEach((id) => {
    if (spotIds.indexOf(id) < 0) fail(`G02 有线索钉到了不存在的地点「${id}」`);
  });
  // 「我猜的」那条必须指向答案之外，不然去掉它路线也不会变
  const gAt = se.indexOf('kind: "guess"');
  const gPin = gAt < 0 ? null : (se.slice(gAt, gAt + 260).match(/pin:\s*"(\w+)"/) || [])[1];
  if (!gPin) fail("G02「我猜的」那条线索没有属地，谜题的核心就没了");
  else if (route.indexOf(gPin) >= 0) fail(`G02「我猜的」那条钉在「${gPin}」，可它就在答案路线上`);
  if (se.indexOf("function verifyRoute") < 0) fail("G02 没有 verifyRoute()，拼完路线没人判定");
  if (se.indexOf("pins[i] !== ROUTE[i]") < 0) fail("G02 的 verifyRoute() 只比集合不比顺序，路线就只是选点");
  if (se.indexOf('className = "ord"') < 0) fail("G02 钉上的站没有先后编号");
  if (se.indexOf('classList.toggle("drawing"') < 0) fail("G02 钉站的时候没有把玩家画的线露出来");
  if (se.indexOf("function availableClues") < 0) fail("G02 钉地点之前没有挑证据的步骤");
  if (se.indexOf("c.pin !== id") < 0) fail("G02 挑证据时没有校验这句线索属于那个地点");
  if (se.indexOf("searchRouteSolved") < 0) fail("G02 没有 searchRouteSolved 存档位");
  const htmlSrc = read("daily.html");
  for (const id of ["map", "mapWrap", "mapRoute", "mapCheck", "mapClose", "mapSaid",
                    "mapPick", "mapPickList", "mapPickLead", "mapPickClose", "nbMap"]) {
    if (htmlSrc.indexOf('id="' + id + '"') < 0) fail(`daily.html 里缺少 #${id}`);
  }
  const mapPng = path.join(ROOT, "assets/minigame/map_floor2.png");
  if (!fs.existsSync(mapPng)) fail("缺少 assets/minigame/map_floor2.png");
  else {
    const b = fs.readFileSync(mapPng);
    const w = b.readUInt32BE(16), h = b.readUInt32BE(20);
    if (w !== 256 || h !== 160) fail(`map_floor2.png 是 ${w}×${h}，面板坐标按 256×160 写的`);
  }

  // 1.8 由乃在 G02 里人不在场（她在教室门口等她），只发消息，不该抢戏
  const seLines = [...se.matchAll(/\["(旁白|我|朱里|由乃)",\s*"([^"]+)"\]/g)];
  const seFriend = seLines.filter((m) => m[1] === "由乃").length;
  if (!seLines.length) fail("G02 没有对白");
  else if (seFriend / seLines.length > 0.34) {
    fail(`G02 里由乃说了 ${seFriend}/${seLines.length} 句，她人不在场，不该这么多`);
  }

  // 1.9 G04 体育活动：俯视 2.5D 球场，玩家一个人对由乃和朱里，先进三个球
  //     纵深跑位、抢断圈上/下博弈、蓄力时 A/D 转角度 + W/S 调高度；比分只活在这一场里。
  const bg = read("ball.js");
  if (!/goalsToWin:\s*3\b/.test(bg)) fail("G04 的终局条件不是「先进三个球」");
  if (/CFG\.target|target:\s*9\b/.test(bg)) fail("G04 还留着旧的「传接 9 次」目标");
  for (const k of ["playerSpeed", "yunoSpeed", "jurieSpeed", "feintWindow", "stumble", "tackleRange"]) {
    if (bg.indexOf(k + ":") < 0) fail(`G04 缺少 ${k} 这项判定`);
  }
  if (!/playerSpeed:\s*96\b/.test(bg) || !/yunoSpeed:\s*70\b/.test(bg)) {
    fail("G04 的跑速不是玩家 96 / 由乃 70");
  }
  if (!/jurieSpeed:\s*58\b/.test(bg)) fail("G04 朱里不是玩家 0.6 倍速（58 / 96）");
  // 俯视梯形：远近两端的宽度和屏幕位置决定纵深，缺一个人物就不会按远近缩放
  for (const k of ["nearY:", "farY:", "nearW:", "farW:"]) {
    if (bg.indexOf(k) < 0) fail(`G04 缺少俯视球场的 ${k}`);
  }
  for (const fn of ["sxAt", "syAt", "scaleAt"]) {
    if (bg.indexOf("function " + fn) < 0) fail(`G04 缺少 ${fn} 这条纵深投影`);
  }
  if (bg.indexOf("D.axisY()") < 0) fail("G04 没有读 W / S 的纵深轴");
  for (const k of ["aimAng", "aimX", "aimZ", "aimRateA", "aimRateZ"]) {
    if (bg.indexOf(k) < 0) fail(`G04 的射门方向缺少 ${k}`);
  }
  if (bg.indexOf("function aimXFor(") < 0 || bg.indexOf("function aimAngFor(") < 0) {
    fail("G04 的 A/D 没有把角度换算成门线落点");
  }
  // 电脑抢断要有一拍抬手，不能贴上来就立刻得手；开球也要给玩家留距离
  if (bg.indexOf("function updateAiSteal(") < 0) fail("G04 的电脑抢断没有抬手判定");
  if (!/aiStealWindup:\s*0\.\d+/.test(bg)) fail("G04 的电脑抢断没有抬手时间");
  if (!/aiStealRange:\s*\d+/.test(bg)) fail("G04 的电脑抢断没有距离上限");
  if (!/place\("me",\s*0\.50,\s*0\.40/.test(bg)) fail("G04 玩家开球的站位没有退开");
  // 抢断圈：靠近持球人后开圈，护上/护下，玩家用 W / S 打另一边
  for (const fn of ["startDuel", "resolveDuel", "updateDuel"]) {
    if (bg.indexOf("function " + fn + "(") < 0) fail(`G04 缺少抢断圈的 ${fn}()`);
  }
  if (bg.indexOf("duel.guard") < 0) fail("G04 的抢断圈没有护上/护下的判定");
  for (const w of ["W · 上", "S · 下"]) {
    if (bg.indexOf(w) < 0) fail(`G04 的抢断圈没有画出「${w}」`);
  }
  if (bg.indexOf("duelFails") < 0) fail("G04 抢断圈打错边没有反馈统计");
  if (bg.indexOf("startFeint") < 0 || bg.indexOf("feintT") < 0) fail("G04 由乃没有假动作状态");
  if (bg.indexOf("stumbleT = CFG.stumble") < 0) fail("G04 在假动作窗口里抢断没有「被晃」的后果");
  if (bg.indexOf("scoreThem >= 2") < 0) fail("G04 由乃赢到两球后没有改给朱里做球");
  if (bg.indexOf('passTo("jurie"') < 0) fail("G04 朱里没有接球/做球的路线");
  if (bg.indexOf("airKicks") < 0) fail("G04 朱里没有「踢空」这条反馈");
  // 比分不许写进存档，也不许漏进结果卡
  const persists = [...bg.matchAll(/D\.persist\(([^)]*)\)/g)].map((m) => m[1]);
  if (!persists.length) fail("G04 结束时没有写 ballGameCompleted");
  persists.forEach((p) => {
    if (p.indexOf("ballGameCompleted") < 0) fail("G04 的存档里写了别的东西：" + p.trim());
    if (/score|goal|win|lose/i.test(p)) fail("G04 把比分/胜负写进了存档：" + p.trim());
  });
  if (bg.indexOf("localStorage") >= 0) fail("G04 直接碰了 localStorage");
  const shellSrc = read("shell.js");
  if (shellSrc.indexOf("scoreMe") >= 0 || shellSrc.indexOf("scoreThem") >= 0) {
    fail("G04 的比分漏进了章节壳/结果卡");
  }
  // HUD 只留记分牌和一颗按钮
  if (htmlSrc.indexOf('id="bgBoard"') < 0) fail("daily.html 里没有 #bgBoard 记分牌");
  for (const gone of ["bgCount", "bgToGirl", "bgToFriend", "bg-pick"]) {
    if (htmlSrc.indexOf(gone) >= 0) fail(`daily.html 里还留着旧的 G04 控件「${gone}」`);
  }
  const hudStart = htmlSrc.indexOf('id="bgHud"');
  const hudEnd = htmlSrc.indexOf('id="bgCtl"', hudStart);
  const hudBlock = hudStart < 0 ? "" : htmlSrc.slice(hudStart, hudEnd < 0 ? hudStart + 900 : hudEnd);
  if (hudBlock.indexOf('id="bgBoard"') < 0) fail("记分牌不在 #bgHud 里，比分就会跑到画面别处");
  if (hudBlock.indexOf("她们") < 0) fail("记分牌没有右侧的「她们」标签");
  for (const w of ["传接", "传球"]) {
    if (bg.indexOf(w) >= 0) fail(`G04 里还留着旧的「${w}」说法`);
  }
  for (const w of ["好球", "太棒", "干得漂亮"]) {
    if (bg.indexOf(w) >= 0) fail(`G04 出现了庆祝用词「${w}」，这场收尾不庆祝`);
  }
  const mgDir = path.join(ROOT, "assets/minigame");
  for (let a = 0; a <= 3; a++) {
    for (let b = 0; b <= 3; b++) {
      if (!fs.existsSync(path.join(mgDir, `scoreboard_${a}_${b}.png`))) {
        fail(`缺少记分牌 scoreboard_${a}_${b}.png`);
      }
    }
  }
  // 俯视球场是程序画的，只留球本身这张精灵表
  {
    const f = "ball_sheet.png";
    const p = path.join(mgDir, f);
    if (!fs.existsSync(p)) fail("缺少 assets/minigame/" + f);
    else {
      const b = fs.readFileSync(p);
      if (b.readUInt32BE(16) !== 64 || b.readUInt32BE(20) !== 16) {
        fail(`assets/minigame/${f} 是 ${b.readUInt32BE(16)}×${b.readUInt32BE(20)}，代码按 64×16 画的`);
      }
    }
  }

  // 1.10 章节壳必须在 host.done() 时收掉小游戏自己的面板 / HUD
  if (read("shell.js").indexOf("game.dispose") < 0) {
    fail("章节壳没有调用 dispose()，退回目录后 G04 的 HUD 会一直挂着");
  }

  // 1.11 角色显示名统一为「由乃」，不许再把「闺蜜」写进对白 / 按钮 / 注释
  const nameSources = ["daily.html", "daily.css", "core.js", "trio.js", "errand.js",
                       "search.js", "wordgame.js", "ball.js", "shell.js"]
    .map((f) => read(f)).join("\n");
  if (nameSources.indexOf("闺蜜") >= 0) fail("游戏内还留着「闺蜜」当显示名，这个角色现在叫由乃");
  if (nameSources.indexOf('["由乃"') < 0 && nameSources.indexOf("由乃") < 0) {
    fail("找不到由乃这个名字");
  }

  // 1.12 三人同行不许再用 boy.dir 直接翻转跟随位，也不许两人对推
  const trioSrc = read("trio.js");
  if (trioSrc.indexOf("boy.x - boy.dir * cfg.slots") >= 0) {
    fail("三人同行又用回「目标位随朝向瞬间翻转」的写法了，会重现躲着主角走");
  }
  if (trioSrc.indexOf("crossing") < 0 || trioSrc.indexOf("lagRatio") < 0) {
    fail("三人同行缺少「不横穿主角 / 慢半拍同向跟着」的保护");
  }

  // 1.13 共用互动层：四个游戏都能主动发起，短反应不弹对白框、不冻结走位。
  //      「更有互动性」这条需求的落脚点是「玩家自己能起个头 + 角色马上回应」，
  //      如果把回应做成 D.lines()，就又变回「走到点按 E 读一段」了。
  const core = read("core.js");
  for (const api of ["D.react =", "D.clearReact =", "D.onPoke =", "D.poke =",
                     "D.reactHint =", "D.reactStats ="]) {
    if (core.indexOf(api) < 0) fail(`core.js 缺少 ${api}`);
  }
  const shell = read("shell.js");
  if (shell.indexOf("D.poke()") < 0 || shell.indexOf('key.toLowerCase() === "f"') < 0) {
    fail("章节壳没有把 F 统一路由到 D.poke()");
  }
  const html = read("daily.html");
  for (const id of ["react", "reactBtn", "wgSwap", "giveBack"]) {
    if (html.indexOf('id="' + id + '"') < 0) fail(`daily.html 缺少 #${id}`);
  }
  const reactBlock = core.slice(core.indexOf("D.initReact ="),
                                core.indexOf("// ---------------------------------------------------------------- 小工具"));
  if (/D\.lines\s*\(/.test(reactBlock) || /freeze\s*\(/.test(reactBlock)) {
    fail("D.react 弹了完整对白框或冻结了走位，短反应必须是「说完就散」");
  }
  if (reactBlock.indexOf("dialog:start") < 0 && reactBlock.indexOf("dlg") < 0) {
    fail("D.react 没有避开对白系统，会和正在读的对白抢 E");
  }

  // 1.14 四个游戏都得注册 / 清理 / 给胶囊换文案 / 换场时清干净。
  //      漏了 dispose 里的 onPoke(null)，从 G01 退回目录再进 G02 按 F 会串场。
  const gameFiles = ["errand.js", "search.js", "wordgame.js", "ball.js"];
  for (const f of gameFiles) {
    const src = read(f);
    if (src.indexOf("D.onPoke(") < 0) fail(`${f} 没有注册主动发起`);
    if (src.indexOf("D.onPoke(null)") < 0) fail(`${f} 的 dispose 没清掉 onPoke，会串到下一场`);
    if (src.indexOf("D.react(") < 0) fail(`${f} 没有任何即时反应`);
    if (src.indexOf("D.reactHint(") < 0) fail(`${f} 没给左下角胶囊换文案`);
    if (src.indexOf("D.clearReact()") < 0) fail(`${f} 换场 / 收尾时没清短反应`);
  }

  // 1.15 G02 的「自言自语」不能吃掉「问问由乃」那三级提示的次数。
  //      这两件事看起来像，做混了就会变成按 F 白嫖提示。
  const pokeSe = stripComments(se.slice(se.indexOf("function poke()"),
                                        se.indexOf("/** 找到卡之后")));
  if (pokeSe.indexOf("hints") >= 0 || pokeSe.indexOf("toast(") >= 0 ||
      pokeSe.indexOf("askFriend") >= 0) {
    fail("G02 的 F 自言自语动到了三级提示的次数 / 消息条");
  }
  const giveBlock = stripComments(se.slice(se.indexOf("function chooseReturn()"),
                                           se.indexOf("// ---------------------------------------------------------------- 看东西")));
  if (giveBlock.indexOf("finish(-1)") < 0 || giveBlock.indexOf("setTimeout") < 0) {
    fail("G02「怎么还给她」没有超时放行，不选就会拦关");
  }
  if (se.indexOf("returnChoice") < 0) fail("G02 没有把「怎么还」的选择记下来");

  // 1.16 G03「换你出题」是插曲：不计分、不写存档、不改结局。
  const swapBlock = stripComments(wg.slice(wg.indexOf("function swapRound()"),
                                           wg.indexOf("function submitText()")));
  if (swapBlock.indexOf('state = "swap"') < 0) fail("G03 没有「换你出题」这一段");
  if (/correct|hints|D\.persist|wordGame/.test(swapBlock)) {
    fail("G03 的「换你出题」动了成绩或存档，插曲不该变成第四题");
  }

  // 1.17 G04 的 F 是纯互动：只让场上有人接话，不改球权、不改比分。
  //      这一场真正的玩法是带球/射门/抢断，F 不该再偷偷改球路。
  const callBlock = bg.slice(bg.indexOf("function callOut()"), bg.indexOf("function spaceHeld()"));
  if (bg.indexOf("function callOut()") < 0 || callBlock.indexOf("calls++") < 0) {
    fail("G04 的 F 没有接住玩家主动发起");
  }
  if (/ball\.owner\s*=(?!=)|score(Me|Them)\s*[+\-]?=(?!=)|D\.persist/.test(callBlock)) {
    fail("G04 的 F 改到了球权或比分，它应该只是让人接话");
  }

  ok(`静态：男 ${frames.boy} / 女 ${frames.girl} / 由乃 ${frames.friend} 帧、题库 ${answers.length} 题、` +
     `场景 G01 ${Object.keys(scenes).length} 个（一个场景 + 三个站位）/ G02 ${Object.keys(searchScenes).length} 个、` +
     `G01 三个可重来的操作、` +
     `G02 可看点 ${points} 处、对白 ${lines.length + seLines.length} 句（由乃 ${friendLines + seFriend} 句）、` +
     `G04 俯视 2.5D 三球终局 / 抢断圈上·下博弈 / 蓄力 A·D 角度 + W·S 高度 / 电脑抢断有抬手 / 朱里 0.6 倍速、` +
     `四场都接了 F 主动发起与短反应`);
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
    py: g && g.y != null ? g.y : (g && g.trio ? g.trio.boy.y : null),
    girl: g && g.trio ? g.trio.girl.x : null,
    fr: g && g.trio ? g.trio.friend.x : null,
    soloTarget: g && g.target ? { x: g.target.x, y: g.target.y } : null,
    soloNear: g && g.near,
    soloChoice: !document.getElementById("soloChoice").hidden,
    // G01 三个站位 / 三件可重来的操作
    active: g && g.active,
    noticeDone: g && g.noticeDone,
    noticeMisses: g && g.noticeMisses,
    noticeT: g && g.noticeT,
    noticeBand: g && g.noticeBand ? g.noticeBand.slice() : null,
    paperOrder: g && g.paperOrder ? g.paperOrder.slice() : null,
    paperSel: g && g.paperSel,
    paperPicked: g && g.paperPicked,
    paperDone: g && g.paperDone,
    paperMisses: g && g.paperMisses,
    alpha: g && g.trio && g.active ? {
      girl: g.trio.girl.alpha, friend: g.trio.friend.alpha, boy: g.trio.boy.alpha
    } : null,
    boxX: g && g.boxX,
    boxLifted: g && g.boxLifted,
    boxDone: g && g.boxDone,
    boxMisses: g && g.boxMisses,
    boxDrop: g && g.boxDrop ? g.boxDrop.slice() : null,
    boxThr: g && g.boxThr,
    carry: g && g.carry,
    dlg: window.DAILY.dialogOpen(),
    hint: document.getElementById("hint").classList.contains("show")
      ? document.getElementById("hint").textContent : null,
    obj: document.getElementById("obj").classList.contains("show")
      ? document.getElementById("objSub").textContent : null,
    objTitle: document.getElementById("obj").classList.contains("show")
      ? document.querySelector("#obj b").textContent : null
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
  for (let i = 0; i < 6; i++) {
    if ((await S(page)).dlg) await settle(page);
    const a = await S(page);
    if (a.boy == null) return a;
    if (Math.abs(a.boy - targetX) < 10) return a;
    const b = await walk(page, a.boy < targetX ? "KeyD" : "KeyA", { untilX: targetX, timeout });
    if (b.scene !== a.scene) return b;
    if (Math.abs(b.boy - targetX) < 10) return b;
    // 一步都没挪：多半是换场景那句旁白正好在 keydown 之后才弹，
    // walk 第一圈看见 dlg 就退出了。等它浮出来读完，再重按一次。
    if (Math.abs(b.boy - a.boy) < 2) await page.waitForTimeout(220);
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
async function waitHint(page, text, ms = 6000) {
  await page.waitForFunction(function (want) {
    const h = document.getElementById("hint");
    return h.classList.contains("show") && h.textContent.indexOf(want) >= 0;
  }, text, { timeout: ms }).catch(function () { /* 交给调用方报错 */ });
  const s = await S(page);
  if (!s.hint || s.hint.indexOf(text) < 0) fail(`提示条应该是「${text}」，实际是「${s.hint}」`);
  return s;
}

/** 两个绝对定位的元素不许互相压住。新加的 F 胶囊和短反应条盖在画面上，
 *  最容易挡住猜词输入框、线索本按钮、球赛的触控球。 */
async function noOverlap(page, a, b, label) {
  const hit = await page.evaluate(function (sels) {
    const A = document.querySelector(sels[0]), B = document.querySelector(sels[1]);
    if (!A || !B || A.hidden || B.hidden) return false;
    const x = A.getBoundingClientRect(), y = B.getBoundingClientRect();
    return !(x.right <= y.left || x.left >= y.right || x.bottom <= y.top || x.top >= y.bottom);
  }, [a, b]);
  if (hit) fail(`${label}：${a} 压住了 ${b}`);
}

/** 按 F 主动发起：出「我一句 + 她一句」的短反应、胶囊文案对、
 *  不开对白框、不改游戏状态。这是「更有互动性」最核心的一条——
 *  不能又变成弹一段对白让人读完。
 *
 *  expect 是「必听到的台词组」，每组给几个候选（球在谁脚下决定喊哪句）。
 *  短反应是排队的：上一条（掉头 / 站久了的自言自语）还没散时，
 *  新的一来一回会排在后面，所以不能要求按下后 200ms 内就冒出来。 */
async function pokeOnce(page, label, id, key, want, expect) {
  const snap = (k) => page.evaluate(function (kk) {
    const g = window.__daily.current;
    const btn = document.getElementById("reactBtn");
    return {
      id: g && g.id, state: g && g.state, count: g && g[kk],
      btn: btn.hidden ? null : btn.textContent,
      reacts: window.DAILY.reactStats().count,
      dlg: window.DAILY.dialogOpen()
    };
  }, k);

  const before = await snap(key);
  if (before.id !== id) { fail(`${label}：当前不是 ${id}，是 ${before.id}`); return; }
  if (!before.btn || before.btn.indexOf("F") < 0) {
    fail(`${label}：左下角没有 F 提示（${before.btn}）`);
  }
  if (want && before.btn.indexOf(want) < 0) {
    fail(`${label}：胶囊写的是「${before.btn}」，应该含「${want}」`);
  }
  const log0 = await page.evaluate(() => window.__reactLog.length);
  await page.keyboard.press("KeyF");
  let fresh = [];
  const t0 = Date.now();
  while (Date.now() - t0 < 6500) {
    await page.waitForTimeout(160);
    fresh = (await page.evaluate(() => window.__reactLog.slice())).slice(log0);
    if (expect.every((group) => group.some((t) => fresh.some((x) => x.indexOf(t) >= 0)))) break;
  }
  for (const group of expect) {
    if (!group.some((t) => fresh.some((x) => x.indexOf(t) >= 0))) {
      fail(`${label}：按 F 之后没听到「${group.join(" / ")}」（实际：${fresh.join("、") || "无"}）`);
    }
  }
  const after = await snap(key);
  if (after.count !== before.count + 1) {
    fail(`${label}：按 F 之后 ${key} 是 ${before.count} → ${after.count}，没接住这次主动发起`);
  }
  if (after.reacts <= before.reacts) fail(`${label}：按 F 之后没有出现短反应`);
  if (after.dlg) fail(`${label}：按 F 弹出了完整对白框`);
  if (after.state !== before.state &&
      !(label === "G04" && before.state === "play" && after.state === "goalPause")) {
    fail(`${label}：按 F 把状态从 ${before.state} 改成了 ${after.state}`);
  }
  return after;
}

/** 等到「怎么还给她」这块出现；这段时间里对白还要照常用 E 读完。 */
async function drainToGiveBack(page, ms = 12000) {
  const t0 = Date.now();
  while (Date.now() - t0 < ms) {
    const st = await page.evaluate(() => ({
      box: !document.getElementById("giveBack").hidden,
      dlg: window.DAILY.dialogOpen()
    }));
    if (st.box) return true;
    if (st.dlg) await page.keyboard.press("KeyE");
    await page.waitForTimeout(100);
  }
  return false;
}

async function runErrand(page) {
  await page.click('#hubList li[data-id="errand"]');
  await page.waitForTimeout(1100);
  let s = await S(page);
  if (s.state !== "intro") fail(`进「一起去办事」后状态是 ${s.state}`);
  await page.screenshot({ path: path.join(OUT, "d1-corridor.png") });

  // 对白期间：换人条还没出来，人物也不许动
  const tagsHidden = await page.evaluate(() => document.getElementById("erTags").hidden);
  if (!tagsHidden) fail("开场对白还没读完，换人条就出现了");
  const before = (await S(page)).boy;
  await page.keyboard.down("KeyD");
  await page.waitForTimeout(320);
  await page.keyboard.up("KeyD");
  const during = (await S(page)).boy;
  if (Math.abs(during - before) > 1) fail("对白打开的时候人物还能走");

  await advanceAll(page);
  await page.waitForTimeout(1500);   // walkToStations
  await advanceAll(page);
  await page.waitForTimeout(500);

  s = await S(page);
  if (s.state !== "work") fail(`开场对白读完之后状态是 ${s.state}，应该是 work`);
  if (!s.objTitle || s.objTitle.indexOf("分头") < 0) {
    fail(`目标卡标题应该提「分头」，实际「${s.objTitle}」`);
  }
  if (!s.obj || s.obj.indexOf("还剩") < 0) fail(`目标卡应该列出还没做完的事，实际「${s.obj}」`);
  const tags = await page.evaluate(() => {
    const el = document.getElementById("erTags");
    const on = el.querySelector("button.on");
    return {
      hidden: el.hidden,
      n: el.querySelectorAll("button[data-who]").length,
      on: on ? on.dataset.who : null
    };
  });
  if (tags.hidden) fail("做事阶段没有出现换人条");
  if (tags.n !== 3) fail(`换人条有 ${tags.n} 个按钮，应该是 3 个`);
  if (!s.active || s.active !== tags.on) {
    fail(`换人条的亮项和 active 不一致（${tags.on} / ${s.active}）`);
  }
  // 亮着的人不暗，另外两个变暗但还在场上
  if (s.alpha) {
    if (s.alpha[s.active] !== 1) fail(`当前角色 ${s.active} 被变暗了（alpha ${s.alpha[s.active]}）`);
    for (const k of ["girl", "friend", "boy"]) {
      if (k !== s.active && s.alpha[k] >= 1) fail(`${k} 没有被变暗（alpha ${s.alpha[k]}）`);
    }
  } else {
    fail("G01 没有暴露三个人的 alpha，验不了「高亮当前 / 变暗其余」");
  }
  await noOverlap(page, "#erTags", "#hint", "G01 换人条");
  await noOverlap(page, "#erTags", "#reactBtn", "G01 换人条");
  await page.screenshot({ path: path.join(OUT, "d2-stations.png") });

  // 点换人条：三个人都切得动
  for (const who of ["girl", "friend", "boy"]) {
    await page.click(`#erTags button[data-who="${who}"]`);
    await page.waitForTimeout(150);
    const r = await page.evaluate(() => {
      const el = document.querySelector("#erTags button.on");
      return { active: window.__daily.current.active, on: el ? el.dataset.who : null };
    });
    if (r.active !== who) fail(`点「${who}」之后 active 是 ${r.active}`);
    if (r.on !== who) fail(`点「${who}」之后亮着的是 ${r.on}`);
  }
  // Tab 轮换：现在在「我」，Tab 应该轮到朱里
  await page.keyboard.press("Tab");
  await page.waitForTimeout(150);
  s = await S(page);
  if (s.active !== "girl") fail(`Tab 没有轮换到下一个人（${s.active}）`);
  await page.screenshot({ path: path.join(OUT, "d2b-switch.png") });

  // F 主动发起：原地做事的时候也能搭一句，不弹对白、不改状态
  await pokeOnce(page, "G01", "errand", "pokeCount", "搭话",
    [["这些都得今天弄完"], ["嗯。弄完就走"]]);
  await page.screenshot({ path: path.join(OUT, "d2c-poke.png") });

  // ---- 朱里：先松手太早（翘一角掉回手里），再在虚线框里松手
  s = await S(page);
  if (!s.noticeBand || !s.noticeBand.length) fail("G01 没给出布告栏虚线框的判定区间");
  await page.keyboard.down("Space");
  await page.waitForTimeout(300);
  await page.keyboard.up("Space");
  await page.waitForTimeout(750);
  s = await S(page);
  if (s.noticeDone) fail("纸还没到框里，却算贴好了");
  if (s.noticeMisses !== 1) fail(`纸歪了一次，noticeMisses 是 ${s.noticeMisses}`);
  await page.screenshot({ path: path.join(OUT, "d3-notice-miss.png") });

  const band = (await S(page)).noticeBand;
  await page.keyboard.down("Space");
  await page.waitForFunction((lo) => {
    const g = window.__daily.current;
    return !!g && g.noticeT >= lo;
  }, band[0] + 0.03, { timeout: 5000 });
  await page.keyboard.up("Space");
  await page.waitForTimeout(350);
  s = await S(page);
  if (!s.noticeDone) fail("在虚线框里松手却没有贴好");
  await page.screenshot({ path: path.join(OUT, "d3b-notice.png") });

  // ---- 由乃：先拿错一摞（顺序回到第一摞），再按纸上的号拿
  await page.click('#erTags button[data-who="friend"]');
  await page.waitForTimeout(150);
  const order = (await S(page)).paperOrder;
  if (!order || order.length !== 3) fail("G01 没有三摞材料");
  const wrong = order.findIndex((n) => n !== 1);
  const stackPoint = (i) => page.evaluate((idx) => {
    const g = window.__daily.current;
    const r = document.getElementById("scene").getBoundingClientRect();
    const xs = g.paperXs;
    return {
      x: r.left + xs[idx] / 512 * r.width,
      y: r.top + g.paperY / 288 * r.height
    };
  }, i);

  let p = await stackPoint(wrong);
  await page.mouse.click(p.x, p.y);
  await page.waitForTimeout(300);
  s = await S(page);
  if (s.paperPicked !== 0) fail(`先拿了第 ${wrong + 1} 摞，picked 却是 ${s.paperPicked}`);
  if (s.paperMisses !== 1) fail(`拿错一次，paperMisses 是 ${s.paperMisses}`);
  await page.screenshot({ path: path.join(OUT, "d4-paper-miss.png") });

  for (let n = 1; n <= 3; n++) {
    p = await stackPoint(order.indexOf(n));
    await page.mouse.click(p.x, p.y);
    await page.waitForTimeout(260);
  }
  s = await S(page);
  if (!s.paperDone) fail("按号拿完三摞却没有算完成");
  if (s.paperPicked !== 3) fail(`拿完三摞，picked 是 ${s.paperPicked}`);
  await page.screenshot({ path: path.join(OUT, "d4b-paper.png") });

  // ---- 我：门槛没抬推不过去 → 抬起来推过头滚回来 → 再推到落点
  await page.click('#erTags button[data-who="boy"]');
  await page.waitForTimeout(150);
  s = await S(page);
  const drop = s.boxDrop;
  const thr = s.boxThr;
  if (!drop) fail("G01 没给出箱子的落点区间");

  await page.keyboard.down("Space");
  await page.waitForTimeout(900);
  await page.keyboard.up("Space");
  s = await S(page);
  if (s.boxLifted) fail("还没按 E，箱子就抬起来了");
  if (s.boxX >= drop[0]) fail(`没抬箱子却把箱子推到了落点（x=${s.boxX}）`);
  if (s.boxX < thr - 6) fail(`按住空格推，箱子却没到门槛前（x=${s.boxX}）`);
  await page.screenshot({ path: path.join(OUT, "d5-box-block.png") });

  await page.keyboard.press("KeyE");
  await page.waitForTimeout(150);
  s = await S(page);
  if (!s.boxLifted) fail("按 E 没有把箱子抬起来");

  await page.keyboard.down("Space");
  await page.waitForFunction((hi) => {
    const g = window.__daily.current;
    return !!g && g.boxX > hi;
  }, drop[1] + 2, { timeout: 6000 });
  await page.keyboard.up("Space");
  // 等箱子自己滚回门槛前，再验「推过头」
  await page.waitForFunction(() => {
    const g = window.__daily.current;
    return !!g && g.boxX <= g.boxThr - 6;
  }, null, { timeout: 5000 }).catch(() => {});
  s = await S(page);
  if (s.boxDone) fail("箱子推过头了，却算搬好了");
  if (s.boxMisses !== 1) fail(`推过头一次，boxMisses 是 ${s.boxMisses}`);
  if (s.boxX > thr - 4) fail(`推过头之后箱子没有滚回来（x=${s.boxX}）`);
  await page.screenshot({ path: path.join(OUT, "d5b-box-roll.png") });

  // 再来一次：推到门槛、抬、推到落点松手
  await page.keyboard.down("Space");
  await page.waitForTimeout(600);
  await page.keyboard.up("Space");
  s = await S(page);
  if (s.boxX >= thr - 2) fail(`重新推的时候箱子没卡在门槛前（x=${s.boxX}）`);
  await page.keyboard.press("KeyE");
  await page.waitForTimeout(150);
  await page.keyboard.down("Space");
  await page.waitForFunction((lo) => {
    const g = window.__daily.current;
    return !!g && g.boxX >= lo;
  }, drop[0] + 2, { timeout: 6000 });
  await page.keyboard.up("Space");
  await page.waitForTimeout(450);
  s = await S(page);
  if (!s.boxDone) fail("推到落点松手却没算搬好");
  const boxX = s.boxX;
  await page.screenshot({ path: path.join(OUT, "d5c-box.png") });

  // ---- 结尾：三个人做完 → 围到箱子边 → 一起抬（先晃倒一次，再扶正）→ 对白 → 回目录
  await page.waitForFunction(() => {
    const g = window.__daily.current;
    return !!g && (g.state === "ending" || g.state === "walkout" ||
                   g.state === "carry" || g.state === "handover");
  }, null, { timeout: 8000 }).catch(() => {});
  await page.waitForFunction(() => {
    const g = window.__daily.current;
    return !!g && g.state === "carry";
  }, null, { timeout: 8000 }).catch(() => {});
  s = await S(page);
  if (s.state !== "carry") fail(`三个人走到箱子边之后状态是 ${s.state}，应该是 carry`);
  if (!s.carry) fail("G01 没有暴露一起抬箱子的状态");
  else {
    if (s.carry.lift > 0.01) fail(`刚围到箱子边，箱子就被抬起来了（lift ${s.carry.lift}）`);
    if (s.carry.misses !== 0) fail(`还没开始抬就记了 ${s.carry.misses} 次歪倒`);
  }
  await page.screenshot({ path: path.join(OUT, "d5d-carry.png") });

  // 抬箱动画：按住空格先蹲下抓住箱子（pickup），再切到抬箱循环（carry）。
  await page.keyboard.down("Space");
  await page.waitForFunction(() => {
    const g = window.__daily.current;
    return !!g && g.carry && g.carry.rise > 0.12;
  }, null, { timeout: 2500 }).catch(() => {});
  s = await S(page);
  if (!s.carry || s.carry.rise <= 0.12) fail("G01 按住空格后没有起手的抬箱动画");
  if (s.carry.poses.boy !== "pickup" || s.carry.poses.girl !== "pickup" ||
      s.carry.poses.friend !== "pickup") {
    fail(`G01 起手时没有切到弯腰帧（${JSON.stringify(s.carry.poses)}）`);
  }
  if (!s.carry.flipGirl) fail("G01 朱里站在箱子左边，弯腰帧却没有翻向箱子");
  await page.screenshot({ path: path.join(OUT, "d5d0-carry-pickup.png") });
  await page.waitForFunction(() => {
    const g = window.__daily.current;
    return !!g && g.carry && g.carry.rise >= 0.99;
  }, null, { timeout: 3000 }).catch(() => {});
  await page.waitForTimeout(80);
  s = await S(page);
  if (s.carry.poses.boy !== "carry" || s.carry.poses.girl !== "carry" ||
      s.carry.poses.friend !== "carry") {
    fail(`G01 抬起来之后没有切到抬箱帧（${JSON.stringify(s.carry.poses)}）`);
  }
  await page.screenshot({ path: path.join(OUT, "d5d1-carry-lift.png") });
  await page.keyboard.up("Space");
  await page.waitForFunction(() => {
    const g = window.__daily.current;
    return !!g && g.carry && g.carry.rise <= 0.04;
  }, null, { timeout: 2500 }).catch(() => {});

  // 按住空格，再故意一直往一边推：箱子会晃过界，放下重来（没有失败，只是重试）
  await page.keyboard.down("Space");
  await page.keyboard.down("KeyD");
  await page.waitForFunction(() => {
    const g = window.__daily.current;
    return !!g && g.carry && g.carry.misses >= 1;
  }, null, { timeout: 9000 }).catch(() => {});
  await page.keyboard.up("KeyD");
  await page.keyboard.up("Space");
  s = await S(page);
  if (!s.carry || s.carry.misses < 1) fail("G01 抬箱子时一直往一边推，箱子却没有歪倒重来");
  if (s.carry && s.carry.lift > 0.01) fail("G01 箱子歪倒之后抬升进度没有复位");
  await page.screenshot({ path: path.join(OUT, "d5e-carry-fail.png") });
  await page.waitForFunction(() => {
    const g = window.__daily.current;
    return !!g && g.carry && g.carry.dropT <= 0;
  }, null, { timeout: 4000 }).catch(() => {});

  // 按住空格，按倾角反方向按 A / D，把箱子扶正抬起来
  await page.keyboard.down("Space");
  let holdA = false, holdD = false, carryOk = false;
  const carryT0 = Date.now();
  while (Date.now() - carryT0 < 18000) {
    const c = await page.evaluate(() => {
      const g = window.__daily.current;
      return g && g.carry ? g.carry : null;
    });
    if (!c) break;
    if (c.done) { carryOk = true; break; }
    const wantA = c.tilt > 0.06;
    const wantD = c.tilt < -0.06;
    if (wantA !== holdA) {
      holdA = wantA;
      await page.keyboard[wantA ? "down" : "up"]("KeyA");
    }
    if (wantD !== holdD) {
      holdD = wantD;
      await page.keyboard[wantD ? "down" : "up"]("KeyD");
    }
    await page.waitForTimeout(50);
  }
  await page.keyboard.up("Space");
  if (holdA) await page.keyboard.up("KeyA");
  if (holdD) await page.keyboard.up("KeyD");
  s = await S(page);
  if (!carryOk || !s.carry || !s.carry.done) {
    fail(`G01 扶正之后箱子没有抬起来（tilt ${s.carry ? s.carry.tilt.toFixed(2) : "?"}）`);
  }
  await page.screenshot({ path: path.join(OUT, "d5f-carry-done.png") });

  await page.waitForFunction(() => window.DAILY.dialogOpen(), null, { timeout: 12000 }).catch(() => {});
  s = await S(page);
  if (!s.dlg) fail("一起把箱子抬起来之后没有进入结尾对白");
  if (s.state !== "handover") fail(`结尾对白时状态是 ${s.state}，应该是 handover`);
  if (s.girl == null || s.fr == null) fail("结尾读不到朱里和由乃的位置");
  else {
    if (Math.abs(s.girl - boxX) > 60) fail(`朱里没有走到箱子边（${s.girl} vs ${boxX}）`);
    if (Math.abs(s.fr - boxX) > 60) fail(`由乃没有走到箱子边（${s.fr} vs ${boxX}）`);
  }
  const tagsEnd = await page.evaluate(() => document.getElementById("erTags").hidden);
  if (!tagsEnd) fail("结尾了换人条还挂着");
  await page.screenshot({ path: path.join(OUT, "d6-end.png") });

  const tEnd = Date.now();
  while (Date.now() - tEnd < 12000) {
    const st = await page.evaluate(() => ({
      dlg: window.DAILY.dialogOpen(),
      hub: document.getElementById("hub").classList.contains("show")
    }));
    if (st.hub) break;
    if (st.dlg) await page.keyboard.press("KeyE");
    await page.waitForTimeout(120);
  }

  const done = await page.evaluate(() => ({
    hub: document.getElementById("hub").classList.contains("show"),
    saved: window.__daily.store().errandCompleted === true,
    cur: !!window.__daily.current
  }));
  if (!done.hub) fail("搬完箱子没有回到目录");
  if (!done.saved) fail("搬完箱子没有存下 errandCompleted");
  if (done.cur) fail("搬完箱子之后小游戏还没释放");
  return done;
}

/** 等单人日常的选择面板出现；对白还要照常用 E 读完。 */
async function drainToSoloChoice(page, ms = 12000) {
  const t0 = Date.now();
  while (Date.now() - t0 < ms) {
    const st = await page.evaluate(() => ({
      box: !document.getElementById("soloChoice").hidden,
      dlg: window.DAILY.dialogOpen()
    }));
    if (st.box) return true;
    if (st.dlg) await page.keyboard.press("KeyE");
    await page.waitForTimeout(100);
  }
  return false;
}

async function runSolo(page, id, want) {
  await page.click(`#hubList li[data-id="${id}"]`);
  await page.waitForTimeout(1100);
  let s = await S(page);
  if (s.state !== "intro") fail(`${id}：进场状态是 ${s.state}`);
  await advanceAll(page);
  await page.waitForTimeout(300);

  s = await S(page);
  if (s.state !== "approach") { fail(`${id}：开场对白读完后状态是 ${s.state}`); return; }
  if (!s.soloTarget) { fail(`${id}：没有暴露可以走近的目标`); return; }

  // 双轴：W 往墙根走，S 往镜头前走
  const y0 = s.py;
  await page.keyboard.down("KeyW");
  await page.waitForTimeout(340);
  await page.keyboard.up("KeyW");
  const yUp = (await S(page)).py;
  if (!(yUp < y0 - 3)) fail(`${id}：按 W 没有往墙根走（${y0} → ${yUp}）`);
  await page.keyboard.down("KeyS");
  await page.waitForTimeout(520);
  await page.keyboard.up("KeyS");
  const yDown = (await S(page)).py;
  if (!(yDown > yUp + 3)) fail(`${id}：按 S 没有往镜头前走（${yUp} → ${yDown}）`);

  // 走过去：左右 + 前后一起按
  for (let i = 0; i < 60; i++) {
    s = await S(page);
    if (s.dlg) { await advanceAll(page); continue; }
    const t = s.soloTarget;
    if (Math.abs(s.boy - t.x) <= 46 && Math.abs(s.py - t.y) <= 18) break;
    const keys = [];
    if (s.boy < t.x - 46) keys.push("KeyD");
    else if (s.boy > t.x + 46) keys.push("KeyA");
    if (s.py < t.y - 8) keys.push("KeyS");
    else if (s.py > t.y + 8) keys.push("KeyW");
    for (const k of keys) await page.keyboard.down(k);
    await page.waitForTimeout(150);
    for (const k of keys) await page.keyboard.up(k);
  }
  s = await S(page);
  if (!s.soloNear) fail(`${id}：走到她身边没有出现 E 提示`);
  await page.screenshot({ path: path.join(OUT, `e1-${id}.png`) });

  await page.keyboard.press("KeyE");
  if (!(await drainToSoloChoice(page))) { fail(`${id}：对话读完没有出选择面板`); return; }
  await page.screenshot({ path: path.join(OUT, `e2-${id}-choice.png`) });
  await page.click("#soloChoiceBtns button:nth-child(2)");

  const t0 = Date.now();
  while (Date.now() - t0 < 20000) {
    const st = await page.evaluate(() => ({
      hub: document.getElementById("hub").classList.contains("show"),
      dlg: window.DAILY.dialogOpen()
    }));
    if (st.hub) break;
    if (st.dlg) await page.keyboard.press("KeyE");
    await page.waitForTimeout(110);
  }

  const st = await page.evaluate(() => ({
    store: window.__daily.store(),
    box: document.getElementById("soloChoice").hidden
  }));
  if (st.store[want.key] !== true) fail(`${id}：没有存下 ${want.key}`);
  if (st.store[want.reply] !== want.value) {
    fail(`${id}：选第二项后 ${want.reply} 是 ${st.store[want.reply]}，应该是 ${want.value}`);
  }
  if (!st.box) fail(`${id}：回到目录后选择面板还挂着`);
  ok(`${id}：双轴走位、走近说话、选择与存档都成立`);
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

  // 题数和答案都从页面读：题库换了不用回来改自检，也不会出现
  // 「硬编码 3 题、游戏其实 6 题」那种假通过。
  const total = await page.evaluate(() => window.__daily.current.rounds);
  if (total < 5) fail(`猜词只有 ${total} 回合，流程太短`);
  let round = 0;
  for (;;) {
    // state === "ask" 才是真的轮到玩家，不能只看按钮在不在。
    // 半场闲聊（state === "chat"）会在这里被跳过，等下一题。
    await page.waitForFunction(() => {
      const g = window.__daily.current;
      return (g && g.state === "ask") ||
             !document.getElementById("wgSwap").hidden ||
             document.getElementById("wg").hidden;
    }, null, { timeout: 30000 });
    const st = await page.evaluate(() => {
      const g = window.__daily.current;
      return {
        ask: !!g && g.state === "ask",
        swap: !document.getElementById("wgSwap").hidden,
        closed: document.getElementById("wg").hidden
      };
    });
    if (!st.ask) break;                       // 进「换你出题」或面板关了

    const opts = await page.evaluate(() => document.querySelectorAll("#wgOpts button").length);
    if (opts !== 4) fail(`第 ${round + 1} 回合选项 ${opts} 个，应该是 4 个`);
    if (round === 0) {
      await page.screenshot({ path: path.join(OUT, "d6-word.png") });
      await noOverlap(page, "#reactBtn", "#wgInput", "G03");
      await noOverlap(page, "#reactBtn", "#wgOpts", "G03");
      await pokeOnce(page, "G03", "word_guess", "pokeCount", "抢答",
        [["我猜到了，能说了吗"], ["那就说啊"]]);
      await page.screenshot({ path: path.join(OUT, "d6a-poke.png") });
    }

    if (round === 1) {
      const n0 = await page.evaluate(() => document.getElementById("wgClues").children.length);
      await page.click("#wgHint");
      await page.waitForTimeout(300);
      const n1 = await page.evaluate(() => document.getElementById("wgClues").children.length);
      if (n1 <= n0) fail(`按了提示线索数没变（${n0} → ${n1}）`);
      await page.screenshot({ path: path.join(OUT, "d7-clue.png") });
    }

    // 点标了 data-ans 的那个：正确答案每题位置不同，不能再闭眼点第一个
    await page.click('#wgOpts button[data-ans="1"]');
    round++;
    await page.waitForTimeout(1400);
    if (round > total + 1) fail("猜词回合数超过题库，可能没往下走");
  }
  if (round !== total) fail(`猜词只答了 ${round} / ${total} 回合`);

  // 六题之后是「换你出题」。要真的选一次：确认原选项收起来、成绩没变、
  // 而且它自己会收尾——不是又多出一题让人答。
  await page.waitForFunction(() => !document.getElementById("wgSwap").hidden,
    null, { timeout: 14000 }).catch(() => fail("G03 六题之后没有出现「换你出题」"));
  const swap = await page.evaluate(() => {
    const g = window.__daily.current;
    return {
      round: document.getElementById("wgRound").textContent,
      words: document.querySelectorAll("#wgSwapOpts button").length,
      optsHidden: document.getElementById("wgOpts").hidden,
      cluesHidden: document.getElementById("wgClues").hidden,
      correct: g && g.stats.correct,
      state: g && g.state
    };
  });
  if (swap.round.indexOf("换你出题") < 0) fail(`G03 插曲标题是「${swap.round}」`);
  if (swap.words !== 3) fail(`G03「换你出题」给了 ${swap.words} 个词，应该是 3 个`);
  if (!swap.optsHidden || !swap.cluesHidden) fail("G03「换你出题」时原来的题面还挂着");
  if (swap.correct !== total) fail(`G03 插曲把成绩改成了 ${swap.correct}`);
  await noOverlap(page, "#reactBtn", "#wgSwapOpts", "G03 插曲");
  await page.screenshot({ path: path.join(OUT, "d6b-swap.png") });
  await page.click("#wgSwapOpts button:nth-child(2)");
  await page.waitForFunction(() => {
    const g = window.__daily.current;
    return g && g.swapChoice === 1;
  }, null, { timeout: 5000 }).catch(() => fail("G03「换你出题」选了第二个词，没记下来"));

  // 挑完词就该摊出三句线索：先挑那句其实像「抢票」的，验她俩真的会猜偏
  await page.waitForTimeout(200);
  const swapClues = await page.evaluate(() => ({
    lead: document.getElementById("wgSwapLead").textContent,
    n: document.querySelectorAll("#wgSwapClues button").length,
    optsHidden: document.getElementById("wgSwapOpts").hidden,
    state: window.__daily.current.swapState
  }));
  if (swapClues.n !== 3) fail(`G03 出题摊出 ${swapClues.n} 句线索，应该是 3 句`);
  if (swapClues.lead.indexOf("剧透") < 0) fail(`G03 出题没把挑的词摆出来：「${swapClues.lead}」`);
  if (!swapClues.optsHidden) fail("G03 挑完词之后词卡还挂着");
  if (swapClues.state !== "clues") fail(`G03 挑完词之后状态是 ${swapClues.state}`);
  await page.screenshot({ path: path.join(OUT, "d6b2-swap-clues.png") });

  await page.click('#wgSwapClues button[data-clue="0"]');
  await page.waitForFunction(() => {
    const g = window.__daily.current;
    return g && g.swapUsed === 1 &&
      document.getElementById("wgSwapSay").textContent.indexOf("抢票") >= 0;
  }, null, { timeout: 5000 }).catch(() => fail("G03 出题：不像的那句没让她俩猜偏"));
  await page.screenshot({ path: path.join(OUT, "d6c-swap-wrong.png") });

  await page.click('#wgSwapClues button[data-clue="1"]');
  await page.waitForTimeout(1500);
  await page.click('#wgSwapClues button[data-clue="2"]');
  await page.waitForFunction(() => {
    const g = window.__daily.current;
    return g && g.swapUsed === 3 &&
      document.getElementById("wgSwapSay").textContent.indexOf("剧透？") >= 0;
  }, null, { timeout: 6000 }).catch(() => fail("G03 出题：补两句之后没猜回「剧透」"));

  await page.waitForFunction(() => document.getElementById("wg").hidden, null, { timeout: 25000 })
    .catch(() => fail("六回合走完，猜词面板没有关掉"));
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
  if (done.correct !== total) fail(`${total} 题都点对了，存档里 correct 是 ${done.correct}`);
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

  // F 自言自语：不能顺手把「问问由乃」的三级提示次数吃掉
  const beforePoke = await page.evaluate(() => window.__daily.current.hints);
  await pokeOnce(page, "G02", "search", "pokeCount", "自言自语",
    [["她上午到底去哪儿了"], ["我哪能一直盯着她"]]);
  const afterPoke = await page.evaluate(() => ({
    hints: window.__daily.current.hints,
    clues: window.__daily.current.clues.length,
    btn: document.getElementById("nbHint").disabled
  }));
  if (afterPoke.hints !== beforePoke || afterPoke.hints !== 0) {
    fail(`G02 按 F 之后提示次数从 ${beforePoke} 变成 ${afterPoke.hints}`);
  }
  if (afterPoke.clues !== 0) fail("G02 按 F 自言自语居然记出了一条线索");
  if (afterPoke.btn) fail("G02 按 F 之后「问问由乃」被禁用了");
  await page.screenshot({ path: path.join(OUT, "s1a-poke.png") });

  await ensureScene(page, "stair", "KeyA");
  await page.waitForTimeout(200);

  await approach(page, 300);
  await waitHint(page, "窗台");
  // 她俩只在走廊门口等，不该跟着上楼
  const who = await page.evaluate(() => window.__daily.current.girlVisible);
  if (who) fail("到了楼梯口，朱里和由乃还画在画面上——她们没跟过来");
  await page.screenshot({ path: path.join(OUT, "s1-card.png") });

  await page.keyboard.press("KeyE");
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(OUT, "s2-found.png") });

  // 找到卡之后多了一步「怎么还给她」。第一条路真的选一次，
  // 另外那条路（runSearch）故意不选，用来验「不选也不拦关」。
  if (!(await drainToGiveBack(page))) fail("G02 找到卡之后没有出现「怎么还给她」");
  const give = await page.evaluate(() => ({
    shown: !document.getElementById("giveBack").hidden,
    buttons: document.querySelectorAll("#giveBack button[data-i]").length,
    dlg: window.DAILY.dialogOpen()
  }));
  if (!give.shown) fail("G02「怎么还给她」没显示出来");
  if (give.buttons !== 3) fail(`G02「怎么还给她」有 ${give.buttons} 个选项，应该是 3 个`);
  if (give.dlg) fail("G02「怎么还给她」和完整对白框同时挂着");
  await noOverlap(page, "#reactBtn", "#giveBack", "G02 还卡");
  await page.screenshot({ path: path.join(OUT, "s2b-return.png") });
  await page.click('#giveBack button[data-i="2"]');
  await page.waitForFunction(() => {
    const g = window.__daily.current;
    return g && g.returnChoice === 2;
  }, null, { timeout: 5000 }).catch(() => fail("G02 选了「先喊她一声」，returnChoice 没记上"));
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
  if (!m1 || m1.indexOf("出去过一次") < 0) fail(`第一次问由乃，消息是「${m1}」`);
  if (!(await page.evaluate(() => document.getElementById("msg").classList.contains("show")))) {
    fail("问了由乃，消息条没显示出来");
  }
  await page.screenshot({ path: path.join(OUT, "s6-msg.png") });
  await page.click("#nbHint");
  await page.waitForTimeout(280);
  const m2 = await page.evaluate(() => document.getElementById("msg").textContent);
  if (!m2 || m2 === m1) fail("第二次问由乃，消息没变");
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

  // 在地图上想想：先钉两站看线跟着画、站号跟着编；
  // 再把「猜的」那条也钉上 → 多了一站；取消它、打乱顺序 → 顺序不对；
  // 最后按教室 → 饮水机 → 窗台钉对。拼错不拦路，拼对才存 searchRouteSolved。
  await page.click("#nbMap");
  await page.waitForTimeout(320);
  const map0 = await page.evaluate(() => ({
    open: !document.getElementById("map").hidden && document.getElementById("map").classList.contains("show"),
    spots: document.querySelectorAll("#map .spot").length,
    badges: document.querySelectorAll("#map .spot .cnt:not([hidden])").length,
    nbHidden: document.getElementById("nb").hidden
  }));
  if (!map0.open) fail("线索本里点「在地图上想想」没打开平面图");
  if (map0.spots !== 7) fail(`平面图上有 ${map0.spots} 个可点地点，应该是 7 个`);
  if (map0.badges < 3) fail(`平面图上只有 ${map0.badges} 个地点挂着线索角标`);
  if (!map0.nbHidden) fail("打开平面图时线索本还挂在上头");
  await page.screenshot({ path: path.join(OUT, "s7-map.png") });

  // 地图打开时人不能走
  const mx = (await S(page)).boy;
  await page.keyboard.down("KeyD");
  await page.waitForTimeout(340);
  await page.keyboard.up("KeyD");
  if (Math.abs((await S(page)).boy - mx) > 1) fail("平面图打开的时候人物还能走");

  // 钉地点之前先挑一句证据。证据和地点对不上就钉不上，面板也不关。
  async function pinSpot(spot, evidence) {
    await page.click(`#map .spot[data-spot="${spot}"]`);
    await page.waitForTimeout(150);
    const picked = await page.evaluate((want) => {
      const b = [...document.querySelectorAll("#mapPickList button")]
        .find((x) => x.textContent.indexOf(want) >= 0);
      if (!b) return false;
      b.click();
      return true;
    }, evidence);
    await page.waitForTimeout(170);
    if (!picked) fail(`钉「${spot}」的时候，线索里找不到「${evidence}」`);
  }

  // 先故意拿教室的线索去钉饮水机：不该钉上，线索也不能被吃掉
  await page.click('#map .spot[data-spot="cooler"]');
  await page.waitForTimeout(150);
  const pickOpen = await page.evaluate(() => ({
    open: !document.getElementById("mapPick").hidden,
    n: document.querySelectorAll("#mapPickList button").length,
    said: document.getElementById("mapSaid").textContent
  }));
  if (!pickOpen.open) fail("点地点之后没有摊出线索让你挑");
  if (pickOpen.n < 4) fail(`挑证据的列表里只有 ${pickOpen.n} 条线索`);
  await page.screenshot({ path: path.join(OUT, "s7a-map-pick.png") });
  await page.evaluate(() => {
    const b = [...document.querySelectorAll("#mapPickList button")]
      .find((x) => x.textContent.indexOf("教室里的桌子没收") >= 0);
    if (b) b.click();
  });
  await page.waitForTimeout(200);
  const wrongEv = await page.evaluate(() => ({
    pins: window.__daily.current.pins.length,
    pick: window.__daily.current.pickFor,
    said: document.getElementById("mapSaid").textContent,
    open: !document.getElementById("mapPick").hidden
  }));
  if (wrongEv.pins !== 0) fail("证据和地点对不上，地点却钉上了");
  if (wrongEv.pick !== "cooler" || !wrongEv.open) fail("证据挑错之后挑证据的面板关了");
  if (wrongEv.said.indexOf("别的地方") < 0) fail(`证据挑错之后地图说「${wrongEv.said}」`);
  await page.screenshot({ path: path.join(OUT, "s7a2-map-wrong-clue.png") });
  await page.click("#mapPickClose");
  await page.waitForTimeout(160);

  // 钉到第二站：线先按钉的先后画出来，站号也跟着编
  await pinSpot("classroom", "教室里的桌子没收");
  await pinSpot("cooler", "卡她只在接水的时候");
  const sketch = await page.evaluate(() => ({
    pts: document.getElementById("mapRoute").getAttribute("points"),
    drawing: document.getElementById("map").classList.contains("drawing"),
    ords: [...document.querySelectorAll("#map .spot .ord:not([hidden])")].map((o) => o.textContent)
  }));
  if (!sketch.pts || !sketch.drawing) fail("钉到第二站，地图上没有先连一条线");
  if (sketch.ords.join(",") !== "1,2") fail(`钉了两站，站号是 ${sketch.ords.join(",")}，应该是 1,2`);

  await pinSpot("windowsill", "左边窗台的灰里");
  await pinSpot("stair", "扶手上有一道没干的白灰");
  await page.click("#mapCheck");
  await page.waitForTimeout(250);
  const wrong = await page.evaluate(() => ({
    said: document.getElementById("mapSaid").textContent,
    solved: window.__daily.current.routeSolved,
    tries: window.__daily.current.routeTries,
    saved: window.__daily.store().searchRouteSolved === true,
    line: document.getElementById("mapRoute").getAttribute("points"),
    drawn: document.getElementById("map").classList.contains("solved")
  }));
  if (wrong.solved) fail("钉了四站（含猜的那条）居然判成拼对了");
  if (wrong.said.indexOf("多了一站") < 0) fail(`拼错之后地图说「${wrong.said}」，没有「多了一站」`);
  if (wrong.tries !== 1) fail(`拼错一次，routeTries 是 ${wrong.tries}`);
  if (wrong.saved) fail("拼错也存下了 searchRouteSolved");
  if (!wrong.line) fail("钉了四站，玩家连的线却没画出来");
  if (wrong.drawn) fail("拼错的时候地图却亮成拼对的样子");
  await page.screenshot({ path: path.join(OUT, "s7b-map-wrong.png") });

  // 取消多出来的一站，再把顺序打乱：教室挪到最后一个。
  // 取消时证据要放回线索池，重新钉教室还得找得到那句教室的线索。
  await page.click('#map .spot[data-spot="stair"]');
  await page.click('#map .spot[data-spot="classroom"]');   // 取消
  await pinSpot("classroom", "教室里的桌子没收");            // 重新钉，排到最后
  await page.click("#mapCheck");
  await page.waitForTimeout(250);
  const order = await page.evaluate(() => ({
    said: document.getElementById("mapSaid").textContent,
    solved: window.__daily.current.routeSolved,
    pins: window.__daily.current.pins.join(","),
    evidence: window.__daily.current.evidence,
    saved: window.__daily.store().searchRouteSolved === true
  }));
  if (order.solved) fail("三站集合一样、顺序反了，居然判成拼对了");
  if (order.said.indexOf("顺序") < 0) fail(`顺序错的时候地图说「${order.said}」，没提顺序`);
  if (order.pins !== "cooler,windowsill,classroom") fail(`打乱之后的钉子是 ${order.pins}`);
  if (!order.evidence.classroom || order.evidence.classroom.text.indexOf("教室里的桌子没收") < 0) {
    fail("取消再钉之后，教室那句证据没跟着回来");
  }
  if (order.saved) fail("顺序错了也存下了 searchRouteSolved");
  await page.screenshot({ path: path.join(OUT, "s7b2-map-order.png") });

  // 全部取消，再按她走过的先后钉：教室 → 饮水机 → 窗台
  for (const id of ["cooler", "windowsill", "classroom"]) {
    await page.click(`#map .spot[data-spot="${id}"]`);
  }
  await pinSpot("classroom", "教室里的桌子没收");
  await pinSpot("cooler", "卡她只在接水的时候");
  await pinSpot("windowsill", "左边窗台的灰里");
  await page.click("#mapCheck");
  await page.waitForTimeout(300);
  const right = await page.evaluate(() => ({
    said: document.getElementById("mapSaid").textContent,
    solved: window.__daily.current.routeSolved,
    pins: window.__daily.current.pins.join(","),
    saved: window.__daily.store().searchRouteSolved === true,
    line: document.getElementById("mapRoute").getAttribute("points"),
    drawn: document.getElementById("map").classList.contains("solved"),
    check: document.getElementById("mapCheck").disabled,
    obj: document.getElementById("objSub").textContent
  }));
  if (!right.solved) fail("三站按顺序钉对了，routeSolved 还是 false");
  if (right.said.indexOf("那就是这条") < 0) fail(`拼对之后地图说「${right.said}」`);
  if (right.pins !== "classroom,cooler,windowsill") fail(`拼对的钉子和顺序是 ${right.pins}`);
  if (!right.saved) fail("拼对之后没有存下 searchRouteSolved");
  if (!right.line || right.line !== "52,27 102,73 37,73") fail(`拼对之后地图上的线是「${right.line}」`);
  if (!right.drawn) fail("拼对之后地图上的线没亮");
  if (!right.check) fail("拼对之后「看看这条线」还能再按");
  if (right.obj.indexOf("楼梯口") < 0) fail(`拼对之后目标卡没改口：「${right.obj}」`);
  await page.screenshot({ path: path.join(OUT, "s7c-map-solved.png") });

  await page.click("#mapClose");
  await page.waitForTimeout(320);
  const closed = await page.evaluate(() => ({
    open: !document.getElementById("map").hidden,
    state: window.__daily.current.state
  }));
  if (closed.open) fail("点「合上」之后平面图还挂着");
  if (closed.state !== "search") fail(`合上平面图之后状态是 ${closed.state}`);

  // 地图是从线索本里打开的，线索本已经先合上了；这里只确认没有别的面板还挡路
  await page.keyboard.press("Escape");
  await page.waitForTimeout(200);
  await approach(page, 300);
  await mark("回到窗台");
  await waitHint(page, "窗台");
  await page.keyboard.press("KeyE");
  await page.waitForTimeout(500);
  // 拼对过路线，捡卡时的第二句应该是「果然在这儿」
  await page.keyboard.press("KeyE");
  await page.waitForTimeout(260);
  const foundLine = await page.evaluate(() => document.getElementById("line").textContent);
  if (foundLine.indexOf("果然") < 0) fail(`拼对之后捡卡，第二句是「${foundLine}」，没有「果然」`);
  // 这一遍故意不选「怎么还给她」：6 秒后要自己往下走，不能拦关。
  if (!(await drainToGiveBack(page))) fail("G02 第二遍没有出现「怎么还给她」");
  await page.waitForFunction(() => document.getElementById("giveBack").hidden,
    null, { timeout: 9000 }).catch(() => fail("G02 不选「怎么还」时卡住了"));
  const rc = await page.evaluate(() => {
    const g = window.__daily.current;
    return g ? g.returnChoice : null;
  });
  if (rc !== null && rc !== -1) fail(`G02 故意不选，returnChoice 却是 ${rc}`);
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

/** G04：俯视 2.5D 球场 —— 二维跑位、抢断圈上/下博弈、蓄力调左右与高度射门。
 *  先验抢断圈打错边会被晃、打空档能断球；再验蓄力时 W/S 改高度；最后站桩输一场、重开赢一场。 */
async function runBall(page) {
  // 一场球从开球到收尾。开局对白不是点完就有的：章节壳先淡出 220ms，
  // start 再淡入 420ms + 200ms。固定 sleep 会扑空，advanceAll 直接返回。
  const openMatch = async () => {
    await page.click('#hubList li[data-id="ball"]');
    await page.waitForFunction(() => {
      const g = window.__daily.current;
      return g && (g.state === "play" || window.DAILY.dialogOpen());
    }, null, { timeout: 15000 });
    await advanceAll(page);
    await page.waitForFunction(() => {
      const g = window.__daily.current;
      return g && g.state === "play";
    }, null, { timeout: 10000 }).catch(() => { });
  };

  const B = () => page.evaluate(() => {
    const g = window.__daily.current;
    const act = document.getElementById("bgAct");
    const board = document.getElementById("bgBoard");
    const pos = (k) => {
      const a = g && g.actors ? g.actors[k] : null;
      return a ? {
        x: a.x, d: a.d, sx: a.sx, sy: a.sy, face: a.face, moving: a.moving
      } : null;
    };
    return {
      id: g && g.id, state: g && g.state, mode: g && g.mode,
      holder: g && g.holder, windup: g && g.windup, winner: g && g.winner,
      me: pos("me"), yuno: pos("yuno"), jurie: pos("jurie"),
      ball: g && g.ball ? {
        x: g.ball.x, d: g.ball.d, z: g.ball.z, sx: g.ball.sx, sy: g.ball.sy
      } : null,
      scoreMe: g && g.scoreMe, scoreThem: g && g.scoreThem,
      feint: g && g.feint, stumbleT: g && g.stumbleT,
      duel: g && g.duel, duelGuard: g && g.duelGuard, duelT: g && g.duelT,
      charging: g && g.charging, power: g && g.power,
      aimAng: g && g.aimAng, aimX: g && g.aimX, aimZ: g && g.aimZ,
      aiSteal: g && g.aiSteal,
      stats: g && g.stats, calls: g && g.calls,
      keys: Object.keys(window.DAILY.keys).filter((k) => window.DAILY.keys[k]),
      config: g && g.config,
      dlg: window.DAILY.dialogOpen(),
      hud: document.getElementById("bgHud").classList.contains("show"),
      tip: document.getElementById("bgTip").textContent,
      ctl: !document.getElementById("bgCtl").hidden,
      act: act ? act.textContent : "",
      actSize: act ? act.getBoundingClientRect().width : 0,
      board: board ? board.getAttribute("src") : "",
      hub: document.getElementById("hub").classList.contains("show"),
      obj: document.getElementById("objSub").textContent
    };
  });

  // 方向键的按下/松开只在变化时发，不然 30ms 一次 keydown 会把操作排队。
  function keyHolder() {
    const held = new Set();
    const apply = async (keys) => {
      for (const k of [...held]) {
        if (!keys.includes(k)) { await page.keyboard.up(k); held.delete(k); }
      }
      for (const k of keys) {
        if (!held.has(k)) { await page.keyboard.down(k); held.add(k); }
      }
    };
    return {
      set: apply,
      clear: () => apply([])
    };
  }

  function towardKeys(q, target, dead = 4) {
    const keys = [];
    if (target.sx < q.me.sx - dead) keys.push("KeyA");
    else if (target.sx > q.me.sx + dead) keys.push("KeyD");
    if (target.sy < q.me.sy - dead) keys.push("KeyW");
    else if (target.sy > q.me.sy + dead) keys.push("KeyS");
    return keys;
  }

  /** 追上持球人并把抢断圈打开；顺便处理开球、散球和过场对白。 */
  async function openDuel(limitMs) {
    const h = keyHolder();
    const t0 = Date.now();
    try {
      while (Date.now() - t0 < limitMs) {
        const q = await B();
        if (!q.id) return null;
        if (q.dlg) { await h.clear(); await advanceAll(page); continue; }
        if (q.state === "goalPause" || q.state === "rest") {
          await h.clear(); await page.waitForTimeout(80); continue;
        }
        if (q.state !== "play") { await h.clear(); await page.waitForTimeout(60); continue; }
        if (q.duel) return q;
        if (q.stumbleT > 0) { await h.clear(); await page.waitForTimeout(60); continue; }
        if (q.holder === "me") {
          // 要验抢断，先站着把球让回给她
          await h.clear();
          await page.waitForTimeout(90);
          continue;
        }
        if (q.holder) {
          if (q.feint) { await h.clear(); await page.waitForTimeout(30); continue; }
          const target = q.holder === "yuno" ? q.yuno : q.jurie;
          if (Math.hypot(q.me.sx - target.sx, q.me.sy - target.sy) > 22) {
            await h.set(towardKeys(q, target));
            await page.waitForTimeout(35);
            continue;
          }
          await h.clear();
          await page.keyboard.press("KeyE");
          await page.waitForTimeout(90);
          const dq = await B();
          if (dq.duel) return dq;
          continue;
        }
        const target = q.ball;
        if (Math.hypot(q.me.sx - target.sx, q.me.sy - target.sy) > 20) {
          await h.set(towardKeys(q, target));
          await page.waitForTimeout(35);
        } else {
          await h.clear();
          await page.keyboard.press("KeyE");
          await page.waitForTimeout(100);
        }
      }
    } finally {
      await h.clear();
    }
    return null;
  }

  /** 在抢断圈里选边。side = "open" 打死角，side = "guard" 故意撞她护住的一边。 */
  async function pickDuel(side) {
    let q = await B();
    if (!q.duel) return false;
    if (q.duelT < 0.5) {
      await page.waitForTimeout(Math.ceil((0.5 - q.duelT) * 1000) + 40);
      q = await B();
    }
    if (!q.duel) return false;
    const guard = q.duelGuard;
    const key = side === "open"
      ? (guard === "up" ? "KeyS" : "KeyW")
      : (guard === "up" ? "KeyW" : "KeyS");
    await page.keyboard.press(key);
    await page.waitForTimeout(140);
    return true;
  }

  /** 循环抢断，直到球在玩家脚下。 */
  async function winBall(limitMs) {
    const t0 = Date.now();
    while (Date.now() - t0 < limitMs) {
      const q = await openDuel(8000);
      if (!q) return null;
      await pickDuel("open");
      const r = await B();
      if (r.holder === "me") return r;
      await page.waitForTimeout(450);
    }
    return null;
  }

  // 玩家的进攻脚本：断球后往远处带，蓄力时 W 抬高、A 把角度往左转，松手射门。
  async function playWin(timeoutMs) {
    const h = keyHolder();
    let last = null;
    let goalsSeen = 0;
    const t0 = Date.now();
    try {
      while (Date.now() - t0 < timeoutMs) {
        const q = await B();
        if (q.id) last = q;
        if (!q.id) break;
        if (q.state === "rest" || q.state === "done") break;
        if (q.dlg) { await h.clear(); await advanceAll(page); continue; }
        if (q.state === "goalPause") {
          await h.clear();
          const goals = (q.scoreMe || 0) + (q.scoreThem || 0);
          if (goals > goalsSeen) {
            goalsSeen = goals;
            await page.waitForTimeout(40);
            const g2 = await B();
            const want = `scoreboard_${g2.scoreMe}_${g2.scoreThem}.png`;
            if (!g2.board || g2.board.indexOf(want) < 0) {
              fail(`G04 记分牌没有跟着比分变成 ${g2.scoreMe}:${g2.scoreThem}`);
            }
            if (goals === 1) {
              await page.screenshot({ path: path.join(OUT, "b2b-goal.png") }).catch(() => { });
            }
          }
          await page.waitForTimeout(80);
          continue;
        }
        if (q.state !== "play") { await h.clear(); await page.waitForTimeout(60); continue; }

        if (q.holder === "me") {
          if (q.stumbleT > 0) { await h.clear(); await page.waitForTimeout(50); continue; }
          if (q.me.d < 0.80) {
            const keys = ["KeyW"];
            if (q.me.x < 0.44) keys.push("KeyD");
            else if (q.me.x > 0.56) keys.push("KeyA");
            await h.set(keys);
            await page.waitForTimeout(40);
            continue;
          }
          await h.clear();
          await page.keyboard.down("Space");
          await page.keyboard.down("KeyW");
          await page.waitForTimeout(560);
          await page.keyboard.up("KeyW");
          await page.keyboard.up("Space");
          await page.waitForTimeout(120);
          continue;
        }

        if (q.holder) {
          if (q.feint) { await h.clear(); await page.waitForTimeout(40); continue; }
          const target = q.holder === "yuno" ? q.yuno : q.jurie;
          if (Math.hypot(q.me.sx - target.sx, q.me.sy - target.sy) > 22) {
            await h.set(towardKeys(q, target));
            await page.waitForTimeout(35);
            continue;
          }
          await h.clear();
          await page.keyboard.press("KeyE");
          await page.waitForTimeout(90);
          await pickDuel("open");
          continue;
        }

        if (q.ball) {
          if (Math.hypot(q.me.sx - q.ball.sx, q.me.sy - q.ball.sy) > 20) {
            await h.set(towardKeys(q, q.ball));
            await page.waitForTimeout(35);
          } else {
            await h.clear();
            await page.keyboard.press("KeyE");
            await page.waitForTimeout(110);
          }
          continue;
        }
        await h.clear();
        await page.waitForTimeout(80);
      }
    } finally {
      await h.clear();
    }
    return last;
  }

  // 站桩：不碰键，由乃会来把球抢走，再打反击。
  async function playLose(timeoutMs) {
    let last = null;
    let shot = false;
    let sawWindup = false;
    const t0 = Date.now();
    while (Date.now() - t0 < timeoutMs) {
      const q = await B();
      if (q.id) last = q;
      if (!q.id) break;
      if (q.aiSteal) sawWindup = true;
      if (q.state === "rest" || q.state === "done") break;
      if (q.dlg) { await advanceAll(page); continue; }
      if (q.state === "goalPause" && q.scoreThem >= 1 && !shot) {
        shot = true;
        await page.screenshot({ path: path.join(OUT, "b5-lose-play.png") }).catch(() => { });
      }
      await page.waitForTimeout(90);
    }
    return last ? Object.assign({}, last, { sawWindup: sawWindup }) : null;
  }

  // 跟着由乃找她的假动作窗口；窗口里按 E 会被晃。
  async function followFeint(ms) {
    const h = keyHolder();
    let found = null;
    const t0 = Date.now();
    try {
      while (Date.now() - t0 < ms) {
        const q = await B();
        if (!q.id) break;
        if (q.state === "rest" || q.state === "done") break;
        if (q.dlg) { await h.clear(); await advanceAll(page); continue; }
        if (q.state !== "play") { await h.clear(); await page.waitForTimeout(60); continue; }
        if (q.holder === "yuno") {
          if (q.feint && Math.hypot(q.me.sx - q.yuno.sx, q.me.sy - q.yuno.sy) <= 26) {
            found = q;
            break;
          }
          await h.set(towardKeys(q, q.yuno, 6));
          await page.waitForTimeout(28);
          continue;
        }
        await h.clear();
        await page.waitForTimeout(60);
      }
    } finally {
      await h.clear();
    }
    return found;
  }

  await openMatch();

  let s = await B();
  if (s.id !== "ball_match") fail(`点「体育活动」，进的是 ${s.id}`);
  if (s.state !== "play") fail(`G04 开场对白读完，状态是 ${s.state}`);
  if (!s.hud || !s.ctl) fail("G04 的记分牌或触控区没显示");
  if (s.actSize < 70) fail(`G04 触控按钮只有 ${s.actSize}px，手指按不住`);
  if (s.obj.indexOf("三个球") < 0) fail(`G04 目标卡写的是「${s.obj}」`);
  if (s.scoreMe !== 0 || s.scoreThem !== 0) fail(`G04 开球比分不是 0:0，是 ${s.scoreMe}:${s.scoreThem}`);
  if (!s.board || s.board.indexOf("scoreboard_0_0.png") < 0) {
    fail(`G04 开局记分牌不是 0:0（src=${s.board}）`);
  }
  // 玩家必须是最快的，而且要能往纵深跑
  const cfg = s.config || {};
  if (!(cfg.playerSpeed > cfg.yunoSpeed && cfg.yunoSpeed > cfg.jurieSpeed)) {
    fail(`G04 跑速不是玩家最快：${cfg.playerSpeed}/${cfg.yunoSpeed}/${cfg.jurieSpeed}`);
  }
  if (!cfg.farY || !cfg.nearY || !cfg.nearW || !cfg.farW) {
    fail("G04 没有俯视球场的纵深参数（nearY/farY/nearW/farW）");
  }
  await page.waitForTimeout(320);        // 等对白框淡完，不然拍到半透明的上一句
  await page.screenshot({ path: path.join(OUT, "b0-start.png") });
  await noOverlap(page, "#reactBtn", "#bgAct", "G04");
  await noOverlap(page, "#react", "#bgHud", "G04");

  // F 喊一声：不改球权、不改比分，只是一句来回
  await pokeOnce(page, "G04", "ball_match", "calls", "喊一声",
    [["这边——", "看好了", "球给我"],
     ["你自己来拿", "看着呢", "自己来抢"]]);
  await page.screenshot({ path: path.join(OUT, "b0b-call.png") });

  // 一、二维跑位：W 往远处、D 往右，两个方向都要真的动。
  //     开球后电脑很快会进球，所以要挑「play」的窗口重试，别把一次进球误判成按键失灵。
  const hm = keyHolder();
  // 开球后电脑几秒就能打进一球，进球会切 1.5s 的 goalPause。
  // 所以按键探针要在「play」窗口里采样：先等 play，再按住并每 60ms 取一次快照，
  // 只拿 play 状态的快照做判断——被进球打断不算按键失灵。
  async function probeMove(key, ms, check) {
    let best = null;
    for (let i = 0; i < 14; i++) {
      let q0 = await B();
      const t0 = Date.now();
      while ((q0.dlg || q0.state !== "play") && Date.now() - t0 < 3200) {
        if (q0.dlg) await advanceAll(page);
        await page.waitForTimeout(80);
        q0 = await B();
      }
      if (q0.dlg || q0.state !== "play") { await page.waitForTimeout(120); continue; }
      await hm.set([key]);
      const steps = Math.max(3, Math.round(ms / 60));
      for (let t = 0; t < steps; t++) {
        await page.waitForTimeout(Math.round(ms / steps));
        const q = await B();
        if (q.state !== "play" || q.duel || q.stumbleT > 0) break;
        if (!best || check(q0, q)) best = { q0: q0, q1: q };
        if (check(q0, q)) { await hm.clear(); return { q0: q0, q1: q, ok: true }; }
      }
      await hm.clear();
      await page.waitForTimeout(160);
    }
    return Object.assign({ ok: false }, best || {});
  }

  const wMove = await probeMove("KeyW", 300, (a, b) => b.me.d > a.me.d + 0.10);
  if (!wMove.ok) {
    if (!wMove.q0) fail("G04 读不到玩家的位置");
    else {
      fail(`G04 按 W 没有往远处走（d ${wMove.q0.me.d.toFixed(2)} → ${wMove.q1.me.d.toFixed(2)}）`);
      if (!(wMove.q1.me.sy < wMove.q0.me.sy - 6)) {
        fail(`G04 往远处走，屏幕上的脚没有上移（sy ${wMove.q0.me.sy.toFixed(1)} → ${wMove.q1.me.sy.toFixed(1)}）`);
      }
    }
  } else if (!(wMove.q1.me.sy < wMove.q0.me.sy - 4)) {
    fail(`G04 往远处走，屏幕上的脚没有上移（sy ${wMove.q0.me.sy.toFixed(1)} → ${wMove.q1.me.sy.toFixed(1)}）`);
  }

  const dMove = await probeMove("KeyD", 240, (a, b) => b.me.x > a.me.x + 0.025);
  if (!dMove.ok) {
    if (dMove.q0) {
      fail(`G04 按 D 没有往右走（x ${dMove.q0.me.x.toFixed(2)} → ${dMove.q1.me.x.toFixed(2)}）`);
    } else fail("G04 读不到玩家的位置");
  }
  await page.screenshot({ path: path.join(OUT, "b0c-move.png") });

  // 二、抢断圈：先故意打她护住的一边，必须被晃、球还在她脚下
  let duelQ = await openDuel(14000);
  if (!duelQ) fail("G04 近不了持球人的身，抢断圈打不开");
  else {
    await page.screenshot({ path: path.join(OUT, "b1-duel.png") });
    await pickDuel("guard");
    s = await B();
    if (s.holder !== "yuno" && s.holder !== "jurie") {
      fail("G04 在抢断圈里撞她护住的一边，居然把球断下来了");
    }
    if (!(s.stumbleT > 0)) {
      fail("G04 在抢断圈里撞她护住的一边，玩家没有「被晃」的停顿");
    }
    if (!s.stats || s.stats.duelFails < 1) fail("G04 抢断圈打错边却没记下反馈");
    await page.screenshot({ path: path.join(OUT, "b1b-duel-fail.png") });
  }

  // 三、抢断圈打空档：W / S 绕开她护住的那一半，球必须断下来
  s = await winBall(16000);
  if (!s) fail("G04 抢断圈打空档，16 秒都没把球断下来");
  else {
    if (s.holder !== "me") fail("G04 抢断圈打空档，球还是没到玩家脚下");
    if (!s.stats || s.stats.tackles < 1) fail("G04 断球成功却没记下抢断");
    if (!s.act || s.act.indexOf("蓄力") < 0) fail("G04 拿到球之后按钮没换成蓄力射门");
    if (s.tip.indexOf("带球") < 0) fail(`G04 拿到球之后提示还是「${s.tip}」`);
    await page.screenshot({ path: path.join(OUT, "b2-tackle.png") });
  }

  // 四、蓄力时 A/D 转射门角度、W/S 调高度，松手出脚
  let shotStats = null;
  const hs = keyHolder();
  const tShoot = Date.now();
  try {
    while (Date.now() - tShoot < 12000) {
      let q = await B();
      if (q.dlg) { await hs.clear(); await advanceAll(page); continue; }
      if (q.state !== "play") { await hs.clear(); await page.waitForTimeout(70); continue; }
      if (q.holder !== "me") {
        if (q.holder) {
          const target = q.holder === "yuno" ? q.yuno : q.jurie;
          if (Math.hypot(q.me.sx - target.sx, q.me.sy - target.sy) > 22) {
            await hs.set(towardKeys(q, target));
            await page.waitForTimeout(35);
            continue;
          }
          await hs.clear();
          await page.keyboard.press("KeyE");
          await page.waitForTimeout(90);
          await pickDuel("open");
        } else if (q.ball) {
          await hs.set(towardKeys(q, q.ball));
          await page.waitForTimeout(35);
        }
        continue;
      }
      if (q.me.d < 0.74) {
        await hs.set(["KeyW"]);
        await page.waitForTimeout(35);
        continue;
      }
      await hs.clear();
      await page.keyboard.down("Space");
      await page.waitForTimeout(60);
      const c0 = await B();
      await page.keyboard.down("KeyW");
      await page.waitForTimeout(300);
      await page.keyboard.up("KeyW");
      await page.keyboard.down("KeyA");
      await page.waitForTimeout(220);
      await page.keyboard.up("KeyA");
      const c1 = await B();
      if (!c1.charging) {
        await page.keyboard.up("Space");
        await page.waitForTimeout(300);
        continue;
      }
      if (!(c1.aimZ > c0.aimZ + 0.08)) {
        fail(`G04 蓄力时按 W，射门高度没有抬高（${c0.aimZ.toFixed(2)} → ${c1.aimZ.toFixed(2)}）`);
      }
      if (!(c1.aimAng < c0.aimAng - 0.15)) {
        fail(`G04 蓄力时按 A，射门角度没有往左转（${c0.aimAng.toFixed(2)} → ${c1.aimAng.toFixed(2)} 弧度）`);
      }
      if (!(c1.aimX < c0.aimX - 0.008)) {
        fail(`G04 蓄力时按 A，射门落点没有跟着角度往左（${c0.aimX.toFixed(2)} → ${c1.aimX.toFixed(2)}）`);
      }
      if (!(c1.power > 0.3 && c1.power < 1)) {
        fail(`G04 蓄力 0.58 秒，力度是 ${c1.power.toFixed(2)}，不在正常区间`);
      }
      if (c1.tip.indexOf("角度") < 0) {
        fail(`G04 蓄力时提示没有说 A/D 调角度：「${c1.tip}」`);
      }
      await page.screenshot({ path: path.join(OUT, "b3-aim.png") });
      // 截图可能花掉几百毫秒；这期间电脑可能把球偷走。松手前再确认一次球还在脚下。
      const cPre = await B();
      if (cPre.holder !== "me" || !cPre.charging) {
        await page.keyboard.up("Space");
        await page.waitForTimeout(250);
        continue;
      }
      const beforeShots = cPre.stats.shots;
      await page.keyboard.up("Space");
      await page.waitForTimeout(250);
      const c2 = await B();
      shotStats = c2.stats;
      if (!c2.stats || c2.stats.shots <= beforeShots) {
        fail("G04 松手之后没有记下这一脚射门");
      }
      if (c2.mode !== "shot" && c2.state !== "goalPause" && c2.holder !== "yuno" &&
          c2.holder !== "jurie" && c2.holder !== "me") {
        fail(`G04 松手之后球的状态是 ${c2.mode}`);
      }
      await page.screenshot({ path: path.join(OUT, "b3b-shot.png") });
      break;
    }
  } finally {
    await hs.clear();
  }
  if (!shotStats) fail("G04 12 秒都没能拿住球完成一次蓄力射门");

  // 五、假动作窗口：她做动作时按 E 会被晃过去，球还在她脚下
  let feinted = null;
  for (let i = 0; i < 5 && !feinted; i++) {
    const q = await followFeint(9000);
    if (!q) break;
    await page.keyboard.press("KeyE");
    await page.waitForTimeout(90);
    const r = await B();
    if (r.stumbleT > 0 && r.holder === "yuno") {
      feinted = r;
      break;
    }
    if (r.duel) await pickDuel("open");
    await page.waitForTimeout(500);
  }
  if (!feinted) fail("G04 由乃带球 9 秒都没做出一次假动作，窗口根本没法验");
  else {
    if (feinted.holder !== "yuno") fail("G04 在假动作窗口里按 E，居然把球断下来了");
    if (!(feinted.stumbleT > 0)) fail("G04 在假动作窗口里按 E，玩家没有「被晃」的停顿");
    if (!feinted.stats || feinted.stats.stumbles < 1) fail("G04 被晃了却没记下反馈");
    await page.screenshot({ path: path.join(OUT, "b4-stumble.png") });
  }

  // 六、这一场不再做动作，站着让它打完 —— 这一场专门验「能输」。
  const loseEnd = await playLose(60000);
  if (!loseEnd) fail("G04 站桩局没有可读的收尾快照");
  if (loseEnd.state !== "rest" && loseEnd.state !== "done") {
    fail(`G04 玩家站着不动，60 秒都没打完（${loseEnd.scoreMe}:${loseEnd.scoreThem}）`);
  }
  if (loseEnd.scoreThem !== 3) fail(`G04 玩家站着不动，对面只进了 ${loseEnd.scoreThem} 球，没打完`);
  if (loseEnd.scoreMe >= 3) fail("G04 玩家站着不动还赢了，不可能");
  if (loseEnd.winner !== "them") fail(`G04 站桩局的赢家是 ${loseEnd.winner}，应该是对面`);
  if (!loseEnd.sawWindup) fail("G04 电脑断球前没有抬手预警（一次都没看到 aiSteal）");
  const loseBoard = `scoreboard_${loseEnd.scoreMe}_${loseEnd.scoreThem}.png`;
  if (!loseEnd.board || loseEnd.board.indexOf(loseBoard) < 0) {
    fail(`G04 站桩局收尾记分牌不是 ${loseEnd.scoreMe}:${loseEnd.scoreThem}`);
  }
  await page.screenshot({ path: path.join(OUT, "b6-lose-rest.png") });
  await advanceAll(page);
  await page.waitForFunction(() => document.getElementById("hub").classList.contains("show"),
    null, { timeout: 15000 }).catch(() => { });
  s = await B();
  if (!s.hub) fail("G04 站桩局结束后没有回到目录");
  if (s.hud) fail("G04 站桩局退回目录后记分牌还挂着");

  const store1 = await page.evaluate(() => window.__daily.store());
  if (store1.ballGameCompleted !== true) fail("G04 站桩局后没写 ballGameCompleted");
  let dirty = Object.keys(store1).filter((k) => /score|goal|win|lose/i.test(k));
  if (dirty.length) fail("G04 把比分/胜负写进了存档：" + dirty.join(","));

  // 七、重新开一场，从 0:0 开始让玩家赢
  await openMatch();
  s = await B();
  if (s.id !== "ball_match" || s.state !== "play") fail("G04 第二场没开起来");
  if (s.scoreMe !== 0 || s.scoreThem !== 0) fail("G04 第二场没有从 0:0 重新开球");
  if (!s.board || s.board.indexOf("scoreboard_0_0.png") < 0) fail("G04 第二场记分牌没有回到 0:0");

  const winEnd = await playWin(160000);
  if (!winEnd) fail("G04 第二场没有可读的收尾快照");
  if (winEnd.state !== "rest" && winEnd.state !== "done") {
    fail(`G04 第二场没在 160 秒内打完（${winEnd.scoreMe}:${winEnd.scoreThem}，${winEnd.state}）`);
  }
  if (winEnd.scoreMe !== 3) fail(`G04 第二场玩家进了 ${winEnd.scoreMe} 球，不是 3`);
  if (winEnd.scoreThem >= 3) fail(`G04 玩家先到 3 球，对面却也到了 ${winEnd.scoreThem}`);
  if (winEnd.winner !== "me") fail(`G04 第二场结算赢家是 ${winEnd.winner}，不是玩家`);
  const wantBoard = `scoreboard_${winEnd.scoreMe}_${winEnd.scoreThem}.png`;
  if (!winEnd.board || winEnd.board.indexOf(wantBoard) < 0) {
    fail(`G04 第二场收尾记分牌不是 ${winEnd.scoreMe}:${winEnd.scoreThem}`);
  }
  await advanceAll(page);
  await page.waitForFunction(() => document.getElementById("hub").classList.contains("show"),
    null, { timeout: 15000 }).catch(() => { });
  s = await B();
  if (!s.hub) fail("G04 第二场结束后没有回到目录");
  if (s.hud) fail("G04 第二场退回目录后记分牌还挂着");
  await page.waitForTimeout(380);
  await page.screenshot({ path: path.join(OUT, "b4-hub.png") });

  const store2 = await page.evaluate(() => window.__daily.store());
  if (store2.ballGameCompleted !== true) fail("G04 第二场后 ballGameCompleted 丢了");
  dirty = Object.keys(store2).filter((k) => /score|goal|win|lose/i.test(k));
  if (dirty.length) fail("G04 第二场把比分/胜负写进了存档：" + dirty.join(","));

  ok(`G04：俯视 2.5D 球场 1 对 2 先进三球 —— 二维跑位、抢断圈上/下博弈（打错边被晃、` +
     `打空档断球）、蓄力 A/D 转角度 + W/S 调高度、电脑抢断有抬手都成立；` +
     `站桩输 ${loseEnd.scoreMe}:${loseEnd.scoreThem}，重开一场赢 ` +
     `${winEnd.scoreMe}:${winEnd.scoreThem}，比分不进存档`);
  return { win: [winEnd.scoreMe, winEnd.scoreThem],
           lose: [loseEnd.scoreMe, loseEnd.scoreThem] };
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
  await page.evaluate(() => {
    window.__reactLog = [];
    window.DAILY.on("react", (r) => window.__reactLog.push(r.who + "：" + r.text));
  });
  await page.waitForTimeout(1600);

  const hub = await page.evaluate(() => ({
    items: document.querySelectorAll("#hubList li").length,
    playable: document.querySelectorAll("#hubList li.playable").length,
    locked: document.querySelectorAll("#hubList li.locked").length
  }));
  if (hub.items !== 6) fail(`目录 ${hub.items} 项，应该是 6 项`);
  if (hub.playable !== 6) fail(`目录里可玩 ${hub.playable} 项，六个都该能点`);
  if (hub.locked !== 0) fail(`目录里还锁着 ${hub.locked} 项`);
  await page.screenshot({ path: path.join(OUT, "d0-hub.png") });

  // 先走「一句话不问直接找到」，再走「看全了再找」——两种都要成立
  const seEarly = await runSearchEarly(page);
  const se = await runSearch(page);
  const er = await runErrand(page);
  await runSolo(page, "jurie", { key: "soloJurieCompleted", reply: "soloJurieReply", value: "direct" });
  await runSolo(page, "yuno", { key: "soloYunoCompleted", reply: "soloYunoReply", value: "secret" });
  const wd = await runWord(page);
  const bl = await runBall(page);

  await page.screenshot({ path: path.join(OUT, "d8-hub-done.png") });

  // 四个游戏都退干净了：F 胶囊、短反应、两块插曲面板不许留在目录上；
  // 而且这时候按 F 不该再触发任何一场的主动发起（onPoke 必须在 dispose 里清掉）。
  const left = await page.evaluate(() => ({
    btn: document.getElementById("reactBtn").hidden,
    react: document.getElementById("react").hidden,
    give: document.getElementById("giveBack").hidden,
    swap: document.getElementById("wgSwap").hidden,
    solo: document.getElementById("soloChoice").hidden
  }));
  for (const k of Object.keys(left)) {
    if (!left[k]) fail(`全部日常结束后，目录上还留着 ${k}`);
  }
  const n0 = await page.evaluate(() => window.DAILY.reactStats().count);
  await page.keyboard.press("KeyF");
  await page.waitForTimeout(300);
  const n1 = await page.evaluate(() => window.DAILY.reactStats().count);
  if (n1 !== n0) fail("回到目录后按 F 还能触发上一场的主动发起");
  ok(`六个日常：G01 搭话 / 两段单人日常双轴走位 / G02 自言自语 / G03 抢答+换你出题 / G04 喊一声，目录无残留`);

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
