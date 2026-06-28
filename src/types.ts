export type Criticidade = "Baixa" | "Media" | "Alta" | "Critica";
export type RuleStatus = "Ativa" | "Em revisao" | "Desativada" | "Experimental";
export type FinalDecisionStatus =
  | "Aprovar Cadastro"
  | "Aprovar com Ressalvas"
  | "Solicitar Retificacao"
  | "Encaminhar para Revisao Tecnica"
  | "Indeferir Cadastro";

export type PropertyCase = {
  id: string;
  numero: string;
  produtor: string;
  proprietario: {
    nome: string;
    cpf: string;
    tipo?: string;
    telefone: string;
    celular?: string;
    whatsapp: string;
    email: string;
    canalPreferencial: string;
    endereco?: string;
    municipio?: string;
    estado?: string;
    cep?: string;
  };
  car?: {
    situacao: string;
    statusAnalise: string;
    versao: string;
    dataInscricao: string;
    ultimaAtualizacao: string;
    orgaoResponsavel: string;
    bioma: string;
    baciaHidrografica: string;
    microbacia: string;
    codigoInterno: string;
  };
  imovel?: {
    nome: string;
    areaConsolidada: string;
    areaAgricola: string;
    areaPastagem: string;
    areaVegetacaoNativa: string;
    areaReservaLegal: string;
    areaApp: string;
    areaUsoRestrito: string;
    latitude: string;
    longitude: string;
    centroide: string;
  };
  municipio: string;
  uf: string;
  tipo: string;
  criticidade: Criticidade;
  status: string;
  resultado: string;
  areaTotal: string;
  areaAfetada: string;
  resumo: string;
  detalhes: Record<string, string>;
  regrasDisparadas: string[];
  regrasExecutadas: string[];
  coordenadas: [number, number];
  convergencia: number;
  tempoAnalise: string;
};

export type Rule = {
  id: string;
  nome: string;
  categoria?: string;
  descricao: string;
  fundamentacaoLegal: string;
  artigo: string;
  criticidade: Criticidade;
  entrada: string;
  condicao: string;
  resultado: string;
  mensagemTecnica: string;
  mensagemSimplificada: string;
  status?: RuleStatus;
  versao?: string;
  dataCriacao?: string;
  ultimaAtualizacao?: string;
  observacoes?: string;
  historico?: Array<{
    versao: string;
    autor: string;
    data: string;
    alteracoes: string;
  }>;
};

export type Source = {
  id: string;
  nome: string;
  ultimaAtualizacao: string;
  escala: string;
  precisao: string;
  responsavel: string;
  confiabilidade: string;
  coordenadas: [number, number];
};

export type TimelineEvent = {
  ano: string;
  evento: string;
  fonte: string;
  imagem: string;
};

export type Analysis = {
  propertyId: string;
  hipoteses: string[];
  fundamentacaoJuridica: string;
  recomendacaoTecnica: string;
  comunicacaoTecnica: string;
  comunicacaoSimplificada: string;
  checklist: string[];
};

export type CommunicationEvent = {
  canal: string;
  status: string;
  hora: string;
};

export type Communication = {
  propertyId: string;
  protocolo: string;
  data: string;
  hora: string;
  status: string;
  eventos: CommunicationEvent[];
};

export type DecisionRecord = {
  propertyId: string;
  status: FinalDecisionStatus;
  justificativa: string;
  responsavel: string;
  data: string;
  hora: string;
};

export type ProcessHistoryItem = {
  propertyId: string;
  label: string;
  detail: string;
  data: string;
  hora: string;
};
