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

// Calendario mensual reutilizable: navega meses, marca el día seleccionado
// y permite deshabilitar/indicar días según las funciones que le pasa el padre.
const Calendario = ({ selectedDate, onSelectDate, isDayDisabled, hasEvento }) => {
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
          const isPast = isBefore(day, startOfDay(new Date())) && !isSameDay(day, new Date());
          const isSelected = isSameDay(day, selectedDate);
          const disabled = isPast || (isDayDisabled ? isDayDisabled(day) : false);

          return (
            <button
              type="button"
              key={day.toString()}
              disabled={disabled}
              onClick={() => onSelectDate(day)}
              className={`calendario-dia${isSelected ? ' selected' : ''}${disabled ? ' disabled' : ''}`}
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
