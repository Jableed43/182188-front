import { useEffect, useState } from "react";
import { URL_PERSONAJES } from "../utils/api";

function useFetchPersonajes() {
  // Data es lo que la api me haya enviado
  const [personajes, setPersonajes] = useState([]);
  // Loading para avisarle al usuario que su peticion está cargando
  const [loading, setLoading] = useState(true);
  // Error, para enviarlo a la pantalla y para ver en tiempo real si hay un error
  const [error, setError] = useState(null);

  // Implementacion de Funcion principal
  const fetchPersonajes = async () => {
    // seteamos loading en true
    setLoading(true);
    // seteamos error a null, ya que no sabemos si quedó el estado guardado de la ejecucion anterior
    setError(null);

    try {
      const respuesta = await fetch(URL_PERSONAJES);
      // Validamos Si mi llamado a la API NO salio bien, entonces...
      if (!respuesta.ok) {
        throw new Error(
          `Error en la llamada: ${respuesta.status} ${respuesta.statusText}`,
        );
      }
      // Parsea de JSON a objeto de js
      // al hacer esto tenemos control total:
      // - puedo aplicarle metodos de tipos (string, array, objetos, numeros)
      // - aplicarle funciones, bucles, destructurarlo
      const personajesParseados = await respuesta.json();

      setPersonajes(personajesParseados);
    } catch (error) {
      setError(error.message || "Ocurrió un error en la API");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPersonajes();
  }, []);

  return { personajes, loading, error, fetchPersonajes, setPersonajes };
}

export default useFetchPersonajes;
