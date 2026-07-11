import { createBrowserRouter } from "react-router";
import { RootLayout } from "../app/layout/RootLayout";
import { AppLayout } from "../app/layout/AppLayout";
import { RequireAuth } from "../app/auth/RequireAuth";
import { PublicOnly } from "../app/auth/PublicOnly";
import { Login } from "../app/auth/Login";
import { Home } from "../app/home/Home";
import { Clientes } from "../app/Clientes/Clientes";
import { Grafico } from "../app/Grafico/Grafico";
import { Reportes } from "../app/Reportes/Reportes";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      // Rutas solo para invitados (si ya hay sesión, redirige al destino).
      {
        Component: PublicOnly,
        children: [{ path: "login", Component: Login }],
      },
      // Rutas protegidas — RequireAuth aplica antes de pintar AppLayout.
      {
        Component: RequireAuth,
        children: [
          {
            Component: AppLayout,
            children: [
              { index: true, Component: Home },
              { path: "clientes", Component: Clientes },
              { path: "graficos", Component: Grafico },
              { path: "reportes", Component: Reportes },
            ],
          },
        ],
      },
    ],
  },
]);
