import { useState, useEffect, useRef } from "react";
import { useGetProducts } from "../hooks/useGetProducts";
import { ProductForm } from "../components/ProductForm";
import { Modal } from "../../../common/components/ui/Modal";

export const ProductPage = () => {
  const { products, loading, addProduct, removeProduct, updateProduct } = useGetProducts();
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isRestoring, setIsRestoring] = useState(true);
  const isFirstRender = useRef(true);
  const itemsPerPage = 6;

  const filteredProducts = products.filter((product) => {
  const matchSearch = product.name
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchCategory = category
  ? category === "otros"
    ? !["perfumes", "cremas", "maquillaje"].includes(
        product.category?.toLowerCase()
      )
    : product.category?.toLowerCase() === category.toLowerCase()
  : true;

  const matchPrice = maxPrice
    ? product.price <= Number(maxPrice)
    : true;

  return matchSearch && matchCategory && matchPrice;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
  );

  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, filteredProducts.length);


  useEffect(() => {
  const saved = JSON.parse(localStorage.getItem("productFilters") || "{}");

    setSearch(saved.search || "");
    setCategory(saved.category || "");
    setMaxPrice(saved.maxPrice || "");
    setCurrentPage(saved.currentPage || 1);

    setTimeout(() => {
      setIsRestoring(false);
    }, 0);
  }, []);


  useEffect(() => {
  if (isRestoring) return;

  const data = { search, category, maxPrice, currentPage };

  localStorage.setItem("productFilters", JSON.stringify(data));
  }, [search, category, maxPrice, currentPage, isRestoring]);


  useEffect(() => {
  if (isRestoring) return;

  if (isFirstRender.current) {
    isFirstRender.current = false;
    return;
  }

  setCurrentPage(1);
  }, [search, category, maxPrice, isRestoring]);


  const handleCreate = async (data) => {
    await addProduct(data);
    setOpen(false);
  };

  const handleUpdate = async (data) => {
    await updateProduct(selectedProduct.id, data);
    setSelectedProduct(null);
    setOpen(false);
  };

  const openCreate = () => {
    setSelectedProduct(null);
    setOpen(true);
  };

  const openEdit = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const clearFilters = () => {
  setSearch("");
  setCategory("");
  setMaxPrice("");
  setCurrentPage(1);
  };

  return (
    <div className="text-white p-6 space-y-6">

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h2 className="text-2xl font-semibold">Products</h2>

        <button
          onClick={openCreate}
          className="bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-500 w-full sm:w-auto"
        >
          + Nuevo producto
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Buscar producto..."
          className="flex-1 p-2 rounded bg-slate-800 text-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="p-2 rounded bg-slate-800 text-white"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Todas</option>
          <option value="perfumes">Perfumes</option>
          <option value="cremas">Cremas</option>
          <option value="otros">Otros</option>
          <option value="maquillaje">Maquillaje</option>
        </select>
        <input
          type="number"
          placeholder="Max S/"
          className="w-32 p-2 rounded bg-slate-800 text-white"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <button
          onClick={clearFilters}
          className="px-3 py-2 bg-slate-800 text-slate-300 rounded hover:bg-slate-700"
        >
          Limpiar
        </button>
        
      </div>
        {loading ? (
          <p>Cargando...</p>
        ) : products.length === 0 ? (
          <p>No tienes productos aún</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-slate-900 rounded-2xl overflow-hidden shadow-lg hover:scale-[1.02] transition"
              >
                <div
                  className="h-40 sm:h-48 bg-slate-800 overflow-hidden"
                  onClick={() => openEdit(product)}
                >
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-slate-500">
                      Sin imagen
                    </div>
                  )}
                </div>
                <div
                  className="p-4 space-y-2 cursor-pointer"
                  onClick={() => openEdit(product)}
                >
                  <p className="font-medium text-white">{product.name}</p>

                  <p className="text-sm text-slate-400">
                    {product.category}
                  </p>

                  <p className="text-indigo-400 font-bold">
                    S/ {product.price}
                  </p>
                </div>
                <div className="px-4 pb-4 flex justify-end">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); 
                      removeProduct(product.id);
                    }}
                    className="text-red-400 text-sm hover:text-red-300"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <p className="text-sm text-slate-400 flex justify-center">
          Mostrando {start}–{end} de {filteredProducts.length} productos
        </p>
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 gap-2 flex-wrap">

            <button
              onClick={() => setCurrentPage((product) => Math.max(product - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-slate-800 rounded disabled:opacity-40"
            >
              ←
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === index + 1
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-800 text-slate-400"
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() =>
                setCurrentPage((product) => Math.min(product + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-slate-800 rounded disabled:opacity-40"
            >
              →
            </button>

          </div>
        )}
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <ProductForm
          className="w-full max-w-md sm:max-w-lg mx-auto"
          initialData={selectedProduct}
          onSubmit={selectedProduct ? handleUpdate : handleCreate}
          onCancel={() => setOpen(false)}
        />
      </Modal>

    </div>
  );
};