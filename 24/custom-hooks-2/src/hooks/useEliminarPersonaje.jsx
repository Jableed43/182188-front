import { useState } from 'react'
import { URL_PERSONAJES } from '../utils/api'

// Este delete es HARD delete realmente elimina el dato
// En contraparte al SOFT delete, no lo elimina, solo le añade un dato que se interpreta como eliminado, generalmente se usa "deletedAt" como timestamp

function useEliminarPersonaje() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const eliminarPersonaje = async (id) => {
        setLoading(true);
        setError(null);

        try {
            const respuesta = await fetch(`${URL_PERSONAJES}/${id}`, {
                method: "DELETE",
                // headers no se mandan en delete porque las API's no suelen ver el body en los casos de delete
                // el unico caso que podriamos llegar a utilizar es en caso de autenticacion/autorizacion
                // headers: { "Content-Type": "application/json" }
            })

            if (!respuesta.ok) {
        throw new Error(`No se pudo eliminar el personaje: ${respuesta.status}`);
      }

      return true

        } catch (error) {
            setError(error.message || "Ocurrió un error al eliminar el personaje");
        return false;
        } finally {
            setLoading(false)
        }
    }

  return { loading, error, eliminarPersonaje }
}

export default useEliminarPersonaje