
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Layers, Package, ClipboardList, ShoppingCart } from "lucide-react";

const Index = () => {
  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Bem-vindo ao ToolWise ERP, seu sistema especializado para ferramentarias.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ordens Ativas</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">3 com prazo próximo</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produtos Cadastrados</CardTitle>
            <Layers className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">+5 este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estoque</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">843</div>
            <p className="text-xs text-muted-foreground">Itens em estoque</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cotações Pendentes</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Aguardando análise</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Ordens de Produção Recentes</CardTitle>
            <CardDescription>
              Última atualização em {new Date().toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                { id: "OP-2023-056", cliente: "MetalTech Ltda", prazo: "15/07/2023" },
                { id: "OP-2023-055", cliente: "Precision Tools", prazo: "20/07/2023" },
                { id: "OP-2023-054", cliente: "FabriAço", prazo: "18/07/2023" },
                { id: "OP-2023-053", cliente: "Peças & Moldes", prazo: "25/07/2023" },
              ].map((ordem) => (
                <div key={ordem.id} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">{ordem.id}</p>
                    <p className="text-sm text-muted-foreground">{ordem.cliente}</p>
                  </div>
                  <div className="text-sm">Prazo: {ordem.prazo}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Insumos com Estoque Baixo</CardTitle>
            <CardDescription>
              Itens que precisam de reposição
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                { id: "IN-1234", nome: "Aço Inox 304", qtde: "5 kg", min: "15 kg" },
                { id: "IN-2345", nome: "Alumínio 6061", qtde: "3 kg", min: "10 kg" },
                { id: "IN-3456", nome: "Barra Roscada M10", qtde: "8 un", min: "20 un" },
                { id: "IN-4567", nome: "Broca de Aço Rápido 8mm", qtde: "2 un", min: "5 un" },
              ].map((insumo) => (
                <div key={insumo.id} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">{insumo.nome}</p>
                    <p className="text-sm text-muted-foreground">{insumo.id}</p>
                  </div>
                  <div className="text-sm text-destructive font-medium">
                    {insumo.qtde} / {insumo.min}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
