# Clase de cierre — JS Avanzado: Gestión de Estados y Práctica

Última clase de DOM. Cierra lo visto en las clases 17 y 18 (selectores, `classList`,
crear/insertar elementos, eventos) con un proyecto integrador chico: una **To-Do List**.

## Idea central

> El array `tareas` es la verdad. El DOM (los `<li>`) es sólo su reflejo.

Nunca se toca un `<li>` a mano: se cambia el array (`push`, `filter`) y se llama a
`render()`, que vacía la lista y la vuelve a dibujar desde cero. Es la misma idea
del proyecto integrador de la clase 17, aplicada de nuevo.

## Repaso que se pone en práctica

- `document.createElement`, `appendChild`, `innerHTML = ""` antes de renderizar
- `classList.add` / `classList.toggle`
- `addEventListener` puesto sobre cada elemento al crearlo (igual que en clase 18)
- `event.preventDefault()`, `event.stopPropagation()`
- `.value`, `.trim()`, validar que el input no esté vacío
- `array.push`, `array.forEach`, `array.filter`

## Archivos

- `index.html` — form + lista + contador
- `style.css` — estilos ya provistos
- `script.js` — a completar/explicar en clase (`render`, agregar, completar, eliminar)

## Consigna para el alumno

Partiendo del HTML/CSS ya armados, implementar `script.js`:

1. Referencias del DOM y el array `tareas` (estado).
2. `render()`: vaciar la lista y redibujarla a partir de `tareas`.
3. Al enviar el form: si el input no está vacío, agregar la tarea al array y
   volver a renderizar.
4. Al clickear una tarea: togglear su `completada` (con `classList.toggle`) y
   volver a renderizar.
5. Al clickear el botón "✕": sacarla del array (`filter`) y volver a renderizar.
6. Contador simple con la cantidad total de tareas.

## Para ir un poco más allá (opcional, si sobra tiempo)

- Guardar las tareas en `localStorage` para que no se pierdan al recargar.
- Agregar botones para filtrar entre todas / pendientes / completadas.
