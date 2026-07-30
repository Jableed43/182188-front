// Tipos de variables
// var -> no se usa

// Declaracion
var colorTaza = "gris"

// Re asignar - cambiar el valor de una variable
colorTaza = "rojo"

// Re declarar
// color_taza / colotaza / colorTaza / coffeCupColor
var colorTaza = "azul"

console.log(colorTaza)

// let -> es usada cuando queres cambiar su valor
let puntaje = 0

// Re asignar
puntaje = 10
puntaje = 25
console.log(puntaje)

// Está prohibido re-declarar
// let puntaje = 10
// console.log(puntaje)

// const -> se guardan datos que no cambiarán

const fechaNacimiento = 1990;

// const fechaNacimiento = "1990";

// No se puede reasignar
// fechaNacimiento = 1992

// No se puede redeclarar
// const fechaNacimiento = 1995;

// La excepcion a la regla
const nombres = ["Gustavo", "Andrea", "Luciano"]

// push añade un elemento al final del array
nombres.push("Javier")

console.log(nombres)