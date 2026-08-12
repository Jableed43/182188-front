# Sistema de Inventario
**Clase 16 — JavaScript: Arrays · Curso Front-End**

---

Tenés que construir el motor de un sistema de inventario. El sistema ya existe: el archivo `index.js` está escrito y ejecuta todo. Lo único que falta son las funciones — eso es tu trabajo.

Cuando termines, vas a correr:

```bash
node index.js
```

Y el output tiene que verse exactamente así:

```
========================================
       SISTEMA DE INVENTARIO
========================================

--- 1. CATÁLOGO COMPLETO ---
parlante -> $120000 (stock: 4)
laptop -> $800000 (stock: 0)
mouse -> $80000 (stock: 12)
teclado -> $50000 (stock: 3)
monitor -> $200000 (stock: 0)

--- 2. AGREGAR AURICULARES ---
parlante -> $120000 (stock: 4)
laptop -> $800000 (stock: 0)
mouse -> $80000 (stock: 12)
teclado -> $50000 (stock: 3)
monitor -> $200000 (stock: 0)
auriculares -> $95000 (stock: 7)

--- 3. REEMPLAZAR LAPTOP ---
parlante -> $120000 (stock: 4)
laptop pro -> $950000 (stock: 2)
mouse -> $80000 (stock: 12)
teclado -> $50000 (stock: 3)
monitor -> $200000 (stock: 0)
auriculares -> $95000 (stock: 7)

--- 4. PRODUCTOS CON STOCK ---
parlante -> $120000 (stock: 4)
laptop pro -> $950000 (stock: 2)
mouse -> $80000 (stock: 12)
teclado -> $50000 (stock: 3)
auriculares -> $95000 (stock: 7)

--- 5. EN OFERTA (15% de descuento) ---
parlante -> $102000 (stock: 4)
laptop pro -> $807500 (stock: 2)
mouse -> $68000 (stock: 12)
teclado -> $42500 (stock: 3)
monitor -> $170000 (stock: 0)
auriculares -> $80750 (stock: 7)

--- 6. BÚSQUEDA ---
mouse encontrado: { nombre: 'mouse', precio: 80000, stock: 12 }
tablet encontrado: undefined

--- 7. CONSULTAS DE STOCK ---
¿Todos con stock? false
¿Alguno con stock? true

--- 8. VALOR TOTAL DEL INVENTARIO ---
Valor total: $4.155.000

--- 9. ORDENADOS POR PRECIO ---
teclado -> $50000 (stock: 3)
mouse -> $80000 (stock: 12)
auriculares -> $95000 (stock: 7)
parlante -> $120000 (stock: 4)
monitor -> $200000 (stock: 0)
laptop pro -> $950000 (stock: 2)

--- 10. NOMBRES CON STOCK ---
parlante, laptop pro, mouse, teclado, auriculares

--- ORIGINAL INTACTO DESPUÉS DE MAP/FILTER/SORT? ---
parlante -> $120000 (stock: 4)
laptop pro -> $950000 (stock: 2)
mouse -> $80000 (stock: 12)
teclado -> $50000 (stock: 3)
monitor -> $200000 (stock: 0)
auriculares -> $95000 (stock: 7)
```

---

## Archivos

```
sistema-inventario/
  datos.js             ← el array de productos (no tocar)
  inventario.js        ← acá escribís las funciones
  inventario.final.js  ← no abrir hasta terminar
  index.js             ← no tocar
```

Solo modificás `inventario.js`. Nada más.

---

## Las funciones que tenés que implementar

Cada función ya está declarada en `inventario.js` con su descripción. Tu trabajo es escribir el cuerpo.

| Función | Método | Qué tiene que hacer |
| :--- | :---: | :--- |
| `listarProductos(lista)` | `forEach` | Imprime cada producto en el formato del output |
| `agregarProducto(lista, nuevo)` | `push` | Agrega al final, retorna la lista |
| `reemplazarProducto(lista, nombre, nuevo)` | `findIndex` + `splice` | Busca por nombre y reemplaza en esa posición |
| `obtenerDisponibles(lista)` | `filter` | Retorna array nuevo solo con stock > 0 |
| `aplicarDescuento(lista, porcentaje)` | `map` | Retorna array nuevo con precios reducidos. El original no cambia |
| `buscarPorNombre(lista, nombre)` | `find` | Retorna el objeto o `undefined` si no existe |
| `todosConStock(lista)` | `every` | Retorna `true` / `false` |
| `algunoConStock(lista)` | `some` | Retorna `true` / `false` |
| `calcularValorTotal(lista)` | `reduce` | Suma `precio × stock` de cada producto |
| `ordenarPorPrecio(lista)` | `sort` | Retorna array nuevo ordenado. El original no cambia |
| `obtenerNombresConStock(lista)` | `filter` + `map` + `join` | Retorna un string. Una sola línea |

---

## Reglas

- `map`, `filter`, `reduce` y `sort` **no deben modificar el array original**. Si el output final muestra `$120000` para el parlante, es porque el original está intacto.
- `push` y `splice` **sí modifican** el original — es lo esperado en las funciones 2 y 3.
- `obtenerNombresConStock` tiene que estar resuelta en **una sola línea**.

---

## Referencia rápida

```js
lista.forEach(x => { ... })                        // recorre, no retorna
lista.map(x => transformación)                     // array nuevo, mismo largo
lista.filter(x => condición)                       // array nuevo, solo los true
lista.find(x => condición)                         // el primer objeto, o undefined
lista.findIndex(x => condición)                    // el índice, o -1
lista.every(x => condición)                        // true si todos cumplen
lista.some(x => condición)                         // true si alguno cumple
lista.reduce((acum, x) => acum + x, valorInicial)  // un solo valor

lista.push(elemento)                               // agrega al final ⚠️ muta
lista.splice(desde, cuántos, ...queInserto)        // navaja suiza ⚠️ muta
[...lista].sort((a, b) => a.precio - b.precio)     // copiar antes de ordenar
```
