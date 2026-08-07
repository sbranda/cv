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

## Aviso de cantidad de páginas

Si tu CV supera aproximadamente una página, aparece una franja de aviso debajo del encabezado ("Tu CV ocupa aproximadamente N páginas") con un link a sugerencias concretas para acortarlo (resumen muy largo, demasiadas experiencias cargadas, descripciones extensas, muchas habilidades listadas, etc.). Es una estimación calculada a partir de la altura real del contenido — puede variar un poco según el tamaño de papel configurado al imprimir.

## Comparar con un puesto

El botón "Comparar" en el encabezado abre un panel donde pegás la descripción de un puesto de trabajo. La IA analiza tu CV activo contra ese texto y devuelve:
- Un puntaje aproximado de qué tan alineado está tu CV con el puesto
- Las palabras clave y habilidades del aviso que **ya cubrís**
- Las palabras clave que **faltan** — para que sepas qué agregar o reformular antes de postularte

Usa la misma clave de Gemini configurada en el engranaje de configuración.

## Ajustar el largo del resumen

Debajo del campo de Resumen profesional hay chips ("1 frase", "2 frases", "3 frases", "5 frases") que reescriben el resumen con IA al largo elegido, sin perder la información más importante. Útil para adaptar el mismo perfil a un espacio más chico o para llenar más una plantilla con poco contenido.

## Traducir a inglés

Dentro de "Mis perfiles" hay un ícono de traducción (🌐) en cada fila. Al tocarlo, la IA traduce el contenido de ese perfil (puesto, resumen, experiencia, educación, habilidades, proyectos, becas, logros) al inglés profesional y crea un **perfil nuevo** llamado "[nombre] (English)" — el original en español no se toca. Nombres de empresas, instituciones y tecnologías se mantienen tal cual, solo se traduce el contenido descriptivo.

## Color personalizado

Junto a los 4 colores de acento fijos hay un quinto círculo con degradado arcoíris — tocalo para abrir el selector de color nativo del dispositivo y elegir cualquier color, no solo los 4 predefinidos. Se aplica igual que los demás: a los encabezados, líneas divisorias y acentos de las 19 plantillas.

## Orden de secciones por arrastre

En "Apariencia" ahora podés reordenar Resumen, Experiencia, Educación y Habilidades arrastrando desde el ícono de agarre (⋮⋮). Funciona con el dedo en el celular y con el mouse en escritorio. Aplica a 15 de las 19 plantillas — Moderno, Ejecutivo, Académico y Ventas/Marketing mantienen su orden fijo porque su diseño (columnas, secuencia académica formal, métricas primero) depende de eso. El orden elegido también se respeta al exportar a Word y a texto plano.

## Miniaturas con tus datos reales

La galería de plantillas ya no muestra formas grises genéricas — cada miniatura es una versión reducida en vivo de la plantilla real, con tu nombre, puesto y contenido actuales. Se actualiza automáticamente a medida que completás el CV.

## Indicador de guardado

Debajo del título, en el encabezado, aparece "Guardado hace X" — se actualiza cada vez que cambiás algo (se guarda al instante en `localStorage`) y el texto se refresca solo cada 15 segundos para reflejar el tiempo transcurrido.

## Deshacer / rehacer

Los botones ↶ ↷ en el encabezado deshacen y rehacen cambios en el contenido del perfil activo. Los cambios de texto se agrupan automáticamente (no hace falta deshacer letra por letra), y el historial se reinicia al cambiar de perfil. La foto no queda incluida en el historial, para que deshacer no se vuelva pesado.

## Mejoras para celular

- **Menú "Más" (⋯)**: Carta, Comparar, Texto (ATS) y Word se agruparon ahí para no saturar el encabezado con botones.
- **Pestañas Editar / Vista previa**: solo en pantallas chicas, debajo del encabezado — tocá para saltar directo a esa sección sin scrollear todo el formulario.
- **Botón de descarga fijo abajo**: en celular, "Descargar PDF" queda anclado en la parte inferior de la pantalla, al alcance del pulgar, en vez de solo arriba del todo.
- **Experiencias colapsables**: cada experiencia laboral se puede plegar tocando su título — muestra solo "Puesto · Empresa" y se expande al tocar, para que un CV con muchos trabajos cargados no vuelva eterno el formulario.
- **Modales a pantalla completa en celular**: los paneles (Perfiles, Comparar, Configuración, etc.) ahora se deslizan desde abajo y ocupan el ancho completo en pantallas chicas, en vez de ser una tarjeta flotante con márgenes — se siente más nativo. En pantallas grandes se ven igual que antes, centrados.

## Clave de API fija (opcional)

Cerca del inicio del archivo `index.html` hay una constante `HARDCODED_API_KEY = ""`. Si pegás tu clave de Gemini ahí (entre las comillas) antes de subir el archivo, la app la usa automáticamente sin pedirte que la cargues desde Configuración.

⚠️ **Importante**: esta es una página estática y pública. Cualquiera que abra el código fuente de tu sitio (Ctrl+U en el navegador) puede ver y copiar esa clave. Con Gemini esto normalmente significa que te pueden agotar la cuota gratuita, no un cobro inesperado — pero de todas formas es tu clave expuesta. Si en algún momento cargás una clave distinta desde el panel de Configuración, esa queda guardada en tu navegador y tiene prioridad sobre la fija en el código.

## Plantillas de dos columnas

Ahora hay 5 plantillas de dos columnas en total (antes solo Moderno y Ejecutivo):
- **Simetría**: dos columnas parejas al 50/50 con una línea divisoria fina — foto, contacto, educación y habilidades a la izquierda; perfil y experiencia a la derecha.
- **Prensa**: encabezado centrado, y el cuerpo (experiencia, educación, habilidades) fluye en dos columnas tipo periódico usando `column-count` de CSS, en vez de una división fija por secciones.
- **Panel**: barra lateral de color sólido (el acento elegido) a la **derecha** — al revés de Moderno, que la tiene oscura y a la izquierda.

Estas 3 nuevas, junto con Moderno y Ejecutivo, no soportan el reordenamiento por arrastre de secciones (su estructura en columnas depende de un orden fijo), tal como ya pasaba con esos dos.

## Corrección: página en negro extra al imprimir/guardar PDF

El contenedor raíz de la app tenía fondo oscuro y una altura mínima de pantalla completa sin excepción para impresión — eso hacía que, al imprimir, se colara un área negra debajo del CV y a veces una segunda página completamente en negro y vacía. Ya está corregido: ese contenedor ahora se resetea a fondo blanco y sin altura forzada específicamente en modo impresión.

## Corrección: falso positivo en el aviso de páginas

El aviso de "tu CV ocupa aproximadamente N páginas" estaba sobreestimando: medía el alto del CV en la vista previa (que se renderiza a 600px de ancho), pero al imprimir la hoja usa el ancho completo del papel, así que el texto real envuelve menos y ocupa menos alto que en la pantalla. Ahora la estimación aplica una corrección para acercarse más al alto real impreso. Sigue siendo una aproximación (puede variar según el papel y los márgenes de impresión configurados), pero debería dar muchos menos falsos positivos.

## Calibración A4

La estimación de páginas está calibrada específicamente para papel A4 (210×297mm, el estándar fuera de EE.UU.) con márgenes mínimos de impresión, que es lo más común al guardar un CV en PDF.

## Sin márgenes al imprimir

Se agregó una regla `@page { size: A4; margin: 0; }` para que el navegador imprima/guarde en PDF sin márgenes en blanco alrededor de la hoja, usando el espacio completo. Si igual ves márgenes al probarlo, revisá que en el cuadro de diálogo de impresión el campo "Márgenes" esté en "Ninguno" (o "None") — algunos navegadores respetan esta regla como sugerencia pero igual muestran el selector de márgenes, y si quedó en "Predeterminado" de una impresión anterior, puede pisar esta configuración.

## Vista previa en proporción A4

Las 19 plantillas ahora usan la proporción real de A4 (210×297mm) en la vista previa: con el ancho fijo de 600px, el alto pasó de 780px a 849px para que coincida exactamente con la relación de aspecto de una hoja A4, en vez de una proporción aproximada. Esto es solo el tamaño "base" (una hoja vacía); si cargás mucho contenido, la plantilla sigue creciendo hacia abajo como antes.

## Más plantillas de columna angosta a la izquierda

Se sumaron 3 plantillas con el patrón de columna compacta a la izquierda y el área principal ocupando el resto del ancho:
- **Columna**: barra clara con borde, tono sobrio y formal (variante clara de Moderno).
- **Franja**: barra de color sólido (tu acento elegido) a la izquierda — la versión "espejo" de Panel, que la tiene a la derecha.
- **Retrato**: columna angosta centrada en la foto, con la educación movida al área principal para dejar la barra lateral enfocada solo en identidad y contacto.

Con estas, ya hay 8 plantillas de dos columnas en total (Moderno, Ejecutivo, Simetría, Prensa, Panel, Columna, Franja, Retrato).

## Contacto al pie de la página

Debajo de "LinkedIn / portafolio" hay un casillero: "Mostrar el contacto al pie de la página en vez del encabezado". Al activarlo, el email/teléfono/ubicación/LinkedIn se mueven de debajo del nombre a una línea al final de la hoja, con una línea divisoria arriba. Solo funciona en **Clásico, Minimalista, Corporativo, Ejecutivo, Contorno y Revista** — en Revista además se combina con el numerito de página que ya tenía esa plantilla.

## Tomar foto con la cámara

Junto a "Subir foto" ahora hay un botón "Tomar foto" que abre directamente la cámara del celular (cámara frontal, ideal para una selfie de perfil) en vez de tener que ir a la galería primero. En computadoras de escritorio sin cámara, este botón normalmente abre el selector de archivos común.

## Restablecer orden de secciones

Debajo de la lista arrastrable de "Orden de las secciones" hay un botón "↺ Restablecer orden" que vuelve a Resumen → Experiencia → Educación → Habilidades (el orden original). Se desactiva automáticamente cuando ya estás en ese orden por defecto, para que sepas de un vistazo si tenés algo reordenado o no.

## Volver al lugar exacto del formulario

Antes, tocar "Editar" (en celular) siempre te llevaba al principio del formulario. Ahora recuerda dónde estabas justo antes de tocar "Vista previa", y "Editar" te devuelve ahí mismo, no al inicio.

## Cambio de nombre: HazTuCV

La app pasó a llamarse **HazTuCV** en todos lados: título de la pestaña, encabezado, y el nombre que aparece al instalarla en el celular (`manifest.json`). Si ya la tenías instalada de antes, es posible que tengas que desinstalarla y volver a instalarla para que el ícono/nombre en tu pantalla de inicio se actualice — algunos sistemas no refrescan el nombre de una PWA ya instalada automáticamente.
