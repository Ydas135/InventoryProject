import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export const RevenueChart = ({ sales = [] }) => {
  const grouped = {};

  sales.forEach((s) => {
    const rawDate = new Date(s.created_at).toISOString().split("T")[0];

    if (!grouped[rawDate]) grouped[rawDate] = 0;
    grouped[rawDate] += Number(s.total);
  });

  const data = Object.entries(grouped)
    .sort(([a], [b]) => new Date(a) - new Date(b))
    .map(([date, total]) => ({
      date: new Date(date).toLocaleDateString("es-PE", {
        day: "2-digit",
        month: "short"
      }),
      total
    })
  )

  if (!sales.length) {
  return (
    <div className="bg-slate-900 p-4 rounded-2xl">
      <p className="text-slate-400">
        No hay ventas registradas
      </p>
    </div>
  );
  }

  return (
    <div className="bg-slate-900 p-4 rounded-2xl">

      <div className="mb-4">
        <h3 className="font-semibold text-lg">
          Ingresos por día
        </h3>

        <p className="text-sm text-slate-400">
          Evolución de ventas registradas
        </p>
      </div>

      <ResponsiveContainer width="100%" height={320}>

        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
          />

          <YAxis
            tickFormatter={(value) => `S/ ${value}`}
            tick={{ fontSize: 12 }}
          />

          <Tooltip
            formatter={(value) => [`S/ ${value}`, "Ingresos"]}
          />

          <Line
            type="monotone"
            dataKey="total"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />

        </LineChart>

      </ResponsiveContainer>
    </div>
  );
};