export const RecentSales = ({ sales }) => {
  const recent = [...sales]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5);

  return (
    <div className="bg-slate-900 p-4 rounded-2xl">
      <h3 className="mb-4 font-semibold">Últimas ventas</h3>

      <div className="space-y-2 text-sm">
        {recent.map((sale) => (
          <div key={sale.id} className="flex justify-between">
            <span>{sale.products?.name}</span>
            <span>S/ {sale.total}</span>
          </div>
        ))}
      </div>
    </div>
  );
};