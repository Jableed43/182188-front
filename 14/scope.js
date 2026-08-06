// El scope es el ambito donde vive una variable
// Por acceso y modificacion

// Global
// Variable es declarada fuera de una funcion o bloque {}
// Accesible desde cualquier punto del programa (archivo)
// Se declara
var globalVar = "Soy global (VAR)"
let globalLet = "Soy global (LET)"
const globalConst ="Soy global (CONST)"

function probarGlobal() {
    // Variables globales
    console.log(globalVar)
    console.log(globalLet)
    console.log(globalConst)
}

probarGlobal()

// Local Scope - Function Scope
// Util para aislar variables
function funcionLocal() {
    var funcionVar = "Solo existo dentro de la funcion (var)"
    let funcionLet = "Solo existo dentro de la funcion (let)"
    const funcionConst = "Solo existo dentro de la funcion (const)"

    console.log(funcionVar)
    console.log(funcionLet)
    console.log(funcionConst)
}

// funcionLocal()
    // console.log(funcionVar)
    // console.log(funcionLet)
    // console.log(funcionConst)

// Block scope
// la var no respeta el scope en bloque
if(true){
    var varEnBloque = "Puedo salir del bloque, soy var"
    let letEnBloque = "Atrapado en el bloque"
    const constEnBloque = "Atrapado en el bloque"
}

// console.log(letEnBloque)
// console.log(constEnBloque)