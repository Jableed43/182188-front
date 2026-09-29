// Helpers de fecha compartidos por todos los componentes de agenda. Envuelven
// date-fns para que el resto del código no tenga que decidir cada vez cómo
// formatear o parsear una fecha.
//
// Convención importante del proyecto: toda fecha que viaja a/desde agenda.json
// es un string "yyyy-MM-dd" en hora LOCAL, sin componente de hora ni zona
// horaria (nunca un ISO datetime completo con "Z"). `toISODate` y `parseFecha`
// son las dos puntas de esa conversión y están pensadas para ser simétricas:
// toISODate(parseFecha(x)) === x. Si en algún punto del código aparece un
// `new Date(unString)` sin pasar por estas funciones, hay que revisar que siga
// esa misma convención (ver la explicación completa que se dio en el chat sobre
// por qué esto evita el bug clásico de "un día de diferencia" de JS con UTC).
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

// Mismo orden que Date.prototype.getDay() (0 = domingo), y con la primera
// letra en mayúscula para que coincida con las claves usadas en
// profesional.disponibilidad (ver scripts/server.js / bloqueoService.js).
export const DIAS_SEMANA = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

// Date → "yyyy-MM-dd" (el formato en el que se guarda `fecha` en turnos,
// bloqueos y feriados). Usa la fecha local del navegador que ejecuta esto.
export const toISODate = (date) => format(date, 'yyyy-MM-dd');

// "yyyy-MM-dd" → Date, interpretado como medianoche LOCAL (no UTC). Por eso se
// usa parseISO de date-fns en vez de `new Date(fechaStr)`: el constructor nativo
// de Date interpreta un string de solo fecha como UTC, lo que puede mostrar el
// día anterior según la zona horaria de quien lo mira. parseISO no tiene ese problema.
export const parseFecha = (fechaStr) => parseISO(fechaStr);

// Nombre del día de la semana de una fecha, tal como aparece en DIAS_SEMANA.
export const nombreDia = (date) => DIAS_SEMANA[date.getDay()];

// "lunes 28 de septiembre" — se usa como subtítulo del día seleccionado.
export const formatFechaLarga = (date) => format(date, "eeee d 'de' MMMM", { locale: es });

// "septiembre 2026" — encabezado del calendario mensual.
export const formatMesAnio = (date) => format(date, 'MMMM yyyy', { locale: es });
