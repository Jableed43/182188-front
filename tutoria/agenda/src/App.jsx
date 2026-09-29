import { useState } from 'react';
import ReservarTurno from './components/agenda/ReservarTurno';
import MisTurnos from './components/agenda/MisTurnos';
import GestionTurnosProfesional from './components/agenda/GestionTurnosProfesional';
import BloqueoAgenda from './components/agenda/BloqueoAgenda';

// Datos de ejemplo para probar cada componente de forma standalone.
const PACIENTE_DEMO_ID = '1';
const PROFESIONAL_DEMO_ID = '1';

const VISTAS = {
  reservar: { label: 'Reservar turno', Componente: () => <ReservarTurno pacienteId={PACIENTE_DEMO_ID} /> },
  misTurnos: { label: 'Mis turnos (paciente)', Componente: () => <MisTurnos pacienteId={PACIENTE_DEMO_ID} /> },
  gestion: { label: 'Gestión de turnos (profesional)', Componente: () => <GestionTurnosProfesional profesionalId={PROFESIONAL_DEMO_ID} /> },
  bloqueo: { label: 'Bloquear agenda (profesional)', Componente: () => <BloqueoAgenda profesionalId={PROFESIONAL_DEMO_ID} /> },
};

function App() {
  const [vista, setVista] = useState('reservar');
  const { Componente } = VISTAS[vista];

  return (
    <div>
      <nav style={{ display: 'flex', gap: 8, flexWrap: 'wrap', padding: 16, borderBottom: '1px solid #e2e8f0' }}>
        {Object.entries(VISTAS).map(([key, v]) => (
          <button
            key={key}
            type="button"
            onClick={() => setVista(key)}
            style={{
              padding: '8px 14px',
              borderRadius: 8,
              border: '1px solid #e2e8f0',
              background: vista === key ? '#4f46e5' : '#fff',
              color: vista === key ? '#fff' : '#1e293b',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            {v.label}
          </button>
        ))}
      </nav>
      <Componente />
    </div>
  );
}

export default App;
