# 🧭 Guía Integradora — Cómo funciona todo, junto

> Esta guía no es de una clase puntual. Es para cuando **props**, **eventos** o **rutas** se
> sienten como piezas sueltas que no encajan entre sí. Los ejemplos usan el código real de
> `182188/24/custom-hooks-2` — el que ustedes escribieron en clase — no una versión idealizada.
> Dos secciones tienen desarrollo extra largo porque fueron las que más costaron:
> **`personajeEnEdicion`** (sección 7) y **`createBrowserRouter`** (sección 11).

---

## 📑 Índice

1. [El punto de partida: ¿qué es un componente?](#1-el-punto-de-partida-qué-es-un-componente)
2. [JSX: HTML adentro de JavaScript](#2-jsx-html-adentro-de-javascript)
3. [Props, paso a paso](#3-props-paso-a-paso)
4. [Eventos, paso a paso](#4-eventos-paso-a-paso)
5. [State (`useState`) — la memoria del componente](#5-state-usestate--la-memoria-del-componente)
6. [Formularios controlados: props + eventos + state, juntos](#6-formularios-controlados-props--eventos--state-juntos)
7. [🔍 A fondo: `personajeEnEdicion`](#7--a-fondo-personajeenedicion)
8. [`useEffect` y Custom Hooks](#8-useeffect-y-custom-hooks)
9. [Component vs. Page: ¿cuál es la diferencia?](#9-component-vs-page-cuál-es-la-diferencia)
10. [Las rutas ("los caminos"): la idea general](#10-las-rutas-los-caminos-la-idea-general)
11. [🔍 A fondo: `createBrowserRouter`](#11--a-fondo-createbrowserrouter)
12. [El resto del ruteo: `Link`, `useParams`, `useNavigate`](#12-el-resto-del-ruteo-link-useparams-usenavigate)
13. [Conceptos y consultas técnicas de la sesión](#13-conceptos-y-consultas-técnicas-de-la-sesión)
14. [El recorrido completo, de punta a punta](#14-el-recorrido-completo-de-punta-a-punta)

---

## 1. El punto de partida: ¿qué es un componente?

Un componente es **una función de JavaScript que devuelve HTML** (en realidad JSX, punto 2).

```jsx
function Personajes() {
  return <section>...</section>;
}
```

Se usa como si fuera una etiqueta propia: `<Personajes />`. `custom-hooks-2` tiene, por ahora,
dos componentes: `Personajes` (la pantalla entera) y `FormularioPersonaje` (el formulario,
usado adentro de `Personajes`).

---

## 2. JSX: HTML adentro de JavaScript

```jsx
<h2>Personajes de rick & morty</h2>
```

Parece HTML, pero vive adentro de un archivo `.jsx` de JavaScript. Dos reglas que aparecen todo
el tiempo en el código real:
- **`className`, no `class`** — se ve en todo el archivo: `className='tarjeta personajes'`.
- **Llaves `{ }`** para meter una variable de JS en medio del HTML: `<h3>{personaje.name}</h3>`.

---

## 3. Props, paso a paso

### 3.1 La idea, sin código todavía

Un componente es una función. Una función puede recibir argumentos. Las props son exactamente
eso: **argumentos que un componente recibe**, para poder mostrar (o hacer) cosas distintas
cada vez que se usa.

### 3.2 En el código real: `FormularioPersonaje`

```jsx
// FormularioPersonaje.jsx
function FormularioPersonaje({
  personajeEnEdicion,
  onCrear,
  onActualizar,
  onCancelar,
}) {
```

Esas cuatro palabras entre `{ }` son las props que `FormularioPersonaje` espera recibir. No las
inventa él — se las tiene que pasar quien lo usa:

```jsx
// Personajes.jsx
<FormularioPersonaje
  personajeEnEdicion={personajeEnEdicion}
  onCrear={handleCrear}
  onActualizar={handleActualizar}
  onCancelar={() => setPersonajeEnEdicion(null)}
/>
```

`Personajes.jsx` es el **padre**: es quien decide qué le manda al hijo. `FormularioPersonaje`
es el **hijo**: recibe esos cuatro valores y los usa, sin saber ni necesitar saber de dónde
vienen ni cómo funcionan por dentro `handleCrear` o `handleActualizar`.

### 3.3 El flujo, en una frase

**Las props siempre viajan de arriba hacia abajo: del padre al hijo.** Nunca al revés, y son de
**solo lectura** — el hijo no puede reescribir la prop que recibió. Si algo tiene que cambiar,
tiene que ser `state` en el padre (punto 5), no una modificación directa de la prop.

### 3.4 Props que son funciones: el hijo avisa, el padre decide

`onCrear`, `onActualizar` y `onCancelar` no son datos — son **funciones**. Esto es clave: así es
como un componente hijo le "avisa" algo a su padre sin conocerlo.

```jsx
// Adentro de FormularioPersonaje.jsx — no sabe qué hace onCrear, solo lo ejecuta
await onCrear(form)
```

```jsx
// Adentro de Personajes.jsx — acá sí se sabe qué hace de verdad
const handleCrear = async (datos) => {
    const nuevoPersonaje = await crearPersonaje(datos)
    if(nuevoPersonaje){
        setPersonajes((actuales) => [...actuales, nuevoPersonaje])
    }
    fetchPersonajes()
}
```

`FormularioPersonaje` junta los datos del usuario y los entrega — no sabe que eso termina en un
`fetch`. Esa separación es a propósito: el formulario se puede reutilizar sin cambiar una sola
línea, aunque el día de mañana `handleCrear` cambie por completo.

### 3.5 `.map()` también reparte props, una vez por cada elemento

```jsx
{personajes.map((personaje) => (
    <article key={personaje.id} className='tarjeta-personaje' >
        <h3>{personaje.name}</h3>
```

Acá no hay un componente separado todavía (el `<article>` se escribe directo), pero la lógica
es la misma que con props: por cada `personaje` del array, se genera un bloque de JSX usando
los datos de **ese** personaje puntual — `personaje.name`, `personaje.status`, etc. cambian en
cada vuelta del `.map()`.

---

## 4. Eventos, paso a paso

### 4.1 ¿Qué es un evento?

Algo que pasa en la pantalla: un click, que se escriba en un input. Se escuchan con atributos en
**camelCase**: `onClick`, `onChange`, `onSubmit`.

### 4.2 El error #1: los paréntesis

```jsx
onClick={miFuncion()}   // ❌ se ejecuta AHORA, al dibujar la pantalla
onClick={miFuncion}     // ✅ se ejecuta DESPUÉS, cuando hacen click
```

### 4.3 El objeto `evento`, en el código real

```jsx
// FormularioPersonaje.jsx
const manejarCambios = (evento) => {
    const { name, value } = evento.target;
    setForm((actual) => ({ ...actual, [name]: value }));
};
```

`evento.target` es el `<input>` (o `<select>`) que disparó el cambio. `evento.target.value` es
lo que tiene escrito en ese momento. `evento.target.name` es el atributo `name` que ese input
tiene en el HTML — por eso **un solo** `manejarCambios` sirve para todos los campos del
formulario:

```jsx
<input type="text" id="name" name="name" value={form.name} onChange={manejarCambios} />
<input type="text" id="species" name="species" value={form.species} onChange={manejarCambios} />
```

### 4.4 Eventos que no necesitan el objeto `evento`

```jsx
<button className="botón-secundario" onClick={onCancelar} type="button" >
    Cancelar
</button>
```

Acá `onCancelar` (que llegó por prop, punto 3.4) no necesita saber nada del click — solo hace
falta que se ejecute. Por eso se pasa directo, sin arrow function y sin leer `evento`.

---

## 5. State (`useState`) — la memoria del componente

Una variable común de JS no sirve para datos que la pantalla tiene que reflejar: se reinicia
cada vez que el componente se vuelve a dibujar, y cambiarla no le avisa nada a React.

```jsx
const [personajes, setPersonajes] = useState([]);
const [form, setForm] = useState(FORM_VACIO);
const [enviando, setEnviando] = useState(false);
```

Cada `useState` es una casilla de memoria independiente: el valor actual (a la izquierda) y una
función para cambiarlo (a la derecha, siempre empieza con `set`). Llamar a esa función guarda el
valor nuevo **y** le dice a React que redibuje la pantalla con eso.

---

## 6. Formularios controlados: props + eventos + state, juntos

```jsx
<input
  type="text"
  id="name"
  name="name"
  value={form.name}       // Cable 1: el estado decide qué se ve
  onChange={manejarCambios} // Cable 2: cada tecla actualiza el estado
  placeholder="Ej: Devil Morty"
/>
```

1. `value={form.name}` obliga a la caja a mostrar exactamente lo que dice `form.name`.
2. Al escribir, se dispara `onChange` → `manejarCambios` lee `evento.target.value` → llama a
   `setForm(...)` → el estado cambia.
3. Ese cambio de estado hace que React vuelva a poner `value={form.name}`, ahora con el valor
   nuevo. El círculo se cierra solo.

**El bug real que tenían en el `<select>`:** faltaban esos dos cables.

```jsx
// ❌ como estaba: no controlado de verdad
<select name="status" id="status">

// ✅ como tiene que estar
<select name="status" id="status" value={form.status} onChange={manejarCambios}>
```

Sin `value`/`onChange`, elegir otra opción en el desplegable no actualizaba `form.status` —
por eso "se veía bien" (mostraba "Alive") pero cambiar la opción no hacía nada.

---

## 7. 🔍 A fondo: `personajeEnEdicion`

Esta variable hace más trabajo del que parece. Veamos su vida completa, paso a paso.

### 7.1 Nace en `Personajes.jsx`, no en el formulario

```jsx
const [personajeEnEdicion, setPersonajeEnEdicion] = useState(null)
```

Vive en el componente **padre** (`Personajes`), no en `FormularioPersonaje`. Arranca en `null`.
`null` acá significa, literalmente, **"no estoy editando a nadie, estoy en modo crear"**.

### 7.2 Un botón "Editar" la llena con un personaje concreto

```jsx
<button type="button" onClick={() => setPersonajeEnEdicion(personaje)}>
  Editar
</button>
```

Este botón vive **adentro del `.map()`** de la grilla — por eso cada tarjeta tiene su propio
`personaje` (punto 3.5), y clickear "Editar" en la tarjeta de Rick guarda **el objeto de Rick
completo** en `personajeEnEdicion`. Ya no es `null`: ahora es
`{ id: 1, name: "Rick Sanchez", status: "Alive", ... }`.

### 7.3 Viaja como prop hacia el formulario

```jsx
<FormularioPersonaje
  personajeEnEdicion={personajeEnEdicion}
  ...
/>
```

El padre le pasa ese objeto (o `null`) al hijo. Repaso del punto 3: esto es una prop común y
corriente — el hijo la recibe, no la inventa.

### 7.4 Adentro del formulario, decide dos cosas distintas

**Primero, qué mostrar en los campos** (con un `useEffect`, se ve en detalle en el punto 8):

```jsx
useEffect(() => {
  if (personajeEnEdicion) {
    setForm({
      name: personajeEnEdicion.name,
      species: personajeEnEdicion.species,
      status: personajeEnEdicion.status,
      image: personajeEnEdicion.image || "",
    });
  } else {
    setForm(FORM_VACIO);
  }
}, [personajeEnEdicion]);
```

Si `personajeEnEdicion` tiene un objeto adentro → el formulario se llena con esos datos
(modo edición). Si es `null` → el formulario queda vacío (modo creación). Esta es la razón por
la que, al clickear "Editar", los campos aparecen con los datos de Rick ya cargados.

**Segundo, qué hacer al enviar el formulario:**

```jsx
if (personajeEnEdicion) {
  await onActualizar(personajeEnEdicion.id, form)
} else {
  await onCrear(form)
  setForm(FORM_VACIO)
}
```

Mismo dato, dos decisiones distintas: si hay alguien en edición, se llama a `onActualizar` (que
hace un `PATCH`); si no, se llama a `onCrear` (que hace un `POST`). El formulario es **uno
solo**, pero se comporta distinto según lo que valga esta única variable.

### 7.5 También decide qué texto mostrar

```jsx
<h3>{personajeEnEdicion ? `Editando a ${personajeEnEdicion.name}` : "Creando personaje"}</h3>
```

```jsx
{personajeEnEdicion && (
    <button className="botón-secundario" onClick={onCancelar} type="button" >
        Cancelar
    </button>
)}
```

El título y el botón "Cancelar" (que solo tiene sentido si se está editando algo) también
dependen de esta misma variable — no hay ninguna otra bandera extra para eso.

### 7.6 Vuelve a `null`: así se sale del modo edición

Dos caminos posibles:

```jsx
// Camino 1: se cancela
onCancelar={() => setPersonajeEnEdicion(null)}
```

```jsx
// Camino 2: se guarda con éxito (adentro de handleActualizar, en Personajes.jsx)
const handleActualizar = async (id, cambios) => {
    const personajeActualizado = await actualizarPersonaje(id, cambios)
    if (personajeActualizado) {
        setPersonajes((actuales) =>
            actuales.map((p) => (p.id === id ? personajeActualizado : p)),
        )
        setPersonajeEnEdicion(null) // ← acá
    }
}
```

En los dos casos, `personajeEnEdicion` vuelve a `null` → el `useEffect` del punto 7.4 se
dispara de nuevo, ve que ahora es `null`, y vacía el formulario → se vuelve al modo "Creando
personaje" solo, sin ningún `if` extra en el JSX para eso.

### 7.7 El resumen de una sola variable

| Estado de `personajeEnEdicion` | `null` | objeto de un personaje |
| :--- | :--- | :--- |
| ¿Qué significa? | No se está editando nada | Se está editando ese personaje puntual |
| ¿Cómo llegó a ese valor? | Valor inicial, o `onCancelar`, o guardado con éxito | Se clickeó "Editar" en una tarjeta |
| ¿Qué muestra el form? | Vacío (`FORM_VACIO`) | Precargado con los datos de ese personaje |
| ¿Qué hace el submit? | `onCrear` → `POST` | `onActualizar` → `PATCH` |
| ¿Se ve el botón "Cancelar"? | No | Sí |

Una sola variable, `null` o un objeto, controlando cinco comportamientos distintos a la vez.

---

## 8. `useEffect` y Custom Hooks

`useEffect` conecta el componente con algo de **afuera** — en este proyecto, con el servidor:

```jsx
// useFetchPersonajes.jsx
useEffect(() => {
  fetchPersonajes();
}, []);
```

El `[]` vacío significa "una sola vez, cuando el componente nace". El `useEffect` del punto 7.4
(con `[personajeEnEdicion]`) en cambio se dispara **cada vez que esa variable cambia** — no solo
al nacer.

Un **Custom Hook** es una función que junta `useState` + `useEffect` (+ lógica de `fetch`) para
no repetir ese código. `useFetchPersonajes`, `useCrearPersonaje`, `useActualizarPersonaje`,
`useEliminarPersonaje` son cuatro Custom Hooks — mismo molde, un verbo HTTP distinto cada uno
(`GET`, `POST`, `PATCH`, `DELETE`).

---

## 9. Component vs. Page: ¿cuál es la diferencia?

En `custom-hooks-2` hay una sola carpeta, `components/`, con `Personajes.jsx` y
`FormularioPersonaje.jsx` adentro. En `react_6` (con rutas) aparece una carpeta nueva,
`pages/`. La pregunta que surge: ¿en qué se diferencia un "component" de un "page"?

**La respuesta corta: técnicamente, en nada.** Los dos son lo mismo — una función de
JavaScript que devuelve JSX (punto 1). React no tiene un tipo especial `Page` distinto de
`Component`; no existe tal cosa en el lenguaje ni en la librería. La diferencia es **una
convención de organización**, no una regla del código:

| | `components/` | `pages/` |
| :--- | :--- | :--- |
| ¿Qué es? | Una función que devuelve JSX | Exactamente lo mismo |
| ¿Aparece en el mapa de rutas? | No | Sí — tiene un `element: <Esto />` en `createBrowserRouter` |
| ¿Quién lo usa? | Otro componente o una page | React Router, directamente |
| ¿Qué tan grande suele ser? | Chico, una responsabilidad puntual | Grande — orquesta varios components |
| Ejemplos en este proyecto | `FormularioPersonaje`, `TarjetaPersonaje`, `BuscadorPorNombre` | `Index`, `Personajes`, `DetallePersonaje` |

**Regla práctica:** si un componente aparece directamente en el `element: <X />` de una ruta,
es una **page**. Si vive adentro de otro componente o page (nunca lo llama el router
directamente), es un **component**.

```jsx
// pages/Personajes.jsx — es una PAGE: la usa createBrowserRouter (ver punto 11)
function Personajes() {
  return (
    <section>
      <FormularioPersonaje ... />  {/* esto es un component, vive adentro de la page */}
      <BuscadorPorNombre ... />     {/* también un component */}
      {personajes.map((personaje) => (
        <TarjetaPersonaje ... />    {/* también un component */}
      ))}
    </section>
  );
}
```

Una **page** típicamente hace el trabajo "pesado": llama a los Custom Hooks (punto 8), maneja
el `loading`/`error`, decide qué mostrar. Un **component** suele ser más chico y más
reutilizable — no sabe de dónde vienen sus datos, solo los recibe por props (punto 3) y los
muestra.

---

## 10. Las rutas ("los caminos"): la idea general

Hasta acá, todo vive en una sola pantalla (`custom-hooks-2` no tiene rutas todavía). El problema
que resuelve el ruteo: que la URL cambie según qué se está mirando, para poder compartir un link
directo o recargar (F5) sin perder dónde se estaba. Cuando se resuelve ese problema (punto 11),
es cuando aparece la carpeta `pages/` del punto 9 — cada page es, literalmente, una pantalla con
su propia URL.

---

## 11. 🔍 A fondo: `createBrowserRouter`

Vamos a construirlo de cero, en el mismo `main.jsx`, pieza por pieza — no como algo que aparece
completo de la nada.

### 11.0 Antes que nada: instalarlo

`createBrowserRouter`, `RouterProvider`, `Link`, `Outlet`, `useParams`, `useNavigate` — todo lo
de las próximas secciones viene de una librería que **no** trae React por defecto. Hay que
agregarla al proyecto una sola vez:

```bash
npm install react-router-dom
```

Se corre parado en la carpeta del proyecto (donde está el `package.json`), con el servidor de
desarrollo apagado o prendido, da igual — no hace falta reiniciar nada especial, `npm` lo agrega
a `package.json` y a `node_modules/`. Recién después de esto se puede escribir
`import { createBrowserRouter } from "react-router-dom";` sin que tire error.

### 11.1 El problema: hoy `main.jsx` solo sabe mostrar un componente

```jsx
// main.jsx tal como está hoy, sin rutas
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

Siempre `<App />`. Sin importar qué URL escriba alguien, se ve lo mismo.

### 11.2 Paso 1: una lista de "si la URL es esto, mostrá esto otro"

```jsx
const mapaRutas = createBrowserRouter([
  { path: "/", element: <Index /> },
]);
```

`createBrowserRouter` recibe un **array** (por eso los corchetes `[ ]`). Cada elemento del
array es un **objeto** (por eso las llaves `{ }`) con dos datos: `path` (el camino, como texto)
y `element` (qué componente mostrar en ese camino, como JSX). Este primer array tiene **un solo**
objeto: "si la URL es `/`, mostrá `Index`".

### 11.3 Paso 2: agregar más caminos, es agregar más objetos a ese array

```jsx
const mapaRutas = createBrowserRouter([
  { path: "/", element: <Index /> },
  { path: "/personajes", element: <Personajes /> },
  { path: "/personajes/:id", element: <DetallePersonaje /> },
]);
```

Nada más raro que eso: **una lista de objetos**, uno por cada pantalla que la app puede
mostrar. `:id` es un comodín con nombre — matchea cualquier valor ahí (`/personajes/1`,
`/personajes/2`, ...).

### 11.4 Paso 3: agregar el comodín para "ninguno de los anteriores"

```jsx
const mapaRutas = createBrowserRouter([
  { path: "/", element: <Index /> },
  { path: "/personajes", element: <Personajes /> },
  { path: "/personajes/:id", element: <DetallePersonaje /> },
  { path: "*", element: <PaginaError /> }, // siempre al final
]);
```

`*` significa "cualquier URL que no matcheó nada de arriba" — por eso tiene que ir **último**:
React Router revisa la lista de arriba hacia abajo, y si pusiéramos `*` primero, se comería
todas las URLs antes de llegar a las rutas de verdad.

### 11.5 Paso 4: agrupar rutas que comparten un mismo "marco" (Header, nav)

En vez de repetir el `<h1>` y la navegación en cada componente, se arma una ruta **padre**
(`Layout`) con las demás **adentro**, en `children`:

```jsx
const mapaRutas = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Index /> },
      { path: "personajes", element: <Personajes /> },
      { path: "personajes/:id", element: <DetallePersonaje /> },
      { path: "*", element: <PaginaError /> },
    ],
  },
]);
```

Notar dos cambios: ahora hay **un solo** objeto de nivel superior (`path: "/"`, con `Layout`), y
los caminos hijos ya no llevan la barra `/` al principio (`"personajes"`, no `"/personajes"`) —
son relativos al padre. `index: true` reemplaza a `path: "/"` para decir "este es el que se
muestra cuando la URL es exactamente la del padre, sin nada más".

`Layout` necesita un lugar donde React inserte a la ruta hija que corresponda:

```jsx
function Layout() {
  return (
    <main className="app">
      <h1>CRUD de Personajes</h1>
      <Outlet /> {/* acá aparece Index, Personajes o DetallePersonaje, según la URL */}
    </main>
  );
}
```

### 11.6 Paso 5: ponerlo a funcionar de verdad

```jsx
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={mapaRutas} />
  </StrictMode>,
);
```

`createBrowserRouter(...)` solo **arma el mapa** (un objeto de configuración, no dibuja nada
todavía). `RouterProvider` es quien realmente lo toma y empieza a mostrar componentes según la
URL del navegador — reemplaza al `<App />` de siempre.

### 11.7 El resultado final, tal cual queda en `react_6/src/main.jsx`

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import Layout from "./pages/Layout";
import Index from "./pages/Index";
import Personajes from "./pages/Personajes";
import DetallePersonaje from "./pages/DetallePersonaje";
import PaginaError from "./pages/PaginaError";

const mapaRutas = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Index /> },
      { path: "personajes", element: <Personajes /> },
      { path: "personajes/:id", element: <DetallePersonaje /> },
      { path: "*", element: <PaginaError /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={mapaRutas} />
  </StrictMode>,
);
```

Cada pieza de este archivo final ya se explicó en los pasos 10.1 a 10.6, en el orden en que se
fue armando. No hay ningún ingrediente que no se haya presentado antes.

---

## 12. El resto del ruteo: `Link`, `useParams`, `useNavigate`

- **`<Link to="/personajes">`** — como un `<a>`, pero sin recargar la página.
- **`useParams()`** — lee el pedazo variable de la URL (el `:id`). Es el mismo mecanismo que las
  props (punto 3), solo que el dato viene de la URL en vez de un componente padre:
  ```jsx
  const { id } = useParams(); // "id" coincide con el ":id" de la ruta
  ```
- **`useNavigate()`** — cambiar de URL desde código, sin que el usuario haya clickeado nada
  (por ejemplo, después de borrar):
  ```jsx
  const navigate = useNavigate();
  navigate(-1);            // atrás
  navigate("/personajes"); // ruta fija
  ```

---

## 13. Conceptos y consultas técnicas de la sesión

Tres preguntas puntuales que salieron en la clase, con la conclusión a la que se llegó.

### 13.1 ¿Hace falta el header `"Content-Type": "application/json"` en un `DELETE`?

```jsx
// useEliminarPersonaje.jsx
const respuesta = await fetch(`${URL_PERSONAJES}/${id}`, {
  method: "DELETE", // sin headers, sin body
});
```

**Conclusión:** generalmente **no**. Ese header le avisa al servidor "te estoy mandando JSON
en el body" — y una petición `DELETE` casi nunca lleva body: el recurso a borrar ya queda
identificado por la URL (`/characters/17`), no hace falta mandar nada más.

**¿Cuándo sí se usan headers en un `DELETE`?** Principalmente para **autenticación** —
`Authorization: Bearer <token>`, para probar que quien pide el borrado tiene permiso — o en
APIs poco comunes que, por diseño propio, exigen igual un JSON en el body incluso para borrar.
Ninguno de los dos casos aplica hoy en `useEliminarPersonaje`.

### 13.2 ¿Qué es exactamente el componente `Layout`?

Ya se vio en el punto 11.5, acá la definición corta:

- **Qué es:** un componente **contenedor** (*wrapper*) que junta la interfaz compartida entre
  varias rutas — en este proyecto, el `<h1>` y (más adelante) una barra de navegación.
- **Pieza clave:** `<Outlet />` — el hueco donde se inyectan las rutas hijas.
- **Ventajas:** no repetir ese HTML en cada page; si `Layout` tiene su propio `state`, ese
  estado **no se pierde** al navegar entre rutas hijas (porque `Layout` nunca se desmonta, solo
  cambia lo que hay adentro del `Outlet`); y es la base para más adelante armar rutas
  protegidas (mostrar un `Layout` distinto si el usuario no inició sesión, por ejemplo).

### 13.3 ¿Por qué `<Link>` y no `<a>`?

Ya se vio en el punto 12, la versión técnica completa:

**Conclusión:** `<Link>` evita el refresco completo de la página — mantiene el comportamiento
de SPA (*Single Page Application*).

**Cómo lo logra, en detalle:**
- Intercepta el evento de click **antes** de que el navegador haga lo que haría por defecto
  con un `<a>` (pedirle al servidor una página nueva).
- En vez de eso, actualiza la URL usando una API nativa del navegador,
  `history.pushState(...)` — cambia lo que se ve en la barra de direcciones sin recargar nada.
- Como no hay recarga, **el estado de la aplicación se conserva** (el `useState` de cualquier
  componente que no se haya desmontado sigue teniendo sus valores) y la navegación es
  instantánea: no hay que volver a descargar el HTML ni reiniciar los componentes que ya
  estaban montados (como `Layout`).

---

## 14. El recorrido completo, de punta a punta

Alguien edita un personaje, en la versión ya ruteada:

1. Entra a `/personajes/3` → `createBrowserRouter` matchea `personajes/:id` → `Outlet` (11.5)
   muestra `DetallePersonaje` (una **page**, punto 9).
2. `DetallePersonaje` lee `3` con `useParams()` (punto 12) — mismo mecanismo que una prop.
3. Con ese `3`, un Custom Hook (punto 8) pide los datos con `fetch` adentro de un `useEffect`.
4. Clickea "Editar" → un evento `onClick` (punto 4) hace `setPersonajeEnEdicion(personaje)`
   (punto 7.2) → el estado cambia (punto 5) → React redibuja.
5. `FormularioPersonaje` (un **component**, punto 9) recibe ese personaje por **prop**
   (punto 3.3) y, gracias al `useEffect` del punto 7.4, precarga sus campos — cada `<input>`
   queda **controlado** (punto 6).
6. Al hacer submit, un evento `onSubmit` ejecuta la función que llegó por prop
   (`onActualizar`) — el formulario ni sabe que eso termina en un `PATCH`.
7. El padre actualiza la lista y, si hiciera falta, llama a `navigate(...)` (punto 12).

Componentes, props, eventos, state, efectos, Custom Hooks y rutas no son siete temas sueltos —
son siete piezas que se necesitan unas a otras para que un solo click termine actualizando un
dato de verdad en el servidor.
