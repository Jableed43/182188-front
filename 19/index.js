document.addEventListener("DOMContentLoaded", function () {
  // Elementos a capturar
  // lista -> ul
  // input -> texto
  // form -> submit
  // contador -> p

  const lista = document.getElementById("lista-tareas");
  const input = document.getElementById("input-tarea");
  const form = document.getElementById("form-tarea");
  const contador = document.getElementById("contador");

  function actualizarContador() {
    contador.textContent = `${lista.children.length}`;
  }

  // agregar una tarea

  form.addEventListener("submit", function (e) {
    // Evita que el formulario refresque
    e.preventDefault();
    const texto = input.value.trim();

    // Si el texto está vacio terminamos la operacion
    if (texto === "") {
      return;
    }

    // li es el item de la tarea
    const li = document.createElement("li");
    const small = document.createElement("small");
    small.textContent = texto;

    // faltan cosas...
    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "X";
    botonEliminar.className = "tarea-eliminar";

    // 1- Completemos las tareas
    li.addEventListener("click", function () {
      li.classList.toggle("completada");
    });

    // 2- Eliminamos las tareas
    botonEliminar.addEventListener("click", function (e) {
      e.stopPropagation()
      li.remove();
      actualizarContador();
    });

    li.appendChild(small);
    li.appendChild(botonEliminar);

    // ya quiero ver la lista siendo poblada
    lista.appendChild(li);

    actualizarContador();

    // limpieza del input
    input.value = "";
    // una vez que limpias podes seguir escribiendo en el input
    input.focus();
  });

  actualizarContador();
});
