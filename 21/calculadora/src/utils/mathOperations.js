// la idea de las funciones dentro de un objeto es que manejen los mismos datos

// función pura o módulo auxiliar que realiza una tarea específica, repetitiva e independiente de la interfaz de usuario.

// Su objetivo principal es reutilizar código y mantener los componentes limpios de lógica de negocio o transformaciones complejas de datos.
export const mathOperations = {
    suma: (a, b) => a + b ,
    resta: (a, b) => a - b,
    multiplicacion: (a, b) => a * b,
    division: (a, b) => {
        if(b === 0){
            console.error("No se puede dividir por cero")
        }
        return a / b
    }
}