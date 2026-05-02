import { topProductos, formatearMoneda } from "../../../data/mockData";
import { useMoneda } from "../../../app/context/MonedaContext";

export function TopProductsBar() {
  const { moneda } = useMoneda();
  const max = Math.max(...topProductos.map((p) => p.unidades));
  const ordenados = [...topProductos].sort((a, b) => b.unidades - a.unidades);

  return (
    <div className="card-lift surface rounded-2xl p-5">
      <div className="flex items-baseline justify-between">
        <div>
          <h3 className="text-[15px] font-semibold tracking-tight">
            Ranking de productos
          </h3>
          <p className="text-[11.5px] text-ink-400 mt-0.5">
            Por unidades vendidas este mes
          </p>
        </div>
      </div>

      <ul className="mt-5 flex flex-col gap-3.5 stagger">
        {ordenados.map((p, i) => {
          const pct = (p.unidades / max) * 100;
          return (
            <li key={p.id} className="flex items-center gap-3">
              <span className="w-5 text-[12px] font-semibold text-ink-400 tabular-nums text-right">
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-3 mb-1.5">
                  <p className="text-[13px] font-medium truncate">{p.nombre}</p>
                  <p className="text-[12.5px] font-semibold tabular-nums shrink-0">
                    {p.unidades} u.
                  </p>
                </div>
                <div className="h-2 rounded-full tint-medium overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${p.color}`}
                    style={{
                      width: `${pct}%`,
                      transition: "width 1.2s cubic-bezier(0.16,1,0.3,1)",
                    }}
                  />
                </div>
                <p className="mt-1 text-[11px] text-ink-400 tabular-nums">
                  {p.categoria} · {formatearMoneda(p.precio * p.unidades, moneda)} en ventas
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
