// Simple service worker to prevent 404 errors
self.addEventListener('install', function(event) {
  console.log('Service Worker installing.');
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  console.log('Service Worker activating.');
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event) {
  // For now, just let the browser handle all requests normally
  // This prevents the 404 errors you're seeing
  console.log('Service Worker fetching:', event.request.url);
});