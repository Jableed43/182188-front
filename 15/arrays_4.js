// Metodos de iteracion
// Map - Con map vamos a duplicarlos
// Map aplica una misma funcion a cada indice
// Map genera un nuevo array con los resultados
const numeros = [1, 2, 3, 4, 55, 66, 67, 88, 98, 100];


// Lo mismo pero con bucle for
// let resultadoDuplicado = []
// for (let index = 0; index < numeros.length; index++) {
//     resultadoDuplicado.push(numeros[index] * 2)
// }
// console.log("resultadoDuplicado", resultadoDuplicado);

// La forma mas simplificada de funcion flecha
let duplicados = numeros.map(numero => numero * 2)
console.log(duplicados);
console.log(numeros)

function duplicar(n) {
    return n * 2
}

let duplicados_2 = numeros.map(numero => duplicar(numero))

// forEach
// No tiene retorno como tal y tampoco te arma un array nuevo
let resultado = numeros.forEach(numero => duplicar(numero))
console.log("resultado", resultado)

// filter -> filtra (filtro de busqueda)
// Quiero encontrar los numeros pares
// Modulo retorna el resto de una division
// Si el resultado es 0, entonces es multiplo
// Tambien sirve para encontrar numeros pares e impares
// Si la condicion del filter se cumple se guarda el valor en un array
// La condicion en este caso se llama predicado
let pares = numeros.filter(numero => numero % 2 === 0)
console.log("pares", pares);

const productos = [
  { id: 1, nombre: "Arroz largo fino", presentacion: "1 kg", precio: 2100 },
  { id: 2, nombre: "Leche entera (sachet)", presentacion: "1 litro", precio: 1350 },
  { id: 3, nombre: "Fideos secos", presentacion: "500 g", precio: 1350 },
  { id: 4, nombre: "Aceite de girasol", presentacion: "1.5 litros", precio: 3150 },
  { id: 5, nombre: "Yerba mate", presentacion: "1 kg", precio: 4150 },
  { id: 6, nombre: "Azúcar común", presentacion: "1 kg", precio: 1200 },
  { id: 7, nombre: "Harina de trigo 000", presentacion: "1 kg", precio: 1100 },
  { id: 8, nombre: "Puré de tomate", presentacion: "520 g", precio: 1000 },
  { id: 9, nombre: "Pan lactal clásico", presentacion: "500 g", precio: 2600 },
  { id: 10, nombre: "Detergente lavavajillas", presentacion: "750 ml", precio: 2250 }
];
let producto3000 = productos.filter(producto => producto.precio > 3000)
console.log(producto3000);

// filter -> filtra (discriminar)
let productoNO3000 = productos.filter(producto => producto.precio < 3000)

// Socios
// quiero quitar socios y dejar solos los que tienen la cuota al dia

const socios = [
  { id: 1, nombre: "Lucas", apellido: "González", cuotaAlDia: true },
  { id: 2, nombre: "Sofía", apellido: "Martínez", cuotaAlDia: false },
  { id: 3, nombre: "Mateo", apellido: "Fernández", cuotaAlDia: true },
  { id: 4, nombre: "Camila", apellido: "López", cuotaAlDia: true },
  { id: 5, nombre: "Joaquín", apellido: "Rodríguez", cuotaAlDia: false },
  { id: 6, nombre: "Valentina", apellido: "Pérez", cuotaAlDia: true },
  { id: 7, nombre: "Nicolás", apellido: "Gómez", cuotaAlDia: false },
  { id: 8, nombre: "Lucía", apellido: "Sánchez", cuotaAlDia: true },
  { id: 9, nombre: "Thiago", apellido: "Díaz", cuotaAlDia: true },
  { id: 10, nombre: "Martina", apellido: "Álvarez", cuotaAlDia: false }
];
const sociosAlDia = socios.filter(socio => socio.cuotaAlDia === true)
console.log({sociosAlDia})

// Ahora quiero solo los morosos
const sociosMorosos = socios.filter(socio => !socio.cuotaAlDia)
// const sociosMorosos = socios.filter(socio => socio.cuotaAlDia === false)
console.log({sociosMorosos})

