// 1. La Función principal
function procesarUsuario(nombre, accionFinaL) {
    console.log("Cargando base de datos...");
    accionFinaL(nombre); // Ejecutamos el callback recién acá
}

// 2. El Callback (la función a pasar)
const saludar = (nombre) => console.log(`¡Hola, ${nombre}!`);

// 3. ¡SE PASA SIN PARÉNTESIS! 
// Entregamos "la cafetera", no el café servido.
procesarUsuario("Lucas", saludar);


