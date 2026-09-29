// Carga/actualización manual de feriados: hace GET a la API pública de ArgentinaDatos
// para los años indicados y los guarda en agenda.json bajo la colección "feriados".
// Uso: node scripts/fetch-feriados.js [años separados por coma]
// Por defecto trae el año actual y el siguiente.
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
