/* 第三幕 · 校园日常 — 「按顺序开始」整条链路的自动通关
 *
 * 自检（check.cjs）是逐个事件进目录点的，不经过 playAll。
 * 而玩家最可能走的是「按顺序开始」：周一 → 周三 → 周五 → 下周一，中间夹着三段串场对白。
 * 这条路上任何一个环节卡住（面板没关、fade 停在 1、场景没换），
 * 逐事件测试都发现不了。这个脚本只干一件事：把那条路走到底，看能不能出结果卡。
 *
 * 用法：node act5/tools/playall.cjs
 * 截图：act5/tools/out/p1-playall-end.png
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
    dlg: window.DAILY.dialogOpen(),
    wg: !document.getElementById("wg").hidden,
    card: document.getElementById("card").classList.contains("show"),
    hub: document.getElementById("hub").classList.contains("show"),
    // G04 用得到：球在谁脚下、飞向谁、还有多少毫秒到脚边
    phase: g && g.phase,
    holder: g && g.holder,
    to: g && g.to,
    arrival: g && g.arrivalIn,
    rally: g && g.rally
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

  await page.click("#hubStart");

  const seen = [];
  const t0 = Date.now();
  let holding = null;

  const hold = async (key) => {
    if (holding === key) return;
    if (holding) await page.keyboard.up(holding);
    holding = key;
    if (key) await page.keyboard.down(key);
  };

  while (Date.now() - t0 < 180000) {
    const s = await S(page);

    if (s.id && seen[seen.length - 1] !== s.id) seen.push(s.id);

    if (s.card) break;

    // 对白一律按 E 推进
    if (s.dlg) { await hold(null); await page.keyboard.press("KeyE"); await page.waitForTimeout(90); continue; }

    // 猜词：轮到玩家就点正确选项
    if (s.wg) {
      await hold(null);
      if (s.state === "ask") {
        await page.evaluate(() => {
          const b = document.querySelectorAll("#wgOpts button")[0];
          if (b) b.click();
        });
      }
      await page.waitForTimeout(300);
      continue;
    }

    // G01：一路往左，到护栏走廊的箱子前按 E
    if (s.id === "errand" && s.state === "walk") {
      if (s.scene !== "railing") { await hold("KeyA"); await page.waitForTimeout(120); continue; }
      await hold(null);
      if (Math.abs(s.x - 176) > 30) {
        await page.keyboard.down(s.x > 176 ? "KeyA" : "KeyD");
        await page.waitForTimeout(160);
        await page.keyboard.up(s.x > 176 ? "KeyA" : "KeyD");
        continue;
      }
      await page.keyboard.press("KeyE");
      await page.waitForTimeout(300);
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

    // G04：球到脚边按空格接，拿到球轻传出去。力度按住 300ms 就够，
    // 按久了传太重，她停不住，球会滚开（那是设计好的，不是卡关）。
    if (s.id === "ball_pass" && s.state === "play") {
      await hold(null);
      if (s.phase === "flying" && s.to === "boy" && s.arrival != null &&
          s.arrival <= 40 && s.arrival > -220) {
        await page.keyboard.press("Space");
        await page.waitForTimeout(20);
        continue;
      }
      if (s.phase === "held" && s.holder === "boy") {
        await page.keyboard.down("Space");
        await page.waitForTimeout(300);
        await page.keyboard.up("Space");
        await page.waitForTimeout(60);
        continue;
      }
      await page.waitForTimeout(35);
      continue;
    }

    await page.waitForTimeout(150);
  }

  await hold(null);
  const end = await S(page);
  await page.screenshot({ path: path.join(OUT, "p1-playall-end.png") });

  const store = await page.evaluate(() => window.__daily.store());
  const fails = [];
  if (!end.card) fails.push("走到底没有出结果卡（停在这一步：" + JSON.stringify(end) + "）");
  if (seen.join(",") !== "errand,search,word_guess,ball_pass") fails.push("经过的小游戏是 " + seen.join(" → "));
  for (const k of ["errandCompleted", "searchCompleted", "wordGameCompleted",
                   "ballGameCompleted", "chapterDailyDone"]) {
    if (store[k] !== true) fails.push("存档里没有 " + k);
  }
  if (errors.length) fails.push(...errors.slice(0, 4));

  console.log(JSON.stringify({ passed: seen, card: end.card, store, failures: fails }, null, 2));
  console.log(fails.length ? "\n✗ " + fails.length + " 条没过" : "\n✓ 「按顺序开始」走通了");
  await browser.close();
  process.exit(fails.length ? 1 : 0);
})();
