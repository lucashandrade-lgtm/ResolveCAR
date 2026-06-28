import { AlertTriangle, BarChart3, CheckCircle2, ClipboardList, FileText } from "lucide-react";
import type { ReactNode } from "react";
import { Layout } from "../components/Layout";
import { Badge } from "../components/Status";
import { useAppState } from "../store/AppState";

export function Reports() {
  const { properties, rules, decisions, history } = useAppState();
  const finalized = Object.values(decisions);
  const critical = properties.filter((property) => property.criticidade === "Alta" || property.criticidade === "Critica").length;
  const activeRules = rules.filter((rule) => rule.status === "Ativa").length;

  return (
    <Layout breadcrumb={<span>Dashboard / Relatorios</span>}>
      <section className="mb-6">
        <span className="text-sm font-semibold uppercase tracking-wide text-gov-green">Relatorios</span>
        <h1 className="mt-1 text-2xl font-bold text-gov-text">Indicadores da validacao ambiental</h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">
          Visao consolidada com dados mockados do MVP. Os indicadores refletem recomendacoes tecnicas, decisoes da analista e rastreabilidade operacional.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Metric icon={<ClipboardList size={20} />} label="Processos na fila" value={String(properties.length)} />
        <Metric icon={<AlertTriangle size={20} />} label="Casos criticos" value={String(critical)} />
        <Metric icon={<CheckCircle2 size={20} />} label="Decisoes registradas" value={String(finalized.length)} />
        <Metric icon={<FileText size={20} />} label="Regras ativas" value={String(activeRules)} />
      </section>

      <section className="panel mt-6 overflow-hidden">
        <header className="panel-header">
          <BarChart3 size={20} className="text-gov-green" />
          <h2 className="font-semibold">Resumo por processo</h2>
        </header>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[840px] text-left text-sm">
            <thead className="bg-gov-gray text-xs uppercase text-slate-500">
              <tr>
                <th className="px-5 py-3">Numero</th>
                <th className="px-5 py-3">Produtor</th>
                <th className="px-5 py-3">Recomendacao</th>
                <th className="px-5 py-3">Criticidade</th>
                <th className="px-5 py-3">Decisao da analista</th>
                <th className="px-5 py-3">Eventos</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {properties.map((property) => (
                <tr key={property.id}>
                  <td className="px-5 py-4 font-mono text-xs text-slate-600">{property.numero}</td>
                  <td className="px-5 py-4 font-medium text-slate-900">{property.produtor}</td>
                  <td className="px-5 py-4">{property.resultado}</td>
                  <td className="px-5 py-4"><Badge value={property.criticidade} /></td>
                  <td className="px-5 py-4">
                    {decisions[property.id] ? <Badge value={decisions[property.id].status} /> : <span className="text-slate-500">Pendente</span>}
                  </td>
                  <td className="px-5 py-4">{history.filter((item) => item.propertyId === property.id).length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </Layout>
  );
}

function Metric({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <article className="panel p-5">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded bg-gov-green-soft text-gov-green">
        {icon}
      </div>
      <p className="text-sm text-slate-500">{label}</p>
      <strong className="mt-1 block text-2xl text-gov-text">{value}</strong>
    </article>
  );
}
