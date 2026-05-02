import { ventasPorCategoria, formatearMoneda } from "../../../data/mockData";
import { useMoneda } from "../../../app/context/MonedaContext";

const colors = [
  "bg-blue-500",
  "bg-indigo-500",
  "bg-fuchsia-500",
  "bg-amber-500",
  "bg-emerald-500",
  "bg-rose-500",
];

export function CategorySales() {
  const { moneda } = useMoneda();
  const total = ventasPorCategoria.reduce((a, b) => a + b.ventas, 0);

  return (
    <div className="card-lift surface rounded-2xl p-5">
      <div className="flex items-baseline justify-between">
        <h3 className="text-[15px] font-semibold tracking-tight">
          Ventas por categoría
        </h3>
        <p className="text-[11.5px] text-ink-400">Este mes</p>
      </div>

      {/* Stacked bar */}
      <div className="mt-4 h-2.5 w-full rounded-full overflow-hidden flex tint-soft">
        {ventasPorCategoria.map((c, i) => (
          <div
            key={c.categoria}
            className={`${colors[i]} h-full`}
            style={{
              width: `${c.porcentaje}%`,
              transition: "width 1.2s cubic-bezier(0.16,1,0.3,1)",
            }}
          />
        ))}
      </div>

      <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 stagger">
        {ventasPorCategoria.map((c, i) => (
          <li key={c.categoria} className="flex items-center gap-2.5">
            <span className={`w-2.5 h-2.5 rounded-sm ${colors[i]}`} />
            <div className="flex-1 min-w-0">
              <p className="text-[12.5px] font-medium truncate">{c.categoria}</p>
              <p className="text-[11px] text-ink-400 tabular-nums">
                {formatearMoneda(c.ventas, moneda)} · {c.porcentaje}%
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-5 pt-4 border-t border-soft flex items-baseline justify-between">
        <p className="text-[12px] text-ink-400">Total mes</p>
        <p className="text-[16px] font-semibold tabular-nums">
          {formatearMoneda(total, moneda)}
        </p>
      </div>
    </div>
  );
}
