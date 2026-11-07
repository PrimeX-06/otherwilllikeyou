/* 第三幕 · 晚间广播 — 演示截图
 *
 * 按真实流程走一遍，但用 _seek 直接跳到要看的段落——
 * 不然拍完十张图要等三分钟，而且每次截图那两三秒里谱面还在走，
 * 拍到的都是「刚好漏了两个音符」的瞬间。
 *
 * 用法：node act3/tools/shots.cjs
 * 输出：act3/tools/out/d1..d9-*.png
 */
const path = require("path");
const { chromium } = require(path.resolve(__dirname, "../../game/dust-corridor/node_modules/playwright-core"));

const OUT = path.join(__dirname, "out");
const PAGE = "file:///" + path.join(__dirname, "../broadcast.html").replace(/\\/g, "/") + "?fresh=1";

(async () => {
  const browser = await chromium.launch({
    channel: "chrome",
    args: ["--autoplay-policy=no-user-gesture-required"]
  });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
  page.on("console", (m) => { if (m.type() === "error") errors.push("console: " + m.text()); });

  const shot = async (name) => {
    await page.screenshot({ path: path.join(OUT, name) });
    console.log("  →", name);
  };

  await page.goto(PAGE, { waitUntil: "load", timeout: 60000 });
  await page.waitForFunction(() => window.__bc && window.__bc.state, null, { timeout: 30000 });

  // 1. 她刚走进来，两个人坐在桌前
  await page.waitForTimeout(2600);
  await shot("d1-intro.png");

  // 2. 推完开场对白 → 试音
  for (let i = 0; i < 40; i++) {
    const st = await page.evaluate(() => window.__bc.state().state);
    if (st !== "intro") break;
    await page.keyboard.press("KeyE");
    await page.waitForTimeout(70);
  }
  await page.waitForTimeout(1500);
  await shot("d2-check.png");

  // 3. 进演奏
  await page.evaluate(() => window.__bc._finishCheck());
  await page.waitForFunction(() => window.__bc.state().state === "play", null, { timeout: 15000 });

  // 自动弹（这样后面的截图里音符是被接住的，不是一片 MISS）
  await page.evaluate(() => {
    window.__auto = { on: true, skipRelay: false };
    let hold = null;
    (function tick() {
      if (!window.__auto.on) return;
      const bc = window.__bc;
      if (bc.state().state === "play") {
        const t = bc.audio.songTime();
        if (hold && t >= hold.until) { bc.release(); hold = null; }
        for (const n of bc.rhythm.mine) {
          if (n.judged) continue;
          if (n.time - t > 0.06) break;
          if (window.__auto.skipRelay && n.type === "relay") continue;
          bc.press();
          if (n.type === "hold") hold = { until: n.time + n.dur };
        }
      }
      requestAnimationFrame(tick);
    })();
  });

  // 4. 开场：她先念，你只看
  await page.evaluate(() => window.__bc._seek(5.5));
  await page.waitForTimeout(900);
  await shot("d3-hers.png");

  // 5. 第一次接力：她的音落完，蓝轨上出现一个带桥的接力音符
  //    这里要停在音符**还没被判定**的瞬间（18.75s 落线），
  //    否则拍到的是一行 MISS 和一圈空环，接力音符本身反而看不见。
  //    不能用固定 waitForTimeout：截图本身要花上百毫秒，差一点就拍过了，
  //    所以直接盯 songTime。
  await page.evaluate(() => { window.__auto.skipRelay = true; window.__bc._seek(17.35); });
  await page.waitForFunction(() => window.__bc.audio.songTime() >= 17.95, null, { timeout: 5000 });
  await shot("d4-relay.png");

  // 6. 漏接 → 她补位（不写字，只有粉轨上那道扫光和她的音色）
  await page.waitForFunction(() => window.__bc.state().rescues >= 1, null, { timeout: 9000 })
    .catch(() => { });
  await page.waitForTimeout(650);
  await shot("d5-cover.png");

  // 7. 正文中段：两条轨道来回
  await page.evaluate(() => { window.__auto.skipRelay = false; window.__bc._seek(78.8); });
  await page.waitForTimeout(1100);
  await shot("d6-mid.png");

  // 8. 点歌那一段
  await page.evaluate(() => window.__bc._seek(92.5));
  await page.waitForTimeout(1100);
  await shot("d7-songs.png");

  // 9. 密集接力
  await page.evaluate(() => window.__bc._seek(137.5));
  await page.waitForTimeout(1100);
  await shot("d8-dense.png");

  // 10. 收尾：最后一句两条轨道同一点落下
  await page.evaluate(() => window.__bc._seek(167.4));
  await page.waitForTimeout(1400);
  await shot("d9-last.png");

  // 11. 灯灭，镜头推近她
  await page.evaluate(() => window.__bc._seek(169.2));
  await page.waitForFunction(() => window.__bc.state().state === "finale", null, { timeout: 12000 })
    .catch(() => { });
  await page.waitForTimeout(2100);
  await shot("d10-finale.png");

  // 12. 完成卡
  for (let i = 0; i < 24; i++) {
    const shown = await page.evaluate(() => document.getElementById("card").classList.contains("show"));
    if (shown) break;
    await page.keyboard.press("KeyE");
    await page.waitForTimeout(260);
  }
  await page.waitForTimeout(600);
  await shot("d11-card.png");

  const st = await page.evaluate(() => window.__bc.state());
  console.log("最终状态:", JSON.stringify({ state: st.state, score: st.score, counts: st.counts, rescues: st.rescues }));
  console.log("errors:", errors.slice(0, 5));
  await browser.close();
})();
