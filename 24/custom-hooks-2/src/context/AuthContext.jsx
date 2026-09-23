// Va a manejar el contexto del usuario
// de esta forma podemos encontrar el usuario desde cual lado

// El warning de "Fast Refresh" pide separar el Provider y el hook en archivos
// distintos. Acá los dejamos juntos a propósito (mismo patrón que ThemeContext
// y que todas las clases anteriores): solo afecta que, en desarrollo, editar
// este archivo recarga la página entera en vez de conservar el estado — no
// afecta el comportamiento en producción.
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import { URL_USUARIOS } from "../utils/api";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    // localStorage te asegura que aunque se refresque la pantalla la sesion va a mantenerse activa por tiempo indeterminado
    // en tal caso lo definiría el backend
    const [usuario, setUsuario] = useState(() => {{
        // de guardado recibo un json desde localStorage
        const guardado = localStorage.getItem("usuario")
        // si lo tengo, entonces lo retorno en objeto de js
        // si no lo tengo retorno null
        return guardado ? JSON.parse(guardado) : null
    }})

    const [error, setError] = useState(null)

    const guardarSesion = (usuarioLogeado) => {
        setUsuario(usuarioLogeado)
        localStorage.setItem("usuario", JSON.stringify(usuarioLogeado))
    }

    const login = async (email, password) => {
        setError(null)

        // esto cambia segun la api
        // el fetch tendria que ser post en un futuro
        // está utilizando query params para validar contra la API
        const respuesta = await fetch(`${URL_USUARIOS}?email=${email}&password=${password}`)

        const encontrados = await respuesta.json()

        if(encontrados.length === 0){
            setError("Email o contraseña incorrectos")
            return false
        } 
        guardarSesion(encontrados[0])
        return true
    }

    const registrar = async (name, email, password) => {
        setError(null)

        // hacemos un llamado a la api para saber si hay un email con ese usuario
        const yaExiste = await fetch(`${URL_USUARIOS}?email=${email}`)
        
        // revisamos si hay coincidencias
        const coincidencias = await yaExiste.json()
        // solo podemos acceder a .length si es objeto de js por eso se usa .json()
        if(coincidencias.length > 0){
            setError("Ese email ya está registrado")
            return false
        }

        // la creacion del usuario
        const respuesta = await fetch(URL_USUARIOS, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        })

        if(!respuesta.ok){
            setError("No se pudo crear la cuenta")
            return false
        }

        const nuevoUsuario = await respuesta.json()
        guardarSesion(nuevoUsuario)
        return true
    }

    const logout = () => {
        setUsuario(null)
        // removeItem especificamente borra la clave "usuario"
        localStorage.removeItem("usuario")
    }

    return (
        <AuthContext.Provider value={{ usuario, error, login, registrar, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    return useContext(AuthContext)
}