import {
  Wallet,
  TrendingUp,
  ShoppingBag,
  UserPlus,
  Boxes,
} from "lucide-react";
import { Topbar } from "../../../app/layout/Topbar";
import { MetricCard } from "../components/MetricCard";
import { SalesChart } from "../components/SalesChart";
import { TopProductsList } from "../components/TopProductsList";
import { RecentInvoices } from "../components/RecentInvoices";
import { CategorySales } from "../components/CategorySales";
import { StockAlert } from "../components/StockAlert";
import { useMoneda } from "../../../app/context/MonedaContext";
import { metricasHome, formatearMoneda } from "../../../data/mockData";

export function HomePage() {
  const { moneda } = useMoneda();
  const m = metricasHome;

  return (
    <>
      <Topbar
        title="Resumen"
        subtitle="Vista general de tu tienda · viernes 1 de mayo, 2026"
      />

      {/* Métricas */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 stagger">
        <MetricCard
          icon={Wallet}
          label="Ingresos del día"
          value={formatearMoneda(m.ingresosDia, moneda)}
          delta={m.ingresosDiaDelta}
          accent="blue"
        />
        <MetricCard
          icon={TrendingUp}
          label="Ingresos del mes"
          value={formatearMoneda(m.ingresosMes, moneda)}
          delta={m.ingresosMesDelta}
          accent="emerald"
        />
        <MetricCard
          icon={ShoppingBag}
          label="Ventas hoy"
          value={m.numeroVentas}
          sub="Tickets emitidos"
          delta={m.numeroVentasDelta}
          accent="amber"
        />
        <MetricCard
          icon={UserPlus}
          label="Clientes nuevos"
          value={m.clientesNuevos}
          sub="Este mes"
          delta={m.clientesNuevosDelta}
          accent="fuchsia"
        />
        <MetricCard
          icon={Boxes}
          label="Stock disponible"
          value={m.stockDisponible.toLocaleString("es-PE")}
          sub="Unidades totales"
          delta={m.stockDisponibleDelta}
          accent="zinc"
        />
      </section>

      {/* Charts row */}
      <section className="mt-5 grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 animate-fade-up" style={{ animationDelay: "0.4s" }}>
          <SalesChart />
        </div>
        <div className="animate-fade-up" style={{ animationDelay: "0.5s" }}>
          <CategorySales />
        </div>
      </section>

      {/* Bottom row */}
      <section className="mt-5 grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 animate-fade-up" style={{ animationDelay: "0.55s" }}>
          <RecentInvoices />
        </div>
        <div className="flex flex-col gap-4">
          <div className="animate-fade-up" style={{ animationDelay: "0.6s" }}>
            <TopProductsList />
          </div>
          <div className="animate-fade-up" style={{ animationDelay: "0.65s" }}>
            <StockAlert />
          </div>
        </div>
      </section>
    </>
  );
}
