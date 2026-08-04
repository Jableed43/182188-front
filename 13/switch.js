// imaginate una situacion similar al if
// pero tenes varios posibles valores para tu condicion

// Queremos saber a que generacion pertenece una persona segun su año de nacimiento

let anioNacimiento = 1992

switch (anioNacimiento) {
    // case condicion:
    //     lo que se ejecuta si la condicion es verdadera
    //     break;

    case anioNacimiento >= 1920 && anioNacimiento <= 1945:
        console.log("Generacion silenciosa")
        break;

    case anioNacimiento >= 1946 && anioNacimiento <= 1964:
        console.log("Baby Boomer")
        break;
    
    case anioNacimiento >= 1965 && anioNacimiento <= 1979:
        console.log("Generacion X")
        break;

    case anioNacimiento >= 1980 && anioNacimiento <= 2000:
        console.log("Generacion Y")
        break; 

    case anioNacimiento >= 2001 && anioNacimiento <= 2010:
        console.log("Generacion Z")
        break; 

    default:
        // Default funciona como el else
        // Nunca puede faltar el caso default
        console.log("Sos de otra generacion")
        break;
}
