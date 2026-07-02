<!--
  💡 CÓMO LEER ESTE ARCHIVO CON FORMATO
  Abrilo en Visual Studio Code y presioná  Ctrl + Shift + V
  (eso abre la Vista Previa de Markdown y lo vas a ver "lindo", con títulos,
  tablas y bloques de código en vez de texto plano).
  Atajo alternativo: Ctrl + K y después V  → abre la vista previa al costado.
-->

> 📖 **Para verlo con formato:** en VS Code presioná **`Ctrl + Shift + V`** (Vista Previa de Markdown).

# Clase 04 — HTML Semántico + Formularios + Multimedia

**Curso Front-End** · Módulo 1: Arquitectura y Maquetación Moderna (HTML y CSS) · **Unidad 04**

Contenidos de la clase:

1. HTML Semántico: El Poder del Significado
2. Formularios: Tu buzón de recolección de datos
3. Multimedia, Elementos Embebidos y Control de Visibilidad

---

## 🎯 Objetivos de la Clase

- Implementar etiquetas semánticas (`<header>`, `<main>`, `<aside>`, `<article>`) de forma correcta.
- Dominar el catálogo exhaustivo de tipos de `input` (email, date, color, etc.) y sus validaciones.
- Comprender la accesibilidad web básica mediante atributos ARIA y semántica.

---

## 1. HTML Semántico: El Poder del Significado

### ¿Qué es HTML Semántico?

Para construir interfaces web profesionales y modernas, no basta con agrupar elementos de manera visual en la pantalla. Es indispensable comprender cómo estructurar la información para que sea legible tanto para los usuarios como para los motores de búsqueda y las tecnologías asistivas. El verdadero desarrollo web profesional comienza cuando dejamos atrás las viejas prácticas de maquetación y adoptamos un enfoque estrictamente semántico.

### El control de los `div`

- **La evolución histórica (la "Divitis"):** en los inicios de la web se usaba la etiqueta genérica `<div>` para envolver absolutamente todo de forma estructural. No importaba si era un menú, un artículo o el pie de página; todo era un `<div>` con clases.
- **Semántica:** significa utilizar la etiqueta HTML específica que describa con precisión el significado y la función del contenido que lleva dentro, en lugar de usar etiquetas genéricas y preocuparnos solo por cómo se ve visualmente.

> ⚠️ **IMPORTANTE**
> Al usar HTML semántico (`<header>`, `<article>`, `<nav>`, `<footer>`) no estamos cambiando el diseño de la página, sino que le estamos dando "ojos" a los motores de búsqueda (SEO) y a los lectores de pantalla para personas con discapacidad visual. Es pasar de estructurar **para la pantalla** a estructurar **para el significado**.

### ¿Por qué es vital usar semántica?

- **SEO (posicionamiento en Google):** los robots exploradores leen el código. Si usás `<main>`, el robot sabe de inmediato que allí está el corazón de tu web.
- **Accesibilidad (A11y):** las personas con discapacidades visuales utilizan lectores de pantalla. La semántica guía al usuario: *"Estás entrando en la barra de navegación principal"*.

### Ventajas vs Desventajas

| ✅ Ventajas (Pros) | ❌ Desventajas (Contras) |
|---|---|
| **Accesibilidad perfecta:** los lectores de pantalla interpretan y estructuran la página al instante. | **Curva de aprendizaje inicial:** exige aprender el criterio de uso correcto de cada etiqueta en vez de tirar un `<div>`. |
| **SEO mejorado exponencialmente:** Google indexa y posiciona mucho mejor porque entiende de qué trata tu contenido. | **Mayor tiempo de desarrollo:** no sale "automático"; exige planificar la estructura con cuidado y mantener la disciplina de código. |

### Las etiquetas que dan arquitectura (Layout)

| Etiqueta | Para qué sirve |
|---|---|
| `<header>` | Encabezado de la página o de una sección. Suele contener el logo, el título principal y a veces un buscador. Puede haber más de uno (ej: dentro de un artículo). |
| `<nav>` | Espacio exclusivo para bloques de enlaces de navegación (menú principal, menú del footer, índice de contenidos). |
| `<main>` | Envuelve el contenido central y exclusivo de la página. Es **único**: no puede haber más de un `<main>` por documento. |
| `<section>` | Una gran sección temática. Agrupa contenido relacionado por un mismo tema (los "capítulos" de un libro). Casi siempre arranca con un título `<h2>`–`<h6>`. |
| `<article>` | Contenido totalmente independiente y autocontenido. Prueba de fuego: si lo cortás y lo pegás en otra página, ¿se sigue entendiendo solo? (un post, una review, un comentario, una card de producto). |
| `<aside>` | Información relacionada tangencialmente con el contenido principal. Si la sacás, la página se sigue entendiendo (barras laterales, publicidad, widgets, enlaces relacionados). |
| `<footer>` | Pie o cierre de la página o de una sección (copyright, contacto, enlaces legales, redes sociales). |

### Atributos ARIA (Accessible Rich Internet Applications)

- `role="button"`: le avisa al lector que este elemento actúa como un botón interactivo.
- `aria-label="..."`: le otorga un nombre descriptivo a un botón visual (ej: una **X** para cerrar).
- `tabindex`: permite que un elemento sea enfocable con la tecla **TAB** (`0` entra en orden, `-1` lo ignora).

---

## 2. Formularios

### ¿Qué son los Formularios?

Hasta ahora, la comunicación de nuestra web era unidireccional. Con los formularios, el usuario puede enviarnos datos.

El elemento `<input>` es el más versátil de HTML y su comportamiento cambia radicalmente según el atributo `type`.

Se suelen usar para:

- Login
- Registro
- Modificación de perfil de usuario
- Pasarelas de pago
- Contacto y soporte
- Creación de contenido
- Buscadores y filtros avanzados

### Los controles de usuario: el universo `<input>`

| Tipo (`type`) | Uso principal | Características |
|---|---|---|
| `text` | Nombres, búsquedas. | El valor por defecto. Texto simple. |
| `password` | Contraseñas. | Oculta los caracteres con puntos o asteriscos. |
| `email` | Correos electrónicos. | Valida automáticamente que tenga formato `@` y `.com`. |
| `number` | Edades, cantidades. | Muestra flechitas para subir/bajar y solo permite números. |
| `tel` | Teléfonos. | Abre el teclado numérico en celulares. |
| `date` | Fechas. | Abre un calendario desplegable nativo del navegador. |
| `color` | Selector de color. | Abre una paleta de colores para elegir. |
| `checkbox` | Opciones múltiples. | Permite seleccionar varias opciones al mismo tiempo. |
| `radio` | Opción única. | Obliga a elegir solo una opción de un grupo. |
| `range` | Deslizador. | Útil para volumen, precios o filtros de rango. |
| `file` | Subida de archivos. | Abre el explorador de archivos del sistema. |
| `submit` | Botón de envío. | El botón que gatilla la acción de enviar el formulario. |

> ⚠️ **IMPORTANTE — Atributo `name`**
> Nunca olvides poner el atributo `name` a tus inputs. Sin él, el servidor no sabrá qué dato es cuál cuando reciba el formulario.

### Otros controles: `<textarea>`, `<select>` y `<option>`

1. **`<textarea>`:** se usa cuando el `<input type="text">` queda chico. Está pensado para párrafos, comentarios o descripciones. A diferencia de un input común, se puede estirar visualmente y es una etiqueta de apertura y cierre.
2. **`<select>` y `<option>`:** se usan en combo para crear listas desplegables. El `<select>` es el contenedor principal y los `<option>` son cada una de las opciones que el usuario puede elegir.

```html
<label for="mensaje">Tu consulta:</label>
<textarea id="mensaje" rows="4" cols="50"></textarea>

<label for="pais">País:</label>
<select id="pais">
  <option value="ar">Argentina</option>
  <option value="br">Brasil</option>
</select>
```

### La conexión vital de usabilidad: `label` e `input`

- El `<input>` es la caja y el `<label>` es el texto descriptivo.
- Para conectarlos, el atributo `for` del label debe ser **idéntico** al `id` del input.
- Al hacer clic en el texto del label, el cursor salta dentro del input, mejorando muchísimo la UX.

### Métodos de transporte HTTP: GET vs POST

| Característica | Método **GET** (público y rápido) | Método **POST** (privado y seguro) |
|---|---|---|
| ¿Cómo viajan los datos? | Visibles en la URL del navegador. | Ocultos en el cuerpo del mensaje hacia el servidor. |
| Nivel de seguridad | Inseguro. Cualquiera que mire la pantalla ve la información. | Seguro. Es el método válido para contraseñas o tarjetas. |
| Historial y favoritos | Se guardan en el historial. Se pueden compartir. | No se puede compartir ni guardar en favoritos. |
| Caso de uso real | Buscadores web o filtros de productos. | Registros, inicios de sesión (login) y envío de archivos pesados. |

> ⚠️ **IMPORTANTE:** este tema se verá con mayor profundidad y dedicación más adelante.

### Ejemplo de un formulario estructurado

```html
<!-- Enviamos los datos ocultos por POST al servidor imaginario /registro -->
<form action="/registro" method="POST">
    <!-- El atributo 'for' debe ser IDÉNTICO al 'id' del input para vincularlos -->
    <label for="nombre_usuario">Nombre Completo:</label>
    <input type="text" id="nombre_usuario" name="nombre_real" placeholder="Ej: Juan Perez" required>

    <label for="clave">Crea una Contraseña:</label>
    <input type="password" id="clave" name="password_secreta" required>

    <label for="correo">Tu E-mail de contacto:</label>
    <input type="email" id="correo" name="email_contacto">

    <!-- Agrupación semántica de opciones (radio buttons) -->
    <fieldset>
        <legend>Elige tu Plan de Suscripción</legend>
        <!-- Ambos comparten name="plan" para que compitan entre sí -->
        <input type="radio" name="plan" id="basico" value="plan_basico">
        <label for="basico">Plan Básico (Gratis)</label>
        <input type="radio" name="plan" id="pro" value="plan_pro">
        <label for="pro">Plan Profesional ($10)</label>
    </fieldset>

    <button type="submit">Enviar mis datos al Servidor</button>
</form>
```

---

## 3. Multimedia, Elementos Embebidos y Control de Visibilidad

### ¿Qué son los multimedia y elementos embebidos?

El manejo de imágenes, audios, videos y la capacidad de integrar recursos externos o controlar cómo se muestran en pantalla de forma nativa nos brinda las herramientas esenciales para maquetar interfaces ricas, dinámicas y profesionales.

### Inserción de imágenes

```html
<img src="img/foto-perfil.jpg" alt="Hombre de 30 años sonriendo con camisa azul" width="300">
```

> ⚠️ **IMPORTANTE — Atributo `alt`**
> El atributo `alt` (texto alternativo) es estrictamente obligatorio en el mundo profesional. Sirve como respaldo si la imagen no carga y es esencial para los lectores de pantalla.

### Etiquetas nativas de audio y video

- En la web moderna no necesitamos plugins de terceros (como Flash) para reproducir videos.
- HTML5 nos da las etiquetas nativas `<audio>` y `<video>`, que comparten los mismos atributos de control.

| Atributo | Función visual / técnica |
|---|---|
| `src` | La ruta hacia tu archivo de video (`.mp4`) o audio (`.mp3`). |
| `controls` | Muestra los botones clásicos del reproductor. Sin esto, el usuario no puede interactuar. |
| `autoplay` | Fuerza la reproducción al cargar. (Invasivo, usar con moderación). |
| `loop` | Reinicia automáticamente al terminar (bucle infinito). |
| `muted` | Obliga a iniciar sin sonido. (Los navegadores modernos lo exigen para permitir `autoplay`). |

```html
<video src="videos/lluvia-fondo.mp4" width="100%" autoplay controls muted loop></video>
<audio src="mi-audio.mp3" controls></audio>
```

Tienen la flexibilidad de permitirnos usar archivos de audio y video **local** (guardados dentro de las carpetas de nuestro propio proyecto, ideales para sonidos de interfaz o videos de fondo) y también **remoto**, apuntando a una URL externa como APIs o plataformas de streaming.

### Iframes: los portales mágicos

Nos permiten incrustar una página web entera o partes interactivas (como Google Maps, YouTube, Spotify o redes sociales) dentro de un rectángulo de nuestra propia página. También se usan para integrar sistemas antiguos (legacy) sin reescribir su código y para aislar de forma segura componentes críticos de terceros, como pasarelas de pago o widgets de chat.

```html
<!-- Ejemplo: un mapa de Google Maps incrustado -->
<iframe src="https://www.google.com/maps/embed?pb=..." width="600" height="450"
        style="border:0;" allowfullscreen="" loading="lazy"></iframe>
```

### El duelo del renderizado: `display: none` vs `visibility: hidden`

A nivel visual, ambas propiedades hacen que un elemento deje de verse. Sin embargo, el navegador las procesa de forma completamente distinta en la estructura y el flujo de la página.

| Regla CSS | ¿Qué efecto visual tiene? | ¿Qué pasa con el espacio en la página? |
|---|---|---|
| `display: none;` | Desaparece totalmente. | Físicamente desaparece. Los demás elementos se acomodan y ocupan su lugar. |
| `visibility: hidden;` | Se vuelve invisible. | Mantiene el hueco. Sigue ocupando su espacio físico exacto. |

- Usá `display: none;` cuando quieras ocultar algo por completo y que el resto del diseño aproveche ese espacio (por ejemplo, al colapsar un menú desplegable).
- Usá `visibility: hidden;` cuando necesites que un elemento desaparezca temporalmente (por ejemplo, un mensaje de error o un ícono de carga), pero no quieras que el diseño pegue un salto al ocultarse.

---

## 📝 Ejercicio de Clase

- Creá una estructura de layout semántica con `<header>`, `<main>` y `<footer>`.
- Dentro de `<main>`, creá un formulario de registro de contacto profesional.
- El formulario debe contener:
  - Nombre (obligatorio, mínimo 3 caracteres).
  - Email (obligatorio, tipo email).
  - Contraseña (obligatorio, mínimo 8 caracteres).
  - Teléfono (validado con patrón numérico).
  - Un desplegable `<select>` para elegir el país.
  - Un checkbox para aceptar "Términos y condiciones".
- Añadí un botón de tipo `submit` con diseño limpio. Probalo en el navegador intentando enviar datos incorrectos para ver las advertencias nativas.

> 💡 La solución comentada está en [`desafio_clase.html`](desafio_clase.html).

---

## 📚 Documentación oficial de tecnologías

- **CSS:** <https://developer.mozilla.org/es/docs/Web/CSS>
- **HTML:** <https://developer.mozilla.org/es/docs/Web/HTML>
- **JavaScript:** <https://developer.mozilla.org/es/docs/Web/JavaScript>

---

**¡Muchas gracias! ¡Hasta la próxima!**

Centro de e-Learning UTN.BA
