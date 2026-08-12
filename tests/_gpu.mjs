import { chromium } from 'playwright';
const b = await chromium.launch({ args: ['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--enable-unsafe-webgpu'] });
const p = await b.newPage({ viewport: { width: 800, height: 460 } });
const bad = [], msgs = [];
p.on('response', r => { if (r.status() >= 400) bad.push(r.status() + ' ' + r.url()); });
p.on('pageerror', e => msgs.push('PAGEERROR: ' + (e.stack || e.message).slice(0, 400)));
await p.goto('http://localhost:8123/gpuprobe.html' + (process.argv[2] || '') + '', { waitUntil: 'load', timeout: 120000 });
try { await p.waitForFunction('window.__ready === true', null, { timeout: 90000 }); } catch (e) { msgs.push('NEVER READY'); }
const pr = await p.evaluate(() => window.__probe || null);
console.log(JSON.stringify({ bad, probe: pr, msgs }, null, 1).slice(0, 2200));
await b.close();
