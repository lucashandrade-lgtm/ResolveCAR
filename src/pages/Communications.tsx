import { CheckCircle2, Clock3, Mail, MessageCircle, MonitorCheck, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Badge } from "../components/Status";
import { communications, getCase } from "../data";

const icons: Record<string, typeof Smartphone> = {
  SMS: Smartphone,
  WhatsApp: MessageCircle,
  Email: Mail,
  Portal: MonitorCheck
};

export function Communications() {
  return (
    <Layout breadcrumb={<span>Dashboard / Comunicacoes</span>}>
      <section className="mb-6">
        <span className="text-sm font-semibold uppercase tracking-wide text-gov-green">Central de Comunicacao</span>
        <h1 className="mt-1 text-2xl font-bold text-gov-text">Rastreabilidade de envio ao produtor</h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">
          Timeline simulada de notificacoes enviadas por SMS, WhatsApp, Email e Portal ResolveCAR.
        </p>
      </section>

      <div className="grid gap-6">
        {communications.map((communication) => {
          const property = getCase(communication.propertyId);
          if (!property) {
            return null;
          }

          return (
            <article key={communication.protocolo} className="panel overflow-hidden">
              <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-4">
                <div>
                  <p className="font-mono text-xs text-slate-500">{communication.protocolo}</p>
                  <h2 className="font-semibold text-gov-text">{property.produtor}</h2>
                  <p className="text-sm text-slate-500">{property.proprietario.nome} - {property.municipio}/{property.uf}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge value={communication.status.includes("concluido") ? "Conforme" : communication.status.includes("Pendente") ? "Aguardando" : "Entregue"} />
                  <span className="inline-flex items-center gap-2 text-sm text-slate-500">
                    <Clock3 size={16} /> {communication.data} as {communication.hora}
                  </span>
                </div>
              </header>

              <div className="grid gap-4 p-5 lg:grid-cols-[1fr_280px]">
                <div className="relative grid gap-4 md:grid-cols-4">
                  {communication.eventos.map((event, index) => {
                    const Icon = icons[event.canal] ?? CheckCircle2;
                    return (
                      <div key={`${communication.protocolo}-${event.canal}`} className="relative rounded-lg border border-slate-200 bg-white p-4">
                        {index < communication.eventos.length - 1 ? <span className="absolute left-full top-8 hidden h-px w-4 bg-slate-200 md:block" /> : null}
                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-gov-green-soft text-gov-green">
                          <Icon size={19} />
                        </div>
                        <h3 className="font-semibold text-slate-800">{event.canal}</h3>
                        <div className="mt-2 flex items-center gap-2">
                          <CheckCircle2 className="text-gov-green" size={16} />
                          <Badge value={event.status} />
                        </div>
                        <p className="mt-2 text-xs text-slate-500">Hora {event.hora}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="rounded-lg bg-gov-gray p-4">
                  <p className="text-xs font-semibold uppercase text-slate-500">Resumo</p>
                  <p className="mt-2 text-sm text-slate-700">Status: {communication.status}</p>
                  <p className="mt-2 text-sm text-slate-700">Resultado: {property.resultado}</p>
                  <Link className="btn-secondary mt-4 w-full" to={`/processos/${property.id}`}>
                    Ver processo
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </Layout>
  );
}
