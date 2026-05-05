export const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />
      <div 
        className="relative bg-slate-900 w-full max-w-md sm:max-w-lg mx-4 rounded-xl p-4 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-slate-400"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};