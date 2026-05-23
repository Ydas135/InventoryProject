import { Outlet } from "react-router";
import { ThemeProvider } from "../context/ThemeContext";
import { MonedaProvider } from "../context/MonedaContext";
import { AuthProvider } from "../context/AuthContext";

// Providers globales montados una sola vez — disponibles tanto para el
// login como para el resto de la app.
export function RootLayout() {
  return (
    <ThemeProvider>
      <MonedaProvider>
        <AuthProvider>
          <Outlet />
        </AuthProvider>
      </MonedaProvider>
    </ThemeProvider>
  );
}
