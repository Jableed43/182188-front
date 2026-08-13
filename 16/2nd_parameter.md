En JavaScript, los métodos de array que iteran mediante una función *callback* suelen pasar hasta tres parámetros principales a dicha función:

1. **`accumulator` / `element**`: El acumulador (en `reduce`) o el elemento actual.
2. **`index`**: El índice numérico del elemento actual.
3. **`array`**: El arreglo original sobre el cual se está iterando.

Por ende, **el segundo parámetro que recibe la función de callback es el `index**` en los siguientes métodos:

---

### 1. Métodos de iteración y transformación

En todos estos métodos, el callback recibe `(element, index, array)`:

* **`forEach(callback)`**: Ejecuta una función por cada elemento.
```javascript
productos.forEach((prod, index) => {
  console.log(`Posición ${index}: ${prod.nombre}`);
});

```


* **`map(callback)`**: Crea un nuevo arreglo con los resultados de la función.
```javascript
const conIds = productos.map((prod, index) => ({ id: index + 1, ...prod }));

```


* **`filter(callback)`**: Filtra elementos según una condición booleana.
```javascript
// Filtrar elementos en posiciones pares
const pares = productos.filter((_, index) => index % 2 === 0);

```



---

### 2. Métodos de búsqueda y comprobación

También usan la firma `(element, index, array)` en su callback:

* **`find(callback)`**: Devuelve el primer elemento que cumpla la condición.
```javascript
const item = productos.find((prod, index) => index > 5 && prod.stock > 0);

```


* **`findIndex(callback)`**: Devuelve el índice del primer elemento que cumpla la condición.
* **`findLast(callback)`**: Busca el último elemento que cumpla la condición (recorriendo de atrás hacia adelante).
* **`findLastIndex(callback)`**: Devuelve el índice del último elemento que cumpla la condición.
* **`some(callback)`**: Retorna `true` si al menos un elemento cumple la condición.
* **`every(callback)`**: Retorna `true` si todos los elementos cumplen la condición.

---

### 3. Casos especiales y excepciones a tener en cuenta

* **`reduce((acc, el, index, array) => {}, initialValue)` y `reduceRight()**`:
El `index` es el **tercer** parámetro del callback, ya que el primero es el acumulador (`acc`).
* **`Array.from(arrayLike, mapFn)`**:
El segundo argumento de `Array.from` es una función de mapeo que recibe `(element, index)`. Acá el `index` pasa a ser el **segundo** parámetro directamente.
```javascript
const indices = Array.from(productos, (_, index) => index);

```


* **Métodos que reciben el `index` como argumento directo (no en callback)**:
* `at(index)`: Recibe el índice para retornar el elemento en esa posición (acepta números negativos).
* `indexOf(searchElement, fromIndex)`: El **segundo parámetro** es el índice desde donde empezar a buscar.
* `lastIndexOf(searchElement, fromIndex)`: El **segundo parámetro** es el índice límite desde donde empezar a buscar hacia atrás.