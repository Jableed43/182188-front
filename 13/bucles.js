// Bucle -> Repeticion de una accion
// Condicion (Hace que funcione) -> Controla el funcionamiento
// Punto de corte (Hace que frene) -> Detiene funcionamiento
// Accion -> Bloque de codigo que se ejecuta repetidamente


// Bucle for en js - 1995
let cantidad = 20
// Index (Indice) -> Es un indicador de donde se encuentra trabajando el bucle
// Condicion -> Este bucle va a funcionar mientras index sea menor a 20
// index++ -> aumenta index en +1
// ++ es igual a +1+
// index+=2 -> index = index + 2
// Caso comun de 0 a 19
for (let index = 0; index < cantidad; index++) {
    console.log(index)
}
// Caso descendente de 198 a 22
for (let index = 200; index > cantidad; index-=2) {
    console.log(index)
}

// Contra: Tenes que escribir mucho y la salida es custom, hace falta conocer a medias la condicion de corte
// Pro: Todo el control

// Bucle while en js - 1995
// While -> Opera mientras se cumpla una condicion
// Diferencia con el for? -> Naturalmente no tiene condicion de corte

let contador = 20
while (contador >= 0) {
    console.log("Cuenta regresiva", contador)
    // Contador -1
    contador--;
}
// Bucle infinito
// while (true) {
//     console.log("Cuenta", contador)
//     // Contador -1
//     contador++;
// }

// Do while
// Parecido al while la condicion se evalua despues de la primera iteracion
// Garantiza que el codigo se ejecute al menos una vez
let n = 0

do {
    console.log("Esto se ejecuta al menos una vez")
    n++
    console.log(n)
} while (n < 0);

// Alternativas modernas
// For of -> Trabajo con arrays
const nombres = ["Gustavo", "Andrea", "Luciano"]

// 2015
// El nombre del elemento es opcional
for (const nombre of nombres) {
    console.log(`Hola ${nombre}`)
}

// 2009
// map - No es un bucle
// A cada elemento lo utiliza dentro de una funcion
// Genera un array nuevo con los resultados
// No altera el array original
const precios = [100, 200, 300, false ]

// Quiero tener el doble de cada precio
// callback -> utilizar una funcion como parametro de otra funcion
// Tenes una funcion que maneja los datos de otra

// 2 posibilidades
// 1. preciosAlDoble esté dentro de otra funcion que validacion
// 2. Validar dentro del callback
const preciosAlDoble = precios.map(function(precio) {
    // Validar implica controlar los datos con los que vas a operar
    if(typeof precio === "number"){
        return precio * 2
    } else {
        return null
    }
})

console.log(preciosAlDoble)