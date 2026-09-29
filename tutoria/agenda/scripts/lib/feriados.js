// Lógica compartida para traer feriados de la API pública de ArgentinaDatos
// (https://argentinadatos.com/docs/operations/get-feriados.html) y guardarlos
// en agenda.json, bajo la colección "feriados". La usan tanto el script
// manual (scripts/fetch-feriados.js, para forzar una actualización a mano) como
// el proceso de sincronización diaria (scripts/server.js). Vive en su propio
// archivo justo para que ambos la reutilicen sin duplicar código.
//
// Esto corre en Node (fuera del navegador), así que puede leer y escribir
// agenda.json directamente con fs — a diferencia de src/services/feriadoService.js,
// que corre en el navegador y solo puede leer vía la API de json-server.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const API_BASE = 'https://api.argentinadatos.com/v1/feriados';
// Ruta absoluta a agenda.json, calculada desde la ubicación de este archivo
// (scripts/lib/feriados.js) subiendo dos niveles hasta la raíz del proyecto.
// Así el script funciona sin importar desde qué carpeta se lo invoque.
export const AGENDA_PATH = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..', 'agenda.json');

// GET https://api.argentinadatos.com/v1/feriados/{anio} → array de
// { fecha, tipo, nombre } para ese año. Tira si la respuesta no es 2xx.
const fetchFeriadosDelAnio = async (anio) => {
  const res = await fetch(`${API_BASE}/${anio}`);
  if (!res.ok) {
    throw new Error(`No se pudo obtener feriados de ${anio}: HTTP ${res.status}`);
  }
  return res.json();
};

/**
 * Trae los feriados de los `anios` indicados y actualiza agenda.json:
 * reemplaza solo los feriados de esos años (los de otros años ya guardados no
 * se tocan), y deja el resultado ordenado por fecha.
 *
 * Detalle importante — el id de cada feriado es su propia fecha ("2026-12-08"),
 * no un número autoincremental. Esto es a propósito: un feriado que cambia de
 * nombre o de tipo entre una corrida y la siguiente sigue teniendo el mismo id
 * (porque su fecha no cambió), así que siempre pisa el mismo registro en vez
 * de duplicarse. Y como los bloqueos guardan una referencia a este id
 * (feriadoId, ver src/services/bloqueoService.js y BloqueoAgenda.jsx), esa
 * referencia sigue siendo válida después de re-sincronizar — con ids
 * autoincrementales, cada corrida podía correr los números y dejar referencias
 * viejas apuntando al feriado equivocado.
 */
export const pullFeriados = async (anios) => {
  const porAnio = await Promise.all(anios.map(fetchFeriadosDelAnio));
  const nuevos = porAnio.flat().map((f) => ({ id: f.fecha, ...f }));

  const agenda = JSON.parse(readFileSync(AGENDA_PATH, 'utf-8'));

  const aniosSet = new Set(anios.map(String));
  // slice(0, 4) de "yyyy-MM-dd" son los primeros 4 caracteres → el año.
  const feriadosPrevios = (agenda.feriados || []).filter((f) => !aniosSet.has(f.fecha.slice(0, 4)));

  agenda.feriados = [...feriadosPrevios, ...nuevos].sort((a, b) => a.fecha.localeCompare(b.fecha));
  writeFileSync(AGENDA_PATH, JSON.stringify(agenda, null, 2) + '\n');

  return { anios, cantidad: nuevos.length };
};

// Año actual + el siguiente, calculado en el momento en que se llama a esta
// función (no hardcodeado): así el rango que se sincroniza "avanza solo" con
// el tiempo, sin que alguien tenga que acordarse de actualizar un número acá.
export const aniosPorDefecto = () => {
  const anioActual = new Date().getFullYear();
  return [anioActual, anioActual + 1];
};
