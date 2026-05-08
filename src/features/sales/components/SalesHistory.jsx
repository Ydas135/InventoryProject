export const SalesHistory = ({ sales = [] }) => {
  
  return (
    <div className="bg-slate-900 p-4 rounded-xl">
      <h3 className="text-sm text-slate-400 mb-3">
        Historial de ventas
      </h3>

      <div className="space-y-2 max-h-64 overflow-y-auto">

        {sales.map((sale) => (
          <div
            key={sale.id}
            className="flex justify-between text-sm border-b border-white/5 pb-2"
          >
            <div>
              <p className="text-white">
                {sale.products?.name || "Producto"}
              </p>

              <p className="text-slate-400 text-xs">
                {sale.quantity} unidades * S/ {sale.total}
              </p>
            </div>

            <div className="text-right">
              <p className="font-medium text-red-400">
                -{sale.quantity}
              </p>

              <p className="text-xs text-slate-500">
                {new Date(sale.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};