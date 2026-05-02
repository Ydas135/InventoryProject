import { topProductos, formatearMoneda } from "../../../data/mockData";
import { useMoneda } from "../../../app/context/MonedaContext";

export function TopProductsList() {
  const { moneda } = useMoneda();
  const max = Math.max(...topProductos.map((p) => p.unidades));

  return (
    <div className="card-lift surface rounded-2xl p-5">
      <div className="flex items-baseline justify-between">
        <h3 className="text-[15px] font-semibold tracking-tight">
          Productos más vendidos
        </h3>
        <button className="press text-[12px] font-medium text-accent-500 hover:text-accent-600 transition-colors">
          Ver ranking
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-3.5 stagger">
        {topProductos.map((p, i) => (
          <div key={p.id} className="flex items-center gap-3.5">
            <div
              className={`w-10 h-10 rounded-xl bg-gradient-to-br ${p.color} grid place-items-center text-white text-[13px] font-semibold shadow-sm shrink-0`}
            >
              {String(i + 1).padStart(2, "0")}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-[13.5px] font-medium truncate">{p.nombre}</p>
                <p className="text-[12.5px] font-semibold tabular-nums shrink-0">
                  {p.unidades} u.
                </p>
              </div>
              <div className="flex items-center justify-between gap-3 mt-0.5">
                <p className="text-[11.5px] text-ink-400">{p.categoria}</p>
                <p className="text-[11.5px] text-ink-400 tabular-nums">
                  {formatearMoneda(p.precio, moneda)}
                </p>
              </div>
              <div className="mt-2 h-1 rounded-full tint-medium overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${p.color}`}
                  style={{
                    width: `${(p.unidades / max) * 100}%`,
                    transition: "width 1.2s cubic-bezier(0.16,1,0.3,1)",
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
