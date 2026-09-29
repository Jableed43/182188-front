// Script para forzar a mano una carga/actualización de feriados, sin esperar
// al pull diario automático de scripts/server.js (por ejemplo, para probar
// algo puntualmente, o para traer años que no sean "el actual + el siguiente").
//
// Uso:
//   npm run feriados:fetch                → año actual y el siguiente
//   node scripts/fetch-feriados.js 2028,2029  → años específicos
//
// Toda la lógica real (fetch a la API + merge en agenda.json) vive en
// scripts/lib/feriados.js; este archivo es solo la interfaz de línea de comandos.
import { pullFeriados, aniosPorDefecto } from './lib/feriados.js';

const anios = (process.argv[2] ? process.argv[2].split(',') : aniosPorDefecto()).map(Number);

pullFeriados(anios)
  .then(({ cantidad }) => {
    console.log(`Guardados ${cantidad} feriados (${anios.join(', ')}) en agenda.json.`);
  })
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
