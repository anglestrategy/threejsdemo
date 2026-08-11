/* The look model, measured: a fixed mouse travel must produce a fixed rotation
   regardless of frame rate, and the view must come to rest when the mouse does. */
import { chromium } from 'playwright';
import path from 'path'; import { fileURLToPath } from 'url';
const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const b = await chromium.launch({ args: ['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'] });
const p = await b.newPage({ viewport: { width: 560, height: 320 } });
const errs = []; p.on('pageerror', e => errs.push(String(e).slice(0,200)));
await p.goto('file://' + path.join(ROOT,'living-map-v2.html') + '?scene=city&noveil=1&walk=1', { waitUntil: 'load' });
await p.waitForFunction('window.__ready === true', { timeout: 180000 });
await p.waitForTimeout(1200);
const yaw = () => p.evaluate(() => window.__scenes.city.nav.yaw);
const settle = async () => { await p.waitForTimeout(1400); };
// drag 200 px right, twice, from rest
const drag = async (dx) => {
  await p.mouse.move(280, 160); await p.mouse.down();
  for (let i = 1; i <= 10; i++) await p.mouse.move(280 + dx * i / 10, 160);
  await p.mouse.up();
};
await settle();
const a0 = await yaw(); await drag(200); await settle();
const a1 = await yaw(); await drag(200); await settle();
const a2 = await yaw();
// does it drift after the mouse stops?
const b0 = await yaw(); await p.waitForTimeout(2500); const b1 = await yaw();
console.log(JSON.stringify({
  turn1_deg: +((a1-a0)*180/Math.PI).toFixed(2),
  turn2_deg: +((a2-a1)*180/Math.PI).toFixed(2),
  expected_deg: +(200*0.0023*180/Math.PI).toFixed(2),
  drift_after_2_5s_deg: +((b1-b0)*180/Math.PI).toFixed(4),
  errs,
}, null, 1));
await b.close();
