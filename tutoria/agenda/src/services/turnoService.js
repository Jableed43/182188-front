import { get, post, patch } from './api';

export const getProfesionales = () => get('/profesionales');
export const getPacientes = () => get('/pacientes');
export const getTurnos = () => get('/turnos');

export const getTurnosPorProfesional = async (profesionalId) => {
  const turnos = await get('/turnos');
  return turnos.filter((t) => t.profesionalId === profesionalId);
};

export const getTurnosPorPaciente = async (pacienteId) => {
  const turnos = await get('/turnos');
  return turnos.filter((t) => t.pacienteId === pacienteId);
};

export const reservarTurno = ({ profesionalId, pacienteId, fecha, hora, motivo }) =>
  post('/turnos', {
    profesionalId,
    pacienteId,
    fecha,
    hora,
    motivo: motivo || '',
    estado: 'reservado',
  });

export const reprogramarTurno = (turnoId, { fecha, hora }) =>
  patch(`/turnos/${turnoId}`, { fecha, hora });

export const actualizarEstadoTurno = (turnoId, estado) =>
  patch(`/turnos/${turnoId}`, { estado });
