self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', (event) => {
  let data = { title: 'Streaks', body: 'Reminder' };
  try { if (event.data) data = event.data.json(); } catch (e) {}

  event.waitUntil(
    self.registration.showNotification(data.title || 'Streaks', {
      body: data.body || '',
      icon: data.icon || undefined,
      badge: data.badge || undefined,
      tag: data.tag || undefined,
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) return client.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow('./');
    })
  );
});
