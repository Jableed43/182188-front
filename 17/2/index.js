document.addEventListener("DOMContentLoaded", function () {
  // lista es el ul
  const lista = document.querySelector(".lista")
  const btnAgregar = document.getElementById("btn-agregar")
  
  // NodeList
  // es la lista de los li
  const itemsList = document.querySelectorAll(".item");
  let contador = itemsList.length

  console.log(itemsList);

  btnAgregar.addEventListener("click", function() {
     // sumo +1 contador 
    contador++

  // crear el elemento
    const li = document.createElement('li')

    // ponerle texto
    li.textContent = `Item ${contador}`

    // ponerle la clase
    li.className = "item"

    // añadirlo a la lista
    lista.appendChild(li)
  
  })

});
