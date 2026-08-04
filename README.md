# Constructor de Currículum — PWA

## Cómo publicarla (elige una opción, todas son gratis)

**Netlify Drop** (más simple)
1. Andá a https://app.netlify.com/drop
2. Arrastrá esta carpeta completa (todos los archivos deben quedar al mismo nivel: `index.html`, `manifest.json`, `service-worker.js`, `icon-192.png`, `icon-512.png`, `icon-512-maskable.png`)
3. Te da una URL pública al instante (ej. `algo.netlify.app`)

**GitHub Pages**
1. Subí estos archivos a un repositorio de GitHub
2. Settings → Pages → elegí la rama y carpeta raíz
3. Tu app queda en `https://tuusuario.github.io/turepo/`

**Vercel**
1. `npx vercel` dentro de esta carpeta (o arrastrá en vercel.com)

Una vez publicada con HTTPS, entrá desde el celular o Chrome/Edge de escritorio y vas a ver la opción "Instalar app" o "Agregar a pantalla de inicio".

## ⚠️ Sobre el botón "Mejorar con IA"

Dentro del chat de Claude, esas llamadas funcionan porque el entorno del artefacto inyecta automáticamente las credenciales de Anthropic. Fuera del chat, esta versión de la app usa la **API de Google (Gemini)** en su lugar — la app te pide tu propia clave la primera vez que usás el botón (ícono de engranaje en el encabezado):

- La clave se guarda solo en el `localStorage` de tu navegador — nunca se envía a ningún servidor propio, solo a `generativelanguage.googleapis.com`.
- Conseguí una clave gratis en https://aistudio.google.com/apikey — Gemini tiene una capa gratuita generosa, a diferencia de la API de Anthropic.
- El modelo usado es `gemini-3.6-flash` (configurable editando la constante `GEMINI_MODEL` en `index.html` si Google lo vuelve a cambiar).
- Como la clave queda en el navegador, cualquiera con acceso físico a tu dispositivo (o a las devtools) podría verla. Es aceptable para uso personal en tu propio equipo, pero no la uses en una computadora compartida ni publiques el link con tu clave ya cargada.
- Si preferís una solución sin exponer la clave en el navegador, se puede migrar a una función serverless (Netlify Functions, Vercel Edge Functions, Cloudflare Workers) que la guarde del lado del servidor — avisame si querés esa versión.

## Qué incluye

- `index.html` — la app completa (React vía CDN, sin paso de build)
- `manifest.json` — hace que sea instalable
- `service-worker.js` — cachea la app para que abra offline
- `icon-192.png`, `icon-512.png`, `icon-512-maskable.png` — íconos, todos en la misma carpeta que el resto

## Nota sobre guardado

Esta versión sí guarda tu borrador en `localStorage` del navegador (a diferencia de la vista previa dentro del chat de Claude, que no puede usar almacenamiento del navegador). Así que si cerrás y volvés a abrir la app instalada, tu CV sigue ahí.
