# 🌳 Resumen Clase 17 — DOM, Selectores, Estilos y Eventos

> Documento de repaso de todo lo visto en la clase.
> Cada sección indica en qué carpeta de ejemplos (`1/`, `2/`, `3/`, `4/`) se practicó.

---

## 📑 Índice

1. [Qué es el DOM](#1-qué-es-el-dom)
2. [Dónde va el script](#2-dónde-va-el-script)
3. [Selectores](#3-selectores)
4. [NodeList vs HTMLCollection](#4-nodelist-vs-htmlcollection) ⭐
5. [Modificar contenido](#5-modificar-contenido)
6. [Modificar estilos con `.style`](#6-modificar-estilos-con-style)
7. [Eventos](#7-eventos)
8. [Crear e insertar elementos](#8-crear-e-insertar-elementos)
9. [Proyecto integrador](#9-proyecto-integrador-carpeta-4)
10. [Chuleta final](#-chuleta-final)

---

## 1. Qué es el DOM

Cuando el navegador abre un `.html`, **no muestra el archivo**: lee su texto y con él construye **un árbol de objetos en memoria**. Ese árbol es el **DOM** (*Document Object Model*).

JavaScript nunca toca el archivo: toca el árbol.

| | |
| :--- | :--- |
| **HTML** | el plano de la casa |
| **DOM** | la casa construida |
| **JavaScript** | el albañil que entra a mover muebles |

Al recargar, la casa se reconstruye desde el plano: **todo cambio del DOM es temporal**. Por eso no hay nada que romper.

```js
document                    // el punto de entrada a todo el árbol
console.dir(elemento)       // ver el OBJETO y sus propiedades (no el HTML)
elemento.parentElement      // su padre
elemento.children           // sus hijos
```

---

## 2. Dónde va el script

📁 *carpeta 1*

El navegador lee el HTML de arriba hacia abajo. Cuando encuentra un `<script>`, **frena y lo ejecuta**. Si el script está arriba, la mitad del árbol todavía no existe.

```js
const titulo = document.querySelector("h1");
titulo.textContent = "Chau";
// 💥 Cannot read properties of null  ← el h1 todavía no existía
```

**Dos soluciones:**

```html
<!-- A) el <script> al final del <body> -->
<body>
  <h1>Hola</h1>
  <script src="index.js"></script>
</body>
```

```js
// B) envolver todo en DOMContentLoaded (el "cinturón de seguridad")
document.addEventListener("DOMContentLoaded", function () {
  // todo tu código acá adentro
});
```

> El **90%** de los `null` de la cursada salen de acá. Ante ese error, lo primero es mirar dónde está el `<script>`.

---

## 3. Selectores

📁 *carpetas 1 y 2*

### Los 2 modernos (usá estos)

```js
document.querySelector(".titulo")      // el PRIMERO que coincida, o null
document.querySelectorAll(".item")     // TODOS → NodeList
```

### Los 3 clásicos

```js
document.getElementById("parrafo")           // ⚠️ SIN el #
document.getElementsByClassName("item")      // ⚠️ SIN el punto
document.getElementsByTagName("li")
```

### ⭐ La clave: `querySelector` habla CSS

| En el CSS | En `querySelector` | En `getElementBy...` |
| :--- | :--- | :--- |
| `.item { }` | `querySelector(".item")` | `getElementsByClassName("item")` |
| `#parrafo { }` | `querySelector("#parrafo")` | `getElementById("parrafo")` |
| `li { }` | `querySelector("li")` | `getElementsByTagName("li")` |

Los errores de mezclar las dos sintaxis:

```js
document.getElementById("#parrafo")   // ❌ null (el # sobra)
document.querySelector("item")        // ❌ null (busca una etiqueta <item>)
```

---

## 4. NodeList vs HTMLCollection

📁 *carpeta 2* — **el tema central de la clase**

### `NodeList`

- **Contenido:** puede incluir **cualquier tipo de nodo** (elementos HTML, texto, comentarios).
- **Naturaleza:** generalmente **estática** (por ejemplo, la que devuelve `querySelectorAll()`), lo que significa que **no cambia si el DOM se modifica**. *(Excepción: `childNodes` es dinámica.)*
- **Iteración:** cuenta con el método nativo **`.forEach()`**.
- **Casos de uso:** cuando usás selectores CSS avanzados, necesitás iterar directamente con `.forEach()`, o querés una **"fotografía fija"** de la estructura actual sin que cambie al modificar el DOM.

### `HTMLCollection`

- **Contenido:** **sólo** contiene nodos de tipo elemento HTML (`Element`).
- **Naturaleza:** **siempre es dinámica (viva)**, actualizándose automáticamente ante cualquier cambio en el DOM.
- **Iteración:** **no tiene `.forEach()` nativo** (requiere `for...of` o convertirla con `Array.from()`).
- **Casos de uso:** al acceder a hijos directos con `element.children`, o cuando necesitás una colección que refleje **en tiempo real** las altas y bajas de elementos en la página.

### Tabla comparativa

| | `NodeList` | `HTMLCollection` |
| :--- | :--- | :--- |
| **Contenido** | Cualquier nodo (elementos, texto, comentarios) | Sólo elementos HTML (`Element`) |
| **Naturaleza** | Generalmente **estática** (foto fija)<br>*Excepción: `childNodes` es dinámica* | Siempre **dinámica** (viva) |
| **`.forEach()`** | ✅ Sí, nativo | ❌ No |
| **Cómo se obtiene** | `querySelectorAll()`, `childNodes` | `getElementsByClassName()`, `getElementsByTagName()`, `element.children` |
| **Cuándo conviene** | Selectores CSS avanzados · iterar directo · foto fija | Hijos directos · reflejar cambios en tiempo real |

### El error que produce

```js
const items = document.getElementsByClassName("item");
items.forEach(el => console.log(el));
// 💥 items.forEach is not a function
```

**Las tres soluciones:**

```js
// ✅ 1. Convertirla en array
Array.from(items).forEach(function (item, i) {
  console.log(`Convertida con Array.from, item ${i}:`, item.textContent);
});

// ✅ 2. Recorrerla con un for clásico (funciona en las dos)
for (let i = 0; i < items.length; i++) {
  console.log(`Con for clásico, item ${i}:`, items[i].textContent);
}

// ✅ 3. for...of
for (const item of items) {
  console.log(item.textContent);
}
```

### Estática vs dinámica, en la práctica

```js
const nodeList  = document.querySelectorAll(".item");      // foto: 6
const coleccion = document.getElementsByClassName("item"); // viva: 6

// ...agregamos un <li class="item"> nuevo con JavaScript...

nodeList.length   // 6  ← NO se enteró, es una foto del momento
coleccion.length  // 7  ← SÍ se actualizó sola
document.querySelectorAll(".item").length  // 7 ← volviendo a buscar
```

> **Regla práctica:** usá `querySelectorAll` casi siempre. Si necesitás que la colección refleje los cambios en vivo, ahí sirve la `HTMLCollection`.

---

## 5. Modificar contenido

```js
el.textContent = "Hola <b>mundo</b>"   // texto PLANO: se ve la etiqueta literal
el.innerHTML   = "Hola <b>mundo</b>"   // HTML REAL: "mundo" sale en negrita
contenedor.innerHTML = ""              // ⭐ vaciar un contenedor
```

| Situación | Usá |
| :--- | :--- |
| Texto simple | `textContent` |
| Algo que **escribió el usuario** | `textContent` **siempre** (evita XSS) |
| Estructura HTML escrita por vos | `innerHTML` |

**Atributos:**

```js
el.getAttribute("href")                 // leer
el.setAttribute("href", "...")          // escribir (⚠️ con "class" pisa todas las clases)
el.removeAttribute("href")              // borrar
```

---

## 6. Modificar estilos con `.style`

📁 *carpeta 3*

```js
titulo.style.color = "red";
titulo.style.backgroundColor = "black";   // ⚠️ camelCase, NO background-color
titulo.style.fontSize = "24px";           // ⚠️ SIEMPRE con unidad
titulo.style.color = "";                  // "" quita el inline y vuelve al CSS
```

### Las 3 reglas que se olvidan siempre

**1. camelCase, sin guiones** (el guion en JS es el signo menos):

| En el CSS | En JavaScript |
| :--- | :--- |
| `background-color` | `backgroundColor` |
| `font-size` | `fontSize` |
| `border-radius` | `borderRadius` |
| `text-decoration` | `textDecoration` |

**2. Valor con unidad y entre comillas:**

```js
titulo.style.fontSize = 24;      // ❌ no pasa nada, y TAMPOCO da error
titulo.style.fontSize = "24px";  // ✅
```

**3. `.style` sólo lee estilos INLINE**, no tu archivo `.css`:

```js
// El style.css dice: .caja { background: #fafafa; }
caja.style.backgroundColor          // → ""  ¡vacío! aunque se vea gris
getComputedStyle(caja).background   // → sí devuelve el valor calculado
```

### El toggle de color

```js
titulo.addEventListener("click", function () {
  if (titulo.style.color === "red") {
    titulo.style.color = "";     // "" resetea al valor del CSS
  } else {
    titulo.style.color = "red";
  }
});
```

> Funciona porque el propio código escribió antes ese inline. Es el caso donde `.style` se puede leer.

### La alternativa recomendada: `classList`

```js
el.classList.add("resaltado")
el.classList.remove("resaltado")
el.classList.toggle("resaltado")     // ⭐ si está la saca, si no la pone
el.classList.contains("resaltado")   // → boolean
```

> **Regla de oro:** el **CSS** decide *cómo se ve*, **JavaScript** decide *cuándo*.
> `.style` se reserva para valores **dinámicos** que no se pueden saber de antemano (un color elegido por el usuario, un ancho calculado).

---

## 7. Eventos

📁 *carpetas 3 y 4*

```js
elemento.addEventListener("click", miFuncion)
//                           ↑          ↑
//                     qué escucho   qué hago cuando pase
```

### ⚠️ El error #1: los paréntesis

```js
boton.addEventListener("click", saludar())   // ❌ la ejecuta AHORA
boton.addEventListener("click", saludar)     // ✅ la agenda para después
```

`saludar` es **el nombre** de la función (lo que hay que entregar); `saludar()` es **el resultado** de ejecutarla.

### Catálogo

| Evento | Cuándo se dispara |
| :--- | :--- |
| `click` | Click del mouse |
| `mouseover` / `mouseout` | El mouse entra / sale (**incluye los hijos**) |
| `mouseenter` / `mouseleave` | El mouse entra / sale (ignora los hijos) |
| `input` | **En cada tecla** dentro de un input |
| `change` | Cuando el input **pierde el foco** y cambió |
| `keydown` / `keyup` | Al apretar / soltar una tecla |
| `focus` / `blur` | Al entrar / salir de un campo |
| `submit` | Se envía un formulario |
| `DOMContentLoaded` | El árbol terminó de construirse |

### El objeto `event`

```js
input.addEventListener("keydown", function (event) {
  event.target        // quién disparó el evento
  event.target.value  // lo que escribió
  event.key           // qué tecla ("Enter", "Escape", ...)
  event.preventDefault();   // frena el comportamiento por defecto del navegador
  event.stopPropagation();  // corta el burbujeo hacia los padres
});
```

### `onclick` en el HTML vs `addEventListener`

| `onclick="fn()"` | `addEventListener` |
| :--- | :--- |
| **Un solo** handler | Todos los que quieras |
| Mezcla lógica y maquetado | HTML y JS separados |
| Difícil de quitar | `removeEventListener` |

---

## 8. Crear e insertar elementos

📁 *carpeta 4*

### Los 3 pasos, siempre

```js
const li = document.createElement("li");   // 1. CREAR (todavía invisible)
li.textContent = "Pan - $3000";            // 2. CONFIGURAR
lista.appendChild(li);                     // 3. INSERTAR ← el que se olvida
```

```js
padre.appendChild(nuevo)                 // al final
padre.prepend(nuevo)                     // al principio
padre.insertBefore(nuevo, referencia)    // antes de otro hijo
elemento.remove()                        // se borra a sí mismo ⭐
contenedor.innerHTML = ""                // vaciar
```

### ⭐ El patrón `renderizar()`

```js
const carrito = [];        // ← LA VERDAD vive en el array

function renderizar() {
  lista.innerHTML = "";    // ⚠️ 1. VACIAR SIEMPRE PRIMERO

  carrito.forEach(function (producto) {   // 2. un elemento por dato
    const li = document.createElement("li");
    li.textContent = producto;
    lista.appendChild(li);
  });
}
```

> **La regla:** nunca toques el DOM a mano. **Cambiá el array y llamá a `renderizar()`.**
>
> ```js
> carrito.push("pan");     renderizar();
> carrito.splice(2, 1);    renderizar();
> carrito.sort();          renderizar();
> ```
>
> Si te olvidás del `innerHTML = ""`, la lista **se duplica** en cada render. Es el bug más común del tema.

Esta idea — *el DOM es un reflejo del estado, no el estado mismo* — es exactamente sobre la que está construido React.

---

## 9. Proyecto integrador (carpeta 4)

**Sistema de Registro y Liquidación de Compras.** Junta todo lo anterior con lo que ya sabíamos de arrays y objetos.

### Estructura de datos

```js
const productos = [
  { nombre: "pan",  precio: 3000 },
  { nombre: "cafe", precio: 7000 },
  // ...
];
```

> Todos los objetos con **las mismas claves** (`nombre`, `precio`): se accede siempre igual, sin tener que averiguar cómo se llama la propiedad. Es la forma en que llegan los datos de una API.

### Las funciones

| Función | Responsabilidad |
| :--- | :--- |
| `registrarProductos(productos)` | Pide productos con `prompt()`, normaliza, clasifica y retorna `{ productosCliente, productosNoEncontrados }` |
| `calcularTotal(productosCliente, productos)` | Recorre la compra, busca cada precio y retorna el total |
| `mostrarCatalogo()` | Dibuja la tabla del catálogo desde el array |
| `mostrarLista(contenedor, elementos, mensajeVacio)` | Función **reutilizable**: dibuja un array de strings en un `<ul>` |
| `iniciarCompra()` | Orquesta todo y muestra los resultados |

### Métodos de array aplicados

```js
// .map()  → extraer sólo los nombres del catálogo
const nombresProductos = productos.map(producto => producto.nombre);

// .find() → buscar el objeto cuyo nombre coincida
const encontrado = productos.find(item => item.nombre === producto);

// .forEach() → recorrer acumulando
productosCliente.forEach(producto => { totalAPagar += precio; });
```

### Normalización de la entrada

```js
const productoNormalizado = entrada.trim().toLowerCase();
// "  Shampoo  "  →  "shampoo"
```

| Método | Qué hace |
| :--- | :--- |
| `.trim()` | Saca los espacios del principio y del final |
| `.toLowerCase()` | Pasa todo a minúsculas |

### Desestructuración

```js
// En vez de:
const resultado = registrarProductos(productos);
const productosCliente = resultado.productosCliente;
const productosNoEncontrados = resultado.productosNoEncontrados;

// Se escribe:
const { productosCliente, productosNoEncontrados } = registrarProductos(productos);

// Y también sirve en el parámetro de una función:
productos.forEach(({ nombre, precio }) => { /* ... */ });
```

### Validaciones a contemplar

| Caso | Qué pasa | Cómo se maneja |
| :--- | :--- | :--- |
| El usuario aprieta **Cancelar** | `prompt()` devuelve `null` | Chequear `entrada === null` **antes** de usar `.trim()` |
| Acepta **sin escribir nada** | `prompt()` devuelve `""` | Avisar y volver a pedir |
| Ingresa un **punto** | Fin de la carga | `agregarProductos = false` |
| Producto **inexistente** | `.find()` devuelve `undefined` | Va a `productosNoEncontrados` |

---

## 🏆 Reglas de oro de la clase

1. El `<script>` va **al final del `<body>`**, o envolvé todo en `DOMContentLoaded`.
2. `querySelector` habla **CSS** (`.clase`, `#id`); `getElementById` va **sin** `#`.
3. `querySelectorAll` → **NodeList** (estática, con `forEach`).
   `getElementsByClassName` → **HTMLCollection** (viva, sin `forEach`).
4. Si el texto vino **del usuario**, `textContent`.
5. `addEventListener` recibe la función **SIN paréntesis**.
6. En inputs se lee `.value`, y **siempre es string**.
7. En `.style`: **camelCase y con unidad** (`fontSize = "20px"`).
8. El **CSS** decide cómo se ve, el **JS** decide cuándo → `classList`.
9. Antes de renderizar una lista, **vaciala** (`innerHTML = ""`).
10. **El array es la verdad; el DOM es su reflejo.**

---

## 🚑 Diccionario de errores

| Mensaje / síntoma | Causa | Solución |
| :--- | :--- | :--- |
| `Cannot read properties of null` | El selector no encontró nada | ¿El script está antes del HTML? ¿Falta el `.` o el `#`? |
| `X.forEach is not a function` | Es una `HTMLCollection` | `querySelectorAll` o `Array.from(x)` |
| El estilo no cambia y **no hay error** | Falta la unidad, o se usó `font-size` con guion | camelCase + `"20px"` |
| El evento se dispara solo al cargar | `addEventListener("click", fn())` | Sacar los paréntesis |
| La lista se duplica | Falta `innerHTML = ""` en el render | Vaciar antes de dibujar |
| El input muestra vacío | Se usó `.textContent` | `.value` |
| `"5" + 1` da `"51"` | `.value` es string | `Number(x.value)` |
| La página se recarga al enviar el form | Comportamiento por defecto | `event.preventDefault()` |

---

## 📇 Chuleta final

```js
// ---------- SELECCIONAR ----------
document.querySelector("#id")            // el primero (sintaxis CSS)
document.querySelectorAll(".clase")      // NodeList → estática, con forEach ✅
document.getElementById("id")            // sin #
document.getElementsByClassName("c")     // HTMLCollection → viva, sin forEach ❌
elemento.children                        // HTMLCollection de hijos directos

// ---------- CONTENIDO ----------
el.textContent = "texto"                 // texto plano (seguro)
el.innerHTML   = "<b>hola</b>"           // interpreta HTML
input.value                              // valor de un input, SIEMPRE string

// ---------- ATRIBUTOS ----------
el.getAttribute("href")  /  el.setAttribute("href", "...")  /  el.removeAttribute("href")

// ---------- CLASES ----------
el.classList.add("activo")  /  .remove("activo")  /  .toggle("activo")  /  .contains("activo")

// ---------- ESTILOS ----------
el.style.backgroundColor = "red"         // camelCase
el.style.fontSize = "20px"               // con unidad
el.style.color = ""                      // resetea al CSS

// ---------- CREAR / INSERTAR / BORRAR ----------
const nuevo = document.createElement("li")
padre.appendChild(nuevo)  /  padre.prepend(nuevo)  /  padre.insertBefore(nuevo, ref)
elemento.remove()  /  contenedor.innerHTML = ""

// ---------- EVENTOS ----------
el.addEventListener("click", fn)         // ¡SIN paréntesis!
// click · input · change · keydown · keyup · focus · blur
// mouseover/mouseout · mouseenter/mouseleave · submit · DOMContentLoaded
event.target  /  event.target.value  /  event.key
event.preventDefault()  /  event.stopPropagation()

// ---------- ARRAYS (repaso aplicado) ----------
array.map(x => x.nombre)                 // transformar → nuevo array
array.find(x => x.nombre === "pan")      // buscar → el elemento o undefined
array.forEach(x => { ... })              // recorrer → no devuelve nada
string.trim().toLowerCase()              // normalizar
const { a, b } = objeto                  // desestructurar
```

---

## 📂 Carpetas de la clase

| Carpeta | Tema |
| :--- | :--- |
| `1/` | Primer contacto: `DOMContentLoaded` y selectores básicos |
| `2/` | Selectores en profundidad · **NodeList vs HTMLCollection** |
| `3/` | Modificación de estilos con `.style` · eventos de mouse |
| `4/` | Proyecto integrador: Registro y Liquidación de Compras ([consigna](4/consigna.md)) |
