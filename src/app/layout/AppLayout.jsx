import { Outlet, Navigate } from "react-router";
import { Sidebar } from "./Sidebar";
import { useAuth } from "../context/AuthContext";

export function AppLayout() {
  const { isAuthed } = useAuth();

  // Ruta protegida: sin sesión, al login.
  if (!isAuthed) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 min-w-0 px-8 pb-12">
        <Outlet />
      </main>
    </div>
  );
}
