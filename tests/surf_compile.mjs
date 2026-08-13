/* Surface-law compile gate.
   node tests/surf_compile.mjs

   Lifts SURF_GLSL straight out of src/district.js and compiles it on a real
   WebGL2 context, wrapped in the smallest fragment shader that calls every
   entry point in it. Ten seconds, and it catches the whole class of error the
   district gate cannot reach in under ten MINUTES: a typo in the law compiles
   to a black scene that looks exactly like every other black scene.

   It also PROBES the law rather than only compiling it: the same fragment is
   evaluated at a series of pixel footprints and the results read back, so the
   band-limiting can be asserted rather than admired. The assertion that
   matters is the one at the top of the file — as the footprint grows past a
   feature, the VARIANCE of the law across neighbouring samples must fall to
   nothing. That is what "does not alias" means, and it is measurable. */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
// argv[2] lets the same gate be pointed at an older copy of district.js, which
// is how the before/after of the band-limiting was measured rather than argued
const src = fs.readFileSync(process.argv[2] || path.join(ROOT, 'src/district.js'), 'utf8');
const m = src.match(/const SURF_GLSL = `([\s\S]*?)\n`;/);
if (!m) { console.error('could not find SURF_GLSL in src/district.js'); process.exit(2); }
const SURF = m[1];

/* twelve classes x eight footprints, laid out as a 12 x 8 grid of tiles. Each
   tile evaluates the law over a small patch of world at a fixed footprint and
   returns the mean and the spread across the patch. */
const CLASSES = 12, STEPS = 8;
const FOOT = [0.0005, 0.002, 0.008, 0.03, 0.09, 0.25, 0.7, 2.0];

const page = await (await chromium.launch({
  executablePath: process.env.PW_CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
})).newPage();

const out = await page.evaluate(({ SURF, CLASSES, STEPS, FOOT }) => {
  const cv = document.createElement('canvas');
  cv.width = CLASSES * 16; cv.height = STEPS;
  const gl = cv.getContext('webgl2', { antialias: false, preserveDrawingBuffer: true });
  if (!gl) return { err: 'no webgl2' };

  const vs = `#version 300 es
    in vec2 a; void main(){ gl_Position = vec4(a, 0.0, 1.0); }`;
  const fs = `#version 300 es
    precision highp float;
    out vec4 o;
    uniform float uFoot[${STEPS}];
    uniform vec2 uGrid;
${SURF}
    void main() {
      float cls = floor(gl_FragCoord.x / 16.0);
      float sub  = mod(gl_FragCoord.x, 16.0);          // 16 samples across the tile
      int   step = int(gl_FragCoord.y);
      gFPa = uFoot[step];
      gFPg = gFPa * 0.62;          // a 2.6:1 footprint, as a grazing wall has
      /* march the sample point by one footprint each column: neighbouring
         columns are neighbouring PIXELS, so the spread across them is exactly
         the aliasing the filter is supposed to remove */
      vec2 q = vec2(3.17, 1.93) + vec2(sub, sub * 0.37) * gFPa;
      float cav, grain;
      float h = srfH(q, cls, cav, grain);
      o = vec4(h, cav, grain, 1.0);
    }`;

  const mk = (t, s) => { const x = gl.createShader(t); gl.shaderSource(x, s); gl.compileShader(x);
    if (!gl.getShaderParameter(x, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(x)); return x; };
  let prog;
  try {
    prog = gl.createProgram();
    gl.attachShader(prog, mk(gl.VERTEX_SHADER, vs));
    gl.attachShader(prog, mk(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog));
  } catch (e) { return { err: String(e.message || e) }; }

  gl.useProgram(prog);
  gl.uniform1fv(gl.getUniformLocation(prog, 'uFoot'), new Float32Array(FOOT));
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  gl.viewport(0, 0, cv.width, cv.height);
  gl.drawArrays(gl.TRIANGLES, 0, 3);

  const px = new Uint8Array(cv.width * cv.height * 4);
  gl.readPixels(0, 0, cv.width, cv.height, gl.RGBA, gl.UNSIGNED_BYTE, px);

  /* per (class, footprint): the peak-to-peak spread of the height across the
     16 neighbouring samples, in 0..255 */
  const rows = [];
  for (let c = 0; c < CLASSES; c++) {
    const r = [];
    for (let s = 0; s < STEPS; s++) {
      let lo = 255, hi = 0;
      for (let i = 0; i < 16; i++) {
        const v = px[((s * cv.width) + c * 16 + i) * 4];
        if (v < lo) lo = v; if (v > hi) hi = v;
      }
      r.push(hi - lo);
    }
    rows.push(r);
  }
  return { rows };
}, { SURF, CLASSES, STEPS, FOOT });

await page.context().browser().close();

if (out.err) { console.error('COMPILE FAILED\n' + out.err); process.exit(1); }

const NAME = ['ashlar', 'render', 'brick', 'timber', 'travertine', 'concrete',
  'metal', 'paving', 'sand', 'asphalt', 'fabric', 'foliage'];
console.log('peak-to-peak height across 16 neighbouring pixels, 0-255');
console.log('class'.padEnd(12) + FOOT.map((f) => (f * 1000 + 'mm').padStart(8)).join(''));
const fails = [];
for (let c = 0; c < NAME.length; c++) {
  const r = out.rows[c];
  console.log(NAME[c].padEnd(12) + r.map((v) => String(v).padStart(8)).join(''));
  /* the gate: by the widest footprint every class must be flat. 6/255 is two
     per cent, which is below what any display or any eye resolves. */
  if (r[FOOT.length - 1] > 6) fails.push({ class: NAME[c], spread: r[FOOT.length - 1] });
  // and it must be MONOTONE-ish: the last reading must not exceed the first
  if (r[FOOT.length - 1] > r[0] + 2) fails.push({ class: NAME[c], grew: [r[0], r[r.length - 1]] });
}
console.log('\n' + JSON.stringify({ fails, PASS: fails.length === 0 }, null, 1));
process.exit(fails.length ? 1 : 0);
