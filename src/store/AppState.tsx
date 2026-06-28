import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { properties as initialProperties, rules as initialRules } from "../data";
import type { DecisionRecord, FinalDecisionStatus, ProcessHistoryItem, PropertyCase, Rule, RuleStatus } from "../types";

type Toast = { id: number; message: string; tone: "success" | "info" | "warning" };

type AppState = {
  properties: PropertyCase[];
  rules: Rule[];
  decisions: Record<string, DecisionRecord>;
  history: ProcessHistoryItem[];
  toasts: Toast[];
  getCase: (id: string) => PropertyCase | undefined;
  getRules: (ids: string[]) => Rule[];
  updateDecision: (propertyId: string, status: FinalDecisionStatus, justificativa: string) => void;
  addRule: (rule: Rule) => void;
  editRule: (originalId: string, rule: Rule) => void;
  duplicateRule: (rule: Rule) => void;
  setRuleStatus: (id: string, status: RuleStatus) => void;
  addHistory: (propertyId: string, label: string, detail: string) => void;
  showToast: (message: string, tone?: Toast["tone"]) => void;
  dismissToast: (id: number) => void;
};

const Context = createContext<AppState | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [properties, setProperties] = useState<PropertyCase[]>(initialProperties);
  const [rules, setRules] = useState<Rule[]>(() => initialRules.map(enrichRule));
  const [decisions, setDecisions] = useState<Record<string, DecisionRecord>>({});
  const [history, setHistory] = useState<ProcessHistoryItem[]>(() =>
    initialProperties.flatMap((property) => [
      makeHistory(property.id, "GeoCompliance executado", `${property.regrasExecutadas.length} regras geoespaciais aplicadas.`),
      makeHistory(property.id, "Recomendacao gerada", `Parecer sugerido: ${property.resultado}.`)
    ])
  );
  const [toasts, setToasts] = useState<Toast[]>([]);

  function showToast(message: string, tone: Toast["tone"] = "success") {
    const id = Date.now();
    setToasts((items) => [...items, { id, message, tone }]);
    window.setTimeout(() => dismissToast(id), 3200);
  }

  function dismissToast(id: number) {
    setToasts((items) => items.filter((toast) => toast.id !== id));
  }

  function updateDecision(propertyId: string, status: FinalDecisionStatus, justificativa: string) {
    const now = nowParts();
    const record: DecisionRecord = { propertyId, status, justificativa, responsavel: "Luana", data: now.data, hora: now.hora };
    setDecisions((items) => ({ ...items, [propertyId]: record }));
    setProperties((items) => items.map((property) => (property.id === propertyId ? { ...property, status, resultado: status } : property)));
    setHistory((items) => [
      ...items,
      { propertyId, label: `Luana alterou para "${status}"`, detail: justificativa, data: now.data, hora: now.hora }
    ]);
    showToast("Decisao final registrada no historico.", "success");
  }

  function addRule(rule: Rule) {
    const enriched = enrichRule(rule);
    setRules((items) => [enriched, ...items]);
    showToast("Regra cadastrada em memoria.", "success");
  }

  function editRule(originalId: string, rule: Rule) {
    const now = nowParts();
    setRules((items) =>
      items.map((item) =>
        item.id === originalId
          ? {
              ...rule,
              dataCriacao: rule.dataCriacao ?? item.dataCriacao,
              ultimaAtualizacao: now.data,
              historico: [
                ...(item.historico ?? []),
                { versao: rule.versao ?? "1.0", autor: "Luana", data: now.data, alteracoes: "Edicao administrativa simulada." }
              ]
            }
          : item
      )
    );
    showToast("Regra atualizada em memoria.", "success");
  }

  function duplicateRule(rule: Rule) {
    const copy = enrichRule({ ...rule, id: `${rule.id}-COPIA`, nome: `${rule.nome} (copia)`, status: "Experimental" });
    setRules((items) => [copy, ...items]);
    showToast("Regra duplicada como experimental.", "info");
  }

  function setRuleStatus(id: string, status: RuleStatus) {
    setRules((items) => items.map((rule) => (rule.id === id ? { ...rule, status } : rule)));
    showToast(`Status da regra alterado para ${status}.`, "warning");
  }

  function addHistory(propertyId: string, label: string, detail: string) {
    const now = nowParts();
    setHistory((items) => [...items, { propertyId, label, detail, data: now.data, hora: now.hora }]);
  }

  const value = useMemo<AppState>(
    () => ({
      properties,
      rules,
      decisions,
      history,
      toasts,
      getCase: (id) => properties.find((property) => property.id === id),
      getRules: (ids) => ids.map((id) => rules.find((rule) => rule.id === id)).filter(Boolean) as Rule[],
      updateDecision,
      addRule,
      editRule,
      duplicateRule,
      setRuleStatus,
      addHistory,
      showToast,
      dismissToast
    }),
    [properties, rules, decisions, history, toasts]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useAppState() {
  const value = useContext(Context);
  if (!value) {
    throw new Error("useAppState must be used inside AppStateProvider");
  }
  return value;
}

function enrichRule(rule: Rule): Rule {
  return {
    ...rule,
    categoria: rule.categoria ?? category(rule.id),
    status: rule.status ?? "Ativa",
    versao: rule.versao ?? version(rule.id),
    dataCriacao: rule.dataCriacao ?? "12/03/2024",
    ultimaAtualizacao: rule.ultimaAtualizacao ?? "18/06/2026",
    observacoes: rule.observacoes ?? "Regra aberta e versionada para demonstracao.",
    historico: rule.historico ?? [
      { versao: "1.0", autor: "Equipe CAR", data: "12/03/2024", alteracoes: "Criacao da regra." },
      { versao: "1.1", autor: "Servico Florestal", data: "20/08/2025", alteracoes: "Ajuste de texto tecnico." },
      { versao: version(rule.id), autor: "Luana", data: "18/06/2026", alteracoes: "Versao em uso na simulacao." }
    ]
  };
}

function category(id: string) {
  if (id.startsWith("RL")) return "Reserva Legal";
  if (id.startsWith("APP")) return "APP";
  if (id.startsWith("MT")) return "Marco Temporal";
  if (id === "TOP003") return "Sobreposicao";
  return "Topologia";
}

function version(id: string) {
  if (id === "RL001") return "2.1";
  if (id === "APP001") return "1.3";
  if (id === "MT002") return "3.0";
  return "1.0";
}

function makeHistory(propertyId: string, label: string, detail: string): ProcessHistoryItem {
  return { propertyId, label, detail, data: "28/06/2026", hora: "09:30" };
}

function nowParts() {
  const now = new Date();
  return {
    data: now.toLocaleDateString("pt-BR"),
    hora: now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
  };
}
