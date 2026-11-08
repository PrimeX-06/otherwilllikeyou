/* 第三幕 · 校园日常 — 自动时间线的整条链路
 *
 * 自检（check.cjs）是带 ?hub=1 逐个事件进目录点的，不经过自动时间线。
 * 而玩家正常进入走的是：周一 → 周二 → 周三 → 周四 → 周五 → 下周一，
 * 中间夹着日期卡和短旁白。
 * 这条路上任何一个环节卡住（日期卡没退、面板没关、fade 停在 1、场景没换），
 * 逐事件测试都发现不了。这个脚本只干一件事：不开目录，直接走到底，看能不能出结果卡。
 *
 * 用法：node act5/tools/playall.cjs
 * 截图：act5/tools/out/p0-day-card.png、p1-playall-end.png
 */
const path = require("path");
const { chromium } = require(path.resolve(__dirname, "../../game/dust-corridor/node_modules/playwright-core"));

const DIR = path.resolve(__dirname, "..");
const OUT = path.join(__dirname, "out");
const PAGE = "file:///" + path.join(DIR, "daily.html").replace(/\\/g, "/") + "?fresh=" + Date.now();

const S = (page) => page.evaluate(() => {
  const g = window.__daily.current;
  return {
    id: g ? g.id : null,
    state: g && g.state,
    scene: g && g.scene,
    x: g ? (g.trio ? g.trio.boy.x : g.x) : null,
    y: g && g.y != null ? g.y : null,
    soloTarget: g && g.target ? { x: g.target.x, y: g.target.y } : null,
    soloNear: g && g.near,
    soloChoice: !document.getElementById("soloChoice").hidden,
    // G01：三个站位，谁在做事、三件事各做到哪一步
    active: g && g.active,
    noticeT: g && g.noticeT,
    noticeBand: g && g.noticeBand ? g.noticeBand.slice() : null,
    noticeDone: g && g.noticeDone,
    paperOrder: g && g.paperOrder ? g.paperOrder.slice() : null,
    paperSel: g && g.paperSel,
    paperPicked: g && g.paperPicked,
    paperDone: g && g.paperDone,
    boxX: g && g.boxX,
    boxLifted: g && g.boxLifted,
    boxDone: g && g.boxDone,
    boxThr: g && g.boxThr,
    boxDrop: g && g.boxDrop ? g.boxDrop.slice() : null,
    carry: g && g.carry,
    dlg: window.DAILY.dialogOpen(),
    wg: !document.getElementById("wg").hidden,
    card: document.getElementById("card").classList.contains("show"),
    hub: document.getElementById("hub").classList.contains("show"),
    day: document.getElementById("dayCard").hidden
      ? null : document.getElementById("dayName").textContent,
    // G04 用得到：比分、球在谁脚下、三个人和球的位置、假动作/抢断圈有没有开着
    scoreMe: g && g.scoreMe,
    scoreThem: g && g.scoreThem,
    holder: g && g.holder,
    me: g && g.actors ? { x: g.actors.me.x, d: g.actors.me.d, sx: g.actors.me.sx, sy: g.actors.me.sy } : null,
    yuno: g && g.actors ? { x: g.actors.yuno.x, d: g.actors.yuno.d, sx: g.actors.yuno.sx, sy: g.actors.yuno.sy } : null,
    jurie: g && g.actors ? { x: g.actors.jurie.x, d: g.actors.jurie.d, sx: g.actors.jurie.sx, sy: g.actors.jurie.sy } : null,
    ball: g && g.ball ? { x: g.ball.x, d: g.ball.d, sx: g.ball.sx, sy: g.ball.sy } : null,
    feint: g && g.feint,
    duel: g && g.duel,
    duelGuard: g && g.duelGuard,
    duelT: g && g.duelT,
    stumbleT: g && g.stumbleT,
    // 两块新增的插曲面板：不点也能靠超时过去，但这条链路要真的点一次
    give: !document.getElementById("giveBack").hidden,
    swap: !document.getElementById("wgSwap").hidden,
    btn: document.getElementById("reactBtn").hidden ? null
      : document.getElementById("reactBtn").textContent
  };
});

(async () => {
  const browser = await chromium.launch({ channel: "chrome" });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
  page.on("console", (m) => { if (m.type() === "error") errors.push("console: " + m.text()); });

  await page.goto(PAGE, { waitUntil: "load", timeout: 60000 });
  await page.waitForFunction(() => window.__daily && window.__daily.events, null, { timeout: 30000 });
  await page.waitForTimeout(1600);

  const started = await page.evaluate(() => ({
    hub: document.getElementById("hub").classList.contains("show"),
    busy: window.__daily.busy
  }));
  if (started.hub) errors.push("默认进入不该出现单场目录，时间线应该自己开始");
  if (!started.busy) errors.push("默认进入没有开始推进时间线");

  const seenDaysShot = new Set();

  const seen = [];
  const poked = {};
  const t0 = Date.now();
  let holding = new Set();

  const hold = async (keys) => {
    const next = Array.isArray(keys) ? keys : (keys ? [keys] : []);
    for (const k of [...holding]) {
      if (!next.includes(k)) { await page.keyboard.up(k); holding.delete(k); }
    }
    for (const k of next) {
      if (!holding.has(k)) { await page.keyboard.down(k); holding.add(k); }
    }
  };

  // 猜词六回合 + 一场先进三球的球赛之后，整条链路比原来长了一截
  while (Date.now() - t0 < 480000) {
    const s = await S(page);

    if (s.day && !seenDaysShot.has(s.day)) {
      seenDaysShot.add(s.day);
      // 日期卡是 0.3s 淡入；刚露头就拍会拍到半透明帧。
      await page.waitForTimeout(340);
      await page.screenshot({ path: path.join(OUT, "p0-day-card-" + seenDaysShot.size + ".png") });
    }

    if (s.id && seen[seen.length - 1] !== s.id) seen.push(s.id);

    if (s.card) break;

    // 对白一律按 E 推进
    if (s.dlg) { await hold(null); await page.keyboard.press("KeyE"); await page.waitForTimeout(90); continue; }

    // 单人日常：先走后者身边，等他出现 E 提示再说话；选择面板真的点一次。
    if (s.soloChoice) {
      await hold(null);
      await page.click("#soloChoiceBtns button:nth-child(2)");
      await page.waitForTimeout(220);
      continue;
    }
    if (s.id && s.id.indexOf("solo_") === 0 && s.state === "approach") {
      const t = s.soloTarget;
      if (!t) { await page.waitForTimeout(120); continue; }
      const keys = [];
      if (s.x < t.x - 46) keys.push("KeyD");
      else if (s.x > t.x + 46) keys.push("KeyA");
      if (s.y < t.y - 8) keys.push("KeyS");
      else if (s.y > t.y + 8) keys.push("KeyW");
      if (keys.length) { await hold(keys); await page.waitForTimeout(80); }
      else {
        await hold(null);
        await page.keyboard.press("KeyE");
        await page.waitForTimeout(180);
      }
      continue;
    }

    // G02「怎么还给她」/ G03「换你出题」：这里真的选一次，
    // 不去等那 3.6s / 4.2s 的超时——那样插曲等于没被测到。
    if (s.give) {
      await hold(null);
      await page.click('#giveBack button[data-i="1"]');
      await page.waitForTimeout(220);
      continue;
    }
    if (s.swap) {
      await hold(null);
      const pick = await page.evaluate(() => {
        const g = window.__daily.current;
        return {
          state: g && g.swapState,
          opts: document.querySelectorAll("#wgSwapOpts button").length,
          clues: [...document.querySelectorAll("#wgSwapClues button:not(:disabled)")].map((b) => b.dataset.clue)
        };
      });
      if (pick.state === "pick" && pick.opts) {
        await page.click("#wgSwapOpts button:nth-child(3)");
      } else if (pick.state === "clues" && pick.clues.length) {
        await page.click(`#wgSwapClues button[data-clue="${pick.clues[0]}"]`);
      }
      await page.waitForTimeout(220);
      continue;
    }

    // 四个游戏各主动发起一次（F）。只在各自的安全状态下按，
    // 别在换场淡入 / 对白 / 插曲面板开着的时候插进去。
    if (s.id && !poked[s.id]) {
      const safe = (s.id === "errand" && s.state === "work") ||
                   (s.id && s.id.indexOf("solo_") === 0 && s.state === "approach" && s.soloNear) ||
                   (s.id === "search" && s.state === "search") ||
                   (s.id === "word_guess" && s.state === "ask") ||
                   (s.id === "ball_match" && s.state === "play");
      if (safe) {
        poked[s.id] = s.btn;
        await hold(null);
        await page.keyboard.press("KeyF");
        await page.waitForTimeout(140);
        continue;
      }
    }

    // 猜词：轮到玩家就点标了 data-ans 的那个。
    // 正确答案每题位置不同，不能再点第一个——那是碰运气，不是答题。
    if (s.wg) {
      await hold(null);
      if (s.state === "ask") {
        await page.evaluate(() => {
          const b = document.querySelector('#wgOpts button[data-ans="1"]');
          if (b) b.click();
        });
      }
      await page.waitForTimeout(300);
      continue;
    }

    // G01 收尾：三个人一起抬箱子。按住空格，按倾角反方向按 A / D 扶正。
    if (s.id === "errand" && s.state === "carry") {
      if (s.carry && !s.carry.done) {
        const keys = ["Space"];
        if (s.carry.tilt > 0.06) keys.push("KeyA");
        else if (s.carry.tilt < -0.06) keys.push("KeyD");
        await hold(keys);
        await page.waitForTimeout(45);
      } else {
        await hold(null);
        await page.waitForTimeout(80);
      }
      continue;
    }

    // G01：一个场景三个站位。切到还没做完的人，把自己的事做完：
    // 朱里等纸升进虚线框松手、由乃按纸上印的号拿、我推箱子（门槛前按 E 抬）。
    if (s.id === "errand" && s.state === "work") {
      const todo = [];
      if (!s.noticeDone) todo.push("girl");
      if (!s.paperDone) todo.push("friend");
      if (!s.boxDone) todo.push("boy");
      const target = todo[0];
      if (!target) { await hold(null); await page.waitForTimeout(120); continue; }

      if (s.active !== target) {
        await hold(null);
        await page.click(`#erTags button[data-who="${target}"]`);
        await page.waitForTimeout(140);
        continue;
      }

      if (target === "girl") {
        const lo = s.noticeBand[0] + 0.03;
        if (s.noticeT >= lo) { await hold(null); await page.waitForTimeout(200); continue; }
        await hold(null);
        await page.keyboard.down("Space");
        await page.waitForFunction((v) => {
          const g = window.__daily.current;
          return !!g && g.noticeT >= v;
        }, lo, { timeout: 4000 }).catch(() => {});
        await page.keyboard.up("Space");
        await page.waitForTimeout(250);
        continue;
      }

      if (target === "friend") {
        await hold(null);
        const idx = s.paperOrder.indexOf(s.paperPicked + 1);
        if (idx < 0) { await page.waitForTimeout(120); continue; }
        if (s.paperSel !== idx) {
          await page.keyboard.press(s.paperSel < idx ? "KeyD" : "KeyA");
          await page.waitForTimeout(100);
        } else {
          await page.keyboard.press("KeyE");
          await page.waitForTimeout(140);
        }
        continue;
      }

      // 我：先按住空格推到门槛，抬起来，再推到落点松手
      await hold(null);
      if (!s.boxLifted && s.boxX < s.boxThr - 4) {
        await page.keyboard.down("Space");
        await page.waitForTimeout(120);
        await page.keyboard.up("Space");
        continue;
      }
      if (!s.boxLifted) {
        await page.keyboard.press("KeyE");
        await page.waitForTimeout(120);
        continue;
      }
      if (s.boxX < s.boxDrop[0] + 2) {
        await page.keyboard.down("Space");
        await page.waitForFunction((lo) => {
          const g = window.__daily.current;
          return !!g && g.boxX >= lo;
        }, s.boxDrop[0] + 2, { timeout: 4000 }).catch(() => {});
        await page.keyboard.up("Space");
        await page.waitForTimeout(250);
        continue;
      }
      await page.waitForTimeout(120);
      continue;
    }

    // G02：一路往左到楼梯口，走到窗台按 E
    if (s.id === "search" && s.state === "search") {
      if (s.scene !== "stair") { await hold("KeyA"); await page.waitForTimeout(120); continue; }
      await hold(null);
      if (Math.abs(s.x - 300) > 20) {
        await page.keyboard.down(s.x > 300 ? "KeyA" : "KeyD");
        await page.waitForTimeout(140);
        await page.keyboard.up(s.x > 300 ? "KeyA" : "KeyD");
        continue;
      }
      await page.keyboard.press("KeyE");
      await page.waitForTimeout(300);
      continue;
    }

    // G04：俯视球场。没球就追持球人，按 E 打开抢断圈，等护边定下来后用 W/S 打空档；
    // 有球就往远处带，蓄力时按住 W 把球挑高，松手射门。
    if (s.id === "ball_match" && s.state === "play") {
      const toward = (target, dead = 5) => {
        const keys = [];
        if (target.sx < s.me.sx - dead) keys.push("KeyA");
        else if (target.sx > s.me.sx + dead) keys.push("KeyD");
        if (target.sy < s.me.sy - dead) keys.push("KeyW");
        else if (target.sy > s.me.sy + dead) keys.push("KeyS");
        return keys;
      };

      if (s.duel) {
        if (s.duelT < 0.5) { await hold(null); await page.waitForTimeout(80); continue; }
        await hold(null);
        await page.keyboard.press(s.duelGuard === "up" ? "KeyS" : "KeyW");
        await page.waitForTimeout(130);
        continue;
      }
      if (s.stumbleT > 0) { await hold(null); await page.waitForTimeout(60); continue; }

      if (s.holder === "me") {
        if (s.me.d < 0.80) {
          const keys = ["KeyW"];
          if (s.me.x < 0.44) keys.push("KeyD");
          else if (s.me.x > 0.56) keys.push("KeyA");
          await hold(keys);
          await page.waitForTimeout(45);
          continue;
        }
        await hold(null);
        await page.keyboard.down("Space");
        await page.keyboard.down("KeyW");
        await page.waitForTimeout(560);
        await page.keyboard.up("KeyW");
        await page.keyboard.up("Space");
        await page.waitForTimeout(120);
        continue;
      }

      if (s.holder === "yuno" || s.holder === "jurie") {
        if (s.feint) { await hold(null); await page.waitForTimeout(45); continue; }
        const target = s.holder === "yuno" ? s.yuno : s.jurie;
        if (Math.hypot(s.me.sx - target.sx, s.me.sy - target.sy) > 22) {
          await hold(toward(target));
          await page.waitForTimeout(40);
        } else {
          await hold(null);
          await page.keyboard.press("KeyE");
          await page.waitForTimeout(100);
        }
        continue;
      }

      // 球在飞或者滚开：朝球跑，够得着就按 E 捡起来
      if (s.ball) {
        if (Math.hypot(s.me.sx - s.ball.sx, s.me.sy - s.ball.sy) > 20) {
          await hold(toward(s.ball));
          await page.waitForTimeout(45);
        } else {
          await hold(null);
          await page.keyboard.press("KeyE");
          await page.waitForTimeout(110);
        }
        continue;
      }
      await hold(null);
      await page.waitForTimeout(60);
      continue;
    }

    await page.waitForTimeout(150);
  }

  await hold(null);
  const end = await S(page);
  await page.screenshot({ path: path.join(OUT, "p1-playall-end.png") });

  const store = await page.evaluate(() => window.__daily.store());
  const days = await page.evaluate(() => window.__daily.daysShown);
  // 整章的出口：结果卡上要直接通向第三幕收尾。
  const afterLink = await page.evaluate(() => {
    const el = document.getElementById("afterStoryCard");
    return { hidden: el.hidden, href: el.getAttribute("href") };
  });
  const fails = [];
  if (!end.card) fails.push("走到底没有出结果卡（停在这一步：" + JSON.stringify(end) + "）");
  if (end.hub) fails.push("自动时间线走到底后又弹出了单场目录");
  if (afterLink.hidden) fails.push("结果卡上没有通往收尾的入口");
  if (afterLink.href !== "narrative/index.html?phase=after") {
    fails.push("收尾入口指向 " + afterLink.href);
  }
  if (seen.join(",") !== "errand,solo_jurie,search,solo_yuno,word_guess,ball_match") {
    fails.push("经过的日常是 " + seen.join(" → "));
  }
  if (days.join(",") !== "周一,周二,周三,周四,周五,下周一") {
    fails.push("经过的日期卡是 " + days.join(" → "));
  }
  for (const k of ["errandCompleted", "soloJurieCompleted", "searchCompleted",
                   "soloYunoCompleted", "wordGameCompleted", "ballGameCompleted",
                   "chapterDailyDone"]) {
    if (store[k] !== true) fails.push("存档里没有 " + k);
  }
  for (const id of ["errand", "search", "word_guess", "ball_match"]) {
    if (!poked[id]) fails.push("整链路里没有在 " + id + " 按过 F 主动发起");
    else if (!poked[id] || poked[id].indexOf("F") < 0) {
      fails.push(id + " 的 F 胶囊文案不对：" + poked[id]);
    }
  }
  if (errors.length) fails.push(...errors.slice(0, 4));

  console.log(JSON.stringify({ passed: seen, days, poked, card: end.card, afterLink, store, failures: fails }, null, 2));
  console.log(fails.length ? "\n✗ " + fails.length + " 条没过" : "\n✓ 自动时间线「周一 → 周二 → 周三 → 周四 → 周五 → 下周一」走通了");
  await browser.close();
  process.exit(fails.length ? 1 : 0);
})();
