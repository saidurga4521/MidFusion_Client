export default function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", async () => {
      try {
        const reg = await navigator.serviceWorker.register("/sw.js");
        console.log("✅ SW registered:", reg.scope);

        // Optional: detect updates
        reg.onupdatefound = () => {
          const installing = reg.installing;
          if (!installing) return;
          installing.onstatechange = () => {
            if (installing.state === "installed") {
              if (navigator.serviceWorker.controller) {
                console.log("New content available, refresh suggested.");
              } else {
                console.log("App ready for offline use.");
              }
            }
          };
        };
      } catch (err) {
        console.error("❌ SW registration failed:", err);
      }
    });
  }
}
