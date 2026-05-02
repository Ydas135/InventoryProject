import { documentosRecientes, formatearMoneda } from "../../../data/mockData";
import { useMoneda } from "../../../app/context/MonedaContext";

const tipoColor = {
  Factura: "bg-blue-500/10 text-blue-700 ring-1 ring-blue-500/20",
  Boleta: "bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-500/20",
  Ticket: "bg-amber-500/10 text-amber-700 ring-1 ring-amber-500/20",
  Recibo: "bg-fuchsia-500/10 text-fuchsia-700 ring-1 ring-fuchsia-500/20",
};

const estadoColor = {
  Pagado: "bg-emerald-500/10 text-emerald-700",
  Pendiente: "bg-amber-500/10 text-amber-700",
  Anulado: "bg-rose-500/10 text-rose-700",
};

export function RecentInvoices() {
  const { moneda } = useMoneda();

  return (
    <div className="card-lift surface rounded-2xl p-5">
      <div className="flex items-baseline justify-between">
        <h3 className="text-[15px] font-semibold tracking-tight">
          Documentos recientes
        </h3>
        <button className="press text-[12px] font-medium text-accent-500 hover:text-accent-600 transition-colors">
          Ver todos
        </button>
      </div>

      <div className="mt-4 -mx-2 overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-1.5">
          <thead>
            <tr className="text-[11px] font-medium uppercase tracking-wider text-ink-400">
              <th className="text-left px-2 pb-1">Documento</th>
              <th className="text-left px-2 pb-1">Cliente</th>
              <th className="text-left px-2 pb-1">Fecha</th>
              <th className="text-left px-2 pb-1">Método</th>
              <th className="text-right px-2 pb-1">Total</th>
              <th className="text-right px-2 pb-1">Estado</th>
            </tr>
          </thead>
          <tbody className="stagger">
            {documentosRecientes.map((d) => (
              <tr
                key={d.id}
                className="text-[13px] hover-tint transition-colors duration-200 cursor-pointer"
              >
                <td className="px-2 py-2.5 rounded-l-lg">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center px-1.5 py-0.5 rounded-md text-[10.5px] font-semibold ${tipoColor[d.tipo]}`}
                    >
                      {d.tipo}
                    </span>
                    <span className="font-mono text-[12px] text-ink-600">
                      {d.id}
                    </span>
                  </div>
                </td>
                <td className="px-2 py-2.5 font-medium">{d.cliente}</td>
                <td className="px-2 py-2.5 text-ink-400 tabular-nums">
                  {d.fecha}
                </td>
                <td className="px-2 py-2.5 text-ink-600">{d.metodo}</td>
                <td className="px-2 py-2.5 text-right font-semibold tabular-nums">
                  {formatearMoneda(d.total, moneda)}
                </td>
                <td className="px-2 py-2.5 text-right rounded-r-lg">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium ${estadoColor[d.estado]}`}
                  >
                    {d.estado}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
