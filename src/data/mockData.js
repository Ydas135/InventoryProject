// Tipo de cambio referencial S/ → US$
export const TIPO_CAMBIO = 3.78;

export const formatearSoles = (n) =>
  new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    minimumFractionDigits: 2,
  }).format(n);

export const formatearDolares = (n) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(n);

export const formatearMoneda = (n, moneda) =>
  moneda === "USD" ? formatearDolares(n / TIPO_CAMBIO) : formatearSoles(n);

// ===== Métricas del Home =====
export const metricasHome = {
  ingresosDia: 12480.5,
  ingresosDiaDelta: 8.4,
  ingresosMes: 284960.0,
  ingresosMesDelta: 12.7,
  numeroVentas: 47,
  numeroVentasDelta: 5.2,
  clientesNuevos: 12,
  clientesNuevosDelta: 22.0,
  stockDisponible: 1284,
  stockDisponibleDelta: -3.1,
};

// ===== Productos más vendidos (tecnológicos) =====
export const topProductos = [
  {
    id: "P-001",
    nombre: "iPhone 15 Pro 128GB",
    categoria: "Smartphones",
    unidades: 38,
    precio: 4999,
    color: "from-blue-500 to-indigo-500",
  },
  {
    id: "P-002",
    nombre: 'MacBook Air M3 13"',
    categoria: "Laptops",
    unidades: 24,
    precio: 5499,
    color: "from-zinc-700 to-zinc-900",
  },
  {
    id: "P-003",
    nombre: "AirPods Pro 2",
    categoria: "Audio",
    unidades: 96,
    precio: 999,
    color: "from-fuchsia-500 to-pink-500",
  },
  {
    id: "P-004",
    nombre: 'iPad Air M2 11"',
    categoria: "Tablets",
    unidades: 31,
    precio: 2799,
    color: "from-amber-500 to-orange-500",
  },
  {
    id: "P-005",
    nombre: "Sony WH-1000XM5",
    categoria: "Audio",
    unidades: 22,
    precio: 1499,
    color: "from-emerald-500 to-teal-500",
  },
];

// ===== Ventas por categoría =====
export const ventasPorCategoria = [
  { categoria: "Smartphones", ventas: 142800, porcentaje: 38 },
  { categoria: "Laptops", ventas: 98640, porcentaje: 26 },
  { categoria: "Audio", ventas: 56240, porcentaje: 15 },
  { categoria: "Tablets", ventas: 41320, porcentaje: 11 },
  { categoria: "Accesorios", ventas: 22800, porcentaje: 6 },
  { categoria: "Monitores", ventas: 15200, porcentaje: 4 },
];

// ===== Serie de ventas últimos 14 días =====
export const ventasUltimos14Dias = [
  6800, 7200, 8100, 7600, 9300, 11200, 10800, 9700, 10500, 11800, 12900, 11400,
  13200, 12480,
];

// ===== Documentos recientes (Factura/Boleta/Ticket/Recibo) =====
export const documentosRecientes = [
  {
    id: "F001-001274",
    tipo: "Factura",
    cliente: "TechSolutions S.A.C.",
    fecha: "2026-05-01 14:32",
    total: 8497.0,
    metodo: "Transferencia",
    estado: "Pagado",
  },
  {
    id: "B001-005612",
    tipo: "Boleta",
    cliente: "María Fernández",
    fecha: "2026-05-01 13:18",
    total: 999.0,
    metodo: "Tarjeta",
    estado: "Pagado",
  },
  {
    id: "T001-009881",
    tipo: "Ticket",
    cliente: "Cliente varios",
    fecha: "2026-05-01 12:07",
    total: 249.0,
    metodo: "Efectivo",
    estado: "Pagado",
  },
  {
    id: "F001-001273",
    tipo: "Factura",
    cliente: "Innova Retail E.I.R.L.",
    fecha: "2026-05-01 11:42",
    total: 14598.0,
    metodo: "Yape",
    estado: "Pendiente",
  },
  {
    id: "R001-002342",
    tipo: "Recibo",
    cliente: "Carlos Vargas",
    fecha: "2026-05-01 10:14",
    total: 449.0,
    metodo: "Tarjeta",
    estado: "Pagado",
  },
  {
    id: "B001-005611",
    tipo: "Boleta",
    cliente: "Ana Torres",
    fecha: "2026-05-01 09:50",
    total: 2799.0,
    metodo: "Tarjeta",
    estado: "Pagado",
  },
];

// ===== Stock bajo =====
export const stockBajo = [
  { producto: "AirPods Pro 2", stock: 4, minimo: 10 },
  { producto: 'LG UltraGear 27" 144Hz', stock: 2, minimo: 6 },
  { producto: "Logitech MX Master 3S", stock: 7, minimo: 12 },
];

// ===== Clientes =====
export const clientes = [
  {
    id: "C-001",
    nombre: "TechSolutions S.A.C.",
    documento: "RUC 20512345678",
    email: "compras@techsolutions.pe",
    telefono: "+51 999 111 222",
    tipo: "Empresa",
    desde: "2024-03-12",
    color: "from-blue-500 to-indigo-500",
  },
  {
    id: "C-002",
    nombre: "María Fernández",
    documento: "DNI 45678912",
    email: "maria.fernandez@gmail.com",
    telefono: "+51 988 222 333",
    tipo: "Persona",
    desde: "2024-08-04",
    color: "from-fuchsia-500 to-pink-500",
  },
  {
    id: "C-003",
    nombre: "Innova Retail E.I.R.L.",
    documento: "RUC 20498765432",
    email: "ventas@innovaretail.pe",
    telefono: "+51 977 333 444",
    tipo: "Empresa",
    desde: "2025-01-22",
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: "C-004",
    nombre: "Carlos Vargas",
    documento: "DNI 78912345",
    email: "carlos.vargas@outlook.com",
    telefono: "+51 966 444 555",
    tipo: "Persona",
    desde: "2025-06-18",
    color: "from-amber-500 to-orange-500",
  },
  {
    id: "C-005",
    nombre: "Ana Torres",
    documento: "DNI 32165498",
    email: "ana.torres@yahoo.com",
    telefono: "+51 955 555 666",
    tipo: "Persona",
    desde: "2025-11-09",
    color: "from-rose-500 to-red-500",
  },
];

// ===== Historial de compras por cliente =====
// Cada documento incluye items, subtotal, IGV, total, método
export const historialPorCliente = {
  "C-001": [
    {
      id: "F001-001274",
      tipo: "Factura",
      fecha: "2026-05-01 14:32",
      metodo: "Transferencia",
      estado: "Pagado",
      items: [
        { nombre: "iPhone 15 Pro 128GB", cantidad: 1, precio: 4999 },
        { nombre: 'MacBook Air M3 13"', cantidad: 1, precio: 5499 },
      ],
    },
    {
      id: "F001-001201",
      tipo: "Factura",
      fecha: "2026-04-12 11:08",
      metodo: "Transferencia",
      estado: "Pagado",
      items: [
        { nombre: 'iPad Air M2 11"', cantidad: 2, precio: 2799 },
        { nombre: "AirPods Pro 2", cantidad: 2, precio: 999 },
      ],
    },
    {
      id: "F001-001154",
      tipo: "Factura",
      fecha: "2026-03-04 16:45",
      metodo: "Transferencia",
      estado: "Pagado",
      items: [
        { nombre: 'LG UltraGear 27" 144Hz', cantidad: 3, precio: 1799 },
      ],
    },
  ],
  "C-002": [
    {
      id: "B001-005612",
      tipo: "Boleta",
      fecha: "2026-05-01 13:18",
      metodo: "Tarjeta",
      estado: "Pagado",
      items: [{ nombre: "AirPods Pro 2", cantidad: 1, precio: 999 }],
    },
    {
      id: "B001-005488",
      tipo: "Boleta",
      fecha: "2026-02-22 19:30",
      metodo: "Tarjeta",
      estado: "Pagado",
      items: [
        { nombre: "Logitech MX Master 3S", cantidad: 1, precio: 449 },
      ],
    },
  ],
  "C-003": [
    {
      id: "F001-001273",
      tipo: "Factura",
      fecha: "2026-05-01 11:42",
      metodo: "Yape",
      estado: "Pendiente",
      items: [
        { nombre: 'MacBook Air M3 13"', cantidad: 2, precio: 5499 },
        { nombre: "Sony WH-1000XM5", cantidad: 1, precio: 1499 },
        { nombre: "Logitech MX Master 3S", cantidad: 4, precio: 449 },
      ],
    },
  ],
  "C-004": [
    {
      id: "R001-002342",
      tipo: "Recibo",
      fecha: "2026-05-01 10:14",
      metodo: "Tarjeta",
      estado: "Pagado",
      items: [{ nombre: "Logitech MX Master 3S", cantidad: 1, precio: 449 }],
    },
    {
      id: "T001-009654",
      tipo: "Ticket",
      fecha: "2026-04-08 17:22",
      metodo: "Efectivo",
      estado: "Pagado",
      items: [{ nombre: "AirPods Pro 2", cantidad: 1, precio: 999 }],
    },
  ],
  "C-005": [
    {
      id: "B001-005611",
      tipo: "Boleta",
      fecha: "2026-05-01 09:50",
      metodo: "Tarjeta",
      estado: "Pagado",
      items: [{ nombre: 'iPad Air M2 11"', cantidad: 1, precio: 2799 }],
    },
  ],
};

// IGV Perú = 18%
export const IGV = 0.18;

export const calcularTotales = (items) => {
  const bruto = items.reduce((a, it) => a + it.cantidad * it.precio, 0);
  const subtotal = bruto / (1 + IGV);
  const igv = bruto - subtotal;
  return { subtotal, igv, total: bruto };
};

// ===== Series para gráficos =====
export const ventasPorDia = [
  6800, 7200, 8100, 7600, 9300, 11200, 10800, 9700, 10500, 11800, 12900, 11400,
  13200, 12480,
]; // 14 días

export const ventasPorSemana = [
  48200, 52800, 61400, 58700, 67200, 74100, 71800, 80400,
]; // 8 semanas

export const ventasPorMes = [
  168400, 182300, 191800, 215600, 198400, 224700, 237100, 258900, 246300,
  271400, 284960, 298100,
]; // 12 meses

export const mesesEtiquetas = [
  "Jun", "Jul", "Ago", "Sep", "Oct", "Nov",
  "Dic", "Ene", "Feb", "Mar", "Abr", "May",
];

// Top clientes por monto comprado
export const topClientes = [
  { id: "C-003", nombre: "Innova Retail E.I.R.L.", compras: 14598, ventas: 1, color: "from-emerald-500 to-teal-500" },
  { id: "C-001", nombre: "TechSolutions S.A.C.", compras: 31094, ventas: 3, color: "from-blue-500 to-indigo-500" },
  { id: "C-005", nombre: "Ana Torres", compras: 2799, ventas: 1, color: "from-rose-500 to-red-500" },
  { id: "C-002", nombre: "María Fernández", compras: 1448, ventas: 2, color: "from-fuchsia-500 to-pink-500" },
  { id: "C-004", nombre: "Carlos Vargas", compras: 1448, ventas: 2, color: "from-amber-500 to-orange-500" },
];
