const path = require('path');
const { chromium } = require(path.resolve(__dirname, '../../game/dust-corridor/node_modules/playwright-core'));
const [f = '03b-tidy.png', k = 3, x = 0, y = 0, out = 'zoom.png'] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch({ channel: 'chrome' });
  const p = await b.newPage({ viewport: { width: 1200, height: 800 } });
  await p.goto(`file:///D:/%E8%A7%A3%E5%86%B3%E5%86%85%E5%88%86%E6%B3%8C%E5%A4%B1%E8%B0%83/pixel-act1/act2/tools/zoom.html?f=${f}&k=${k}&x=${x}&y=${y}`, { waitUntil: 'load' });
  await p.waitForTimeout(350);
  await p.screenshot({ path: path.join(__dirname, 'out', out) });
  await b.close();
  console.log('ok');
})();
