/* Dump the generated fragment shader for one panel, so a TSL question can be
   answered by reading the code the builder actually emitted instead of by
   inferring it from pixel brightness. */
import { chromium } from 'playwright';
import fs from 'fs';
const b = await chromium.launch({ executablePath: process.env.PW_CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'] });
const p = await b.newPage({ viewport: { width: 640, height: 400 } });
p.on('pageerror', e => console.log('PAGEERR', (e.stack||e.message).slice(0,600)));
await p.goto('http://localhost:8123/gpuprobe.html?' + (process.argv[3] || 'forcegl=1&panels=1'), { waitUntil: 'load' });
await p.waitForFunction('window.__ready === true', null, { timeout: 120000 });
const src = await p.evaluate(async () => {
  const r = window.__rn, s = window.__sc, c = window.__cam;
  const mesh = s.children.find(o => o.isMesh && o.geometry.attributes.aSurf);
  const sh = await r.debug.getShaderAsync(s, c, mesh);
  return sh.fragmentShader;
});
fs.writeFileSync(process.argv[2] || 'shots/frag.glsl', src);
console.log('wrote', process.argv[2], src.length, 'chars');
await b.close();
