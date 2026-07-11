import { Search, Calendar, X } from "lucide-react";

function DateField({ label, value, onChange }) {
  return (
    <label className="flex items-center gap-2 px-3 h-10 rounded-xl tint-soft border border-soft focus-within:bg-[var(--color-surface)] focus-within:border-strong transition-all duration-300">
      <Calendar className="w-4 h-4 text-ink-400" />
      <span className="text-[11px] font-medium uppercase tracking-wider text-ink-400">
        {label}
      </span>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent outline-none text-[12.5px] text-ink-900 tabular-nums"
      />
    </label>
  );
}

export function VentasFilterBar({ q, setQ, desde, setDesde, hasta, setHasta }) {
  const activo = q || desde || hasta;
  const limpiar = () => {
    setQ("");
    setDesde("");
    setHasta("");
  };

  return (
    <div className="surface rounded-2xl p-2.5 flex flex-col lg:flex-row gap-2 animate-fade-up">
      <div className="flex-1 flex items-center gap-2 px-3 h-10 rounded-xl tint-soft border border-soft focus-within:bg-[var(--color-surface)] focus-within:border-strong transition-all duration-300">
        <Search className="w-4 h-4 text-ink-400" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar ventas por cliente o documento..."
          className="flex-1 bg-transparent outline-none text-[13px] placeholder:text-ink-400"
        />
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <DateField label="Desde" value={desde} onChange={setDesde} />
        <DateField label="Hasta" value={hasta} onChange={setHasta} />
        {activo && (
          <button
            onClick={limpiar}
            className="press h-10 px-3 rounded-xl hover-tint text-[12px] font-medium text-ink-600 flex items-center gap-1.5 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            Limpiar
          </button>
        )}
      </div>
    </div>
  );
}
