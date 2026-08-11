#!/usr/bin/env python3
"""Emit work/modelview.html — a turntable contact sheet for work/models.json.

The reducer throws away 99% of a photogrammetry tree. Whether what is left
still reads as a tree is not a number, so this renders every model on the same
dusk key as the district, from three angles, at the scale the district uses.
"""
import base64
import json
import sys

MODS = json.load(open('src/vendor_mods.json'))
LOADER = open('work/GLTFLoader_patched.js').read()
MODELS = json.load(open('work/models.json'))


def uri(b64):
    return 'data:text/javascript;base64,' + b64


MAP = {'three': uri(MODS['three']), 'three-core': uri(MODS['three-core']),
       'addons/GLTFLoader.js': uri(base64.b64encode(LOADER.encode()).decode())}

html = """<!doctype html><html><head><meta charset="utf-8"><title>models</title>
<style>html,body{margin:0;background:#14161d;overflow:hidden}canvas{display:block}
#l{position:fixed;left:0;top:0;color:#cfd6e4;font:11px monospace;padding:6px;z-index:9}</style>
<script type="importmap">%s</script></head><body><div id="l"></div>
<script type="module">
import * as THREE from 'three';
import { GLTFLoader } from 'addons/GLTFLoader.js';
const MODELS = %s;
const W = innerWidth, H = innerHeight;
const rn = new THREE.WebGLRenderer({ antialias: true });
rn.setPixelRatio(1); rn.setSize(W, H);
rn.shadowMap.enabled = true; rn.shadowMap.type = THREE.PCFSoftShadowMap;
rn.toneMapping = THREE.ACESFilmicToneMapping; rn.toneMappingExposure = 1.0;
document.body.appendChild(rn.domElement);
const sc = new THREE.Scene();
sc.background = new THREE.Color(0x2a3140);
const sun = new THREE.DirectionalLight(0xffd9a8, 2.6);
sun.position.set(-9, 5, -2); sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
const c = sun.shadow.camera; c.left = -8; c.right = 8; c.top = 8; c.bottom = -8; c.far = 40;
sc.add(sun);
sc.add(new THREE.HemisphereLight(0x8fb4e8, 0x6b5136, 0.85));
const fill = new THREE.DirectionalLight(0x9dc0f0, 0.45); fill.position.set(6, 3, 7); sc.add(fill);
const gm = new THREE.Mesh(new THREE.PlaneGeometry(200, 200),
  new THREE.MeshStandardMaterial({ color: 0x6d6153, roughness: 0.95 }));
gm.rotation.x = -Math.PI / 2; gm.receiveShadow = true; sc.add(gm);
const cam = new THREE.PerspectiveCamera(32, W / H, 0.05, 200);
const loader = new GLTFLoader();
const names = Object.keys(MODELS);
let only0 = (location.search.match(/only=([a-z0-9_]+)/) || [])[1];
let x = 0, span = 0; const info = [];
for (const n of names) {
  const g = await loader.parseAsync(
    Uint8Array.from(atob(MODELS[n].glb), s => s.charCodeAt(0)).buffer, '');
  const root = g.scene.children.find(o => o.name === 'LOD0') || g.scene;
  root.position.set(0, 0, 0);
  let tris = 0, mats = new Set();
  root.traverse(o => {
    if (!o.isMesh) return;
    o.castShadow = o.receiveShadow = true;
    tris += o.geometry.index.count / 3; mats.add(o.material.name);
    o.material.side = THREE.DoubleSide;
  });
  const bb = new THREE.Box3().setFromObject(root);
  root.position.set(x - bb.min.x, -bb.min.y, -(bb.min.z + bb.max.z) / 2);
  x += (bb.max.x - bb.min.x) + 1.2;
  span = Math.max(span, bb.max.y - bb.min.y);
  root.userData.mn = n;
  sc.add(root);
  info.push(n + '  ' + Math.round(tris) + ' tris  ' +
    (bb.max.y - bb.min.y).toFixed(2) + ' m  [' + [...mats].join(', ') + ']');
}
document.getElementById('l').innerHTML = info.join('<br>');
const view = +((location.search.match(/view=(\\d)/) || [])[1] || 0);
const only = (location.search.match(/only=([a-z0-9_]+)/) || [])[1];
if (only) {
  for (const ch of [...sc.children]) if (ch.userData.mn && ch.userData.mn.indexOf(only) < 0) sc.remove(ch);
  const keep = sc.children.find(o => o.userData.mn);
  if (keep) { const b = new THREE.Box3().setFromObject(keep);
    keep.position.x -= (b.min.x + b.max.x) / 2; x = 0.001; span = b.max.y - b.min.y; }
}
const ang = [0, 1.2, 0.35][view] || 0;
const cx = (x - 1.2) / 2, d = Math.max(x, span * 2.4) * (view === 2 ? 0.28 : 0.82);
cam.position.set(cx + Math.sin(ang) * d, span * (view === 2 ? 0.30 : 0.52), Math.cos(ang) * d);
cam.lookAt(cx * (view === 2 ? 0.16 : 1), span * (view === 2 ? 0.30 : 0.44), 0);
if (view === 2) { cam.position.x = 0; cam.fov = 40; cam.updateProjectionMatrix(); }
let f = 0; window.__frames = 0;
(function loop() { requestAnimationFrame(loop); rn.render(sc, cam); window.__frames++; f++;
  if (f === 3) window.__ready = true; })();
</script></body></html>
""" % (json.dumps({'imports': MAP}),
       json.dumps({k: {'glb': v['glb']} for k, v in MODELS.items()}))

open('work/modelview.html', 'w').write(html)
print('work/modelview.html %d KB' % (len(html) // 1024))
