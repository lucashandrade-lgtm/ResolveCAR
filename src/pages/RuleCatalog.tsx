import { useState } from "react";
import { BookOpenCheck, ChevronDown, Filter } from "lucide-react";
import { Layout } from "../components/Layout";
import { Badge } from "../components/Status";
import { rules } from "../data";
import type { Rule } from "../types";

export function RuleCatalog() {
  const [selected, setSelected] = useState<Rule | null>(rules[0] ?? null);

  return (
    <Layout breadcrumb={<span>Dashboard / Catalogo de Regras</span>}>
      <section className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-sm font-semibold uppercase tracking-wide text-gov-green">Catalogo institucional</span>
          <h1 className="mt-1 text-2xl font-bold text-gov-text">Regras do Motor de Conformidade Ambiental</h1>
          <p className="mt-2 max-w-3xl text-sm text-slate-600">
            Regras geoespaciais baseadas na Lei Federal 12.651/2012, Decreto 7.830/2012 e manuais do Servico Florestal Brasileiro.
          </p>
        </div>
        <button className="btn-secondary">
          <Filter size={16} className="mr-2" /> Filtrar
        </button>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <section className="panel overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[920px] text-left text-sm">
              <thead className="bg-gov-gray text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-5 py-3">ID</th>
                  <th className="px-5 py-3">Nome</th>
                  <th className="px-5 py-3">Fundamentacao</th>
                  <th className="px-5 py-3">Artigo</th>
                  <th className="px-5 py-3">Criticidade</th>
                  <th className="px-5 py-3">Categoria</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rules.map((rule) => (
                  <tr key={rule.id} className="cursor-pointer transition hover:bg-gov-green-soft/50" onClick={() => setSelected(rule)}>
                    <td className="px-5 py-4 font-mono font-semibold text-gov-green">{rule.id}</td>
                    <td className="px-5 py-4 font-medium text-slate-900">{rule.nome}</td>
                    <td className="px-5 py-4">{rule.fundamentacaoLegal}</td>
                    <td className="px-5 py-4">{rule.artigo}</td>
                    <td className="px-5 py-4"><Badge value={rule.criticidade} /></td>
                    <td className="px-5 py-4">{category(rule.id)}</td>
                    <td className="px-5 py-4"><Badge value="Ativa" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <aside className="panel">
          <header className="panel-header">
            <BookOpenCheck size={20} className="text-gov-green" />
            <h2 className="font-semibold">Detalhes da regra</h2>
          </header>
          {selected ? (
            <div className="space-y-4 p-5">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <strong className="font-mono text-gov-green">{selected.id}</strong>
                  <Badge value={selected.criticidade} />
                </div>
                <h3 className="text-lg font-semibold text-gov-text">{selected.nome}</h3>
                <p className="mt-2 text-sm text-slate-600">{selected.descricao}</p>
              </div>
              <Detail label="Entrada" value={selected.entrada} />
              <Detail label="Condicao" value={selected.condicao} />
              <Detail label="Resultado" value={selected.resultado} />
              <Detail label="Mensagem Tecnica" value={selected.mensagemTecnica} />
              <Detail label="Mensagem Simplificada" value={selected.mensagemSimplificada} />
            </div>
          ) : (
            <div className="p-5 text-sm text-slate-500">Selecione uma regra.</div>
          )}
          <button className="flex w-full items-center justify-center gap-2 border-t border-slate-200 py-3 text-sm font-semibold text-gov-green">
            <ChevronDown size={16} /> Auditoria da regra
          </button>
        </aside>
      </div>
    </Layout>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-slate-200 bg-gov-gray p-3">
      <p className="text-xs font-semibold uppercase text-slate-500">{label}</p>
      <p className="mt-1 text-sm text-slate-700">{value}</p>
    </div>
  );
}

function category(id: string) {
  if (id.startsWith("RL")) return "Reserva Legal";
  if (id.startsWith("APP")) return "APP";
  if (id.startsWith("MT")) return "Marco temporal";
  return "Topologia";
}
