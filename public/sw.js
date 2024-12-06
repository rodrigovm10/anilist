const CACHE_NAME = 'ANILIST_V2'

async function cacheCoreAssets() {
  const cache = await caches.open(CACHE_NAME)
  return cache.addAll(['/', '/favicon.svg', '/favicon.ico', '/fallback', '/favorites', '/settings'])
}

self.addEventListener('install', event => {
  event.waitUntil(cacheCoreAssets())
  self.skipWaiting()
})

async function clearOldCaches() {
  const cacheNames = await caches.keys()
  return Promise.all(
    cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
  )
}

self.addEventListener('activate', event => {
  event.waitUntil(clearOldCaches())
  self.clients.claim()
})

async function dynamicCaching(request) {
  const cache = await caches.open(CACHE_NAME)

  try {
    const response = await fetch(request)
    const responseClone = response.clone()
    await cache.put(request, responseClone)
    return response
  } catch (error) {
    console.error('Dynamic caching failed:', error)
    return caches.match(request)
  }
}

async function cacheFirstStrategy(request) {
  try {
    const cache = await caches.open(CACHE_NAME)
    const cachedResponse = await cache.match(request)

    if (cachedResponse) {
      return cachedResponse
    }

    const networkResponse = await fetch(request)
    const responseClone = networkResponse.clone()
    await cache.put(request, responseClone)
    return networkResponse
  } catch (error) {
    console.error('Cache first strategy failed:', error)
    return caches.match('/offline')
  }
}

async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request)

    if (networkResponse.ok) {
      const responseClone = networkResponse.clone()
      const responseData = await responseClone.json()
      await addData(request.url, responseData)
      return networkResponse
    }

    throw new Error('Network response was not ok')
  } catch (error) {
    console.error('Network first strategy failed:', error)
    const cachedResponse = await getData(request.url)

    if (cachedResponse) {
      console.log('Using cached response:', cachedResponse)
      return new Response(JSON.stringify(cachedResponse), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    return new Response('[]', { status: 200 })
  }
}

self.addEventListener('fetch', event => {
  const { request } = event
  const url = new URL(request.url)

  // Handle dynamic pages like anime/[id]
  if (
    url.origin === 'https://anime-db.p.rapidapi.com' ||
    url.origin === 'https://cdn.myanimelist.net'
  ) {
    event.respondWith(networkFirstStrategy(request))
  } else if (event.request.mode === 'navigate') {
    event.respondWith(cacheFirstStrategy(request))
  } else {
    event.respondWith(dynamicCaching(request))
  }
})
