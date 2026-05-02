import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export function MetricCard({ icon: Icon, label, value, sub, delta, accent = "blue" }) {
  const positivo = delta == null ? null : delta >= 0;
  const accents = {
    blue: "from-blue-500/10 to-blue-500/0 text-blue-600",
    emerald: "from-emerald-500/10 to-emerald-500/0 text-emerald-600",
    amber: "from-amber-500/10 to-amber-500/0 text-amber-600",
    fuchsia: "from-fuchsia-500/10 to-fuchsia-500/0 text-fuchsia-600",
    zinc: "from-zinc-500/10 to-zinc-500/0 text-zinc-700",
  };

  return (
    <div className="card-lift surface rounded-2xl p-5 relative overflow-hidden">
      <div
        className={`absolute -top-12 -right-12 w-40 h-40 rounded-full bg-gradient-to-br ${accents[accent]} blur-2xl opacity-80 pointer-events-none`}
      />

      <div className="flex items-start justify-between relative">
        <div>
          <p className="text-[12.5px] font-medium text-ink-400">{label}</p>
          <p className="mt-2 text-[26px] font-semibold tracking-tight leading-none">
            {value}
          </p>
          {sub && (
            <p className="mt-1.5 text-[12px] text-ink-400">{sub}</p>
          )}
        </div>
        <div className={`w-10 h-10 rounded-xl grid place-items-center bg-gradient-to-br ${accents[accent]}`}>
          <Icon className="w-[18px] h-[18px]" strokeWidth={2} />
        </div>
      </div>

      {delta != null && (
        <div className="mt-4 flex items-center gap-1.5">
          <span
            className={[
              "inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[11.5px] font-semibold",
              positivo
                ? "bg-emerald-500/10 text-emerald-600"
                : "bg-rose-500/10 text-rose-600",
            ].join(" ")}
          >
            {positivo ? (
              <ArrowUpRight className="w-3 h-3" />
            ) : (
              <ArrowDownRight className="w-3 h-3" />
            )}
            {Math.abs(delta).toFixed(1)}%
          </span>
          <span className="text-[11.5px] text-ink-400">vs. semana anterior</span>
        </div>
      )}
    </div>
  );
}
