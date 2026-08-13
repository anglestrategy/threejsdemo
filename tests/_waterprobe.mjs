/* Where is the water, in world space, in the SHIPPING build?
   The port shows a water surface down the souq where this build shows paving,
   and everything else has been ruled out by measurement. This asks the one
   remaining question directly: is the geometry in the same place? */
import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'] });
const p = await b.newPage({ viewport: { width: 420, height: 240 } });
p.on('pageerror', e => console.log('PE', e.message.slice(0, 140)));
await p.goto('http://localhost:8123/?scene=city&shot=3&noveil=1&nolife=1', { waitUntil: 'load' });
await p.waitForFunction('window.__ready === true', null, { timeout: 400000 });
console.log(JSON.stringify(await p.evaluate(() => {
  const c = window.__scenes.city;
  const out = [];
  c.scene.traverse((o) => {
    if (!o.isMesh || !o.material || !o.material.uniforms || !o.material.uniforms.uReflOn) return;
    o.geometry.computeBoundingBox();
    const bb = o.geometry.boundingBox.clone().applyMatrix4(o.matrixWorld);
    const a = o.geometry.getAttribute('aFlow');
    out.push({ visible: o.visible, renderOrder: o.renderOrder,
      transparent: o.material.transparent, depthWrite: o.material.depthWrite,
      yMin: +bb.min.y.toFixed(3), yMax: +bb.max.y.toFixed(3),
      x: [+bb.min.x.toFixed(0), +bb.max.x.toFixed(0)],
      z: [+bb.min.z.toFixed(0), +bb.max.z.toFixed(0)],
      aFlow: a ? { n: a.count, max: +Math.max(...a.array).toFixed(2) } : null,
      /* does this mesh actually have geometry AT the souq, or does its bounding
         box merely reach there? The merged channel spans 390 x 644 m and the
         souq sits inside that box, which is not the same as water being there. */
      nearSouq: (() => {
        const pos = o.geometry.getAttribute('position');
        let n = 0, ylo = 1e9, yhi = -1e9;
        for (let i = 0; i < pos.count; i++) {
          const x = pos.getX(i), z = pos.getZ(i);
          if (Math.abs(x - 4) < 10 && Math.abs(z - 178) < 40) {
            n++; const y = pos.getY(i); if (y < ylo) ylo = y; if (y > yhi) yhi = y;
          }
        }
        return n ? { verts: n, y: [+ylo.toFixed(3), +yhi.toFixed(3)] } : null;
      })() });
  });
  return { water: out, waterAtSouq: c.debug.waterAt ? c.debug.waterAt(4, 178) : 'n/a' };
}), null, 1));
await b.close();
