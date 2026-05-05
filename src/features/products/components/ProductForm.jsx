import { useState } from "react";

export const ProductForm = ({ onSubmit, initialData, onCancel }) => {
  const categories = ["Perfumes", "Cremas", "Maquillaje", "Otros"];
  const [form, setForm] = useState({
    name: initialData?.name || "",
    price: initialData?.price || "",
    category: initialData?.category || "",
    description: initialData?.description || "",
    image_url: initialData?.image_url || "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!form.name) newErrors.name = "Nombre requerido";
    if (!form.price || form.price <= 0) newErrors.price = "Precio inválido";
    if (!form.category) newErrors.category = "Selecciona categoría";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    onSubmit({
      ...form,
      price: Number(form.price),
    });
  };

  return (
    <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-6 rounded-xl space-y-4 w-full max-w-md flex flex-col gap-3"
    >
        <h2 className="text-white text-lg font-semibold">
            {initialData ? "Editar producto" : "Nuevo producto"}
        </h2>
        <div>
            <label className="text-sm text-slate-400">Nombre</label>
                <input
                    className="w-full mt-1 p-2 rounded bg-slate-800 text-white"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    />
                        {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
        </div>
        <div>
            <label className="text-sm text-slate-400">Precio</label>
                <input
                    type="number"
                    className="w-full mt-1 p-2 rounded bg-slate-800 text-white"
                    value={form.price}
                    onChange={(e) => handleChange("price", e.target.value)}
                    />
                        {errors.price && <p className="text-red-500 text-xs">{errors.price}</p>}
        </div>
        <div>
            <label className="text-sm text-slate-400">Categoría</label>
            <select
            className="w-full mt-1 p-2 rounded bg-slate-800 text-white"
            value={form.category}
            onChange={(e) => handleChange("category", e.target.value)}
            >
            <option value="">Seleccionar</option>
            {categories.map((cat) => (
                <option key={cat}>{cat}</option>
            ))}
            </select>
            {errors.category && (
            <p className="text-red-500 text-xs">{errors.category}</p>
            )}
        </div>
        <div>
            <label className="text-sm text-slate-400">Descripción</label>
            <textarea
            className="w-full mt-1 p-2 rounded bg-slate-800 text-white"
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            />
        </div>
        <div className="flex justify-end gap-2 pt-2 sm:flex-row">
            <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-slate-400 flex-1"
            >
                Cancelar
            </button>
            <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 rounded text-white hover:bg-indigo-500 flex-1"
            >
                Guardar
            </button>
        </div>
        <div>
            <label className="text-sm text-slate-400">Imagen (URL)</label>
                <input
                    className="w-full mt-1 p-2 rounded bg-slate-800 text-white"
                    value={form.image_url}
                    onChange={(e) => handleChange("image_url", e.target.value)}
                    placeholder="https://..."
                />
        </div>
    </form>
  );
};