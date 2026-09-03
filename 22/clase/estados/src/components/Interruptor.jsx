import { useState } from "react"

function Interruptor() {
    // Apagar/prender una luz
    // registro de los clicks
    const [luzEncendida, setLuzEncendida] = useState(false)
    // isOn, isValid

    // En el click voy a guardar
    // id, estado (encendido, apagado), cuando
    const [historialClicks, setHistorialClicks] = useState([])

    const cambiarLuz = () => {
        // if(luzEncendida === true){
        //     setLuzEncendida(false)
        // } else {
        //     setLuzEncendida(true)
        // }
        // nuevoEstado no modifica el state tampoco le asigna un nuevo valor, modifica el valor unicamente como dato
        // Version reducida
        // setLuzEncendida(luz => !luz)
        const nuevoEstado = !luzEncendida
        setLuzEncendida(nuevoEstado)
        
        const registro = {
            // genera valor aleatorio
            id: crypto.randomUUID(),
            // renderizado condicional
            mensaje: `Luz ${nuevoEstado ? "encendida" : "apagada"} a las ${new Date().toLocaleTimeString()}`
        }
        setHistorialClicks([registro, ...historialClicks])

        console.log(...historialClicks)
        console.log("no spread",historialClicks)
    }

  return (
    <section className='tarjeta interruptor'>
        <h2>Interruptor</h2>
        <div className='bombilla'> {luzEncendida ? "🌞" : "🌙" } </div>
        
        <button onClick={cambiarLuz} > { luzEncendida ? "Apagar" : "Encender" } </button>

        <div className='historial'>
            <h3>Registro de clicks</h3>
            {/* empty state */}
            {historialClicks.length === 0 ? (
                <p className="historial-vacio"> Todavía no tocaste el interruptor </p>
            ) : (
                <ul className="lista-historial">
                    {historialClicks.map((registro) => (
                        <li key={registro.id} > {registro.mensaje} </li>
                    ))}
                </ul>
            ) }
        </div>
    </section>
  )
}

export default Interruptor