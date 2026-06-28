import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Mail, MessageCircle, MonitorCheck, Smartphone } from "lucide-react";
import { Badge } from "./Status";
import type { Analysis, PropertyCase } from "../types";
import { useAppState } from "../store/AppState";

type CommunicationModalProps = {
  open: boolean;
  onClose: () => void;
  property: PropertyCase;
  analysis: Analysis;
};

const channels = [
  { key: "SMS", icon: Smartphone },
  { key: "WhatsApp", icon: MessageCircle },
  { key: "Email", icon: Mail },
  { key: "Portal ResolveCAR", icon: MonitorCheck }
];

export function CommunicationModal({ open, onClose, property, analysis }: CommunicationModalProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [complete, setComplete] = useState(false);
  const modalRef = useRef<HTMLElement | null>(null);
  const confirmedRef = useRef(false);
  const { addHistory, showToast } = useAppState();

  useEffect(() => {
    if (!open) {
      setStep(0);
      setComplete(false);
      confirmedRef.current = false;
      return;
    }

    window.requestAnimationFrame(() => {
      modalRef.current?.focus();
      modalRef.current?.scrollIntoView({ block: "center", inline: "center" });
    });

    const timer = window.setInterval(() => {
      setStep((current) => {
        if (current >= channels.length * 2) {
          window.clearInterval(timer);
          setComplete(true);
          return current;
        }
        return current + 1;
      });
    }, 560);

    return () => window.clearInterval(timer);
  }, [open]);

  function confirmCommunication() {
    if (confirmedRef.current) {
      return;
    }

    confirmedRef.current = true;
    addHistory(property.id, "Comunicacao enviada", "Fluxo SMS, WhatsApp, Email e Portal ResolveCAR concluido.");
    addHistory(property.id, "Produtor visualizou", "Leitura simulada registrada no canal WhatsApp e Portal.");
    showToast("Comunicacao confirmada pela Luana e enviada ao produtor.", "success");
    onClose();
    navigate("/comunicacoes");
  }

  if (!open) {
    return null;
  }

  const protocolo = "RC-2026-000124";
  const firstName = property.proprietario.nome.split(" ")[0];

  return (
    <div className="fixed inset-0 z-50 flex min-h-dvh items-center justify-center overflow-y-auto bg-transparent p-4">
      <section
        ref={modalRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-lg bg-white shadow-2xl ring-1 ring-slate-200 animate-fade-up focus:outline-none"
      >
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-gov-text">Enviar Comunicacao ao Produtor</h2>
            <p className="text-sm text-slate-500">
              {complete ? "Envio simulado concluido. Confirme para registrar e fechar." : "Fluxo multicanal com rastreabilidade de entrega e leitura."}
            </p>
          </div>
        </header>

        <div className="grid flex-1 gap-5 overflow-y-auto p-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            <div className="rounded-lg border border-slate-200 bg-gov-gray p-4">
              <h3 className="font-semibold text-gov-text">Dados mockados do proprietario</h3>
              <dl className="mt-3 grid gap-3 text-sm">
                <Info label="Nome" value={property.proprietario.nome} />
                <Info label="CPF mascarado" value={maskCpf(property.proprietario.cpf)} />
                <Info label="Telefone" value={property.proprietario.telefone} />
                <Info label="WhatsApp" value={property.proprietario.whatsapp} />
                <Info label="Email" value={property.proprietario.email} />
                <Info label="Canal Preferencial" value={property.proprietario.canalPreferencial} />
              </dl>
            </div>

            <div className="rounded-lg border border-slate-200 p-4">
              <h3 className="mb-3 font-semibold text-gov-text">Envio institucional</h3>
              <div className="space-y-3">
                {channels.map((channel, index) => {
                  const Icon = channel.icon;
                  const sent = step > index * 2;
                  const read = step > index * 2 + 1;
                  return (
                    <div key={channel.key} className="flex items-center gap-3 rounded-md border border-slate-200 bg-white p-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-md bg-gov-green-soft text-gov-green">
                        <Icon size={18} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-slate-800">{channel.key}</p>
                        <p className="text-xs text-slate-500">{sent ? (read ? "Entregue" : "Pendente") : "Pendente"}</p>
                      </div>
                      {read ? <Badge value="Entregue" /> : <Badge value="Pendente" />}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Preview title="SMS">
              <p className="font-semibold">ResolveCAR</p>
              <p>A analise do seu Cadastro Ambiental Rural foi concluida.</p>
              <p>Consulte os detalhes enviados para seu WhatsApp e Email.</p>
              <p className="font-mono text-xs">Protocolo {protocolo}</p>
            </Preview>

            <Preview title="WhatsApp">
              <p>Ola Sr. {firstName}.</p>
              <p>A analise do seu Cadastro Ambiental Rural foi concluida.</p>
              <p><strong>Resultado:</strong> {property.resultado}.</p>
              <p>{analysis.comunicacaoSimplificada}</p>
              <button className="btn-secondary mt-2">Visualizar Correcao</button>
            </Preview>

            <Preview title="Email">
              <p><strong>Assunto:</strong> Resultado da Analise do Cadastro Ambiental Rural</p>
              <div className="mt-3 grid gap-2 text-sm">
                {["Resumo", "Mapa", "Fundamentacao", "Regras aplicadas", "Correcoes", "Prazo", "Protocolo"].map((item) => (
                  <span key={item} className="rounded-md bg-gov-gray px-3 py-2">{item}</span>
                ))}
              </div>
            </Preview>
          </div>
        </div>
        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-white px-6 py-4">
          <p className="text-sm text-slate-500">
            {complete ? "Todos os canais foram processados. A comunicacao ainda aguarda confirmacao da Luana." : "Aguarde a conclusao dos canais antes de confirmar."}
          </p>
          <button className="btn-primary disabled:cursor-not-allowed disabled:opacity-50" disabled={!complete} onClick={confirmCommunication}>
            Confirmar Envio
          </button>
        </footer>
      </section>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3 rounded-md bg-white px-3 py-2 ring-1 ring-slate-200">
      <dt className="text-slate-500">{label}</dt>
      <dd className="text-right font-medium text-slate-800">{value}</dd>
    </div>
  );
}

function Preview({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="mb-3 flex items-center gap-2 text-gov-green">
        <CheckCircle2 size={18} />
        <h3 className="font-semibold">{title}</h3>
      </div>
      <div className="space-y-2 text-sm text-slate-700">{children}</div>
    </article>
  );
}

function maskCpf(cpf: string) {
  return cpf.replace(/^(\d{3})\.(\d{3})\.(\d{3})-(\d{2})$/, "$1.***.***-$4");
}
