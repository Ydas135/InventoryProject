export const Modal = ({ isOpen, onClose, children }) => {

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
    >

      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className="relative z-10 w-full max-w-[95%] sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-slate-900 rounded-2xl p-4 sm:p-6 max-h-[85vh] overflow-y-auto"
      >

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-400 hover:text-white transition"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
};