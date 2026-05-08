import { supabase } from "../../../backend/supabaseClient";

export const createSale = async ({ product_id, quantity, price }) => {
  const total = quantity * price;

  const { error } = await supabase.from("sales").insert({
    product_id,
    quantity,
    total,
    channel: "manual"
  });

  if (error) throw error;

  const { error: movementError } = await supabase
    .from("inventory_movements")
    .insert({
      product_id,
      type: "out",
      quantity,
      reason: "Venta"
    });

  if (movementError) { 
    console.log(movementError)
  }
};