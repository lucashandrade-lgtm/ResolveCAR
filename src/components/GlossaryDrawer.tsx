import { useState } from "react";
import { HelpCircle, X } from "lucide-react";

const terms = [
  ["APP", "Area protegida por lei ao redor de rios, nascentes, encostas e outros ambientes sensiveis."],
  ["Reserva Legal", "Parte do imovel rural que deve manter vegetacao nativa para conservar biodiversidade e recursos naturais."],
  ["CAR", "Cadastro Ambiental Rural, registro publico eletronico das informacoes ambientais do imovel rural."],
  ["SICAR", "Sistema nacional que recebe e organiza os cadastros ambientais rurais."],
  ["SIGEF", "Sistema do INCRA utilizado para dados georreferenciados de imoveis certificados."],
  ["INPE", "Instituto que produz monitoramento orbital e alertas de desmatamento."],
  ["IBGE", "Fonte oficial para limites territoriais e dados geograficos do Brasil."],
  ["MapBiomas", "Rede que produz series historicas de uso e cobertura da terra por imagens de satelite."],
  ["Topologia", "Validacao geometrica de poligonos, limites, intersecoes e inconsistencias espaciais."],
  ["Convergencia", "Grau de concordancia entre as bases geoespaciais consultadas."],
  ["Criticidade", "Nivel de atencao tecnica ou juridica associado a uma divergencia."],
  ["Marco Temporal", "Referencia de 22 de julho de 2008 usada em analises do Codigo Florestal."],
  ["PRA", "Programa de Regularizacao Ambiental para adequacao de passivos ambientais."],
  ["Falso Positivo", "Divergencia aparente causada por diferencas de escala, data ou metodo entre bases."],
  ["Sobreposicao", "Intersecao entre o CAR e outra area, como unidade de conservacao ou outro cadastro."]
];

export function GlossaryDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="fixed bottom-5 left-5 z-40 inline-flex items-center gap-2 rounded-full bg-gov-green px-4 py-3 text-sm font-semibold text-white shadow-panel transition hover:bg-green-800 lg:left-80"
        onClick={() => setOpen(true)}
        title="Abrir glossario de conceitos ambientais"
      >
        <HelpCircle size={18} /> Ajuda
      </button>
      {open ? (
        <div className="fixed inset-0 z-[60] bg-slate-950/30">
          <aside className="ml-auto h-full w-full max-w-md overflow-y-auto bg-white shadow-2xl animate-fade-up">
            <header className="sticky top-0 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
              <div>
                <h2 className="font-semibold text-gov-text">Glossario ResolveCAR</h2>
                <p className="text-sm text-slate-500">Conceitos em linguagem acessivel.</p>
              </div>
              <button className="icon-button" onClick={() => setOpen(false)} aria-label="Fechar glossario">
                <X size={18} />
              </button>
            </header>
            <div className="space-y-3 p-5">
              {terms.map(([term, description]) => (
                <article key={term} className="rounded-lg border border-slate-200 bg-gov-gray p-4">
                  <h3 className="font-semibold text-gov-green">{term}</h3>
                  <p className="mt-1 text-sm text-slate-700">{description}</p>
                </article>
              ))}
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
}
