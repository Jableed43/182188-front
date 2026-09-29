// Consulta de la colección /feriados de json-server. Es la única función de
// lectura porque el frontend nunca escribe feriados directamente: esa colección
// se llena y se mantiene al día desde afuera, por scripts/lib/feriados.js
// (corrido manualmente con `npm run feriados:fetch`, o automáticamente por
// scripts/server.js una vez por día). Ver el README, sección "Feriados".
//
// Forma de un feriado en agenda.json:
//   { id, fecha ("yyyy-MM-dd", también usada como id), tipo, nombre }
//
// Nota: `id` es igual a `fecha` a propósito (ver scripts/lib/feriados.js) para
// que un bloqueo pueda guardar una referencia estable (`feriadoId`) que no se
// rompa cuando los feriados se vuelven a traer de la API.
import { get } from './api';

export const getFeriados = () => get('/feriados');
