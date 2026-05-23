import { Package, ShieldCheck, Zap, BarChart3 } from "lucide-react";

const highlights = [
  { icon: Zap, text: "Ventas y stock en tiempo real" },
  { icon: BarChart3, text: "Reportes y gráficos al instante" },
  { icon: ShieldCheck, text: "Datos protegidos y respaldados" },
];

// Panel de marca atmosférico — auroras a la deriva, halo conico y grano.
export function LoginAside() {
  return (
    <aside className="grain relative hidden lg:flex flex-col justify-between overflow-hidden rounded-[28px] bg-zinc-950 p-12 text-zinc-100">
      {/* Auroras */}
      <div className="pointer-events-none absolute inset-0">
        <div className="blob-a absolute -left-24 -top-24 h-[26rem] w-[26rem] rounded-full bg-gradient-to-br from-indigo-600 to-blue-500 opacity-40 blur-[80px]" />
        <div className="blob-b absolute -bottom-28 -right-16 h-[24rem] w-[24rem] rounded-full bg-gradient-to-br from-fuchsia-600 to-rose-500 opacity-30 blur-[90px]" />
        <div className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 opacity-[0.07]">
          <div className="spin-slow h-full w-full rounded-full bg-[conic-gradient(from_0deg,transparent,white,transparent_60%)]" />
        </div>
      </div>

      {/* Brand */}
      <div className="relative flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/15 backdrop-blur">
          <Package className="h-5 w-5" strokeWidth={2.2} />
        </div>
        <div className="leading-tight">
          <p className="text-[15px] font-semibold tracking-tight">Inventario</p>
          <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-400">
            Tienda Tech
          </p>
        </div>
      </div>

      {/* Headline */}
      <div className="relative">
        <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.3em] text-zinc-400">
          Panel de gestión
        </p>
        <h2 className="font-display text-[2.9rem] leading-[1.05] tracking-tight">
          Tu tienda,
          <br />
          <span className="bg-gradient-to-r from-indigo-300 via-sky-200 to-fuchsia-300 bg-clip-text text-transparent">
            bajo control
          </span>
          <span className="font-display italic text-zinc-400">.</span>
        </h2>
        <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-zinc-400">
          Administra inventario, ventas y clientes desde un solo lugar, con la
          elegancia que tu negocio merece.
        </p>
      </div>

      {/* Highlights */}
      <ul className="relative flex flex-col gap-3">
        {highlights.map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-center gap-3 text-[13.5px] text-zinc-300">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-white/[0.06] ring-1 ring-white/10">
              <Icon className="h-4 w-4 text-zinc-200" strokeWidth={2} />
            </span>
            {text}
          </li>
        ))}
      </ul>
    </aside>
  );
}
