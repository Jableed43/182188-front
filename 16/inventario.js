// ==========================================================
// SISTEMA DE INVENTARIO — funciones a completar
// Correr con:  node index.js
// ==========================================================

// ----------------------------------------------------------
// 1. listarProductos(lista)
//    Recorre el array e imprime cada producto con forEach.
//    Formato: "parlante -> $120000 (stock: 4)"
//    No retorna nada.
// ----------------------------------------------------------
function listarProductos(lista) {
    // TU CÓDIGO ACÁ
}


// ----------------------------------------------------------
// 2. agregarProducto(lista, nuevoProducto)
//    Agrega nuevoProducto al final del array con push.
//    Retorna la lista modificada.
// ----------------------------------------------------------
function agregarProducto(lista, nuevoProducto) {
    // TU CÓDIGO ACÁ
}


// ----------------------------------------------------------
// 3. reemplazarProducto(lista, nombre, nuevoProducto)
//    Encuentra el índice del producto con ese nombre (findIndex)
//    y lo reemplaza usando splice.
//    Retorna la lista modificada.
// ----------------------------------------------------------
function reemplazarProducto(lista, nombre, nuevoProducto) {
    // TU CÓDIGO ACÁ
}


// ----------------------------------------------------------
// 4. obtenerDisponibles(lista)
//    Retorna un array NUEVO con los productos que tienen stock > 0.
//    Usar filter.
// ----------------------------------------------------------
function obtenerDisponibles(lista) {
    // TU CÓDIGO ACÁ
}


// ----------------------------------------------------------
// 5. aplicarDescuento(lista, porcentaje)
//    Retorna un array NUEVO con cada producto con el precio
//    reducido según el porcentaje recibido (0 a 100).
//    El array original NO debe cambiar.
//    Usar map.
//    Ejemplo: aplicarDescuento(lista, 10) → precios con 10% menos
// ----------------------------------------------------------
function aplicarDescuento(lista, porcentaje) {
    // TU CÓDIGO ACÁ
}


// ----------------------------------------------------------
// 6. buscarPorNombre(lista, nombre)
//    Retorna el objeto completo del producto con ese nombre.
//    Si no existe, retorna undefined.
//    Usar find.
// ----------------------------------------------------------
function buscarPorNombre(lista, nombre) {
    // TU CÓDIGO ACÁ
}


// ----------------------------------------------------------
// 7. todosConStock(lista)
//    Retorna true si TODOS los productos tienen stock > 0.
//    Usar every.
// ----------------------------------------------------------
function todosConStock(lista) {
    // TU CÓDIGO ACÁ
}


// ----------------------------------------------------------
// 8. algunoConStock(lista)
//    Retorna true si AL MENOS UN producto tiene stock > 0.
//    Usar some.
// ----------------------------------------------------------
function algunoConStock(lista) {
    // TU CÓDIGO ACÁ
}


// ----------------------------------------------------------
// 9. calcularValorTotal(lista)
//    Calcula y retorna el valor total del inventario.
//    Valor de cada producto = precio * stock.
//    Usar reduce.
// ----------------------------------------------------------
function calcularValorTotal(lista) {
    // TU CÓDIGO ACÁ
}


// ----------------------------------------------------------
// 10. ordenarPorPrecio(lista)
//     Retorna un array NUEVO con los productos ordenados
//     de más barato a más caro.
//     El array original NO debe cambiar.
//     Usar sort con una copia: [...lista]
// ----------------------------------------------------------
function ordenarPorPrecio(lista) {
    // TU CÓDIGO ACÁ
}


// ----------------------------------------------------------
// 11. obtenerNombresConStock(lista)   ← DESAFÍO
//     Retorna un STRING con los nombres de los productos
//     que tienen stock, separados por coma.
//     Ejemplo: "parlante, mouse, teclado"
//     Usar filter + map + join en una sola línea.
// ----------------------------------------------------------
function obtenerNombresConStock(lista) {
    // TU CÓDIGO ACÁ
}


module.exports = {
    listarProductos,
    agregarProducto,
    reemplazarProducto,
    obtenerDisponibles,
    aplicarDescuento,
    buscarPorNombre,
    todosConStock,
    algunoConStock,
    calcularValorTotal,
    ordenarPorPrecio,
    obtenerNombresConStock,
};
