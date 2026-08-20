document.addEventListener("DOMContentLoaded", function() {
    
    // Referencias del html
    const text = document.getElementById("text")
    const color = document.getElementById("color")
    const fontSize = document.getElementById("fontSize")
    const bgColor = document.getElementById("bgColor")
    const resultado = document.getElementById("resultado")
    const body = document.querySelector("body")

    // funciones
    // Actualizar el texto
    function actualizarTexto(resultado, text) {
        resultado.textContent = text.value
        console.log(text.value)
    }

    function actualizarColor(resultado, color) {
        resultado.style.color = color.value
    }

    function actualizarTamanio(resultado, fontSize) {
        resultado.style.fontSize = `${fontSize.value}px`
    }

    function actualizarBg(resultado, bgColor) {
        resultado.style.backgroundColor = bgColor.value
    }

    // eventos
    text.addEventListener("input", () => actualizarTexto(resultado, text))
    // text.addEventListener("input", function() {actualizarTexto(resultado, text)})

    color.addEventListener("input", () => actualizarColor(resultado, color))

    fontSize.addEventListener("input", () => actualizarTamanio(resultado, fontSize))

    bgColor.addEventListener('input', () => actualizarBg(body, bgColor))
})