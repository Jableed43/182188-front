# Clase de cierre — JS Avanzado: Gestión de Estados y Práctica

Última clase de DOM. Cierra lo visto en las clases 17 y 18 (selectores, `classList`,
crear/insertar elementos, eventos) con un proyecto integrador chico: una **To-Do List**.

## Idea central

Cada tarea se crea, se configura y se inserta en el momento — los 3 pasos de
"crear e insertar elementos" de la clase 17, aplicados de nuevo. Cada `<li>` lleva
sus propios listeners puestos en el momento de crearlo (igual que en la clase 18).
No hay un array de estado: se trabaja directo sobre el DOM.

## Repaso que se pone en práctica

- Los 3 pasos: `document.createElement` → configurar → `appendChild`
- `classList.toggle`
- `addEventListener` puesto sobre cada elemento al crearlo
- `element.remove()` para sacar un elemento del DOM
- `event.preventDefault()`, `event.stopPropagation()`
- `.value`, `.trim()`, validar que el input no esté vacío

## Archivos

- `index.html` — form + lista + contador
- `style.css` — estilos ya provistos
- `script.js` — a completar/explicar en clase (agregar, completar, eliminar)

## Consigna para el alumno

Partiendo del HTML/CSS ya armados, implementar `script.js`:

1. Referencias del DOM.
2. Al enviar el form: si el input no está vacío, crear un `<li>` con el texto,
   crear el botón "✕", ponerles sus listeners y agregar el `<li>` a la lista
   (los 3 pasos: crear, configurar, insertar).
3. Al clickear una tarea: togglear la clase `completada` con `classList.toggle`.
4. Al clickear el botón "✕": `li.remove()` (usando `event.stopPropagation()`
   para que no dispare también el click de la tarea).
5. Contador simple con `lista.children.length`.

## Para ir un poco más allá (opcional, si sobra tiempo)

- Guardar las tareas en `localStorage` para que no se pierdan al recargar.
- Agregar botones para filtrar entre todas / pendientes / completadas.
- Pasar a un array de estado + `render()`, para discutir por qué React trabaja así.
