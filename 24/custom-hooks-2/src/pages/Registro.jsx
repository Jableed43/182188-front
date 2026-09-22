import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Registro() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")

    const { registrar, error } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (evento) => {
        evento.preventDefault()
        const exito = await registrar(name, email, password)
        if(exito){
            navigate("/personajes")
        }
    }

  return (
    <section className="tarjeta auth">
      <h2>Crear cuenta</h2>

      <form className="formulario-auth" onSubmit={handleSubmit}>

        <div className="campo">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(evento) => setName(evento.target.value)}
            placeholder="Tu nombre"
          />
        </div>

        <div className="campo">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(evento) => setEmail(evento.target.value)}
            placeholder="demo@utn.edu"
          />
        </div>

        <div className="campo">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(evento) => setPassword(evento.target.value)}
            placeholder="1234"
          />
        </div>

        {error && <p className="error-mensaje">{error}</p>}

        <button type="submit">Registrarme</button>
      </form>

      <p className="auth-link">
        ¿Ya tenés cuenta? <Link to="/registro">Iniciá sesión</Link>
      </p>
    </section>
  );
}

export default Registro;
