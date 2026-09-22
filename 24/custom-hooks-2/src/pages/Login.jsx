import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { login, error } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (evento) => {
        evento.preventDefault()
        const exito = await login(email, password)
        if(exito){
            navigate("/personajes")
        }
    }

  return (
    <section className="tarjeta auth">
      <h2>Iniciar sesión</h2>

      <form className="formulario-auth" onSubmit={handleSubmit}>
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

        <button type="submit">Entrar</button>
      </form>

      <p className="auth-link">
        ¿No tenés cuenta? <Link to="/registro">Registrate</Link>
      </p>
    </section>
  );
}

export default Login;
