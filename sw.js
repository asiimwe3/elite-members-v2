const CACHE_NAME = 'elite-members-v1';
const urlsToCache = [
  '/elite-members/',
  '/elite-members/index.html',
  '/elite-members/css/style.css',
  '/elite-members/js/app.js',
  '/elite-members/pages/feed.html',
  '/elite-members/pages/discover.html',
  '/elite-members/pages/channels.html',
  '/elite-members/pages/community.html',
  '/elite-members/pages/events.html',
  '/elite-members/pages/messages.html',
  '/elite-members/pages/marketplace.html',
  '/elite-members/pages/creatorlab.html',
  '/elite-members/pages/analytics.html',
  '/elite-members/pages/collaborations.html',
  '/elite-members/pages/profile.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) return response;
      return fetch(event.request).catch(() => caches.match('/elite-members/index.html'));
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});
