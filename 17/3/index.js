const titulo = document.querySelector(".titulo")
const texto = document.querySelector(".texto")

titulo.addEventListener("click", function() {
    if(titulo.style.color === "red"){
        console.log(titulo.style.color)
        titulo.style.color = "";
    } else {
        console.log(titulo.style.color)
        titulo.style.color = "red"
    }
})

texto.addEventListener("mouseover", function() {
    texto.style.fontFamily = "Georgia, serif";
    texto.style.fontStyle = "italic";
})

texto.addEventListener("mouseout", function() {
    texto.style.fontFamily = "fantasy";
    // Las comillas vacias quitan el estilo inline 
    // Vuelve a aplicar lo que tiene en css
    texto.style.fontStyle = "";
})
