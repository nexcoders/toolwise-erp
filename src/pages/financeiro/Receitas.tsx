
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./config/receitas-columns";
import { receitasMock } from "./data/receitas-mock";
import { DollarSign, ArrowUpRight, TrendingDown, CreditCard } from "lucide-react";

const Receitas = () => {
  const total = receitasMock.reduce((acc, item) => acc + item.valor, 0);
  const pendente = receitasMock.filter(item => item.status === "pendente").reduce((acc, item) => acc + item.valor, 0);
  const recebido = receitasMock.filter(item => item.status === "recebido").reduce((acc, item) => acc + item.valor, 0);
  
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Receitas</h1>
        <p className="text-muted-foreground">Gerencie e acompanhe suas receitas</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Receitas</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
            <p className="text-xs text-muted-foreground">No período atual</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recebido</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">R$ {recebido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
            <p className="text-xs text-muted-foreground">No período atual</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">A Receber</CardTitle>
            <TrendingDown className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">R$ {pendente.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
            <p className="text-xs text-muted-foreground">No período atual</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Métodos de Pagamento</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{receitasMock.map(item => item.metodoPagamento).filter((v, i, a) => a.indexOf(v) === i).length}</div>
            <p className="text-xs text-muted-foreground">Utilizados no período</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="todas" className="w-full">
        <TabsList>
          <TabsTrigger value="todas">Todas</TabsTrigger>
          <TabsTrigger value="recebidas">Recebidas</TabsTrigger>
          <TabsTrigger value="pendentes">Pendentes</TabsTrigger>
        </TabsList>
        <TabsContent value="todas">
          <Card>
            <CardHeader>
              <CardTitle>Todas as Receitas</CardTitle>
              <CardDescription>
                Visualize todas as suas receitas registradas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable columns={columns} data={receitasMock} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="recebidas">
          <Card>
            <CardHeader>
              <CardTitle>Receitas Recebidas</CardTitle>
              <CardDescription>
                Visualize as receitas já recebidas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable columns={columns} data={receitasMock.filter(item => item.status === "recebido")} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pendentes">
          <Card>
            <CardHeader>
              <CardTitle>Receitas Pendentes</CardTitle>
              <CardDescription>
                Visualize as receitas ainda não recebidas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable columns={columns} data={receitasMock.filter(item => item.status === "pendente")} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Receitas;
