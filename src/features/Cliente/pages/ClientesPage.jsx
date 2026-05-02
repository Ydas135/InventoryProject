import { useState } from "react";
import { Topbar } from "../../../app/layout/Topbar";
import { ClienteList } from "../components/ClienteList";
import { ClienteDetail } from "../components/ClienteDetail";
import { clientes } from "../../../data/mockData";

export function ClientesPage() {
  const [selected, setSelected] = useState(clientes[0].id);

  return (
    <>
      <Topbar
        title="Clientes"
        subtitle="Historial de compras, documentos generados y productos"
      />

      <section className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-4">
        <div className="h-[calc(100vh-160px)] sticky top-[120px] animate-fade-up">
          <ClienteList selectedId={selected} onSelect={setSelected} />
        </div>
        <ClienteDetail id={selected} />
      </section>
    </>
  );
}
