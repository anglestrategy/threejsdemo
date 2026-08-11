import { chromium } from 'playwright';
import path from 'path'; import { fileURLToPath } from 'url';
const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const b = await chromium.launch({ args: ['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'] });
const p = await b.newPage({ viewport: { width: 420, height: 260 } });
await p.goto('file://' + path.join(ROOT,'living-map-v2.html') + '?scene=city&noveil=1&walk=1', { waitUntil: 'load' });
await p.waitForFunction('window.__ready === true', { timeout: 180000 });
const res = await p.evaluate(() => {
  const d = window.__scenes.city.debug;
  let tested = 0, stuck = 0, walkedWater = 0;
  const bad = [];
  // a walker takes a 0.5 m step from every point on a 4 m lattice over the
  // whole plan, in eight directions; the resolved landing must never be
  // inside a building
  for (let x = -460; x <= 460; x += 4) {
    for (let z = -240; z <= 690; z += 4) {
      const g = d.groundAt(x, z);
      if (d.insideSolid(x, z, g)) continue;           // start points inside are not walkable anyway
      for (let a = 0; a < 8; a++) {
        const ang = a / 8 * Math.PI * 2;
        const nx = x + Math.cos(ang) * 0.6, nz = z + Math.sin(ang) * 0.6;
        const r = d.resolve(nx, nz, 0.42, g);
        tested++;
        if (d.insideSolid(r[0], r[1], g)) { stuck++; if (bad.length < 5) bad.push([+r[0].toFixed(1), +r[1].toFixed(1)]); }
      }
    }
  }
  return { tested, stuck, bad, colliders: d.colliders(), platforms: d.platforms() };
});
console.log(JSON.stringify(res, null, 1));
await b.close();
