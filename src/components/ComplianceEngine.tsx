import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, CircleDashed, Database, FileText, XCircle } from "lucide-react";
import { Badge } from "./Status";
import type { PropertyCase, Rule } from "../types";

export function ComplianceEngine({ property, rules }: { property: PropertyCase; rules: Rule[] }) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const baseSteps = ["Inicializando...", "Conectando as bases...", "SICAR", "SIGEF", "MapBiomas", "INPE", "IBGE", "Executando regras..."];
  const reportSteps = ["Gerando relatorio...", "Concluido em 2,3 segundos."];
  const totalSteps = baseSteps.length + rules.length + reportSteps.length;

  useEffect(() => {
    setStep(0);
    setDone(false);
    const timer = window.setInterval(() => {
      setStep((current) => {
        if (current >= totalSteps) {
          window.clearInterval(timer);
          setDone(true);
          return current;
        }
        return current + 1;
      });
    }, 260);

    return () => window.clearInterval(timer);
  }, [rules, totalSteps]);

  const hasCritical = useMemo(() => rules.some((rule) => property.regrasDisparadas.includes(rule.id)), [property, rules]);
  const visibleRuleCount = Math.max(0, Math.min(rules.length, step - baseSteps.length));

  return (
    <section className="panel">
      <div className="border-b border-slate-200 px-5 py-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-gov-text">GeoCompliance Engine</h2>
            <p className="text-sm text-slate-500">{done ? "Recomendacao tecnica gerada" : step < baseSteps.length ? baseSteps[Math.max(0, step - 1)] : "Executando regras..."}</p>
          </div>
          <div className="h-2 w-64 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-gov-green transition-all duration-500" style={{ width: `${(step / totalSteps) * 100}%` }} />
          </div>
        </div>
      </div>

      <div className="grid gap-5 p-5">
        <div className="rounded-lg border border-slate-200 bg-gov-gray p-4">
          <p className="mb-3 text-xs font-semibold uppercase text-slate-500">Execucao simulada</p>
          <div className="mb-5 space-y-2">
            {baseSteps.slice(0, 8).map((label, index) => {
              const visible = step > index;
              const baseName = index >= 2 && index <= 6;
              return (
                <div key={label} className="flex items-center gap-3 rounded-md bg-white px-3 py-2 ring-1 ring-slate-100">
                  {visible ? <CheckCircle2 className={baseName ? "text-gov-green" : "text-gov-blue"} size={18} /> : <CircleDashed className="text-slate-300" size={18} />}
                  {baseName ? <Database size={16} className="text-slate-400" /> : null}
                  <span className="text-sm text-slate-700">{label}</span>
                </div>
              );
            })}
          </div>
          <p className="mb-3 text-xs font-semibold uppercase text-slate-500">Regras utilizadas nesta analise</p>
          <div className="space-y-2">
            {rules.map((rule, index) => {
              const visible = index < visibleRuleCount;
              const triggered = property.regrasDisparadas.includes(rule.id);
              return (
                <div key={rule.id} className="flex items-center gap-3 rounded-md bg-white px-3 py-2 ring-1 ring-slate-100">
                  {visible ? (
                    triggered ? <XCircle className="text-gov-red" size={19} /> : <CheckCircle2 className="text-gov-green" size={19} />
                  ) : (
                    <CircleDashed className={step >= baseSteps.length ? "animate-spin text-slate-400" : "text-slate-300"} size={19} />
                  )}
                  <span className="font-mono text-sm">{rule.id}</span>
                  <span className="truncate text-sm text-slate-600">{visible ? `${rule.nome} - versao ${rule.versao}` : "Aguardando validacao"}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-5 space-y-2">
            {reportSteps.map((label, index) => {
              const visible = step > baseSteps.length + rules.length + index;
              return (
                <div key={label} className="flex items-center gap-3 rounded-md bg-white px-3 py-2 ring-1 ring-slate-100">
                  {visible ? <CheckCircle2 className="text-gov-green" size={18} /> : <CircleDashed className="text-slate-300" size={18} />}
                  <span className="text-sm text-slate-700">{label}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          {done ? (
            <div className="rounded-lg border border-green-100 bg-gov-green-soft p-4">
              <div className="mb-3 flex items-center gap-2 text-gov-green">
                <FileText size={20} />
                <h3 className="font-semibold">Relatorio tecnico de recomendacao</h3>
              </div>
              <dl className="grid gap-3 text-sm sm:grid-cols-2">
                <Info label="Indice de Convergencia entre Bases" value={`${property.convergencia}%`} />
                <Info label="Criticidade" value={property.criticidade} />
                <Info label="Tempo da analise" value={property.tempoAnalise} />
                <Info label="Regras executadas" value={String(property.regrasExecutadas.length)} />
                <Info label="Bases consultadas" value="SICAR, SIGEF, IBGE, MapBiomas, INPE" />
                <Info label="Parecer sugerido" value={property.resultado} />
              </dl>
            </div>
          ) : null}

          <div className="space-y-3">
            {rules.map((rule) => (
              <article key={rule.id} className="rounded-lg border border-slate-200 p-4 transition duration-200 hover:border-green-200 hover:shadow-panel">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <strong className="font-mono text-sm text-gov-text">{rule.id}</strong>
                  <span className="rounded-full bg-slate-100 px-2 py-1 font-mono text-xs text-slate-600" title="Versao da regra usada nesta execucao">v{rule.versao}</span>
                  <Badge value={property.regrasDisparadas.includes(rule.id) ? rule.resultado : "Conforme"} />
                  <Badge value={rule.criticidade} />
                </div>
                <h3 className="font-semibold text-slate-900">{rule.nome}</h3>
                <p className="mt-1 text-sm text-slate-600">{rule.descricao}</p>
                <p className="mt-3 text-sm"><strong>Fundamentacao:</strong> {rule.fundamentacaoLegal}, {rule.artigo}</p>
                <p className="mt-2 text-sm text-slate-700">{rule.mensagemTecnica}</p>
                <p className="mt-2 rounded-md bg-gov-gray p-3 text-sm text-slate-600">{rule.mensagemSimplificada}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase text-slate-500">{label}</dt>
      <dd className="mt-1 font-semibold text-slate-900">{value}</dd>
    </div>
  );
}
