import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";

export const InventoryChart = ({ inventory }) => {
  const data = inventory.map((item) => ({
    name: item.products?.name || "N/A",
    stock: item.stock
  }));

  return (
    <div className="bg-slate-900 p-4 rounded-2xl">
      <h3 className="mb-4 font-semibold">Stock por producto</h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <Tooltip />
          <Bar dataKey="stock" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};