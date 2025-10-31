// src/hooks/useNotification.js
import { useState } from "react";

export const useNotification = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Helper to convert VAPID key
  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const rawData = atob(base64);
    return new Uint8Array([...rawData].map((c) => c.charCodeAt(0)));
  }

  async function subscribeToPush() {
    // Dev mode detection: skip in localhost if needed
    // if (import.meta.env.MODE === "development") {
    //   console.warn("[Push] Skipping subscription in development mode");
    //   return;
    // }

    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      console.warn("[Push] Push notifications not supported in this browser");
      return;
    }

    const vapidKey = import.meta.env.VITE_VAPID_PUBLIC_KEY;
    if (!vapidKey) {
      console.error("[Push] VAPID public key missing! Check .env");
      return;
    }

    try {
      const registration = await navigator.serviceWorker.ready;

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidKey),
      });


      if (!subscription) {
        console.warn("[Push] Subscription not successful:", subscription);
        return;
      }

      console.log("[Push] Subscription successful:", subscription);


      const baseUrl = import.meta.env.VITE_BASE_URL;
      await fetch(`${baseUrl}/notifications/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subscription),
        credentials: "include",
      });

      setIsSubscribed(true);
    } catch (err) {
      if (err.name === "AbortError") {
        console.warn(
          "[Push] Subscription aborted (likely storage issue or private mode)"
        );
      } else if (err.name === "NotAllowedError") {
        console.warn("[Push] Permission denied by user");
      } else {
        console.error("[Push] Subscription error:", err);
      }
    }
  }

  return { subscribeToPush, isSubscribed };
};
