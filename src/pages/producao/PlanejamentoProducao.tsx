
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  CalendarCheck, 
  BarChart3, 
  Calendar as CalendarIcon, 
  Clock, 
  ChevronRight, 
  Filter,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format, addBusinessDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isToday } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Mock data for production orders
const mockProductions = [
  { 
    id: "OP-2023-089", 
    produto: "Molde Injeção Plástica", 
    cliente: "Plásticos Modernos", 
    prioridade: "Alta", 
    tempoProducaoHoras: 120,
    inicio: new Date(2023, 6, 5),
    fim: new Date(2023, 6, 20),
    setor: "Ferramentaria"
  },
  { 
    id: "OP-2023-092", 
    produto: "Ferramenta de Corte", 
    cliente: "MetalCorp", 
    prioridade: "Média", 
    tempoProducaoHoras: 45,
    inicio: new Date(2023, 6, 10),
    fim: new Date(2023, 6, 15),
    setor: "Usinagem"
  },
  { 
    id: "OP-2023-094", 
    produto: "Matriz Estampagem", 
    cliente: "AutoPeças SA", 
    prioridade: "Baixa", 
    tempoProducaoHoras: 32,
    inicio: new Date(2023, 6, 12),
    fim: new Date(2023, 6, 16),
    setor: "Ferramentaria"
  },
  { 
    id: "OP-2023-095", 
    produto: "Dispositivo de Solda", 
    cliente: "IndustrialTech", 
    prioridade: "Alta", 
    tempoProducaoHoras: 60,
    inicio: new Date(2023, 6, 8),
    fim: new Date(2023, 6, 15),
    setor: "Montagem"
  },
  { 
    id: "OP-2023-097", 
    produto: "Gabarito de Inspeção", 
    cliente: "Qualitec", 
    prioridade: "Média", 
    tempoProducaoHoras: 24,
    inicio: new Date(2023, 6, 15),
    fim: new Date(2023, 6, 18),
    setor: "Qualidade"
  },
];

// Setores disponíveis para filtro
const setores = ["Todos", "Ferramentaria", "Usinagem", "Montagem", "Qualidade"];

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

const OrdemProducaoCalendar = ({ ordens }: { ordens: any[] }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [ordensDodia, setOrdensDodia] = useState<any[]>([]);

  useEffect(() => {
    if (selectedDate) {
      const ordensAtivas = ordens.filter(ordem => {
        const dataInicio = new Date(ordem.inicio);
        const dataFim = new Date(ordem.fim);
        return selectedDate >= dataInicio && selectedDate <= dataFim;
      });
      setOrdensDodia(ordensAtivas);
    }
  }, [selectedDate, ordens]);

  // Personalização de dias no calendário para mostrar ordens
  const renderDayContent = (day: Date) => {
    const ordensDoDia = ordens.filter(ordem => {
      const dataInicio = new Date(ordem.inicio);
      const dataFim = new Date(ordem.fim);
      return day >= dataInicio && day <= dataFim;
    });

    if (ordensDoDia.length > 0) {
      return (
        <div className="relative w-full h-full p-0">
          <div className="absolute bottom-0 left-0 w-full">
            <div className="flex justify-center">
              <div 
                className={`h-1 w-1 rounded-full ${
                  ordensDoDia.some(o => o.prioridade === "Alta") ? "bg-destructive" : 
                  ordensDoDia.some(o => o.prioridade === "Média") ? "bg-primary" : "bg-muted-foreground"
                }`} 
              />
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? format(selectedDate, "PP", { locale: ptBR }) : "Selecionar data"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              locale={ptBR}
              className="rounded-md border pointer-events-auto"
              components={{
                DayContent: (props) => (
                  <>
                    <div>{props.day.getDate()}</div>
                    {renderDayContent(props.day)}
                  </>
                ),
              }}
            />
          </PopoverContent>
        </Popover>

        <Card className="mt-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Ordens Ativas</CardTitle>
            <CardDescription>
              {selectedDate && format(selectedDate, "dd 'de' MMMM, yyyy", { locale: ptBR })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {ordensDodia.length > 0 ? (
                ordensDodia.map((ordem) => (
                  <div
                    key={ordem.id}
                    className="p-2 border rounded-md hover:bg-accent/40 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{ordem.id}</div>
                        <div className="text-sm">{ordem.produto}</div>
                        <div className="text-xs text-muted-foreground">{ordem.cliente}</div>
                      </div>
                      <Badge variant={ordem.prioridade === "Alta" ? "destructive" : ordem.prioridade === "Média" ? "default" : "outline"}>
                        {ordem.prioridade}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center mt-2 text-xs">
                      <div>
                        <span className="font-medium">{ordem.tempoProducaoHoras}h</span> ({calcularDiasProducao(ordem.tempoProducaoHoras)} dias)
                      </div>
                      <div className="text-muted-foreground">{ordem.setor}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-2 text-sm text-muted-foreground">
                  Nenhuma ordem ativa nessa data
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-2">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl">Visão Mensal</CardTitle>
                <CardDescription>Planejamento de produção por mês</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Select defaultValue="todos">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filtrar por setor" />
                  </SelectTrigger>
                  <SelectContent>
                    {setores.map((setor) => (
                      <SelectItem key={setor.toLowerCase()} value={setor.toLowerCase()}>
                        {setor}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                      Alta Prioridade
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked>
                      Média Prioridade
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked>
                      Baixa Prioridade
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Produto</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Início</TableHead>
                  <TableHead>Fim</TableHead>
                  <TableHead>Duração</TableHead>
                  <TableHead>Setor</TableHead>
                  <TableHead>Prioridade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockProductions.map((ordem) => (
                  <TableRow key={ordem.id}>
                    <TableCell className="font-medium">{ordem.id}</TableCell>
                    <TableCell>{ordem.produto}</TableCell>
                    <TableCell>{ordem.cliente}</TableCell>
                    <TableCell>{format(ordem.inicio, "dd/MM/yyyy")}</TableCell>
                    <TableCell>{format(ordem.fim, "dd/MM/yyyy")}</TableCell>
                    <TableCell>
                      {ordem.tempoProducaoHoras}h ({calcularDiasProducao(ordem.tempoProducaoHoras)} dias)
                    </TableCell>
                    <TableCell>{ordem.setor}</TableCell>
                    <TableCell>
                      <Badge variant={ordem.prioridade === "Alta" ? "destructive" : ordem.prioridade === "Média" ? "default" : "outline"}>
                        {ordem.prioridade}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
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
  const [filteredOrdens, setFilteredOrdens] = useState(mockProductions);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSetor, setSelectedSetor] = useState("todos");
  
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

  // Filtrar ordens com base no termo de busca e setor selecionado
  useEffect(() => {
    let filtered = mockProductions;
    
    if (searchTerm) {
      filtered = filtered.filter(
        ordem => 
          ordem.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ordem.produto.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ordem.cliente.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedSetor !== "todos") {
      filtered = filtered.filter(ordem => ordem.setor.toLowerCase() === selectedSetor);
    }
    
    setFilteredOrdens(filtered);
  }, [searchTerm, selectedSetor]);

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

      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar ordem de produção"
            className="pl-8"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={selectedSetor} onValueChange={setSelectedSetor}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filtrar por setor" />
          </SelectTrigger>
          <SelectContent>
            {setores.map((setor) => (
              <SelectItem key={setor.toLowerCase()} value={setor.toLowerCase()}>
                {setor}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="calendario" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="calendario" className="flex items-center gap-1">
            <CalendarIcon className="h-4 w-4" />
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
          <OrdemProducaoCalendar ordens={filteredOrdens} />
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
