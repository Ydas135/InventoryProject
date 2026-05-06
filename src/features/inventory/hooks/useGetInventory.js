import { useEffect, useState } from "react";
import { getInventory, createMovement, getMovements } from "../services/getInventory";

export const useGetInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [movements, setMovements] = useState([]);

  const fetchInventory = async () => {
    try {
      const data = await getInventory();
      setInventory(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMovements = async () => {
  const data = await getMovements();
  setMovements(data);
  };

  const addMovement = async (movement) => {
    await createMovement(movement);
    console.log("movement inserted");
    await fetchInventory();
    await fetchMovements(); 
  };



  useEffect(() => {
    fetchInventory();
    fetchMovements();
  }, []);

  return {
    inventory,
    loading,
    addMovement,
    movements
  };
};