var cacheName = 'petstore-v1';
var cacheFiles = [
    'petstoreInteraction.html',
    'petstore.webmanifest',
    'product.js',
    'images/catfood.jpg',
    'images/homemadecatfoodrecipes14.jpg', 
    'images/images (1).jpg', 
    'images/images (2).jpg', 
    'images/images.jpg', 
    'images/img.jpg'
];
self.addEventListener('install',(e)=>{
        console.log('[Service Worker] Install');
            e.waitUntil(
                caches.open(cacheName).then((cache)=>{
                    console.log('[service worker] caching all the files');
                    return cache.addAll(cacheFiles);

                }
            )
        );
});

self.addEventListener('fetch',function(e){
    e.respondWith(
        caches.match(e.request).then(function (r){
            //download the file if it is not in the cache
            return r || fetch (e.request).then(function (response){
                //add the new file to cache
                return caches.open(cacheName).then(function (cache){
                    cache.put(e.request,response,clone());
                    return response;

                });
            });
        })
    )
})