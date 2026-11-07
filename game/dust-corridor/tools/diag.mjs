import { chromium } from '@playwright/test';
const b = await chromium.launch({ channel: 'chrome' });
const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
p.on('console', m => { const t = m.text(); if (t.includes('X3595')) return; console.log('[c]', m.type(), t.slice(0, 200)); });
p.on('pageerror', e => console.log('[err]', e.message.slice(0, 300)));
p.on('requestfailed', r => console.log('[fail]', r.url().slice(-50), r.failure()?.errorText));
await p.goto('http://localhost:5199/?auto=1&dynres=0&nomb', { waitUntil: 'load' });
for (let i = 0; i < 8; i++) {
  await p.waitForTimeout(4000);
  console.log((i+1)*4, JSON.stringify(await p.evaluate(() => ({
    ready: window.__ready,
    step: document.querySelector('#loading')?.textContent?.slice(0, 40) ?? null
  }))));
}
await b.close();
