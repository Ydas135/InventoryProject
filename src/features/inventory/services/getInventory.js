import { supabase } from "../../../backend/supabaseClient";

export const getInventory = async () => {
  const { data, error } = await supabase
    .from("inventory")
    .select(`
      id,
      stock,
      products (
        id,
        name,
        price
      )
    `);

  if (error) {
    console.error("SUPABASE ERROR:", error);
    throw error;
  }

  return data;
};