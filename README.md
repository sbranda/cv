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

Esta versión sí guarda tus perfiles en `localStorage` del navegador (a diferencia de la vista previa dentro del chat de Claude, que no puede usar almacenamiento del navegador). Así que si cerrás y volvés a abrir la app instalada, tus CVs siguen ahí.

## Perfiles múltiples

Podés guardar varias versiones de tu CV (por ejemplo, una para cada tipo de puesto). Tocá el botón con ícono de personas en el encabezado para:
- Cambiar entre perfiles
- Crear uno nuevo en blanco
- Duplicar un perfil existente (útil para partir de una base y ajustarla para un puesto específico)
- Renombrar o eliminar perfiles

Si ya tenías un borrador guardado de una versión anterior de la app, se migra automáticamente a "Perfil 1" la primera vez que abrís esta versión.

## Carta de presentación

El botón "Carta" en el encabezado genera una carta de presentación con IA a partir de los datos del perfil activo (resumen, experiencia, habilidades). Completá la empresa, el puesto al que aplicás y el tono deseado, y la carta se genera y queda editable ahí mismo. Usa la misma clave de Gemini configurada en el engranaje de configuración.

## Importar CV desde PDF/Word

Dentro de "Mis perfiles" (ícono de personas) hay un botón "Importar desde PDF/Word". Subís tu CV actual en `.pdf` o `.docx` y la IA arma un perfil nuevo completando nombre, contacto, resumen, experiencia, educación y habilidades automáticamente — revisá siempre el resultado, porque la extracción de datos puede tener errores.

**¿Y LinkedIn?** No hay una conexión directa (LinkedIn no ofrece esa integración para uso personal). Lo que funciona: entrá a tu perfil de LinkedIn → botón "Más" → "Guardar en PDF", y subí ese archivo con la misma opción de importar.

## Secciones opcionales

Proyectos, Publicaciones, Becas y Logros destacados están ocultas por defecto para no saturar el editor. Activalas con los chips que aparecen debajo de Habilidades ("+ Proyectos", "+ Publicaciones", etc.) — al activarlas se despliega el formulario completo, y podés ocultarlas de nuevo con la ✕ en su encabezado sin perder lo que ya cargaste.

## Exportar a Word

El botón "Word" en el encabezado descarga tu CV como archivo `.docx`, útil para portales de empleo o sistemas de selección que exigen ese formato específicamente (no solo PDF). El documento se genera con un diseño limpio y sobrio (no replica visualmente la plantilla elegida, ya que Word no soporta los mismos efectos de diseño que el PDF), pensado para que abra bien en Word y sea fácil de leer por sistemas ATS.

## Texto plano para ATS

El botón "Texto" abre un panel con tu CV en texto sin formato (sin negritas, sin viñetas especiales, con encabezados en mayúscula tipo PERFIL / EXPERIENCIA / EDUCACIÓN), listo para copiar y pegar directo en los cuadros de texto de formularios de postulación que no aceptan archivos. También se puede descargar como `.txt`.
