import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";

// El guard de autenticación lo aplica <RequireAuth> en el router,
// así que aquí solo nos ocupamos del chrome (sidebar + outlet).
export function AppLayout() {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 min-w-0 px-8 pb-12">
        <Outlet />
      </main>
    </div>
  );
}
