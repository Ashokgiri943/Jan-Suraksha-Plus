// जन सुरक्षा प्लस - अशोक गिरी (खटीमा)
const CACHE_NAME = 'jan-suraksha-plus-v2';
const ASSETS_TO_CACHE = [
  'index.html',
  'manifest.json',
  'icon.png'
];

// सर्विस वर्कर इंस्टॉल करना
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('जन सुरक्षा प्लस: फाइलें सुरक्षित की जा रही हैं');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// फाइलें लोड करना
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
// अशोक गिरी: सुरक्षा मेरा लक्ष्य है!
