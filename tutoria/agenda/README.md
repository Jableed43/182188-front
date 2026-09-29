# Agenda de turnos

Componentes React standalone para reservar y gestionar turnos genéricos de salud/terapia: reserva de turnos, agenda del paciente, agenda del profesional y bloqueo de días/horarios. La persistencia es un archivo plano `agenda.json`, servido como API REST por `json-server`.

## Requisitos

- Node.js 18 o superior
- npm

## Instalación

```bash
npm install
```

## Cómo correrlo

Este proyecto necesita **dos procesos corriendo en simultáneo, en dos terminales distintas**:

**Terminal 1 — servidor de datos (json-server + sincronización diaria de feriados)**
```bash
npm run server
```
Queda escuchando en `http://localhost:3000`. Este comando ya no es json-server plano: además levanta un pull automático de feriados (ver sección Feriados más abajo). Si por algún motivo no querés esa sincronización, `npm run server:plain` corre json-server solo.

**Terminal 2 — frontend (Vite)**
```bash
npm run dev
```
Queda escuchando en `http://localhost:5173` (o el puerto que indique la consola).

Si abrís el front sin tener el server corriendo, los componentes van a quedar "cargando" o vacíos porque no hay API que responda.

## Archivos clave

```
agenda.json                              # "base de datos" plana: profesionales, pacientes, turnos, bloqueos, feriados
scripts/server.js                        # levanta json-server + programa el pull diario de feriados
scripts/fetch-feriados.js                 # pull manual/on-demand de feriados (usa scripts/lib/feriados.js)
scripts/lib/feriados.js                   # lógica compartida: trae feriados de la API y los mergea en agenda.json
src/services/api.js                      # wrapper de fetch hacia json-server (http://localhost:3000)
src/services/turnoService.js             # altas/consultas de turnos
src/services/bloqueoService.js           # altas/consultas de bloqueos y disponibilidad semanal
src/services/feriadoService.js           # consulta la colección de feriados
src/utils/slots.js                       # calcula los horarios disponibles (disponibilidad - bloqueos - turnos ya tomados)
src/utils/dateUtils.js                   # helpers de fecha (date-fns)
src/components/agenda/Calendario.jsx     # calendario mensual reutilizado por los demás componentes
src/components/agenda/ReservarTurno.jsx        # componente standalone
src/components/agenda/MisTurnos.jsx            # componente standalone
src/components/agenda/GestionTurnosProfesional.jsx  # componente standalone
src/components/agenda/BloqueoAgenda.jsx        # componente standalone
src/App.jsx                              # demo con navegación entre los 4 componentes
```

## Funciones clave

- **Reservar turno** (`ReservarTurno`, prop `pacienteId`): elige profesional, día y horario libre, y confirma la reserva.
- **Mis turnos** (`MisTurnos`, prop `pacienteId`): lista los turnos del paciente (próximos + historial) y permite cancelarlos.
- **Gestión de turnos del profesional** (`GestionTurnosProfesional`, prop `profesionalId`): muestra los turnos del día seleccionado y permite marcarlos como completados o cancelarlos.
- **Bloqueo de agenda** (`BloqueoAgenda`, prop `profesionalId`): edita la disponibilidad semanal recurrente (qué días y horarios atiende) y crea bloqueos puntuales por eventos/citas (de un horario específico o el día completo).

Cada componente es independiente: se puede montar solo, en cualquier página, pasándole el `id` correspondiente por prop. No dependen entre sí para funcionar.

## Feriados

`agenda.json` tiene una colección `feriados` cargada desde la API pública de [ArgentinaDatos](https://argentinadatos.com/docs/operations/get-feriados.html). Cada registro tiene `id` (= su propia `fecha`, para que un feriado siempre pise el mismo registro y nunca se duplique ni corra el id de otro), `fecha` (yyyy-MM-dd), `tipo` y `nombre`.

**Sincronización diaria (automática)**: `npm run server` (además de levantar json-server) corre un pull de feriados apenas arranca, y después uno por día a las 03:00 (hora local de la máquina donde corre el proceso), usando siempre el año actual + el siguiente — se recalcula solo con el tiempo, no hay años hardcodeados. No hace falta ninguna terminal ni configuración extra: mientras `npm run server` esté corriendo, se mantiene al día. Si la API falla ese día (sin internet, caída, etc.) el error se loguea y los feriados ya guardados no se tocan; se reintenta en el próximo pull.

**Pull manual** (por si querés forzar una actualización sin esperar, o traer otros años):
```bash
npm run feriados:fetch
```
Por defecto trae el año actual y el siguiente; para años puntuales: `node scripts/fetch-feriados.js 2028,2029`. En ambos casos se reemplazan solo los feriados de los años pedidos, conservando el resto.

**La decisión de tomarse un feriado es de cada profesional, no automática**: en `BloqueoAgenda` aparece la lista de feriados con un botón "No quiero trabajar" por cada uno. Al tildarlo se crea un bloqueo de día completo (con `feriadoId` apuntando al feriado), igual que cualquier otro bloqueo puntual — solo que precargado con la fecha y el motivo. Si el profesional no lo bloquea, el feriado sigue mostrando horarios normalmente.

En `ReservarTurno`, los feriados se marcan en rojo en el calendario del paciente (estén bloqueados o no), y si el día seleccionado es feriado se muestra su nombre arriba de los horarios — sea que el profesional trabaje ese día o no.

## Cosas a tener en cuenta

- **Dos terminales siempre**: sin `npm run server` corriendo, ningún componente va a poder leer ni guardar datos.
- **`agenda.json` es el estado real**: cualquier reserva, cancelación o bloqueo que hagas desde la app se escribe directamente ahí. Si querés volver a un estado limpio, editá el archivo a mano o restaurá una copia de respaldo.
- **Puerto 3000 ocupado**: si ya tenés algo corriendo en ese puerto, cambiá `"server": "json-server --watch agenda.json --port 3000"` en `package.json` y la constante `BASE_URL` en `src/services/api.js` al mismo puerto nuevo.
- **Sin backend propio**: `json-server` expone `agenda.json` como API REST automáticamente (colecciones `profesionales`, `pacientes`, `turnos`, `bloqueos`); no hay lógica de servidor adicional.
- **Sin autenticación ni roles**: los `id` de paciente/profesional se pasan como prop desde quien use el componente (en `App.jsx` están hardcodeados como demo).
