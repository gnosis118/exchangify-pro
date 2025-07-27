const CACHE_NAME = 'currency-converter-v1.2';
const STATIC_CACHE = 'currency-converter-static-v1.2';
const DYNAMIC_CACHE = 'currency-converter-dynamic-v1.2';
const API_CACHE = 'currency-converter-api-v1.2';

// Static assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/lovable-uploads/1189b476-c42f-4f90-944d-2ee829a94bd8.png'
];

// API endpoints that should be cached
const API_ENDPOINTS = [
  'api.exchangerate-api.com',
  'api.coingecko.com'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && 
                cacheName !== DYNAMIC_CACHE && 
                cacheName !== API_CACHE) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        self.clients.claim();
      })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle API requests with network-first strategy
  if (API_ENDPOINTS.some(endpoint => url.hostname.includes(endpoint))) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache successful API responses for 5 minutes
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(API_CACHE)
              .then((cache) => {
                cache.put(request, responseClone);
                // Set expiration for API cache (5 minutes)
                setTimeout(() => {
                  cache.delete(request);
                }, 5 * 60 * 1000);
              });
          }
          return response;
        })
        .catch(() => {
          // Return cached version if network fails
          return caches.match(request)
            .then((cachedResponse) => {
              return cachedResponse || new Response('Offline - API unavailable', {
                status: 503,
                statusText: 'Service Unavailable'
              });
            });
        })
    );
    return;
  }

  // Handle static assets with cache-first strategy
  if (request.destination === 'image' || 
      request.destination === 'style' || 
      request.destination === 'script' ||
      request.destination === 'font') {
    event.respondWith(
      caches.match(request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          return fetch(request)
            .then((response) => {
              if (response.ok) {
                const responseClone = response.clone();
                caches.open(STATIC_CACHE)
                  .then((cache) => {
                    cache.put(request, responseClone);
                  });
              }
              return response;
            });
        })
    );
    return;
  }

  // Handle navigation requests with stale-while-revalidate
  if (request.mode === 'navigate') {
    event.respondWith(
      caches.match(request)
        .then((cachedResponse) => {
          const fetchResponse = fetch(request)
            .then((response) => {
              if (response.ok) {
                const responseClone = response.clone();
                caches.open(DYNAMIC_CACHE)
                  .then((cache) => {
                    cache.put(request, responseClone);
                  });
              }
              return response;
            })
            .catch(() => {
              // Return offline page or cached index
              return caches.match('/') || caches.match('/index.html');
            });

          return cachedResponse || fetchResponse;
        })
    );
    return;
  }

  // Default: network-first for other requests
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) {
          const responseClone = response.clone();
          caches.open(DYNAMIC_CACHE)
            .then((cache) => {
              cache.put(request, responseClone);
            });
        }
        return response;
      })
      .catch(() => {
        return caches.match(request);
      })
  );
});

// Background sync for failed API requests
self.addEventListener('sync', (event) => {
  if (event.tag === 'currency-sync') {
    event.waitUntil(
      // Retry failed currency rate requests
      retryFailedRequests()
    );
  }
});

function retryFailedRequests() {
  return caches.open(API_CACHE)
    .then((cache) => {
      return cache.keys();
    })
    .then((requests) => {
      return Promise.all(
        requests.map((request) => {
          return fetch(request)
            .then((response) => {
              if (response.ok) {
                return caches.open(API_CACHE)
                  .then((cache) => {
                    return cache.put(request, response);
                  });
              }
            })
            .catch(() => {
              // Handle failed retry
              console.log('Retry failed for:', request.url);
            });
        })
      );
    });
}