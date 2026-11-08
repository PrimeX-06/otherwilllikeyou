/**
 * 全流程入口的衔接检查。
 *
 * 只查三件容易断掉的事：
 *   1. 根目录 index.html 是一个真正的开始页，能从第一幕一路播到最新；
 *   2. 「开始完整故事」会清掉各幕存档，避免校园日常跳过已经做过的日期；
 *   3. 「继续上次」按本机进度指向校园日常 / 收尾，收尾的「回到开头」能跳出 storyframe。
 *
 * 各幕自己的玩法由 act5/tools/check.cjs、act5/narrative/tools/check.cjs 和
 * game/dust-corridor/tools/story-chain-check.mjs 检查；这里只验接缝。
 */
const { chromium } = require("../game/dust-corridor/node_modules/playwright-core");
const { pathToFileURL } = require("node:url");
const path = require("node:path");
const fs = require("node:fs");

const ROOT = path.resolve(__dirname, "..");
const indexUrl = pathToFileURL(path.join(ROOT, "index.html")).href;
const read = (file) => fs.readFileSync(path.join(ROOT, file), "utf8");

(async () => {
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const failures = [];
  const fail = (message) => failures.push(message);

  try {
    await page.goto(indexUrl);
    await page.evaluate(() => localStorage.clear());
    await page.reload();

    const title = await page.locator("h1").textContent();
    if (!title.includes("我们的故事")) fail(`开始页标题是 ${title}`);
    if (await page.locator("#resume").isVisible()) fail("没有进度时也显示了「继续上次」");
    if (!(await page.locator("#start").isVisible())) fail("开始页没有「开始完整故事」");

    // 开始完整故事：清掉全部存档，进入第一幕
    await page.evaluate(() => {
      localStorage.setItem("our-story-act5-daily-v1", JSON.stringify({ errandCompleted: true }));
      localStorage.setItem("our-story-act3-broadcast-v1", JSON.stringify({ best: 3 }));
    });
    await page.click("#start");
    await page.waitForURL(/prototype\.html/, { timeout: 10000 });
    const left = await page.evaluate(() => ({
      daily: localStorage.getItem("our-story-act5-daily-v1"),
      act3: localStorage.getItem("our-story-act3-broadcast-v1")
    }));
    if (left.daily !== null || left.act3 !== null) fail("开始完整故事没有清掉旧存档");

    // 只做了一点日常：继续上次应该回到校园日常
    await page.goto(indexUrl);
    await page.evaluate(() => localStorage.setItem(
      "our-story-act5-daily-v1", JSON.stringify({ errandCompleted: true })));
    await page.reload();
    if (await page.locator("#resume").evaluate((node) => node.hidden)) fail("有日常进度时没有「继续上次」");
    let resumeHref = await page.locator("#resume").getAttribute("href");
    if (resumeHref !== "act5/daily.html") fail(`日常进度指向 ${resumeHref}`);

    // 六个日常做完：继续上次应该进收尾
    await page.evaluate(() => localStorage.setItem(
      "our-story-act5-daily-v1",
      JSON.stringify({
        errandCompleted: true, soloJurieCompleted: true, searchCompleted: true,
        soloYunoCompleted: true, wordGameCompleted: true, ballGameCompleted: true
      })));
    await page.reload();
    resumeHref = await page.locator("#resume").getAttribute("href");
    if (resumeHref !== "act5/narrative/index.html?phase=after") fail(`六个日常之后指向 ${resumeHref}`);

    // 已经看过最新收尾：继续上次改成重看收尾
    await page.evaluate(() => localStorage.setItem(
      "our-story-act5-narrative-v1", JSON.stringify({ disclosureHeard: true })));
    await page.reload();
    const resumeText = await page.locator("#resume").textContent();
    if (!resumeText.includes("重看收尾")) fail(`看到收尾之后按钮是「${resumeText}」`);

    // 接缝的静态检查
    const narrative = read("act5/narrative/story.js");
    if (!narrative.includes('"../../index.html", "回到开头"')) fail("收尾没有回到根目录开始页");
    if (!narrative.includes("{ top: true }")) fail("收尾的回到开头没有指定跳出 storyframe");
    if (!read("act4/after-broadcast/index.html").includes("../../act5/narrative/index.html")) {
      fail("第四幕没有接入第三幕剧情");
    }
    if (!read("act5/daily.html").includes("narrative/index.html?phase=after")) {
      fail("校园日常没有接入收尾");
    }
    if (errors.length) fail(...errors);
  } finally {
    await browser.close();
  }

  if (failures.length) {
    console.error("FAILED:");
    for (const message of failures) console.error(" -", message);
    process.exitCode = 1;
    return;
  }
  console.log(JSON.stringify({ ok: true }));
})().catch((error) => { console.error(error); process.exitCode = 1; });
