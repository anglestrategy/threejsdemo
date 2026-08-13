/* The judgement gate.
   node tests/sidebyside.mjs [shot] [--w 1000] [--h 560]

   Renders one district bookmark from BOTH builds at the same pose and stacks
   them into a single PNG, WebGL2 above and WebGPU/TSL below, each labelled.

   Why a composite rather than two files: the whole criterion for this port is
   "is it better", and that is a comparison a human makes in one glance. Two
   PNGs in a folder get looked at one after the other, and everything except a
   category error survives that.

   The two builds share the seed default (20260811) and the pose comes from the
   same `SHOTS` table, so anything that differs in the frame is the renderer.
   If the two ever show different geometry, that is a bug in the seam and not a
   rendering difference — check the seed and the shot id first.
*/
import { execFileSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { PNG } = require('pngjs');

const args = process.argv.slice(2);
const shot = +(args.find(a => /^\d+$/.test(a)) || 3);
const opt = (k, d) => { const i = args.indexOf('--' + k); return i >= 0 ? args[i + 1] : d; };
const W = +opt('w', 900), H = +opt('h', 500);
const FRAMES = +opt('frames', 3);

const RUNS = [
  ['WebGL2  (shipping)', 'webgl2', 'shot_' + shot + '_webgl2',
    `scene=city&shot=${shot}&noveil=1&nolife=1`, 'http://localhost:8123/'],
  ['WebGPU / TSL (port)', 'webgpu', 'shot_' + shot + '_webgpu',
    `shot=${shot}&forcegl=1&nolife=1&frames=${FRAMES}`, 'http://localhost:8123/gpuapp.html'],
];

const imgs = [];
for (const [label, , tag, query, base] of RUNS) {
  let raw = '';
  try {
    raw = execFileSync('node', ['shot.mjs', tag, query, '--w', String(W), '--h', String(H),
      '--wait', '900', '--base', base], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  } catch (e) { raw = String(e.stdout || '') + String(e.stderr || ''); }
  let note = '';
  try {
    const j = JSON.parse(raw);
    const errs = (j.errors || []).filter(s =>
      !/willReadFrequently|favicon|404 \(File|queueSerial|Clock: This module/.test(s));
    note = (j.stats ? `${j.stats.calls || '?'} calls  ${Math.round((j.stats.tris || 0) / 1e6)}M tris  ` : '')
      + (errs.length ? errs.length + ' error(s)' : 'clean');
  } catch { note = 'shot.mjs produced no json'; }
  console.log(label.padEnd(22), note);
  imgs.push({ label, note, png: PNG.sync.read(readFileSync('shots/' + tag + '.png')) });
}

/* stacked, with a 2 px rule between: a vertical split keeps both frames at
   full width, and width is where the district's detail lives */
const GAP = 3;
const out = new PNG({ width: W, height: H * 2 + GAP });
out.data.fill(20);
for (let i = 0; i < imgs.length; i++) {
  const src = imgs[i].png, dy = i * (H + GAP);
  for (let y = 0; y < Math.min(H, src.height); y++) {
    src.data.copy(out.data, ((dy + y) * W) << 2, (y * src.width) << 2,
      ((y * src.width) + Math.min(W, src.width)) << 2);
  }
}
const dest = `shots/sbs_shot${shot}.png`;
writeFileSync(dest, PNG.sync.write(out));
console.log('wrote', dest, `(${W}x${H * 2 + GAP}) — WebGL2 top, WebGPU bottom`);
