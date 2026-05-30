import { useMemo, useState } from "react";
import { Search, Users, ShoppingBag, Boxes, Wallet } from "lucide-react";
import { Topbar } from "../../../app/layout/Topbar";
import { useMoneda } from "../../../app/context/MonedaContext";
import { formatearMoneda } from "../../../data/mockData";
import { listaClientesReporte } from "../reporteData";
import { ReporteClienteRow } from "../components/ReporteClienteRow";

function StatPill({ icon: Icon, label, value, accent }) {
  return (
    <div className="surface card-lift flex items-center gap-3 rounded-2xl p-3.5">
      <div className={`grid h-10 w-10 place-items-center rounded-xl ${accent}`}>
        <Icon className="h-[18px] w-[18px]" strokeWidth={2.1} />
      </div>
      <div className="min-w-0">
        <p className="text-[18px] font-semibold leading-none tracking-tight tabular-nums">
          {value}
        </p>
        <p className="mt-1 text-[11px] uppercase tracking-wide text-ink-400">{label}</p>
      </div>
    </div>
  );
}

export function ReportesPage() {
  const { moneda } = useMoneda();
  const [q, setQ] = useState("");

  const reportes = useMemo(() => listaClientesReporte(), []);

  const totales = useMemo(() => {
    return reportes.reduce(
      (a, r) => {
        a.compras += r.compras;
        a.unidades += r.unidades;
        a.ingresos += r.totalGastado;
        return a;
      },
      { compras: 0, unidades: 0, ingresos: 0 }
    );
  }, [reportes]);

  const filtrados = reportes.filter((r) => {
    const t = q.toLowerCase();
    return (
      r.nombre.toLowerCase().includes(t) ||
      r.documento.toLowerCase().includes(t) ||
      r.email.toLowerCase().includes(t)
    );
  });

  return (
    <>
      <Topbar
        title="Reportes"
        subtitle="Genera el reporte de cada cliente en PDF o Excel"
      />

      {/* Resumen */}
      <section className="grid grid-cols-2 gap-3 stagger xl:grid-cols-4">
        <StatPill
          icon={Users}
          label="Clientes"
          value={reportes.length}
          accent="bg-blue-500/10 text-blue-500"
        />
        <StatPill
          icon={ShoppingBag}
          label="Compras"
          value={totales.compras}
          accent="bg-emerald-500/10 text-emerald-600"
        />
        <StatPill
          icon={Boxes}
          label="Unidades vendidas"
          value={totales.unidades}
          accent="bg-amber-500/10 text-amber-600"
        />
        <StatPill
          icon={Wallet}
          label="Ingresos"
          value={formatearMoneda(totales.ingresos, moneda)}
          accent="bg-fuchsia-500/10 text-fuchsia-500"
        />
      </section>

      {/* Buscador */}
      <div className="mt-5 flex items-center gap-2 rounded-xl border border-soft tint-soft px-3.5 h-11 transition-all duration-300 focus-within:border-strong focus-within:bg-[var(--color-surface)] animate-fade-up">
        <Search className="h-4 w-4 text-ink-400" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar por nombre, documento o correo…"
          className="flex-1 bg-transparent text-[14px] outline-none placeholder:text-ink-400"
        />
        <span className="text-[11px] uppercase tracking-wide text-ink-400">
          {filtrados.length} {filtrados.length === 1 ? "cliente" : "clientes"}
        </span>
      </div>

      {/* Encabezado de columnas (desktop) */}
      <div className="mt-5 hidden grid-cols-[auto_minmax(0,1.4fr)_minmax(0,1.2fr)_auto_auto] gap-4 px-3.5 sm:grid">
        <span className="w-11" />
        <span className="text-[10.5px] font-medium uppercase tracking-wider text-ink-400">
          Cliente
        </span>
        <span className="text-[10.5px] font-medium uppercase tracking-wider text-ink-400">
          Contacto
        </span>
        <span className="text-[10.5px] font-medium uppercase tracking-wider text-ink-400">
          Actividad
        </span>
        <span className="justify-self-end text-[10.5px] font-medium uppercase tracking-wider text-ink-400">
          Acción
        </span>
      </div>

      {/* Lista */}
      <section className="mt-2 flex flex-col gap-2.5">
        {filtrados.map((r, i) => (
          <ReporteClienteRow key={r.id} reporte={r} index={i} />
        ))}
        {filtrados.length === 0 && (
          <div className="surface animate-fade-up grid place-items-center rounded-2xl p-12 text-center">
            <p className="text-[14px] font-medium">Sin resultados</p>
            <p className="mt-1 text-[13px] text-ink-400">
              No hay clientes que coincidan con “{q}”.
            </p>
          </div>
        )}
      </section>
    </>
  );
}
