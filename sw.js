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

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
