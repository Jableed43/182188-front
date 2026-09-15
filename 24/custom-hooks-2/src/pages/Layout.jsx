// template

import { Link, Outlet } from "react-router-dom";
import "../App.css";

// Un componente Layout en React Router v6+ es un componente contenedor (wrapper) que define la estructura visual compartida entre varias rutas (como una barra de navegación, un sidebar o un footer) y utiliza el componente <Outlet/> para renderizar de forma dinámica el contenido específico de cada subruta.

// En lugar de duplicar elementos comunes en cada página, defines el armazón una sola vez y dejas que React Router inyecte las vistas hijas en el punto exacto donde colocas el <Outlet/>.

// Layout es una estructura que van a tener todos mis componentes
function Layout() {
  return (
    <main className="app">
      <h1>CRUD de personajes</h1>

      <header>
        <nav className="nav-principal">
          <Link to="/">Inicio</Link>
          <Link to="/personajes">Personajes</Link>
        </nav>
      </header>
    {/* // Outlet representa toda pagina que va a utilizar este layout */}
      <Outlet />
    </main>
  );
}

export default Layout