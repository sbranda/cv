const CACHE_NAME = "cv-builder-v107";
const PRECACHE_URLS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-512-maskable.png",
  "https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.24.7/babel.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.min.js",
  "https://cdn.jsdelivr.net/npm/docx@8.5.0/build/index.umd.min.js",
  "https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js",
  "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Work+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&family=Lato:wght@400;700&display=swap"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.all(
        PRECACHE_URLS.map((url) =>
          // { cache: "reload" } ignora la caché HTTP del navegador y fuerza a pedir
          // el archivo fresco del servidor — sin esto, una app ya instalada podía
          // quedar guardando una copia vieja de index.html aunque el archivo en el
          // servidor ya estuviera actualizado.
          fetch(url, { cache: "reload" })
            .then((response) => {
              if (response.ok) return cache.put(url, response);
            })
            .catch(() => {})
        )
      )
    )
  );
  // A propósito NO llamamos self.skipWaiting() acá. Dejamos que la versión
  // nueva quede "esperando" hasta que la persona toque el aviso de "hay una
  // versión nueva" en la app — así activa cuando ella decide, no en silencio.
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// La app le pide al service worker "esperando" que se active recién cuando
// la persona toca el aviso de actualización (ver index.html).
self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Cache-first for same-origin and known CDN assets, network-first fallback for everything else
self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req)
        .then((res) => {
          if (res && res.status === 200 && (res.type === "basic" || res.type === "cors")) {
            const resClone = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
          }
          return res;
        })
        .catch(() => {
          // Solo devolvemos index.html como respaldo para NAVEGACIONES de página
          // (por ejemplo, abrir la app sin conexión). Para cualquier otro recurso
          // (scripts, imágenes, fuentes) dejamos que la falla se propague tal cual,
          // así el código que lo pidió (por ejemplo, el generador de QR) se entera
          // del error real en vez de recibir el HTML de la app disfrazado de script.
          if (req.mode === "navigate") return caches.match("./index.html");
          return Promise.reject(new Error("No se pudo obtener el recurso y no hay copia en caché."));
        });
    })
  );
});
