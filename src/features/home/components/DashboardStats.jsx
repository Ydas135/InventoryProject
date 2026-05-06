export const DashboardStats = ({ sales }) => {
  const revenue = sales.reduce((acc, s) => acc + s.total, 0);
  const totalSales = sales.length;
  const units = sales.reduce((acc, s) => acc + s.quantity, 0);

  const avg = totalSales ? revenue / totalSales : 0;

  const Card = ({ label, value }) => (
    <div className="bg-slate-900 p-4 rounded-xl">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="text-xl font-semibold">S/ {value.toFixed(2)}</p>
    </div>
  );

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <Card label="Ingresos" value={revenue} />
      <Card label="Ventas" value={totalSales} />
      <Card label="Unidades" value={units} />
      <Card label="Ticket promedio" value={avg} />
    </div>
  );
};