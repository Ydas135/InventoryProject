export const TopProducts = ({ sales }) => {
  const map = {};

  sales.forEach((s) => {
    const name = s.products?.name || "N/A";

    if (!map[name]) map[name] = 0;
    map[name] += s.quantity;
  });

  const sorted = Object.entries(map)
    .map(([name, qty]) => ({ name, qty }))
    .sort((a, b) => b.qty - a.qty)
    .slice(0, 5);

  return (
    <div className="bg-slate-900 p-4 rounded-2xl">
      <h3 className="mb-4 font-semibold">Top productos</h3>

      <div className="space-y-2">
        {sorted.map((p, i) => (
          <div key={i} className="flex justify-between">
            <span>{p.name}</span>
            <span>{p.qty}</span>
          </div>
        ))}
      </div>
    </div>
  );
};