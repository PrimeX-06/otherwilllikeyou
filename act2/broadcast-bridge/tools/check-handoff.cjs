const { chromium } = require("../../../game/dust-corridor/node_modules/playwright-core");
const { pathToFileURL } = require("node:url");
const path = require("node:path");
const fs = require("node:fs");

(async () => {
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const url = pathToFileURL(path.join(__dirname, "..", "index.html")).href;
  const output = path.join(__dirname, "handoff-preview.png");
  try {
    await page.goto(url);
    await page.waitForFunction(() => window.__broadcastBridge?.scene !== "loading");
    await page.evaluate(() => {
      window.__broadcastBridge.enter("ready");
      window.__broadcastBridge.enter("girlHandoff");
    });
    await page.waitForTimeout(250);
    if (await page.evaluate(() => window.__broadcastBridge.scene) !== "girlHandoff") throw new Error("稿纸交接姿态未显示");
    fs.mkdirSync(path.dirname(output), { recursive: true });
    await page.screenshot({ path: output });
    await page.waitForFunction(() => window.__broadcastBridge.scene === "girlSit");
    if (errors.length) throw new Error(errors.join("\n"));
    console.log(JSON.stringify({ ok: true, screenshot: output }));
  } finally {
    await browser.close();
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });
