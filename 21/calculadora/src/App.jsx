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
