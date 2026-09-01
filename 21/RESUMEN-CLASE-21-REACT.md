# ⚛️ Resumen Clase 21 — Componentes y Sintaxis JSX

> Documento de repaso de todo lo visto en la clase, con foco en el proyecto
> `react_2/` (Calculadora componentizada + demo de `children` + Historial de operaciones).

---

## 📑 Índice

1. [¿Qué es un componente?](#1-qué-es-un-componente)
2. [Reutilización vs repetición — un ejemplo real](#2-reutilización-vs-repetición--un-ejemplo-real)
3. [Eventos en JSX](#3-eventos-en-jsx)
4. [Handler nombrado vs código inline](#4-handler-nombrado-vs-código-inline)
5. [`utils`: separar la lógica de la vista](#5-utils-separar-la-lógica-de-la-vista)
6. [Props: argumentos para la vista](#6-props-argumentos-para-la-vista)
7. [Destructuring de props](#7-destructuring-de-props)
8. [La ley de hierro: props inmutables](#8-la-ley-de-hierro-props-inmutables)
9. [El superpoder: la prop `children`](#9-el-superpoder-la-prop-children)
10. [Renderizado de listas con `.map()`](#10-renderizado-de-listas-con-map)
11. [La prop `key`](#11-la-prop-key)
12. [Spread operator para pasar props](#12-spread-operator-para-pasar-props)
13. [Organización en carpetas](#13-organización-en-carpetas)
14. [🏆 Reglas de oro](#-reglas-de-oro)
15. [🚑 Diccionario de errores](#-diccionario-de-errores)
16. [📇 Chuleta final](#-chuleta-final)

---

## 1. ¿Qué es un componente?

Un **componente** es una función de JavaScript que retorna JSX. Es la pieza básica con la que se arma cualquier interfaz en React.

> **Analogía:** el HTML tradicional es un póster impreso — una vez que sale de la imprenta, no se puede cambiar nada sin reimprimir todo. React es una pantalla digital: está armada con bloques inteligentes (componentes) que se pueden reutilizar y actualizar en tiempo real.

Como con los bloques de LEGO: no esculpimos la pantalla entera de una vez, ensamblamos piezas chicas e independientes.

### Las ideas detrás de "componente"

- **Código reutilizable (genérico):** no está atado a un caso particular, sirve para muchos.
- **Responsabilidad única → SOLID (la "S", *Single Responsibility*):** cada componente hace una sola cosa, y la hace bien. Ya se vio la clase pasada aplicado a archivos (la lógica separada en `utils`); hoy se aplica adentro de la interfaz misma.
- **Partes independientes:** un componente no necesita saber cómo funcionan los demás para hacer su trabajo.
- **Se escribe una sola vez y se usa todas las veces que haga falta, donde haga falta.**

### ¿Qué nos dan los componentes?

- **Interfaz de usuario** — lo visual, lo que el usuario ve y toca.
- **Funcionalidades** — el comportamiento asociado a esa interfaz.
- **Reutilización → evitar repetir código → DRY (*Don't Repeat Yourself*).**
- **Segmentación** — cada componente orientado a una finalidad específica, no a "un poco de todo".

### Modular e interfaz

- **Modular:** compuesto por partes independientes que se pueden conectar, intercambiar, añadir o quitar **sin afectar el resto del sistema**.
- **Interfaz:** el punto de interacción entre dos partes. En un componente, la interfaz son literalmente sus **props** — es el único "contrato" que hace falta conocer para usarlo, sin tener que mirar cómo está hecho por dentro.

**¿El HTML de toda la vida es modular y reutilizable?** No. Un `<div>` con texto adentro no se puede "invocar" con datos distintos ni desconectar sin tocar el resto del documento — hay que copiar y pegar el bloque entero a mano cada vez.

### ¿Qué problemas trae no ser modular / reutilizable?

- **Mantenimiento más costoso** — arreglar un bug significa arreglarlo en cada copia repetida.
- **Más propenso a errores** — el riesgo de bug es directamente proporcional a la cantidad de código (y repetirlo lo multiplica).
- **Difícil escalabilidad** — cuesta mucho hacer crecer algo que ya está duplicado por todos lados.
- **Difícil de interpretar** — un archivo gigante mezclando todo es más difícil de leer que varias piezas chicas con nombre propio.
- **Mucha repetición** — lo contrario de DRY.

---

## 2. Reutilización vs repetición — un ejemplo real

**JSX sin componentizar:** todo el markup de la calculadora escrito una sola vez, a mano, adentro de un único archivo.

```jsx
<div className="campo">
  <label htmlFor="input-numero-1">Número 1</label>
  <input type="number" value={num1} onChange={handleNum1Change} id="input-numero-1" />
</div>

<div className="campo">
  <label htmlFor="input-numero-2">Número 2</label>
  <input type="number" value={num2} onChange={handleNum2Change} id="input-numero-2" />
</div>
```

**Con componentes** (`App.jsx` + `InputNumber.jsx`): el mismo bloque de label+input se escribe **una sola vez** como componente, y se invoca con datos distintos cada vez.

```jsx
<InputNumber label="Número 1" labelId="input-numero-1" value={num1} onChange={...} />
<InputNumber label="Número 2" labelId="input-numero-2" value={num2} onChange={...} />
```

Si mañana hay que agregarle un ícono a todos los inputs, en la primera versión hay que tocar cada bloque a mano. En la segunda, se edita `InputNumber.jsx` una vez y **todos** los inputs de la app cambian solos.

---

## 3. Eventos en JSX

Un **evento** es algo que pasa en la interfaz y que React puede "escuchar": un click, que se escriba en un input, que se envíe un formulario.

- En JSX se escriben en **camelCase**: `onClick`, `onChange`, `onSubmit` — nunca `onclick` en minúsculas (esa es la sintaxis del HTML plano).
- Cada handler recibe automáticamente un objeto **`evento`** con información de lo que pasó. El más usado: `evento.target.value`, el valor actual de un input.

```jsx
<input
  type="number"
  value={num1}
  onChange={(evento) => setNum1(Number(evento.target.value))}
/>
```

> ⚠️ **`evento.target.value` siempre es string**, aunque el input sea `type="number"`. Por eso se envuelve con `Number(...)` antes de guardarlo en el estado — si no, `"7" + 1` da `"71"`, no `8`.

---

## 4. Handler nombrado vs código inline

Esta línea admite dos formas exactamente equivalentes:

```jsx
// Inline: la función se define ahí mismo, adentro del JSX, sin nombre propio.
<input onChange={(evento) => setNum1(Number(evento.target.value))} />
```

```jsx
// Handler nombrado: se declara aparte, antes del return, y se pasa por nombre.
const handleNum1Change = (evento) => {
  setNum1(Number(evento.target.value));
};

<input onChange={handleNum1Change} />
```

- **Sin paréntesis:** `onChange={handleNum1Change}` le entrega la función a React para que la guarde y la ejecute *cuando* haga falta. `onChange={handleNum1Change()}` la ejecutaría *ahora mismo*, al renderizar — error clásico.
- **¿Cuándo usar cada una?** Es la misma función en los dos casos, es una cuestión de legibilidad. Inline está bien para algo de una línea. Si el handler creciera (varias líneas, validaciones) o se necesitara en más de un lugar, conviene nombrarlo aparte — como `handleOperar` en `App.jsx`, que ya es un handler nombrado porque hace más que una línea.
- **Un caso en el que el inline es obligatorio, no solo estilo:**

```jsx
<button onClick={() => handleOperar("sumar")}>sumar</button>
```

Acá hace falta el inline para poder pasarle el argumento `"sumar"` en el momento del click. Un `onClick={handleOperar}` a secas ejecutaría `handleOperar(evento)` con el evento del click como argumento, no con el string esperado.

---

## 5. `utils`: separar la lógica de la vista

```js
// utils/mathOperations.js
export const mathOperations = {
  suma: (a, b) => a + b,
  resta: (a, b) => a - b,
  // ...
};
```

Una carpeta `utils` es donde vive **código que no es React**: funciones normales de JavaScript, sin JSX, sin `useState`, sin componentes. `mathOperations` no sabe que existe una calculadora, ni un `<button>`, ni un estado — solo sabe operar con dos números.

Es la misma idea de responsabilidad única de la clase pasada, aplicada a nivel de **archivo**: la lógica de cálculo por un lado, la interfaz por otro. Ventaja concreta: ese código se podría reutilizar (o probar) en un proyecto que no tenga nada de React, porque no depende de React para nada.

---

## 6. Props: argumentos para la vista

Si un componente es una función, las **props** (propiedades) son los argumentos que se le pasan. Se escriben como si fueran atributos de HTML:

```jsx
// App.jsx (el Padre)
<OperationButton operacion="sumar" onOperar={handleOperar} />
<OperationButton operacion="restar" onOperar={handleOperar} />
```

Cada instancia del componente recibe **su propio** conjunto de valores — por eso se puede reutilizar `OperationButton` cuatro veces (una por operación) sin que los cuatro botones hagan lo mismo.

---

## 7. Destructuring de props

Por dentro, un componente recibe **un solo objeto** con todas sus props (`props.num1`, `props.operacion`, ...). En vez de escribir `props.algo` todo el tiempo, se desestructura directo en los parámetros de la función:

```jsx
// components/ItemHistorial.jsx
function ItemHistorial({ num1, num2, operacion, resultado }) {
  return (
    <li className="item-historial">
      <span>{num1} <strong>{operacion}</strong> {num2}</span>
      <span>= {resultado}</span>
    </li>
  );
}
```

---

## 8. La ley de hierro: props inmutables

Las props son de **solo lectura**. El flujo de datos siempre viaja de Padre a Hijo, como una cascada — nunca al revés.

```jsx
function ItemHistorial({ resultado }) {
  resultado = 999; // ❌ React lo ignora / tira warning en consola
  return <span>{resultado}</span>;
}
```

Si un componente necesita cambiar un dato, ese dato tiene que vivir en el **estado** (`useState`) de quien lo controla, no reescribirse desde la prop recibida.

---

## 9. El superpoder: la prop `children`

A veces no alcanza con pasar un texto o un número — se necesita pasar **JSX entero** (otros elementos) adentro de un componente. Para eso existe la prop especial `children`.

```jsx
// components/CajaDecorada.jsx
function CajaDecorada({ children }) {
  return <div className="caja-decorada">{children}</div>;
}
```

```jsx
// App.jsx
<CajaDecorada>
  <h2>¿Sabías que...?</h2>
  <p>Todo esto es el children.</p>
</CajaDecorada>
```

`CajaDecorada` no sabe de antemano qué va a mostrar — solo sabe que tiene que envolver, con su estilo, a lo que sea que el padre le meta adentro.

---

## 10. Renderizado de listas con `.map()`

Cuando hay que dibujar una lista (en `react_2`, el historial de operaciones que se va llenando a medida que se calcula), no se escribe un `<ItemHistorial />` por cada uno a mano. Se usa `.map()`:

```jsx
const historial = [
  { id: "a1", num1: 3, num2: 4, operacion: "sumar", resultado: 7 },
  { id: "a2", num1: 10, num2: 2, operacion: "dividir", resultado: 5 },
];

{historial.map((item) => (
  <ItemHistorial key={item.id} {...item} />
))}
```

**¿Por qué `.map()` y no `forEach`?** `forEach` recorre el array pero no devuelve nada (`undefined`). React necesita "ver" algo para poder dibujarlo — `.map()` devuelve un **array nuevo de elementos JSX**, que es justo lo que hace falta.

**Paréntesis en vez de llaves:** dentro de la función flecha se usa `(` en vez de `{`. Es **retorno implícito**: le dice a JS "todo esto de acá adentro es lo que hay que devolver", sin escribir `return` explícito.

```jsx
// retorno implícito — más corto
(item) => (<ItemHistorial key={item.id} {...item} />)

// equivalente con llaves — necesita return explícito
(item) => { return <ItemHistorial key={item.id} {...item} />; }
```

---

## 11. La prop `key`

```jsx
{historial.map((item) => (
  <ItemHistorial key={item.id} {...item} />
))}
```

React **obliga** a pasar una prop `key` con un valor único cuando se generan elementos con `.map()`. Es la huella digital que usa React para saber exactamente qué elemento agregar, mover o borrar de la pantalla si la lista cambia — sin ella, no puede distinguir un renglón de otro de forma confiable. En `react_2`, cada vez que se calcula algo nuevo, ese `id` se genera con `crypto.randomUUID()` (ya visto la clase pasada) y el ítem se agrega **al principio** del array — sin `key`, React podría confundirse y actualizar el renglón equivocado en vez de insertar uno nuevo arriba.

> **Regla práctica:** usar un `id` real del dato, nunca el índice del array si la lista se puede reordenar, filtrar o eliminar en el medio.

---

## 12. Spread operator para pasar props

Cuando un objeto ya tiene exactamente las propiedades que el componente espera como props, se puede "desparramar" entero en vez de escribir cada prop a mano:

```jsx
const item = { id: "a1", num1: 3, num2: 4, operacion: "sumar", resultado: 7 };

<ItemHistorial {...item} />
// equivale exactamente a:
<ItemHistorial id="a1" num1={3} num2={4} operacion="sumar" resultado={7} />
```

`ItemHistorial` solo va a usar `num1`, `num2`, `operacion` y `resultado` (los que desestructura) — que además venga un `id` en el objeto no genera ningún problema, simplemente no se usa como prop dentro del componente (se usa aparte, en el `key`).

---

## 13. Organización en carpetas

```text
src/
 ├── components/
 │    ├── InputNumber.jsx
 │    ├── OperationButton.jsx
 │    ├── ResultadoDisplay.jsx
 │    ├── CajaDecorada.jsx
 │    └── ItemHistorial.jsx
 ├── utils/
 │    └── mathOperations.js
 ├── App.jsx
 ├── App.css
 ├── main.jsx
```

Cada componente vive en su propio archivo, con su propia responsabilidad (principio de responsabilidad única, visto la clase pasada). `utils/` guarda la lógica que no es JSX. `App.jsx` es el que conoce a todos y los orquesta — los componentes hijos no se conocen entre sí.

---

## 🏆 Reglas de oro

1. Un componente es una función que retorna JSX — nombre en PascalCase (`ItemHistorial`, no `itemHistorial`).
2. Las props se reciben desestructuradas en el parámetro: `function Componente({ prop1, prop2 })`.
3. Las props son de **solo lectura** — nunca se reasignan adentro del componente que las recibe.
4. Los eventos en JSX van en camelCase (`onClick`, `onChange`) y `evento.target.value` siempre es string.
5. Un handler se pasa **sin paréntesis** (`onChange={miHandler}`) — con paréntesis se ejecuta al renderizar, no al disparar el evento.
6. Para dibujar una lista: `.map()`, nunca `forEach` (no devuelve nada) ni un `for` clásico adentro del JSX.
7. Todo elemento que sale de un `.map()` necesita `key` única — un `id` real, no el índice.
8. `children` es la prop que recibe todo lo que se escribe **entre** las etiquetas de apertura y cierre de un componente.
9. El spread (`{...objeto}`) pasa todas las propiedades de un objeto como props, de una sola vez.
10. La lógica que no es React (cálculos, formateo, validaciones puras) va en `utils/`, no mezclada adentro de un componente.

---

## 🚑 Diccionario de errores

| Mensaje / síntoma | Causa | Solución |
| :--- | :--- | :--- |
| `Warning: each child in a list should have a unique "key" prop` | Falta `key={...}` en el elemento generado por `.map()` | Agregar `key={dato.id}` |
| El componente no muestra nada de lo que se le pasó "adentro" | El componente no desestructura ni usa `children` | Agregar `{ children }` a los parámetros y renderizarlo `{children}` |
| `props.algo is undefined` | El nombre de la prop no coincide entre quien la pasa y quien la recibe | Revisar que el nombre en `<Componente prop="x" />` sea el mismo que en `function Componente({ prop })` |
| La lista se ve pero con un warning de "índice como key" | Se usó `key={index}` en vez de un id real | Usar un campo único del dato (`id`) |
| `.map()` no imprime nada en pantalla | Se usó `forEach` en su lugar | Cambiar a `.map()` |
| Cambié la prop dentro del componente hijo y no pasa nada / tira warning | Se intentó reasignar una prop | Las props no se mutan — si algo tiene que cambiar, tiene que ser estado (`useState`) en el padre |
| El evento se dispara solo, apenas carga la página | Se escribió `onClick={handleClick()}` en vez de `onClick={handleClick}` | Sacar los paréntesis |
| `"7" + 1` da `"71"` en vez de `8` | `evento.target.value` es string, no se convirtió | Envolver con `Number(evento.target.value)` |

---

## 📇 Chuleta final

```jsx
// ---------- COMPONENTE BÁSICO ----------
function MiComponente({ prop1, prop2 }) {
  return <div>{prop1} — {prop2}</div>;
}
export default MiComponente;

// ---------- USO CON PROPS ----------
<MiComponente prop1="hola" prop2={42} />

// ---------- EVENTOS ----------
<input onChange={(evento) => setValor(Number(evento.target.value))} />
<button onClick={() => hacerAlgo("parametro")}>Click</button>

// ---------- HANDLER NOMBRADO ----------
const handleClick = () => { /* ... */ };
<button onClick={handleClick}>Click</button>  // sin paréntesis

// ---------- CHILDREN ----------
function Caja({ children }) {
  return <div className="caja">{children}</div>;
}
<Caja><p>Esto es el children</p></Caja>

// ---------- LISTA CON MAP + KEY ----------
{items.map((item) => (
  <MiComponente key={item.id} prop1={item.texto} />
))}

// ---------- SPREAD DE PROPS ----------
<MiComponente {...objetoConLasPropsExactas} />

// ---------- UTILS (no es JSX, es JS puro) ----------
// utils/miUtilidad.js
export const miUtilidad = {
  hacerAlgo: (a, b) => a + b,
};
```
