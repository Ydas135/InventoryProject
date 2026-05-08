import { useState } from "react";
import { Sidebar } from "../components/sidebar/Sidebar";
import { Outlet, useLocation } from "react-router";
import { Menu } from "lucide-react";

export function DashboardLayout() {
  const [open, setOpen] = useState(false);

  const titles = {
    "/": "Dashboard",
    "/inventory": "Inventory",
    "/products": "Products",
    "/sales": "Sales",
  }

  const currentTitle = titles[location.pathname] || 'Not Found';

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col lg:flex-row">
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-white/10">
        <button onClick={() => setOpen(true)}>
          <Menu className="text-white" />
        </button>

        <h1 className="text-white font-semibold">{currentTitle}</h1>
      </div>
      <Sidebar open={open} setOpen={setOpen} />
        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
    </div>
  );
}