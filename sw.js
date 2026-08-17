// Glamourtech Autonomous Notification Engine - Service Worker
// Serves background push delivery and lock-screen alarms

self.addEventListener('install', (event) => {
  self.skipWaiting();
  console.log('[Glamourtech SW] Service Worker installed.');
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
  console.log('[Glamourtech SW] Service Worker activated and claiming clients.');
});

// Listen to standard Web Push events from external automation systems (Make.com, Zapier, etc.)
self.addEventListener('push', (event) => {
  console.log('[Glamourtech SW] Push message received:', event);
  
  let title = 'Glamourtech Operations Alert';
  let body = 'New production signal received.';
  let icon = 'https://ais-pre-yv4mdpw6opayexs2zf5qwq-233670722050.europe-west2.run.app/favicon.ico';
  let badge = 'https://ais-pre-yv4mdpw6opayexs2zf5qwq-233670722050.europe-west2.run.app/favicon.ico';
  let tag = 'glamourtech-alert';

  if (event.data) {
    try {
      const data = event.data.json();
      title = data.title || title;
      body = data.body || data.message || body;
      if (data.icon) icon = data.icon;
      if (data.tag) tag = data.tag;
    } catch (e) {
      // Fallback to plain text if not JSON
      body = event.data.text() || body;
    }
  }

  const options = {
    body: body,
    icon: icon,
    badge: badge,
    tag: tag,
    vibrate: [200, 100, 200, 100, 400], // Sci-fi notification vibration pattern
    requireInteraction: true,
    data: {
      url: self.registration.scope
    },
    actions: [
      { action: 'open', title: 'Open Hub' },
      { action: 'dismiss', title: 'Dismiss' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Listen for self-scheduled background alarms (simulating delays while screen is locked)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SCHEDULE_ALARM') {
    const { title, body, delayMs } = event.data;
    
    console.log(`[Glamourtech SW] Scheduling lock-screen alarm in ${delayMs}ms...`);
    
    setTimeout(() => {
      const options = {
        body: body,
        icon: 'https://ais-pre-yv4mdpw6opayexs2zf5qwq-233670722050.europe-west2.run.app/favicon.ico',
        badge: 'https://ais-pre-yv4mdpw6opayexs2zf5qwq-233670722050.europe-west2.run.app/favicon.ico',
        vibrate: [300, 150, 300],
        requireInteraction: true,
        data: {
          url: self.registration.scope
        },
        actions: [
          { action: 'open', title: 'Open Hub' }
        ]
      };

      self.registration.showNotification(title, options);
    }, delayMs);
  }
});

// Action click event handler
self.addEventListener('notificationclick', (event) => {
  console.log('[Glamourtech SW] Notification clicked:', event.notification.tag);
  event.notification.close();

  if (event.action === 'dismiss') {
    return;
  }

  // Open or focus the application tab
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === event.notification.data.url && 'focus' in client) {
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow(event.notification.data.url);
      }
    })
  );
});
