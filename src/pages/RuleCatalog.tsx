import { useMemo, useState } from "react";
import { BookOpenCheck, Copy, Filter, History, Pencil, Plus, Search, X } from "lucide-react";
import { Layout } from "../components/Layout";
import { Badge } from "../components/Status";
import { useAppState } from "../store/AppState";
import type { Criticidade, Rule, RuleStatus } from "../types";

const categories = ["Todas", "APP", "Reserva Legal", "Marco Temporal", "Topologia", "Sobreposicao", "Estadual"];
const statuses: RuleStatus[] = ["Ativa", "Em revisao", "Desativada", "Experimental"];
const criticities: Criticidade[] = ["Baixa", "Media", "Alta", "Critica"];

const emptyRule: Rule = {
  id: "",
  nome: "",
  categoria: "APP",
  descricao: "",
  fundamentacaoLegal: "",
  artigo: "",
  criticidade: "Media",
  entrada: "",
  condicao: "",
  resultado: "",
  mensagemTecnica: "",
  mensagemSimplificada: "",
  status: "Experimental",
  versao: "1.0",
  dataCriacao: "",
  ultimaAtualizacao: "",
  observacoes: ""
};

export function RuleCatalog() {
  const { rules, addRule, editRule, duplicateRule, setRuleStatus } = useAppState();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todas");
  const [editing, setEditing] = useState<{ originalId?: string; rule: Rule } | null>(null);
  const [historyRule, setHistoryRule] = useState<Rule | null>(null);

  const filteredRules = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return rules.filter((rule) => {
      const matchesCategory = category === "Todas" || rule.categoria === category;
      const searchable = [rule.id, rule.nome, rule.categoria, rule.fundamentacaoLegal, rule.artigo, rule.status].join(" ").toLowerCase();
      return matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [category, query, rules]);

  function openNewRule() {
    const today = new Date().toLocaleDateString("pt-BR");
    setEditing({ rule: { ...emptyRule, dataCriacao: today, ultimaAtualizacao: today } });
  }

  function saveRule(rule: Rule) {
    if (editing?.originalId) {
      editRule(editing.originalId, rule);
    } else {
      addRule(rule);
    }
    setEditing(null);
  }

  return (
    <Layout breadcrumb={<span>Dashboard / Catalogo de Regras</span>}>
      <section className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-sm font-semibold uppercase tracking-wide text-gov-green">Catalogo institucional</span>
          <h1 className="mt-1 text-2xl font-bold text-gov-text">Catalogo de Regras</h1>
          <p className="mt-2 max-w-3xl text-sm text-slate-600">
            Regras abertas, versionadas e evolutivas. O motor executa essas regras e gera recomendacoes tecnicas, sem substituir a decisao da analista.
          </p>
        </div>
        <button className="btn-primary" onClick={openNewRule} title="Cadastrar nova regra em memoria">
          <Plus size={16} className="mr-2" /> Nova Regra
        </button>
      </section>

      <section className="panel mb-6 p-4">
        <div className="grid gap-3 lg:grid-cols-[1fr_260px]">
          <label className="flex h-10 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-500">
            <Search size={17} />
            <input
              className="h-full flex-1 bg-transparent text-slate-800 outline-none"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por ID, nome, lei, artigo ou status"
            />
          </label>
          <label className="flex h-10 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-500">
            <Filter size={17} />
            <select className="h-full flex-1 bg-transparent text-slate-800 outline-none" value={category} onChange={(event) => setCategory(event.target.value)}>
              {categories.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
        </div>
      </section>

      <section className="panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1180px] text-left text-sm">
            <thead className="bg-gov-gray text-xs uppercase text-slate-500">
              <tr>
                <th className="px-5 py-3">ID</th>
                <th className="px-5 py-3">Nome</th>
                <th className="px-5 py-3">Categoria</th>
                <th className="px-5 py-3">Lei</th>
                <th className="px-5 py-3">Artigo</th>
                <th className="px-5 py-3">Criticidade</th>
                <th className="px-5 py-3">Versao</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Data de criacao</th>
                <th className="px-5 py-3">Ultima atualizacao</th>
                <th className="px-5 py-3 text-right">Acoes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRules.map((rule) => (
                <tr key={rule.id} className="transition hover:bg-gov-green-soft/50">
                  <td className="px-5 py-4 font-mono font-semibold text-gov-green">{rule.id}</td>
                  <td className="px-5 py-4 font-medium text-slate-900">{rule.nome}</td>
                  <td className="px-5 py-4"><Badge value={rule.categoria ?? "Topologia"} /></td>
                  <td className="px-5 py-4">{rule.fundamentacaoLegal}</td>
                  <td className="px-5 py-4">{rule.artigo}</td>
                  <td className="px-5 py-4"><Badge value={rule.criticidade} /></td>
                  <td className="px-5 py-4 font-mono">{rule.versao}</td>
                  <td className="px-5 py-4">
                    <select
                      className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-semibold"
                      value={rule.status}
                      title="Alterar status da regra"
                      onChange={(event) => setRuleStatus(rule.id, event.target.value as RuleStatus)}
                    >
                      {statuses.map((item) => <option key={item}>{item}</option>)}
                    </select>
                  </td>
                  <td className="px-5 py-4">{rule.dataCriacao}</td>
                  <td className="px-5 py-4">{rule.ultimaAtualizacao}</td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button className="icon-button h-9 w-9" title="Editar regra" onClick={() => setEditing({ originalId: rule.id, rule })}>
                        <Pencil size={16} />
                      </button>
                      <button className="icon-button h-9 w-9" title="Duplicar regra" onClick={() => duplicateRule(rule)}>
                        <Copy size={16} />
                      </button>
                      <button className="icon-button h-9 w-9" title="Ver historico de versoes" onClick={() => setHistoryRule(rule)}>
                        <History size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="panel mt-6">
        <header className="panel-header">
          <BookOpenCheck size={20} className="text-gov-green" />
          <h2 className="font-semibold">Principio operacional</h2>
        </header>
        <p className="p-5 text-sm text-slate-700">
          Novas regras podem ser cadastradas, editadas, desativadas ou duplicadas em memoria. A demonstracao mostra um catalogo evolutivo sem alterar o nucleo do motor nem criar backend.
        </p>
      </section>

      {editing ? <RuleModal initial={editing.rule} onClose={() => setEditing(null)} onSave={saveRule} /> : null}
      {historyRule ? <HistoryModal rule={historyRule} onClose={() => setHistoryRule(null)} /> : null}
    </Layout>
  );
}

function RuleModal({ initial, onClose, onSave }: { initial: Rule; onClose: () => void; onSave: (rule: Rule) => void }) {
  const [rule, setRule] = useState<Rule>(initial);
  const requiredFilled = rule.id.trim() && rule.nome.trim() && rule.descricao.trim() && rule.fundamentacaoLegal.trim();

  function setField<K extends keyof Rule>(field: K, value: Rule[K]) {
    setRule((current) => ({ ...current, [field]: value }));
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-slate-950/40 p-4">
      <section className="my-auto flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-lg bg-white shadow-2xl animate-fade-up">
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-gov-text">{initial.id ? "Editar Regra" : "Nova Regra"}</h2>
            <p className="text-sm text-slate-500">Salvamento local em memoria para o MVP.</p>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Fechar modal"><X size={18} /></button>
        </header>
        <div className="grid flex-1 gap-4 overflow-y-auto p-6 md:grid-cols-2">
          <Field label="ID" value={rule.id} onChange={(value) => setField("id", value)} />
          <Field label="Nome" value={rule.nome} onChange={(value) => setField("nome", value)} />
          <SelectField label="Categoria" value={rule.categoria ?? "APP"} options={categories.filter((item) => item !== "Todas")} onChange={(value) => setField("categoria", value)} />
          <Field label="Lei" value={rule.fundamentacaoLegal} onChange={(value) => setField("fundamentacaoLegal", value)} />
          <Field label="Artigo" value={rule.artigo} onChange={(value) => setField("artigo", value)} />
          <SelectField label="Criticidade" value={rule.criticidade} options={criticities} onChange={(value) => setField("criticidade", value as Criticidade)} />
          <Field label="Entrada" value={rule.entrada} onChange={(value) => setField("entrada", value)} />
          <Field label="Condicao" value={rule.condicao} onChange={(value) => setField("condicao", value)} />
          <Field label="Resultado" value={rule.resultado} onChange={(value) => setField("resultado", value)} />
          <SelectField label="Status" value={rule.status ?? "Ativa"} options={statuses} onChange={(value) => setField("status", value as RuleStatus)} />
          <Field label="Versao" value={rule.versao ?? ""} onChange={(value) => setField("versao", value)} />
          <Field label="Data de criacao" value={rule.dataCriacao ?? ""} onChange={(value) => setField("dataCriacao", value)} />
          <Area label="Descricao" value={rule.descricao} onChange={(value) => setField("descricao", value)} />
          <Area label="Mensagem Tecnica" value={rule.mensagemTecnica} onChange={(value) => setField("mensagemTecnica", value)} />
          <Area label="Mensagem Simplificada" value={rule.mensagemSimplificada} onChange={(value) => setField("mensagemSimplificada", value)} />
          <Area label="Observacoes" value={rule.observacoes ?? ""} onChange={(value) => setField("observacoes", value)} />
        </div>
        <footer className="sticky bottom-0 flex justify-end gap-3 border-t border-slate-200 bg-white px-6 py-4">
          <button className="btn-secondary" onClick={onClose}>Cancelar</button>
          <button className="btn-primary disabled:cursor-not-allowed disabled:opacity-50" disabled={!requiredFilled} onClick={() => onSave(rule)}>Salvar Regra</button>
        </footer>
      </section>
    </div>
  );
}

function HistoryModal({ rule, onClose }: { rule: Rule; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-slate-950/40 p-4">
      <section className="my-auto w-full max-w-2xl rounded-lg bg-white shadow-2xl animate-fade-up">
        <header className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-gov-text">Historico da Regra {rule.id}</h2>
            <p className="text-sm text-slate-500">Versoes, autores, datas e alteracoes.</p>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Fechar historico"><X size={18} /></button>
        </header>
        <div className="space-y-3 p-6">
          {(rule.historico ?? []).map((item) => (
            <article key={`${item.versao}-${item.data}`} className="rounded-lg border border-slate-200 bg-gov-gray p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <strong className="font-mono text-gov-green">Versao {item.versao}</strong>
                <span className="text-xs text-slate-500">{item.data}</span>
              </div>
              <p className="mt-2 text-sm text-slate-700"><strong>Autor:</strong> {item.autor}</p>
              <p className="mt-1 text-sm text-slate-700">{item.alteracoes}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="text-sm font-semibold text-slate-700">
      {label}
      <input className="mt-1 h-10 w-full rounded-md border border-slate-300 px-3 font-normal outline-none focus:border-gov-green focus:ring-2 focus:ring-green-100" value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function Area({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="text-sm font-semibold text-slate-700">
      {label}
      <textarea className="mt-1 min-h-24 w-full rounded-md border border-slate-300 p-3 font-normal outline-none focus:border-gov-green focus:ring-2 focus:ring-green-100" value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function SelectField({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return (
    <label className="text-sm font-semibold text-slate-700">
      {label}
      <select className="mt-1 h-10 w-full rounded-md border border-slate-300 px-3 font-normal outline-none focus:border-gov-green focus:ring-2 focus:ring-green-100" value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((item) => <option key={item}>{item}</option>)}
      </select>
    </label>
  );
}
