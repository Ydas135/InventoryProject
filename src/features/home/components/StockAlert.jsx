import { AlertTriangle } from "lucide-react";
import { stockBajo } from "../../../data/mockData";

export function StockAlert() {
  return (
    <div className="card-lift surface rounded-2xl p-5">
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-amber-500/10 grid place-items-center">
          <AlertTriangle className="w-[18px] h-[18px] text-amber-600" strokeWidth={2.2} />
        </div>
        <div>
          <h3 className="text-[15px] font-semibold tracking-tight">
            Stock por reponer
          </h3>
          <p className="text-[11.5px] text-ink-400">
            {stockBajo.length} productos bajo el mínimo
          </p>
        </div>
      </div>

      <ul className="mt-4 flex flex-col gap-2 stagger">
        {stockBajo.map((s) => {
          const pct = Math.min(100, (s.stock / s.minimo) * 100);
          return (
            <li
              key={s.producto}
              className="flex items-center gap-3 p-2.5 rounded-xl hover-tint transition-colors duration-300"
            >
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium truncate">{s.producto}</p>
                <div className="mt-1.5 h-1 rounded-full tint-medium overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-500 to-rose-500"
                    style={{
                      width: `${pct}%`,
                      transition: "width 1.2s cubic-bezier(0.16,1,0.3,1)",
                    }}
                  />
                </div>
              </div>
              <p className="text-[12.5px] font-semibold tabular-nums shrink-0">
                <span className="text-rose-600">{s.stock}</span>
                <span className="text-ink-400"> / {s.minimo}</span>
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
