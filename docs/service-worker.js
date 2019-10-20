console.log("This is service worker talking");
var cacheName = 'jarfors';
var rootPath = '/JarforsApp';
var filesToCache = [
    rootPath + '/',
    //Html and css files
    rootPath + '/index.html',
    rootPath + '/css/site.css',
    rootPath + '/css/bootstrap/bootstrap.min.css',
    rootPath + '/css/open-iconic/font/css/open-iconic-bootstrap.min.css',
    //'/open-iconic',
    rootPath + '/css/open-iconic/font/fonts/open-iconic.woff',
    //'/css/loading.css',
    //Blazor framework
    rootPath + '_framework/blazor.webassembly.js',
    rootPath + '/_framework/blazor.boot.json',
    //Our additional files
    rootPath + '/manifest.json',
    rootPath + '/service-worker.js',
    rootPath + '/icons/icon-192x192.png',
    rootPath + '/icons/icon-512x512.png',
    //The web assembly/.net dll's
    rootPath + '/_framework/wasm/mono.js',
    rootPath + '/_framework/wasm/mono.wasm',
    //'/_framework/_bin/Microsoft.AspNetCore.Blazor.Browser.dll',
    //'/_framework/_bin/Microsoft.AspNetCore.Blazor.dll',
    rootPath + '/_framework/_bin/Microsoft.Extensions.DependencyInjection.Abstractions.dll',
    rootPath + '/_framework/_bin/Microsoft.Extensions.DependencyInjection.dll',
    rootPath + '_framework/_bin/Microsoft.JSInterop.dll',
    rootPath + '/_framework/_bin/mscorlib.dll',
    rootPath + '/_framework/_bin/System.Net.Http.dll',
    rootPath + '/_framework/_bin/Mono.WebAssembly.Interop.dll',
    rootPath + '/_framework/_bin/System.dll',
    rootPath + '/_framework/_bin/System.Core.dll',
    //Pages
    rootPath + '/counter',
    //Sounds
    rootPath + '/sounds/Darlig.m4a',
    rootPath + '/sounds/God.m4a',
    rootPath + '/sounds/Pepshpepsh.m4a',
    rootPath + '/sounds/Woosh.m4a',
    //The compiled project .dll's
    rootPath + '/_framework/_bin/Jarfors-App.dll'
];

self.addEventListener('install', function (e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request, { ignoreSearch: true }).then(response => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('fetch', function(event) {
    console.log(event.request);
});