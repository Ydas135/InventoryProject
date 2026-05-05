import { useEffect, useState } from "react";
import { getProducts , createProduct, editProduct, deleteProduct } from "../services/getProducts"

export const useGetProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    const data = await getProducts();
    setProducts(data);
    setLoading(false);
  };

  const addProduct = async (product) => {
    await createProduct(product);
    await fetchProducts();
  };

  const updateProduct = async (id, data) => {
  await editProduct(id, data);
  await fetchProducts();
  };

  const removeProduct = async (id) => {
    await deleteProduct(id);
    await fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    addProduct,
    updateProduct,
    removeProduct
  };
};