import { useAuth } from "../../../features/auth/hooks/useAuth";
import { useUser } from "../../../context/UserContext";
import { LayoutDashboard, Boxes, Package, ShoppingCart, BarChart3, LogOut } from "lucide-react";
import { NavLink } from "react-router";

export const Sidebar = () => {
  const { logout } = useAuth();
  const { user } = useUser();

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 ${
      isActive
        ? "bg-white/10 text-white"
        : "text-slate-400 hover:text-white hover:bg-white/5"
    }`;

  return (
    <aside className="min-h-screen w-64 bg-slate-950 border-r border-white/10 flex flex-col justify-between">

      <div className="px-5 py-6">

        <div className="flex items-center gap-3 mb-8 p-3 rounded-xl bg-white/5">

          {user ? (
            <>
              <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold">
                {user.email?.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-white font-medium">
                  {user.email}
                </span>
                <span className="text-xs text-slate-400">
                  {user.role}
                </span>
              </div>
            </>
          ) : (
            <span className="text-slate-400 text-sm">
              No user
            </span>
          )}

        </div>
        <nav className="flex flex-col gap-2">

          <NavLink to="/" className={linkClass}>
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          <NavLink to="/inventory" className={linkClass}>
            <Boxes size={18} />
            Inventory
          </NavLink>

          <NavLink to="/products" className={linkClass}>
            <Package size={18} />
            Products
          </NavLink>

          <NavLink to="/sales" className={linkClass}>
            <ShoppingCart size={18} />
            Sales
          </NavLink>

          <NavLink to="/reports" className={linkClass}>
            <BarChart3 size={18} />
            Reports
          </NavLink>

        </nav>
      </div>

      <div className="p-4">
        <button
          onClick={logout}
          className="w-full border border-red-500/50 rounded-xl p-2 text-red-500 flex items-center justify-center gap-2 hover:bg-red-500/10 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

    </aside>
  );
};