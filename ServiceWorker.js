const cacheName = "DefaultCompany-Local no traffic-0.1.0";
const contentToCache = [
    "https://dl.dropboxusercontent.com/s/ii07kequ8rm4thy46ok6l/Local.loader.js?rlkey=hudp1gjv7srj3u9pb9qljp4z5&",
    "https://dl.dropboxusercontent.com/s/k6m61lf8i6cqgrvg75pc1/Local.framework.js.unityweb?rlkey=ejtekqx5c9a5qzl9n012hws2i&",
    "https://dl.dropboxusercontent.com/s/nfriirfnshe9xfpagxk24/Local.data.unityweb?rlkey=9ml5jitdx0edf32w06c14on4b&",
    "https://dl.dropboxusercontent.com/s/onil2xfz66jw3v3ejgdzb/Local.wasm.unityweb?rlkey=60x9ttdq7pwxadze1tlmr1utu&",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
