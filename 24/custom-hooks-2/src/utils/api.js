// Vite solo expone al cliente las variables de entorno que empiezan con
// "VITE_" — cualquier otro nombre queda undefined en el navegador. Se
// definen en ".env" (local, no se sube a git) y, en producción, en el panel
// de la plataforma de hosting (Vercel → Settings → Environment Variables).
export const URL_PERSONAJES = import.meta.env.VITE_URL_PERSONAJES;
export const URL_USUARIOS = import.meta.env.VITE_URL_USUARIOS;
