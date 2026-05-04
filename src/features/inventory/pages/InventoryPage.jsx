import { useInventory } from "../hooks/useGetInventory";
import { InventoryChart } from "../components/InventoryChart";

export const InventoryPage = () => {
  const { inventory, loading } = useInventory();

  if (loading) {
    return <p className="text-white">Cargando...</p>;
  }

  return (
    <div className="text-white space-y-6">
      <h2 className="text-xl">Inventory</h2>

      {/* 👇 SOLO AQUÍ decides si hay data */}
      {inventory.length === 0 ? (
        <p>No tienes productos aún</p>
      ) : (
        <>
          <InventoryChart inventory={inventory} />

          <div>
            {inventory.map((item) => (
              <div key={item.id} className="border p-3 mb-2 rounded">
                <p>Producto: {item.products?.name}</p>
                <p>Stock: {item.stock}</p>
                <p>Precio: {item.products?.price}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};