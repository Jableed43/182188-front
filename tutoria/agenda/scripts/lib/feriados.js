// Lógica compartida para traer feriados de la API de ArgentinaDatos y guardarlos
// en agenda.json. La usan tanto el script manual (fetch-feriados.js) como el
// proceso de sincronización diaria (server.js).
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const API_BASE = 'https://api.argentinadatos.com/v1/feriados';
export const AGENDA_PATH = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..', 'agenda.json');

const fetchFeriadosDelAnio = async (anio) => {
  const res = await fetch(`${API_BASE}/${anio}`);
  if (!res.ok) {
    throw new Error(`No se pudo obtener feriados de ${anio}: HTTP ${res.status}`);
  }
  return res.json();
};

// El id de cada feriado es su propia fecha (única dentro de un año): así un
// feriado que cambia de nombre/tipo pisa siempre el mismo registro en vez de
// duplicarse, y el id nunca se corre entre corridas — lo que importa porque
// los bloqueos guardan una referencia (feriadoId) a este id.
export const pullFeriados = async (anios) => {
  const porAnio = await Promise.all(anios.map(fetchFeriadosDelAnio));
  const nuevos = porAnio.flat().map((f) => ({ id: f.fecha, ...f }));

  const agenda = JSON.parse(readFileSync(AGENDA_PATH, 'utf-8'));

  const aniosSet = new Set(anios.map(String));
  const feriadosPrevios = (agenda.feriados || []).filter((f) => !aniosSet.has(f.fecha.slice(0, 4)));

  agenda.feriados = [...feriadosPrevios, ...nuevos].sort((a, b) => a.fecha.localeCompare(b.fecha));
  writeFileSync(AGENDA_PATH, JSON.stringify(agenda, null, 2) + '\n');

  return { anios, cantidad: nuevos.length };
};

// Año actual + el siguiente: se recalcula solo, no hay que actualizar años a mano con el tiempo.
export const aniosPorDefecto = () => {
  const anioActual = new Date().getFullYear();
  return [anioActual, anioActual + 1];
};
