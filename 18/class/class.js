// - Eliminar el ultimo elemento de la lista
// - Eliminar el primer elemento de la lista
// - Modificar el texto
// - Crear elementos
// - Agregar un atributo

// - Agregar una clase

// - Quitar todas las clases (atributo)

  const lista = document.querySelector(".lista-desordenada");
  const listItem = document.getElementsByClassName("list-item");
  const texto = document.querySelector(".texto");
  const contenedorMagico = document.querySelector(".contenedor-magico");
  const itemEspecial = document.getElementById("item-especial");

  // - Crear un elemento y añadirlo al final
  function crearElementoListaFinal() {
    const newLi = document.createElement("li")
    newLi.textContent = "Elemento creado al final del listado"
    newLi.classList.add("list-item")
    lista.appendChild(newLi)
  }

  // - Crear un elemento y añardirlo al principio
function crearElementoListaInicial() {
    const newLi = document.createElement("li")
    newLi.textContent = "Elemento creado al inicio del listado"
    newLi.classList.add("list-item")
    // insertBefore -> insertar un elemento antes que otro
    // 1° parametro -> el elemento a insertar
    // 2° parametro -> la ubicacion donde queremos insertarlo
    lista.insertBefore(newLi, listItem[0])
}

// - Toggle de atributo
function agregarAtributoToggle() {
    itemEspecial.classList.toggle('rojo')
    itemEspecial.textContent = "soy rojo"
}

// - Remover una clase
function removerClaseVerde() {
    itemEspecial.classList.remove("verde")
}

// - Quitar todas las clases (atributo)
function quitarAtributo() {
    itemEspecial.removeAttribute("class")
    itemEspecial.removeAttribute("id")
}

// Eliminar ultimo elemento de la lista
function eliminarUltimoElemento() {
    // Dos posibles caminos, el mismo resultado
    // lista.removeChild(listItem[listItem.length - 1])
    lista.removeChild(lista.lastElementChild)
}

// Eliminar primer elemento de la lista
function eliminarPrimerElemento() {
    lista.removeChild(lista.firstElementChild)
}

// Crear un elemento e insertarlo
function crearElementos() {
    contenedorMagico.innerHTML = `
    <ul>
        <li> <h1> Soy un li magico 1 </h1> </li>
        <li> <p class="verde" > Soy un li magico  </p> </li>
        <li> <span> Soy un li magico 3 </span> </li>
    </ul>
    `
}