const CACHE_NAME = 'score-counter-v1.4';
const ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/main.js',
  '/icon-192x192.png',
  '/icon-512x512.png',
  '/vendor/tailwind.min.css',
  '/vendor/vue3.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});