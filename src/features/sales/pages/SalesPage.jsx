import { useState } from "react";
import { useSales } from "../hooks/useSales";
import { useGetProducts } from "../../products/hooks/useGetProducts";

export const SalesPage = () => {
  const { addSale } = useSales();
  const { products } = useGetProducts();

  const [productId, setProductId] = useState("");
  const [qty, setQty] = useState(1);

  const selectedProduct = products.find(p => p.id === productId);

  const handleSale = async () => {
    if (!productId || !qty) return;

    await addSale({
      product_id: productId,
      quantity: Number(qty),
      price: selectedProduct.price
    });

    setQty(1);
  };

  return (
    <div className="text-white p-6 space-y-4">

      <h2 className="text-xl font-semibold">Nueva venta</h2>

      <select
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        className="p-2 bg-slate-800 rounded w-full"
      >
        <option value="">Selecciona producto</option>
        {products.map(p => (
          <option key={p.id} value={p.id}>
            {p.name} - S/ {p.price}
          </option>
        ))}
      </select>

      <input
        type="number"
        value={qty}
        onChange={(e) => setQty(e.target.value)}
        className="p-2 bg-slate-800 rounded w-full"
      />

      {selectedProduct && (
        <p className="text-slate-400">
          Total: S/ {(qty * selectedProduct.price).toFixed(2)}
        </p>
      )}

      <button
        onClick={handleSale}
        className="bg-indigo-600 px-4 py-2 rounded w-full"
      >
        Registrar venta
      </button>

    </div>
  );
};