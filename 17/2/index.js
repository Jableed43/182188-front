document.addEventListener("DOMContentLoaded", function () {
  const parrafoEspecial = document.getElementById("parrafo-especial");

  console.log(parrafoEspecial);
  // parrafoEspecial.style.backgroundColor = "brown"
  // parrafoEspecial.style.color = "yellow"

  // HTML collection
  const items = document.getElementsByClassName("item");

  // NodeList
  const itemsList = document.querySelectorAll(".item");

  console.log(items);

  // NodeList posee forEach
  itemsList.forEach((item, index) => console.log(item, index));

  // HTML collection - no funciona con forEach -> Lo pasas por un for o lo convertis en array
  // ✅ Solución 1: convertirla en array
  Array.from(items).forEach(function (item, i) {
    console.log(`3b) Convertida con Array.from, item ${i}:`, item.textContent);
  });

  // ✅ Solución 2: recorrerla con un for clásico (funciona en las dos)
  for (let i = 0; i < items.length; i++) {
    console.log(`3c) Con for clásico, item ${i}:`, items[i].textContent);
  }
});
