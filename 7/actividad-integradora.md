# Actividad Integradora: Navbar con Flexbox

Reformulada para usar **solo los temas vistos en clase**: flex container / flex items,
flex-direction, justify-content, align-items, flex-wrap y pseudo-clases estructurales
(nth-child, first-child, last-child).

No incluye gap, flex-grow/shrink/basis, el shorthand `flex`, align-self ni order —
esos no se dieron en esta clase.

## Objetivo

Armar una barra de navegación horizontal (navbar) con un logo a la izquierda y un menú
de links a la derecha, resuelta enteramente con Flexbox.

## Pasos

- Armá el HTML: un `<nav class="navbar">` que contenga un `<div class="logo">` y una
  lista `<ul class="menu">` con al menos 5 `<li><a>...</a></li>` de navegación
  (Inicio, Servicios, Nosotros, Contacto, etc).

- Convertí `.navbar` en un contenedor flex con `display: flex`.

- Ubicá el logo a la izquierda y el menú a la derecha con `justify-content: space-between`,
  y centralos verticalmente con `align-items: center`.

- Convertí también `.menu` en un contenedor flex, con `flex-direction: row`, para que
  los `<li>` queden en una sola fila (por defecto una lista se acomoda en columna).

- Agregá `flex-wrap: wrap` a `.navbar` para que, al achicar la ventana del navegador,
  el menú pase a una segunda fila en vez de aplastarse o desbordar. Probalo reduciendo
  la pantalla.

- Usando pseudo-clases, aplicale un estilo distinto a los `<li>` pares e impares del
  menú con `:nth-child(even)` y `:nth-child(odd)`, y un estilo especial al primer y al
  último link con `:first-child` y `:last-child`.

## Restricciones

- No usar Grid, `float` ni `position: absolute`.
- Todo el posicionamiento se resuelve con las propiedades de Flexbox vistas en clase:
  `display`, `flex-direction`, `justify-content`, `align-items`, `flex-wrap`.
- Los estilos aplicados con `:nth-child`, `:first-child` y `:last-child` tienen que
  notarse a simple vista (color, fondo o tipografía distinta).

## Tip

Empezá por `.navbar` (display, justify-content, align-items, flex-wrap) antes de
meterte con `.menu` y los pseudo-clases de los `<li>`.
