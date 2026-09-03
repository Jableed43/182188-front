// destructuracion
// que sea constante tiene un doble proposito
// 1. que no sea modificado su valor directamente
// 2. que el estado no pierda referencia que pertenece a useState
// const [num1, setNum1] = useState()

const persona = ["Ana", 25]

const [nombre, edad] = persona

// const nombre = persona[0]
// const edad = persona[1]

function coordenadas() {
    return [10, 20, 7, 10]
}

const [x, y] = coordenadas()

// Podes ignorar los que quieras dejar afuera
// const [, , , x] = coordenadas()

// const resultado = coordenadas()
// const x = resultado[0]
// const y = resultado[1]

//////
let auto = ["uno", "fiat"]

// Genera una variable por valor no por referencia
let [modelo, marca] = auto

modelo = "duna"
console.log(modelo);
console.log(auto)