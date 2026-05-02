import { topClientes, formatearMoneda } from "../../../data/mockData";
import { useMoneda } from "../../../app/context/MonedaContext";

export function TopClientesChart() {
  const { moneda } = useMoneda();
  const ordenados = [...topClientes].sort((a, b) => b.compras - a.compras);
  const max = Math.max(...ordenados.map((c) => c.compras));

  return (
    <div className="card-lift surface rounded-2xl p-5">
      <div className="flex items-baseline justify-between">
        <div>
          <h3 className="text-[15px] font-semibold tracking-tight">
            Clientes que más compran
          </h3>
          <p className="text-[11.5px] text-ink-400 mt-0.5">Por monto acumulado</p>
        </div>
      </div>

      <ul className="mt-5 flex flex-col gap-3.5 stagger">
        {ordenados.map((c, i) => {
          const pct = (c.compras / max) * 100;
          return (
            <li key={c.id} className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-xl bg-gradient-to-br ${c.color} grid place-items-center text-white text-[12px] font-semibold shadow-sm shrink-0`}
              >
                {c.nombre
                  .split(" ")
                  .map((p) => p[0])
                  .slice(0, 2)
                  .join("")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-3 mb-1.5">
                  <p className="text-[13px] font-medium truncate">{c.nombre}</p>
                  <p className="text-[12.5px] font-semibold tabular-nums shrink-0">
                    {formatearMoneda(c.compras, moneda)}
                  </p>
                </div>
                <div className="h-2 rounded-full tint-medium overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${c.color}`}
                    style={{
                      width: `${pct}%`,
                      transition: "width 1.2s cubic-bezier(0.16,1,0.3,1)",
                    }}
                  />
                </div>
              </div>
              <span className="text-[11px] text-ink-400 tabular-nums shrink-0">
                #{i + 1}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
