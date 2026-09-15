import { Link } from "react-router-dom";

// Index — vive en "/". Landing simple, separada de la pantalla del CRUD:
// no pide datos a ninguna API, solo presenta la app y linkea hacia adentro.
function Index() {
  return (
    <section className="tarjeta index">
      <h2>Bienvenido</h2>
      <p>
        Esta app administra personajes de Rick and Morty contra un servidor
        local (<code>json-server</code>). Desde acá se entra al CRUD
        completo: crear, ver el detalle de cada uno, editar y eliminar.
      </p>
      <Link to="/personajes" className="boton-link">
        Ir al CRUD de personajes →
      </Link>
    </section>
  );
}

export default Index;
