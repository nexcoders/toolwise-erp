
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import OrdemProducao from "./pages/producao/OrdemProducao";
import ProdutoEstrutura from "./pages/producao/ProdutoEstrutura";
import Insumos from "./pages/estoque/Insumos";
import Movimentacoes from "./pages/estoque/Movimentacoes";
import Cotacoes from "./pages/compras/Cotacoes";
import Fornecedores from "./pages/compras/Fornecedores";
import Configuracoes from "./pages/Configuracoes";
import Clientes from "./pages/crm/Clientes";
import Oportunidades from "./pages/crm/Oportunidades";
import Empresas from "./pages/crm/Empresas";
import Relatorios from "./pages/crm/Relatorios";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/producao/ordens" element={<OrdemProducao />} />
            <Route path="/producao/produtos" element={<ProdutoEstrutura />} />
            <Route path="/estoque/insumos" element={<Insumos />} />
            <Route path="/estoque/movimentacoes" element={<Movimentacoes />} />
            <Route path="/compras/cotacoes" element={<Cotacoes />} />
            <Route path="/compras/fornecedores" element={<Fornecedores />} />
            <Route path="/crm/clientes" element={<Clientes />} />
            <Route path="/crm/oportunidades" element={<Oportunidades />} />
            <Route path="/crm/empresas" element={<Empresas />} />
            <Route path="/crm/relatorios" element={<Relatorios />} />
            <Route path="/configuracoes" element={<Configuracoes />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
