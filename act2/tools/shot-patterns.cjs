const path = require('path');
const { chromium } = require(path.resolve(__dirname, '../../game/dust-corridor/node_modules/playwright-core'));
const PAGE = 'file:///D:/%E8%A7%A3%E5%86%B3%E5%86%85%E5%88%86%E6%B3%8C%E5%A4%B1%E8%B0%83/pixel-act1/act2/tools/patterns-preview.html';
(async () => {
  const b = await chromium.launch({ channel: 'chrome' });
  const p = await b.newPage({ viewport: { width: 1180, height: 760 } });
  const err = [];
  p.on('pageerror', (e) => err.push(e.message));
  await p.goto(PAGE, { waitUntil: 'load' });
  await p.waitForTimeout(400);
  await p.screenshot({ path: path.join(__dirname, 'out', 'pats.png'), fullPage: true });
  await b.close();
  console.log(err.length ? err.join('\n') : 'ok');
})();
