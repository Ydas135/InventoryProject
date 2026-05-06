import { useState, useMemo } from "react";
import { useGetInventory } from "../hooks/useGetInventory";

import { InventoryCard } from "../components/InventoryCard";
import { InventoryStats } from "../components/InventoryStats";
import { InventoryFilters } from "../components/InventoryFilters";
import { InventoryDrawer } from "../components/InventoryDrawer";
import { InventoryChart } from "../components/InventoryChart";
import { MovementsList } from "../components/MovementList";
import { MovementModal } from "../components/MovementModal";

export const InventoryPage = () => {
  const { inventory, loading, addMovement, movements } = useGetInventory();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [selected, setSelected] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("in");
  const [activeItem, setActiveItem] = useState(null);

  const filtered = useMemo(() => {
    return inventory.filter((item) => {
      const name = item.products?.name?.toLowerCase() || "";
      const stock = item.stock;

      const matchSearch = name.includes(search.toLowerCase());

      const matchStatus =
        status === ""
          ? true
          : status === "critical"
          ? stock === 0
          : status === "low"
          ? stock > 0 && stock <= 5
          : stock > 5;

      return matchSearch && matchStatus;
    });
  }, [inventory, search, status]);

  const openModal = (item, type) => {
    setActiveItem(item);
    setModalType(type);
    setModalOpen(true);
  };

  const handleSubmit = async ({ quantity, reason }) => {
    if (!activeItem) return;

    if (modalType === "out" && quantity > activeItem.stock) {
      alert("No hay suficiente stock");
      return;
    }

    await addMovement({
      product_id: activeItem.product_id,
      type: modalType,
      quantity,
      reason: reason || "Manual"
    });
  };

  if (loading) {
    return (
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="bg-slate-800 animate-pulse h-60 rounded-2xl"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="text-white p-4 sm:p-6 space-y-6">

      <InventoryStats inventory={inventory} />

      <InventoryFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item) => (
          <InventoryCard
            key={item.id}
            item={item}
            onSelect={() => setSelected(item)}

            onAdd={() => openModal(item, "in")}
            onRemove={() => openModal(item, "out")}
          />
        ))}
      </div>

      <InventoryChart inventory={inventory} />

      <MovementsList movements={movements} />

      <InventoryDrawer
        item={selected}
        onClose={() => setSelected(null)}
        movements={movements}
      />

      <MovementModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        type={modalType}
      />
    </div>
  );
};