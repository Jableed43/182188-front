import { useEffect, useState } from 'react';
import {
  getProfesionales,
  getTurnosPorPaciente,
  actualizarEstadoTurno,
} from '../../services/turnoService';
import { parseFecha } from '../../utils/dateUtils';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import './agenda.css';

const nombreProfesional = (profesionales, profesionalId) => {
  const p = profesionales.find((x) => x.id === profesionalId);
  return p ? `${p.nombre} ${p.apellido} (${p.especialidad})` : 'Profesional';
};

// Componente standalone: turnos propios del paciente, con opción de cancelar.
const MisTurnos = ({ pacienteId }) => {
  const [turnos, setTurnos] = useState([]);
  const [profesionales, setProfesionales] = useState([]);

  const cargarTurnos = () => getTurnosPorPaciente(pacienteId).then(setTurnos);

  useEffect(() => {
    if (!pacienteId) return;
    cargarTurnos();
    getProfesionales().then(setProfesionales);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pacienteId]);

  const cancelarTurno = async (turnoId) => {
    await actualizarEstadoTurno(turnoId, 'cancelado');
    cargarTurnos();
  };

  const proximos = turnos
    .filter((t) => t.estado === 'reservado')
    .sort((a, b) => (a.fecha + a.hora).localeCompare(b.fecha + b.hora));

  const historial = turnos
    .filter((t) => t.estado !== 'reservado')
    .sort((a, b) => (b.fecha + b.hora).localeCompare(a.fecha + a.hora));

  return (
    <div className="agenda">
      <h1>Mis turnos</h1>
      <p className="agenda-subtitulo">Historial y estado de tus sesiones de terapia.</p>

      {turnos.length === 0 && <div className="empty-state">Todavía no tenés turnos agendados.</div>}

      {proximos.length > 0 && (
        <>
          <h3>Próximos turnos</h3>
          {proximos.map((turno) => (
            <div key={turno.id} className="agenda-card turno-item">
              <div className="turno-info">
                <h4>{format(parseFecha(turno.fecha), "d 'de' MMMM", { locale: es })} — {turno.hora} hs</h4>
                <p>{nombreProfesional(profesionales, turno.profesionalId)}</p>
                {turno.motivo && <p>Motivo: {turno.motivo}</p>}
              </div>
              <div className="turno-acciones">
                <button type="button" className="btn btn-danger" onClick={() => cancelarTurno(turno.id)}>
                  Cancelar
                </button>
              </div>
            </div>
          ))}
        </>
      )}

      {historial.length > 0 && (
        <>
          <h3>Historial</h3>
          {historial.map((turno) => (
            <div key={turno.id} className="agenda-card turno-item" style={{ opacity: 0.8 }}>
              <div className="turno-info">
                <h4>{format(parseFecha(turno.fecha), "d 'de' MMMM", { locale: es })} — {turno.hora} hs</h4>
                <p>{nombreProfesional(profesionales, turno.profesionalId)}</p>
                <span className={`badge badge-${turno.estado}`}>{turno.estado}</span>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default MisTurnos;
