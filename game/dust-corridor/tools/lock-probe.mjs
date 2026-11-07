import { chromium } from 'playwright';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 800, height: 600 } });
await page.setContent(`<body style="margin:0"><canvas id="c" style="width:100vw;height:100vh;background:#123"></canvas>
<script>window.locked=null;document.addEventListener('pointerlockchange',()=>{window.locked=!!document.pointerLockElement});</script></body>`);
await page.mouse.click(400, 300);
await page.evaluate(() => document.getElementById('c').requestPointerLock());
await page.waitForTimeout(800);
console.log('standalone lock =', await page.evaluate(() => window.locked));
// same thing, but inside a file:// iframe
const fs = await import('node:fs');
fs.writeFileSync('shots/lock-child.html', `<body style="margin:0"><canvas id="c" style="width:100vw;height:100vh;background:#321"></canvas>
<script>window.locked=null;document.addEventListener('pointerlockchange',()=>{window.locked=!!document.pointerLockElement});</script></body>`);
fs.writeFileSync('shots/lock-parent.html', `<body style="margin:0"><iframe src="lock-child.html" style="width:800px;height:600px;border:0"></iframe></body>`);
const p2 = await browser.newPage({ viewport: { width: 800, height: 600 } });
await p2.goto('file:///' + process.cwd().replace(/\\/g, '/') + '/shots/lock-parent.html');
await p2.waitForTimeout(500);
await p2.mouse.click(400, 300);
const f = p2.frames()[1];
await f.evaluate(() => document.getElementById('c').requestPointerLock());
await p2.waitForTimeout(800);
console.log('iframe lock =', await f.evaluate(() => window.locked));
await browser.close();
