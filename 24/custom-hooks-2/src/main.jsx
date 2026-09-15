import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from './pages/Layout'
import Index from './pages/Index'
import Personajes from './pages/Personajes'
import PaginaError from './pages/PaginaError'
import DetallePersonaje from './pages/DetallePersonaje'
// createBrowserRouter se encarga de armar las rutas de tu aplicacion
const mapaRutas = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    // subrutas o rutas hijas
    children: [
      // primero debo anunciar cual será la pagina inicial
      // cada element va a transformarse en Outlet
      { index: true, element: <Index/> },
      { path: "personajes", element: <Personajes/> },
      // * -> significa TODO, cualquier pagina que no esté en el ruteo sea redigida hacia la pagina de error 404
      { path: "personajes/:id", element: <DetallePersonaje/> },
      { path: "*", element: <PaginaError/> }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={mapaRutas} />
  </StrictMode>,
)
