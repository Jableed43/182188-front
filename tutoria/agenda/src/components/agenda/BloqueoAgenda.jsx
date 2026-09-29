import { useEffect, useState } from 'react';
import {
  getBloqueosPorProfesional,
  crearBloqueo,
  eliminarBloqueo,
  actualizarDisponibilidad,
} from '../../services/bloqueoService';
import { getProfesionales } from '../../services/turnoService';
import { DIAS_SEMANA } from '../../utils/dateUtils';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import './agenda.css';

const HORAS_POSIBLES = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];
const DIAS_LABORALES = DIAS_SEMANA.filter((d) => d !== 'Domingo').concat('Domingo');

// Componente standalone: permite bloquear días/horarios puntuales (por ejemplo,
// una cita o evento del profesional) y editar la disponibilidad semanal recurrente.
const BloqueoAgenda = ({ profesionalId }) => {
  const [profesional, setProfesional] = useState(null);
  const [disponibilidad, setDisponibilidad] = useState([]);
  const [bloqueos, setBloqueos] = useState([]);

  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [motivo, setMotivo] = useState('');

  const cargar = async () => {
    const profesionales = await getProfesionales();
    const p = profesionales.find((x) => x.id === profesionalId);
    setProfesional(p || null);
    setDisponibilidad(p?.disponibilidad || []);
    setBloqueos(await getBloqueosPorProfesional(profesionalId));
  };

  useEffect(() => {
    if (profesionalId) {
      Promise.resolve().then(cargar);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profesionalId]);

  const toggleDiaActivo = (dia) => {
    setDisponibilidad((prev) =>
      prev.map((d) => (d.dia === dia ? { ...d, activa: !d.activa, slots: !d.activa ? d.slots : [] } : d))
    );
  };

  const toggleSlot = (dia, slot) => {
    setDisponibilidad((prev) =>
      prev.map((d) => {
        if (d.dia !== dia) return d;
        const yaEsta = d.slots.includes(slot);
        const slots = yaEsta ? d.slots.filter((s) => s !== slot) : [...d.slots, slot].sort();
        return { ...d, slots };
      })
    );
  };

  const guardarDisponibilidad = async () => {
    await actualizarDisponibilidad(profesionalId, disponibilidad);
  };

  const handleCrearBloqueo = async (e) => {
    e.preventDefault();
    if (!fecha) return;
    await crearBloqueo({ profesionalId, fecha, hora: hora || null, motivo });
    setFecha('');
    setHora('');
    setMotivo('');
    setBloqueos(await getBloqueosPorProfesional(profesionalId));
  };

  const handleEliminarBloqueo = async (bloqueoId) => {
    await eliminarBloqueo(bloqueoId);
    setBloqueos(await getBloqueosPorProfesional(profesionalId));
  };

  if (!profesionalId) {
    return <div className="agenda"><div className="empty-state">Indicá un profesional para editar su agenda.</div></div>;
  }

  return (
    <div className="agenda">
      <h1>Bloqueo de agenda</h1>
      <p className="agenda-subtitulo">
        {profesional ? `${profesional.nombre} ${profesional.apellido}` : 'Cargando...'}
      </p>

      <div className="agenda-layout">
        {/* Disponibilidad semanal recurrente */}
        <div>
          <h3>Disponibilidad semanal</h3>
          {DIAS_LABORALES.map((dia) => {
            const plan = disponibilidad.find((d) => d.dia === dia) || { dia, activa: false, slots: [] };
            return (
              <div key={dia} className="dia-plan">
                <div className="dia-plan-header">
                  <input
                    type="checkbox"
                    checked={plan.activa}
                    onChange={() => toggleDiaActivo(dia)}
                    id={`chk-${dia}`}
                  />
                  <label htmlFor={`chk-${dia}`} style={{ margin: 0 }}>{dia}</label>
                </div>
                {plan.activa && (
                  <div className="dia-plan-slots">
                    {HORAS_POSIBLES.map((hora) => (
                      <button
                        type="button"
                        key={hora}
                        className={`slot-btn${plan.slots.includes(hora) ? ' selected' : ''}`}
                        onClick={() => toggleSlot(dia, hora)}
                      >
                        {hora}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          <button type="button" className="btn btn-primary" onClick={guardarDisponibilidad}>
            Guardar disponibilidad
          </button>
        </div>

        {/* Bloqueos puntuales por eventos/citas */}
        <div>
          <h3>Bloquear día u horario puntual</h3>
          <form onSubmit={handleCrearBloqueo} className="agenda-card">
            <div className="agenda-campo">
              <label htmlFor="bloqueo-fecha">Fecha</label>
              <input
                id="bloqueo-fecha"
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                required
              />
            </div>
            <div className="agenda-campo">
              <label htmlFor="bloqueo-hora">Horario (dejar vacío para bloquear el día completo)</label>
              <select id="bloqueo-hora" value={hora} onChange={(e) => setHora(e.target.value)}>
                <option value="">Día completo</option>
                {HORAS_POSIBLES.map((h) => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
            </div>
            <div className="agenda-campo">
              <label htmlFor="bloqueo-motivo">Motivo</label>
              <input
                id="bloqueo-motivo"
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                placeholder="Ej: Congreso, licencia, evento personal"
              />
            </div>
            <button type="submit" className="btn btn-primary">Bloquear</button>
          </form>

          <h4 style={{ marginTop: 24 }}>Bloqueos activos</h4>
          {bloqueos.length === 0 && <p className="agenda-subtitulo">No hay bloqueos cargados.</p>}
          {bloqueos.map((b) => (
            <div key={b.id} className="bloqueo-item">
              <div>
                <strong>{format(new Date(`${b.fecha}T00:00:00`), 'dd/MM/yyyy', { locale: es })}</strong>
                {' '}{b.hora ? `— ${b.hora} hs` : '— día completo'}
                {b.motivo && <div className="agenda-subtitulo" style={{ marginBottom: 0 }}>{b.motivo}</div>}
              </div>
              <button type="button" className="btn btn-outline" onClick={() => handleEliminarBloqueo(b.id)}>
                Quitar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BloqueoAgenda;
