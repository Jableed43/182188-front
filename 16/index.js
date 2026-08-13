// ==========================================================
// SISTEMA DE INVENTARIO — punto de entrada
// Correr con:  node index.js
// ==========================================================

// common.js, utiliza require y module.exports
const { productos } = require('./datos');
const {
    listarProductos,
    agregarProducto,
    reemplazarProducto,
    obtenerDisponibles,
    aplicarDescuento,
    buscarPorNombre,
    todosConStock,
    algunoConStock,
    calcularValorTotal,
    // ordenarPorPrecio,
    // obtenerNombresConStock,
} = require('./inventario');


console.log("========================================");
console.log("       SISTEMA DE INVENTARIO            ");
console.log("========================================");


// --- 1. Listar catálogo ---
console.log("\n--- 1. CATÁLOGO COMPLETO ---");
listarProductos(productos);


// // --- 2. Agregar producto ---
console.log("\n--- 2. AGREGAR AURICULARES ---");
agregarProducto(productos, { nombre: "auriculares", precio: 95000, stock: 7 });
listarProductos(productos);


// // --- 3. Reemplazar producto discontinuado ---
console.log("\n--- 3. REEMPLAZAR LAPTOP ---");
reemplazarProducto(productos, "laptop", { nombre: "laptop pro", precio: 950000, stock: 2 });
listarProductos(productos);


// // --- 4. Disponibles ---
console.log("\n--- 4. PRODUCTOS CON STOCK ---");
const disponibles = obtenerDisponibles(productos);
listarProductos(disponibles);


// // --- 5. Descuento ---
console.log("\n--- 5. EN OFERTA (15% de descuento) ---");
const enOferta = aplicarDescuento(productos, 15);
listarProductos(enOferta);


// // --- 6. Buscar ---
console.log("\n--- 6. BÚSQUEDA ---");
const encontrado = buscarPorNombre(productos, "mouse");
console.log("mouse encontrado:", encontrado);
const noExiste = buscarPorNombre(productos, "tablet");
console.log("tablet encontrado:", noExiste); // undefined


// // --- 7 y 8. every y some ---
console.log("\n--- 7. CONSULTAS DE STOCK ---");
console.log("¿Todos con stock? - EVERY", todosConStock(productos));   // false
console.log("¿Alguno con stock? - SOME", algunoConStock(productos)); // true

// // --- 9. Valor total ---
console.log("\n--- 8. VALOR TOTAL DEL INVENTARIO ---");
const total = calcularValorTotal(productos);
console.log("Valor total: $" + total.toLocaleString("es-AR"));


// // --- 10. Ordenar ---
// console.log("\n--- 9. ORDENADOS POR PRECIO ---");
// const ordenados = ordenarPorPrecio(productos);
// listarProductos(ordenados);


// // --- 11. Desafío ---
// console.log("\n--- 10. NOMBRES CON STOCK ---");
// console.log(obtenerNombresConStock(productos));


// // --- Verificación final ---
// console.log("\n--- ORIGINAL INTACTO DESPUÉS DE MAP/FILTER/SORT? ---");
// listarProductos(productos);
