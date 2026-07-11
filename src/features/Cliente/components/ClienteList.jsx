import { useState, useMemo } from "react";
import { Search, Users, Building2, User } from "lucide-react";
import { clientes, historialPorCliente, calcularTotales } from "../../../data/mockData";

const FILTROS = [
  { v: "todos", label: "Todos", icon: Users },
  { v: "Empresa", label: "Empresas", icon: Building2 },
  { v: "Persona", label: "Personas", icon: User },
];

export function ClienteList({ selectedId, onSelect }) {
  const [q, setQ] = useState("");
  const [tipo, setTipo] = useState("todos");

  const enriched = useMemo(
    () =>
      clientes.map((c) => {
        const docs = historialPorCliente[c.id] || [];
        const totalGastado = docs.reduce(
          (a, d) => a + calcularTotales(d.items).total,
          0
        );
        return { ...c, compras: docs.length, totalGastado };
      }),
    []
  );

  const filtered = enriched.filter((c) => {
    const coincideTexto =
      c.nombre.toLowerCase().includes(q.toLowerCase()) ||
      c.documento.toLowerCase().includes(q.toLowerCase());
    const coincideTipo = tipo === "todos" || c.tipo === tipo;
    return coincideTexto && coincideTipo;
  });

  return (
    <div className="surface rounded-2xl p-4 h-full flex flex-col">
      <div className="flex items-center gap-2 px-3 h-10 rounded-xl tint-soft border border-soft focus-within:bg-[var(--color-surface)] focus-within:border-strong transition-all duration-300">
        <Search className="w-4 h-4 text-ink-400" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar cliente..."
          className="flex-1 bg-transparent outline-none text-[13px] placeholder:text-ink-400"
        />
      </div>

      {/* Filtro por tipo */}
      <div className="mt-2 flex items-center p-0.5 rounded-xl tint-medium">
        {FILTROS.map((f) => {
          const active = tipo === f.v;
          return (
            <button
              key={f.v}
              onClick={() => setTipo(f.v)}
              className={[
                "press flex-1 flex items-center justify-center gap-1.5 h-8 rounded-[10px] text-[12px] font-medium",
                "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                active
                  ? "bg-[var(--color-surface)] shadow-sm text-ink-900"
                  : "text-ink-400 hover:text-ink-600",
              ].join(" ")}
            >
              <f.icon className="w-3.5 h-3.5" strokeWidth={2.1} />
              {f.label}
            </button>
          );
        })}
      </div>

      <p className="mt-4 px-1 text-[11px] font-medium uppercase tracking-wider text-ink-400">
        {filtered.length} {filtered.length === 1 ? "cliente" : "clientes"}
      </p>

      <ul className="mt-2 flex flex-col gap-1 overflow-y-auto stagger">
        {filtered.map((c) => {
          const active = c.id === selectedId;
          return (
            <li key={c.id}>
              <button
                onClick={() => onSelect(c.id)}
                className={[
                  "press w-full text-left flex items-center gap-3 p-2.5 rounded-xl",
                  "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  active
                    ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-sm"
                    : "hover-tint",
                ].join(" ")}
              >
                <div
                  className={`w-9 h-9 shrink-0 rounded-xl bg-gradient-to-br ${c.color} grid place-items-center text-white text-[12px] font-semibold shadow-sm`}
                >
                  {c.nombre
                    .split(" ")
                    .map((p) => p[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium truncate">
                    {c.nombre}
                  </p>
                  <p
                    className={[
                      "text-[11px] truncate",
                      active ? "text-white/70 dark:text-zinc-900/60" : "text-ink-400",
                    ].join(" ")}
                  >
                    {c.compras} compras
                  </p>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
