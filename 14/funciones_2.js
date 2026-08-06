// Hoisting -> eleva las definiciones de las funciones al inicio del archivo
// saludarUsuario("Ana"); 

// Esta si se puede ejecutar antes de la declaracion
function saludarUsuario(nombre) {
   return `Hola, ${nombre}!`;
}

// No se puede ejecutar antes de la declaracion
// Si la funcion flecha tiene llaves debe llevar retorno explicito
const saludarUsuario = (nombre) => {
   return `Hola, ${nombre}!`;
}

// Si la funcion flecha no tiene llaves no necesita retorno explicito
const saludarUsuario = nombre => `Hola, ${nombre}!`;

// console.log(saludarUsuario("Ana")); 
