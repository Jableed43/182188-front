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

**Terminal 1 — servidor de datos (json-server sobre `agenda.json`)**
```bash
npm run server
```
Queda escuchando en `http://localhost:3000`.

**Terminal 2 — frontend (Vite)**
```bash
npm run dev
```
Queda escuchando en `http://localhost:5173` (o el puerto que indique la consola).

Si abrís el front sin tener el server corriendo, los componentes van a quedar "cargando" o vacíos porque no hay API que responda.

## Archivos clave

```
agenda.json                              # "base de datos" plana: profesionales, pacientes, turnos, bloqueos
src/services/api.js                      # wrapper de fetch hacia json-server (http://localhost:3000)
src/services/turnoService.js             # altas/consultas de turnos
src/services/bloqueoService.js           # altas/consultas de bloqueos y disponibilidad semanal
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

## Cosas a tener en cuenta

- **Dos terminales siempre**: sin `npm run server` corriendo, ningún componente va a poder leer ni guardar datos.
- **`agenda.json` es el estado real**: cualquier reserva, cancelación o bloqueo que hagas desde la app se escribe directamente ahí. Si querés volver a un estado limpio, editá el archivo a mano o restaurá una copia de respaldo.
- **Puerto 3000 ocupado**: si ya tenés algo corriendo en ese puerto, cambiá `"server": "json-server --watch agenda.json --port 3000"` en `package.json` y la constante `BASE_URL` en `src/services/api.js` al mismo puerto nuevo.
- **Sin backend propio**: `json-server` expone `agenda.json` como API REST automáticamente (colecciones `profesionales`, `pacientes`, `turnos`, `bloqueos`); no hay lógica de servidor adicional.
- **Sin autenticación ni roles**: los `id` de paciente/profesional se pasan como prop desde quien use el componente (en `App.jsx` están hardcodeados como demo).
