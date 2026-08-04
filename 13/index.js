// • Coerción Implícita (El comportamiento automático y peligroso): JS cambia los tipos de datos sin avisarte.
//     • 5 + "5" → JS convierte el 5 a texto: resultado "55".
//     • 5 - "5" → JS convierte el texto a número: resultado 0.

// • Coerción Explícita (Lo correcto y profesional): Vos le das la orden estricta a JS de transformar el dato.
//     • Number("5") + 5 → 10
//     • String(5) + "5" → "55"

// Concatenacion
// El + se usa tanto como operador aritmetico como concatenador

// concatenador
console.log("suma ", 5 + "5")

// operador aritmetico
console.log("suma real", 5 + 5)

// operador aritmetico
console.log("suma con Number", 5 + Number("5"))

// concatenador
console.log("suma concatenacion", 5 , "5")

console.log("resta ", 5 - "5")

// Formas de controlar la coersion
// Validar tipo de dato con typeof
// Realizar la coersion explicita con  Number("5")

// Concatenar usando ` - backticks - alt + 96
let suma = 5 + 5
console.log(`suma concatenacion 5 + 5 = ${suma}`)

// Operadores comparacion
// Comparacion debil, compara el valor pero no el tipo
console.log(5=="5")
// Comparacion estricta, compara tanto tipo como valor
console.log(5==="5")