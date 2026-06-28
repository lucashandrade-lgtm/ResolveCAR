import { ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
import { BarChart3, Bell, BookOpenCheck, Building2, FileText, Home, MessageSquareText, Search, Settings, ShieldCheck } from "lucide-react";
import { GlossaryDrawer } from "./GlossaryDrawer";
import { ToastViewport } from "./ToastViewport";

type LayoutProps = {
  children: ReactNode;
  breadcrumb?: ReactNode;
};

export function Layout({ children, breadcrumb }: LayoutProps) {
  const navItems = [
    { to: "/", label: "Dashboard", icon: Home },
    { to: "/", label: "Processos", icon: FileText },
    { to: "/", label: "Central de Investigacao", icon: ShieldCheck },
    { to: "/catalogo-regras", label: "Catalogo de Regras", icon: BookOpenCheck },
    { to: "/comunicacoes", label: "Comunicacoes", icon: MessageSquareText },
    { to: "/comunicacoes", label: "Relatorios", icon: BarChart3 },
    { to: "/", label: "Configuracoes", icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gov-gray text-gov-text">
      <header className="fixed inset-x-0 top-0 z-30 border-b border-slate-200 bg-white">
        <div className="flex h-16 items-center gap-4 px-6">
          <Link to="/" className="flex min-w-[280px] items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-md bg-gov-green text-white shadow-sm">
              <Building2 size={22} />
            </span>
            <span>
              <strong className="block text-lg leading-tight text-gov-text">ResolveCAR</strong>
              <span className="text-xs text-slate-500">Plataforma Aberta de Conformidade Ambiental</span>
            </span>
          </Link>
          <div className="ml-auto hidden h-10 min-w-96 items-center gap-2 rounded-md border border-slate-200 bg-gov-gray px-3 text-sm text-slate-500 lg:flex">
            <Search size={17} />
            Buscar processo, produtor ou municipio
          </div>
          <button className="icon-button" aria-label="Notificacoes">
            <Bell size={19} />
          </button>
          <div className="hidden text-right text-sm md:block">
            <strong className="block text-gov-text">Luana</strong>
            <span className="text-slate-500">Orgao Ambiental Estadual</span>
          </div>
        </div>
      </header>
      <aside className="fixed bottom-0 left-0 top-16 z-20 hidden w-72 border-r border-slate-200 bg-white px-4 py-5 lg:block">
        <div className="mb-5 rounded-md border border-green-100 bg-gov-green-soft p-3">
          <p className="text-xs font-semibold uppercase text-gov-green">Ambiente institucional</p>
          <p className="mt-1 text-sm text-slate-700">Validacao ambiental rastreavel com dados mockados.</p>
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition duration-200 ${
                    isActive && (item.to !== "/" || item.label === "Dashboard")
                      ? "bg-gov-green-soft text-gov-green"
                      : "text-slate-600 hover:bg-slate-50 hover:text-gov-green"
                  }`
                }
              >
                <Icon size={18} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </aside>
      <main className="px-4 pb-10 pt-20 lg:ml-72 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {breadcrumb ? <nav className="mb-5 text-sm text-slate-500">{breadcrumb}</nav> : null}
          <div className="animate-fade-up">{children}</div>
        </div>
      </main>
      <GlossaryDrawer />
      <ToastViewport />
    </div>
  );
}
