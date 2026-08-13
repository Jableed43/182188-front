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
// { nombre: "parlante", precio: 120000, stock: 4 }

function listarProductos(lista) {
    // TU CÓDIGO ACÁ
    lista.forEach((producto) => {
        console.log(`${producto.nombre} -> ${producto.precio} (stock: ${producto.stock})`)
    })
}


// // ----------------------------------------------------------
// // 2. agregarProducto(lista, nuevoProducto)
// //    Agrega nuevoProducto al final del array con push.
// //    Retorna la lista modificada.
// // ----------------------------------------------------------
function agregarProducto(lista, nuevoProducto) {
    // No tiene validacion
    // Atajamos el peor caso
    if(!Array.isArray(lista)){
        console.error("Error el parametro lista debe ser un array")
        return null
    }

    lista.push(nuevoProducto)
    return lista
}


// // ----------------------------------------------------------
// // 3. reemplazarProducto(lista, nombre, nuevoProducto)
// //    Encuentra el índice del producto con ese nombre (findIndex)
// //    y lo reemplaza usando splice.
// //    Retorna la lista modificada.
// // ----------------------------------------------------------
function reemplazarProducto(lista, nombre, nuevoProducto) {
    // TU CÓDIGO ACÁ
    // findIndex retorna el n° del indice o -1 si no lo encuentra
   const indice = lista.findIndex(producto => producto.nombre === nombre)
   console.log({indice})
   // cuidado porque -1 es truthy
   // validamos si el producto buscado existe
   if(indice !== -1){
    // se ubica en la posicion del elemento a modificar con indice
    // cuenta uno solo para reemplazar
    // reemplaza el correspondiente por nuevoProducto
    lista.splice(indice, 1, nuevoProducto)
   }
   return null
}


// // ----------------------------------------------------------
// // 4. obtenerDisponibles(lista)
// //    Retorna un array NUEVO con los productos que tienen stock > 0.
// //    Usar filter.
// // ----------------------------------------------------------
// { nombre: "parlante", precio: 120000, stock: 4 }
function obtenerDisponibles(lista) {
    // productos que tienen stock > 0
    const disponibles = lista.filter(producto => producto.stock > 0)
    // const noDisponibles = lista.filter(producto => producto.stock === 0)
    // console.log({noDisponibles})
    return disponibles
}


// // ----------------------------------------------------------
// // 5. aplicarDescuento(lista, porcentaje)
// //    Retorna un array NUEVO con cada producto con el precio
// //    reducido según el porcentaje recibido (0 a 100).
// //    El array original NO debe cambiar.
// //    Usar map.
// //    Ejemplo: aplicarDescuento(lista, 10) → precios con 10% menos
// // ----------------------------------------------------------
// Aplica el descuento restando el % de descuento
function aplicarDescuento_2(lista, porcentaje) {
    return lista.map(producto => {
       const montoDescuento = (producto.precio * porcentaje) / 100

       const precioFinal = producto.precio - montoDescuento

    //    { nombre: "auriculares", precio: 75000, stock: 8 }
    // En los auriculares el nuevo precio seria: 63750
       return {
        // Vamos a reemplazar el precio original por el precio con el descuento
        // spread operator, abre el dato y permite modificar alguna o varios valores de las claves
        ...producto,
        precio: precioFinal
       }
    })
}

// Aplica el descuento retornando el % restante (si es 15% el descuento, entonces retorna 85%)
function aplicarDescuento(lista, porcentaje) {
  const factor = 1 - porcentaje / 100
  console.log("procentaje / 100",porcentaje / 100)
  console.log({factor})
  return lista.map(producto => ({...producto, precio: producto.precio * factor}))
}

// // ----------------------------------------------------------
// // 6. buscarPorNombre(lista, nombre)
// //    Retorna el objeto completo del producto con ese nombre.
// //    Si no existe, retorna undefined.
// //    Usar find.
// // ----------------------------------------------------------
function buscarPorNombre(lista, nombre) {
   return lista.find(producto => producto.nombre === nombre)
}

// // ----------------------------------------------------------
// // 7. todosConStock(lista)
// //    Retorna true si TODOS los productos tienen stock > 0.
// //    Usar every.
// // ----------------------------------------------------------
function todosConStock(lista) {
   return lista.every(producto => producto.stock > 0)
}


// // ----------------------------------------------------------
// // 8. algunoConStock(lista)
// //    Retorna true si AL MENOS UN producto tiene stock > 0.
// //    Usar some.
// // ----------------------------------------------------------
function algunoConStock(lista) {
    return lista.some(producto => producto.stock > 0)
}


// // ----------------------------------------------------------
// // 9. calcularValorTotal(lista)
// //    Calcula y retorna el valor total del inventario.
// //    Valor de cada producto = precio * stock.
// //    Usar reduce.
// // ----------------------------------------------------------
function calcularValorTotal(lista) {
   return lista.reduce((total, producto) => total + (producto.precio * producto.stock), 0)
}


// // ----------------------------------------------------------
// // 10. ordenarPorPrecio(lista)
// //     Retorna un array NUEVO con los productos ordenados
// //     de más barato a más caro.
// //     El array original NO debe cambiar.
// //     Usar sort con una copia: [...lista]
// // ----------------------------------------------------------
// function ordenarPorPrecio(lista) {
//     // TU CÓDIGO ACÁ
// }


// // ----------------------------------------------------------
// // 11. obtenerNombresConStock(lista)   ← DESAFÍO
// //     Retorna un STRING con los nombres de los productos
// //     que tienen stock, separados por coma.
// //     Ejemplo: "parlante, mouse, teclado"
// //     Usar filter + map + join en una sola línea.
// // ----------------------------------------------------------
// function obtenerNombresConStock(lista) {
//     // TU CÓDIGO ACÁ
// }

// module.exports -> permite acceder a estos elementos desde otros archivos
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
    // ordenarPorPrecio,
    // obtenerNombresConStock,
};
