import { useState } from "react";
import useCrearPersonaje from "../hooks/useCrearPersonaje";
import useFetchPersonajes from "../hooks/useFetchPersonajes";
import FormularioPersonaje from "../components/FormularioPersonaje";
import useActualizarPersonaje from "../hooks/useActualizarPersonaje";
import useEliminarPersonaje from "../hooks/useEliminarPersonaje";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Personajes() {
  const { usuario } = useAuth();
  const [personajeEnEdicion, setPersonajeEnEdicion] = useState(null);
  const { error, loading, personajes, setPersonajes, fetchPersonajes } =
    useFetchPersonajes();
  const { crearPersonaje } = useCrearPersonaje();
  const { actualizarPersonaje } = useActualizarPersonaje();
  const { eliminarPersonaje } = useEliminarPersonaje();

  const handleCrear = async (datos) => {
    const nuevoPersonaje = await crearPersonaje(datos);
    if (nuevoPersonaje) {
      // Este setPersonajes nos evita un llamado a la API
      // un posible problema es que si la api falla podria tener un dato fantasma
      setPersonajes((actuales) => [...actuales, nuevoPersonaje]);
    }
    // llamamos de nuevo para evitar tener un dato fantasma
    fetchPersonajes();
  };

  const handleActualizar = async (id, cambios) => {
    const personajeActualizado = await actualizarPersonaje(id, cambios);
    if (personajeActualizado) {
      // Actualiza el estado de los personajes con los nuevos cambios
      // Sirve para evitar llamar a la API
      setPersonajes((actuales) =>
        actuales.map((p) => (p.id === id ? personajeActualizado : p)),
      );
    }
  };

  const handleEliminar = async (e, id) => {
    // al navegar con click en la card por el Link se disparaba junto
    // a esta función y daba 404 porque queria acceder a un id borrado
    e.preventDefault();
    e.stopPropagation();
    const eliminado = await eliminarPersonaje(id);
    // Este filter tambien evita llamados a la API
    // lo que hace es solamente va a tomar los datos donde el id no sea el mismo que del dato eliminado
    if (eliminado) {
      setPersonajes((actuales) => actuales.filter((p) => p.id !== id));
    }
  };

  // Manejar los errores
  if (loading) return <p className="cargando"> Cargando personajes... </p>;
  if (error) return <p>Error al cargar personajes: {error}</p>;

  return (
    <section className="tarjeta personajes">
      <div className="personajes-header">
        <h2>Personajes de rick & morty</h2>
      </div>

      <FormularioPersonaje
        onCrear={handleCrear}
        personajeEnEdicion={personajeEnEdicion}
        onActualizar={handleActualizar}
        onCancelar={() => setPersonajeEnEdicion(null)}
      />

      <div className="grid-personajes">
        {personajes.map((personaje) => (
          // Mucho cuidado con las redirecciones desde una page
          // Si estás dentro de una page la redireccion de Link con to
          // va a ser a una subpagina de la misma pagina
          // esta es "/personajes", mi redireccion es a /personajes/personaje.id
          <Link
            to={`${personaje.id}`}
            className="tarjeta-personaje"
            key={personaje.id}
          >
            <article>
              {personaje.image ? (
                <img src={personaje.image} alt={personaje.name} />
              ) : (
                <div className="avatar-generico">
                  {personaje.name}
                </div>
              )}
              <h3>{personaje.name}</h3>
              <p className="estado">
                {personaje.status} . {personaje.species}
              </p>
              {usuario && (
                <div className="tarjeta-personaje-acciones">
                  <button
                    type="button"
                    onClick={() => setPersonajeEnEdicion(personaje)}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className="boton-eliminar"
                    onClick={(e) => handleEliminar(e, personaje.id)}
                  >
                    Eliminar
                  </button>
                </div>
              )}
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Personajes;
