
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./config/despesas-columns";
import { despesasMock } from "./data/despesas-mock";
import { DollarSign, ArrowDownRight, TrendingUp, Tag } from "lucide-react";

const Despesas = () => {
  const total = despesasMock.reduce((acc, item) => acc + item.valor, 0);
  const pendente = despesasMock.filter(item => item.status === "pendente").reduce((acc, item) => acc + item.valor, 0);
  const pago = despesasMock.filter(item => item.status === "pago").reduce((acc, item) => acc + item.valor, 0);
  
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Despesas</h1>
        <p className="text-muted-foreground">Gerencie e acompanhe suas despesas</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Despesas</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
            <p className="text-xs text-muted-foreground">No período atual</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pago</CardTitle>
            <ArrowDownRight className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">R$ {pago.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
            <p className="text-xs text-muted-foreground">No período atual</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">A Pagar</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">R$ {pendente.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
            <p className="text-xs text-muted-foreground">No período atual</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categorias</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{despesasMock.map(item => item.categoria).filter((v, i, a) => a.indexOf(v) === i).length}</div>
            <p className="text-xs text-muted-foreground">Diferentes no período</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="todas" className="w-full">
        <TabsList>
          <TabsTrigger value="todas">Todas</TabsTrigger>
          <TabsTrigger value="pagas">Pagas</TabsTrigger>
          <TabsTrigger value="pendentes">Pendentes</TabsTrigger>
        </TabsList>
        <TabsContent value="todas">
          <Card>
            <CardHeader>
              <CardTitle>Todas as Despesas</CardTitle>
              <CardDescription>
                Visualize todas as suas despesas registradas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable columns={columns} data={despesasMock} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pagas">
          <Card>
            <CardHeader>
              <CardTitle>Despesas Pagas</CardTitle>
              <CardDescription>
                Visualize as despesas já pagas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable columns={columns} data={despesasMock.filter(item => item.status === "pago")} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pendentes">
          <Card>
            <CardHeader>
              <CardTitle>Despesas Pendentes</CardTitle>
              <CardDescription>
                Visualize as despesas ainda não pagas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable columns={columns} data={despesasMock.filter(item => item.status === "pendente")} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Despesas;
