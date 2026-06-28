# ResolveCAR

ResolveCAR é um MVP frontend que simula um fluxo de análise ambiental para processos do Cadastro Ambiental Rural (CAR). A aplicação representa como um órgão ambiental poderia triar imóveis rurais, inspecionar evidências geoespaciais, executar regras de conformidade, gerar recomendações técnicas, registrar a decisão final da analista e comunicar o proprietário.

Este projeto não possui backend nem banco de dados. Todos os dados são carregados a partir de arquivos JSON locais, e as alterações em tempo de execução são controladas com estado local em React.

## Conceito Central

O princípio fundamental do produto é que o GeoCompliance Engine (GCE) não toma decisões oficiais.

O motor executa regras ambientais e geoespaciais sobre dados mockados do CAR e produz uma recomendação técnica. A decisão oficial permanece sob responsabilidade da analista ambiental. A interface foi desenhada para reforçar essa separação entre recomendação automatizada e decisão técnica-jurídica humana.

Na prática:

- O motor executa regras e mostra quais regras foram utilizadas.
- O sistema apresenta um parecer técnico sugerido.
- A analista revisa evidências, fundamentação legal, conflitos e material de comunicação.
- A analista registra a decisão final e a justificativa técnica obrigatória.
- A timeline, o histórico e o dashboard refletem a decisão registrada pela analista.

## Stack Técnica

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Leaflet e React Leaflet
- Lucide React
- Dados mockados em JSON local

## Estrutura do Projeto

```text
src/
  components/
    CommunicationModal.tsx
    ComplianceEngine.tsx
    GlossaryDrawer.tsx
    Layout.tsx
    MockMap.tsx
    Status.tsx
    ToastViewport.tsx
  mock/
    analysis.json
    communications.json
    properties.json
    rules.json
    sources.json
    timeline.json
  pages/
    Communications.tsx
    Dashboard.tsx
    Investigation.tsx
    Reports.tsx
    RuleCatalog.tsx
  store/
    AppState.tsx
  App.tsx
  data.ts
  main.tsx
  styles.css
  types.ts
```

## Funcionalidades Principais

### Dashboard

O dashboard apresenta a fila operacional da analista. Ele lista processos CAR mockados, resume criticidade, mostra status dos processos e direciona cada caso para o fluxo de investigação.

### Investigação

A página de investigação é o espaço principal de análise do processo. Ela inclui:

- Resumo completo do CAR, com dados gerais, dados do imóvel rural, dados do proprietário e mapa de localização.
- Visão diagnóstica com tipo de conflito, regras executadas, status e criticidade.
- Hipóteses técnicas e evidências associadas.
- Simulação do GeoCompliance Engine (GCE).
- Linha do tempo de eventos do processo e do uso do solo.
- Fluxo de decisão final da analista.
- Histórico do processo.
- Comunicação ao produtor.

As seções do resumo do CAR são dropdowns fechados por padrão, permitindo consulta detalhada sem sobrecarregar a tela.

### GeoCompliance Engine

O motor de conformidade simula uma esteira de execução de regras:

- Conecta bases geoespaciais oficiais simuladas.
- Executa regras ambientais.
- Lista as regras utilizadas com ID e versão.
- Mostra resultado da regra, criticidade, fundamentação legal, mensagem técnica e mensagem simplificada.
- Produz uma recomendação técnica, não uma decisão oficial.

### Decisão Final da Analista

A analista pode registrar uma das seguintes decisões finais:

- Aprovar Cadastro
- Aprovar com Ressalvas
- Solicitar Retificação
- Encaminhar para Revisão Técnica
- Indeferir Cadastro

A decisão exige justificativa técnica com validação mínima de caracteres. Após salvar, o status do processo, badges, dashboard, timeline e histórico são atualizados.

### Catálogo de Regras

O catálogo administrativo demonstra que as regras são abertas, versionadas e evolutivas. Ele permite:

- Listar regras.
- Buscar regras.
- Filtrar por categoria.
- Criar nova regra.
- Editar regra existente.
- Duplicar regra.
- Alterar status da regra.
- Consultar histórico de versões.

Todas as alterações são mantidas apenas em memória durante a sessão do navegador.

### Comunicações

O módulo de comunicações simula notificações ao produtor por canais suportados:

- SMS
- WhatsApp
- Email

Os status de mensagem são restritos a:

- Entregue
- Pendente
- Não encontrado

O modal de comunicação permanece aberto até que a analista confirme explicitamente o envio.

### Relatórios

A página de relatórios consolida indicadores operacionais mockados, incluindo quantidade de processos, casos críticos, decisões registradas, regras ativas, recomendações, criticidade e quantidade de eventos de histórico.

### Glossário

Um botão fixo de ajuda abre um drawer lateral com explicações acessíveis para termos ambientais e geoespaciais usados na aplicação.

## Modelo de Dados

O MVP utiliza arquivos JSON em `src/mock`:

- `properties.json`: dados do processo CAR, imóvel rural, proprietário, localização e conflito.
- `rules.json`: regras ambientais, criticidade e fundamentação legal.
- `analysis.json`: hipóteses técnicas, fundamentação jurídica, recomendações e textos de comunicação.
- `sources.json`: fontes de evidência simuladas.
- `timeline.json`: eventos históricos.
- `communications.json`: histórico de comunicações.

A aplicação importa esses arquivos por meio de `src/data.ts` e gerencia o comportamento em tempo de execução com `src/store/AppState.tsx`.

## Gerenciamento de Estado

O estado da aplicação é centralizado em um React Context localizado em `src/store/AppState.tsx`.

Ele controla:

- Processos CAR.
- Regras.
- Decisões finais.
- Histórico do processo.
- Toasts de feedback.

Não há persistência além da sessão atual do navegador.

## Como Executar Localmente

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Gere o build de produção:

```bash
npm run build
```

Visualize o build de produção:

```bash
npm run preview
```

## Restrições Arquiteturais

Este MVP segue restrições explícitas:

- Sem backend.
- Sem banco de dados.
- Sem persistência externa.
- Apenas React, estado local e arquivos JSON.
- Alterações no catálogo de regras são mantidas apenas em memória.
- O motor recomenda; a analista decide.

## Posicionamento de Produto

ResolveCAR está alinhado a princípios de Software Público e Bem Público Digital:

- Transparência das regras.
- Rastreabilidade do histórico do processo.
- Responsabilidade humana pela decisão oficial.
- Separação clara entre recomendação técnica e decisão administrativa.
- Catálogo de regras evolutivo, sem necessidade de alterar o núcleo do fluxo da aplicação.
