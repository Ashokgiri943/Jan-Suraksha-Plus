const CACHE_NAME = 'jan-suraksha-plus-v2'; // वर्ज़न अपडेट किया गया है
const assets = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// इंस्टॉल इवेंट: फाइलों को सुरक्षित कैश करना
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('जन सुरक्षा प्लस: फाइलें सुरक्षित रूप से कैश की जा रही हैं...');
      return cache.addAll(assets);
    })
  );
  self.skipWaiting();
});

// एक्टिवेट इवेंट: पुराने कैश को हटाना ताकि नया अपडेट मिल सके
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// फेच इवेंट: ऑफलाइन काम करने की सुविधा
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
