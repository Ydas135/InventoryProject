export const TopProducts = ({ sales }) => {
  const map = {};

  sales.forEach((s) => {
    const name = s.products?.name || "Sin Nombre";

    if (!map[name]) {
      map[name] = 0
    } map[name] += s.quantity
  });

  const sorted = Object.entries(map)
    .map(([name, qty]) => ({ name, qty }))
    .sort((a, b) => b.qty - a.qty)
    .slice(0, 5);

  if (!sorted.length) {
  return (
    <div className="bg-slate-900 p-4 rounded-2xl">
      <p className="text-slate-400">
        No hay datos disponibles
      </p>
    </div>
    );
  }

  const maxQty = sorted[0].qty;

  return (
    <div className="bg-slate-900 p-4 rounded-2xl">
      <div className="mb-4">
        <h3 className="font-semibold text-lg">
          Productos más vendidos
        </h3>

        <p className="text-sm text-slate-400">
          Ranking por unidades vendidas
        </p>
      </div>

      <div className="space-y-4">
        {sorted.map((product, index) => (
          <div key={product.name}>
            <div className="flex justify-between text-sm mb-1">
              <div className="flex gap-2">
              <span className="text-slate-400">
                #{index + 1}
              </span>

              <span className="font-medium">
                {product.name}
              </span>
            </div>

            <span className="text-indigo-400 font-semibold">
              {product.qty} unidades
            </span>
          </div>

          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-500 rounded-full"
              style={{
                width: `${(product.qty / maxQty) * 100}%`
              }}
            />

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};