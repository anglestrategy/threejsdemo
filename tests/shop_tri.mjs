import { chromium } from 'playwright';
import path from 'path';
const b = await chromium.launch({
  executablePath: process.env.PW_CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'] });
const p = await b.newPage({ viewport: { width: 640, height: 400 } });
p.on('pageerror', e => console.log('ERR', e.message));
await p.goto('http://localhost:8123/' + '?scene=city&shot=3&noveil=1', { waitUntil: 'load', timeout: 240000 });
await p.waitForFunction('window.__ready === true', null, { timeout: 300000 });
await p.waitForTimeout(3000);
console.log(JSON.stringify(await p.evaluate(() => {
  const T = window.__three, C = window.__scenes.city;
  const list = C.shops().filter(o => o.fitted);
  const rc = new T.Raycaster();
  for (const s of list) {
    const sn = Math.sin(s.ang), cs = Math.cos(s.ang);
    const ax = cs * s.w * 0.26, az = -sn * s.w * 0.26;
    rc.set(new T.Vector3(s.x - sn * 3.4 + ax, s.y + 1.35, s.z - cs * 3.4 + az),
           new T.Vector3(sn, -0.02, cs).normalize());
    rc.near = 0.05; rc.far = 22;
    for (const h of rc.intersectObject(C.scene, true)) {
      const k = h.object.material.customProgramCacheKey ? String(h.object.material.customProgramCacheKey()) : '';
      if (k.indexOf('onBeforeCompile') >= 0) continue;
      if (k !== 'citysurfroom' || h.distance - 3.35 > 0.85) break;
      // dump the triangle in the room's own frame
      const g = h.object.geometry, pos = g.attributes.position, idx = g.index;
      const tri = [h.a, h.b, h.c].map(i => {
        const X = pos.getX(i), Y = pos.getY(i), Z = pos.getZ(i);
        const dx = X - s.x, dz = Z - s.z;
        return { across: +(dx * cs - dz * sn).toFixed(2), into: +(dx * sn + dz * cs).toFixed(2), up: +(Y - s.y).toFixed(2) };
      });
      return { trade: s.trade, w: +s.w.toFixed(2), h: +s.h.toFixed(2), D: s.d,
               shopAngDeg: +(s.ang * 180 / Math.PI).toFixed(0), tri,
               meshTris: idx ? idx.count / 3 : 0 };
    }
  }
  return { none: true };
}), null, 1));
await b.close();
