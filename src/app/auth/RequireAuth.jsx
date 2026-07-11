import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";

// Guard de rutas privadas: sin sesión, redirige a /login guardando
// la ruta destino en `state.from` para volver a ella tras autenticarse.
export function RequireAuth() {
  const { isAuthed } = useAuth();
  const location = useLocation();

  if (!isAuthed) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return <Outlet />;
}
