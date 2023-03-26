const staticCacheName = "s-app-v1"
const dynamicCacheName = "d-app-v1"
const assetUrls = ["index.html", "src/js/app.js", "src/css/main.css"]

self.addEventListener("install", async () => {
    const cache = await caches.open(staticCacheName)
    await cache.addAll(assetUrls)
})

self.addEventListener("activate", async () => {
    const cacheNames = await caches.keys()
    await Promise.all(
        cacheNames
            .filter(name => name !== staticCacheName)
            .filter(name => name !== dynamicCacheName)
            .map(name => caches.delete(name))
    )
})

self.addEventListener("fetch", e => {
    const {request} = e
    const url = new URL(request.url)

    url.origin === location.origin ? e.respondWith(cacheFirst(request)) : e.respondWith(networkFirst(request))
})

async function cacheFirst(request) {
    const cached = await caches.match(request)

    return cached ?? await fetch(request)
}

async function networkFirst(request) {
    const cache = await caches.open(dynamicCacheName)
    try {
        const response = await fetch(request)
        await cache.put(request, response.clone())

        return response
    } catch (e) {
        const cached = await cache.match(request)

        return cached ?? await cache.match("/src/pages/offline.html")
    }
}