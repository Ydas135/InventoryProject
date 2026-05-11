import { useAuth } from "../../../features/auth/hooks/UseAuth";
import { useUser } from "../../../context/UserContext";
import { LayoutDashboard, Boxes, Package, ShoppingCart, BarChart3, LogOut } from "lucide-react";
import { NavLink } from "react-router";

export const Sidebar = ({ open, setOpen}) => {
  const { logout } = useAuth();
  const { user } = useUser();

  const linkClass = ({ isActive }) =>
  `relative flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 group
  ${
    isActive
      ? "text-white bg-white/10"
      : "text-slate-400 hover:text-white hover:bg-white/5"
  }`;

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      <aside
        className={`
          fixed top-0 left-0 h-full z-50
          bg-slate-950 border-r border-white/10
          w-64 transform transition-transform duration-300 ease-in-out

          ${open ? "translate-x-0" : "-translate-x-full"}

          lg:translate-x-0 lg:static lg:flex lg:flex-col lg:w-64
        `}
      >
        <div className="px-5 py-6">
          <div className="flex items-center gap-3 mb-8 p-3 rounded-xl bg-linear-to-r from-white/5 to-transparent border border-white/10">
            {user ? (
              <>
                <div className="hidden lg:flex w-10 h-10 rounded-full bg-indigo-500 items-center justify-center text-white font-semibold shadow-md">
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
              <span className="text-slate-400 text-sm">No user</span>
            )}
          </div>
          <nav className="flex flex-col gap-2 p-3">

            <NavLink to="/" className={linkClass} onClick={() => setOpen(false)}>
              {({ isActive }) => (
                <>
                  <span
                    className={`
                      absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r bg-indigo-500 transition-all
                      ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-50"}
                    `}
                  />
                  <LayoutDashboard size={18} className="opacity-80 group-hover:opacity-100"/>
                  <span>Dashboard</span>
                </>
              )}
            </NavLink>

            <NavLink to="/inventory" className={linkClass} onClick={() => setOpen(false)}>
              {({ isActive }) => (
                <>
                  <span
                    className={`
                      absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r bg-indigo-500 transition-all
                      ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-50"}
                    `}
                  />
                  <Boxes size={18} className="opacity-80 group-hover:opacity-100"/>
                  <span>Inventory</span>
                </>
              )}
            </NavLink>

            <NavLink to="/products" className={linkClass} onClick={() => setOpen(false)}>
              {({ isActive }) => (
                <>
                  <span
                    className={`
                      absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r bg-indigo-500 transition-all
                      ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-50"}
                    `}
                  />
                  <Package size={18} className="opacity-80 group-hover:opacity-100"/>
                  <span>Products</span>
                </>
              )}
            </NavLink>

            <NavLink to="/sales" className={linkClass} onClick={() => setOpen(false)}>
              {({ isActive }) => (
                <>
                  <span
                    className={`
                      absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r bg-indigo-500 transition-all
                      ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-50"}
                    `}
                  />
                  <ShoppingCart size={18} className="opacity-80 group-hover:opacity-100"/>
                  <span>Sales</span>
                </>
              )}
            </NavLink>

          </nav>
        </div>
        <div className="p-2 lg:p-4">
          <button
            onClick={logout}
            className="w-full border border-red-500/30 rounded-xl p-2 text-red-400 flex items-center justify-center gap-2 hover:bg-red-500/10 hover:border-red-500 transition-all duration-200"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};