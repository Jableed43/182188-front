// Altas y consultas de "bloqueos" (huecos en la agenda de un profesional: un
// evento puntual, una licencia, o la decisión de no trabajar un feriado) y de
// la "disponibilidad" semanal recurrente de cada profesional (qué días y
// horarios atiende normalmente). Habla con /bloqueos y /profesionales de
// json-server a través de src/services/api.js.
//
// Forma de un bloqueo en agenda.json:
//   { id, profesionalId, fecha ("yyyy-MM-dd"), hora: "HH:mm" | null, motivo,
//     feriadoId: <id de un feriado> | null }
//
// La lógica que combina bloqueos + turnos + disponibilidad para calcular qué
// horarios quedan libres vive en src/utils/slots.js, no acá — este archivo
// solo hace las llamadas HTTP.

import { get, post, del, patch } from './api';

export const getBloqueos = () => get('/bloqueos');

// Igual que en turnoService: se trae todo y se filtra en el cliente, porque no
// hay volumen de datos que lo justifique de otra forma.
export const getBloqueosPorProfesional = async (profesionalId) => {
  const bloqueos = await get('/bloqueos');
  return bloqueos.filter((b) => b.profesionalId === profesionalId);
};

/**
 * Crea un bloqueo.
 * - `hora` en null (o sin pasarla) → bloquea el día completo.
 * - `hora` con un valor ("09:00", etc.) → bloquea solo ese horario puntual,
 *   dejando el resto del día disponible normalmente.
 * - `feriadoId` (opcional) marca que este bloqueo es la decisión de un
 *   profesional de no trabajar un feriado puntual (ver BloqueoAgenda.jsx y
 *   scripts/lib/feriados.js), en vez de un evento personal cualquiera. Sirve
 *   para poder encontrar después "¿ya bloqueé este feriado?" sin comparar
 *   fechas a mano.
 */
export const crearBloqueo = ({ profesionalId, fecha, hora, motivo, feriadoId }) =>
  post('/bloqueos', {
    profesionalId,
    fecha,
    hora: hora || null,
    motivo: motivo || '',
    feriadoId: feriadoId || null,
  });

export const eliminarBloqueo = (bloqueoId) => del(`/bloqueos/${bloqueoId}`);

// Reemplaza el array `disponibilidad` completo de un profesional (los 7 días de
// la semana, cada uno con `activa` y su lista de `slots`). Se manda entero
// porque así lo arma BloqueoAgenda.jsx al editar el plan semanal, y PATCH en
// json-server reemplaza el valor del campo tal cual se lo mandes.
export const actualizarDisponibilidad = (profesionalId, disponibilidad) =>
  patch(`/profesionales/${profesionalId}`, { disponibilidad });
