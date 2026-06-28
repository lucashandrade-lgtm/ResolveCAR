export type Criticidade = "Baixa" | "Media" | "Alta" | "Critica";

export type PropertyCase = {
  id: string;
  numero: string;
  produtor: string;
  proprietario: {
    nome: string;
    cpf: string;
    telefone: string;
    whatsapp: string;
    email: string;
    canalPreferencial: string;
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
  descricao: string;
  fundamentacaoLegal: string;
  artigo: string;
  criticidade: Criticidade;
  entrada: string;
  condicao: string;
  resultado: string;
  mensagemTecnica: string;
  mensagemSimplificada: string;
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
