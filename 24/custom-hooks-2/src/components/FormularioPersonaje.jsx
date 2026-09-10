import { useEffect } from "react";
import { useState } from "react";

// O -> de solid el uso de constantes

const FORM_VACIO = {
  name: "",
  species: "",
  status: "Alive",
  image: "",
};

// Esto es un ENUM
const ESTADOS = ["Alive", "Dead", "unknown"]

// Este componente tiene la responsabilidad de reunir la informacion para crear el registro
// no tiene la responsabilidad de enviar los datos
function FormularioPersonaje({
//   personajeEnEdicion,
  onCrear,
//   onCancelar,
}) {
  const [form, setForm] = useState(FORM_VACIO);
  const [enviando, setEnviando] = useState(false);

  // va a manejar los cambios en el personajeEnEdicion
//   useEffect(() => {
//     if (personajeEnEdicion) {
//       setForm({
//         name: personajeEnEdicion.name,
//         species: personajeEnEdicion.species,
//         status: personajeEnEdicion.status,
//         image: personajeEnEdicion.image || "",
//       });
//     } else {
//       setForm(FORM_VACIO);
//     }
//   }, [personajeEnEdicion]);

  // Usa los atributos name y value
  // para saber que parte del objeto form actualizar
  // sin importar cuantos campos tenga el formulario
  // ni tampoco el tipo de input utilizado
  const manejarCambios = (evento) => {
    const { name, value } = evento.target;
    setForm((actual) => ({ ...actual, [name]: value }));
  };

  const handleSubmit = async (evento) => {
    evento.preventDefault()
    if(form.name.trim() === "" || form.species.trim() === "") return;

    setEnviando(true)
    // await genera una pausa, manda la informacion y espera una respuesta
    await onCrear(form)
    // hasta que no responda la api no setea el formulario ni el enviando
    setForm(FORM_VACIO)
    setEnviando(false)
  };

  return (
    <form onSubmit={handleSubmit} className="formulario-personaje">
      <h3> Creando personaje </h3>
      <div className="campo">
        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          id="name"
          name="name"
          // solo tener el form.name con el dato del form
          // es una via de una sola direccion porque el estado solo lo setea setForm
          value={form.name}
          // El input modifica al estado a traves de eventos
          onChange={manejarCambios}
          placeholder="Ej: Devil Morty"
        />
      </div>
      <div className="campo">
        <label htmlFor="species">Especie</label>
        <input
          type="text"
          id="species"
          name="species"
          placeholder="Ej: Human"
          value={form.species}
          // El input modifica al estado a traves de eventos
          onChange={manejarCambios}
        />
      </div>

      <div className="campo">
        <label htmlFor="status">Estado</label>
        <select name="status" id="status">
            {ESTADOS.map((estado) => (
                // a pesar de que "estado" sea string puede ser key ya que es unico y no hay dos estados iguales. el requisito principal es que el dato sea unico e irrepetible sin importar su tipo
          <option key={estado} value={estado}>
            {estado}
          </option>
            ))}
        </select>
      </div>

      <div className="campo campo-ancho">
        <label htmlFor="image">URL de la foto (opcional)</label>
        <input type="url" id="image" name="image" placeholder="Https://..."
        value={form.image}
          // El input modifica al estado a traves de eventos
          onChange={manejarCambios} />
      </div>

      {/* Tarjeta que se escribe sola: React redibuja esto en cada tecla
          porque "form" cambia con cada onChange — la prueba visual de
          que el input está controlado. */}
      <div className="tarjeta-preview">
        {form.image ? (
          <img src={form.image} alt="" className="tarjeta-preview-imagen" />
        ) : (
          <div className="tarjeta-preview-avatar">{(form.name || "?").charAt(0)}</div>
        )}
        <span className={`estado estado-${form.status.toLowerCase()}`}>
          {form.name || "Nombre..."} · {form.species || "Especie..."}
        </span>
      </div>

        <div className="formulario-botones" >
            {/* // si disabled está en true no podes clickear el botón */}
        <button type="submit" disabled={enviando}>
        Crear personaje
        </button>
        {/* {personajeEnEdicion && (
           
            <button className="botón-secundario" onClick={onCancelar} type="button" >
                Cancelar
            </button>
        )} */}
        </div>

    </form>
  );
}

export default FormularioPersonaje;
