import { useMemo, useState } from "react";
import { useSales } from "../../sales/hooks/useSales";

import { DashboardStats } from "../components/DashboardStats";
import { RevenueChart } from "../components/RevenueChart";
import { TopProducts } from "../components/TopProducts";
import { RecentSales } from "../components/RecentSales";

export const HomePage = () => {
  const { sales, loading } = useSales();
  const [range, setRange] = useState("7d");

  const filteredSales = useMemo(() => {
    const now = new Date();

    return sales.filter((s) => {
      const date = new Date(s.created_at);

      if (range === "7d") return now - date <= 7 * 24 * 60 * 60 * 1000;
      if (range === "30d") return now - date <= 30 * 24 * 60 * 60 * 1000;
      return true;
    });
  }, [sales, range]);

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
        {["7d", "30d", "all"].map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={`px-3 py-1 rounded ${
              range === r ? "bg-indigo-600" : "bg-slate-800"
            }`}
          >
            {r}
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