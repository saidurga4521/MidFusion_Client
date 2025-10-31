/* eslint-env serviceworker */
// sw.js (in public folder)

const CACHE_NAME = "app-cache-v7";

// ✅ Only cache what you KNOW exists in /dist after build
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.webmanifest",
  "/favicon.ico",
];

const isDev = self.location.hostname === "localhost";

// Install Service Worker
self.addEventListener("install", (event) => {
  console.log("[SW] Install");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll(urlsToCache).catch((err) => {
        console.warn("[SW] Some assets failed to cache:", err);
      })
    )
  );
  self.skipWaiting(); // activate new SW immediately
});

// Activate Service Worker
self.addEventListener("activate", (event) => {
  console.log("[SW] Activate");
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("[SW] Deleting old cache:", cache);
            return caches.delete(cache);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch handler (Cache-First, then Network) , fetch from cache first
self.addEventListener("fetch", (event) => {
  // Skip non-http(s) requests (chrome-extension://, data:, etc.)

  if (isDev) {
    // In dev, just go to network always
    console.warn("[SW] skip fetching from Cache for localhost");
    return;
  }

  if (!event.request.url.startsWith("http")) return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request)
        .then((res) => {
          if (!res || res.status !== 200 || res.type !== "basic") {
            return res;
          }

          const resClone = res.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, resClone).catch((err) => {
              console.warn(
                "[SW] Cache put failed for:",
                event.request.url,
                err
              );
            });
          });

          return res;
        })
        .catch(() => {
          if (event.request.mode === "navigate") {
            return caches.match("/index.html");
          }
        });
    })
  );
});

// ------PUSH NOTIFICATION----

// Handle push events
self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : {};
  console.log("[SW] Push received:", data);

  const title = data.title || "Meet in the Middle";
  const options = {
    body: data.body || "You have a new notification",
    icon: "/favicon.ico",
    badge: "/favicon.ico",
    data: data.url || "/", // click action
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Handle click on notification
//Sometimes multiple tabs are open, and you might want to focus an existing one instead of always opening a new one:
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url === event.notification.data && "focus" in client) {
            return client.focus();
          }
        }
        if (self.clients.openWindow) {
          return self.clients.openWindow(event.notification.data);
        }
      })
  );
});
