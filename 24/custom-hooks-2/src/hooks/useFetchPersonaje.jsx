import { useState, useEffect } from "react";
import { URL_PERSONAJES } from "../utils/api";

// Custom Hook de lectura de UN SOLO personaje, por id. Hermano de
// useFetchPersonajes (plural) — mismo patrón, pero pide un recurso puntual
// en vez de la colección entera. Pensado para la página de detalle, donde
// el id sale de la URL con useParams().
function useFetchPersonaje(id) {
  const [personaje, setPersonaje] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Mismo fix que en useFetchPersonajes: nada de setState síncrono antes
    // del primer await, para no disparar el warning de "setState síncrono
    // dentro de un efecto".
    const cargarPersonaje = async () => {
      try {
        const respuesta = await fetch(`${URL_PERSONAJES}/${id}`);

        if (!respuesta.ok) {
          throw new Error(`Error en la llamada: ${respuesta.status} ${respuesta.statusText}`);
        }

        const datos = await respuesta.json();
        setPersonaje(datos);
        setError(null);
      } catch (err) {
        setError(err.message || "Ocurrió un error en la API");
      } finally {
        setLoading(false);
      }
    };

    cargarPersonaje();
  }, [id]); // si cambia el id de la URL, se vuelve a pedir solo

  return { personaje, setPersonaje, loading, error };
}

export default useFetchPersonaje;
