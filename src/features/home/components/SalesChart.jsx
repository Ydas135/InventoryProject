import { useMemo, useState } from "react";
import { ventasUltimos14Dias, formatearMoneda } from "../../../data/mockData";
import { useMoneda } from "../../../app/context/MonedaContext";

const W = 560;
const H = 180;
const PAD_X = 8;
const PAD_Y = 16;

export function SalesChart() {
  const { moneda } = useMoneda();
  const [hoverIdx, setHoverIdx] = useState(null);
  const data = ventasUltimos14Dias;

  const { points, areaPath, linePath, max, min } = useMemo(() => {
    const max = Math.max(...data);
    const min = Math.min(...data) * 0.85;
    const stepX = (W - PAD_X * 2) / (data.length - 1);
    const points = data.map((v, i) => {
      const x = PAD_X + stepX * i;
      const y = PAD_Y + ((max - v) / (max - min)) * (H - PAD_Y * 2);
      return { x, y, v };
    });
    const linePath = points
      .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
      .join(" ");
    const areaPath =
      `M ${points[0].x} ${H - PAD_Y} ` +
      points.map((p) => `L ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ") +
      ` L ${points[points.length - 1].x} ${H - PAD_Y} Z`;
    return { points, areaPath, linePath, max, min };
  }, [data]);

  const total = data.reduce((a, b) => a + b, 0);
  const hovered = hoverIdx != null ? points[hoverIdx] : null;

  return (
    <div className="card-lift surface rounded-2xl p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[12.5px] font-medium text-ink-400">
            Ventas — últimos 14 días
          </p>
          <p className="mt-1.5 text-[24px] font-semibold tracking-tight leading-none">
            {formatearMoneda(total, moneda)}
          </p>
        </div>
        <div className="flex gap-1 p-0.5 rounded-lg tint-medium">
          {["Día", "Semana", "Mes"].map((p, i) => (
            <button
              key={p}
              className={[
                "press px-2.5 h-7 rounded-md text-[11.5px] font-medium transition-all duration-300",
                i === 0
                  ? "bg-[var(--color-surface)] shadow-sm text-ink-900"
                  : "text-ink-400 hover:text-ink-600",
              ].join(" ")}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 relative">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-44"
          onMouseLeave={() => setHoverIdx(null)}
        >
          <defs>
            <linearGradient id="areaGrad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#0a84ff" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#0a84ff" stopOpacity="0" />
            </linearGradient>
          </defs>

          <path d={areaPath} fill="url(#areaGrad)" />
          <path
            d={linePath}
            fill="none"
            stroke="#0a84ff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: 2000,
              strokeDashoffset: 2000,
              animation: "draw 1.4s cubic-bezier(0.16,1,0.3,1) forwards",
            }}
          />

          {/* hover hit areas */}
          {points.map((p, i) => (
            <rect
              key={i}
              x={p.x - 14}
              y={0}
              width={28}
              height={H}
              fill="transparent"
              onMouseEnter={() => setHoverIdx(i)}
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
        </svg>

        {hovered && (
          <div
            className="absolute -translate-x-1/2 -translate-y-full pointer-events-none"
            style={{
              left: `${(hovered.x / W) * 100}%`,
              top: `${(hovered.y / H) * 100}%`,
            }}
          >
            <div className="animate-scale-in glass rounded-lg px-2.5 py-1.5 text-[11.5px] font-semibold whitespace-nowrap shadow-md mb-2">
              {formatearMoneda(hovered.v, moneda)}
            </div>
          </div>
        )}
      </div>

      <style>{`@keyframes draw { to { stroke-dashoffset: 0; } }`}</style>
    </div>
  );
}
