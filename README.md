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

## Ícono nuevo

Reemplacé el ícono de la app: una "H" serif (de HazTuCV) con un acento arriba a la derecha, en verde bosque (el mismo tono del acento por defecto de la app) con fondo degradado sutil. Genera los tres tamaños que pide `manifest.json` (192px, 512px, y una versión 512px "maskable" con más margen para que no se corte cuando el sistema operativo la recorta en círculo).

## Corrección: zoom automático al tocar un campo (iPhone)

En iOS Safari, cualquier campo de texto con letra menor a 16px hace que la pantalla haga zoom automáticamente al tocarlo para escribir. Los campos de la app usaban 14px. Ahora, solo en pantallas chicas (celular), se fuerza 16px en todos los inputs, textareas y selects — en pantallas grandes se mantiene el tamaño compacto de siempre.

## Corrección: cambiar tipografía no se veía reflejado

Tailwind (el framework de estilos) ya trae su propia clase `.font-sans` predefinida, que competía con la que usa la app para aplicar la tipografía elegida (Clásica/Moderna/Elegante) — dependiendo del orden de carga, la de Tailwind podía ganar y dejar la tipografía sin cambios visibles. Ahora la regla de la app tiene prioridad forzada, así que cambiar la tipografía en "Apariencia" se aplica siempre.

## Corrección: no se podía volver a "Editar" desde la vista previa (celular)

La barra de pestañas "Editar" / "Vista previa" no era fija — al bajar a la vista previa, se scrolleaba fuera de la pantalla junto con todo lo demás, sin dejar ningún botón visible para volver. Ahora el encabezado y la barra de pestañas quedan fijos juntos arriba de la pantalla todo el tiempo, así "Editar" siempre está a mano.

## El teclado ya no tapa el campo que estás editando

En celular, al tocar un campo cerca del borde inferior de la pantalla, ahora la app espera a que el teclado termine de abrirse y centra ese campo automáticamente, para que no quede escondido detrás del teclado.

## Scroll automático al agregar experiencia/educación

Al tocar "+ Agregar experiencia" o "+ Agregar educación", la app ahora salta automáticamente hasta esa nueva entrada, para que no tengas que buscarla scrolleando manualmente.

## Cerrar modales deslizando hacia abajo

En celular, todos los paneles (Perfiles, Plantillas, Carta, Comparar, Configuración, Texto ATS, Consejos, Importar) tienen ahora una barrita chica arriba — agarrala y deslizá hacia abajo para cerrarlos, como en una app nativa. Si no la deslizás lo suficiente, el panel vuelve a su lugar solo. En pantallas grandes (tablet/desktop) esa barrita no aparece, ya que ahí los modales son tarjetas centradas, no hojas deslizables.

## Botón flotante "volver arriba"

En celular, al scrollear más de una pantalla hacia abajo aparece un botón circular flotante (con el color de acento elegido) abajo a la derecha, arriba de la barra de "Descargar PDF". Te lleva de vuelta al principio del formulario con un toque.

## Recorrido guiado de bienvenida

La primera vez que se abre la app, aparece un recorrido de 6 pasos explicando las funciones principales (plantillas, apariencia, IA, herramientas extra, descarga). Se puede saltar en cualquier momento con "Omitir". Una vez visto, no vuelve a aparecer solo — queda guardado en `localStorage`. Para volver a verlo cuando quieras, andá al menú **⋯ → Ver tutorial**.

## Clave de Gemini oculta con un Worker intermediario (opcional)

Si preferís que tu clave de Gemini no quede expuesta en el código público del sitio, podés usar `haztucv-gemini-proxy-worker.js` como una función de Cloudflare Workers (plan gratuito) que hace de intermediario.

**Cómo configurarlo:**
1. Entrá a [dash.cloudflare.com](https://dash.cloudflare.com) → creá una cuenta gratis si no tenés
2. Andá a **Workers & Pages → Create → Create Worker**
3. Pegá el contenido de `haztucv-gemini-proxy-worker.js` en el editor y hacé **Deploy**
4. Andá a **Settings → Variables and Secrets → Add**:
   - `GEMINI_API_KEY` (tipo **Secret**) → tu clave real de Gemini
   - `GEMINI_MODEL` (tipo Text, opcional) → `gemini-3.6-flash`
5. Copiá la URL que te da Cloudflare (algo como `https://tu-worker.tu-usuario.workers.dev`)
6. En `index.html`, pegá esa URL en la constante `PROXY_URL` (cerca del principio del archivo)

Con esto configurado, tu clave real de Gemini nunca viaja al navegador ni queda en ningún archivo público — vive únicamente como Secret dentro de Cloudflare. `HARDCODED_API_KEY` y el panel de Configuración dejan de hacer falta (aunque siguen funcionando como respaldo si en algún momento borrás `PROXY_URL`).

## Vaciar formulario

En el menú **⋯** hay una nueva opción en rojo: "Vaciar formulario". Borra todos los datos cargados en el perfil activo (vuelve a los valores en blanco, incluida foto, plantilla, color y todo lo demás), pidiendo confirmación antes. Si te arrepentís, se puede deshacer con el botón ↶.

## Subtítulo más corto en celular

En celular, el texto debajo de "HazTuCV" ahora muestra solo "Guardado hace X" — se ocultó "editor + vista previa en vivo" para que no quede largo ni se corte. En pantallas grandes se sigue viendo completo.

## Pie de página

Al final de la app (debajo del editor y la vista previa) ahora aparece "Desarrollado por @sebranda".

## 3 plantillas nuevas: familia "Bandera"

Inspiradas en un diseño de referencia con franja superior de color y foto que se sobrepone al borde:
- **Bandera**: franja de color arriba, foto circular a la izquierda que se sobrepone al borde inferior de la franja, nombre en mayúsculas grande. Debajo, dos columnas (Contacto+Educación / Acerca de mí+Habilidades) y Experiencia laboral a todo el ancho.
- **Bandera Central**: misma idea pero con la foto y el nombre centrados, resumen centrado debajo, más simétrica y formal.
- **Bandera Línea**: versión sin bloque de color sólido — reemplaza la franja por una línea fina de acento debajo del encabezado, para quien prefiera algo más restrained.

Ya son 28 plantillas en total. Nota: la plantilla de referencia que compartiste incluía campos como edad, DNI, nacionalidad y estado civil, que la app no maneja — estas plantillas usan los campos existentes (nombre, puesto, contacto, foto, resumen, experiencia, educación, habilidades).

## Corrección: nombre pegado al margen en "Bandera Central"

Un margen negativo mal aplicado empujaba el nombre hacia arriba en vez de hacer que la foto se sobrepusiera al borde de la franja (que era la intención original). Se corrigió: en esta plantilla la foto queda completa dentro de la franja de color, sin sobreponerse — el efecto de sobreposición se mantiene solo en "Bandera" (la versión con foto a la izquierda).

## Primera pasada de accesibilidad

Empezamos a mejorar la accesibilidad de la app. Lo que ya está hecho:

- **Reordenar secciones sin arrastre**: además de arrastrar, ahora hay botones ↑↓ para mover cada sección — funciona con teclado o cualquier dispositivo señalador, no solo con gestos táctiles/mouse.
- **Cerrar modales con Escape**: los 9 paneles (Perfiles, Plantillas, Carta, Comparar, Configuración, Texto ATS, Consejos, Importar, Tutorial) se cierran con la tecla Escape, además del botón X o deslizando.
- **Etiquetas para lectores de pantalla**: botones de solo ícono (cerrar, deshacer/rehacer, menú "Más", volver arriba) ahora tienen `aria-label` describiendo su función.
- **Foto de perfil con texto alternativo**: describe "Foto de perfil de [nombre]" en vez de quedar vacía.
- **Reducir movimiento**: si tenés esa opción activada en tu celular/computadora (para mareos, migrañas, o sensibilidad al movimiento), la app desactiva sus animaciones automáticamente.
- **Foco visible al navegar con teclado**: un contorno de color claro marca en qué botón/campo estás parado al usar Tab.
- **Enlace "Saltar al contenido principal"**: aparece al navegar con teclado, para no tener que pasar por todos los botones del encabezado cada vez.

**Esto es un primer avance, no una accesibilidad "total" o certificada** — cumplir el estándar completo (WCAG AAA) para todo tipo de discapacidad es un trabajo de fondo constante, no algo que se termina de una vez. Quedan pendientes cosas como: contraste de color verificado en las 28 plantillas, navegación completa por teclado del editor de arrastre de fotos, y pruebas reales con lectores de pantalla (NVDA, JAWS, VoiceOver).

## Nueva sección opcional: Información adicional

Un campo de texto libre, activable como las demás secciones opcionales (Proyectos, Publicaciones, Becas, Logros) desde los chips debajo de Habilidades. Sirve para agregar cualquier cosa que quieras — disponibilidad, licencia de conducir, idiomas adicionales, o cualquier otro dato que prefieras incluir a tu criterio.

Disponible en **4 plantillas**: Clásico, Minimalista, Corporativo y Compacto (las mismas de una columna donde ya funciona bien el resto del contenido). También se incluye en las exportaciones a Word y texto plano (ATS).

## Tutorial actualizado

El recorrido guiado (⋯ → Ver tutorial) ahora tiene 7 pasos en vez de 6: corregí "25 plantillas" a "28", y sumé un paso nuevo sobre perfiles múltiples y deshacer/rehacer que antes no estaba cubierto. Como ya lo viste antes, no te va a volver a aparecer solo — si querés verlo actualizado, andá a ⋯ → Ver tutorial.

## Copia de seguridad de todos los perfiles

En el panel "Perfiles" hay dos botones nuevos, abajo del todo:
- **"Descargar copia de seguridad"**: baja un archivo `.json` con todos tus perfiles (nombre, contenido, plantilla, color — todo).
- **"Restaurar desde archivo"**: elegís ese archivo para recuperar todos tus perfiles. Pide confirmación antes, porque **reemplaza** todo lo que tenías cargado en ese momento — conviene descargar una copia de seguridad actual antes de restaurar, por las dudas.

Guardá ese archivo en algún lugar seguro (Google Drive, email a vos mismo, etc.) — es tu única protección real si algún día borrás datos del sitio sin querer, cambiás de celular, o el navegador pierde el `localStorage` por algún motivo.

## Detector de verbos débiles

En cada experiencia laboral, junto a "Mejorar con IA" hay un nuevo botón: **"🏳 Verbos débiles"**. Analiza la descripción y te marca frases genéricas ("hice", "trabajé en", "fui responsable de", etc.) con 2-3 sugerencias de verbos de acción más fuertes para cada una — a diferencia de "Mejorar con IA", no reescribe nada solo, te muestra las sugerencias para que decidas vos qué incorporar y cómo.

## Línea de salto de página en la vista previa

Cuando tu CV ocupa más de una página, ahora ves una línea punteada naranja con la etiqueta "Fin de página 1 (estimado)" directamente superpuesta en la vista previa, marcando dónde terminaría exactamente la primera hoja — sin tener que abrir el aviso ni los consejos para acortar. Usa el mismo cálculo (calibrado para A4) que ya tenía el aviso, así que ambos coinciden. No aparece al imprimir/exportar, es solo una guía en pantalla.

## Comparar plantillas lado a lado

Dentro de la galería de plantillas hay un nuevo botón "Comparar" (junto al título). Abre un panel con dos selectores — elegís cualquiera de las 28 plantillas en cada uno, y las ves renderizadas con tu contenido real, una al lado de la otra (apiladas en celular, lado a lado en pantallas más grandes). Cada una tiene su botón "Usar esta plantilla" para aplicarla directo, sin tener que volver a la galería.

## Corrección: previsualizaciones angostas en "Comparar plantillas"

El recorte que achica cada plantilla usaba un ancho de recuadro que no coincidía con el ancho real después de escalarla, así que se veía cortada/angosta. Corregido usando la misma técnica que ya funcionaba bien en las miniaturas de la galería — ahora se ve la plantilla completa, más ancha y clara.

## Modo claro para el editor

Nuevo botón ☀️/🌙 en el encabezado, junto al menú "Más". Cambia el panel del editor (formulario de la izquierda) a fondo blanco con texto oscuro, para quien prefiera trabajar así. La vista previa del CV, los modales y el resto de la app se mantienen igual — es específicamente para el panel de edición. Se guarda tu preferencia, así que la próxima vez que entres va a recordar cómo lo dejaste.

Nota técnica: el modo claro funciona anulando las clases de color oscuro existentes en vez de reescribir cada elemento — cubre los casos más comunes (fondos, textos, bordes, campos de formulario) pero puede haber algún detalle chico sin cubrir perfectamente. Si notás algo que se ve raro en modo claro, contame qué elemento puntual y lo ajusto.

## Tutorial actualizado (de nuevo)

Sigue en 7 pasos, pero ahora menciona: comparar plantillas lado a lado, modo claro del editor, el detector de verbos débiles, la copia de seguridad de perfiles, y la línea de salto de página. Andá a ⋯ → Ver tutorial para verlo actualizado.

## Segunda pasada de accesibilidad

Revisé todo lo agregado desde la primera pasada (modo claro, comparar plantillas, verbos débiles, copia de seguridad, línea de salto de página, información adicional) y completé lo que faltaba:

- **11 botones de solo ícono** que tenían `title` (tooltip visual) pero no `aria-label` (lo que necesita un lector de pantalla): agregar experiencia/educación/proyecto/publicación/beca/logro, y ocultar cada una de las 5 secciones opcionales.
- **Línea de salto de página**: marcada como puramente decorativa para lectores de pantalla (`aria-hidden`), ya que el aviso de "ocupa N páginas" ya da esa misma información de forma accesible.
- Hice una búsqueda automatizada por todo el archivo para confirmar que no queda ningún botón de solo ícono sin etiqueta accesible.

Sigue siendo un trabajo en progreso, no una certificación completa — pero cada pasada cubre más terreno real.

## Detector de brechas laborales

Junto al encabezado de "Experiencia" (visible cuando tenés 2 o más experiencias cargadas) hay un nuevo botón "🔍 Revisar brechas". Analiza los períodos de tus trabajos y te avisa si hay huecos de 6 meses o más sin explicar entre uno y el siguiente. No juzga ni completa nada por vos — solo te avisa para que decidas si conviene aclararlo (estudios, viaje, cuidado familiar, etc.) en el resumen o en alguna experiencia.

## Corrector ortográfico en los campos de texto

Activé el corrector ortográfico nativo del navegador en todos los campos de texto y áreas de texto del editor (35 en total) — el mismo que ya usás en cualquier sitio web, con el subrayado rojo ondulado debajo de las palabras que no reconoce. La app ya estaba configurada en español (`lang="es"`), así que revisa contra el diccionario correcto sin configuración extra de tu parte.

Nota: como el corrector depende del navegador (no de la app), su calidad varía según cuál uses — Chrome, Edge y Safari lo traen activado por defecto en español si tu dispositivo tiene ese idioma configurado.

## Nombre de archivo inteligente

Los tres formatos de descarga (PDF, Word, texto plano) ahora arman el nombre del archivo solos, combinando tu nombre y puesto — por ejemplo "Ana_Torres_Diseñadora_UX". Si el nombre o el puesto están vacíos, usa lo que haya disponible; si no cargaste nada todavía, cae en "CV" como antes.

Para el PDF específicamente: como el nombre del archivo lo decide el navegador en el diálogo de "Guardar como PDF" (no la app), lo logramos cambiando el título de la pestaña justo antes de imprimir — la mayoría de los navegadores usan ese título como nombre sugerido. Se restaura solo después.

## Aviso de nueva versión disponible

Cuando actualice la app y vuelvas a abrirla, ahora te va a aparecer un cartel discreto abajo del encabezado: "Hay una versión nueva de HazTuCV disponible — Tocá para actualizar". Al tocarlo, se actualiza y recarga sola. Ya no hace falta que te avise yo cada vez — la app misma te lo va a decir.

Cambio técnico importante: antes, cada actualización se activaba en silencio apenas se detectaba (lo que a veces generaba justamente los problemas de "versión vieja pegada" que tuvimos que depurar antes). Ahora la nueva versión queda esperando tu confirmación explícita antes de activarse — más previsible y menos propenso a esos problemas.

## Sugerencia de plantilla según el puesto

Al abrir la galería de plantillas, ahora hay un campo arriba de todo: "¿No sabés cuál elegir? Contanos a qué te postulás". Escribís el tipo de puesto o rubro (por ejemplo "analista contable en un banco" o "diseñadora gráfica freelance"), tocás "Sugerir", y la IA recomienda una de las 28 plantillas con una breve explicación de por qué — con un botón para aplicarla directo.

## Tutorial actualizado (tercera vez)

Sigue en 7 pasos. Ahora también menciona: sugerencia de plantilla por IA según el puesto, el detector de brechas laborales, y el nombre de archivo inteligente al descargar. Andá a ⋯ → Ver tutorial para verlo actualizado.

## Tercera pasada de accesibilidad

Revisé lo agregado desde la pasada anterior (sugerencia de plantilla por IA, detector de brechas, aviso de nueva versión) y corregí:

- El campo de texto "¿A qué te postulás?" ahora tiene una etiqueta accesible (antes solo tenía el texto de ejemplo que desaparece al escribir, insuficiente para un lector de pantalla).
- Los íconos decorativos del aviso de "nueva versión disponible" y del aviso de "ocupa N páginas" (este último se nos había pasado en pasadas anteriores) ahora están marcados como puramente visuales.
- Búsqueda automatizada completa: no queda ningún botón de solo ícono sin etiqueta accesible en toda la app.

## Tamaño de letra del panel del editor

Nuevo botón con un ícono "A" en el encabezado, junto a ☀️/🌙. Cada toque alterna entre tres tamaños: Pequeño → Normal → Grande → Pequeño... Afecta solo el panel del editor (formulario de la izquierda) — igual que el modo claro, la vista previa del CV no cambia. Se guarda tu preferencia entre sesiones.

## Consejos sobre datos personales sensibles

Debajo de los chips de secciones opcionales (Proyectos, Publicaciones, etc.) hay un nuevo enlace: "¿Incluyo edad, discapacidad, u otros datos personales?". Abre un panel con un resumen breve y neutral sobre 5 temas — edad/fecha de nacimiento, discapacidad, estado civil, nacionalidad, y foto — explicando en qué casos suele convenir incluirlos o no, según el país y el tipo de puesto. No es asesoramiento legal, es información general para que decidas vos con más contexto. Si después de leerlo querés incluir alguno, podés hacerlo con total libertad desde "Información adicional".

## Todo el texto del editor en blanco

Cambié los 41+ textos grises del panel del editor (etiquetas, chips, textos de ayuda, texto tipeado en los campos) a blanco. La única excepción a propósito: el texto de ejemplo (placeholder) de los campos vacíos se mantiene gris — si también fuera blanco, sería indistinguible de contenido real ya cargado.

Nota: en modo claro (☀️), este blanco se sigue convirtiendo automáticamente a texto oscuro gracias a la regla que ya tenía armada, así que ese modo sigue funcionando bien sin tocar nada más.

## Tutorial actualizado (cuarta vez)

Sigue en 7 pasos. Ahora también menciona: el botón de tamaño de letra de la interfaz, y la guía sobre datos personales sensibles (edad, discapacidad, etc.). Andá a ⋯ → Ver tutorial para verlo actualizado.

## Cuarta pasada de accesibilidad (con una corrección propia en el camino)

Encontré varios íconos decorativos de sesiones anteriores (menú ⋯, botones de agregar/borrar en Perfiles, etc.) sin marcar como puramente visuales — corregidos.

**Nota de transparencia**: en el primer intento de corregirlos en bloque, cometí un error — el reemplazo automático también afectó por accidente a los componentes que arman el contenido real del CV (foto, experiencia, educación, habilidades) en las 28 plantillas, marcándolos como invisibles para lectores de pantalla. Esto era un problema serio: hubiera ocultado el currículum completo de las herramientas de accesibilidad, el efecto exactamente contrario al buscado. Lo detecté antes de entregarte los archivos, lo revertí, y lo corregí de nuevo de forma más precisa (limitado únicamente a los íconos reales, no a los componentes de contenido). Verificado con una revisión manual del código además de las pruebas automáticas.

## Exportar como imagen (PNG)

En el menú ⋯ hay una nueva opción: "Descargar imagen (PNG)". Convierte tu CV en una imagen de alta resolución (fondo blanco, doble resolución para que se vea nítida), lista para compartir directo por WhatsApp, redes sociales, o cualquier lugar donde la otra persona no tenga ganas de abrir un PDF. Usa el mismo nombre de archivo inteligente que PDF/Word/texto plano.

Nota técnica: la primera vez que se usa, carga una librería externa (html2canvas) bajo demanda — puede tardar un segundo extra esa primera vez.

## Plantillas favoritas

En la galería de plantillas, cada tarjeta tiene ahora una estrellita arriba a la derecha — tocala para marcar esa plantilla como favorita. Las que marques aparecen en una sección nueva "Favoritas" arriba de todo en la galería, antes de las categorías, para no tener que recorrer las 28 cada vez. En la PWA, tus favoritas quedan guardadas entre sesiones.

De paso, corregí un bug chiquito que ya existía: el tilde que marca el perfil activo en el panel de Perfiles no estaba tomando el color de acento correctamente (un límite técnico del sistema de íconos que arreglé de raíz).

## Aviso antes de cambiar a una plantilla que ocuparía más páginas

Ahora, al tocar una plantilla en la galería (o aplicar una sugerencia de la IA), la app la mide en segundo plano antes de aplicarla. Si detecta que pasarías de, por ejemplo, 1 a 2 páginas, te avisa con un mensaje de confirmación antes de aplicarla — podés cancelar y seguir viendo otras opciones, o confirmar si te da igual. Antes te enterabas recién después de haber cambiado, con el aviso amarillo de siempre.

## Recordatorio de CV desactualizado + indicador de sin conexión

**Recordatorio de CV desactualizado**: cada perfil guarda ahora la fecha de la última edición, actualizada automáticamente cada vez que cambiás algo. Si pasan más de 6 meses sin tocar el perfil activo, aparece un aviso discreto (celeste, con ícono de reloj) debajo del encabezado — desaparece solo apenas volvés a editar algo. Los perfiles creados antes de esta actualización no muestran el aviso hasta la próxima vez que los edites (no sabemos cuándo fue su última edición real).

**Indicador de sin conexión**: si perdés la conexión a internet, aparece un texto chico junto al indicador de "Guardado hace X" en el encabezado — "📶 Sin conexión — se sigue guardando". Como la app funciona offline gracias al service worker, tus cambios se siguen guardando en el celular normalmente aunque no tengas internet.

## Código QR con enlace a LinkedIn/portafolio

En "Datos personales" hay un nuevo checkbox: "Incluir código QR con el enlace de LinkedIn/portafolio" — usa el valor que ya cargaste en el campo LinkedIn/Portafolio. Al activarlo, aparece un código QR chico cerca del encabezado, útil para currículums impresos: quien lo reciba lo escanea con la cámara del celular y entra directo a tu perfil, sin tener que tipear nada.

Disponible en las mismas 6 plantillas que ya soportan "contacto al pie": Clásico, Minimalista, Corporativo, Ejecutivo, Contorno y Revista.

Nota técnica: el QR se genera con una librería que corre en tu propio navegador (no se manda tu LinkedIn a ningún servicio externo), y funciona incluso sin conexión una vez que se cargó la primera vez.
