
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarCheck, BarChart3, Calendar, Clock, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format, addBusinessDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

// Mock data for production orders
const mockProductions = [
  { id: "OP-2023-089", produto: "Molde Injeção Plástica", cliente: "Plásticos Modernos", prioridade: "Alta", tempoProducaoHoras: 120 },
  { id: "OP-2023-092", produto: "Ferramenta de Corte", cliente: "MetalCorp", prioridade: "Média", tempoProducaoHoras: 45 },
  { id: "OP-2023-094", produto: "Matriz Estampagem", cliente: "AutoPeças SA", prioridade: "Baixa", tempoProducaoHoras: 32 },
];

// Calcular dias de produção (8 horas por dia útil)
const calcularDiasProducao = (horas: number) => {
  return Math.ceil(horas / 8);
};

// Node type for production orders
const OrderNode = ({ data }: { data: any }) => {
  return (
    <div className="bg-white p-2 rounded-md border border-gray-200 shadow-sm w-[200px]">
      <div className="font-medium text-sm">{data.id}</div>
      <div className="text-xs">{data.produto}</div>
      <div className="text-xs text-muted-foreground">{data.cliente}</div>
      <div className="flex justify-between items-center mt-1">
        <div className="text-xs">
          <span className="font-medium">{data.tempoProducaoHoras}h</span> ({calcularDiasProducao(data.tempoProducaoHoras)} dias)
        </div>
        <Badge variant={data.prioridade === "Alta" ? "destructive" : data.prioridade === "Média" ? "default" : "outline"}>
          {data.prioridade}
        </Badge>
      </div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

const nodeTypes = {
  orderNode: OrderNode,
};

const PlanejamentoProducao: React.FC = () => {
  // Initial nodes for React Flow
  const initialNodes = mockProductions.map((ordem, index) => ({
    id: ordem.id,
    type: "orderNode",
    data: { ...ordem },
    position: { x: 50, y: 100 + index * 120 },
  }));

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  
  const onConnect = (params: any) => setEdges((eds) => addEdge(params, eds));
  
  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const type = event.dataTransfer.getData("application/reactflow");
    const ordem = JSON.parse(event.dataTransfer.getData("ordem"));

    // Check if the dropped element is valid
    if (typeof type === "undefined" || !type) {
      return;
    }

    const position = { 
      x: event.clientX - 100, 
      y: event.clientY - 40 
    };

    // Create a new node for the dropped order
    const newNode = {
      id: `${ordem.id}-${Math.floor(Math.random() * 10000)}`,
      type: "orderNode",
      position,
      data: { ...ordem },
    };

    setNodes((nds) => nds.concat(newNode));
  };

  const onDragStart = (event: React.DragEvent<HTMLDivElement>, ordem: any) => {
    event.dataTransfer.setData("application/reactflow", "orderNode");
    event.dataTransfer.setData("ordem", JSON.stringify(ordem));
    event.dataTransfer.effectAllowed = "move";
  };

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
                <CardDescription>Arraste para o calendário para planejar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockProductions.map((ordem) => (
                    <div
                      key={ordem.id}
                      className="flex items-center justify-between p-3 border rounded-md hover:bg-accent/40 cursor-move transition-colors"
                      draggable
                      onDragStart={(e) => onDragStart(e, ordem)}
                    >
                      <div>
                        <div className="font-medium">{ordem.id}</div>
                        <div className="text-sm text-muted-foreground">{ordem.produto}</div>
                        <div className="text-xs text-muted-foreground">{ordem.cliente}</div>
                        <div className="text-xs mt-1">
                          <span className="font-medium">{ordem.tempoProducaoHoras}h</span> ({calcularDiasProducao(ordem.tempoProducaoHoras)} dias)
                        </div>
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
                <CardDescription>Arraste e solte as ordens para agendar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] border rounded-md" onDragOver={onDragOver} onDrop={onDrop}>
                  <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                    fitView
                  >
                    <Background />
                    <Controls />
                  </ReactFlow>
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
