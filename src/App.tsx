import { Navigate, Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Investigation } from "./pages/Investigation";
import { Communications } from "./pages/Communications";
import { RuleCatalog } from "./pages/RuleCatalog";
import { Reports } from "./pages/Reports";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/processos/:id" element={<Investigation />} />
      <Route path="/comunicacoes" element={<Communications />} />
      <Route path="/catalogo-regras" element={<RuleCatalog />} />
      <Route path="/relatorios" element={<Reports />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
