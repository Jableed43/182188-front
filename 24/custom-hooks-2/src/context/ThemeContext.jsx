// Context API ya viene integrado en react

import { createContext, useContext, useState } from "react";

// Te permite crear un contexto que los componentes pueden proveer o leer
export const ThemeContext = createContext()

export function ThemeProvider({ children }) {
    // el tema por default no es dark
    // la forma vieja de manejar el estado:
    // const [isDark, setIsDark] = useState(false)
    // const toggleTheme = () => setIsDark((actual) => !actual)
    
    const [isDark, setIsDark] = useState(() => {
        return localStorage.getItem("tema") === "dark"
    })

    const toggleTheme = () => setIsDark((actual) => {
        const nuevoValor = !actual
        localStorage.setItem("tema", nuevoValor ? "dark" : "light")
        return nuevoValor
    })


    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }} >
            { children }
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    return useContext(ThemeContext)
}
