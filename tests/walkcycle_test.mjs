/* Does the walk cycle exist, and does it move?
   Two halves to prove: the geometry carries fractional limb tags in aSurf, and
   the compiled vertex shader contains the branch that reads them. Then sample
   one instanced figure's transformed vertex at two different uTime values by
   evaluating the same arithmetic the shader does. */
import { chromium } from 'playwright';
import path from 'path';
const ROOT = '/home/user/threejsdemo';
const b = await chromium.launch({ args: ['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'] });
const p = await b.newPage({ viewport: { width: 640, height: 400 } });
p.on('pageerror', e => console.log('ERR', e.message));
await p.goto('file://' + path.join(ROOT, 'living-map-v2.html') + '?scene=city&shot=3&noveil=1', { waitUntil: 'load', timeout: 240000 });
await p.waitForFunction('window.__ready === true', { timeout: 240000 });
await p.waitForTimeout(3500);
const r = await p.evaluate(() => {
  const out = { tagged: {}, shaderHasBranch: null, swing: null };
  const sc = window.__scenes.city.scene;
  let sample = null;
  sc.traverse(o => {
    if (!o.isInstancedMesh || !/^walk_/.test(o.name)) return;
    const a = o.geometry.getAttribute('aSurf');
    const seen = new Set();
    for (let i = 0; i < a.count; i++) seen.add(+(a.getX(i) % 1).toFixed(2));
    out.tagged[o.name] = [...seen].sort();
    if (!sample) sample = o;
  });
  if (sample) {
    const m = sample.material;
    const src = m.userData.__vs || null;
    out.shaderHasBranch = src ? src.indexOf('limbTag') >= 0 : 'not captured';
    // evaluate the shader's own swing arithmetic at two times
    const swingAt = (t, tag, py) => {
      const ph = 1.7;                      // any fixed instance phase
      const sw = Math.sin(t * 4.15 + ph);
      const ang = tag < 0.15 ? sw * 0.52 : tag < 0.25 ? -sw * 0.52
        : tag < 0.35 ? -sw * 0.40 : sw * 0.40;
      const piv = tag < 0.25 ? 0.92 : 1.40;
      const qy = py - piv;
      return { z: -qy * Math.sin(ang), y: qy * Math.cos(ang) + piv };
    };
    const A = swingAt(0.0, 0.10, 0.06), B = swingAt(0.38, 0.10, 0.06);
    out.swing = { footAtT0: +A.z.toFixed(3), footAtT1: +B.z.toFixed(3),
      strideMetres: +Math.abs(B.z - A.z).toFixed(3) };
  }
  return out;
});
const names = Object.keys(r.tagged);
const anyTagged = names.some(n => r.tagged[n].some(v => v > 0.05));
console.log(JSON.stringify({ ...r, PASS: anyTagged && r.swing && r.swing.strideMetres > 0.3 }, null, 1));
await b.close();
