import {
  clientes,
  historialPorCliente,
  calcularTotales,
} from "../../data/mockData";

// Limpia el prefijo "RUC " / "DNI " y separa tipo + número.
export function parseDocumento(documento = "") {
  const [tipo, ...resto] = documento.split(" ");
  return { tipoDoc: tipo, numeroDoc: resto.join(" ") || tipo };
}

// Agrega los productos comprados por un cliente sumando cantidades.
function agregarProductos(docs) {
  const mapa = new Map();
  for (const doc of docs) {
    for (const it of doc.items) {
      const prev = mapa.get(it.nombre) || { nombre: it.nombre, cantidad: 0, importe: 0 };
      prev.cantidad += it.cantidad;
      prev.importe += it.cantidad * it.precio;
      mapa.set(it.nombre, prev);
    }
  }
  return [...mapa.values()].sort((a, b) => b.cantidad - a.cantidad);
}

// Construye el modelo de reporte de un cliente: incluye los campos pedidos
// (Id, RUC/DNI, Correo, Teléfono, Compras, Productos) ya calculados.
export function construirReporteCliente(cliente) {
  const docs = historialPorCliente[cliente.id] || [];
  const { tipoDoc, numeroDoc } = parseDocumento(cliente.documento);
  const productos = agregarProductos(docs);
  const totalGastado = docs.reduce(
    (a, d) => a + calcularTotales(d.items).total,
    0
  );
  const unidades = productos.reduce((a, p) => a + p.cantidad, 0);

  return {
    id: cliente.id,
    nombre: cliente.nombre,
    color: cliente.color,
    tipo: cliente.tipo,
    tipoDoc,
    numeroDoc,
    documento: cliente.documento,
    email: cliente.email,
    telefono: cliente.telefono,
    compras: docs.length,
    unidades,
    productos, // [{ nombre, cantidad, importe }]
    totalGastado,
  };
}

// Lista enriquecida para pintar la tabla de clientes en la página.
export function listaClientesReporte() {
  return clientes.map((c) => construirReporteCliente(c));
}
