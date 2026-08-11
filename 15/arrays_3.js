// Los tipos de datos son "objetos" y estos heredan "cosas"
// metodos (funciones) y atributos (valores, datos)

// Metodos -> Funciones
// Metodos de los tipos -> herramientas especificas para esos tipos

// Metodos mutadores -> Cambian el array sobre el que trabajan
// Hay una diferencia entre modificar el dato original y no hacerlo

// Push -> empujar
// El metodo push añade un nuevo valor al final del array original

let num = [1,2,3,4,5]
num.push(6)
console.log(num)


// Splice
// Splice tiene 3 utilidades:
// 1. Eliminar / splice(puntoPartida, cantidadBorrar)
num.splice(2, 3)
// console.log(num)

// Si pones solamente el puntoPartida te borra todos
// num.splice(2)

// 2. Agregar elementos - Sin eliminar
let tecnologias = ["React", "Node", "Express", "JS", "HTML", "CSS"]
// splice(puntoPartida, 0)
tecnologias.splice(1, 0, "Typescript", "MYSQL")
console.log(tecnologias);

// 3. Reemplazar
// Quiero en lugar de "cancelado" tener "completado"
const estados = ["pendiente", "en proceso", "cancelado"]
estados.splice(2, 1, "completado")
console.log(estados);

// Pop - Lo opuesto a push
// Pop elimina el ultimo valor
let num_2 = [1,2,3,4,5,6,7,8,9,10]

console.log(num_2.pop())
console.log(num_2);

// Unshift (como push) - inserta elementos al inicio del array, retorna el nuevo largo del array
console.log(num_2.unshift(0));
console.log(num_2);

// Shift (como pop)
console.log("shift", num_2.shift())
console.log(num_2)

