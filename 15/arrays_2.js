// Recapitulacion

// Reasignacion por indice
const colores = ["rojo", "verde", "azul"]
colores[2] = "bordo"
console.log(colores)

// desestructuración
// La desestructuración de arrays es una herramienta de JavaScript que permite sacar elementos de una lista y guardarlos en variables separadas con una sola línea de código. En lugar de buscar cada elemento por su número de orden, creas nombres cortos para usarlos de inmediato
const nums = [1, 2, 3, 4, 5, 6];
// Como hago para extraer valores de una variable y guardarlo en otras variables?
// Tomamos los dos primeros valores de nums y los pasamos a constantes
const [a, b] = nums
console.log(a, b)
// Y si quiero solo el segundo valor?
// const [, segundo] = nums
// console.log("segundo",segundo)

const [, segundo, tercero] = nums
console.log("segundo, tercero", segundo, tercero)

// Donde se usa? -> react(state)