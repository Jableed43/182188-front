import { useEffect, useMemo, useState } from 'react';
import Calendario from './Calendario';
import {
  getPacientes,
  getTurnosPorProfesional,
  actualizarEstadoTurno,
} from '../../services/turnoService';
import { formatFechaLarga, toISODate } from '../../utils/dateUtils';
import './agenda.css';

const nombrePaciente = (pacientes, pacienteId) => {
  const p = pacientes.find((x) => x.id === pacienteId);
  return p ? `${p.nombre} ${p.apellido}` : 'Paciente';
};

// Componente standalone: agenda del profesional para el día, con acciones
// para marcar el turno como completado o cancelarlo.
const GestionTurnosProfesional = ({ profesionalId }) => {
  const [turnos, setTurnos] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const cargarTurnos = () => getTurnosPorProfesional(profesionalId).then(setTurnos);

  useEffect(() => {
    if (!profesionalId) return;
    cargarTurnos();
    getPacientes().then(setPacientes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profesionalId]);

  const turnosDelDia = useMemo(() => {
    const fechaStr = toISODate(selectedDate);
    return turnos
      .filter((t) => t.fecha === fechaStr && t.estado !== 'cancelado')
      .sort((a, b) => a.hora.localeCompare(b.hora));
  }, [turnos, selectedDate]);

  const hasEvento = (day) => {
    const fechaStr = toISODate(day);
    return turnos.some((t) => t.fecha === fechaStr && t.estado !== 'cancelado');
  };

  const cambiarEstado = async (turnoId, estado) => {
    await actualizarEstadoTurno(turnoId, estado);
    cargarTurnos();
  };

  if (!profesionalId) {
    return <div className="agenda"><div className="empty-state">Indicá un profesional para ver su agenda.</div></div>;
  }

  return (
    <div className="agenda">
      <h1>Gestión de turnos</h1>
      <p className="agenda-subtitulo">Consultá los turnos del día y actualizá su estado.</p>

      <div className="agenda-layout">
        <Calendario selectedDate={selectedDate} onSelectDate={setSelectedDate} hasEvento={hasEvento} />

        <div>
          <h3 style={{ textTransform: 'capitalize' }}>{formatFechaLarga(selectedDate)}</h3>

          {turnosDelDia.length === 0 && (
            <div className="empty-state">No hay turnos agendados para este día.</div>
          )}

          {turnosDelDia.map((turno) => (
            <div key={turno.id} className="agenda-card turno-item">
              <div className="turno-info">
                <h4>{turno.hora} hs — {nombrePaciente(pacientes, turno.pacienteId)}</h4>
                <p>{turno.motivo || 'Sin motivo especificado'}</p>
                <span className={`badge badge-${turno.estado}`}>{turno.estado}</span>
              </div>

              {turno.estado === 'reservado' && (
                <div className="turno-acciones">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => cambiarEstado(turno.id, 'completado')}
                  >
                    Completar
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => cambiarEstado(turno.id, 'cancelado')}
                  >
                    Cancelar
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GestionTurnosProfesional;
