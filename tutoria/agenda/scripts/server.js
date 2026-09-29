// Reemplaza al comando "json-server" plano: levanta el mismo servidor y, además,
// mantiene sincronizada la colección "feriados" corriendo un pull diario en
// segundo plano. Así no hace falta una tercera terminal ni configurar nada a
// nivel del sistema operativo (Task Scheduler, cron del SO, etc.).
import { spawn } from 'node:child_process';
import cron from 'node-cron';
import { pullFeriados, aniosPorDefecto } from './lib/feriados.js';

const jsonServer = spawn('json-server --watch agenda.json --port 3000', {
  stdio: 'inherit',
  shell: true,
});

jsonServer.on('exit', (code) => process.exit(code ?? 0));

const sincronizarFeriados = async () => {
  try {
    const { anios, cantidad } = await pullFeriados(aniosPorDefecto());
    console.log(`[feriados] sincronizados ${cantidad} feriados (${anios.join(', ')}).`);
  } catch (err) {
    // Si falla (sin internet, API caída, etc.) se reintenta en el próximo pull diario;
    // los feriados ya guardados en agenda.json no se tocan.
    console.error('[feriados] no se pudo sincronizar hoy:', err.message);
  }
};

// Un pull al iniciar (por si la máquina estuvo apagada cuando tocaba el de las 03:00)
// y luego uno por día. Hora local del sistema donde corre este proceso.
sincronizarFeriados();
cron.schedule('0 3 * * *', sincronizarFeriados);

const apagar = () => {
  jsonServer.kill();
  process.exit(0);
};
process.on('SIGINT', apagar);
process.on('SIGTERM', apagar);
