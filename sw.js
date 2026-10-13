/* Service worker: מקבל את התראות ה-Push ומציג אותן */
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

try {
  const cfg = JSON.parse(new URL(self.location.href).searchParams.get('c') || '{}');
  if (cfg.apiKey) {
    firebase.initializeApp(cfg);
    firebase.messaging();
  }
} catch (e) {}

// לחיצה על התראה שהאפליקציה הציגה בעצמה
self.addEventListener('notificationclick', (event) => {
  const data = event.notification.data || {};
  if (data.FCM_MSG || !data.link) return;
  event.notification.close();
  event.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
    for (const c of list) { if ('focus' in c) { c.navigate(data.link); return c.focus(); } }
    return self.clients.openWindow(data.link);
  }));
});

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
