import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

export const DIAS_SEMANA = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

export const toISODate = (date) => format(date, 'yyyy-MM-dd');

export const parseFecha = (fechaStr) => parseISO(fechaStr);

export const nombreDia = (date) => DIAS_SEMANA[date.getDay()];

export const formatFechaLarga = (date) => format(date, "eeee d 'de' MMMM", { locale: es });

export const formatMesAnio = (date) => format(date, 'MMMM yyyy', { locale: es });
