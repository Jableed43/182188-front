# Duda de clase: dos cajas hermanas, mismo tamaño (una con texto, otra con imagen)

## El problema

Tenés dos `<div>` **hermanos** (uno al lado del otro, sin ser uno padre del otro):

- Uno contiene un párrafo de texto.
- El otro contiene una imagen.

Cada uno, por naturaleza, ocupa un tamaño distinto: el texto ocupa lo que necesite su
contenido, y la imagen ocupa su tamaño original (o el que tenga por CSS). Si no hacemos
nada, las dos cajas van a quedar de ancho distinto.

## La idea clave

Cuando el padre es un **contenedor flex** (`display: flex`), no hace falta calcular
anchos a mano ni usar `width: 50%`. Alcanza con decirle a cada hijo:

```css
flex: 1;
```

`flex: 1` es el shorthand de `flex-grow: 1`, `flex-shrink: 1` y `flex-basis: 0%`. En
criollo significa: **"ignorá tu tamaño de contenido, arrancá de 0 y repartite el
espacio disponible en partes iguales con tus hermanos"**. Como los dos hijos tienen el
mismo valor, el navegador les da exactamente el mismo ancho — sin importar que uno
tenga tres palabras y el otro una imagen grande.

## Un detalle extra: la imagen

Aunque la caja ya tenga el ancho correcto gracias a `flex: 1`, la imagen de adentro
puede seguir mostrándose con su tamaño original y desbordar la caja. Por eso a la
imagen se le agrega:

```css
img {
    width: 100%;
    height: auto;
}
```

Esto hace que la imagen siempre ocupe el 100% del ancho de SU caja (que ya es igual a
la otra), y el alto se ajuste solo para no deformarla.

## Resumen para el pizarrón

1. El padre de las dos cajas: `display: flex`.
2. Cada caja hija: `flex: 1` (mismo valor en ambas → mismo ancho, sin importar el
   contenido).
3. La imagen adentro de su caja: `width: 100%; height: auto` (para que no se salga ni
   se estire de más).

Ver el código funcionando en `index.html` / `style.css` de esta misma carpeta — está
comentado línea por línea.
