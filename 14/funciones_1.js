// Quiero codigo que verifique la mayoria de edad de las personas

// Ana
const edadAna = 22;
if (edadAna >= 18) {
  console.log("Ana: Acceso concedido");
} else {
  console.log("Ana: Acceso denegado");
}

// Lucas
const edadLucas = 15;
if (edadLucas >= 18) {
  console.log("Lucas: Acceso concedido");
} else {
  console.log("Lucas: Acceso denegado");
}

// + 30 usuarios

function esMayor(edad, nombre) {
  if (edad >= 18) {
    // console.log(`${nombre} : Acceso concedido`);
    return true
  } else {
    // console.log(`${nombre} : Acceso denegado`);
    return false
  }
}

let resultado = esMayor(22, "Ana")
console.log(resultado);
esMayor(15, "Lucas");