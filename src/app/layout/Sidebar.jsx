import { NavLink, useNavigate } from "react-router";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  FileText,
  Package,
  LogOut,
} from "lucide-react";
import { ThemeSwitch } from "./ThemeSwitch";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { to: "/", label: "Inicio", icon: LayoutDashboard, end: true },
  { to: "/clientes", label: "Clientes", icon: Users },
  { to: "/graficos", label: "Gráficos", icon: BarChart3 },
  { to: "/reportes", label: "Reportes", icon: FileText },
];

export function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const nombre = user?.nombre || "Usuario";
  const iniciales = nombre
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <aside className="w-64 shrink-0 h-screen sticky top-0 px-4 py-5 flex flex-col gap-6 border-r border-soft glass">
      {/* Brand */}
      <div className="flex items-center gap-2.5 px-2">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-700 dark:from-zinc-100 dark:to-zinc-300 grid place-items-center shadow-sm">
          <Package className="w-5 h-5 text-white dark:text-zinc-900" strokeWidth={2.2} />
        </div>
        <div className="leading-tight">
          <p className="text-[15px] font-semibold tracking-tight">Inventario</p>
          <p className="text-[11px] text-ink-400">Tienda Tech</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-0.5">
        <p className="px-3 mb-2 text-[10.5px] font-medium uppercase tracking-wider text-ink-400">
          Menú
        </p>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              [
                "press group flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium",
                "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                isActive
                  ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-sm"
                  : "text-ink-600 hover-tint",
              ].join(" ")
            }
          >
            {({ isActive }) => (
              <>
                <item.icon
                  className={[
                    "w-[18px] h-[18px] transition-transform duration-300",
                    "group-hover:scale-110",
                    isActive ? "" : "text-ink-600",
                  ].join(" ")}
                  strokeWidth={2}
                />
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Theme switch (sobre el perfil) */}
      <ThemeSwitch />

      {/* Footer / user */}
      <div className="surface rounded-2xl p-3 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 grid place-items-center text-white text-[13px] font-semibold">
          {iniciales}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-medium truncate">{nombre}</p>
          <p className="text-[11px] text-ink-400 truncate">Administrador</p>
        </div>
        <button
          onClick={handleLogout}
          aria-label="Cerrar sesión"
          title="Cerrar sesión"
          className="press p-1.5 rounded-lg hover-tint transition-colors text-ink-400 hover:text-danger-500"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
