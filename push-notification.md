🔔 Next Topic: Push Notifications (Web Push)
What we’ll achieve

Browser can subscribe to push notifications.

Backend saves subscriptions (linked to logged-in user).

Admin/server can send push messages (meeting reminders, updates).

Service Worker shows notification, even if app is closed.

Step 1: Generate VAPID Keys

VAPID = Voluntary Application Server Identification. Needed to authenticate push messages.

npx web-push generate-vapid-keys


Output:

Public Key:  BLABLABLA...
Private Key: SECRETSECRET...


Store in .env:

VAPID_PUBLIC_KEY=...
VAPID_PRIVATE_KEY=...

Step 2: Service Worker Push Handler (sw.js)

Add this to your existing sw.js:

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
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data));
});

Step 3: Frontend Subscription (React)

In App.jsx or a useNotifications.js hook:

export async function subscribeToPush() {
  if ("serviceWorker" in navigator && "PushManager" in window) {
    const reg = await navigator.serviceWorker.ready;

    const subscription = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: import.meta.env.VITE_VAPID_PUBLIC_KEY, // from backend
    });

    console.log("Push subscription:", subscription);

    // send to backend
    await fetch("/api/notifications/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(subscription),
      credentials: "include",
    });
  } else {
    console.warn("Push notifications not supported in this browser.");
  }
}

Step 4: Backend Endpoint (Express)
import webpush from "web-push";
import express from "express";

const router = express.Router();

// Configure webpush
webpush.setVapidDetails(
  "mailto:your@email.com",
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

// Store subscriptions in DB (user → subscription)
const subscriptions = [];

router.post("/subscribe", (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(201).json({ message: "Subscribed successfully" });
});

// Send notification
router.post("/send", async (req, res) => {
  const { title, body, url } = req.body;

  const payload = JSON.stringify({ title, body, url });

  const sendPromises = subscriptions.map((sub) =>
    webpush.sendNotification(sub, payload).catch((err) => {
      console.error("Push error:", err);
    })
  );

  await Promise.all(sendPromises);
  res.json({ message: "Notifications sent" });
});

export default router;


✅ With this setup:

Users subscribe → backend saves subscription.

Backend sends push → Service Worker displays notification.

Clicking the notification → opens meeting link.