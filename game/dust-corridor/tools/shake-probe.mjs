/**
 * How much does the view move while she is playing?
 *
 * Samples yaw/pitch every animation frame and separates the slow part (turning
 * onto a target) from the fast part (wobble, recoil, ADS pumping). A camera
 * that is being shaken has a large fast part; a camera that is merely turning
 * has almost none.
 */
import { launch, waitReady } from './browser.mjs';

const browser = await launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
await page.goto('http://localhost:5199/?auto=1&dynres=0&nomb', { waitUntil: 'load' });
await waitReady(page);

const data = await page.evaluate(async () => {
  const h = window.__harness;
  const g = window.__game;
  h.control.stopStory();
  h.control.set('SISTER_AI');
  await h.wait(4);            // let her pick a fight

  const rows = [];
  const t0 = performance.now();
  await new Promise((done) => {
    const tick = () => {
      const p = g.player;
      rows.push({
        t: (performance.now() - t0) / 1000,
        yaw: p.yaw, pitch: p.pitch,
        ads: p.adsBlend, alive: p.alive,
        y: p.position.y,
        speed: p.speedNorm ?? 0
      });
      if (performance.now() - t0 > 7000) done();
      else requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
  return { rows, sister: h.control.sister() };
});

const r = data.rows;
// Unwrap first: the yaw is kept in (-pi, pi], so a turn across the seam reads
// as a 360-degree jump and poisons every statistic downstream.
for (let i = 1; i < r.length; i++) {
  let d = r[i].yaw - r[i - 1].yaw;
  if (d > Math.PI) d -= Math.PI * 2;
  if (d < -Math.PI) d += Math.PI * 2;
  r[i].yaw = r[i - 1].yaw + d;
}
const dy = [];
for (let i = 1; i < r.length; i++) dy.push(r[i].yaw - r[i - 1].yaw);

// Slow part: a third of a second of turning, which is what a deliberate turn
// looks like; the fast part is the wobble riding on top of it.
const win = Math.max(2, Math.round(r.length / (r[r.length - 1].t * 3) / 2));
const fast = dy.map((d, i) => {
  let s = 0, n = 0;
  for (let k = Math.max(0, i - win); k <= Math.min(dy.length - 1, i + win); k++) { s += dy[k]; n++; }
  return d - s / n;
});
const mean = (a) => a.reduce((x, y) => x + y, 0) / (a.length || 1);
const rms = (a) => Math.sqrt(mean(a.map((x) => x * x)));
let flips = 0;
for (let i = 1; i < fast.length; i++) if (Math.sign(fast[i]) !== Math.sign(fast[i - 1]) && Math.abs(fast[i]) > 1e-5) flips++;

console.log(JSON.stringify({
  frames: r.length,
  seconds: +(r[r.length - 1].t).toFixed(2),
  fps: Math.round(r.length / r[r.length - 1].t),
  yawRangeDeg: +((Math.max(...r.map((x) => x.yaw)) - Math.min(...r.map((x) => x.yaw))) * 180 / Math.PI).toFixed(1),
  pitchRangeDeg: +((Math.max(...r.map((x) => x.pitch)) - Math.min(...r.map((x) => x.pitch))) * 180 / Math.PI).toFixed(1),
  meanStepDeg: +(mean(dy) * 180 / Math.PI).toFixed(3),
  fastRmsDeg: +(rms(fast) * 180 / Math.PI).toFixed(3),
  fastPeakDeg: +(Math.max(...fast.map(Math.abs)) * 180 / Math.PI).toFixed(3),
  reversalsPerSec: +(flips / (r[r.length - 1].t)).toFixed(1),
  adsFlips: r.reduce((n, x, i) => n + (i && (x.ads > 0.5) !== (r[i - 1].ads > 0.5) ? 1 : 0), 0),
  speedMean: +mean(r.map((x) => x.speed)).toFixed(2),
  sister: data.sister
}, null, 2));

// a short trace of the fast part, in degrees, to read the shape
console.log('fast trace (deg, every 3rd frame):');
console.log(fast.filter((_, i) => i % 3 === 0).slice(0, 60)
  .map((x) => (x * 180 / Math.PI).toFixed(2)).join(' '));

await browser.close();
