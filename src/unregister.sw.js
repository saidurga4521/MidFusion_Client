// src/unregisterServiceWorker.js
export function unregisterServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((reg) => {
        reg.unregister().then(() => {
          console.log("[SW] Unregistered:", reg.scope);
        });
      });
    });
  }
}
