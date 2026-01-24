const CACHE_NAME = 'jan-surksha-v2';
const ASSETS_TO_CACHE = [
  'index.html',
  'manifest.json'
];

// इंस्टॉल इवेंट: फाइलों को कैश में डालना
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// फेच इवेंट: ऑफलाइन काम करने की सुविधा
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
