# 🧮 Guía paso a paso — Armar la Calculadora en React

> Guía práctica para el alumno: reconstruir, paso a paso, la Calculadora vista en clase.
> El código de esta guía es el mismo que se escribió en vivo — nada de extra.

Conceptos que se van a usar (repasados en `RESUMEN-CLASE-21-REACT.md`): componente, props,
destructuring, eventos en JSX, handler vs código inline, y `utils` para separar la lógica de
la vista.

---

## Paso 0 — Preparar el proyecto

```bash
npm init vite@latest calculadora -- --template react
cd calculadora
npm install
npm run dev
```

Crear la carpeta `src/utils/` y, adentro, `mathOperations.js`:

```js
// src/utils/mathOperations.js

// la idea de las funciones dentro de un objeto es que manejen los mismos datos

// función pura o módulo auxiliar que realiza una tarea específica, repetitiva
// e independiente de la interfaz de usuario.

// Su objetivo principal es reutilizar código y mantener los componentes
// limpios de lógica de negocio o transformaciones complejas de datos.
export const mathOperations = {
  suma: (a, b) => a + b,
  resta: (a, b) => a - b,
  multiplicacion: (a, b) => a * b,
  division: (a, b) => {
    if (b === 0) {
      console.error("No se puede dividir por cero");
    }
    return a / b;
  },
};
```

Reemplazar `src/App.css` por:

```css
.app {
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.tarjeta {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  padding: 24px;
}

h1 {
  margin: 0 0 16px;
  font-size: 22px;
  text-align: center;
}

.campo {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 12px;
}

.campo label {
  font-size: 13px;
  color: #555;
}

.campo input {
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
}

.botones {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.botones button {
  flex: 1;
  padding: 10px 12px;
  border: none;
  border-radius: 6px;
  background: #4361ee;
  color: #fff;
  cursor: pointer;
  font-size: 13px;
  text-transform: capitalize;
}

.botones button:hover {
  background: #364fc7;
}

.resultado {
  margin: 0;
  font-size: 15px;
  text-align: center;
}
```

---

## Paso 1 — El componente `Input`

Crear `src/components/Input.jsx`:

```jsx
import "../App.css";

// rfce -> crea un componente funcional con el nombre del archivo

// Responsabilidad unica
// los componentes funcionales tambien usan parametros pero se llaman props
// properties
function Input({ type, label, value, labelId, evento, placeholder }) {
  return (
    <div className="campo">
      <label htmlFor={labelId}>{label}</label>
      <input
        type={type}
        id={labelId}
        value={value}
        onChange={evento}
        placeholder={placeholder}
      />
    </div>
  );
}

export default Input;
```

> **¿Por qué la prop se llama `evento` y no `onChange`?** El nombre de una prop es libre — no
> tiene que coincidir con el nombre del evento nativo del HTML. Adentro de `Input` esa prop se
> conecta al `onChange` real del `<input>`.

---

## Paso 2 — `App.jsx`

```jsx
import { useState } from "react";
import "./App.css";
import { mathOperations } from "./utils/mathOperations";
// Si el export es default no se usan las llaves {}
import Input from "./components/Input";

function App() {
  // [Estado, FuncionQueSeteaAlEstado] = useState(ValorInicial)
  // Valores iniciales:
  // Numero -> 0
  // String -> ""
  // Array -> []
  // Booleano -> false
  const [num1, setNum1] = useState()
  const [num2, setNum2] = useState()
  const [resultado, setResultado] = useState(0)

  // Formulario controlado:
  // estado setea el value del input 
  // un evento setea al estado

  // La unica forma de cambiar el estado es con setState

  // Los handlers funcionan como manejadores de eventos
  // Handler tiene como ventaja poder validar o tener codigo extra
  // podes usar condicionales, bucles
  const handleNum2Change = (evento) => {
    setNum2(Number(evento.target.value))
  }

  const handleOperar = (operacion) => {
    // Porque un let y no un estado?
    // 1 -> cambia el valor
    // 2 -> el scope local solo dentro de handleOperar

    // inicializa una variable para el valor
    let resultadoCalculado

    switch (operacion) {
      case "sumar":
        resultadoCalculado = mathOperations.suma(num1, num2) 
        break;
      
      case "restar":
        resultadoCalculado = mathOperations.resta(num1, num2)
        break;
      
      case "multiplicar":
        resultadoCalculado = mathOperations.multiplicacion(num1, num2)
        break;

      case "dividir":
        resultadoCalculado = mathOperations.division(num1, num2)
        break;

      default:
        resultadoCalculado = 0
        break;
    }
    // Esto setea el resultado y muestra en el parrafo el valor
    setResultado(resultadoCalculado)
    // Limpiamos los campos de entrada (inputs)
    setNum1(0)
    setNum2(0)
  }

  return (
    <>
      <main className="app">
        <section className="tarjeta">
          <h1> Calculadora </h1>

          
          <Input evento={(evento) => setNum1(Number(evento.target.value))}
          label="Número 1"
          labelId="input-numero-1"
          placeholder="0"
          type="number"
          value={num1}
          />

          <Input evento={handleNum2Change}
          label="Número 2"
          labelId="input-numero-2"
          placeholder="0"
          type="number"
          value={num2}
          />


          {/* <div className="campo">
            <label htmlFor="input-numero-1">Número 1</label>
            <input type="number" id="input-numero-1" value={num1} 
            placeholder="0"
            // Aunque el input type ser number el value que se obtiene
            // del input es string
            onChange={(evento) => setNum1(Number(evento.target.value))} />
          </div> */}

          {/* <div className="campo">
            <label htmlFor="input-numero-2">Número 2</label>
            <input type="number" id="input-numero-2" value={num2} 
            onChange={handleNum2Change}
            placeholder="0" />
          </div> */}

          <div className="botones">
            <button onClick={() => handleOperar("sumar")} >Sumar</button>
            <button onClick={() => handleOperar("restar")} >Restar</button>
            <button onClick={() => handleOperar("multiplicar")}>Multiplicar</button>
            <button onClick={() => handleOperar("dividir")}>Dividir</button>
          </div>

          <p className="resultado"> Resultado: <strong> {resultado} </strong> </p>

        </section>
      </main>
    </>
  );
}

export default App;
```

**Los dos bloques comentados adentro del `return`** son, literalmente, cómo se veían los
inputs *antes* de crear `Input.jsx` — se dejaron ahí a propósito, sin borrar, para poder
comparar en el mismo archivo el "antes" (JSX inline) y el "después" (`<Input />`).

**Dos formas de manejar el mismo evento, en este mismo archivo:** `num1` usa una función
inline (`evento={(evento) => setNum1(...)}`), `num2` usa un handler nombrado declarado antes
del `return` (`handleNum2Change`). Son equivalentes — es cuestión de legibilidad, no de que una
"funcione mejor" que la otra (ver `RESUMEN-CLASE-21-REACT.md`, sección 4).

---

## Repaso rápido

- **Paso 0:** proyecto armado, `utils/mathOperations.js` con la lógica separada de la vista.
- **Paso 1:** el componente `Input`, con su prop `evento` conectada al `onChange` real.
- **Paso 2:** `App.jsx` usando `<Input />` dos veces con props distintas — los botones y el
  resultado quedaron sin extraer, tal como en la clase.

Para el resto de los conceptos de la clase (`children`, `.map()` + `key`, spread operator),
ver `RESUMEN-CLASE-21-REACT.md` — se explican ahí con otro ejemplo (un historial de
operaciones) que no forma parte de esta calculadora paso a paso.
