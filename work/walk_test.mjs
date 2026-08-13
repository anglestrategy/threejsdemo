import { chromium } from 'playwright';
import path from 'path'; import { fileURLToPath } from 'url';
const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const b = await chromium.launch({ args: ['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'] });
const p = await b.newPage({ viewport: { width: 520, height: 300 } });
const errs = []; p.on('pageerror', e => errs.push(String(e).slice(0,200)));
await p.goto('file://' + path.join(ROOT,'living-map-v2.html') + '?scene=city&noveil=1&walk=1&cam=4,1.68,140,0,0', { waitUntil: 'load' });
await p.waitForFunction('window.__ready === true', { timeout: 180000 });
await p.waitForTimeout(1200);
// drive the whole spine, then turn and cross the district
const samples = [];
const run = async (keys, ms) => {
  for (const k of keys) await p.keyboard.down(k);
  const t0 = Date.now();
  while (Date.now() - t0 < ms) {
    await p.waitForTimeout(220);
    samples.push(await p.evaluate(() => {
      const n = window.__scenes.city.nav, d = window.__scenes.city.debug;
      return { x: +n.pos.x.toFixed(2), y: +n.pos.y.toFixed(2), z: +n.pos.z.toFixed(2),
        inside: d.insideSolid(n.pos.x, n.pos.z, n.pos.y - 1.68),
        water: d.waterAt(n.pos.x, n.pos.z), g: +d.groundAt(n.pos.x, n.pos.z, n.pos.y - 1.68).toFixed(2) };
    }));
  }
  for (const k of keys) await p.keyboard.up(k);
};
await run(['KeyW','ShiftLeft'], 22000);              // north up the spine
await p.evaluate(() => { window.__scenes.city.nav.yaw = Math.PI/2; });
await run(['KeyW','ShiftLeft'], 16000);              // east across the district
await p.evaluate(() => { window.__scenes.city.nav.yaw = -Math.PI/2; });
await run(['KeyW','ShiftLeft'], 20000);              // west across the water
const bad = samples.filter(s => s.inside);
const floating = samples.filter(s => Math.abs(s.y - s.g - 1.68) > 0.9);
console.log(JSON.stringify({
  samples: samples.length,
  insideBuilding: bad.length, insideExamples: bad.slice(0,4),
  floating: floating.length, floatExamples: floating.slice(0,4),
  span: [samples[0], samples[samples.length-1]],
  colliders: await p.evaluate(() => window.__scenes.city.debug.colliders()),
  errs,
}, null, 1));
await b.close();
