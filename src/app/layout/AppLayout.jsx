import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";
import { MonedaProvider } from "../context/MonedaContext";
import { ThemeProvider } from "../context/ThemeContext";

export function AppLayout() {
  return (
    <ThemeProvider>
      <MonedaProvider>
        <div className="min-h-screen flex">
          <Sidebar />
          <main className="flex-1 min-w-0 px-8 pb-12">
            <Outlet />
          </main>
        </div>
      </MonedaProvider>
    </ThemeProvider>
  );
}
