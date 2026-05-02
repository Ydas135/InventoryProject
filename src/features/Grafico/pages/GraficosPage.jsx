import { Topbar } from "../../../app/layout/Topbar";
import { SalesByPeriod } from "../components/SalesByPeriod";
import { TopProductsBar } from "../components/TopProductsBar";
import { CategoryDonut } from "../components/CategoryDonut";
import { TopClientesChart } from "../components/TopClientesChart";

export function GraficosPage() {
  return (
    <>
      <Topbar
        title="Gráficos"
        subtitle="Ventas por periodo, ranking de productos, categorías y clientes"
      />

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 animate-fade-up" style={{ animationDelay: "0.05s" }}>
          <SalesByPeriod />
        </div>
        <div className="animate-fade-up" style={{ animationDelay: "0.15s" }}>
          <CategoryDonut />
        </div>
      </section>

      <section className="mt-4 grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="animate-fade-up" style={{ animationDelay: "0.25s" }}>
          <TopProductsBar />
        </div>
        <div className="animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <TopClientesChart />
        </div>
      </section>
    </>
  );
}
