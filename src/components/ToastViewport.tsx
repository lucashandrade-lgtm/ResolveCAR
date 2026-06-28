import { CheckCircle2, Info, X, AlertTriangle } from "lucide-react";
import { useAppState } from "../store/AppState";

export function ToastViewport() {
  const { toasts, dismissToast } = useAppState();

  return (
    <div className="fixed bottom-5 right-5 z-[70] w-80 space-y-3">
      {toasts.map((toast) => {
        const Icon = toast.tone === "warning" ? AlertTriangle : toast.tone === "info" ? Info : CheckCircle2;
        return (
          <div key={toast.id} className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-panel animate-fade-up">
            <Icon className={toast.tone === "warning" ? "text-gov-yellow" : toast.tone === "info" ? "text-gov-blue" : "text-gov-green"} size={20} />
            <p className="flex-1 text-sm font-medium text-gov-text">{toast.message}</p>
            <button onClick={() => dismissToast(toast.id)} className="text-slate-400 hover:text-slate-700" aria-label="Fechar aviso">
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
