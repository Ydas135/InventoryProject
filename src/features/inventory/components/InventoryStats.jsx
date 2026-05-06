export const InventoryStats = ({ inventory }) => {
  const totalProducts = inventory.length;
  const totalStock = inventory.reduce((acc, i) => acc + i.stock, 0);
  const low = inventory.filter(i => i.stock > 0 && i.stock <= 5).length;
  const critical = inventory.filter(i => i.stock === 0).length;

  const Card = ({ label, value }) => (
    <div className="bg-slate-900 p-4 rounded-xl">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  );

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <Card label="Productos" value={totalProducts} />
      <Card label="Stock total" value={totalStock} />
      <Card label="Bajo stock" value={low} />
      <Card label="Sin stock" value={critical} />
    </div>
  );
};