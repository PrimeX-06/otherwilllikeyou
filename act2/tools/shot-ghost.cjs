/** 只截 ghost-preview.html：改完 makeGhost / 换画稿用它快速看效果。 */
const path = require('path');
const fs = require('fs');
const { chromium } = require(path.resolve(__dirname, '../../game/dust-corridor/node_modules/playwright-core'));
const URL = 'file:///D:/%E8%A7%A3%E5%86%B3%E5%86%85%E5%88%86%E6%B3%8C%E5%A4%B1%E8%B0%83/pixel-act1/act2/tools/ghost-preview.html';
(async () => {
  const b = await chromium.launch({ channel: 'chrome' });
  const p = await b.newPage({ viewport: { width: 1120, height: 700 } });
  const err = [];
  p.on('pageerror', (e) => err.push(e.message));
  await p.goto(URL, { waitUntil: 'load' });
  await p.waitForTimeout(900);
  // 直接读画布，不走 page.screenshot：那玩意儿在一直重绘的页面上会卡住
  const b64 = await p.evaluate(() => document.getElementById('c').toDataURL('image/png').split(',')[1]);
  fs.writeFileSync(path.join(__dirname, 'out', 'ghost-only.png'), Buffer.from(b64, 'base64'));
  await b.close();
  console.log(err.length ? err.join('\n') : 'ok');
})();
