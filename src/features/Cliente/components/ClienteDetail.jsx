import { useMemo, useState } from "react";
import { Mail, Phone, Calendar, ShoppingBag, Wallet, Package } from "lucide-react";
import {
  clientes,
  historialPorCliente,
  calcularTotales,
  formatearMoneda,
} from "../../../data/mockData";
import { useMoneda } from "../../../app/context/MonedaContext";
import { InvoiceDetail } from "./InvoiceDetail";

const tipoColor = {
  Factura: "bg-blue-500/10 text-blue-700 ring-1 ring-blue-500/20",
  Boleta: "bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-500/20",
  Ticket: "bg-amber-500/10 text-amber-700 ring-1 ring-amber-500/20",
  Recibo: "bg-fuchsia-500/10 text-fuchsia-700 ring-1 ring-fuchsia-500/20",
};

export function ClienteDetail({ id }) {
  const { moneda } = useMoneda();
  const [openDoc, setOpenDoc] = useState(null);

  const cliente = useMemo(() => clientes.find((c) => c.id === id), [id]);
  const docs = useMemo(() => historialPorCliente[id] || [], [id]);

  const stats = useMemo(() => {
    const totalGastado = docs.reduce(
      (a, d) => a + calcularTotales(d.items).total,
      0
    );
    const productosComprados = docs.reduce(
      (a, d) => a + d.items.reduce((s, it) => s + it.cantidad, 0),
      0
    );
    return { totalGastado, productosComprados, compras: docs.length };
  }, [docs]);

  if (!cliente) {
    return (
      <div className="surface rounded-2xl p-12 grid place-items-center text-center text-ink-400">
        Selecciona un cliente
      </div>
    );
  }

  return (
    <div key={id} className="flex flex-col gap-4 animate-fade-up">
      {/* Header del cliente */}
      <div className="surface rounded-2xl p-5">
        <div className="flex items-start gap-4">
          <div
            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cliente.color} grid place-items-center text-white text-[16px] font-semibold shadow-sm shrink-0`}
          >
            {cliente.nombre
              .split(" ")
              .map((p) => p[0])
              .slice(0, 2)
              .join("")}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-[18px] font-semibold tracking-tight">
                {cliente.nombre}
              </h2>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[10.5px] font-medium tint-medium text-ink-600">
                {cliente.tipo}
              </span>
            </div>
            <p className="text-[12px] text-ink-400 mt-0.5">{cliente.documento}</p>

            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[12px] text-ink-600">
              <span className="inline-flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-ink-400" /> {cliente.email}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-ink-400" />{" "}
                {cliente.telefono}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-ink-400" /> Cliente desde{" "}
                {cliente.desde}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 stagger">
        <Stat
          icon={Wallet}
          label="Total gastado"
          value={formatearMoneda(stats.totalGastado, moneda)}
          accent="from-blue-500/10 to-blue-500/0 text-blue-600"
        />
        <Stat
          icon={ShoppingBag}
          label="Compras"
          value={stats.compras}
          accent="from-emerald-500/10 to-emerald-500/0 text-emerald-600"
        />
        <Stat
          icon={Package}
          label="Productos"
          value={stats.productosComprados}
          accent="from-amber-500/10 to-amber-500/0 text-amber-600"
        />
      </div>

      {/* Historial */}
      <div className="surface rounded-2xl p-5">
        <h3 className="text-[15px] font-semibold tracking-tight">
          Historial de compras
        </h3>
        <p className="text-[11.5px] text-ink-400 mt-0.5">
          Toca un documento para ver el detalle completo
        </p>

        <ul className="mt-4 flex flex-col gap-2 stagger">
          {docs.length === 0 && (
            <li className="text-[13px] text-ink-400 text-center py-6">
              Sin compras registradas
            </li>
          )}
          {docs.map((d) => {
            const { total } = calcularTotales(d.items);
            const productos = d.items
              .map((it) => `${it.cantidad}× ${it.nombre}`)
              .join(" · ");
            return (
              <li key={d.id}>
                <button
                  onClick={() => setOpenDoc(d)}
                  className="press w-full text-left p-3 rounded-xl border border-soft hover:border-strong hover-tint transition-all duration-300"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center px-1.5 py-0.5 rounded-md text-[10.5px] font-semibold ${tipoColor[d.tipo]}`}
                      >
                        {d.tipo}
                      </span>
                      <span className="font-mono text-[12.5px] font-medium">
                        {d.id}
                      </span>
                      <span className="text-[11.5px] text-ink-400">
                        · {d.fecha}
                      </span>
                    </div>
                    <span className="text-[14px] font-semibold tabular-nums">
                      {formatearMoneda(total, moneda)}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[12px] text-ink-600 line-clamp-1">
                    {productos}
                  </p>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {openDoc && (
        <InvoiceDetail
          doc={openDoc}
          cliente={cliente}
          onClose={() => setOpenDoc(null)}
        />
      )}
    </div>
  );
}

function Stat({ icon: Icon, label, value, accent }) {
  return (
    <div className="card-lift surface rounded-2xl p-4 relative overflow-hidden">
      <div
        className={`absolute -top-10 -right-10 w-28 h-28 rounded-full bg-gradient-to-br ${accent} blur-2xl opacity-80 pointer-events-none`}
      />
      <div className="flex items-start justify-between relative">
        <div>
          <p className="text-[11.5px] font-medium text-ink-400">{label}</p>
          <p className="mt-1.5 text-[20px] font-semibold tracking-tight tabular-nums leading-none">
            {value}
          </p>
        </div>
        <div className={`w-9 h-9 rounded-xl grid place-items-center bg-gradient-to-br ${accent}`}>
          <Icon className="w-[16px] h-[16px]" strokeWidth={2} />
        </div>
      </div>
    </div>
  );
}
