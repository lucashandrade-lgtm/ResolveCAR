import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { AlertTriangle, CheckCircle2, Clock3, FileSearch, FolderKanban, MapPinned, Send } from "lucide-react";
import { Layout } from "../components/Layout";
import { Badge } from "../components/Status";
import { properties } from "../data";

export function Dashboard() {
  const critical = properties.filter((item) => item.criticidade === "Alta" || item.criticidade === "Critica").length;

  return (
    <Layout>
      <section className="mb-6 flex flex-col gap-2">
        <span className="text-sm font-semibold uppercase tracking-wide text-gov-green">Painel da analista</span>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gov-text">Fila de validacao ambiental</h1>
            <p className="mt-1 max-w-3xl text-sm text-slate-600">
              Triagem simulada de Cadastros Ambientais Rurais com evidencias, regras aplicadas e recomendacao tecnica.
            </p>
          </div>
          <span className="rounded border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">Ambiente demonstrativo</span>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <Metric icon={<FolderKanban size={20} />} label="Processos Pendentes" value="3" tone="green" />
        <Metric icon={<AlertTriangle size={20} />} label="Conflitos Criticos" value={String(critical)} tone="red" />
        <Metric icon={<Clock3 size={20} />} label="Tempo Medio de Analise" value="03m 23s" tone="blue" />
        <Metric icon={<Send size={20} />} label="Comunicacoes Enviadas" value="8" tone="cyan" />
        <Metric icon={<CheckCircle2 size={20} />} label="Processos Concluidos" value="21" tone="green" />
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="panel p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-gov-text">Distribuicao por criticidade</h2>
              <p className="text-sm text-slate-500">Indicador demonstrativo da fila estadual.</p>
            </div>
            <FileSearch className="text-gov-green" size={22} />
          </div>
          <div className="space-y-4">
            <ChartBar label="Alta" value={38} color="bg-gov-red" />
            <ChartBar label="Media" value={46} color="bg-gov-yellow" />
            <ChartBar label="Baixa" value={16} color="bg-gov-green" />
          </div>
        </div>
        <div className="panel p-5">
          <h2 className="font-semibold text-gov-text">Rastreabilidade operacional</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-700">
            <p className="rounded-md bg-gov-green-soft p-3">5 bases oficiais consultadas por processo.</p>
            <p className="rounded-md bg-gov-blue-soft p-3">11 regras ambientais cadastradas no motor.</p>
            <p className="rounded-md bg-white p-3 ring-1 ring-slate-200">Pareceres registrados com protocolo simulado.</p>
          </div>
        </div>
      </section>

      <section className="panel mt-6 overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <h2 className="font-semibold text-gov-text">Processos em triagem</h2>
            <p className="text-sm text-slate-500">Exatamente 3 processos mockados para a demonstracao.</p>
          </div>
          <MapPinned className="text-gov-green" size={22} />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[880px] text-left text-sm">
            <thead className="bg-gov-gray text-xs uppercase text-slate-500">
              <tr>
                <th className="px-5 py-3">Numero</th>
                <th className="px-5 py-3">Produtor</th>
                <th className="px-5 py-3">Municipio</th>
                <th className="px-5 py-3">Tipo</th>
                <th className="px-5 py-3">Criticidade</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Acao</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {properties.map((item) => (
                <tr key={item.id} className="transition hover:bg-gov-green-soft/50">
                  <td className="px-5 py-4 font-mono text-xs text-slate-600">{item.numero}</td>
                  <td className="px-5 py-4 font-medium text-slate-900">{item.produtor}</td>
                  <td className="px-5 py-4">{item.municipio} - {item.uf}</td>
                  <td className="px-5 py-4">{item.tipo}</td>
                  <td className="px-5 py-4"><Badge value={item.criticidade} /></td>
                  <td className="px-5 py-4"><Badge value={item.status} /></td>
                  <td className="px-5 py-4 text-right">
                    <Link className="btn-primary" to={`/processos/${item.id}`}>
                      Investigar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </Layout>
  );
}

function Metric({ icon, label, value, tone }: { icon: ReactNode; label: string; value: string; tone: string }) {
  const tones: Record<string, string> = {
    blue: "text-gov-blue bg-gov-blue-soft",
    red: "text-gov-red bg-red-50",
    green: "text-gov-green bg-gov-green-soft",
    cyan: "text-gov-cyan bg-cyan-50"
  };

  return (
    <article className="panel p-5 transition duration-200 hover:-translate-y-0.5">
      <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded ${tones[tone]}`}>
        {icon}
      </div>
      <p className="text-sm text-slate-500">{label}</p>
      <strong className="mt-1 block text-2xl text-gov-text">{value}</strong>
    </article>
  );
}

function ChartBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-sm">
        <span className="font-medium text-slate-700">{label}</span>
        <span className="text-slate-500">{value}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-100">
        <div className={`h-full rounded-full ${color} transition-all duration-700`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
