// Capturar los elementos por dom 
const catalogoBody = document.querySelector("#catalogo-body");
const catalogoCantidad = document.querySelector("#catalogo-cantidad");
const btnIniciar = document.querySelector("#iniciar");
const btnReiniciar = document.querySelector("#reiniciar");
const seccionResultados = document.querySelector("#resultados");
const listaAceptados = document.querySelector("#lista-aceptados");
const listaNoEncontrados = document.querySelector("#lista-no-encontrados");
const precioTotal = document.querySelector("#total");

// 1. Lista de Precios Base
// Crear una estructura de datos productos que
// contenga el catálogo de la tienda con sus respectivos precios
// de referencia.
const productos = [
    { nombre: "pan", precio: 3000 },
    { nombre: "cafe", precio: 7000 },
    { nombre: "aceite", precio: 1500 },
    { nombre: "leche", precio: 1000 },
    { nombre: "fideos", precio: 700 },
    { nombre: "vinagre", precio: 500 },
    { nombre: "harina", precio: 850 },
    { nombre: "azucar", precio: 1000 },
    { nombre: "galletitas", precio: 1500 },
    { nombre: "shampoo", precio: 800 },
];

// Función registrarProductos()
// Implementar una función que le pida al usuario ingresar los
// productos uno a uno mediante prompt().

function registrarProductos(productos) {
    // Simula al carrito del cliente
    const productosCliente = [];

    // Productos no encontrados
    const productosNoEncontrados = [];

    // Vamos a tener el listado de los nombres de los productos del negocio
    const nombresProductos = productos.map((producto) => producto.nombre);

    console.log(nombresProductos);

    // El cliente tiene que añadir productos
    //  hasta que no quiera añadir mas

    let agregarProductos = true;

    // Productos agregados al carrito
    while (agregarProductos) {
        const entrada = prompt(
            "Ingresá el nombre del producto. Para finalizar la compra escribí un punto",
        );

        // Validaciones
        // Si el usuario presiona "cancelar" prompt devuelve null
        if (entrada === null) {
            alert("Para terminar la compra tenés que ingresar un punto: .");
            continue; // vuelve al while
        }

        // Normalizacion
        const productoNormalizado = entrada.trim().toLowerCase()

        if (productoNormalizado === ".") {
            agregarProductos = false
            continue // salimos sin procesar el "." como si fuera un producto
        }

        if (productoNormalizado === "") {
            alert("Por favor ingresá un producto válido")
            continue
        }

        // Recordemos que ya tenemos la lista de productos, este codigo es para que el cliente compre
        // usamos find
        const nombreEncontrado = nombresProductos.find(
            nombre => nombre === productoNormalizado
        )
        if (nombreEncontrado !== undefined) {
            productosCliente.push(productoNormalizado)
            console.log(`${productoNormalizado} agregado a la compra`)
        } else {
            productosNoEncontrados.push(productoNormalizado)
            console.log(`${productoNormalizado} no existe en el catalogo`)
        }
    }

    return { productosCliente, productosNoEncontrados }
}

// Función `calcularTotal(productosCliente, productos)`

// Implementar una función que reciba la lista de productos válidos del cliente y la lista base de precios:

// 1. Recorrer la lista de productos comprados.
// 2. Buscar el precio unitario correspondiente a cada producto en el catálogo.
// 3. Acumular y calcular el total a pagar.
function calcularTotal(productosCliente, productos) {

    let totalAPagar = 0;

    productosCliente.forEach(producto => {
        const productoEncontrado = productos.find(item => item.nombre === producto)

        if (productoEncontrado !== undefined) {
            const precio = productoEncontrado.precio
            totalAPagar += precio
            // totalAPagar = totalAPagar + precio
            console.log(`${producto}: $${precio} (subtotal: $${totalAPagar})`)
        }

    }
    );
    return totalAPagar
}

/* mostrarLista */
function mostrarLista(contenedor, elementos, mensajeVacio) {
    contenedor.innerHTML = "" // vacia la lista

    if(elementos.length === 0){
       const li = document.createElement("li")
       li.textContent = mensajeVacio
       li.classList.add("vacio")
       // appendChild -> similar al push
       contenedor.appendChild(li)
       return
    }

    elementos.forEach(elemento => {
        // ⚠️ hay que GUARDAR el elemento creado en una variable
        const li = document.createElement('li')
        li.textContent = elemento
        // pushea li -> ul
        contenedor.appendChild(li)
    })
}

/* mostrarCatalogo */

/* iniciarCompra */