import { useMemo, useState } from "react";
import { ventasPorCategoria, formatearMoneda } from "../../../data/mockData";
import { useMoneda } from "../../../app/context/MonedaContext";

const colors = [
  { stroke: "#0a84ff", chip: "bg-blue-500" },
  { stroke: "#5e5ce6", chip: "bg-indigo-500" },
  { stroke: "#bf5af2", chip: "bg-fuchsia-500" },
  { stroke: "#ff9f0a", chip: "bg-amber-500" },
  { stroke: "#30d158", chip: "bg-emerald-500" },
  { stroke: "#ff453a", chip: "bg-rose-500" },
];

const SIZE = 180;
const STROKE = 22;
const R = (SIZE - STROKE) / 2;
const C = 2 * Math.PI * R;

export function CategoryDonut() {
  const { moneda } = useMoneda();
  const [hover, setHover] = useState(null);

  const total = useMemo(
    () => ventasPorCategoria.reduce((a, b) => a + b.ventas, 0),
    []
  );

  const segments = useMemo(() => {
    let acc = 0;
    return ventasPorCategoria.map((c, i) => {
      const frac = c.ventas / total;
      const dash = frac * C;
      const offset = -acc;
      acc += dash;
      return { ...c, dash, offset, color: colors[i] };
    });
  }, [total]);

  const focused = hover != null ? segments[hover] : null;

  return (
    <div className="card-lift surface rounded-2xl p-5">
      <div className="flex items-baseline justify-between">
        <div>
          <h3 className="text-[15px] font-semibold tracking-tight">
            Ventas por categoría
          </h3>
          <p className="text-[11.5px] text-ink-400 mt-0.5">Distribución del mes</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-[180px_1fr] gap-5 items-center">
        <div className="relative w-[180px] h-[180px] mx-auto">
          <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full h-full -rotate-90">
            {/* track */}
            <circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={R}
              fill="none"
              stroke="currentColor"
              className="text-ink-900"
              strokeOpacity="0.08"
              strokeWidth={STROKE}
            />
            {segments.map((s, i) => (
              <circle
                key={s.categoria}
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={R}
                fill="none"
                stroke={s.color.stroke}
                strokeWidth={STROKE}
                strokeLinecap="butt"
                strokeDasharray={`${s.dash} ${C - s.dash}`}
                strokeDashoffset={s.offset}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                style={{
                  transition: "opacity 0.3s, stroke-width 0.3s",
                  opacity: hover == null || hover === i ? 1 : 0.35,
                  cursor: "pointer",
                }}
              />
            ))}
          </svg>

          <div className="absolute inset-0 grid place-items-center pointer-events-none">
            <div className="text-center">
              <p className="text-[10.5px] font-medium uppercase tracking-wider text-ink-400">
                {focused ? focused.categoria : "Total"}
              </p>
              <p className="text-[18px] font-semibold tracking-tight tabular-nums leading-tight mt-0.5">
                {formatearMoneda(focused ? focused.ventas : total, moneda)}
              </p>
              <p className="text-[11px] text-ink-400 tabular-nums">
                {focused ? `${focused.porcentaje}%` : "del mes"}
              </p>
            </div>
          </div>
        </div>

        <ul className="flex flex-col gap-2.5 stagger">
          {segments.map((c, i) => (
            <li
              key={c.categoria}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              className="flex items-center gap-2.5 cursor-pointer transition-colors duration-300"
              style={{ opacity: hover == null || hover === i ? 1 : 0.45 }}
            >
              <span className={`w-2.5 h-2.5 rounded-sm ${c.color.chip}`} />
              <div className="flex-1 min-w-0 flex items-baseline justify-between gap-2">
                <p className="text-[12.5px] font-medium truncate">
                  {c.categoria}
                </p>
                <p className="text-[11.5px] text-ink-400 tabular-nums shrink-0">
                  {c.porcentaje}%
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
