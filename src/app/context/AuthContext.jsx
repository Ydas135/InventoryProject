import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);
const STORAGE_KEY = "inv.auth";

function getInitialUser() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getInitialUser);

  // Demo auth: acepta cualquier email/clave no vacíos. Sustituible por
  // una llamada real a la API sin tocar los consumidores.
  const login = async ({ email }) => {
    await new Promise((r) => setTimeout(r, 900)); // simula latencia de red
    const nombre = email.split("@")[0] || "Usuario";
    const session = {
      email,
      nombre: nombre.charAt(0).toUpperCase() + nombre.slice(1),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    setUser(session);
    return session;
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthed: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}
