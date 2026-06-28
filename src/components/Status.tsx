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
  Ativa: "bg-gov-green-soft text-gov-green ring-green-200",
  "Em revisao": "bg-amber-50 text-amber-800 ring-amber-200",
  Desativada: "bg-slate-100 text-slate-600 ring-slate-200",
  Experimental: "bg-gov-blue-soft text-gov-blue ring-blue-200",
  "Aprovar Cadastro": "bg-gov-green-soft text-gov-green ring-green-200",
  "Aprovar com Ressalvas": "bg-gov-blue-soft text-gov-blue ring-blue-200",
  "Solicitar Retificacao": "bg-amber-50 text-amber-800 ring-amber-200",
  "Encaminhar para Revisao Tecnica": "bg-slate-100 text-slate-700 ring-slate-200",
  "Indeferir Cadastro": "bg-red-50 text-gov-red ring-red-200"
};

const tooltips: Record<string, string> = {
  Alta: "Conflito com potencial impacto juridico ou ambiental relevante.",
  Critica: "Conflito critico que exige analise humana antes de qualquer decisao oficial.",
  Media: "Inconsistencia relevante, mas geralmente tratavel por retificacao ou conferencia.",
  Baixa: "Inconsistencia de menor impacto operacional.",
  "Reserva Legal": "Area localizada no interior do imovel rural destinada a conservacao da vegetacao nativa.",
  APP: "Area de Preservacao Permanente conforme Lei 12.651/2012.",
  "Marco Temporal": "Validacao considerando a data de 22 de julho de 2008 prevista no Codigo Florestal.",
  Convergencia: "Grau de concordancia entre as bases geoespaciais consultadas.",
  "Falso Positivo": "Divergencia causada por diferencas cartograficas, metodologicas ou temporais.",
  Topologia: "Validacao geometrica entre poligonos e feicoes espaciais.",
  Sobreposicao: "Intersecao entre o CAR e areas protegidas ou outros cadastros.",
  Ativa: "Regra disponivel para execucao no motor de conformidade.",
  "Em revisao": "Regra em avaliacao tecnica antes de uso pleno.",
  Desativada: "Regra mantida no catalogo, mas indisponivel para novas execucoes.",
  Experimental: "Regra em fase de teste sem efeito decisorio.",
  "Aprovar Cadastro": "Decisao oficial registrada pela analista ambiental.",
  "Aprovar com Ressalvas": "Decisao oficial com condicoes ou observacoes tecnicas.",
  "Solicitar Retificacao": "Decisao oficial solicitando ajuste pelo produtor.",
  "Encaminhar para Revisao Tecnica": "Decisao oficial para aprofundamento por equipe tecnica.",
  "Indeferir Cadastro": "Decisao oficial de indeferimento pela analista responsavel."
};

export function Badge({ value }: { value: string | Criticidade }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${styles[value] ?? styles.Media}`}
      title={tooltips[value] ?? `${value}: status ou classificacao utilizada na simulacao ResolveCAR.`}
    >
      {value}
    </span>
  );
}
