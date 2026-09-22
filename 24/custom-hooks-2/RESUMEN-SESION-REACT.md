# Resumen — ¿Qué es una "sesión" en React?

> Salida de la clase de login. Sirve para repasar solo, sin el profe al lado.

## Índice

1. [La idea en una frase](#1-la-idea-en-una-frase)
2. [¿Dónde vive la sesión?](#2-dónde-vive-la-sesión)
3. [El recorrido completo, paso a paso](#3-el-recorrido-completo-paso-a-paso)
4. [Por qué sobrevive a un F5](#4-por-qué-sobrevive-a-un-f5)
5. [Esto NO es seguridad real](#5-esto-no-es-seguridad-real)
6. [Reglas de oro](#6-reglas-de-oro)
7. [Diccionario de errores](#7-diccionario-de-errores)
8. [Chuleta final](#8-chuleta-final)

---

## 1. La idea en una frase

**Una sesión es, ni más ni menos, una variable que dice "quién soy" y que TODA la app puede leer
al mismo tiempo.** En nuestro proyecto es literalmente esto:

```js
const [usuario, setUsuario] = useState(null);
```

- `usuario === null` → nadie logueado (invitado).
- `usuario === { id, name, email, password }` → hay sesión: ese es el usuario logueado.

Eso es todo el concepto. Lo demás (`Context`, `localStorage`, `fetch`) son solo las herramientas
para que ese `null` o `{...}` (a) se pueda leer desde cualquier componente y (b) no se borre solo
porque recargaste la página.

---

## 2. ¿Dónde vive la sesión?

En **dos lugares al mismo tiempo**, y hay que tener clarísima la diferencia:

| Lugar | Qué guarda | Cuánto dura | Quién lo lee |
| :--- | :--- | :--- | :--- |
| **Estado de React** (`useState` en `AuthContext.jsx`) | El objeto `usuario` en memoria | Se borra apenas recargás la página (F5) o cerrás la pestaña | Cualquier componente, vía `useAuth()` |
| **`localStorage`** (del navegador) | El mismo objeto, pero como texto (`JSON.stringify`) | Sobrevive a un F5, a cerrar el navegador, incluso a reiniciar la compu | Solo se lee **una vez**, al arrancar la app |

La sesión "de verdad" (la que hace que la pantalla cambie) es la de React. `localStorage` es
solo la copia de respaldo que se usa **una única vez**, al cargar la página, para reconstruir esa
sesión de React sin obligar a loguearse de nuevo.

---

## 3. El recorrido completo, paso a paso

### 3.1 — Arranca la app: ¿había sesión guardada?

```jsx
const [usuario, setUsuario] = useState(() => {
  const guardado = localStorage.getItem("usuario");
  return guardado ? JSON.parse(guardado) : null;
});
```

Esto corre **una sola vez**, cuando `AuthProvider` se monta por primera vez (al abrir la app o
recargarla). Si `localStorage` tenía algo guardado de una visita anterior, arranca logueado. Si
no, arranca en `null`.

> 🔑 El `useState(() => { ... })` con una función adentro (en vez de `useState(valorFijo)`) es la
> misma técnica que usaron en `ThemeContext` para leer el tema guardado. Sirve para que ese cálculo
> (leer y parsear `localStorage`) se haga solo la primera vez, no en cada render.

### 3.2 — El usuario hace login

```jsx
const login = async (email, password) => {
  const respuesta = await fetch(`${URL_USUARIOS}?email=${email}&password=${password}`);
  const encontrados = await respuesta.json();

  if (encontrados.length === 0) {
    setError("Email o contraseña incorrectos");
    return false;
  }

  guardarSesion(encontrados[0]); // 👈 acá nace la sesión
  return true;
};
```

`json-server` deja filtrar por query string: `?email=X&password=Y` trae solo los usuarios que
coincidan con **ambos** datos. Si no hay ninguno, no hubo login.

### 3.3 — Nace (o muere) la sesión

```jsx
const guardarSesion = (usuarioLogueado) => {
  setUsuario(usuarioLogueado);                               // actualiza React → la pantalla cambia YA
  localStorage.setItem("usuario", JSON.stringify(usuarioLogueado)); // actualiza el respaldo
};

const logout = () => {
  setUsuario(null);
  localStorage.removeItem("usuario");
};
```

Cada vez que la sesión cambia, se escribe **en los dos lugares a la vez**. Si solo actualizaran
React y no `localStorage`, la sesión se perdería con cada F5. Si solo actualizaran `localStorage`
y no React, la pantalla no se enteraría del cambio (React no redibuja porque nadie "mira"
`localStorage" en tiempo real).

### 3.4 — Cualquier componente pregunta "¿hay sesión?"

```jsx
// en Layout.jsx, Personajes.jsx, DetallePersonaje.jsx — cada uno por su cuenta
const { usuario } = useAuth();
```

Ninguno de esos tres componentes recibe `usuario` por props. Los tres están adentro del mismo
`<AuthProvider>` (en `main.jsx`) y cada uno sintoniza la misma señal con su propio `useAuth()`.

---

## 4. Por qué sobrevive a un F5

Sin `localStorage`, el flujo sería: login → `usuario` en memoria → F5 → toda la memoria de React
se destruye y se crea de cero → `usuario` vuelve a `null`.

Con `localStorage`, el flujo es: login → `usuario` en memoria **y en disco** → F5 → toda la
memoria de React se destruye → `AuthProvider` se vuelve a montar → el `useState(() => ...)` del
paso 3.1 lee el disco y reconstruye `usuario`. Por fuera parece que "no pasó nada", pero en
realidad la sesión se recreó desde cero, a partir del respaldo.

---

## 5. Esto NO es seguridad real

Repetir esto en voz alta las veces que haga falta:

- Todo lo que vimos hoy **solo decide qué se dibuja en pantalla**. No impide que alguien, sin
  loguearse, abra la consola del navegador y llame directo a `fetch(... , { method: "DELETE" })`
  contra la API.
- La contraseña viaja **en texto plano**, dentro de la URL (`?password=1234`), y se guarda tal
  cual en `localStorage`. Un backend real la recibe por `POST` (nunca por query string), la
  guarda **hasheada** (nunca en texto plano) y devuelve un token en vez del usuario completo.
- Bloquear el acceso a una ruta entera (por ejemplo, que `/personajes` redirija a `/login` si no
  hay sesión) es el tema de la próxima clase — hoy solo ocultamos botones, no rutas.

---

## 6. Reglas de oro

1. **Un solo lugar guarda el estado real.** El `useState` de `AuthProvider` es la única fuente de
   verdad; `localStorage` es un respaldo, no una segunda fuente de verdad.
2. **Login y logout siempre tocan los dos lugares a la vez** (`setUsuario` + `localStorage`).
   Tocar uno solo rompe la sincronía.
3. **`useAuth()` en vez de `useContext(AuthContext)` a mano.** El hook propio es más corto y evita
   que cada componente tenga que importar `AuthContext` además de `useContext`.
4. **El `Provider` va afuera del `RouterProvider`** en `main.jsx`. Si quedara adentro de `Layout`,
   `Layout` no podría leer su propia señal.
5. **`usuario &&` / `usuario ? ... : ...`** es la forma de decidir qué se muestra según haya o no
   sesión — el mismo `if` de siempre, aplicado a un dato que viene de Context en vez de props.

---

## 7. Diccionario de errores

| Síntoma | Causa típica |
| :--- | :--- |
| El login "funciona" pero al hacer F5 vuelve a pedir sesión | Se llamó a `setUsuario(...)` pero se olvidó el `localStorage.setItem(...)` |
| `useAuth is not a function` o `usuario` sale `undefined` | El componente está usando `useAuth()` fuera de un `<AuthProvider>` (revisar que `main.jsx` lo envuelva) |
| El botón "Salir" no hace nada | `logout` no está siendo importado o no se está llamando en el `onClick` |
| Después de "Salir", `usuario` sigue apareciendo al recargar | El `logout` actualizó React pero no borró `localStorage.removeItem("usuario")` |
| El login nunca falla, aunque la contraseña esté mal | La URL del `fetch` no tiene bien armado el query string (`?email=...&password=...`) |
| `JSON.parse` tira un error al abrir la app | `localStorage` tiene guardado algo que no es JSON válido (por ejemplo, se guardó el string suelto en vez de `JSON.stringify(...)`) |

---

## 8. Chuleta final

```jsx
// 1. Estado + respaldo
const [usuario, setUsuario] = useState(() => {
  const guardado = localStorage.getItem("usuario");
  return guardado ? JSON.parse(guardado) : null;
});

// 2. Nace la sesión
setUsuario(datos);
localStorage.setItem("usuario", JSON.stringify(datos));

// 3. Muere la sesión
setUsuario(null);
localStorage.removeItem("usuario");

// 4. Cualquier componente, sin props
const { usuario } = useAuth();
{usuario ? <Salir /> : <Login />}
```
