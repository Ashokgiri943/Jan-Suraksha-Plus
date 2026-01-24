
const CACHE_NAME = 'suraksha-v5'; // वर्जन अपडेट किया गया
const assets = [
  './',
  './index.html',
  './manifest.json',
  'https://cdn-icons-png.flaticon.com/512/564/564619.png'
];

// इंस्टॉल इवेंट
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('फाइलें सुरक्षित की जा रही हैं...');
      return cache.addAll(assets);
    })
  );
});

// फेच इवेंट (ऑफलाइन काम करने के लिए)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// पुराने कैश को साफ़ करना
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});
