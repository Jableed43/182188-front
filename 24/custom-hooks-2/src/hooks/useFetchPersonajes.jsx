import { useEffect, useState } from "react";
import { URL_PERSONAJES } from "../utils/api";

function useFetchPersonajes() {
  // Data es lo que la api me haya enviado
  const [personajes, setPersonajes] = useState([]);
  // Loading para avisarle al usuario que su peticion está cargando
  const [loading, setLoading] = useState(true);
  // Error, para enviarlo a la pantalla y para ver en tiempo real si hay un error
  const [error, setError] = useState(null);

  // Se usa para volver a pedir la lista después de un evento (ej: crear un personaje),
  // así que acá sí resetea loading/error antes de pedir de nuevo.
  const fetchPersonajes = async () => {
    setLoading(true);
    setError(null);

    try {
      const respuesta = await fetch(URL_PERSONAJES);
      if (!respuesta.ok) {
        throw new Error(
          `Error en la llamada: ${respuesta.status} ${respuesta.statusText}`,
        );
      }
      const personajesParseados = await respuesta.json();

      setPersonajes(personajesParseados);
    } catch (error) {
      setError(error.message || "Ocurrió un error en la API");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fix: nada de setState síncrono antes del primer await dentro del efecto.
    // loading ya arranca en true y error ya arranca en null por los useState
    // iniciales, así que la carga del montaje no necesita resetearlos de nuevo.
    const cargarInicial = async () => {
      try {
        const respuesta = await fetch(URL_PERSONAJES);
        if (!respuesta.ok) {
          throw new Error(
            `Error en la llamada: ${respuesta.status} ${respuesta.statusText}`,
          );
        }
        const personajesParseados = await respuesta.json();

        setPersonajes(personajesParseados);
      } catch (error) {
        setError(error.message || "Ocurrió un error en la API");
      } finally {
        setLoading(false);
      }
    };

    cargarInicial();
  }, []);

  return { personajes, loading, error, fetchPersonajes, setPersonajes };
}

export default useFetchPersonajes;
