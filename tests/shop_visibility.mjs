/* Can you actually see into the shops? For a sample of fitted rooms, stand
   where a person would and raycast down the centreline. A room you can see
   into returns its first interior hit well past the glass; a room buried in
   the building's mass returns something solid at the opening. */
import { chromium } from 'playwright';
import path from 'path';
const b = await chromium.launch({ args: ['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'] });
const p = await b.newPage({ viewport: { width: 640, height: 400 } });
p.on('pageerror', e => console.log('ERR', e.message));
await p.goto('http://localhost:8123/' + '?scene=city&shot=3&noveil=1', { waitUntil: 'load', timeout: 240000 });
await p.waitForFunction('window.__ready === true', null, { timeout: 300000 });
await p.waitForTimeout(3000);
const r = await p.evaluate(() => {
  const T = window.__three, C = window.__scenes.city;
  const list = C.shops().filter(o => o.fitted);
  const step = Math.max(1, Math.floor(list.length / 90));
  const res = { n: 0, open: 0, blocked: 0, byTrade: {}, examples: [] };
  const rc = new T.Raycaster();
  for (let i = 0; i < list.length; i += step) {
    const s = list[i];
    const sn = Math.sin(s.ang), cs = Math.cos(s.ang);
    // off the centreline: the shopfront's own mullion stands dead centre, so a
    // centred ray measures the frame rather than whether you can see past it
    const ax = cs * s.w * 0.26, az = -sn * s.w * 0.26;
    const o = new T.Vector3(s.x - sn * 3.4 + ax, s.y + 1.35, s.z - cs * 3.4 + az);
    const d = new T.Vector3(sn, -0.02, cs).normalize();
    rc.set(o, d); rc.near = 0.05; rc.far = 22;
    const hits = rc.intersectObject(C.scene, true);
    // the deepest thing we can see: how far past the glass does the ray get
    // before it meets something opaque?
    let depth = 0, who = null;
    for (const h of hits) {
      const k = h.object.material.customProgramCacheKey ? String(h.object.material.customProgramCacheKey()) : '';
      if (k.indexOf('onBeforeCompile') >= 0) continue;       // glass and emissives
      depth = h.distance - 3.35;
      const dx = h.point.x - s.x, dz = h.point.z - s.z;
      who = { key: k, name: h.object.name || h.object.type,
        across: +(dx * cs - dz * sn).toFixed(2), into: +(dx * sn + dz * cs).toFixed(2),
        up: +(h.point.y - s.y).toFixed(2),
        n: h.face ? { across: +(h.face.normal.x * cs - h.face.normal.z * sn).toFixed(2),
                      into: +(h.face.normal.x * sn + h.face.normal.z * cs).toFixed(2),
                      up: +h.face.normal.y.toFixed(2) } : null };
      break;
    }
    res.n++;
    const ok = depth > 0.85;
    if (ok) res.open++; else res.blocked++;
    const t = res.byTrade[s.trade] || (res.byTrade[s.trade] = { open: 0, n: 0 });
    t.n++; if (ok) t.open++;
    if (!ok && res.examples.length < 8) res.examples.push({ i, trade: s.trade, depth: +depth.toFixed(2), who });
  }
  return res;
});
r.PASS = r.open / r.n > 0.8;
console.log(JSON.stringify(r, null, 1));
await b.close();
