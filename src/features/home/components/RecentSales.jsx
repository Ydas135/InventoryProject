export const RecentSales = ({ sales }) => {
  const recent = [...sales]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5);

  if (!recent.length) {
    return (
      <div className="bg-slate-900 p-4 rounded-2xl">
        <p className="text-slate-400">No hay ventas registradas</p>
      </div>
    )
  }

  return (
    <div className="bg-slate-900 p-4 rounded-2xl">
      <div className="mb-4">
        <h3 className="font-semibold text-lg">
          Últimas ventas
        </h3>
        <p className="text-sm text-slate-400">
          Actividad reciente del sistema
        </p>
      </div>
      <div className="space-y-3">
        {recent.map((sale) => (
          <div key={sale.id} className="flex justify-between items-center bg-slate-800/50 p-3 rounded-xl">
            <div>
              <p className="font-medium">
                {sale.products?.name || "Producto"}
              </p>
              <p className="text-xs text-slate-400">
                {new Date(
                  sale.created_at
                ).toLocaleDateString("es-PE", {
                  day:"2-digit",
                  month:"short"
                })}
              </p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-green-400">
                S/ {Number(sale.total).toFixed(2)}
              </p>
              <p className="text-xs text-slate-400">
                {sale.quantity} unidades
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};