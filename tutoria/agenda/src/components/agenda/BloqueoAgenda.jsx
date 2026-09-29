import { useEffect, useState } from 'react';
import {
  getBloqueosPorProfesional,
  crearBloqueo,
  eliminarBloqueo,
  actualizarDisponibilidad,
} from '../../services/bloqueoService';
import { getFeriados } from '../../services/feriadoService';
import { getProfesionales } from '../../services/turnoService';
import { DIAS_SEMANA, toISODate } from '../../utils/dateUtils';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import './agenda.css';

// Franjas horarias que se pueden tildar al armar la disponibilidad semanal o
// un bloqueo puntual. Es una lista fija y simple a propósito (no hay un
// selector de hora libre): alcanza para lo que pide este proyecto y evita
// tener que validar formatos de hora arbitrarios.
const HORAS_POSIBLES = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];
// Mismos 7 días que DIAS_SEMANA pero reordenados para que la semana laboral
// (Lunes a Sábado) se vea antes que Domingo en el formulario.
const DIAS_LABORALES = DIAS_SEMANA.filter((d) => d !== 'Domingo').concat('Domingo');

/**
 * Componente standalone: todo lo que un profesional necesita para configurar
 * cuándo NO atiende. Tiene tres partes independientes:
 *
 * 1. Disponibilidad semanal — el horario recurrente ("todos los lunes de 9 a
 *    12"), se edita acá y se guarda entero en profesional.disponibilidad.
 * 2. Feriados — la decisión de trabajar o no cada feriado cargado (ver
 *    src/services/feriadoService.js). Tildar "No quiero trabajar" crea un
 *    bloqueo de día completo con feriadoId apuntando a ese feriado; destildar
 *    lo borra. La disponibilidad semanal NO se toca por esto — es una excepción
 *    puntual, no un cambio permanente al horario recurrente.
 * 3. Bloqueos puntuales — el mecanismo general para cualquier otra excepción
 *    (una licencia, un congreso, una reunión a una hora concreta) que no sea
 *    un feriado. Los bloqueos por feriado (parte 2) también aparecen listados
 *    acá abajo, porque en el fondo son el mismo tipo de registro.
 *
 * Props:
 * - profesionalId (string, requerido): de qué profesional se edita la agenda.
 */
const BloqueoAgenda = ({ profesionalId }) => {
  const [profesional, setProfesional] = useState(null);
  const [disponibilidad, setDisponibilidad] = useState([]);
  const [bloqueos, setBloqueos] = useState([]);
  const [feriados, setFeriados] = useState([]);

  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [motivo, setMotivo] = useState('');

  // Trae todo lo que necesita esta pantalla: los datos del profesional (para
  // mostrar su nombre y precargar su disponibilidad), sus bloqueos, y los
  // feriados futuros (los pasados no tiene sentido mostrarlos para bloquear).
  // No hay un endpoint "/profesionales/:id" separado en uso acá: se trae la
  // lista completa y se busca el profesional, igual que en el resto del
  // proyecto (ver el comentario en turnoService.js sobre esta decisión).
  const cargar = async () => {
    const profesionales = await getProfesionales();
    const p = profesionales.find((x) => x.id === profesionalId);
    setProfesional(p || null);
    setDisponibilidad(p?.disponibilidad || []);
    setBloqueos(await getBloqueosPorProfesional(profesionalId));
    const hoy = toISODate(new Date());
    setFeriados((await getFeriados()).filter((f) => f.fecha >= hoy));
  };

  useEffect(() => {
    if (profesionalId) {
      // `cargar` es async y llama a varios setState; envolverlo en
      // Promise.resolve().then(...) evita que el linter de reglas de hooks se
      // queje de "no llames setState directamente dentro de un efecto" — el
      // efecto en sí sigue siendo síncrono, solo dispara la carga.
      Promise.resolve().then(cargar);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profesionalId]);

  // Prende/apaga un día entero de la disponibilidad semanal. Al apagarlo se
  // vacían sus slots (no tendría sentido guardar horarios de un día inactivo).
  // Esto solo cambia el estado local en memoria: no pega a la API hasta que
  // se aprieta "Guardar disponibilidad".
  const toggleDiaActivo = (dia) => {
    setDisponibilidad((prev) =>
      prev.map((d) => (d.dia === dia ? { ...d, activa: !d.activa, slots: !d.activa ? d.slots : [] } : d))
    );
  };

  // Agrega o quita un horario puntual dentro de un día de la disponibilidad
  // semanal. También es solo estado local hasta "Guardar disponibilidad".
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

  // Recién acá se persiste todo el array `disponibilidad` armado arriba.
  const guardarDisponibilidad = async () => {
    await actualizarDisponibilidad(profesionalId, disponibilidad);
  };

  // Alta de un bloqueo puntual desde el formulario de abajo (evento, licencia,
  // etc. — no viene de la sección de feriados, esa tiene su propio flujo).
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

  // Busca si ya existe un bloqueo generado desde la sección de feriados para
  // un feriado puntual (comparando por feriadoId, no por fecha, para no
  // confundirlo con un bloqueo puntual que el profesional haya cargado a mano
  // ese mismo día por otro motivo).
  const bloqueoDeFeriado = (feriadoId) => bloqueos.find((b) => b.feriadoId === feriadoId);

  // Alterna la decisión de un profesional sobre un feriado puntual: si ya lo
  // había bloqueado, lo desbloquea (borra ese bloqueo); si no, crea uno nuevo
  // de día completo con el motivo y el feriadoId precargados. Esta es la
  // única forma en que la app crea un bloqueo con feriadoId — el formulario
  // manual de abajo nunca lo setea.
  const toggleFeriado = async (feriado) => {
    const existente = bloqueoDeFeriado(feriado.id);
    if (existente) {
      await eliminarBloqueo(existente.id);
    } else {
      await crearBloqueo({
        profesionalId,
        fecha: feriado.fecha,
        hora: null,
        motivo: `Feriado: ${feriado.nombre}`,
        feriadoId: feriado.id,
      });
    }
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
          <h3>Feriados</h3>
          <p className="agenda-subtitulo">
            Cada profesional decide si trabaja o no un feriado. Tildá los que no vas a atender.
          </p>
          {feriados.length === 0 && <p className="agenda-subtitulo">No hay feriados cargados.</p>}
          {feriados.map((f) => {
            const bloqueado = Boolean(bloqueoDeFeriado(f.id));
            return (
              <div key={f.id} className="bloqueo-item">
                <div>
                  <strong>{format(new Date(`${f.fecha}T00:00:00`), 'dd/MM/yyyy', { locale: es })}</strong>
                  {' — '}{f.nombre}
                  <div className="agenda-subtitulo" style={{ marginBottom: 0 }}>
                    {bloqueado ? 'No vas a trabajar este día' : 'Vas a trabajar este día'}
                  </div>
                </div>
                <button
                  type="button"
                  className={bloqueado ? 'btn btn-outline' : 'btn btn-danger'}
                  onClick={() => toggleFeriado(f)}
                >
                  {bloqueado ? 'Sí quiero trabajar' : 'No quiero trabajar'}
                </button>
              </div>
            );
          })}

          <h3 style={{ marginTop: 32 }}>Bloquear día u horario puntual</h3>
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
