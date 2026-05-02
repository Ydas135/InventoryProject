import { createBrowserRouter } from "react-router";
import { AppLayout } from "../app/layout/AppLayout";
import { Home } from "../app/home/Home";
import { Clientes } from "../app/Clientes/Clientes";
import { Grafico } from "../app/Grafico/Grafico";
import { Reportes } from "../app/Reportes/Reportes";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    children: [
      { index: true, Component: Home },
      { path: "clientes", Component: Clientes },
      { path: "graficos", Component: Grafico },
      { path: "reportes", Component: Reportes },
    ],
  },
]);
