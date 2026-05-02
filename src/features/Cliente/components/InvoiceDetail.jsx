import { X, Printer, Download } from "lucide-react";
import { useEffect } from "react";
import { calcularTotales, formatearMoneda } from "../../../data/mockData";
import { useMoneda } from "../../../app/context/MonedaContext";

const tipoColor = {
  Factura: "bg-blue-500/10 text-blue-700 ring-1 ring-blue-500/20",
  Boleta: "bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-500/20",
  Ticket: "bg-amber-500/10 text-amber-700 ring-1 ring-amber-500/20",
  Recibo: "bg-fuchsia-500/10 text-fuchsia-700 ring-1 ring-fuchsia-500/20",
};

export function InvoiceDetail({ doc, cliente, onClose }) {
  const { moneda } = useMoneda();

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!doc) return null;

  const { subtotal, igv, total } = calcularTotales(doc.items);

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center p-6 animate-fade-in"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-xl surface rounded-2xl shadow-xl animate-scale-in overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-soft">
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center px-1.5 py-0.5 rounded-md text-[10.5px] font-semibold ${tipoColor[doc.tipo]}`}
              >
                {doc.tipo}
              </span>
              <span className="font-mono text-[13px] font-semibold">
                {doc.id}
              </span>
            </div>
            <p className="mt-1 text-[12px] text-ink-400">{doc.fecha}</p>
          </div>
          <div className="flex items-center gap-1">
            <button className="press w-9 h-9 grid place-items-center rounded-lg hover-tint transition-colors">
              <Printer className="w-[16px] h-[16px] text-ink-600" />
            </button>
            <button className="press w-9 h-9 grid place-items-center rounded-lg hover-tint transition-colors">
              <Download className="w-[16px] h-[16px] text-ink-600" />
            </button>
            <button
              onClick={onClose}
              className="press w-9 h-9 grid place-items-center rounded-lg hover-tint transition-colors"
            >
              <X className="w-[16px] h-[16px] text-ink-600" />
            </button>
          </div>
        </div>

        {/* Cliente */}
        <div className="px-5 py-4 border-b border-soft">
          <p className="text-[10.5px] font-medium uppercase tracking-wider text-ink-400">
            Cliente
          </p>
          <p className="mt-1 text-[14px] font-semibold">{cliente.nombre}</p>
          <p className="text-[12px] text-ink-400">
            {cliente.documento} · {cliente.email}
          </p>
        </div>

        {/* Items */}
        <div className="px-5 py-4">
          <p className="text-[10.5px] font-medium uppercase tracking-wider text-ink-400 mb-2">
            Productos
          </p>
          <ul className="flex flex-col gap-2">
            {doc.items.map((it, i) => (
              <li
                key={i}
                className="flex items-center justify-between gap-3 text-[13px]"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{it.nombre}</p>
                  <p className="text-[11.5px] text-ink-400 tabular-nums">
                    {it.cantidad} × {formatearMoneda(it.precio, moneda)}
                  </p>
                </div>
                <p className="font-semibold tabular-nums">
                  {formatearMoneda(it.cantidad * it.precio, moneda)}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Totales */}
        <div className="px-5 py-4 border-t border-soft tint-soft">
          <div className="flex justify-between text-[12.5px] text-ink-600">
            <span>Subtotal</span>
            <span className="tabular-nums">
              {formatearMoneda(subtotal, moneda)}
            </span>
          </div>
          <div className="flex justify-between text-[12.5px] text-ink-600 mt-1">
            <span>IGV (18%)</span>
            <span className="tabular-nums">{formatearMoneda(igv, moneda)}</span>
          </div>
          <div className="flex justify-between mt-3 pt-3 border-t border-soft">
            <span className="text-[14px] font-semibold">Total</span>
            <span className="text-[18px] font-semibold tabular-nums">
              {formatearMoneda(total, moneda)}
            </span>
          </div>
          <div className="flex justify-between mt-3 text-[11.5px] text-ink-400">
            <span>Método de pago</span>
            <span className="font-medium text-ink-600">{doc.metodo}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
