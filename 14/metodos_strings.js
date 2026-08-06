// .includes(palabra): Es un "buscador". Te responde con un simple SÍ (true) o NO (false) si el texto contiene esa palabra.

// Includes es key sensitive -> considera como diferentes a las mayusculas y las minusculas
let frase = "Aprender Javascript es genial";
console.log(frase.includes("javascript"));
console.log(frase.includes("Aprender"));
console.log(frase.includes("genial"));

console.log("tolowercase + includes", frase.toLowerCase().includes("javascript"))

// .toUpperCase() / .toLowerCase(): Son los "gritones / susurradores". Convierten todo tu texto a MAYÚSCULAS o a minúsculas, respectivamente.
console.log(frase.toUpperCase())
console.log(frase.toLowerCase())
console.log(frase)
// toLowerCase permite standarizar nombres de usuario y emails

// .trim(): Es la "escoba". Barre y limpia los espacios vacíos que sobran al principio o al final de un texto (súper útil para limpiar mails o nombres mal escritos por el usuario).
let emailSucio = "    usuario@correo.com  "
console.log(emailSucio)
console.log(emailSucio.trim())

let texto = "soy un cacahuate"
console.log(texto.trim())

// .slice(inicio, fin): Es la "tijera". Corta un pedazo específico de tu texto desde una posición hasta otra y te devuelve solo ese fragmentito.
let frase2 = "Aprender Javascript es genial";
console.log(frase.slice(0, 8))
console.log(frase.slice(9, 19))
// Desde el 9 en adelante
console.log(frase.slice(9))


// .split(separador): Es el "hacha". Rompe tu texto cada vez que encuentra el separador que le pases (por ejemplo, una coma) y convierte todos esos pedazos en una lista (un Array).
// .csv
let frutasTextoComa = "uva,manzana,pera"
let frutasTextoGuion = "uva-manzana-pera"
console.log(frutasTextoComa.split(","));
console.log(frutasTextoGuion.split("-"));

// Metodos -> funciones
// Propiedades -> datos

// ¿Como saber el largo de un string/array?
console.log(frutasTextoComa.length) // 16