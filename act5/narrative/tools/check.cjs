const { chromium } = require("../../../game/dust-corridor/node_modules/playwright-core");
const { pathToFileURL } = require("node:url");
const path = require("node:path");
const fs = require("node:fs");

(async () => {
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const base = pathToFileURL(path.join(__dirname, "..", "index.html")).href;
  const at = (name) => page.waitForFunction((value) => window.__narrative?.scene === value, name, { timeout: 20000 });
  const shot = (name) => page.screenshot({ path: path.join(__dirname, name + ".png") });
  async function read(count) {
    for (let i = 0; i < count; i++) {
      await page.keyboard.press("KeyE");
      await page.waitForTimeout(35);
      await page.keyboard.press("KeyE");
      await page.waitForTimeout(35);
    }
  }
  // 按 E 一直走到指定场景。散场中间隔着两张过门 CG，不能只数台词。
  async function advanceUntil(name, max = 140) {
    for (let i = 0; i < max; i++) {
      if (await page.evaluate((value) => window.__narrative?.scene === value, name)) return;
      await page.keyboard.press("KeyE");
      await page.waitForTimeout(45);
    }
    await at(name);
  }
  async function advanceUntilCg(part, max = 140) {
    for (let i = 0; i < max; i++) {
      const on = await page.evaluate((value) => {
        const node = document.getElementById("cg");
        return !node.hidden && node.getAttribute("src").includes(value);
      }, part);
      if (on) return;
      await page.keyboard.press("KeyE");
      await page.waitForTimeout(45);
    }
    throw new Error("没有等到过场图 " + part);
  }
  async function advanceUntilProp(key, max = 60) {
    for (let i = 0; i < max; i++) {
      if (await page.evaluate((value) => window.__narrative?.prop?.key === value, key)) return;
      await page.keyboard.press("KeyE");
      await page.waitForTimeout(45);
    }
    throw new Error("没有等到道具 " + key);
  }
  async function calm(failFirst = false, keyboard = false) {
    await page.waitForFunction(() => window.__narrative?.emotion?.active, null, { timeout: 5000 });
    const box = await page.locator("#heartGame").boundingBox();
    const atPoint = (x,y) => ({x:box.x+x*box.width/640,y:box.y+y*box.height/300});
    if (failFirst) {
      await page.mouse.move(...Object.values(atPoint(190,153)));
      await page.mouse.down();
      await page.mouse.move(...Object.values(atPoint(245,153)));
      await page.mouse.up();
      await page.waitForFunction(() => window.__narrative.emotion.attempts === 1, null, { timeout: 5000 });
    }
    if (keyboard) {
      for (let i = 0; i < 7; i++) await page.keyboard.press("ArrowLeft");
    } else {
      await page.mouse.move(...Object.values(atPoint(190,153)));
      await page.mouse.down();
      await page.mouse.move(...Object.values(atPoint(105,153)));
    }
    await page.waitForFunction(() => Math.sin(window.__narrative.emotion.phase) < -.5, null, { timeout: 6000 });
    if (keyboard) await page.keyboard.press("Space"); else await page.mouse.up();
    await page.waitForFunction(() => !window.__narrative.emotion.active, null, { timeout: 6000 });
  }
  try {
    await page.goto(base);
    await at("nextDay");
    await read(2);
    await at("greeting");
    await read(2);
    await at("emotion");
    await shot("01-heart-before");
    if (await page.locator("#emotion").evaluate((node) => node.hidden)) throw new Error("第一次见面没有心绪演出");
    await calm(true);
    await at("normalTalk");
    await read(5);
    await at("ordinaryDays");
    await read(2);
    await at("meetingAgain");
    await read(3);
    await calm(false, true);
    await read(1);
    await at("friendIntro");
    await shot("02-yuno-intro");
    await read(7);
    await page.waitForFunction(() => !document.getElementById("choice").hidden);
    await page.locator("#choiceItems button").first().click();
    await read(3);
    await read(1);
    await at("end");
    const intro = await page.evaluate(() => window.__narrative.save);
    if (!intro.introCompleted || !intro.metYuno || !intro.firstRegulated) throw new Error("前半剧情事件没有保存");
    await shot("03-intro-end");

    await page.goto(base + "?phase=after");
    await at("afterActivities");
    if (await page.locator("#cg").evaluate((node) => node.hidden)) {
      throw new Error("散场开头没有接上球赛散场图");
    }
    const fieldCg = await page.locator("#cg").getAttribute("src");
    if (!fieldCg || !fieldCg.includes("story_g04_exit")) {
      throw new Error("散场过场图不是球赛结束、收东西那张");
    }
    await shot("04a-field-after");
    await advanceUntilCg("story_g04_to_corridor");
    await shot("04b-corridor-exit");
    await advanceUntil("reveal");
    if (await page.evaluate(() => window.__narrative.actors.girl !== null)) {
      throw new Error("朱里没有先离开，由乃和和臣没有单独说话的条件");
    }
    await page.waitForFunction(() => window.__narrative.prop?.key === "notebookOpen", null, { timeout: 5000 });
    await shot("04c-notebook");
    await advanceUntilProp("notebook");
    await shot("04d-notebook-closed");
    await advanceUntil("quiet");
    await shot("04-quiet-heart");
    if ((await page.locator("#emotion").getAttribute("data-kind")) !== "quiet") throw new Error("消息后误用了脸红效果");
    await calm();
    await page.waitForFunction(() => !document.getElementById("choice").hidden);
    await page.locator("#choiceItems button").first().click();
    for (let i = 0; i < 30; i++) {
      const line = await page.evaluate(() => document.getElementById("line").textContent);
      if (line.includes("明天帮我还给她")) break;
      await page.keyboard.press("KeyE");
      await page.waitForTimeout(45);
    }
    await shot("04e-handoff");
    await advanceUntil("end");
    const notebook = await page.evaluate(() => window.__narrative.prop);
    if (!notebook || notebook.key !== "notebook" || notebook.x > 240) throw new Error("本子没有递到和臣手里");
    const ending = await page.evaluate(() => window.__narrative.save);
    if (!ending.disclosureHeard || ending.likedPersonKnown !== false || ending.disclosureReply !== "asked") throw new Error("客观消息与未知对象的存档不正确");
    const endCard = await page.evaluate(() => {
      const link = document.getElementById("next");
      return {
        text: link.textContent,
        href: link.getAttribute("href"),
        target: link.getAttribute("target")
      };
    });
    if (endCard.text !== "回到开头") throw new Error("收尾最后没有回到开头的入口");
    if (!endCard.href || !endCard.href.endsWith("index.html")) throw new Error("收尾没有回到根目录开始页：" + endCard.href);
    if (endCard.target !== "_top") throw new Error("收尾的回到开头没有跳出 storyframe");
    await shot("05-end.png");

    const act4 = path.join(__dirname, "..", "..", "..", "act4", "after-broadcast", "index.html");
    if (!fs.readFileSync(act4, "utf8").includes("../../act5/narrative/index.html")) throw new Error("第四幕没有接入心绪剧情");
    const daily = pathToFileURL(path.join(__dirname, "..", "..", "daily.html")).href + "?hub=1";
    await page.goto(daily);
    await page.waitForFunction(() => window.__daily?.events?.length === 6 && document.querySelectorAll("#hubList li").length === 6);
    if (!(await page.locator("#afterStoryHub").evaluate((node) => node.hidden))) throw new Error("未完成日常时提前显示收尾入口");
    await page.evaluate(() => localStorage.setItem("our-story-act5-daily-v1", JSON.stringify({ errandCompleted: true, soloJurieCompleted: true, searchCompleted: true, soloYunoCompleted: true, wordGameCompleted: true, ballGameCompleted: true })));
    await page.reload();
    await page.waitForFunction(() => window.__daily?.events?.length === 6 && document.querySelectorAll("#hubList li").length === 6);
    if (await page.locator("#afterStoryHub").evaluate((node) => node.hidden)) throw new Error("分别完成六个日常后没有收尾入口");
    if (errors.length) throw new Error(errors.join("\n"));
    console.log(JSON.stringify({ ok: true, intro, ending, endCard }));
  } finally { await browser.close(); }
})().catch((error) => { console.error(error); process.exitCode = 1; });
