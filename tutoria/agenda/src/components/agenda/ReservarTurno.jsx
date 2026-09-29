import { useEffect, useMemo, useState } from 'react';
import Calendario from './Calendario';
import {
  getProfesionales,
  getTurnosPorProfesional,
  reservarTurno as reservarTurnoApi,
} from '../../services/turnoService';
import { getBloqueosPorProfesional } from '../../services/bloqueoService';
import { getFeriados } from '../../services/feriadoService';
import { getSlotsDisponibles } from '../../utils/slots';
import { formatFechaLarga, toISODate } from '../../utils/dateUtils';
import './agenda.css';

/**
 * Componente standalone: flujo completo de reserva de un turno.
 *
 * Props:
 * - pacienteId (string, requerido): a nombre de quién se reserva el turno
 *   (típicamente el usuario logueado). Este componente no maneja login ni
 *   selección de paciente — eso lo decide quien lo use (ver App.jsx para el
 *   ejemplo más simple, con un id hardcodeado).
 * - onReservado (fn, opcional): callback que se dispara después de reservar
 *   con éxito, por si el que usa este componente necesita reaccionar (cerrar
 *   un modal, navegar a otra pantalla, etc.). No es necesario para que el
 *   componente funcione solo.
 *
 * Flujo: elegir profesional → elegir día en el calendario → elegir un horario
 * libre de esa lista → completar motivo (opcional) → confirmar. La lista de
 * horarios libres depende de getSlotsDisponibles (src/utils/slots.js), que ya
 * excluye lo bloqueado y lo ya reservado.
 */
const ReservarTurno = ({ pacienteId, onReservado }) => {
  const [profesionales, setProfesionales] = useState([]);
  const [profesionalId, setProfesionalId] = useState('');
  const [turnos, setTurnos] = useState([]);
  const [bloqueos, setBloqueos] = useState([]);
  const [feriados, setFeriados] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [motivo, setMotivo] = useState('');
  const [mensaje, setMensaje] = useState(null);

  // Profesionales y feriados no dependen de qué profesional se eligió, así que
  // se cargan una sola vez al montar el componente.
  useEffect(() => {
    getProfesionales().then(setProfesionales);
    getFeriados().then(setFeriados);
  }, []);

  // Turnos y bloqueos sí dependen del profesional elegido: se vuelven a pedir
  // cada vez que cambia profesionalId (y se ejecuta también al elegir el primero).
  useEffect(() => {
    if (!profesionalId) return;
    getTurnosPorProfesional(profesionalId).then(setTurnos);
    getBloqueosPorProfesional(profesionalId).then(setBloqueos);
  }, [profesionalId]);

  const profesional = profesionales.find((p) => p.id === profesionalId);

  // Horarios libres para el día actualmente seleccionado (los botones de la
  // derecha). Se recalcula solo cuando cambia algo relevante (useMemo), no en
  // cada render — ver src/utils/slots.js para la lógica real.
  const slotsDisponibles = useMemo(() => {
    if (!profesional) return [];
    return getSlotsDisponibles(profesional, selectedDate, turnos, bloqueos);
  }, [profesional, selectedDate, turnos, bloqueos]);

  // Le dice al Calendario qué días no se pueden clickear: cualquier día sin
  // ningún horario libre (ya sea por bloqueo, por no ser día de atención, o
  // porque ya está todo reservado).
  const isDayDisabled = (day) => {
    if (!profesional) return true;
    return getSlotsDisponibles(profesional, day, turnos, bloqueos).length === 0;
  };

  // El puntito del calendario marca "este día tiene al menos un horario libre"
  // (no "este día tiene turnos", a diferencia de GestionTurnosProfesional.jsx,
  // que lo usa al revés porque ahí lo que importa es lo ya ocupado).
  const hasEvento = (day) => {
    if (!profesional) return false;
    return getSlotsDisponibles(profesional, day, turnos, bloqueos).length > 0;
  };

  // Feriado (si lo hay) para un día puntual, comparando por fecha en string
  // ("yyyy-MM-dd") para no depender de comparar objetos Date.
  const feriadoDelDia = (day) => feriados.find((f) => f.fecha === toISODate(day));
  const esFeriado = (day) => Boolean(feriadoDelDia(day));
  // Se muestra como aviso arriba de los horarios sea que el profesional
  // trabaje ese feriado o no — es solo información para quien está reservando.
  const feriadoSeleccionado = feriadoDelDia(selectedDate);

  // Confirma la reserva del slot elegido y refresca la lista de turnos del
  // profesional para que ese horario deje de aparecer como disponible.
  const handleReservar = async () => {
    if (!selectedSlot) return;

    await reservarTurnoApi({
      profesionalId,
      pacienteId,
      fecha: toISODate(selectedDate),
      hora: selectedSlot,
      motivo,
    });

    setMensaje('¡Turno reservado con éxito!');
    setSelectedSlot(null);
    setMotivo('');
    getTurnosPorProfesional(profesionalId).then(setTurnos);
    onReservado?.();
  };

  return (
    <div className="agenda">
      <h1>Reservar turno</h1>
      <p className="agenda-subtitulo">Elegí profesional, día y horario para tu sesión de terapia.</p>

      <div className="agenda-campo" style={{ maxWidth: 360 }}>
        <label htmlFor="profesional">Profesional</label>
        <select
          id="profesional"
          value={profesionalId}
          onChange={(e) => {
            setProfesionalId(e.target.value);
            setSelectedSlot(null);
          }}
        >
          <option value="">Seleccioná un profesional</option>
          {profesionales.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre} {p.apellido} ({p.especialidad})
            </option>
          ))}
        </select>
      </div>

      {mensaje && <p style={{ color: 'var(--success)', fontWeight: 600 }}>{mensaje}</p>}

      {!profesionalId && (
        <div className="empty-state">Seleccioná un profesional para ver su disponibilidad.</div>
      )}

      {profesionalId && (
        <div className="agenda-layout">
          <Calendario
            selectedDate={selectedDate}
            onSelectDate={(d) => {
              setSelectedDate(d);
              setSelectedSlot(null);
            }}
            isDayDisabled={isDayDisabled}
            hasEvento={hasEvento}
            esFeriado={esFeriado}
          />

          <div className="agenda-card">
            <h3 style={{ marginTop: 0 }}>{formatFechaLarga(selectedDate)}</h3>

            {feriadoSeleccionado && (
              <p style={{ color: 'var(--error)', fontWeight: 600 }}>
                Feriado: {feriadoSeleccionado.nombre}
              </p>
            )}

            <div className="slots-grid" style={{ marginBottom: 20 }}>
              {slotsDisponibles.length === 0 && <p>No hay horarios disponibles este día.</p>}
              {slotsDisponibles.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  className={`slot-btn${selectedSlot === slot ? ' selected' : ''}`}
                  onClick={() => setSelectedSlot(slot)}
                >
                  {slot}
                </button>
              ))}
            </div>

            {selectedSlot && (
              <>
                <div className="agenda-campo">
                  <label htmlFor="motivo">Motivo de la consulta (opcional)</label>
                  <input
                    id="motivo"
                    value={motivo}
                    onChange={(e) => setMotivo(e.target.value)}
                    placeholder="Ej: Sesión de control"
                  />
                </div>
                <button type="button" className="btn btn-primary" onClick={handleReservar}>
                  Confirmar turno {selectedSlot} hs
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservarTurno;
