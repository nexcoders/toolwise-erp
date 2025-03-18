
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarCheck, BarChart3, Calendar, Clock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PlanejamentoProducao: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <CalendarCheck className="h-8 w-8 text-primary" />
          Planejamento de Produção
        </h1>
        <div className="flex gap-2">
          <Button variant="outline">Exportar</Button>
          <Button>Novo Planejamento</Button>
        </div>
      </div>

      <Tabs defaultValue="calendario" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="calendario" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Calendário</span>
          </TabsTrigger>
          <TabsTrigger value="gantt" className="flex items-center gap-1">
            <BarChart3 className="h-4 w-4" />
            <span>Gráfico Gantt</span>
          </TabsTrigger>
          <TabsTrigger value="capacidade" className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>Capacidade Produtiva</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calendario" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Ordens Pendentes</CardTitle>
                <CardDescription>Ordens aguardando planejamento</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { id: "OP-2023-089", produto: "Molde Injeção Plástica", cliente: "Plásticos Modernos", prioridade: "Alta" },
                    { id: "OP-2023-092", produto: "Ferramenta de Corte", cliente: "MetalCorp", prioridade: "Média" },
                    { id: "OP-2023-094", produto: "Matriz Estampagem", cliente: "AutoPeças SA", prioridade: "Baixa" },
                  ].map((ordem) => (
                    <div key={ordem.id} className="flex items-center justify-between p-3 border rounded-md hover:bg-accent/40 cursor-pointer transition-colors">
                      <div>
                        <div className="font-medium">{ordem.id}</div>
                        <div className="text-sm text-muted-foreground">{ordem.produto}</div>
                        <div className="text-xs text-muted-foreground">{ordem.cliente}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={ordem.prioridade === "Alta" ? "destructive" : ordem.prioridade === "Média" ? "default" : "outline"}>
                          {ordem.prioridade}
                        </Badge>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Calendário de Produção</CardTitle>
                <CardDescription>Visualize a programação dos próximos dias</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center border-2 border-dashed rounded-md">
                  <p className="text-muted-foreground">Calendário de Produção será exibido aqui</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Carga de Trabalho por Setor</CardTitle>
              <CardDescription>Distribuição atual da capacidade produtiva</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-md">
                <p className="text-muted-foreground">Gráfico de carga de trabalho será exibido aqui</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gantt" className="space-y-4 mt-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Gráfico de Gantt</CardTitle>
              <CardDescription>Visualize a linha do tempo das ordens de produção</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[500px] flex items-center justify-center border-2 border-dashed rounded-md">
                <p className="text-muted-foreground">Gráfico de Gantt será exibido aqui</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="capacidade" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Capacidade por Recurso</CardTitle>
                <CardDescription>Disponibilidade e utilização dos recursos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-md">
                  <p className="text-muted-foreground">Gráfico de capacidade será exibido aqui</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Indicadores de Ocupação</CardTitle>
                <CardDescription>Percentual de ocupação da capacidade produtiva</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-md">
                  <p className="text-muted-foreground">Indicadores de ocupação serão exibidos aqui</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PlanejamentoProducao;
