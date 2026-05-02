import { useMemo, useState } from "react";
import {
  ventasPorDia,
  ventasPorSemana,
  ventasPorMes,
  mesesEtiquetas,
  formatearMoneda,
} from "../../../data/mockData";
import { useMoneda } from "../../../app/context/MonedaContext";

const W = 720;
const H = 240;
const PAD_X = 32;
const PAD_Y = 28;

const periodos = {
  dia: { label: "Día", data: ventasPorDia, etiquetas: null, sufijo: "días" },
  semana: { label: "Semana", data: ventasPorSemana, etiquetas: null, sufijo: "sem." },
  mes: { label: "Mes", data: ventasPorMes, etiquetas: mesesEtiquetas, sufijo: "meses" },
};

export function SalesByPeriod() {
  const { moneda } = useMoneda();
  const [periodo, setPeriodo] = useState("mes");
  const [hoverIdx, setHoverIdx] = useState(null);

  const cfg = periodos[periodo];

  const { points, areaPath, linePath, max, total } = useMemo(() => {
    const data = cfg.data;
    const max = Math.max(...data) * 1.08;
    const min = 0;
    const stepX = (W - PAD_X * 2) / (data.length - 1);
    const points = data.map((v, i) => {
      const x = PAD_X + stepX * i;
      const y = PAD_Y + ((max - v) / (max - min)) * (H - PAD_Y * 2);
      return { x, y, v, i };
    });
    const linePath = points
      .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
      .join(" ");
    const areaPath =
      `M ${points[0].x} ${H - PAD_Y} ` +
      points.map((p) => `L ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ") +
      ` L ${points[points.length - 1].x} ${H - PAD_Y} Z`;
    const total = data.reduce((a, b) => a + b, 0);
    return { points, areaPath, linePath, max, total };
  }, [cfg]);

  const hovered = hoverIdx != null ? points[hoverIdx] : null;

  return (
    <div className="card-lift surface rounded-2xl p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[12.5px] font-medium text-ink-400">
            Ventas por {cfg.label.toLowerCase()}
          </p>
          <p className="mt-1.5 text-[26px] font-semibold tracking-tight leading-none tabular-nums">
            {formatearMoneda(total, moneda)}
          </p>
          <p className="mt-1 text-[11.5px] text-ink-400">
            Acumulado últimos {cfg.data.length} {cfg.sufijo}
          </p>
        </div>

        <div className="flex p-0.5 rounded-xl tint-medium">
          {Object.entries(periodos).map(([k, v]) => (
            <button
              key={k}
              onClick={() => setPeriodo(k)}
              className={[
                "press px-3 h-8 rounded-lg text-[12px] font-medium",
                "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                periodo === k
                  ? "bg-[var(--color-surface)] shadow-sm text-ink-900"
                  : "text-ink-400 hover:text-ink-600",
              ].join(" ")}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 relative">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-60"
          onMouseLeave={() => setHoverIdx(null)}
        >
          <defs>
            <linearGradient id="areaGradB" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#0a84ff" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#0a84ff" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* gridlines horizontales */}
          {[0.25, 0.5, 0.75, 1].map((f) => (
            <line
              key={f}
              x1={PAD_X}
              x2={W - PAD_X}
              y1={PAD_Y + (H - PAD_Y * 2) * f}
              y2={PAD_Y + (H - PAD_Y * 2) * f}
              stroke="currentColor"
              className="text-ink-900"
              strokeOpacity="0.08"
            />
          ))}

          <path d={areaPath} fill="url(#areaGradB)" />
          <path
            key={periodo}
            d={linePath}
            fill="none"
            stroke="#0a84ff"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: 3000,
              strokeDashoffset: 3000,
              animation: "draw2 1.4s cubic-bezier(0.16,1,0.3,1) forwards",
            }}
          />

          {points.map((p) => (
            <rect
              key={p.i}
              x={p.x - 16}
              y={0}
              width={32}
              height={H}
              fill="transparent"
              onMouseEnter={() => setHoverIdx(p.i)}
            />
          ))}

          {hovered && (
            <>
              <line
                x1={hovered.x}
                x2={hovered.x}
                y1={PAD_Y}
                y2={H - PAD_Y}
                stroke="#0a84ff"
                strokeOpacity="0.25"
                strokeDasharray="3 3"
              />
              <circle
                cx={hovered.x}
                cy={hovered.y}
                r="5"
                fill="var(--color-surface)"
                stroke="#0a84ff"
                strokeWidth="2.5"
              />
            </>
          )}

          {/* etiquetas eje X (sólo para meses) */}
          {cfg.etiquetas &&
            cfg.etiquetas.map((m, i) => {
              const x = PAD_X + ((W - PAD_X * 2) / (cfg.data.length - 1)) * i;
              return (
                <text
                  key={i}
                  x={x}
                  y={H - 6}
                  textAnchor="middle"
                  fontSize="10"
                  fill="currentColor"
                  className="text-ink-400"
                  fontFamily="-apple-system, system-ui"
                >
                  {m}
                </text>
              );
            })}
        </svg>

        {hovered && (
          <div
            className="absolute -translate-x-1/2 -translate-y-full pointer-events-none"
            style={{
              left: `${(hovered.x / W) * 100}%`,
              top: `${(hovered.y / H) * 100}%`,
            }}
          >
            <div className="animate-scale-in glass rounded-lg px-2.5 py-1.5 text-[11.5px] font-semibold whitespace-nowrap shadow-md mb-2 tabular-nums">
              {formatearMoneda(hovered.v, moneda)}
            </div>
          </div>
        )}
      </div>

      <style>{`@keyframes draw2 { to { stroke-dashoffset: 0; } }`}</style>
    </div>
  );
}
