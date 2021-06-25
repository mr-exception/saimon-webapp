const CACHE_NAME = "salimon-v1";
/**
 * install step caches chunk and maps to load in
 * from here later
 */
// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       return cache.addAll(["/", "/index.html"]);
//     })
//   );
// });
/**
 * handle all requests passing from this pwa and return the cache if needed
 */
const cache_exceptions = ["/service-worker.js"];
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        // url was cached
        return response;
      }
      // otherwise, fetch the url
      return fetch(event.request).then(function (response) {
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }
        // if url origin was not internal then don't cache it
        if (!event.request.url.startsWith(location.origin)) {
          return response;
        }
        // if url is excluded from being cached
        for (let i = 0; i < cache_exceptions.length; i++) {
          if (event.request.url === location.origin + cache_exceptions[i]) {
            return response;
          }
        }
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then(function (cache) {
          console.log(`cashed ${event.request.url}`);
          cache.put(event.request, responseToCache);
        });
        return response;
      });
    })
  );
});
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});
