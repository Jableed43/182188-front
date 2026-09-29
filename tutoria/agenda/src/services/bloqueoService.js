import { get, post, del, patch } from './api';

export const getBloqueos = () => get('/bloqueos');

export const getBloqueosPorProfesional = async (profesionalId) => {
  const bloqueos = await get('/bloqueos');
  return bloqueos.filter((b) => b.profesionalId === profesionalId);
};

// Un bloqueo sin "hora" cierra el día completo; con "hora" cierra solo ese horario puntual.
export const crearBloqueo = ({ profesionalId, fecha, hora, motivo }) =>
  post('/bloqueos', { profesionalId, fecha, hora: hora || null, motivo: motivo || '' });

export const eliminarBloqueo = (bloqueoId) => del(`/bloqueos/${bloqueoId}`);

export const actualizarDisponibilidad = (profesionalId, disponibilidad) =>
  patch(`/profesionales/${profesionalId}`, { disponibilidad });
