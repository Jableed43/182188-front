import { useState } from 'react'
import { URL_PERSONAJES } from '../utils/api'

function useActualizarPersonaje() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const actualizarPersonaje = async (id, cambios) => {
        setLoading(false)
        setError(null)

        try {
        const respuesta = await fetch(`${URL_PERSONAJES}/${id}`,{
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(cambios)
            })

        if(!respuesta.ok){
            throw new Error(`No se pudo actualizar el character: ${respuesta.status}`)
        }

        return await respuesta.json()

        } catch (error) {
            setError(error.message || "Ocurrio un error al actualizar el character");
        } finally {
            setLoading(false);
        }
    }

  return { loading, error, actualizarPersonaje }
}

export default useActualizarPersonaje