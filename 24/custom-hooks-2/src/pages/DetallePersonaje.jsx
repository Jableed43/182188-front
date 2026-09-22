import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetchPersonaje from "../hooks/useFetchPersonaje";
import useActualizarPersonaje from "../hooks/useActualizarPersonaje";
import useEliminarPersonaje from "../hooks/useEliminarPersonaje";
import FormularioPersonaje from "../components/FormularioPersonaje";
import { useAuth } from "../context/AuthContext";

// Página de detalle — vive en "/personajes/:id". El :id de la ruta se lee
// con useParams() y viaja directo al Custom Hook de fetch singular.
function DetallePersonaje() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { usuario } = useAuth();

  const { personaje, setPersonaje, loading, error } = useFetchPersonaje(id);
  const { actualizarPersonaje } = useActualizarPersonaje();
  const { eliminarPersonaje } = useEliminarPersonaje();

  const [editando, setEditando] = useState(false);

  if (loading) return <p className="cargando">Cargando personaje...</p>;
  if (error) return <p className="error-mensaje">Error: {error}</p>;

  const handleActualizar = async (idPersonaje, cambios) => {
    const actualizado = await actualizarPersonaje(idPersonaje, cambios);
    if (actualizado) {
      setPersonaje(actualizado); // reflejar el cambio sin volver a pedir todo
      setEditando(false);
    }
  };

  const handleEliminar = async () => {
    const seEliminó = await eliminarPersonaje(personaje.id);
    if (seEliminó) {
      navigate("/"); // navegación programática: no hay un <Link> que clickear acá
    }
  };

  return (
    <section className="tarjeta detalle-personaje">
      <button type="button" className="boton-volver" onClick={() => navigate(-1)}>
        ← Volver
      </button>

      {editando ? (
        <FormularioPersonaje
          personajeEnEdicion={personaje}
          onActualizar={handleActualizar}
          onCancelar={() => setEditando(false)}
        />
      ) : (
        <>
          {personaje.image ? (
            <img src={personaje.image} alt={personaje.name} className="detalle-imagen" />
          ) : (
            <div className="avatar-generico avatar-grande">{personaje.name.charAt(0)}</div>
          )}

          <h2>{personaje.name}</h2>
          <p className={`estado estado-${personaje.status.toLowerCase()}`}>
            {personaje.status} · {personaje.species}
          </p>

          {usuario && (
          <div className="detalle-acciones">
            <button type="button" onClick={() => setEditando(true)}>
              Editar
            </button>
            <button type="button" className="boton-eliminar" onClick={handleEliminar}>
              Eliminar
            </button>
          </div>
              )}
        </>
      )}
    </section>
  );
}

export default DetallePersonaje;
