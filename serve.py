#!/usr/bin/env python3
"""Serve dist/ for development. `python3 serve.py [port]`"""
import functools, http.server, os, socketserver, sys
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8099
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'dist'))
H = functools.partial(http.server.SimpleHTTPRequestHandler)
H.extensions_map = dict(http.server.SimpleHTTPRequestHandler.extensions_map,
                        **{'.js': 'text/javascript', '.json': 'application/json',
                           '.glb': 'model/gltf-binary', '.webp': 'image/webp',
                           '.ktx2': 'image/ktx2'})
socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(('', PORT), H) as httpd:
    print('serving dist/ on http://localhost:%d' % PORT)
    httpd.serve_forever()
