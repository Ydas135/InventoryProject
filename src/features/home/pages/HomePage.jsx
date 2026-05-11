import { useMemo, useState } from "react";
import { useSales } from "../../sales/hooks/useSales";

import { DashboardStats } from "../components/DashboardStats";
import { RevenueChart } from "../components/RevenueChart";
import { TopProducts } from "../components/TopProducts";
import { RecentSales } from "../components/RecentSales";
import { Label } from "recharts";

export const HomePage = () => {
  const { sales, loading } = useSales();
  const [range, setRange] = useState("7d");

  const filteredSales = useMemo(() => {
    const now = new Date();

    return sales.filter((sales) => {
      const date = new Date(sales.created_at);

      const diff = 
        (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);

      if (range == "today") {
        return diff <= 1;
      }

      if (range == "7d") {
        return diff <= 7;
      }

      return true;
  })
}, [sales, range])

  if (loading) {
    return (
      <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-24 bg-slate-800 animate-pulse rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="text-white p-4 sm:p-6 space-y-6">

      <DashboardStats sales={filteredSales} />

      <div className="flex gap-2">
        {[
          { Label: "Hoy", value:"today"},
          { Label: "7 dias", value:"30d"}
        ].map((r) => (
          <button
            key={r.value}
            onClick={() => setRange(r.value)}
            className={`px-3 py-1 rounded-lg transition ${
              range === r.value ? "bg-indigo-600" : "bg-slate-800 hover:bg-slate-700"
            }`}
          >
            {r.Label}
          </button>
        ))}
      </div>

      <RevenueChart sales={filteredSales} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <TopProducts sales={filteredSales} />

        <RecentSales sales={filteredSales} />
      </div>
    </div>
  );
};