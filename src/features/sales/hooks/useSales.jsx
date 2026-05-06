import { useEffect, useState } from "react";
import { supabase } from "../../../backend/supabaseClient";
import { createSale } from "../services/salesServices";

export const useSales = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSales = async () => {
    const { data, error } = await supabase
      .from("sales")
      .select(`
        *,
        products (name, price)
      `)
      .order("created_at", { ascending: false });

    if (error) throw error;

    setSales(data);
    setLoading(false);
  };

  const addSale = async (sale) => {
    await createSale(sale);
    await fetchSales();
  };

  useEffect(() => {
    fetchSales();
  }, []);

  return {
    sales,
    loading,
    addSale
  };
};