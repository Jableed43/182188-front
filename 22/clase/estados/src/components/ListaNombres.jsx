const nombres = [
  "Lucas", "Ana", "Marta", "Nico", "Sofía", "Mateo", "Camila", "Joaquín", "Valeria", "Tomas",
  "Isabella", "Gabriel", "Martina", "Santiago", "Lucía", "Benjamín", "Elena", "Samuel", "Victoria", "Daniel",
  "Paula", "Agustín", "Zoe", "Nicolás", "Emma", "Alejandro", "Abril", "Dante", "Mia", "Diego",
  "Juana", "Ignacio", "Lola", "Gael", "Sara", "Manuel", "Renata", "Felipe", "Catalina", "Adrián",
  "Delfina", "Thiago", "Julieta", "Bruno", "Josefina", "Bautista", "Antonia", "Santino", "Olivia", "Facundo",
  "Alma", "Gonzalo", "Malena", "Emiliano", "Clara", "Marcos", "Valentina", "Ezequiel", "Pilar", "Lautaro",
  "Constanza", "Iván", "Milagros", "Ramiro", "Romina", "Esteban", "Morena", "Ciro", "Guadalupe", "Tiziano",
  "Bianca", "Gaston", "Brisa", "Julian", "Candela", "Jeremías", "Violeta", "César", "Rocío", "Maximiliano",
  "Paloma", "Alan", "Jazmín", "Francisco", "Aitana", "Leonel", "Sol", "Rodrigo", "Lara", "Elias",
  "Florencia", "Nahuel", "Paulina", "Simón", "Maite", "Enzo", "Micaela", "Matías", "Sabrina", "Valentín"
];

function ListaNombres() {
  return (
    <section className="tarjeta">
      <h2>Nombres</h2>
      <ul className="lista-nombres">
        {/* nombre es el singular del listado de nombres */}
        {/* representa cada nombre en un momento de la iteracion */}
        {nombres.map((nombre, index) => (
            <li key={index} > {nombre} </li>
        ))}
      </ul>
    </section>
  );
}

export default ListaNombres;
