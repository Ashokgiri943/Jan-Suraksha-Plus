const CACHE_NAME = 'jan-suraksha-plus-v1';
const assets = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// इंस्टॉल इवेंट: फाइलों को कैश में सेव करना
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('कैश फाइलें सेव हो रही हैं...');
      return cache.addAll(assets);
    })
  );
});

// फेच इवेंट: ऑफलाइन होने पर कैश से फाइलें दिखाना
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// एक्टिवेट इवेंट: पुराने कैश को साफ करना
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      );
    })
  );
});
