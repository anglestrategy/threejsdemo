#!/usr/bin/env python3
"""Serve dist/ for development with gzip encoding and proper headers.

`python3 serve.py [port]`

Serves pre-compressed .gz files when the client accepts gzip encoding, falling
back to uncompressed originals. Also supports on-the-fly gzip for files without
a pre-compressed version. This cuts transfer sizes by 60-90% for text assets
and 20-30% for base64 JSON payloads.
"""
import functools
import gzip
import http.server
import os
import socketserver
import sys

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8099
DIST = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'dist')
os.chdir(DIST)

MIME = {
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.glb': 'model/gltf-binary',
    '.webp': 'image/webp',
    '.ktx2': 'image/ktx2',
    '.html': 'text/html',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.wasm': 'application/wasm',
}

COMPRESSIBLE = {'.js', '.json', '.html', '.css', '.svg', '.glb'}


class Handler(http.server.SimpleHTTPRequestHandler):
    extensions_map = dict(http.server.SimpleHTTPRequestHandler.extensions_map, **MIME)

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache')
        super().end_headers()

    def do_GET(self):
        path = self.translate_path(self.path)
        _, ext = os.path.splitext(path)

        if ext in COMPRESSIBLE and 'gzip' in self.headers.get('Accept-Encoding', ''):
            gz_path = path + '.gz'
            if os.path.exists(gz_path):
                self.send_response(200)
                self.send_header('Content-Type', self.extensions_map.get(ext, 'application/octet-stream'))
                self.send_header('Content-Encoding', 'gzip')
                self.send_header('Content-Length', str(os.path.getsize(gz_path)))
                self.end_headers()
                with open(gz_path, 'rb') as f:
                    self.wfile.write(f.read())
                return
            elif os.path.exists(path):
                with open(path, 'rb') as f:
                    raw = f.read()
                compressed = gzip.compress(raw, compresslevel=6)
                self.send_response(200)
                self.send_header('Content-Type', self.extensions_map.get(ext, 'application/octet-stream'))
                self.send_header('Content-Encoding', 'gzip')
                self.send_header('Content-Length', str(len(compressed)))
                self.end_headers()
                self.wfile.write(compressed)
                return

        super().do_GET()


socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(('', PORT), Handler) as httpd:
    print('serving dist/ on http://localhost:%d (gzip enabled)' % PORT)
    httpd.serve_forever()
