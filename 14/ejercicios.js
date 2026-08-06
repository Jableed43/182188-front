// 1. El Filtro de Emails Institucionales (Nivel: Fácil)
// Por qué es bueno: Muestra por qué es vital limpiar datos (el usuario suele dejar espacios o escribir en mayúsculas sin darse cuenta) antes de buscar una coincidencia.

function validarEmail(emailIngresado) {
    // Como resultado obtengo un email sin espacios delante ni detras
    // email en minusculas
    const emailLimpio = emailIngresado.trim().toLowerCase()
    console.log(emailLimpio)
    // Filtro de Emails Institucionales
    if(emailLimpio.includes("@utn.edu.ar")){
        return "Login exitoso ¡Bienvenido a la UTN!"
    } else {
        return "Error: Solo se permiten correos institucionales"
    }
}

console.log(validarEmail("    alumno123@UTN.EDU.AR  "))
console.log(validarEmail("alumno456@gmail.com"))

const baseDeDatosEmails = [
    "  juan@utn.edu.ar  ",         
    "MARIA@ALUMNOS.UTN.EDU.AR",    
    "lucas@gmail.com",             
    " profe@utn.edu.ar",           
    "ana@yahoo.com"              
];

// map retorna una lista
const emailsValidados = baseDeDatosEmails.map((email) => {
    return validarEmail(email)
})

console.log(emailsValidados)