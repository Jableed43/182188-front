import { nombreDia, toISODate } from './dateUtils';

// Slots que el profesional habilita para un día de la semana (según su disponibilidad recurrente).
export const getDisponibilidadDia = (profesional, date) => {
  const dia = nombreDia(date);
  const plan = profesional?.disponibilidad?.find((d) => d.dia === dia);
  if (!plan || !plan.activa) return [];
  return plan.slots;
};

// Un bloqueo sin hora bloquea el día entero (ej: el profesional falta ese día).
export const diaBloqueadoCompleto = (bloqueos, profesionalId, date) => {
  const fechaStr = toISODate(date);
  return bloqueos.some((b) => b.profesionalId === profesionalId && b.fecha === fechaStr && !b.hora);
};

// Horarios puntuales bloqueados ese día (ej: una cita/evento que ocupa ese horario).
const getHorasBloqueadas = (bloqueos, profesionalId, date) => {
  const fechaStr = toISODate(date);
  return bloqueos
    .filter((b) => b.profesionalId === profesionalId && b.fecha === fechaStr && b.hora)
    .map((b) => b.hora);
};

const getHorasOcupadas = (turnos, profesionalId, date) => {
  const fechaStr = toISODate(date);
  return turnos
    .filter((t) => t.profesionalId === profesionalId && t.fecha === fechaStr && t.estado !== 'cancelado')
    .map((t) => t.hora);
};

// Slots finales disponibles para reservar: disponibilidad recurrente menos bloqueos y turnos ya tomados.
export const getSlotsDisponibles = (profesional, date, turnos, bloqueos) => {
  if (diaBloqueadoCompleto(bloqueos, profesional.id, date)) return [];

  const slotsBase = getDisponibilidadDia(profesional, date);
  const ocupados = new Set([
    ...getHorasBloqueadas(bloqueos, profesional.id, date),
    ...getHorasOcupadas(turnos, profesional.id, date),
  ]);

  return slotsBase.filter((slot) => !ocupados.has(slot));
};
