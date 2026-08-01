
var _cacheName = 'cimbar-recv-js-v2026-08-01T1335';
var _cacheFiles = [
  '/',
  '/recv.html',
  '/cimbar_js.2026-08-01T1335.js',
  '/cimbar_js.2026-08-01T1335.wasm',
  '/favicon.ico',
  '/icon-192x192.png',
  '/icon-512x512.png',
  '/icon-512x512-maskable.png',
  '/recv.2026-08-01T1335.js',
  '/recv-worker.2026-08-01T1335.js',
  '/pwa-recv.2026-08-01T1335.json',
  '/zstd.2026-08-01T1335.js'
];

// fetch files
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(_cacheName).then(function (cache) {
      return cache.addAll(_cacheFiles);
    })
  );
  self.skipWaiting();
});

// serve from cache
self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.match(e.request).then(function (response) {
      return response || fetch(e.request);
    })
  );
});

// clean old caches
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (names) {
      return Promise.all(
        names.map(function (cn) {
          if (cn !== _cacheName) {
            return caches.delete(cn);
          }
        })
      );
    }).then(function () {
      return self.clients.claim(); 
    })
  );
});
