import useFetchPersonajes from '../hooks/useFetchPersonajes'

function Personajes() {
   const { error, loading, personajes } = useFetchPersonajes()

   // Manejar los errores
   if(loading) return <p className='cargando'> Cargando personajes... </p>
   if(error) return <p>Error al cargar personajes: {error}</p>

  return (
    <section className='tarjeta personajes' >
        <div className='personajes-header'>
            <h2>Personajes de rick & morty</h2>
        </div>

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