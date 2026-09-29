// Este archivo es lo que corre `npm run server`. Reemplaza al comando
// "json-server" plano (que sigue disponible como `npm run server:plain` por si
// hace falta un fallback simple): levanta el mismo servidor tal cual, y
// ADEMÁS mantiene sincronizada la colección "feriados" corriendo un pull
// diario en segundo plano, dentro de este mismo proceso.
//
// Por qué está armado así (y no con el Task Scheduler de Windows, un cron
// del sistema operativo, o un proceso aparte): este proyecto corre en la
// máquina de quien lo usa, no en un servidor propio. Meter la sincronización
// acá adentro significa que "mientras tengas la app funcionando, los feriados
// se mantienen al día solos" — sin pedirle a nadie que configure nada fuera
// del proyecto, y sin sumar una tercera terminal a las dos que ya hacen falta
// (ver README, sección "Cómo correrlo").
import { spawn } from 'node:child_process';
import cron from 'node-cron';
import { pullFeriados, aniosPorDefecto } from './lib/feriados.js';

// Se lanza como un comando de shell (un solo string, no args separados) para
// que Windows lo resuelva bien sin el warning de seguridad que tira Node
// cuando shell:true recibe un array de args. `json-server` se resuelve solo
// porque `npm run` agrega node_modules/.bin al PATH del proceso que ejecuta
// este script, y ese PATH lo hereda este child process.
const jsonServer = spawn('json-server --watch agenda.json --port 3000', {
  stdio: 'inherit',
  shell: true,
});

// Si json-server se cae (puerto ocupado, etc.), este proceso también termina
// con el mismo código de salida, en vez de quedar "vivo" sin servidor real.
jsonServer.on('exit', (code) => process.exit(code ?? 0));

// Trae los feriados del año actual + el siguiente y los guarda en agenda.json
// (ver scripts/lib/feriados.js para el detalle del merge). json-server, que
// corre con --watch, detecta el cambio en el archivo y recarga solo — no hace
// falta reiniciar nada ni avisarle a mano.
const sincronizarFeriados = async () => {
  try {
    const { anios, cantidad } = await pullFeriados(aniosPorDefecto());
    console.log(`[feriados] sincronizados ${cantidad} feriados (${anios.join(', ')}).`);
  } catch (err) {
    // Si falla (sin internet, API caída, etc.) no se reintenta al toque: se
    // deja para el próximo pull diario. Los feriados ya guardados en
    // agenda.json quedan intactos, así que la app sigue funcionando con los
    // últimos datos que sí se pudieron traer.
    console.error('[feriados] no se pudo sincronizar hoy:', err.message);
  }
};

// Un pull al arrancar (por si la máquina estuvo apagada a las 03:00 y se
// perdió esa corrida) y después uno por día, a las 03:00 hora local de la
// máquina donde corre este proceso. Formato del cron: minuto hora día mes
// día-de-semana → "0 3 * * *" = "a las 03:00, todos los días".
sincronizarFeriados();
cron.schedule('0 3 * * *', sincronizarFeriados);

// Al cerrar este proceso (Ctrl+C, o que algo lo mate) hay que apagar también
// el child de json-server explícitamente — si no, puede quedar corriendo
// "huérfano" y ocupando el puerto 3000 para la próxima vez que se intente
// levantar el servidor.
const apagar = () => {
  jsonServer.kill();
  process.exit(0);
};
process.on('SIGINT', apagar);
process.on('SIGTERM', apagar);
