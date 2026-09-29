// El corazón del cálculo de disponibilidad: para un profesional y un día dados,
// qué horarios quedan libres para reservar. Combina tres fuentes de datos que
// viven en colecciones separadas de agenda.json:
//   1. profesional.disponibilidad → qué horarios atiende ese día de la semana,
//      en general (recurrente, no cambia semana a semana).
//   2. bloqueos → excepciones puntuales a esa disponibilidad (una fecha
//      concreta, no un día de la semana): un evento, una licencia, o la
//      decisión de no trabajar un feriado.
//   3. turnos → horarios de esa disponibilidad que ya están ocupados por otro
//      paciente.
//
// Nada de esto se guarda "ya calculado" en ningún lado: se recalcula en el
// cliente cada vez que se necesita (ver getSlotsDisponibles), a partir de las
// tres colecciones.
import { nombreDia, toISODate } from './dateUtils';

/**
 * Horarios que el profesional tiene habilitados para el día de la semana que
 * cae `date` (ej: si `date` es un lunes, mira profesional.disponibilidad donde
 * dia === "Lunes"). No mira turnos ni bloqueos todavía — es solo el "horario
 * base" recurrente, sin las excepciones puntuales.
 * Devuelve [] si ese día no tiene disponibilidad activa (`activa: false`) o si
 * no hay ningún plan cargado para ese día.
 */
export const getDisponibilidadDia = (profesional, date) => {
  const dia = nombreDia(date);
  const plan = profesional?.disponibilidad?.find((d) => d.dia === dia);
  if (!plan || !plan.activa) return [];
  return plan.slots;
};

// Un bloqueo con `hora: null` cierra el día completo (ej: el profesional no
// trabaja ese día por un feriado, una licencia, etc.). Se usa tanto para
// deshabilitar el día en el calendario como para vaciar sus slots.
export const diaBloqueadoCompleto = (bloqueos, profesionalId, date) => {
  const fechaStr = toISODate(date);
  return bloqueos.some((b) => b.profesionalId === profesionalId && b.fecha === fechaStr && !b.hora);
};

// Bloqueos con una `hora` puntual ese día (ej: una reunión a las 14:00) — a
// diferencia de diaBloqueadoCompleto, estos no tocan el resto del día.
const getHorasBloqueadas = (bloqueos, profesionalId, date) => {
  const fechaStr = toISODate(date);
  return bloqueos
    .filter((b) => b.profesionalId === profesionalId && b.fecha === fechaStr && b.hora)
    .map((b) => b.hora);
};

// Horarios de ese día que ya tienen un turno reservado o completado. Los
// cancelados NO cuentan como ocupados: liberan el horario para que otro
// paciente pueda tomarlo.
const getHorasOcupadas = (turnos, profesionalId, date) => {
  const fechaStr = toISODate(date);
  return turnos
    .filter((t) => t.profesionalId === profesionalId && t.fecha === fechaStr && t.estado !== 'cancelado')
    .map((t) => t.hora);
};

/**
 * Función principal de este archivo: junta las tres reglas de arriba para
 * devolver la lista final de horarios reservables ese día para ese profesional.
 * La usan tanto ReservarTurno.jsx (para mostrar los botones de horario y para
 * decidir qué días del calendario deshabilitar) como GestionTurnosProfesional.jsx
 * (para marcar qué días tienen turnos).
 *
 * Orden de las reglas:
 *   1. Si el día está bloqueado completo → no hay nada disponible, punto.
 *   2. Si no, se parte de los slots base de la disponibilidad semanal...
 *   3. ...y se les resta lo que ya está ocupado (por un bloqueo puntual de
 *      hora, o por un turno ya tomado).
 */
export const getSlotsDisponibles = (profesional, date, turnos, bloqueos) => {
  if (diaBloqueadoCompleto(bloqueos, profesional.id, date)) return [];

  const slotsBase = getDisponibilidadDia(profesional, date);
  const ocupados = new Set([
    ...getHorasBloqueadas(bloqueos, profesional.id, date),
    ...getHorasOcupadas(turnos, profesional.id, date),
  ]);

  return slotsBase.filter((slot) => !ocupados.has(slot));
};
