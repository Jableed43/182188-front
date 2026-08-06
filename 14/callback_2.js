function esMayor(edad, nombre) {
  if (edad >= 18) {
    // console.log(`${nombre} : Acceso concedido`);
    return true
  } else {
    // console.log(`${nombre} : Acceso denegado`);
    return false
  }
}

// Array [] -> lista de datos
const usuarios = [
// Objeto {clave: valor} -> un dato unico // 
  { nombre: "Sofía", edad: 22 },
  { nombre: "Mateo", edad: 16 },
  { nombre: "Valentina", edad: 25 },
  { nombre: "Santiago", edad: 17 },
  { nombre: "Camila", edad: 30 },
  { nombre: "Lucas", edad: 15 },
  { nombre: "Isabella", edad: 19 },
  { nombre: "Benjamín", edad: 14 },
  { nombre: "Mariana", edad: 28 },
  { nombre: "Joaquín", edad: 18 },
  { nombre: "Martina", edad: 21 },
  { nombre: "Thiago", edad: 13 },
  { nombre: "Lucía", edad: 24 },
  { nombre: "Ezequiel", edad: 16 },
  { nombre: "Elena", edad: 31 },
  { nombre: "Bautista", edad: 17 },
  { nombre: "Victoria", edad: 20 },
  { nombre: "Felipe", edad: 12 },
  { nombre: "Daniela", edad: 26 },
  { nombre: "Tomás", edad: 19 },
  { nombre: "Emma", edad: 15 },
  { nombre: "Agustín", edad: 23 },
  { nombre: "Paula", edad: 18 },
  { nombre: "Gabriel", edad: 27 },
  { nombre: "Renata", edad: 14 },
  { nombre: "Dante", edad: 29 },
  { nombre: "Catalina", edad: 16 },
  { nombre: "Lautaro", edad: 21 },
  { nombre: "Juliet", edad: 33 },
  { nombre: "Nicolás", edad: 17 }
];

// map es un metodo de arrays
// toma cada elemento de un array y le aplica una funcion callback
let sonMayores = usuarios.map(usuario => esMayor(usuario.edad, usuario.nombre)) 
console.log(sonMayores)
console.log(usuarios.length) // 30

// Me va a mostrar un usuario a la vez
for (let index = 0; index < usuarios.length; index++) {
  console.log(usuarios[index])
}