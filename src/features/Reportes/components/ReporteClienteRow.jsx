import { useState, useRef, useEffect } from "react";
import {
  FileText,
  FileSpreadsheet,
  FileDown,
  ChevronDown,
  Loader2,
  Mail,
  Phone,
  ShoppingBag,
  Boxes,
} from "lucide-react";
import { useMoneda } from "../../../app/context/MonedaContext";
import { formatearMoneda } from "../../../data/mockData";
import { generarReportePDF, generarReporteExcel } from "../reporteGenerators";

export function ReporteClienteRow({ reporte, index }) {
  const { moneda } = useMoneda();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(null); // "pdf" | "excel" | null
  const menuRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const handleGenerar = async (formato) => {
    setBusy(formato);
    setOpen(false);
    try {
      // pequeño respiro para que el spinner sea visible
      await new Promise((r) => setTimeout(r, 350));
      if (formato === "pdf") generarReportePDF(reporte, moneda);
      else generarReporteExcel(reporte, moneda);
    } finally {
      setBusy(null);
    }
  };

  const iniciales = reporte.nombre
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

  return (
    <div
      className={[
        "card-lift surface animate-fade-up relative grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-2xl p-3.5",
        "sm:grid-cols-[auto_minmax(0,1.4fr)_minmax(0,1.2fr)_auto_auto]",
        open ? "z-30" : "z-0",
      ].join(" ")}
      style={{ animationDelay: `${0.05 * index + 0.1}s` }}
    >
      {/* Avatar + nombre */}
      <div
        className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${reporte.color ?? "from-zinc-600 to-zinc-800"} text-[13px] font-semibold text-white shadow-sm`}
      >
        {iniciales}
      </div>

      <div className="min-w-0">
        <p className="truncate text-[14px] font-semibold tracking-tight">
          {reporte.nombre}
        </p>
        <p className="text-[11.5px] text-ink-400">
          {reporte.id} · {reporte.documento}
        </p>
      </div>

      {/* Contacto (oculto en móvil) */}
      <div className="hidden min-w-0 flex-col gap-0.5 sm:flex">
        <span className="flex items-center gap-1.5 truncate text-[12px] text-ink-600">
          <Mail className="h-3.5 w-3.5 shrink-0 text-ink-400" />
          {reporte.email}
        </span>
        <span className="flex items-center gap-1.5 truncate text-[12px] text-ink-600">
          <Phone className="h-3.5 w-3.5 shrink-0 text-ink-400" />
          {reporte.telefono}
        </span>
      </div>

      {/* Métricas (oculto en móvil) */}
      <div className="hidden items-center gap-4 sm:flex">
        <div className="text-center">
          <p className="flex items-center gap-1 text-[15px] font-semibold tabular-nums">
            <ShoppingBag className="h-3.5 w-3.5 text-ink-400" />
            {reporte.compras}
          </p>
          <p className="text-[10.5px] uppercase tracking-wide text-ink-400">compras</p>
        </div>
        <div className="text-center">
          <p className="flex items-center gap-1 text-[15px] font-semibold tabular-nums">
            <Boxes className="h-3.5 w-3.5 text-ink-400" />
            {reporte.productos.length}
          </p>
          <p className="text-[10.5px] uppercase tracking-wide text-ink-400">productos</p>
        </div>
      </div>

      {/* Botón Generar reporte */}
      <div className="relative justify-self-end" ref={menuRef}>
        <button
          onClick={() => setOpen((o) => !o)}
          disabled={!!busy}
          className="press flex h-10 items-center gap-2 rounded-xl bg-zinc-900 px-3.5 text-[13px] font-medium text-white shadow-sm transition-all duration-300 hover:shadow-md disabled:opacity-70 dark:bg-zinc-100 dark:text-zinc-900"
        >
          {busy ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <FileDown className="h-4 w-4" />
          )}
          <span className="hidden md:inline">
            {busy === "pdf" ? "Generando PDF…" : busy === "excel" ? "Generando Excel…" : "Generar reporte"}
          </span>
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          />
        </button>

        {/* Menú de formato */}
        {open && (
          <div className="animate-scale-in surface absolute right-0 top-12 z-20 w-44 origin-top-right overflow-hidden rounded-2xl p-1.5 shadow-xl">
            <button
              onClick={() => handleGenerar("pdf")}
              className="press flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] font-medium transition-colors hover-tint"
            >
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-rose-500/10 text-rose-500">
                <FileText className="h-4 w-4" />
              </span>
              Reporte PDF
            </button>
            <button
              onClick={() => handleGenerar("excel")}
              className="press flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] font-medium transition-colors hover-tint"
            >
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-500/10 text-emerald-600">
                <FileSpreadsheet className="h-4 w-4" />
              </span>
              Reporte Excel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
