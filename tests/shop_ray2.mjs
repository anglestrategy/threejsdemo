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
  const list = C.shops().filter(o => o.fitted);
  const s = list[+(new URLSearchParams(location.search).get('shop') || 0) % list.length];
  const cam = C.cam;
  const dir = new T.Vector3(); cam.getWorldDirection(dir);
  const sn = Math.sin(s.ang), cs = Math.cos(s.ang);
  const local = (pt) => {
    const dx = pt.x - s.x, dz = pt.z - s.z;
    return { across: +(dx * cs - dz * sn).toFixed(2), into: +(dx * sn + dz * cs).toFixed(2), up: +(pt.y - s.y).toFixed(2) };
  };
  const rc = new T.Raycaster(cam.position.clone(), dir, 0.05, 24);
  const hits = rc.intersectObject(C.scene, true).slice(0, 5).map(h => ({
    d: +h.distance.toFixed(2), local: local(h.point),
    name: h.object.name || h.object.type,
    key: h.object.material.customProgramCacheKey ? String(h.object.material.customProgramCacheKey()) : h.object.material.type,
  }));
  return { trade: s.trade, w: +s.w.toFixed(2), h: +s.h.toFixed(2), D: s.d,
           camLocal: local(cam.position), hits };
}), null, 1));
await b.close();
