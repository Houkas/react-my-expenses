const PREFIX = "V1";
const BASE = location.protocol + '//' + location.host

const appShellFiles = [
  `${BASE}offline.html`,
  `${BASE}/src/app.tsx`,
  `${BASE}/src/index.scss`,
  `${BASE}/logo.svg`,
  `${BASE}/icons/android/android-launchericon-48-48.png`,
  `${BASE}/icons/android/android-launchericon-72-72.png`,
  `${BASE}/icons/android/android-launchericon-96-96.png`,
  `${BASE}/icons/android/android-launchericon-144-144.png`,
  `${BASE}/icons/android/android-launchericon-192-192.png`,
  `${BASE}/icons/android/android-launchericon-512-512.png`,
];



self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    (async () => {
      const cache = await caches.open(PREFIX);
      //console.log("[Service Worker] Caching all: app shell and content");
      await Promise.all([...appShellFiles, '/offline.html'].map((path) => {
          return cache.add(new Request(path))
      }))
      //await cache.addAll(appShellFiles);
    })()
  );
  //console.log(`${PREFIX} Install`);
});

self.addEventListener("activate", (event) => {
  clients.claim();
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.map((key) => {
          if (!key.includes(PREFIX)) {
            return caches.delete(key);
          }
        })
      );
    })()
  );
  //console.log(`${PREFIX} Active`);
});

self.addEventListener("fetch", (e) => {
  //console.log(`${PREFIX} Fetching : ${e.request.url}, Mode : ${e.request.mode}`);

  if (e.request.mode === "navigate") {
    e.respondWith(
      (async () => {
        try {
          const preloadResponse = await e.preloadResponse;
          if (preloadResponse) {
            return preloadResponse;
          }
          return await fetch(e.request);
        } catch (e) {
          const cache = await caches.open(PREFIX);
          return await cache.match("/offline.html");
        }
      })()
    );
  } else if(appShellFiles.includes(e.request.url)){
      e.respondWith(caches.match(e.request));
  }
});
