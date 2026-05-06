export const InventoryFilters = ({
  search,
  setSearch,
  status,
  setStatus
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3">

      <input
        type="text"
        placeholder="Buscar producto..."
        className="flex-1 p-2 rounded bg-slate-800"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        className="p-2 rounded bg-slate-800"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">Todos</option>
        <option value="ok">En stock</option>
        <option value="low">Bajo</option>
        <option value="critical">Crítico</option>
      </select>
    </div>
  );
};