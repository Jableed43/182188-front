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

/**
 * Componente standalone: la agenda del profesional. Calendario mensual con un
 * indicador en los días que tienen turnos, y debajo el detalle de los turnos
 * del día seleccionado con acciones para marcarlos como completados o
 * cancelarlos.
 *
 * Props:
 * - profesionalId (string, requerido): de qué profesional se muestra la
 *   agenda. Sin este id (string vacío), muestra un estado vacío en vez de
 *   romper — así se puede montar el componente antes de tener el id resuelto.
 *
 * A diferencia de ReservarTurno.jsx, este componente NO usa
 * getSlotsDisponibles: acá lo que importa es qué turnos YA existen ese día
 * (para gestionarlos), no qué horarios quedan libres para reservar uno nuevo.
 */
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

  // Turnos del día elegido, ordenados por hora. Los cancelados no se muestran
  // en esta lista (el profesional no necesita "gestionar" algo que ya no va a
  // pasar), pero siguen existiendo en agenda.json por si se quiere auditar.
  const turnosDelDia = useMemo(() => {
    const fechaStr = toISODate(selectedDate);
    return turnos
      .filter((t) => t.fecha === fechaStr && t.estado !== 'cancelado')
      .sort((a, b) => a.hora.localeCompare(b.hora));
  }, [turnos, selectedDate]);

  // El puntito del calendario marca "este día tiene al menos un turno activo".
  const hasEvento = (day) => {
    const fechaStr = toISODate(day);
    return turnos.some((t) => t.fecha === fechaStr && t.estado !== 'cancelado');
  };

  // Usada tanto para "Completar" como para "Cancelar" (mismo endpoint, distinto
  // valor de estado). Después de cambiar el estado, se vuelve a pedir la lista
  // completa de turnos para que la UI quede al día.
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
