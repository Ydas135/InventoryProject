import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";

export const RevenueChart = ({ sales = [] }) => {
  const grouped = {};

  sales.forEach((s) => {
    const date = new Date(s.created_at).toLocaleDateString();

    if (!grouped[date]) grouped[date] = 0;
    grouped[date] += s.total;
  });

  const data = Object.entries(grouped).map(([date, total]) => ({
    date,
    total
  }));

  if (!sales.length) {
  return (
    <div className="bg-slate-900 p-4 rounded-2xl">
      <h3 className="mb-4 font-semibold">Ingresos por día</h3>
      <p className="text-slate-400">
        No hay ventas registradas
      </p>
    </div>
  );
  }

  return (
    <div className="bg-slate-900 p-4 rounded-2xl">
      <h3 className="mb-4 font-semibold">Ingresos por día</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <Tooltip />
          <Line type="monotone" dataKey="total" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};