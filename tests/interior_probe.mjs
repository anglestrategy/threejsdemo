import { chromium } from 'playwright';
import path from 'path';
const ROOT = '/home/user/threejsdemo';
const b = await chromium.launch({ args: ['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'] });
const p = await b.newPage({ viewport: { width: 640, height: 400 } });
p.on('pageerror', e => console.log('ERR', e.message));
await p.goto('file://' + path.join(ROOT, 'living-map-v2.html') + '?shop=0&shopd=3.6', { waitUntil: 'load', timeout: 240000 });
await p.waitForFunction('window.__ready === true', { timeout: 240000 });
await p.waitForTimeout(3000);
console.log(JSON.stringify(await p.evaluate(() => {
  const C = window.__scenes.city;
  const shops = C.shops().filter(s => s.fitted);
  const s = shops[0];
  const sc = C.scene, THREE = window.__three;
  const cam = C.cam;
  // where is the floor instance nearest this shop?
  let floorMesh = null;
  sc.traverse(o => { if (o.isInstancedMesh && o.name === 'i_shopfloor') floorMesh = o; });
  const out = { shop: { trade: s.trade, x: +s.x.toFixed(2), y: +s.y.toFixed(2), z: +s.z.toFixed(2),
                        angDeg: +(s.ang * 180 / Math.PI).toFixed(1), w: +s.w.toFixed(2), h: +s.h.toFixed(2), d: s.d },
                cam: cam.position.toArray().map(v => +v.toFixed(2)) };
  if (floorMesh) {
    const m = new (floorMesh.instanceMatrix.constructor === Object ? Object : window.Object)();
    const M = floorMesh.instanceMatrix.array;
    let best = 1e9, bi = -1;
    for (let i = 0; i < floorMesh.count; i++) {
      const x = M[i*16+12], z = M[i*16+14];
      const d = (x - s.x) ** 2 + (z - s.z) ** 2;
      if (d < best) { best = d; bi = i; }
    }
    out.nearestFloor = { i: bi, dist: +Math.sqrt(best).toFixed(3),
      x: +M[bi*16+12].toFixed(2), y: +M[bi*16+13].toFixed(2), z: +M[bi*16+14].toFixed(2) };
    out.floorCount = floorMesh.count;
    out.floorVisible = floorMesh.visible;
    out.floorMat = floorMesh.material.type + ' key=' + (floorMesh.material.customProgramCacheKey ? floorMesh.material.customProgramCacheKey() : '?');
    out.roomAdd = floorMesh.material.userData.u ? floorMesh.material.userData.u.uRoomAdd.value.toArray().map(v=>+v.toFixed(2)) : null;
  }
  // is the camera outside the building (i.e. did we aim right)?
  out.camInsideSolid = C.debug.insideSolid(cam.position.x, cam.position.z, cam.position.y - 1.5);
  out.shopInsideSolid = C.debug.insideSolid(s.x, s.z, s.y);
  return out;
}), null, 1));
await b.close();
