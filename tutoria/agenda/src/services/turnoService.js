// Altas y consultas de "turnos" (las sesiones de terapia reservadas por un paciente
// con un profesional). Habla con la colección /turnos de json-server a través de
// src/services/api.js. No hay validaciones acá: la forma final de los datos la
// decide quien llama a estas funciones (típicamente los componentes en
// src/components/agenda).
//
// Forma de un turno en agenda.json:
//   { id, profesionalId, pacienteId, fecha ("yyyy-MM-dd"), hora ("HH:mm"),
//     motivo, estado: "reservado" | "completado" | "cancelado" }

import { get, post, patch } from './api';

export const getProfesionales = () => get('/profesionales');
export const getPacientes = () => get('/pacientes');
export const getTurnos = () => get('/turnos');

// json-server no tiene un endpoint "/turnos?profesionalId=X" configurado como filtro
// dedicado acá; en cambio, traemos todos los turnos y filtramos en el cliente.
// Para el volumen de datos de este proyecto (un archivo JSON local) es más simple
// que armar query params, y evita tener que mantener dos formas de pedir lo mismo.
export const getTurnosPorProfesional = async (profesionalId) => {
  const turnos = await get('/turnos');
  return turnos.filter((t) => t.profesionalId === profesionalId);
};

export const getTurnosPorPaciente = async (pacienteId) => {
  const turnos = await get('/turnos');
  return turnos.filter((t) => t.pacienteId === pacienteId);
};

// Crea un turno nuevo con estado "reservado". `motivo` es opcional (queda como
// string vacío si no se pasa). No valida que el horario esté realmente libre —
// esa lógica vive en src/utils/slots.js y corre antes, en el componente que
// arma la UI de horarios disponibles (ReservarTurno.jsx).
export const reservarTurno = ({ profesionalId, pacienteId, fecha, hora, motivo }) =>
  post('/turnos', {
    profesionalId,
    pacienteId,
    fecha,
    hora,
    motivo: motivo || '',
    estado: 'reservado',
  });

// Cambia la fecha/hora de un turno ya existente, sin tocar el resto de sus datos
// (paciente, motivo, etc.). Se usa para "mover" un turno reservado a otro horario.
export const reprogramarTurno = (turnoId, { fecha, hora }) =>
  patch(`/turnos/${turnoId}`, { fecha, hora });

// Cambia el estado de un turno: "reservado" → "completado" o "cancelado".
export const actualizarEstadoTurno = (turnoId, estado) =>
  patch(`/turnos/${turnoId}`, { estado });
