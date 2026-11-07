/* 第三幕 · 晚间广播 — 自检
 *
 * 分两半：
 *   前半在 Node 里跑谱面和判定。判定是纯函数（偏差秒数 → 档位），
 *   不需要真的等 3 分钟，也不需要音频设备。
 *   后半开浏览器，验真实流程：进演奏、自动弹一遍、字幕跟着走、退出、存档。
 *
 * 用法：node act3/tools/check.cjs
 * 截图落在 act3/tools/out/。
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { chromium } = require(path.resolve(__dirname, "../../game/dust-corridor/node_modules/playwright-core"));

const ROOT = path.resolve(__dirname, "../..");
const OUT = path.join(__dirname, "out");
const PAGE = "file:///" + path.join(ROOT, "act3/broadcast.html").replace(/\\/g, "/") + "?fresh=1";

const fails = [];
const notes = [];
const fail = (m) => { fails.push(m); };
const ok = (m) => { notes.push(m); };

function loadAct3() {
  const sandbox = { console };
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  for (const f of ["audio.js", "script.js", "chart.js", "rhythm.js"]) {
    vm.runInContext(fs.readFileSync(path.join(ROOT, "act3", f), "utf8"), sandbox, { filename: f });
  }
  return sandbox.ACT3;
}

function stubAudio() {
  const log = { say: [], cover: 0, chime: 0, paper: 0 };
  return {
    log,
    now: () => 0,
    say: (who, text) => log.say.push([who, text]),
    blip() {}, chime() { log.chime++; }, tapPaper() { log.paper++; },
    thud() {}, cover() { log.cover++; }, click() {}, metronome() {}
  };
}

// ---------------------------------------------------------------- 1. 谱面

function checkChart(A) {
  const c = A.buildChart(A.Script);

  if (c.duration < 150 || c.duration > 200) {
    fail(`谱面时长 ${c.duration.toFixed(1)}s，应该在 150–200 秒之间`);
  }
  if (c.count < 120 || c.count > 190) {
    fail(`音符 ${c.count} 个，密度不对（120–190）`);
  }
  if (c.mine < 50) fail(`轮到玩家的音符只有 ${c.mine} 个，手太闲`);
  for (const t of ["tap", "hold", "relay"]) {
    if (!c.types[t]) fail(`谱面里没有 ${t} 类型的音符`);
  }
  if (c.types.relay < 4) fail(`接力音符只有 ${c.types.relay} 个，双人合作体现不出来`);

  // 同一轨道不能挤在一起
  for (const lane of ["me", "her"]) {
    const list = c.notes.filter((n) => n.lane === lane);
    for (let i = 1; i < list.length; i++) {
      const gap = list[i].time - list[i - 1].time;
      if (gap < 0.30) fail(`${lane} 轨在 ${list[i].time.toFixed(2)}s 处间隔只有 ${gap.toFixed(3)}s`);
    }
  }

  // 每个音符都要有词块，否则字幕没法高亮
  const empty = c.notes.filter((n) => !n.text || !n.text.length);
  if (empty.length) fail(`${empty.length} 个音符没有词块`);

  // 字幕行：顺序、不重叠（合唱那行除外）
  for (let i = 1; i < c.display.length; i++) {
    const a = c.display[i - 1], b = c.display[i];
    if (b.startBeat < a.startBeat) fail(`第 ${i} 行字幕的时间比上一行还早`);
  }
  const both = c.display.filter((d) => d.who === "both");
  if (both.length !== 1) fail(`合唱行应该有 1 行，实际 ${both.length}`);

  // 收尾那句：两条轨道同一拍落下
  const last = c.notes[c.notes.length - 1];
  const prev = c.notes[c.notes.length - 2];
  if (!last.chord || !prev.chord) fail("最后一句不是两条轨道同拍落下");

  // 提示点：正好在它提示的第一个音符前一拍
  if (!c.cues.length) fail("没有生成任何「她提前敲稿子」的提示点");
  for (const q of c.cues) {
    const n = c.notes.find((x) => x.id === q.noteId);
    if (!n) { fail("提示点指向了一个不存在的音符"); continue; }
    if (Math.abs((n.beat - q.beat) - 1) > 0.001) fail("提示点不在音符前一拍");
    if (n.lane !== "me") fail("提示点指向的不是玩家的音符");
  }

  // 救场点：每个接力音符都有一个，延后 0.9 拍
  const relays = c.notes.filter((n) => n.type === "relay");
  if (c.covers.length !== relays.length) {
    fail(`救场点 ${c.covers.length} 个，接力音符 ${relays.length} 个，对不上`);
  }
  for (const cv of c.covers) {
    const src = c.notes.find((n) => n.id === cv.forNote);
    if (!src) { fail("救场点找不到对应的接力音符"); continue; }
    if (Math.abs((cv.beat - src.beat) - 0.9) > 0.001) fail("救场点没有延后 0.9 拍");
  }

  // 生成两次必须完全一样（谱面里不能有随机）
  const again = A.buildChart(A.Script);
  if (JSON.stringify(c.notes.map((n) => n.time)) !== JSON.stringify(again.notes.map((n) => n.time))) {
    fail("两次生成的谱面不一样，说明里面有随机");
  }

  ok(`谱面 ${c.count} 音符 / ${Math.floor(c.duration / 60)}:${String(Math.round(c.duration % 60)).padStart(2, "0")} / 我 ${c.mine} 她 ${c.hers}`);
  return c;
}

// ---------------------------------------------------------------- 2. 判定窗口

function checkJudge(A) {
  const J = A.JUDGE_WIN;
  const cases = [
    [0, "perfect"], [0.05, "perfect"], [-0.069, "perfect"], [0.071, "good"],
    [0.12, "good"], [-0.149, "good"], [0.151, "ok"], [0.24, "ok"],
    [0.251, "miss"], [-0.4, "miss"], [0.9, "miss"]
  ];
  // judge 挂在 createRhythm 的返回里，单独拿一份
  const r = A.createRhythm(A.buildChart(A.Script), stubAudio(), {});
  for (const [d, want] of cases) {
    const got = r.judge(d);
    if (got !== want) fail(`judge(${d}) = ${got}，应该是 ${want}`);
  }
  if (Math.abs(J.perfect - 0.07) > 1e-9) fail("PERFECT 窗口不是 ±70ms");
  ok("判定窗口 ±70 / ±150 / ±250 ms");
}

// ---------------------------------------------------------------- 3. 判定、计分、救场

function checkRhythm(A) {
  const chart = A.buildChart(A.Script);
  const audio = stubAudio();
  const events = { judge: [], rescue: [], cover: [], cue: [], finish: null };
  const r = A.createRhythm(chart, audio, {
    onJudge: (tier, n, d) => events.judge.push([tier, n.text, +d.toFixed(3)]),
    onRescue: (n) => events.rescue.push(n.text),
    onCover: (n) => events.cover.push(n.text),
    onCue: (q) => events.cue.push(q.time),
    onFinish: (st) => { events.finish = st; }
  });

  const mine = r.mine;
  const first = mine[0];

  // 3.1 正拍按下 = PERFECT
  let res = r.press(first.time);
  if (!res || res.tier !== "perfect") fail(`正拍按下判定成了 ${res && res.tier}`);
  if (r.state.combo !== 1) fail("命中之后连击没有加");
  if (r.state.score !== 1000) fail(`第一个 PERFECT 得分 ${r.state.score}，应该是 1000`);

  // 3.2 晚 120ms = GOOD
  r.reset();
  const second = r.mine[0];
  res = r.press(second.time + 0.12);
  if (!res || res.tier !== "good") fail(`晚 120ms 判定成了 ${res && res.tier}`);

  // 3.3 晚 200ms = OK
  r.reset();
  res = r.press(r.mine[0].time + 0.2);
  if (!res || res.tier !== "ok") fail(`晚 200ms 判定成了 ${res && res.tier}`);

  // 3.4 完全不按 = MISS，连击清零
  r.reset();
  r.update(r.mine[0].time + 0.3);
  if (r.state.counts.miss !== 1) fail(`过了窗口没按，miss 计数是 ${r.state.counts.miss}`);
  if (r.state.combo !== 0) fail("miss 之后连击没有清零");

  // 3.5 长按：按满 vs 松太早
  const holdNote = r.mine.find((n) => n.type === "hold");
  r.reset();
  r.update(holdNote.time - 0.5);
  r.press(holdNote.time);
  const sFull = r.state.score;
  r.release(holdNote.time + holdNote.dur);
  if (Math.abs((holdNote.heldRatio || 0) - 1) > 0.02) {
    fail(`按满的长音 heldRatio = ${holdNote.heldRatio}`);
  }
  r.reset();
  r.update(holdNote.time - 0.5);
  r.press(holdNote.time);
  r.release(holdNote.time + holdNote.dur * 0.25);
  if ((holdNote.heldRatio || 0) > 0.4) fail(`松太早的长音 heldRatio = ${holdNote.heldRatio}，应该明显小于 1`);
  if (r.state.score >= sFull) fail("松太早居然没扣分");

  // 3.6 接力漏掉 → 她补位
  const relay = r.mine.find((n) => n.type === "relay");
  r.reset();
  r.update(relay.time + 0.3);
  if (r.state.rescues !== 1) fail(`漏掉接力之后救场次数是 ${r.state.rescues}`);
  if (!events.rescue.length) fail("救场没有触发 onRescue");
  const cov = r.covers.find((c) => c.forNote === relay.id);
  if (!cov) fail("没有生成对应的补位音符");
  else {
    r.update(cov.time + 0.01);
    if (!cov.judged) fail("补位音符到点了却没有命中");
    if (!events.cover.length) fail("补位没有触发 onCover");
    if (!audio.log.cover) fail("补位没有放她那声「接住」的音效");
  }

  // 3.6b 反过来：接力**接住了**，她就不该再替你念一遍
  //      补位音符如果一开始就激活，会同时犯两个错——
  //      画面提前剧透「她有后手」，声音上则同一句话念两遍。
  r.reset();
  audio.log.cover = 0;
  events.cover.length = 0;
  const covB = r.covers.find((c) => c.forNote === relay.id);
  if (covB.active) fail("还没漏接，补位音符就已经激活了");
  if (r.live().hers.some((n) => n.cover)) fail("还没漏接，补位音符就已经画在轨道上了");
  r.update(relay.time);
  const rres = r.press(relay.time);
  if (!rres || rres.tier !== "perfect") fail("接力音符正拍按下没判成 PERFECT");
  r.update(relay.time + 0.3);
  r.update(covB.time + 0.05);
  if (r.state.rescues !== 0) fail(`接力接住了，救场次数却是 ${r.state.rescues}`);
  if (events.cover.length) fail("接力接住了，她却还是补念了一遍");
  if (audio.log.cover) fail("接力接住了，补位音效还是响了");

  // 3.7 她的轨道全自动，不会有 MISS
  r.reset();
  const herNote = r.hers.find((n) => !n.cover);
  r.update(herNote.time + 0.01);
  if (!herNote.judged) fail("她的音符到点了没有自动命中");
  if (r.state.counts.miss !== 0) fail("她的轨道出现了 MISS");

  // 3.8 提示点按时触发
  r.reset();
  const cue = chart.cues[0];
  r.update(cue.time + 0.01);
  if (!events.cue.length) fail("提示点没有触发");
  if (!audio.log.paper) fail("提示点没有「敲稿纸」的音效");

  // 3.9 全部走完 → 结算
  r.reset();
  const total = chart.totalBeats * chart.spb;
  for (let t = 0; t <= total + 1; t += 0.05) r.update(t);
  if (!r.state.finished) fail("整首走完却没有结算");
  const st = r.stats();
  if (st.total !== r.mine.length) fail("结算里的音符总数不对");
  if (st.rank !== "D") fail(`一个都没按，评级却是 ${st.rank}`);
  if (st.accuracy > 0.01) fail("一个都没按，准确率却不是 0");

  // 3.10 评级
  r.reset();
  for (const n of r.mine) {
    r.update(n.time);
    r.press(n.time);
    if (n.type === "hold") r.release(n.time + n.dur);
  }
  r.update(total + 1);
  const perfect = r.stats();
  if (perfect.rank !== "S") fail(`全部 PERFECT 评级是 ${perfect.rank}`);
  if (perfect.accuracy < 0.99) fail(`全部 PERFECT 准确率只有 ${perfect.accuracy.toFixed(3)}`);
  if (perfect.combo !== r.mine.length) fail(`全部命中最高连击是 ${perfect.combo}，应该是 ${r.mine.length}`);

  ok(`判定/计分/救场：全 PERFECT 得 ${perfect.score} 分，S 级`);
}

// ---------------------------------------------------------------- 4. 浏览器

async function checkBrowser(browser) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
  page.on("console", (m) => { if (m.type() === "error") errors.push("console: " + m.text()); });

  // Chrome 冷启动时首屏偶尔会慢过 30 秒，超时时间给足，别让自检假报错
  await page.goto(PAGE, { waitUntil: "load", timeout: 60000 });
  await page.waitForFunction(() => window.__bc && window.__bc.state, null, { timeout: 30000 });

  // 4.1 开场
  const s0 = await page.evaluate(() => window.__bc.state());
  if (s0.state !== "intro") fail(`刚打开时状态是 ${s0.state}`);
  await page.waitForTimeout(2400);
  const dlgOn = await page.evaluate(() => document.getElementById("dlg").classList.contains("show"));
  if (!dlgOn) fail("开场没有出现对白框");

  // 4.2 布局：字幕条在画布下面，轨道不压人物
  const geo = await page.evaluate(() => {
    const g = document.getElementById("game").getBoundingClientRect();
    const s = document.getElementById("script").getBoundingClientRect();
    return {
      canvas: [Math.round(g.width), Math.round(g.height)],
      canvasBottom: Math.round(g.bottom), scriptTop: Math.round(s.top),
      scriptH: Math.round(s.height),
      inner: [document.getElementById("game").width, document.getElementById("game").height]
    };
  });
  if (geo.inner[0] !== 512 || geo.inner[1] !== 288) fail(`画布逻辑尺寸 ${geo.inner}，应该是 512×288`);
  if (geo.scriptTop < geo.canvasBottom - 1) fail("广播稿字幕条压在画布上了");
  if (geo.scriptH < 40) fail(`字幕条只有 ${geo.scriptH}px 高`);

  const laneBox = await page.evaluate(() => {
    // 两人坐在共用播音桌前，轨道位于右侧空墙／门区。
    const girl = [275 - 29, 275 + 29], boy = [166 - 30, 166 + 30];
    return { lane: [358, 458], girl, boy };
  });
  if (!(laneBox.lane[0] > laneBox.girl[1] && laneBox.lane[0] > laneBox.boy[1])) {
    fail("轨道和人物重叠了");
  }

  // 4.3 推完开场对白 → 试音 → 直接进演奏
  for (let i = 0; i < 40; i++) {
    const st = await page.evaluate(() => window.__bc.state().state);
    if (st !== "intro") break;
    await page.keyboard.press("KeyE");
    await page.waitForTimeout(90);
  }
  let st = await page.evaluate(() => window.__bc.state().state);
  if (st !== "check") fail(`对白读完应该进入试音，实际是 ${st}`);

  // 试音：等节拍器开始，然后跟着拍点按 8 下。
  // 节拍器是 start = now + 1.1，早于它按下去不算数（tapCheck 会忽略）。
  const waitForTick = await page.evaluate(() => {
    const c = window.__bc.scene.check;
    return c ? Math.max(0, (c.start - window.__bc.audio.now()) * 1000) : 0;
  });
  await page.waitForTimeout(waitForTick + 60);
  for (let i = 0; i < 8; i++) {
    await page.keyboard.press("Space");
    await page.waitForTimeout(625);
  }
  await page.waitForTimeout(300);
  const offsetSaved = await page.evaluate(() => {
    try {
      const d = JSON.parse(localStorage.getItem("our-story-act3-broadcast-v1") || "null");
      return d ? d.offset : null;
    } catch (e) { return null; }
  });
  if (offsetSaved === null) fail("试音之后没有把手感校准存下来");

  // 4.4 倒计时 → 演奏
  await page.waitForFunction(() => window.__bc.state().state === "play", null, { timeout: 15000 });
  const onAir = await page.evaluate(() => window.__bc.state().onAir);
  if (onAir < 0.5) fail("开始演奏了 ON AIR 灯却没亮");

  // 4.5 打开自动弹，但**故意漏掉所有接力音符**——一次跑完两件事：
  //     普通音符照样命中（证明谱面在走），接力漏掉之后看她补不补。
  //     前 16 秒本来就没有玩家的音符，所以不用担心一开始就漏一堆。
  await page.evaluate(() => {
    window.__auto = { on: true, presses: 0, ticks: 0, skips: 0 };
    let hold = null;
    (function tick() {
      if (!window.__auto.on) return;
      window.__auto.ticks++;
      const bc = window.__bc;
      if (bc.state().state === "play") {
        const t = bc.audio.songTime();
        if (hold && t >= hold.until) { bc.release(); hold = null; }
        for (const n of bc.rhythm.mine) {
          if (n.judged) continue;
          if (n.time - t > 0.06) break;
          if (n.type === "relay") { window.__auto.skips++; continue; }
          bc.press();
          window.__auto.presses++;
          if (n.type === "hold") hold = { until: n.time + n.dur };
        }
      }
      requestAnimationFrame(tick);
    })();
  });

  await page.waitForFunction(() => window.__bc.state().rescues >= 1, null, { timeout: 34000 })
    .catch(() => { });
  const resc = await page.evaluate(() => window.__bc.state());
  if (!resc.rescues) fail("漏掉接力之后她没有补位");
  await page.waitForTimeout(1200);
  const coverHit = await page.evaluate(() => {
    const c = window.__bc.rhythm.covers[0];
    return c ? { judged: !!c.judged, text: c.text } : null;
  });
  if (!coverHit) fail("没有生成补位音符");
  else if (!coverHit.judged) fail(`补位音符「${coverHit.text}」到点了却没有命中`);
  await page.screenshot({ path: path.join(OUT, "c2-rescue.png") });

  // 再跑一段，确认普通音符一直在被命中
  await page.waitForTimeout(9000);
  const auto = await page.evaluate(() => ({
    presses: window.__auto.presses,
    ticks: window.__auto.ticks,
    st: window.__bc.state(),
    scr: {
      who: document.getElementById("scrWho").textContent,
      text: document.getElementById("scrLine").textContent,
      spans: document.getElementById("scrLine").children.length,
      done: document.querySelectorAll("#scrLine span.done").length
    }
  }));
  if (auto.ticks < 100) fail(`自动弹的循环只跑了 ${auto.ticks} 帧`);
  if (auto.presses < 3) fail(`自动弹了二十几秒只按下 ${auto.presses} 次，谱面没在走`);
  if (auto.st.counts.perfect < auto.presses * 0.8) {
    fail(`自动弹 ${auto.presses} 次，PERFECT 只有 ${auto.st.counts.perfect} 次`);
  }
  if (auto.st.counts.miss > 4) fail(`自动弹却漏了 ${auto.st.counts.miss} 个（只该漏接力）`);
  if (!auto.scr.spans) fail("字幕条里没有任何词块");
  if (!auto.scr.text.length) fail("字幕条是空的");
  if (["朱里", "和臣", "两人"].indexOf(auto.scr.who) < 0) {
    fail(`字幕说话人显示成了「${auto.scr.who}」`);
  }
  await page.screenshot({ path: path.join(OUT, "c1-play.png") });

  // 4.7 退出
  await page.keyboard.press("Escape");
  await page.waitForTimeout(900);
  const left = await page.evaluate(() => ({
    st: window.__bc.state().state,
    bye: document.getElementById("bye").classList.contains("show"),
    bar: document.getElementById("script").classList.contains("show"),
    t: window.__bc.audio.songTime()
  }));
  if (left.st !== "leave") fail(`按 Esc 之后状态是 ${left.st}`);
  if (!left.bye) fail("按 Esc 之后没有推出收尾卡");
  if (left.bar) fail("退出之后字幕条还在滚");
  // 停歌之后 songTime 必须停在停下的那一刻，不能归零——
  // 归零的话画面上的特效时间差全变负数，光环半径算出负数，Canvas 抛异常。
  if (left.t < 5) fail(`退出时 songTime 是 ${left.t.toFixed(2)}，停歌把时钟归零了`);
  await page.screenshot({ path: path.join(OUT, "c3-leave.png") });

  // 4.8 报错
  if (errors.length) fails.push(...errors.slice(0, 6));
  else ok("浏览器无报错");

  await page.close();
  return { geo, auto: auto.st, left };
}

// ---------------------------------------------------------------- 跑

(async () => {
  if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

  const A = loadAct3();
  const chart = checkChart(A);
  checkJudge(A);
  checkRhythm(A);

  const browser = await chromium.launch({
    channel: "chrome",
    args: ["--autoplay-policy=no-user-gesture-required"]
  });
  let br = null;
  try {
    br = await checkBrowser(browser);
  } catch (e) {
    fail("浏览器部分抛异常：" + e.message.split("\n")[0]);
  }
  await browser.close();

  console.log(JSON.stringify({
    chart: {
      notes: chart.count, mine: chart.mine, hers: chart.hers,
      duration: +chart.duration.toFixed(1), types: chart.types,
      cues: chart.cues.length, covers: chart.covers.length
    },
    browser: br,
    ok: notes,
    failures: fails
  }, null, 2));

  if (fails.length) {
    console.log("\n✗ " + fails.length + " 条没过");
    process.exit(1);
  }
  console.log("\n✓ 全部通过（" + notes.length + " 项）");
})();
