self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('orpheus-video-cache-v1').then((cache) => {
            return cache.addAll([
                '/',
                '/1.html',
                
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== 'orpheus-video-cache-v1') {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});
