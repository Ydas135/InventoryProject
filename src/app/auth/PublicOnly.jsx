import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";

// Guard de rutas solo para invitados (ej. /login).
// Si ya hay sesión, redirige a la ruta destino guardada (o a "/").
export function PublicOnly() {
  const { isAuthed } = useAuth();
  const location = useLocation();

  if (isAuthed) {
    const to = location.state?.from?.pathname || "/";
    return <Navigate to={to} replace />;
  }
  return <Outlet />;
}
