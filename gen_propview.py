#!/usr/bin/env python3
"""Emit dist/props.html — a contact sheet for the generated props.

Meshy normalises every asset into the same two-metre box and picks its own
facing, so the only way to know what a prop actually is, which way it points
and where its floor sits is to stand them all in a row on the same ground.
"""
import json
import os

INDEX = json.load(open('work/props.json'))
imports = {k.replace('/', '__') + ('' if k.endswith('.js') else '.js'): 1
           for k in json.load(open('src/vendor_mods.json')).keys()}
MAP = {k: './vendor/' + k.replace('/', '__') + ('' if k.endswith('.js') else '.js')
       for k in json.load(open('src/vendor_mods.json')).keys()}

html = """<!doctype html><html><head><meta charset="utf-8"><title>props</title>
<style>html,body{margin:0;background:#20242e;overflow:hidden}canvas{display:block}
#l{position:fixed;left:0;top:0;color:#cfd6e4;font:11px/1.5 monospace;padding:6px;z-index:9;
text-shadow:0 1px 2px #000}</style>
<script type="importmap">%s</script></head><body><div id="l"></div>
<script type="module">
import * as THREE from 'three';
import { GLTFLoader } from 'addons/GLTFLoader.js';
import { MeshoptDecoder } from 'addons/meshopt_decoder.js';
const INDEX = %s;
const W = innerWidth, H = innerHeight;
const rn = new THREE.WebGLRenderer({ antialias: true });
rn.setPixelRatio(1); rn.setSize(W, H);
rn.shadowMap.enabled = true; rn.shadowMap.type = THREE.PCFSoftShadowMap;
rn.toneMapping = THREE.ACESFilmicToneMapping; rn.toneMappingExposure = 1.0;
document.body.appendChild(rn.domElement);
const sc = new THREE.Scene();
sc.background = new THREE.Color(0x2a3140);
const sun = new THREE.DirectionalLight(0xffd9a8, 2.4);
sun.position.set(-9, 6, 4); sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
const c = sun.shadow.camera; c.left = -40; c.right = 40; c.top = 20; c.bottom = -20; c.far = 90;
sc.add(sun); sc.add(new THREE.HemisphereLight(0x8fb4e8, 0x6b5136, 0.9));
const gm = new THREE.Mesh(new THREE.PlaneGeometry(400, 400),
  new THREE.MeshStandardMaterial({ color: 0x6d6153, roughness: 0.95 }));
gm.rotation.x = -Math.PI / 2; gm.receiveShadow = true; sc.add(gm);
const cam = new THREE.PerspectiveCamera(34, W / H, 0.05, 400);
const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
/* every prop is stood at the height it will actually be used at, because a
   bench and a mosque in the same normalised box tell you nothing */
const TARGET = %s;
const keys = Object.keys(INDEX);
const only = (location.search.match(/only=([a-z_0-9,]+)/) || [])[1];
const show = only ? only.split(',') : keys;
let x = 0, span = 0; const info = [];
for (const n of show) {
  if (!INDEX[n]) continue;
  const g = await loader.loadAsync(INDEX[n].file);
  const root = g.scene; root.updateMatrixWorld(true);
  const k = (TARGET[n] || 2) / Math.max(0.01, INDEX[n].height);
  root.scale.setScalar(k);
  root.traverse(o => { if (o.isMesh) { o.castShadow = o.receiveShadow = true;
    o.material.side = THREE.DoubleSide; } });
  const bb = new THREE.Box3().setFromObject(root);
  root.position.set(x - bb.min.x, -bb.min.y, -(bb.min.z + bb.max.z) / 2);
  x += (bb.max.x - bb.min.x) + 2.0;
  span = Math.max(span, bb.max.y - bb.min.y);
  sc.add(root);
  info.push(n + '  ' + INDEX[n].tris + ' tris  ' +
    (bb.max.x - bb.min.x).toFixed(1) + ' x ' + (bb.max.y - bb.min.y).toFixed(1) +
    ' x ' + (bb.max.z - bb.min.z).toFixed(1) + ' m');
}
document.getElementById('l').innerHTML = info.join('<br>');
const view = +((location.search.match(/view=(\\d)/) || [])[1] || 0);
const ang = [0, 1.35, 3.14159][view] || 0;
const cx = (x - 2.0) / 2, d = Math.max(x * 0.62, span * 2.2);
cam.position.set(cx + Math.sin(ang) * d, span * 0.62, Math.cos(ang) * d);
cam.lookAt(cx, span * 0.42, 0);
let f = 0; window.__frames = 0;
(function loop(){ requestAnimationFrame(loop); rn.render(sc, cam); window.__frames++;
  if (++f === 3) window.__ready = true; })();
</script></body></html>
""" % (json.dumps({'imports': MAP}), json.dumps(INDEX),
       json.dumps({'bicycle': 1.05, 'benchw': 0.86, 'bins': 1.15, 'pots': 1.0,
                   'hammock': 1.05, 'evpoint': 1.5, 'solar': 0.42, 'trellis': 2.6,
                   'extra': 6.0, 'mosque': 26.0, 'arcade': 11.0, 'majlisset': 0.8,
                   'carpet': 0.09, 'bunting': 0.5, 'watershrub': 1.45,
                   'lagoon_a': 6.0, 'lagoon_b': 7.0,
                   'canopypav': 15.0, 'palm2': 9.5, 'tram': 3.6, 'tramstop': 3.4,
                   'shophouse': 12.0, 'bluehall': 16.0, 'resblock': 15.0,
                   'fountain': 2.46, 'obelisk': 12.0, 'sail1': 5.0,
                   'kiosk': 3.0, 'bench2': 0.6,
                   'people10': 1.72, 'people5s': 1.28}))

os.makedirs('dist', exist_ok=True)
open('dist/props.html', 'w').write(html)
print('dist/props.html  %d props' % len(INDEX))
