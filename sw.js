---
---
// Service Worker for {{ site.title }}
// Handles caching and offline functionality

const CACHE_NAME = '{{ site.title | slugify }}-cache-v1';
const baseURL = '{{ site.baseurl }}';

// Cache essential files during install
self.addEventListener('install', function(event) {
  console.log('Service Worker installing.');
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll([
        baseURL + '/',
        baseURL + '/assets/css/main.css',
        baseURL + '/assets/js/theme.js'
      ]).catch(function(error) {
        console.log('Cache addAll failed:', error);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  console.log('Service Worker activating.');
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function(event) {
  // Handle fetch requests with cache-first strategy for static assets
  if (event.request.method === 'GET') {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request).catch(function() {
          // Fallback for navigation requests
          if (event.request.mode === 'navigate') {
            return caches.match(baseURL + '/');
          }
        });
      })
    );
  }
});
