import { TIPO_CAMBIO, formatearMoneda } from "../../data/mockData";
import { buildXlsx, txt, num } from "./xlsx";

const hoy = () =>
  new Date().toLocaleString("es-PE", {
    dateStyle: "long",
    timeStyle: "short",
  });

const slug = (s) =>
  s
    .normalize("NFD")
    .replace(/[^\x00-\x7f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();

function descargarBlob(blob, nombre) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = nombre;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

/* =====================================================================
   EXCEL (.xlsx real, sin dependencias)
   ===================================================================== */
export function generarReporteExcel(r, moneda = "PEN") {
  // celda de dinero respetando la moneda elegida (S/=estilo 3, US$=estilo 5)
  const money = (n) =>
    moneda === "USD" ? num(+(n / TIPO_CAMBIO).toFixed(2), 5) : num(+n.toFixed(2), 3);

  const resumen = {
    name: "Resumen",
    cols: [26, 40],
    rows: [
      [txt("Reporte de cliente", 1)],
      [txt(`Generado: ${hoy()}`)],
      [],
      [txt("Campo", 2), txt("Valor", 2)],
      [txt("Id"), txt(r.id)],
      [txt("Nombre"), txt(r.nombre)],
      [txt("Tipo"), txt(r.tipo)],
      [txt("RUC / DNI"), txt(r.documento)],
      [txt("Correo"), txt(r.email)],
      [txt("Teléfono"), txt(r.telefono)],
      [txt("Compras"), num(r.compras, 4)],
      [txt("Productos distintos"), num(r.productos.length, 4)],
      [txt("Unidades totales"), num(r.unidades, 4)],
      [txt("Total gastado"), money(r.totalGastado)],
    ],
  };

  const productos = {
    name: "Productos",
    cols: [40, 12, 18],
    rows: [
      [txt("Producto", 2), txt("Cantidad", 2), txt("Importe", 2)],
      ...r.productos.map((p) => [txt(p.nombre), num(p.cantidad, 4), money(p.importe)]),
      [],
      [txt("TOTAL", 1), num(r.unidades, 4), money(r.totalGastado)],
    ],
  };

  const blob = buildXlsx([resumen, productos]);
  descargarBlob(blob, `reporte-${slug(r.nombre)}.xlsx`);
}

/* =====================================================================
   PDF (ventana de impresión con diseño de marca → "Guardar como PDF")
   ===================================================================== */
export function generarReportePDF(r, moneda = "PEN") {
  const fm = (n) => formatearMoneda(n, moneda);

  const filasProductos = r.productos
    .map(
      (p, i) => `
      <tr style="animation-delay:${i * 0.05}s">
        <td>${escapeHtml(p.nombre)}</td>
        <td class="num">${p.cantidad}</td>
        <td class="num">${fm(p.importe)}</td>
      </tr>`
    )
    .join("");

  const html = `<!doctype html>
<html lang="es"><head><meta charset="utf-8" />
<title>Reporte · ${escapeHtml(r.nombre)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet" />
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root { --ink:#1c1c1e; --muted:#71717a; --line:#e7e7ea; --accent:#0a84ff; }
  body { font-family:"Manrope",system-ui,sans-serif; color:var(--ink); padding:48px 52px; -webkit-print-color-adjust:exact; print-color-adjust:exact; }
  .head { display:flex; justify-content:space-between; align-items:flex-start; padding-bottom:24px; border-bottom:2px solid var(--ink); }
  .brand { display:flex; gap:12px; align-items:center; }
  .logo { width:44px; height:44px; border-radius:13px; background:linear-gradient(135deg,#18181b,#3f3f46); color:#fff; display:grid; place-items:center; font-weight:700; font-size:20px; }
  .brand h1 { font-family:"Fraunces",serif; font-size:22px; letter-spacing:-.02em; }
  .brand p { font-size:11px; letter-spacing:.22em; text-transform:uppercase; color:var(--muted); }
  .doc-meta { text-align:right; font-size:11px; color:var(--muted); line-height:1.7; }
  .doc-meta strong { display:block; font-family:"Fraunces",serif; font-size:15px; color:var(--ink); letter-spacing:-.01em; }
  .title { margin:34px 0 22px; }
  .title .eyebrow { font-size:11px; letter-spacing:.28em; text-transform:uppercase; color:var(--muted); }
  .title h2 { font-family:"Fraunces",serif; font-size:34px; letter-spacing:-.02em; margin-top:6px; }
  .grid { display:grid; grid-template-columns:repeat(2,1fr); gap:14px 28px; margin-bottom:34px; }
  .field { border-bottom:1px solid var(--line); padding-bottom:9px; }
  .field span { font-size:10.5px; letter-spacing:.14em; text-transform:uppercase; color:var(--muted); display:block; margin-bottom:3px; }
  .field b { font-weight:600; font-size:14.5px; }
  .stats { display:flex; gap:14px; margin-bottom:30px; }
  .stat { flex:1; border:1px solid var(--line); border-radius:16px; padding:16px 18px; }
  .stat em { font-style:normal; font-size:10.5px; letter-spacing:.12em; text-transform:uppercase; color:var(--muted); }
  .stat strong { display:block; font-family:"Fraunces",serif; font-size:28px; letter-spacing:-.02em; margin-top:4px; }
  h3 { font-size:12px; letter-spacing:.16em; text-transform:uppercase; color:var(--muted); margin-bottom:10px; }
  table { width:100%; border-collapse:collapse; }
  th { text-align:left; font-size:11px; letter-spacing:.08em; text-transform:uppercase; color:#fff; background:var(--ink); padding:11px 14px; }
  th:first-child { border-radius:10px 0 0 10px; } th:last-child { border-radius:0 10px 10px 0; }
  td { padding:11px 14px; border-bottom:1px solid var(--line); font-size:13.5px; }
  .num { text-align:right; font-variant-numeric:tabular-nums; }
  tfoot td { font-weight:700; border-top:2px solid var(--ink); border-bottom:none; }
  .foot { margin-top:40px; padding-top:16px; border-top:1px solid var(--line); font-size:10.5px; color:var(--muted); display:flex; justify-content:space-between; }
  @media print { body { padding:0; } @page { margin:18mm; } }
</style></head>
<body>
  <div class="head">
    <div class="brand">
      <div class="logo">I</div>
      <div><h1>Inventario</h1><p>Tienda Tech</p></div>
    </div>
    <div class="doc-meta">
      <strong>Reporte de cliente</strong>
      ${escapeHtml(r.id)}<br/>${escapeHtml(hoy())}
    </div>
  </div>

  <div class="title">
    <p class="eyebrow">Resumen del cliente</p>
    <h2>${escapeHtml(r.nombre)}</h2>
  </div>

  <div class="grid">
    <div class="field"><span>RUC / DNI</span><b>${escapeHtml(r.documento)}</b></div>
    <div class="field"><span>Tipo</span><b>${escapeHtml(r.tipo)}</b></div>
    <div class="field"><span>Correo</span><b>${escapeHtml(r.email)}</b></div>
    <div class="field"><span>Teléfono</span><b>${escapeHtml(r.telefono)}</b></div>
  </div>

  <div class="stats">
    <div class="stat"><em>Compras</em><strong>${r.compras}</strong></div>
    <div class="stat"><em>Productos</em><strong>${r.productos.length}</strong></div>
    <div class="stat"><em>Unidades</em><strong>${r.unidades}</strong></div>
    <div class="stat"><em>Total gastado</em><strong>${fm(r.totalGastado)}</strong></div>
  </div>

  <h3>Detalle de productos</h3>
  <table>
    <thead><tr><th>Producto</th><th class="num">Cantidad</th><th class="num">Importe</th></tr></thead>
    <tbody>${filasProductos || `<tr><td colspan="3" style="color:var(--muted)">Sin compras registradas.</td></tr>`}</tbody>
    <tfoot><tr><td>Total</td><td class="num">${r.unidades}</td><td class="num">${fm(r.totalGastado)}</td></tr></tfoot>
  </table>

  <div class="foot">
    <span>Inventario · Tienda Tech — Documento generado automáticamente</span>
    <span>Moneda: ${moneda === "USD" ? "US$ (referencial)" : "S/ soles"}</span>
  </div>

  <script>
    window.addEventListener("load", () => {
      setTimeout(() => { window.focus(); window.print(); }, 400);
    });
  </script>
</body></html>`;

  const win = window.open("", "_blank", "width=900,height=1000");
  if (!win) {
    alert("Permite las ventanas emergentes para generar el PDF.");
    return;
  }
  win.document.open();
  win.document.write(html);
  win.document.close();
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
