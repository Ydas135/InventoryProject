export const MovementsList = ({ movements }) => {
  return (
    <div className="bg-slate-900 p-4 rounded-xl">
      <h3 className="text-sm text-slate-400 mb-3">
        Historial de movimientos
      </h3>

      <div className="space-y-2 max-h-64 overflow-y-auto">

        {movements.map((movement) => (
          <div
            key={movement.id}
            className="flex justify-between text-sm border-b border-white/5 pb-1"
          >
            <div>
              <p className="text-white">
                {movement.type === "in" && "Entrada"}
                {movement.type === "out" && "Salida"}
                {movement.type === "adjust" && "Ajuste"}
              </p>

              <p className="text-slate-400 text-xs">
                {movement.reason}
              </p>
            </div>

            <div className="text-right">
              <p
                className={`font-medium ${
                  movement.type === "in"
                    ? "text-green-400"
                    : movement.type === "out"
                    ? "text-red-400"
                    : "text-yellow-400"
                }`}
              >
                {movement.type === "in" && "+"}
                {movement.type === "out" && "-"}
                {movement.quantity}
              </p>

              <p className="text-xs text-slate-500">
                {new Date(movement.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};