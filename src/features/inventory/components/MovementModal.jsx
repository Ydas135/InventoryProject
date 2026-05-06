import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export const MovementModal = ({ open, onClose, onSubmit, type }) => {
  const [qty, setQty] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    if (!qty) return;

    onSubmit({
      quantity: Number(qty),
      reason
    });

    setQty("");
    setReason("");
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60"
          />

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-slate-900 p-6 rounded-2xl w-full max-w-sm z-10 space-y-4"
          >
            <h3 className="text-lg font-semibold">
              {type === "in" ? "Ingresar stock" : "Retirar stock"}
            </h3>

            <input
              type="number"
              placeholder="Cantidad"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              className="w-full p-2 bg-slate-800 rounded"
            />

            <input
              type="text"
              placeholder="Motivo"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-2 bg-slate-800 rounded"
            />

            <div className="flex gap-2">
              <button
                onClick={handleSubmit}
                className="flex-1 bg-indigo-600 py-2 rounded"
              >
                Confirmar
              </button>

              <button
                onClick={onClose}
                className="flex-1 bg-slate-700 py-2 rounded"
              >
                Cancelar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};