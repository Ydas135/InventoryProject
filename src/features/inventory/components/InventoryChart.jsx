import { BarChart } from "@mui/x-charts/BarChart";

export const InventoryChart = ({ inventory }) => {

  const labels = inventory.map(item => item.products?.name || "Sin nombre");
  const stock = inventory.map(item => item.stock);

  return (
    <div className="bg-white p-4 rounded-xl">
      <BarChart
        xAxis={[{ scaleType: "band", data: labels }]}
        series={[{ data: stock, label: "Stock" }]}
        width={700}
        height={400}
      />
    </div>
  );
};