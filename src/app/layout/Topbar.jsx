import { Search, Bell } from "lucide-react";
import { useMoneda } from "../context/MonedaContext";

export function Topbar({ title, subtitle }) {
  const { moneda, setMoneda } = useMoneda();

  return (
    <header className="sticky top-0 z-10 -mx-8 px-8 py-5 mb-6 glass">
      <div className="flex items-center gap-6">
        <div className="flex-1 min-w-0">
          <h1 className="text-[22px] font-semibold tracking-tight leading-none">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[13px] text-ink-400 mt-1">{subtitle}</p>
          )}
        </div>

        {/* Search */}
        <div className="hidden md:flex items-center gap-2 px-3.5 h-10 w-72 rounded-xl tint-soft border border-soft focus-within:bg-[var(--color-surface)] focus-within:border-strong transition-all duration-300">
          <Search className="w-4 h-4 text-ink-400" />
          <input
            placeholder="Buscar productos, clientes, documentos..."
            className="flex-1 bg-transparent outline-none text-[13px] placeholder:text-ink-400"
          />
        </div>

        {/* Currency toggle */}
        <div className="flex items-center p-0.5 rounded-xl tint-medium">
          {[
            { v: "PEN", l: "S/" },
            { v: "USD", l: "US$" },
          ].map((opt) => (
            <button
              key={opt.v}
              onClick={() => setMoneda(opt.v)}
              className={[
                "press px-3 h-9 rounded-[10px] text-[12.5px] font-medium",
                "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                moneda === opt.v
                  ? "bg-[var(--color-surface)] shadow-sm text-ink-900"
                  : "text-ink-400 hover:text-ink-600",
              ].join(" ")}
            >
              {opt.l}
            </button>
          ))}
        </div>

        <button className="press relative w-10 h-10 grid place-items-center rounded-xl hover-tint transition-colors">
          <Bell className="w-[18px] h-[18px] text-ink-600" />
          <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-danger-500" />
        </button>
      </div>
    </header>
  );
}
