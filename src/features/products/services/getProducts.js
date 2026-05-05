import { supabase } from "../../../backend/supabaseClient";

export const getProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

export const createProduct = async (product) => {
  const { data, error } = await supabase
    .from("products")
    .insert(product)
    .select()
    .single(); 

  if (error) throw error;

  const { error: inventoryError } = await supabase
    .from("inventory")
    .insert({
      product_id: data.id,
      stock: 0
    });

  if (inventoryError) throw inventoryError;

  return data; 
};

export const editProduct = async (id, updates) => {
  const { error } = await supabase
    .from("products")
    .update(updates)
    .eq("id", id);

  if (error) throw error;
};

export const deleteProduct = async (id) => {
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) throw error;
};
