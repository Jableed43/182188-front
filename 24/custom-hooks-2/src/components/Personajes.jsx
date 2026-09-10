import { useState } from 'react'
import useCrearPersonaje from '../hooks/useCrearPersonaje'
import useFetchPersonajes from '../hooks/useFetchPersonajes'
import FormularioPersonaje from './FormularioPersonaje'

function Personajes() {
    const [personajeEnEdicion, setPersonajeEnEdicion] = useState(null)
   const { error, loading, personajes, setPersonajes, fetchPersonajes } = useFetchPersonajes()
    const { crearPersonaje } = useCrearPersonaje()

    const handleCrear = async (datos) => {
        const nuevoPersonaje = await crearPersonaje(datos)
        if(nuevoPersonaje){
            // Este setPersonajes nos evita un llamado a la API
            // un posible problema es que si la api falla podria tener un dato fantasma
            setPersonajes((actuales) => [...actuales, nuevoPersonaje])
        }
        // llamamos de nuevo para evitar tener un dato fantasma
        fetchPersonajes()
    }

   // Manejar los errores
   if(loading) return <p className='cargando'> Cargando personajes... </p>
   if(error) return <p>Error al cargar personajes: {error}</p>

  return (
    <section className='tarjeta personajes' >
        <div className='personajes-header'>
            <h2>Personajes de rick & morty</h2>
        </div>

    <FormularioPersonaje 
    onCrear={handleCrear}
    />

    <div className='grid-personajes'>
        {personajes.map((personaje) => (
            <article key={personaje.id} className='tarjeta-personaje' >
                <img src={personaje.image} alt={personaje.name} />
                <h3>{personaje.name}</h3>
                <p className='estado' >
                    {personaje.status} . {personaje.species}
                </p>
            </article>
        ))}
    </div>

    </section>
  )
}

export default Personajes