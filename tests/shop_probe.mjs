import { chromium } from 'playwright';
import path from 'path';
const ROOT = '/home/user/threejsdemo';
const b = await chromium.launch({ args: ['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'] });
const p = await b.newPage({ viewport: { width: 700, height: 400 } });
p.on('pageerror', e => console.log('ERR', e.message));
await p.goto('file://' + path.join(ROOT, 'living-map-v2.html') + '?scene=city&shot=3&noveil=1', { waitUntil: 'load', timeout: 180000 });
await p.waitForFunction('window.__ready === true', { timeout: 180000 });
await p.waitForTimeout(3000);
const r = await p.evaluate(() => {
  const s = window.__scenes.city.shops();
  const byTrade = {};
  for (const x of s) byTrade[x.trade] = (byTrade[x.trade] || 0) + 1;
  // the ones nearest the souq bookmark, with a camera pose that faces each
  const near = s.map(o => ({ ...o, d: Math.hypot(o.x - 4, o.z - 178) }))
    .sort((a, b) => a.d - b.d).slice(0, 10)
    .map(o => ({ trade: o.trade, d: +o.d.toFixed(1),
      cam: [ +(o.x - Math.sin(o.ang) * 4.2).toFixed(2), 1.62, +(o.z - Math.cos(o.ang) * 4.2).toFixed(2),
             +(o.ang * 180 / Math.PI).toFixed(1), 2 ] }));
  return { total: s.length, byTrade, near };
});
console.log(JSON.stringify(r, null, 1));
await b.close();
