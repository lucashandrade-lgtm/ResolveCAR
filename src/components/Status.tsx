import type { Criticidade } from "../types";

const styles: Record<string, string> = {
  Baixa: "bg-slate-100 text-slate-700 ring-slate-200",
  Media: "bg-amber-50 text-amber-800 ring-amber-200",
  Alta: "bg-red-50 text-gov-red ring-red-200",
  Critica: "bg-red-100 text-gov-red ring-red-300",
  AltaConfianca: "bg-gov-green-soft text-gov-green ring-green-200",
  Conforme: "bg-gov-green-soft text-gov-green ring-green-200",
  "Nao Conforme": "bg-red-50 text-gov-red ring-red-200",
  "Necessita retificacao": "bg-amber-50 text-amber-800 ring-amber-200",
  "Conflito Critico": "bg-red-100 text-gov-red ring-red-300",
  Entregue: "bg-gov-blue-soft text-gov-blue ring-blue-200",
  Lido: "bg-gov-green-soft text-gov-green ring-green-200",
  Disponivel: "bg-gov-green-soft text-gov-green ring-green-200",
  Agendado: "bg-slate-100 text-slate-700 ring-slate-200",
  Aguardando: "bg-amber-50 text-amber-800 ring-amber-200",
  Ativa: "bg-gov-green-soft text-gov-green ring-green-200"
};

export function Badge({ value }: { value: string | Criticidade }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${styles[value] ?? styles.Media}`}>
      {value}
    </span>
  );
}
