/* Bisect for the black-panel fault.
   node tests/_bisect.mjs

   Samples the PNG shot.mjs writes rather than reading the canvas back. The
   first version used ctx.drawImage on the WebGL canvas and got zeros for every
   sample INCLUDING the tram, which demonstrably renders — a WebGL drawing
   buffer is not readable after compositing, and WebGPURenderer's WebGL2
   backend does not honour preserveDrawingBuffer. That measurement was invalid,
   so it proved nothing about the material; this one is read off the same
   image a human would look at. */
import { execFileSync } from 'child_process';
import { readFileSync } from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { PNG } = (() => { try { return require('pngjs'); } catch { return {}; } })();

const CASES = [['baseline', ''], ['1 flatColor', '&c=1'], ['2 fixedClass', '&s=1'],
  ['3 noOutput', '&o=1'], ['all three', '&c=1&s=1&o=1']];

for (const [name, q] of CASES) {
  const tag = 'bisect_' + name.split(' ')[0];
  execFileSync('node', ['shot.mjs', tag, 'forcegl=1&panels=1' + q,
    '--w', '900', '--h', '500', '--wait', '2000',
    '--base', 'http://localhost:8123/gpuprobe.html'], { stdio: 'ignore' });
  if (!PNG) { console.log(name.padEnd(14), 'wrote shots/' + tag + '.png (install pngjs to auto-sample)'); continue; }
  const img = PNG.sync.read(readFileSync('shots/' + tag + '.png'));
  const y = Math.floor(img.height * 0.42);
  const out = [];
  for (let i = 0; i < 11; i++) {
    const x = Math.floor(img.width * (0.09 + i * 0.082));
    const o = (img.width * y + x) << 2;
    out.push(Math.round((img.data[o] + img.data[o + 1] + img.data[o + 2]) / 3));
  }
  console.log(name.padEnd(14), JSON.stringify(out));
}
