import { useState } from 'react'
import './App.css'

function App() {
  // Estado-> memoria, se guarda en variables, fuente de la verdad
  // const [estado, setEstado] = useState(valorInicial)
  // la unica forma de asignar un valor a un estado es a traves del set
  // regularmente un valor inicial suele ser... [], "", 0, false
    const [tareas, setTareas] = useState([])
    const [texto, setTexto] = useState("")

    function agregarTarea(evento) {
      evento.preventDefault() // frena el reload del navegador

      // limpiamos texto de espacios
      const textoLimpio = texto.trim()

      if(textoLimpio === ""){
        return
      }

      const nuevaTarea = {
        id: crypto.randomUUID(), // crea una clave unica
        texto: textoLimpio,
        completada: false
      }

      // spread operator
      setTareas([...tareas, nuevaTarea])
      setTexto("")
    }

        function toggleTarea(id) {
    setTareas(
      tareas.map((tarea) =>
        tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
      )
    );
  }

    function eliminarTarea(id, evento) {
      evento.stopPropagation() // que no dispare tambien el click del toggle
      setTareas(tareas.filter((tarea) => tarea.id !== id))
    }

  return (
    <>
      <main class="app">
      <h1>Tareas</h1>

      <form id="form-tarea" onSubmit={agregarTarea} >
        <label for="input-tarea">Nombre de la tarea</label>
        <input
          name="input-tarea"
          type="text"
          id="input-tarea"
          placeholder="¿Qué tenés que hacer?"
          value={texto}
          // si no hacemos esto no podemos modificar el input
          onChange={(evento) => setTexto(evento.target.value)}
        />
        <button type="submit">Agregar</button>
      </form>

      <ul className="lista-tareas">
        {tareas.map((tarea) => (
          <li
            key={tarea.id}
            className={tarea.completada ? "completada" : ""}
            onClick={() => toggleTarea(tarea.id)}
          >
            <small>{tarea.texto}</small>
            <button
              className="tarea-eliminar"
              onClick={(event) => eliminarTarea(tarea.id, event)}
            >
              X
            </button>
          </li>
        ))}
      </ul>

      <p><span id="contador"> {tareas.length} </span> tareas</p>
    </main>

    </>
  )
}

export default App
