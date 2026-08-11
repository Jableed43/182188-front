// El largo-length me dice cuantos elementos poseo en el array
// El indice-index me dice la posicion de cada uno
let aula = [
    {
        nombre: "Evelin",
        apellido: "Carranza"
    },
    {
        nombre: "Gianluca",
        apellido: "Saracino"
    },
    {
        nombre: "Federico",
        apellido: "Gimenez"
    },
    {
        nombre: "Luciano",
        apellido: "Saliadarre"
    }
]

console.log(aula)
// .length -> te retorna la cantidad de elementos en numero
console.log(aula.length)

// ¿Como accedemos a cada indice?
console.log(aula[0]) // Acceder a la primera posicion
console.log(aula[1]) // Acceder a la primera posicion
console.log(aula[2]) // Acceder a la primera posicion

// Si quisiera acceder al ultimo valor de un array como hago?
console.log("Acceso al ultimo elemento:", aula[aula.length-1])

// Acceso a los objetos -> dot notation .
// dot notation te permite acceder a claves de los objetos
console.log(aula[1].nombre)

// Bucle for ejemplo generico
for (let index = 0; index < aula.length; index++) {
    console.log(aula[index], index)
}

