import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import Index from "./pages/Index";
import Personajes from "./pages/Personajes";
import PaginaError from "./pages/PaginaError";
import DetallePersonaje from "./pages/DetallePersonaje";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Registro from "./pages/Registro";

// createBrowserRouter se encarga de armar las rutas de tu aplicacion
const mapaRutas = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    // subrutas o rutas hijas
    children: [
      // primero debo anunciar cual será la pagina inicial
      // cada element va a transformarse en Outlet
      { index: true, element: <Index /> },
      { path: "personajes", element: <Personajes /> },
      // * -> significa TODO, cualquier pagina que no esté en el ruteo sea redigida hacia la pagina de error 404
      { path: "personajes/:id", element: <DetallePersonaje /> },
      { path: "login", element: <Login /> },
      { path: "registro", element: <Registro /> },
      { path: "*", element: <PaginaError /> },
    ],
  },
]);

// ThemeProvider Envuelve a todo el router eso permite que todas las rutas accedan al contexto
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={mapaRutas} />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
);
