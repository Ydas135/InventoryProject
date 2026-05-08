import { supabase } from "../../../backend/supabaseClient";

export const getInventory = async () => {
  const { data, error } = await supabase
    .from("inventory")
    .select(`
      *,
      products (id, name, price, category, image_url)
    `)
    .order("updated_at", { ascending: false });

  if (error) throw error;
  return data;
};

export const createMovement = async (movement) => {
  const { data: { user } } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("inventory_movements")
    .insert({
      ...movement,
      user_id: user.id
    });

  if (error) throw error;
};

export const getMovements = async () => {
  const { data, error } = await supabase
    .from("inventory_movements")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};