import { createContext, useContext, useState } from "react";

const MonedaContext = createContext(null);

export function MonedaProvider({ children }) {
  const [moneda, setMoneda] = useState("PEN");
  return (
    <MonedaContext.Provider value={{ moneda, setMoneda }}>
      {children}
    </MonedaContext.Provider>
  );
}

export function useMoneda() {
  const ctx = useContext(MonedaContext);
  if (!ctx) throw new Error("useMoneda debe usarse dentro de MonedaProvider");
  return ctx;
}
