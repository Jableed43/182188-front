import { useState } from 'react'
import { URL_PERSONAJES } from '../utils/api'

function useCrearPersonaje() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const crearPersonaje = async (nuevoPersonaje) => {
        setLoading(true)
        setError(null)

        try {
            const respuesta = await fetch(URL_PERSONAJES, {
                method: "POST",
                // siempre que mandes json el headers es igual
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(nuevoPersonaje),
            })

            if(!respuesta.ok){
                throw new Error(`No se pudo crear el character: ${respuesta.status} `);
            }

            return await respuesta.json()
        } catch (error) {
            setError(error.message || "Ocurrio un error al crear el character")
        } finally {
            setLoading(false)
        }
    }

  return { crearPersonaje, loading, error }
}

export default useCrearPersonaje