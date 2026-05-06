import { motion } from "framer-motion";

export const InventoryCard = ({ item, onAdd, onRemove, onSelect }) => {
  const product = item.products;

  const getStatus = () => {
    if (item.stock === 0) return "bg-red-500";
    if (item.stock <= 5) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className="bg-slate-900 rounded-2xl overflow-hidden shadow hover:scale-[1.02] transition cursor-pointer"
    >
      <div className="h-40 bg-slate-800 flex items-center justify-center">
        {product?.image_url ? (
          <img
            src={product.image_url}
            className="h-full w-full object-contain"
          />
        ) : (
          <span className="text-slate-500">Sin imagen</span>
        )}
      </div>

      <div className="p-4 space-y-2">
        <p className="font-medium">{product?.name}</p>

        <div className="flex justify-between items-center">
          <p className="text-sm text-slate-400">
            Stock: {item.stock}
          </p>

          <span className={`w-3 h-3 rounded-full ${getStatus()}`} />
        </div>

        <div className="flex gap-2 pt-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAdd();
            }}
            className="flex-1 bg-green-600 py-1 rounded text-sm"
          >
            +
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="flex-1 bg-red-600 py-1 rounded text-sm"
          >
            -
          </button>
        </div>
      </div>
    </motion.div>
  );
};