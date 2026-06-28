import { Link, useParams } from "react-router-dom";
import type { ReactNode } from "react";
import { useState } from "react";
import { ArrowLeft, ClipboardCheck, Database, FileWarning, Gavel, Layers3, Map, MessageSquareText } from "lucide-react";
import { Layout } from "../components/Layout";
import { Badge } from "../components/Status";
import { ComplianceEngine } from "../components/ComplianceEngine";
import { CommunicationModal } from "../components/CommunicationModal";
import { MockMap } from "../components/MockMap";
import { getAnalysis, sources, timeline } from "../data";
import { useAppState } from "../store/AppState";
import type { FinalDecisionStatus } from "../types";

export function Investigation() {
  const { id = "" } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [decisionStatus, setDecisionStatus] = useState<FinalDecisionStatus>("Solicitar Retificacao");
  const [justification, setJustification] = useState("Parecer sugerido revisado pela analista. A decisao final considera regras aplicadas, evidencias e autonomia tecnica do orgao ambiental.");
  const { decisions, getCase, getRules, history, updateDecision } = useAppState();
  const property = getCase(id);

  if (!property) {
    return (
      <Layout>
        <div className="rounded border border-slate-200 bg-white p-8">Processo nao encontrado.</div>
      </Layout>
    );
  }

  const analysis = getAnalysis(property.id)!;
  const executedRules = getRules(property.regrasExecutadas);
  const decision = decisions[property.id];
  const processHistory = history.filter((item) => item.propertyId === property.id);
  const canSaveDecision = justification.trim().length >= 80;

  return (
    <Layout
      breadcrumb={
        <span>
          <Link to="/" className="text-gov-green">Dashboard</Link> / Processo / {property.numero}
        </span>
      }
    >
      <section className="mb-6 rounded border border-slate-200 bg-white p-5 shadow-panel">
        <Link to="/" className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-gov-green">
          <ArrowLeft size={17} /> Voltar para fila
        </Link>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs text-slate-500">{property.numero}</p>
            <h1 className="mt-1 text-2xl font-bold text-gov-text">{property.produtor}</h1>
            <p className="mt-2 max-w-3xl text-sm text-slate-600">{property.resumo}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge value={property.criticidade} />
            <Badge value={property.status} />
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <Panel title="Resumo" icon={<ClipboardCheck size={20} />}>
            <div className="grid gap-3 sm:grid-cols-3">
              <Fact label="Municipio" value={`${property.municipio} - ${property.uf}`} />
              <Fact label="Area total" value={property.areaTotal} />
              <Fact label="Area afetada" value={property.areaAfetada} />
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {Object.entries(property.detalhes).map(([key, value]) => (
                <Fact key={key} label={formatLabel(key)} value={value} />
              ))}
            </div>
          </Panel>

          <Panel title="Diagnostico" icon={<FileWarning size={20} />}>
            <div className="grid gap-3 md:grid-cols-3">
              <Fact label="Tipo do conflito" value={property.tipo} />
              <Fact label="Bases consultadas" value="5 bases oficiais" />
              <Fact label="Regras executadas" value={property.regrasExecutadas.join(", ")} />
              <Fact label="Criticidade" value={property.criticidade} />
              <Fact label="Status" value={property.status} />
              <Fact label="Resultado" value={property.resultado} />
            </div>
          </Panel>

          <Panel title="Hipoteses" icon={<Layers3 size={20} />}>
            <ol className="space-y-3">
              {analysis.hipoteses.map((item) => (
                <li key={item} className="rounded border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">{item}</li>
              ))}
            </ol>
          </Panel>

          <ComplianceEngine property={property} rules={executedRules} />

          <Panel title="Linha do Tempo" icon={<Map size={20} />}>
            <div className="grid gap-4 md:grid-cols-5">
              {timeline.map((item) => (
                <article key={item.ano} className="overflow-hidden rounded border border-slate-200 bg-white">
                  <div className="h-24 bg-cover bg-center" style={{ backgroundImage: `url(${item.imagem})` }} />
                  <div className="p-3">
                    <strong className="text-gov-green">{item.ano}</strong>
                    <p className="mt-1 text-sm text-slate-700">{item.evento}</p>
                    <p className="mt-2 text-xs text-slate-500">{item.fonte}</p>
                  </div>
                </article>
              ))}
            </div>
          </Panel>

          <Panel title="Tomada de Decisao" icon={<Gavel size={20} />}>
            <div className="mb-5 rounded-lg border border-blue-100 bg-gov-blue-soft p-4 text-sm text-slate-700">
              O GeoCompliance Engine nao decide. Ele executa regras geoespaciais, registra evidencias e apresenta recomendacao tecnica. A decisao oficial pertence a Luana, analista ambiental responsavel.
            </div>
            <div className="grid gap-5 xl:grid-cols-2">
              <div className="rounded-lg border border-slate-200 bg-gov-gray p-4">
                <h3 className="font-semibold text-gov-text">Recomendacao do GeoCompliance Engine</h3>
                <div className="mt-4 grid gap-3">
                  <Fact label="Resultado das regras" value={property.resultado} />
                  <Fact label="Criticidade" value={property.criticidade} />
                  <Fact label="Conflitos" value={property.tipo} />
                  <Fact label="Fundamentacao" value={analysis.fundamentacaoJuridica} />
                  <Fact label="Parecer sugerido" value={analysis.recomendacaoTecnica} />
                </div>
              </div>
              <div className="rounded-lg border border-green-100 bg-gov-green-soft p-4">
                <h3 className="font-semibold text-gov-text">Decisao Final da Analista</h3>
                <fieldset className="mt-4 space-y-2">
                  {(["Aprovar Cadastro", "Aprovar com Ressalvas", "Solicitar Retificacao", "Encaminhar para Revisao Tecnica", "Indeferir Cadastro"] as FinalDecisionStatus[]).map((option) => (
                    <label key={option} className="flex cursor-pointer items-center gap-3 rounded-md bg-white px-3 py-2 text-sm ring-1 ring-slate-200">
                      <input type="radio" name="decision" value={option} checked={decisionStatus === option} onChange={() => setDecisionStatus(option)} />
                      {option}
                    </label>
                  ))}
                </fieldset>
                <label className="mt-4 block text-sm font-semibold text-slate-700" htmlFor="parecer">Justificativa Tecnica obrigatoria</label>
                <textarea
                  id="parecer"
                  className="mt-2 min-h-32 w-full rounded-md border border-slate-300 p-3 text-sm outline-none focus:border-gov-green focus:ring-2 focus:ring-green-100"
                  value={justification}
                  onChange={(event) => setJustification(event.target.value)}
                />
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className={canSaveDecision ? "text-gov-green" : "text-gov-red"}>{justification.trim().length}/80 caracteres minimos</span>
                  <span className="text-slate-500">Responsavel: Luana</span>
                </div>
                {decision ? (
                  <div className="mt-3 rounded-md bg-white p-3 text-sm ring-1 ring-green-100">
                    <p><strong>Status escolhido:</strong> {decision.status}</p>
                    <p><strong>Data e hora:</strong> {decision.data} as {decision.hora}</p>
                  </div>
                ) : null}
                <button className="btn-primary mt-3 disabled:cursor-not-allowed disabled:opacity-50" disabled={!canSaveDecision} onClick={() => updateDecision(property.id, decisionStatus, justification)}>
                  Salvar Decisao
                </button>
                <button className="btn-secondary mt-3 ml-2" onClick={() => setModalOpen(true)}>Registrar Parecer e Comunicar</button>
              </div>
            </div>
          </Panel>

          <Panel title="Historico do Processo" icon={<Gavel size={20} />}>
            <div className="space-y-3">
              {processHistory.map((item, index) => (
                <div key={`${item.label}-${index}`} className="flex gap-3 rounded-lg border border-slate-200 bg-white p-3">
                  <span className="mt-1 h-3 w-3 rounded-full bg-gov-green" />
                  <div>
                    <p className="font-semibold text-gov-text">{item.label}</p>
                    <p className="text-sm text-slate-600">{item.detail}</p>
                    <p className="mt-1 text-xs text-slate-500">{item.data} as {item.hora}</p>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Comunicacao ao Produtor" icon={<MessageSquareText size={20} />}>
            <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-3">
                <Fact label="Texto tecnico" value={analysis.comunicacaoTecnica} />
                <Fact label="Texto simplificado" value={analysis.comunicacaoSimplificada} />
                <div className="rounded border border-slate-200 bg-slate-50 p-4">
                  <p className="mb-2 text-sm font-semibold text-slate-800">Checklist</p>
                  <ul className="space-y-2 text-sm text-slate-700">
                    {analysis.checklist.map((item) => <li key={item}>□ {item}</li>)}
                  </ul>
                </div>
              </div>
              <MockMap center={property.coordenadas} title="Mapa ilustrativo do comunicado" />
            </div>
          </Panel>
        </div>

        <aside className="space-y-4">
          <Panel title="Painel de Evidencias" icon={<Database size={20} />}>
            <div className="space-y-3">
              {sources.map((source) => (
                <details key={source.id} className="rounded border border-slate-200 bg-white p-3">
                  <summary className="cursor-pointer list-none">
                    <div className="flex items-center justify-between gap-2">
                      <strong className="text-sm text-gov-text">{source.nome}</strong>
                      <Badge value={source.confiabilidade} />
                    </div>
                    <p className="mt-1 text-xs text-slate-500">Atualizado em {source.ultimaAtualizacao}</p>
                    <span className="mt-3 inline-flex h-8 items-center rounded-md bg-gov-green px-3 text-xs font-semibold text-white">
                      Ver Evidencia
                    </span>
                  </summary>
                  <dl className="mt-3 space-y-2 text-sm">
                    <Fact label="Escala" value={source.escala} />
                    <Fact label="Precisao" value={source.precisao} />
                    <Fact label="Responsavel" value={source.responsavel} />
                  </dl>
                  <div className="mt-3">
                    <MockMap center={source.coordenadas} title={`Evidencia ${source.nome}`} />
                  </div>
                </details>
              ))}
            </div>
          </Panel>
        </aside>
      </div>
      <CommunicationModal open={modalOpen} onClose={() => setModalOpen(false)} property={property} analysis={analysis} />
    </Layout>
  );
}

function Panel({ title, icon, children }: { title: string; icon: ReactNode; children: ReactNode }) {
  return (
    <section className="panel">
      <header className="panel-header">
        {icon}
        <h2 className="font-semibold">{title}</h2>
      </header>
      <div className="p-5">{children}</div>
    </section>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="soft-field">
      <dt className="text-xs font-semibold uppercase text-slate-500">{label}</dt>
      <dd className="mt-1 text-sm text-slate-800">{value}</dd>
    </div>
  );
}

function formatLabel(value: string) {
  return value.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase());
}
