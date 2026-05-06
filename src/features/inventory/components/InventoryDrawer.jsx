import { motion, AnimatePresence } from "framer-motion";

export const InventoryDrawer = ({ item, onClose, movements }) => {
  if (!item) return null;

  const productMovements = movements.filter(
    (movement) => movement.product_id === item.product_id
  );

  return (
    <AnimatePresence>
      {item && (
        <div className="fixed inset-0 z-50 flex">

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="flex-1 bg-black/50"
          />

          <motion.div
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            exit={{ x: 300 }}
            className="w-full sm:w-96 bg-slate-900 p-6 overflow-y-auto"
          >
            <h3 className="text-xl font-semibold mb-4">
              {item.products?.name}
            </h3>

            <p className="mb-4 text-slate-400">
              Stock: {item.stock}
            </p>

            <h4 className="mb-2">Historial</h4>

            <div className="space-y-2">
              {productMovements.map((movement) => (
                <div
                  key={movement.id}
                  className="flex justify-between bg-slate-800 p-2 rounded"
                >
                  <span>{movement.type}</span>
                  <span>{movement.quantity}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};