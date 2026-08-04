const hora = 21;
// If -> si condicional. Si se dá tal, entonces sucede aquello...

if (hora < 12) {
    console.log("Buen día");
    // Menor a 12 -> 1hs -> 11hs
} else if (hora < 20) {
    // 12, 13, 14... 19
    // else if -> permite añadir una condicion extra si falló la primera
    console.log("Buenas tardes");
} else {
    // 20hs -> 23.59
    console.log("Buenas noches");
}
// else -> dar una alternativa si todas las condiciones fallaron
// fallback

// Limites del else if -> podes escribir todos los que quieras

// Ejemplo 2:
let frio = false
let temperatura = 10

if(frio){
    console.log("Me abrigo")
} else {
    console.log("No me abrigo")
}

// else if
// -n -> 10
if(temperatura <=10){
    console.log("Me pongo campera")
} else if(temperatura < 18){
    // 11,12,13,14,15,16,17
    console.log("Me pongo un buzo")
} else {
    // 18 , +n
    console.log("No me abrigo")
}

// Reducido - Escribir en poco espacio
// if(frio){
//     console.log("Me abrigo")
// } else {
//     console.log("No me abrigo")
// }

// If ternario - condicional de bolsillo
// ? -> if / : -> else
frio ? console.log("Me abrigo") : console.log("No me abrigo")

// ! -> not / Es la negacion directa de un termino booleano
// !true -> false / !false -> true
!frio ? console.log("Me abrigo") : console.log("No me abrigo")

// Ternario if-else
//     if(temperatura <=10){
//     console.log("Me pongo campera")
// } else if(temperatura < 18){
//     // 11,12,13,14,15,16,17
//     console.log("Me pongo un buzo")
// } else {
//     // 18 , +n
//     console.log("No me abrigo")
// }
   temperatura <= 10 ? console.log("Me pongo campera") :
   temperatura < 18 ? console.log("Me pongo un buzo") : console.log("No me abrigo")

// negacion en grupo
console.log("negacion en grupo" ,!(true && true))

// negacion individual
console.log("negacion individual" ,(true || !true))

// negacion individual
console.log("negacion nv" ,!(false && false))

// Busca renderizado condicional
let usuarioPremium = true
if(usuarioPremium){
    console.log("Premium")
} else {
    console.log("Youtube")
}

 