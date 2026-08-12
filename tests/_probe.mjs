import { chromium } from 'playwright';
const b = await chromium.launch({ args: ['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'] });
const p = await b.newPage({ viewport: { width: 600, height: 400 } });
const msgs = [];
p.on('console', m => msgs.push(m.type()+': '+m.text()));
p.on('pageerror', e => msgs.push('PAGEERROR: ' + (e.stack||e.message)));
await p.goto('http://localhost:8123/?scene=city&nolife=1', { waitUntil: 'load', timeout: 300000 });
try { await p.waitForFunction('window.__ready === true', null, { timeout: 300000 }); } catch(e){ msgs.push('NEVER READY'); }
const n = await p.evaluate(() => { const o={}; const s=window.__scenes&&window.__scenes.city&&window.__scenes.city.scene;
  s&&s.traverse(x=>{ if(x.name&&x.name.startsWith('p:')) o[x.name]=x.count; }); return o; });
console.log(JSON.stringify({ props: n, msgs: msgs.slice(0,14) }, null, 1));
await b.close();
