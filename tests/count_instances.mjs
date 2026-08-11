import { chromium } from 'playwright';
import path from 'path';
const ROOT = '/home/user/threejsdemo';
const b = await chromium.launch({ args: ['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'] });
const p = await b.newPage({ viewport: { width: 900, height: 500 } });
p.on('pageerror', e => console.log('ERR', e.message));
await p.goto('file://' + path.join(ROOT, 'living-map-v2.html') + '?scene=city&shot=6&noveil=1', { waitUntil: 'load', timeout: 180000 });
await p.waitForFunction('window.__ready === true', { timeout: 180000 });
await p.waitForTimeout(4000);
const r = await p.evaluate(() => {
  const out = [];
  const s = window.__scenes && window.__scenes.city && window.__scenes.city.scene;
  s && s.traverse(o => {
    if (o.isInstancedMesh) out.push([o.name || '?', o.count, o.geometry.index ? o.geometry.index.count / 3 : o.geometry.attributes.position.count / 3]);
  });
  return { n: out.length, tot: out.reduce((a,b)=>a+b[1]*b[2],0), insts: out, stats: window.__stats ? window.__stats() : null };
});
r.insts.sort((a,b)=>b[1]*b[2]-a[1]*a[2]);
console.log('total instanced tris', r.tot, 'in', r.n, 'meshes');
for (const [n,c,t] of r.insts) console.log((n+'            ').slice(0,14), String(c).padStart(6), String(t).padStart(6), String(Math.round(c*t/1000)).padStart(7)+'k');
await b.close();
