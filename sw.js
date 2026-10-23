/* GH TOOLS — Copyright (c) 2026 Felipe Manrique. Todos los derechos reservados. */
// Cache de la cáscara para abrir sin señal. SUBIR VERSION EN CADA CAMBIO (si no, los teléfonos nunca lo reciben).
const VERSION = 'gh-tools-v1.2.2';
const PREFIJO = 'gh-tools-v';
const SHELL = ['./', 'index.html', 'styles.css', 'app.js', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png',
  'icons/icon-32.png', 'icons/icon-maskable-512.png', 'apple-touch-icon.png', 'logo-gh.png',
  'icons/app-gh-auditorias-campo.png', 'icons/app-seguimiento-ambiental.png', 'icons/app-gh-seguimiento-mediciones.png', 'icons/app-gh-calibraciones.png',
  'icons/app-gh-documentos.png', 'icons/app-gh-ergonomia.png', 'icons/app-gh-biblioteca-web.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL.map((u) => new Request(u, { cache: 'reload' })))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys()
    .then((ks) => Promise.all(ks.filter((k) => k.startsWith(PREFIJO) && k !== VERSION).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// Red primero (recibe actualizaciones), caché si no hay conexión.
// Solo GET del mismo origen: el backend (script.google.com) nunca se cachea.
self.addEventListener('fetch', (e) => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin) return;
  if (/\.webmanifest$|\/icons\/|apple-touch-icon|oauth\.html$/.test(url.pathname)) return;
  e.respondWith(
    fetch(req).then((res) => {
      if (res.ok) { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); }
      return res;
    }).catch(() => caches.match(req, { ignoreSearch: true }).then((r) => r || caches.match('index.html')))
  );
});
