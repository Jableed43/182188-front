# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---

## Variables de entorno

Las URLs de la API no están escritas en el código: salen de `VITE_URL_PERSONAJES` y
`VITE_URL_USUARIOS` (ver `src/utils/api.js`). El prefijo `VITE_` es obligatorio — Vite solo expone
al navegador las variables que empiezan así; cualquier otro nombre queda `undefined` en el cliente.

- **Local:** copiar `.env.example` a `.env` (este último no se sube a git) y ajustar los valores si
  hace falta.
- **Producción (Vercel):** cargar `VITE_URL_PERSONAJES` y `VITE_URL_USUARIOS` con las URLs de
  Render en **Settings → Environment Variables**. Sin esto, el sitio deployado no tiene a quién
  pedirle los datos.

## `vercel.json`

Este archivo le dice a Vercel que redirija **cualquier ruta** (`/personajes/3`, etc.) al
`index.html`. Es necesario porque React Router arma las rutas en el navegador, con JavaScript —
el servidor de Vercel no tiene un archivo físico para `/personajes/3`, así que sin este rewrite,
entrar directo a esa URL (o apretar F5 parado ahí) tira un 404. Con el rewrite, siempre carga
`index.html` primero y React Router se encarga de mostrar la página correcta.

No lleva comentarios adentro porque JSON no los admite — esta sección del README es su
explicación.

## Cómo correr el build de producción

```bash
npm run build
```

Genera la carpeta `dist/` con los archivos ya optimizados (minificados, sin código muerto) —
es lo mismo que corre Vercel automáticamente en cada deploy, así que sirve para probar antes de
subir que no rompe nada.

Para ver ese resultado en el navegador, sin usar `npm run dev`:

```bash
npm run preview
```

Levanta un servidor local mínimo sirviendo exactamente el contenido de `dist/` (no el código
fuente) — la forma más fiel de simular cómo se va a ver en producción antes de hacer `git push`.
