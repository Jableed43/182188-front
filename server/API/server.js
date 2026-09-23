const jsonServer = require("json-server");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// En Render esta variable la setea automáticamente la plataforma con la URL pública real.
// En local no existe, así que cae al localhost de siempre.
const BASE_URL = process.env.RENDER_EXTERNAL_URL || "http://localhost:3000";
const HOST_VIEJO = "http://localhost:3000";

// Reescribe el campo "image" de cada personaje, cambiando el host viejo por el actual.
// Si ya apunta a otro dominio (ej: una imagen externa cargada por un alumno), lo deja intacto.
function reemplazarHost(personaje) {
  if (personaje?.image?.startsWith(HOST_VIEJO)) {
    personaje.image = personaje.image.replace(HOST_VIEJO, BASE_URL);
  }
  return personaje;
}

// json-server permite pisar cómo se arma la respuesta final antes de enviarla
router.render = (req, res) => {
  const datos = res.locals.data;
  const datosCorregidos = Array.isArray(datos)
    ? datos.map(reemplazarHost)
    : reemplazarHost(datos);

  res.jsonp(datosCorregidos);
};

server.use(middlewares);
server.use(router);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`API corriendo en el puerto ${PORT} (imágenes con base: ${BASE_URL})`);
});
