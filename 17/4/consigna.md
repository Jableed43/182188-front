# 🛒 Consigna: Sistema de Registro y Liquidación de Compras

## 📋 Descripción

Se solicita crear un programa en JavaScript que simule un **punto de venta interactivo** mediante DOM y cuadros de diálogo (`prompt`).

El objetivo es registrar los productos que un cliente desea comprar, validar cuáles están disponibles en la tienda, calcular el monto total de la compra y **mostrar todos los resultados en la página**.

---

## 🎯 Objetivos de Aprendizaje

- Manipulación de **arrays** y **objetos**.
- Métodos de iteración y búsqueda: `.map()`, `.forEach()`, `.find()`.
- Normalización y validación de strings: `.toLowerCase()`, `.trim()`.
- **Desestructuración** de objetos (*destructuring*).
- Uso de bucles (`while`) y estructuras de control condicionales.
- **Manipulación del DOM**: `querySelector()`, `createElement()`, `appendChild()`, `textContent`, `innerHTML`, `classList`.
- **Eventos**: `addEventListener()`.

---

## 📝 Requisitos del Ejercicio

### 1. Lista de Precios Base

Crear una estructura de datos `productos` que contenga el catálogo de la tienda con sus respectivos precios de referencia.

Cada producto es un objeto con dos claves: `nombre` y `precio`.

```js
const productos = [
  { nombre: "pan",  precio: 3000 },
  { nombre: "cafe", precio: 7000 },
  // ...
];
```

> **Por qué así:** todos los objetos tienen la misma estructura, así que se accede siempre igual (`producto.nombre`, `producto.precio`) sin tener que averiguar cómo se llama la clave.

---

### 2. Función `registrarProductos(productos)`

Implementar una función que le pida al usuario ingresar los productos **uno a uno** mediante `prompt()`.

| Aspecto | Requisito |
| :--- | :--- |
| **Condición de fin** | La carga finalizará únicamente cuando el usuario ingrese un punto (`"."`). |
| **Normalización** | Cada entrada debe ignorar espacios sobrantes al inicio/final y no debe ser sensible a mayúsculas/minúsculas.<br>Ej: `"  Shampoo "` se evalúa como `"shampoo"`. |
| **Clasificación** | Si el producto **existe** en el catálogo → se guarda en el array `productosCliente`.<br>Si el producto **no existe** → se guarda en el array `productosNoEncontrados`. |
| **Retorno** | Un objeto con ambos listados: `{ productosCliente, productosNoEncontrados }`. |

**Pistas de implementación:**

- Usar `.map()` para obtener el listado de nombres del catálogo.
- Usar `.find()` para verificar si la entrada del usuario existe en ese listado.
- Contemplar que si el usuario presiona **Cancelar**, `prompt()` devuelve `null`.
- Contemplar que el usuario puede aceptar el diálogo **sin escribir nada** (string vacío).

---

### 3. Función `calcularTotal(productosCliente, productos)`

Implementar una función que reciba la lista de productos válidos del cliente y la lista base de precios:

1. Recorrer la lista de productos comprados con `.forEach()`.
2. Buscar con `.find()` el precio unitario correspondiente a cada producto en el catálogo.
3. Acumular y calcular el total a pagar.

**Retorno:** el monto total acumulado.

---

### 4. Función `mostrarCatalogo()`

Dibujar en la página la tabla del catálogo **a partir del array `productos`**.

> ⚠️ El listado **no se escribe a mano en el HTML**. En el HTML sólo va la estructura vacía (`<thead>` y un `<tbody>` con `id`); las filas las genera JavaScript.

| Paso | Detalle |
| :--- | :--- |
| **Vaciar** | `contenedor.innerHTML = ""` antes de dibujar. |
| **Recorrer** | `.forEach()` sobre `productos`, desestructurando `{ nombre, precio }`. |
| **Crear** | Una fila `<tr>` por producto, con sus celdas `<td>` (número, nombre, precio). |
| **Insertar** | `appendChild()` de las celdas en la fila, y de la fila en el `<tbody>`. |
| **Pie** | Mostrar la cantidad total de productos del catálogo (`productos.length`). |

---

### 5. Función `mostrarLista(contenedor, elementos, mensajeVacio)`

Función **reutilizable** que dibuja un array de strings dentro de un `<ul>`. Se usa dos veces: para los productos aceptados y para los no encontrados.

| Parámetro | Qué recibe |
| :--- | :--- |
| `contenedor` | El elemento `<ul>` donde hay que dibujar. |
| `elementos` | El array de strings a mostrar. |
| `mensajeVacio` | El texto a mostrar si el array está vacío. |

**Comportamiento:**

1. Vaciar el contenedor antes de dibujar.
2. Si el array está vacío → mostrar un único `<li>` con `mensajeVacio` y cortar la función.
3. Si tiene elementos → crear un `<li>` por cada uno e insertarlo con `appendChild()`.

---

### 6. Función `iniciarCompra()`

Es la función que **orquesta todo el proceso**. Se ejecuta al hacer click en el botón *Iniciar compra*.

1. Invocar `registrarProductos()` capturando el resultado con **desestructuración de objetos**:
   ```js
   const { productosCliente, productosNoEncontrados } = registrarProductos(productos);
   ```
2. Invocar `calcularTotal()` con los productos válidos.
3. Mostrar los resultados **por consola** (`console.log`).
4. Mostrar los resultados **en la página**, usando `mostrarLista()` y actualizando el total.
5. Revelar la sección de resultados con `classList`.

---

### 7. Eventos y Arranque

- Registrar el evento del botón *Iniciar compra* con `addEventListener()`.

  > ⚠️ La función se pasa **sin paréntesis**: `addEventListener("click", iniciarCompra)`.

- Al cargar la página, invocar `mostrarCatalogo()` para que la tabla aparezca antes de empezar la compra.

---

## 📤 Salida Esperada

La información debe mostrarse **en la página (DOM)** y además **por consola** (`console.log`):

- [ ] El **catálogo** de la tienda con sus precios (tabla).
- [ ] Los productos ingresados que **no fueron encontrados** en la tienda.
- [ ] Los productos **válidos aceptados** en la compra.
- [ ] El **total final a pagar**.

---

## ✅ Checklist de Entrega

- [ ] `productos` con la estructura `{ nombre, precio }`
- [ ] `registrarProductos(productos)` → retorna `{ productosCliente, productosNoEncontrados }`
- [ ] `calcularTotal(productosCliente, productos)` → retorna el total
- [ ] `mostrarCatalogo()`
- [ ] `mostrarLista(contenedor, elementos, mensajeVacio)`
- [ ] `iniciarCompra()`
- [ ] Uso de `.map()`, `.find()`, `.forEach()`
- [ ] Uso de `.trim()` y `.toLowerCase()`
- [ ] Uso de desestructuración
- [ ] Salida por pantalla y por consola
