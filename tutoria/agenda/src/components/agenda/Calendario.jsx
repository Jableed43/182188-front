import { useState } from 'react';
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isBefore,
  startOfDay,
  format,
  addMonths,
} from 'date-fns';
import { formatMesAnio } from '../../utils/dateUtils';

const DIAS_CORTOS = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];

/**
 * Calendario mensual reutilizable. No tiene lógica de negocio propia (no sabe
 * qué es un turno, un bloqueo ni un feriado): todo lo decide el componente que
 * lo usa a través de las funciones que le pasa por prop. Esto es lo que permite
 * que el mismo Calendario sirva tanto para ReservarTurno.jsx (calendario del
 * paciente) como para GestionTurnosProfesional.jsx (calendario del profesional).
 *
 * Props:
 * - selectedDate (Date, requerido): el día actualmente elegido, se pinta resaltado.
 * - onSelectDate (fn(Date), requerido): se llama al hacer clic en un día habilitado.
 * - isDayDisabled (fn(Date) => bool, opcional): si devuelve true, el día no se
 *   puede clickear (además, los días pasados siempre están deshabilitados, sin
 *   necesidad de pasar esta función).
 * - hasEvento (fn(Date) => bool, opcional): si devuelve true, se dibuja un
 *   puntito debajo del número (usado hoy para "este día tiene turnos").
 * - esFeriado (fn(Date) => bool, opcional): si devuelve true, el número del día
 *   se pinta en rojo (ver agenda.css, clase .feriado). Es independiente de
 *   isDayDisabled: un feriado puede seguir teniendo horarios disponibles si el
 *   profesional decidió trabajar ese día (ver BloqueoAgenda.jsx).
 *
 * El mes que se muestra es estado interno de este componente (currentMonth):
 * al montarse arranca en el mes de selectedDate, pero después navegar con
 * ‹ / › no mueve selectedDate, solo cambia qué mes se está mirando.
 */
const Calendario = ({ selectedDate, onSelectDate, isDayDisabled, hasEvento, esFeriado }) => {
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(selectedDate));

  const startDay = startOfMonth(currentMonth).getDay();
  const days = eachDayOfInterval({ start: startOfMonth(currentMonth), end: endOfMonth(currentMonth) });

  return (
    <div className="agenda-card calendario">
      <div className="calendario-header">
        <h3>{formatMesAnio(currentMonth)}</h3>
        <div className="calendario-nav">
          <button type="button" onClick={() => setCurrentMonth((m) => addMonths(m, -1))}>‹</button>
          <button type="button" onClick={() => setCurrentMonth((m) => addMonths(m, 1))}>›</button>
        </div>
      </div>

      <div className="calendario-grid">
        {DIAS_CORTOS.map((d) => (
          <div key={d} className="calendario-dia-nombre">{d}</div>
        ))}

        {Array.from({ length: startDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {days.map((day) => {
          // Los días pasados siempre están deshabilitados (no se puede reservar
          // "ayer"), sin importar lo que diga isDayDisabled. Hoy es una excepción
          // explícita: no cuenta como "pasado".
          const isPast = isBefore(day, startOfDay(new Date())) && !isSameDay(day, new Date());
          const isSelected = isSameDay(day, selectedDate);
          const disabled = isPast || (isDayDisabled ? isDayDisabled(day) : false);
          // No se marca el día seleccionado como feriado (ya tiene su propio
          // color de fondo) para que el estado "seleccionado" siempre gane visualmente.
          const feriado = !isSelected && esFeriado?.(day);

          return (
            <button
              type="button"
              key={day.toString()}
              disabled={disabled}
              onClick={() => onSelectDate(day)}
              className={`calendario-dia${isSelected ? ' selected' : ''}${disabled ? ' disabled' : ''}${feriado ? ' feriado' : ''}`}
            >
              {format(day, 'd')}
              {!disabled && !isSelected && hasEvento?.(day) && <span className="calendario-punto" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendario;
