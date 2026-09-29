// Wrapper mínimo sobre fetch para hablar con json-server (ver scripts/server.js).
// Todo el resto de los "services" (turnoService, bloqueoService, feriadoService)
// se apoyan en las 4 funciones que exporta este archivo: get/post/patch/del.
// No hay lógica de negocio acá, solo el "cómo" de la comunicación HTTP.

// json-server corre en este puerto (ver "server" en package.json). Si lo cambiás
// ahí, tenés que cambiarlo también acá.
const BASE_URL = 'http://localhost:3000';

/**
 * Hace un fetch a `${BASE_URL}${path}` y devuelve el body ya parseado como JSON.
 * Centraliza el manejo de errores: si la respuesta no es 2xx, tira una excepción
 * en vez de devolver silenciosamente un objeto de error — así los componentes
 * pueden usar try/catch (o dejar que el error se propague) sin chequear `res.ok`
 * en cada lugar donde se llama a la API.
 */
async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`Error ${res.status} al consultar ${path}`);
  }

  // DELETE en json-server responde 204 sin body; no hay nada que parsear.
  if (res.status === 204) return null;
  return res.json();
}

// GET /path → los datos ya parseados (array u objeto, según el endpoint).
export const get = (path) => request(path);

// POST /path con `data` como body → json-server crea el registro y le asigna un id.
export const post = (path, data) => request(path, { method: 'POST', body: JSON.stringify(data) });

// PATCH /path con `data` como body → json-server actualiza solo los campos incluidos
// (no reemplaza el registro entero, a diferencia de PUT).
export const patch = (path, data) => request(path, { method: 'PATCH', body: JSON.stringify(data) });

// DELETE /path → borra el registro. json-server responde 204, así que `request` devuelve null.
export const del = (path) => request(path, { method: 'DELETE' });
