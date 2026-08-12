/* What is actually in front of a shopfront? Raycast from the shop camera and
   name the first three things the ray meets. */
import { chromium } from 'playwright';
import path from 'path';
const which = process.argv[2] || '0';
const b = await chromium.launch({ args: ['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'] });
const p = await b.newPage({ viewport: { width: 640, height: 400 } });
p.on('pageerror', e => console.log('ERR', e.message));
await p.goto('http://localhost:8123/' + '?shop=' + which + '&shopd=3.4', { waitUntil: 'load', timeout: 240000 });
await p.waitForFunction('window.__ready === true', null, { timeout: 300000 });
await p.waitForTimeout(3000);
console.log(JSON.stringify(await p.evaluate(() => {
  const T = window.__three, C = window.__scenes.city;
  const s = C.shops().filter(o => o.fitted)[+(new URLSearchParams(location.search).get('shop') || 0) % C.shops().filter(o => o.fitted).length];
  const cam = C.cam;
  const dir = new T.Vector3(); cam.getWorldDirection(dir);
  const rc = new T.Raycaster(cam.position.clone(), dir, 0.05, 20);
  rc.firstHitOnly = false;
  const hits = rc.intersectObject(C.scene, true).slice(0, 6).map(h => ({
    d: +h.distance.toFixed(2),
    name: h.object.name || (h.object.isInstancedMesh ? 'inst?' : h.object.type),
    inst: h.instanceId === undefined ? null : h.instanceId,
    key: h.object.material.customProgramCacheKey ? h.object.material.customProgramCacheKey() : h.object.material.type,
  }));
  return { trade: s.trade, shop: [+s.x.toFixed(1), +s.y.toFixed(1), +s.z.toFixed(1)], angDeg: +(s.ang*180/Math.PI).toFixed(0), hits };
}), null, 1));
await b.close();
