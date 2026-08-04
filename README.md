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

## ⚠️ Importante: el botón "Mejorar con IA" no va a funcionar tal cual

Dentro del chat de Claude, esas llamadas a `api.anthropic.com` funcionan porque el entorno del artefacto inyecta automáticamente las credenciales. **Una vez que publiques este HTML de forma independiente, esas llamadas van a fallar** porque no hay ninguna clave de API configurada.

Opciones para que vuelva a funcionar:

1. **Backend propio (recomendado)**: crea una función serverless (Netlify Functions, Vercel Edge Functions, Cloudflare Workers) que reciba el texto, llame a la API de Anthropic con tu clave guardada como variable de entorno del lado del servidor, y devuelva el resultado. Nunca pongas tu clave de API directamente en el HTML/JS del navegador: cualquiera podría verla e inflarte la factura.
2. **Quitar la función de IA**: si solo necesitás el editor y las plantillas (sin mejora de texto automática), puedo darte una versión sin los botones "Mejorar con IA" y sin llamadas externas — funcionaría 100% offline.

Decime cuál preferís y te preparo esa parte.

## Qué incluye

- `index.html` — la app completa (React vía CDN, sin paso de build)
- `manifest.json` — hace que sea instalable
- `service-worker.js` — cachea la app para que abra offline
- `icon-192.png`, `icon-512.png`, `icon-512-maskable.png` — íconos, todos en la misma carpeta que el resto

## Nota sobre guardado

Esta versión sí guarda tu borrador en `localStorage` del navegador (a diferencia de la vista previa dentro del chat de Claude, que no puede usar almacenamiento del navegador). Así que si cerrás y volvés a abrir la app instalada, tu CV sigue ahí.
