import { Topbar } from "../../../app/layout/Topbar";
import { FileText } from "lucide-react";

export function ReportesPage() {
  return (
    <>
      <Topbar
        title="Reportes"
        subtitle="Exporta facturas, boletas, tickets y recibos por periodo"
      />
      <div className="surface rounded-2xl p-12 grid place-items-center text-center animate-fade-up">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 grid place-items-center mb-4">
          <FileText className="w-6 h-6 text-emerald-600" />
        </div>
        <h2 className="text-[18px] font-semibold tracking-tight">
          Próximamente: generación de reportes
        </h2>
        <p className="mt-1.5 text-[13px] text-ink-400 max-w-md">
          Reportes de ventas, inventario y clientes exportables a PDF y Excel,
          con filtros por periodo y método de pago.
        </p>
      </div>
    </>
  );
}
