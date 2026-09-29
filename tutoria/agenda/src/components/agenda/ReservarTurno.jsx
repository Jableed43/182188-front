import { useEffect, useMemo, useState } from 'react';
import Calendario from './Calendario';
import {
  getProfesionales,
  getTurnosPorProfesional,
  reservarTurno as reservarTurnoApi,
} from '../../services/turnoService';
import { getBloqueosPorProfesional } from '../../services/bloqueoService';
import { getSlotsDisponibles } from '../../utils/slots';
import { formatFechaLarga, toISODate } from '../../utils/dateUtils';
import './agenda.css';

// Componente standalone: reserva de turno de terapia.
// Recibe el id del paciente que reserva (por ejemplo, el usuario logueado).
const ReservarTurno = ({ pacienteId, onReservado }) => {
  const [profesionales, setProfesionales] = useState([]);
  const [profesionalId, setProfesionalId] = useState('');
  const [turnos, setTurnos] = useState([]);
  const [bloqueos, setBloqueos] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [motivo, setMotivo] = useState('');
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    getProfesionales().then(setProfesionales);
  }, []);

  useEffect(() => {
    if (!profesionalId) return;
    getTurnosPorProfesional(profesionalId).then(setTurnos);
    getBloqueosPorProfesional(profesionalId).then(setBloqueos);
  }, [profesionalId]);

  const profesional = profesionales.find((p) => p.id === profesionalId);

  const slotsDisponibles = useMemo(() => {
    if (!profesional) return [];
    return getSlotsDisponibles(profesional, selectedDate, turnos, bloqueos);
  }, [profesional, selectedDate, turnos, bloqueos]);

  const isDayDisabled = (day) => {
    if (!profesional) return true;
    return getSlotsDisponibles(profesional, day, turnos, bloqueos).length === 0;
  };

  const hasEvento = (day) => {
    if (!profesional) return false;
    return getSlotsDisponibles(profesional, day, turnos, bloqueos).length > 0;
  };

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
          />

          <div className="agenda-card">
            <h3 style={{ marginTop: 0 }}>{formatFechaLarga(selectedDate)}</h3>

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
