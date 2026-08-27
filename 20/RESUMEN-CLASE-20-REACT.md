# ⚛️ Resumen Clase 20 — El Ecosistema React: Node, NPM y Proyectos

> Documento de repaso de todo lo visto en la clase, con foco en el proyecto
> `react_1/` (la migración a React del To-Do List de la clase pasada).

---

## 📑 Índice

1. [Node.js y NPM](#1-nodejs-y-npm)
2. [¿Qué es React? Librería vs Framework](#2-qué-es-react-librería-vs-framework)
3. [SPA y Virtual DOM vs DOM real](#3-spa-y-virtual-dom-vs-dom-real)
4. [Vite y el scaffolding de un proyecto](#4-vite-y-el-scaffolding-de-un-proyecto)
5. [`index.html` — por qué React lo sigue necesitando](#5-indexhtml--por-qué-react-lo-sigue-necesitando)
6. [`type="module"`](#6-typemodule)
7. [`package.json` a fondo](#7-packagejson-a-fondo)
8. [Versionado de dependencias (SemVer)](#8-versionado-de-dependencias-semver)
9. [`node_modules` y por qué no se sube](#9-node_modules-y-por-qué-no-se-sube)
10. [Componentes y JSX](#10-componentes-y-jsx)
11. [State: `useState` básico](#11-state-usestate-básico)
12. [Eventos: `preventDefault` (y `stopPropagation`)](#12-eventos-preventdefault-y-stoppropagation)
13. [IDs únicos: `crypto.randomUUID()`](#13-ids-únicos-cryptorandomuuid)
14. [Spread operator en arrays y objetos](#14-spread-operator-en-arrays-y-objetos)
15. [`.map()` dentro del `return`: paréntesis en vez de llaves](#15-map-dentro-del-return-paréntesis-en-vez-de-llaves)
16. [JS dentro del JSX: las llaves `{ }`](#16-js-dentro-del-jsx-las-llaves--)
17. [`StrictMode`](#17-strictmode)
18. [🏆 Reglas de oro](#-reglas-de-oro)
19. [🚑 Diccionario de errores](#-diccionario-de-errores)
20. [📇 Chuleta de comandos](#-chuleta-de-comandos)

---

## 1. Node.js y NPM

- **Node.js** es un *runtime*: un programa que ejecuta JavaScript **fuera** del navegador (usa el mismo motor que Chrome, V8, por dentro). Antes, JS solo vivía dentro de una página web; Node lo liberó de ahí.
  - En frontend **no** usamos Node para correr la app final — eso lo sigue haciendo el navegador del usuario. Node corre las **herramientas de desarrollo**: el servidor local, el compilador, el empaquetador.
- **NPM (Node Package Manager)** es el gestor de paquetes que viene instalado junto con Node. Es la tienda de software más grande que existe: miles de librerías ya escritas por otros devs (React, Vite, etc.) listas para instalar con un comando, en vez de programarlas desde cero.

```bash
node -v     # ver la versión de Node instalada
npm -v      # ver la versión de NPM instalada
```

---

## 2. ¿Qué es React? Librería vs Framework

React es una **biblioteca** de JavaScript para construir interfaces de usuario. Resuelve **una sola cosa**: dibujar la UI a partir de datos. No trae ruteo, ni cliente HTTP, ni manejo de formularios — para eso se elige otra pieza del ecosistema (React Router, Axios, etc.) y se conecta a mano.

Un **framework** "todo incluido" (por ejemplo Angular) ya viene con esas piezas integradas, **y además impone su propia estructura de carpetas y convenciones** — la arquitectura la deciden por vos.

> **Analogía:** una librería es comprar los ingredientes y armar tu propia receta. Un framework es comprar el combo de comida ya armado, con su propio menú.

---

## 3. SPA y Virtual DOM vs DOM real

**SPA (Single Page Application):** en un sitio tradicional, cada click recarga toda la página desde el servidor. Una SPA carga **una sola página HTML** una vez, y de ahí en más JavaScript reescribe el contenido en el momento — sin recargas, navegación instantánea.

**DOM real (lo que usábamos con JS puro):** cambiar un dato obliga al navegador a recalcular el layout y repintar la pantalla (*reflow & repaint*). Es lo que hacíamos a mano con `classList.toggle`, `appendChild`, `innerHTML = ""`.

**Virtual DOM (React):** una copia liviana del DOM real hecha de objetos JavaScript comunes, guardada en memoria. Cuando algo cambia, React arma esa copia de nuevo, la compara contra la anterior (**algoritmo de Reconciliación / Diffing**) y calcula el **mínimo** conjunto de cambios necesarios. Recién ahí toca el DOM real, y solo en esos puntos puntuales.

> **Analogía:** es una libreta de bocetos. React dibuja ahí primero, ve qué cambió comparando el boceto nuevo contra el viejo, y solo entonces va a la "pared real" (el DOM) a pintar ese cambio puntual. Mucho más rápido que repintar la pared entera cada vez.

| | DOM real (JS puro) | Virtual DOM (React) |
| :--- | :--- | :--- |
| ¿Quién decide qué repintar? | Vos, a mano, en cada evento | React, comparando versiones del estado |
| Riesgo típico | Olvidarte de vaciar antes de redibujar (lista duplicada) | Ninguno — React se encarga solo |
| Costo de un cambio chico | Repinta lo que vos le digas (a veces de más) | Repinta solo lo mínimo necesario |

---

## 4. Vite y el scaffolding de un proyecto

**Scaffolding (andamiaje):** una estructura de carpetas y configuración ya armada de antemano, para no tener que conectar bundler + servidor + compilador a mano cada vez que arrancás un proyecto. Antes se usaba `create-react-app` (hoy discontinuado, mucho más lento); hoy el estándar es **Vite**.

```bash
# scaffolding directo (recomendado)
npm init vite@latest mi-proyecto -- --template react

cd mi-proyecto
npm install     # descarga las dependencias a node_modules
npm run dev     # levanta el servidor local (HMR incluido)
```

> El doble guion `--` le dice a `npm` que todo lo que sigue (`--template react`) hay que pasárselo directo al comando interno de Vite, no interpretarlo como una opción de `npm`.

Vite también trae **Hot Module Replacement (HMR)**: al guardar un archivo, el navegador actualiza solo esa parte sin recargar toda la página ni perder el estado actual de la app.

---

## 5. `index.html` — por qué React lo sigue necesitando

```html
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
```

Sigue habiendo un `index.html` porque, al final, el navegador **necesita un documento HTML real** para arrancar cualquier página. La diferencia con el HTML "de siempre" es que este viene **casi vacío**: solo un `<div id="root">` y un `<script>`. Todo lo demás —cada `<h1>`, `<form>`, `<li>`— lo genera React en tiempo de ejecución y lo inserta ahí adentro.

`src/main.jsx` es el puente: toma el componente `<App />` y lo monta dentro de ese `div`:

```jsx
// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

---

## 6. `type="module"`

Aparece en **dos lugares distintos**, con el mismo significado de fondo (ESModules), pero en contextos distintos:

- **En `index.html`:** `<script type="module" src="/src/main.jsx">` le dice al navegador que ese script es un **módulo de ES** (`import`/`export`), no un script clásico. Los módulos se cargan de forma diferida y permiten usar `import` directo en el navegador.
- **En `package.json`:** `"type": "module"` le dice a Node que todos los `.js` del proyecto se tratan como ESModules nativos.

**ESModules vs CommonJS:**
| | Sintaxis | Dónde se usa |
| :--- | :--- | :--- |
| CommonJS (Node clásico) | `require('modulo')` / `module.exports` | proyectos Node viejos |
| ESModules (estándar moderno) | `import algo from 'ruta'` / `export default` | Vite y React modernos — el 100% de lo que escribimos |

---

## 7. `package.json` a fondo

Es la ficha de identidad del proyecto: metadatos, dependencias instaladas y scripts de automatización.

```json
{
  "name": "react_1",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.2.8",
    "react-dom": "^19.2.8"
  },
  "devDependencies": {
    "vite": "^8.2.2"
  }
}
```

- **`scripts`** → atajos de terminal. `npm run dev` corre el servidor local; `npm run build` empaqueta para producción.
- **`dependencies`** → lo que la app necesita **para vivir** en producción (`react`, `react-dom`).
- **`devDependencies`** → lo que el equipo necesita **para trabajar**, pero que nunca viaja a producción (`vite`, herramientas de testing/lint). **No son lo mismo:** si algo que solo se usa en desarrollo termina en `dependencies` por error, se empaqueta igual en el build final — proyecto más pesado sin necesidad real.

---

## 8. Versionado de dependencias (SemVer)

Cada dependencia en `package.json` tiene un número de versión con un símbolo adelante:

```json
"react": "^19.2.8"
```

El formato es **SemVer** (*Semantic Versioning*): `MAJOR.MINOR.PATCH`

| Parte | Significa | Ejemplo de cambio |
| :--- | :--- | :--- |
| **MAJOR** (19) | cambios que rompen compatibilidad | pasar de React 18 a React 19 |
| **MINOR** (2) | funcionalidad nueva, compatible hacia atrás | se agrega un Hook nuevo |
| **PATCH** (8) | arreglos de bugs, sin cambios de comportamiento | se corrige un error interno |

| Símbolo | Qué permite instalar |
| :--- | :--- |
| `^19.2.8` | actualizaciones de MINOR y PATCH (`19.x.x`, nunca `20.0.0`) — el más común |
| `~19.2.8` | solo actualizaciones de PATCH (`19.2.x`) |
| `19.2.8` (sin símbolo) | esa versión exacta, siempre |

> Por eso `npm install` no siempre instala *exactamente* lo que dice `package.json`: instala la versión más nueva permitida por ese símbolo. El archivo `package-lock.json` es el que fija las versiones exactas que se instalaron esa vez, para que el proyecto se comporte igual en cualquier máquina.

---

## 9. `node_modules` y por qué no se sube

`node_modules/` es la carpeta donde `npm install` descarga **todo** el código de las dependencias (y las dependencias de las dependencias). Puede llegar a pesar cientos de MB con miles de archivos, incluso en un proyecto chico.

**No se sube al repositorio** (por eso está en `.gitignore`) porque:
1. Es **enorme** y volvería el repositorio lentísimo de clonar/descargar.
2. Es **reproducible**: cualquiera que clone el proyecto puede reconstruir exactamente esa carpeta corriendo `npm install`, usando `package.json` + `package-lock.json` como receta.
3. Puede variar según el sistema operativo (algunas dependencias compilan binarios nativos distintos en Windows/Mac/Linux).

```gitignore
# .gitignore
node_modules
dist
```

**Regla práctica:** lo único que se comparte es `package.json` (y `package-lock.json`); `node_modules` cada uno se lo genera en su máquina.

---

## 10. Componentes y JSX

Un **componente** es una función de JavaScript que retorna JSX (una descripción de cómo se ve la UI):

```jsx
function App() {
  return (
    <main className="app">
      <h1>Tareas</h1>
    </main>
  );
}

export default App;
```

- **JSX** = "JavaScript XML": escribir etiquetas parecidas a HTML adentro de un archivo JS. El navegador no lo entiende tal cual — Vite lo transpila a llamadas de `React.createElement(...)`.
- **`className`, no `class`** (`class` es palabra reservada en JS).
- Un componente siempre retorna **un único elemento raíz** (o un Fragmento `<>...</>`).

---

## 11. State: `useState` básico

El **estado** es el dato que, cuando cambia, tiene que actualizar la pantalla. En DOM puro nosotros nos encargábamos de repintar a mano (`li.classList.toggle(...)`, `contador.textContent = ...`). En React, eso se reemplaza por el hook `useState`:

```jsx
const [tareas, setTareas] = useState([]);
```

- Devuelve **un par**: el valor actual (`tareas`) y una función para cambiarlo (`setTareas`).
- **Nunca se muta el estado directo** (`tareas.push(...)` ❌). Siempre se llama al *setter* con un valor nuevo.
- Cada llamada a `setTareas(...)` dispara un **re-render**: React vuelve a ejecutar el componente y actualiza el DOM real donde hizo falta.
- Un `<input>` "controlado" tiene su `value` atado al estado, y necesita `onChange` para poder escribir:

```jsx
const [texto, setTexto] = useState("");

<input value={texto} onChange={(event) => setTexto(event.target.value)} />
```

Sin el `onChange`, el input queda de solo lectura (y React tira un warning en la consola avisándolo).

---

## 12. Eventos: `preventDefault` (y `stopPropagation`)

```jsx
function agregarTarea(event) {
  event.preventDefault(); // frena el comportamiento por defecto del navegador
  // ...
}
```

`event.preventDefault()` cancela lo que el navegador haría solo ante ese evento. En un `<form onSubmit={...}>`, el comportamiento por defecto es **recargar la página** — exactamente lo que no queremos en una SPA.

En el botón de eliminar usamos además `event.stopPropagation()`:

```jsx
function eliminarTarea(id, event) {
  event.stopPropagation(); // que el click no "burbujee" hasta el <li> padre
  setTareas(tareas.filter((t) => t.id !== id));
}
```

El `<li>` también tiene un `onClick` (para togglear completada). Sin `stopPropagation`, un click en el botón "✕" dispararía **los dos** handlers (el del botón y el del `<li>` padre), porque los eventos en el DOM "burbujean" hacia arriba.

---

## 13. IDs únicos: `crypto.randomUUID()`

```jsx
const nuevaTarea = {
  id: crypto.randomUUID(),
  texto: textoLimpio,
  completada: false,
};
```

En la versión DOM, el propio elemento `<li>` **era** la referencia a la tarea (`li.remove()`, `li.classList.toggle(...)`). En React no manipulamos elementos del DOM directo, así que cada tarea necesita un **identificador propio** para poder encontrarla, togglearla o borrarla dentro del array de estado.

`crypto.randomUUID()` es una función nativa del navegador que genera un identificador único (UUID v4), sin instalar ninguna librería. Ese `id` es también lo que se usa como `key` al recorrer la lista (ver punto 15).

---

## 14. Spread operator en arrays y objetos

El operador *spread* (`...`) "desparrama" los elementos de un array o las propiedades de un objeto dentro de uno nuevo. Se usa constantemente en React porque **nunca mutamos el estado**, siempre creamos una versión nueva.

**En arrays** — agregar una tarea sin mutar el array viejo:
```jsx
setTareas([...tareas, nuevaTarea]);
// equivalente conceptual a "todas las tareas de antes, más una nueva al final"
// (a diferencia de tareas.push(nuevaTarea), que muta el array original)
```

**En objetos** — togglear `completada` sin mutar el objeto original:
```jsx
tareas.map((tarea) =>
  tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
);
// { ...tarea, completada: !tarea.completada }
// = "copiá todas las propiedades de tarea, pero pisá 'completada' con el valor nuevo"
```

**¿Por qué importa tanto no mutar?** React decide si tiene que re-renderizar comparando si la **referencia** del array/objeto cambió. Si mutás el original (`tareas[0].completada = true`), la referencia sigue siendo la misma y React puede no darse cuenta de que algo cambió.

---

## 15. `.map()` dentro del `return`: paréntesis en vez de llaves

```jsx
<ul className="lista-tareas">
  {tareas.map((tarea) => (
    <li key={tarea.id} className={tarea.completada ? "completada" : ""}>
      <small>{tarea.texto}</small>
    </li>
  ))}
</ul>
```

- `{tareas.map(...)}` — las llaves permiten meter la expresión de JS (el `.map()`) adentro del JSX (ver punto 16).
- Dentro de la función flecha, se usa **paréntesis `( )`** y no llaves `{ }` porque **`( )` significa "esto es lo que se retorna", en una sola expresión**, sin escribir la palabra `return`. Si se usaran llaves (`(tarea) => { <li>...</li> }`), eso abriría el **cuerpo de una función normal**, y ahí sí haría falta un `return` explícito adentro.

```jsx
// con paréntesis: retorno implícito, más corto
(tarea) => (<li>{tarea.texto}</li>)

// con llaves: cuerpo de función, retorno explícito obligatorio
(tarea) => { return <li>{tarea.texto}</li>; }
```

- **`key={tarea.id}`** es obligatoria en todo elemento generado con `.map()`: le da a React una forma de identificar cada fila entre un render y el siguiente, sin key (o usando el índice del array en listas que cambian de orden) React puede confundir qué elemento es cuál y renderizar mal.

---

## 16. JS dentro del JSX: las llaves `{ }`

Las llaves `{ }` son la forma de meter **cualquier expresión de JavaScript** en medio del HTML-como-JSX:

```jsx
<small>{tarea.texto}</small>                          {/* una variable */}
<span>{tareas.length}</span>                          {/* una expresión */}
<li className={tarea.completada ? "completada" : ""}> {/* un ternario */}
{tareas.map((tarea) => ( ... ))}                       {/* un array de elementos */}
```

**Regla simple:** afuera de las llaves, todo es HTML literal. Adentro de las llaves, todo es JavaScript — pero tiene que ser una **expresión** (algo que produce un valor). No se puede meter una sentencia como un `if` suelto o un `for` adentro de `{ }` (por eso el patrón habitual para listas es `.map()`, que sí devuelve un valor: un array nuevo).

---

## 17. `StrictMode`

```jsx
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

`StrictMode` es un componente especial que **no dibuja nada en pantalla** — solo activa chequeos extra de React **durante el desarrollo**, para encontrar bugs antes de que lleguen a producción. Por ejemplo, en desarrollo llega a **ejecutar dos veces** ciertas funciones (a propósito) para detectar código con efectos secundarios inesperados.

- Solo afecta el modo desarrollo (`npm run dev`); en el build de producción (`npm run build`) no hace nada extra ni afecta el rendimiento.
- Si en algún momento ven un `console.log` que se imprime "dos veces" sin razón aparente, la primera sospecha es `StrictMode` — no es un bug de la app.

---

## 🏆 Reglas de oro

1. El estado nunca se muta directo (`tareas.push(...)` ❌) — siempre `set...` con un array/objeto **nuevo** (spread operator).
2. Todo elemento generado con `.map()` necesita una prop `key` única y estable — usar el `id` del dato, no el índice.
3. `className`, no `class`. `onClick`, no `onclick`. `onChange`, no `oninput`.
4. Un input con `value` controlado por estado necesita su `onChange`, si no queda de solo lectura.
5. `{ }` mete JS dentro del JSX, pero tiene que ser una **expresión** (algo que devuelve un valor), no una sentencia suelta.
6. `dependencies` es lo que la app necesita para vivir; `devDependencies` es lo que el equipo necesita para trabajar. No son lo mismo.
7. `node_modules` nunca se sube al repositorio — se reconstruye con `npm install`.
8. Vite necesita ESModules (`import`/`export`) siempre — `require` es CommonJS y no corresponde acá.

---

## 🚑 Diccionario de errores

| Mensaje / síntoma | Causa | Solución |
| :--- | :--- | :--- |
| El estilo no se aplica y no hay error | Se escribió `class=` en vez de `className=` | Usar `className` |
| `Warning: each child in a list should have a unique "key" prop` | Falta `key={...}` en el elemento del `.map()` | Agregar `key={tarea.id}` |
| El input no deja escribir nada | Tiene `value` pero no `onChange` | Agregar el `onChange` que actualice el estado |
| Al hacer click en "✕" también se togglea la tarea | Falta `event.stopPropagation()` en el botón eliminar | Agregarlo antes de la lógica de borrado |
| El click en "Agregar" recarga la página | Falta `event.preventDefault()` en el `onSubmit` | Agregarlo al principio de la función |
| Cambié el estado y la pantalla no se actualiza | Se mutó el array/objeto original en vez de crear uno nuevo | Usar spread (`[...arr]`, `{...obj}`) o `.map()`/`.filter()` |
| `npm install` no baja nada | Sin internet, o `node_modules` corrupto | Reintentar con internet, o borrar `node_modules` + `package-lock.json` y reinstalar |
| Un `console.log` se imprime dos veces en desarrollo | `StrictMode` (a propósito) | No es un bug — no ocurre en producción |

---

## 📇 Chuleta de comandos

```bash
# Scaffolding de un proyecto nuevo
npm init vite@latest mi-proyecto -- --template react

# Instalar dependencias (lee package.json, descarga a node_modules)
npm install
npm i            # alias corto

# Levantar el servidor de desarrollo (HMR incluido)
npm run dev

# Empaquetar para producción
npm run build

# Previsualizar el build de producción localmente
npm run preview

# Ver versiones instaladas
node -v
npm -v

# Instalar una librería nueva
npm install nombre-de-la-libreria

# Instalar una herramienta de desarrollo (no viaja a producción)
npm install -D nombre-de-la-herramienta
```

```jsx
// ---------- ESTADO ----------
const [valor, setValor] = useState(inicial);
setValor(nuevoValor);              // nunca: valor = nuevoValor

// ---------- SPREAD ----------
[...arrayViejo, nuevoItem]                    // array con un elemento más
{ ...objetoViejo, propiedad: nuevoValor }     // objeto con una propiedad pisada

// ---------- LISTAS ----------
{items.map((item) => (
  <li key={item.id}>{item.texto}</li>
))}

// ---------- EVENTOS ----------
function handleSubmit(event) {
  event.preventDefault();   // frena el reload del navegador
}
function handleClickInterno(event) {
  event.stopPropagation();  // no burbujea al padre
}

// ---------- IDS ----------
crypto.randomUUID()   // id único, nativo del navegador
```
