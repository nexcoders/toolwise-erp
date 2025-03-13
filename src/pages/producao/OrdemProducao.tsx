
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ClipboardList, 
  FileEdit, 
  MoreVertical, 
  Plus, 
  Search,
  Eye,
  Trash2
} from "lucide-react";

// Mock data
const mockOrdensProducao = [
  {
    id: "OP-001",
    produto: "Matriz de Corte 250mm",
    cliente: "Metalúrgica ABC",
    dataInicio: "2023-10-15",
    previsaoTermino: "2023-11-05",
    status: "em-andamento",
  },
  {
    id: "OP-002",
    produto: "Molde Injeção Plástica M458",
    cliente: "Plásticos XYZ",
    dataInicio: "2023-10-10",
    previsaoTermino: "2023-11-25",
    status: "em-andamento",
  },
  {
    id: "OP-003",
    produto: "Ferramenta de Dobra 120º",
    cliente: "Industria JKL",
    dataInicio: "2023-09-25",
    previsaoTermino: "2023-10-20",
    status: "concluida",
  },
  {
    id: "OP-004",
    produto: "Estampo Progressivo E789",
    cliente: "Estamparia Delta",
    dataInicio: "2023-10-01",
    previsaoTermino: "2023-12-15",
    status: "em-andamento",
  },
  {
    id: "OP-005",
    produto: "Calibrador de Precisão C123",
    cliente: "Indústria Ômega",
    dataInicio: "2023-10-05",
    previsaoTermino: "2023-10-25",
    status: "aguardando-insumos",
  },
];

const OrdemProducao: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("todas");
  
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "em-andamento":
        return <span className="status-in-progress">Em Andamento</span>;
      case "concluida":
        return <span className="status-completed">Concluída</span>;
      case "aguardando-insumos":
        return <span className="status-pending">Aguardando Insumos</span>;
      case "cancelada":
        return <span className="status-cancelled">Cancelada</span>;
      default:
        return <span>{status}</span>;
    }
  };
  
  const filteredOrdens = activeTab === "todas" 
    ? mockOrdensProducao 
    : mockOrdensProducao.filter(ordem => 
        activeTab === "em-andamento" 
          ? ordem.status === "em-andamento" 
          : activeTab === "concluidas" 
            ? ordem.status === "concluida" 
            : ordem.status === "aguardando-insumos"
      );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Ordens de Produção</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              <span>Nova Ordem</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Criar Nova Ordem de Produção</DialogTitle>
              <DialogDescription>
                Preencha os detalhes da nova ordem de produção.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="produto" className="text-right">
                  Produto
                </Label>
                <div className="col-span-3">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um produto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="matriz-corte">Matriz de Corte 250mm</SelectItem>
                      <SelectItem value="molde-injecao">Molde Injeção Plástica</SelectItem>
                      <SelectItem value="ferramenta-dobra">Ferramenta de Dobra</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cliente" className="text-right">
                  Cliente
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione um cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="metalurgica-abc">Metalúrgica ABC</SelectItem>
                    <SelectItem value="plasticos-xyz">Plásticos XYZ</SelectItem>
                    <SelectItem value="industria-jkl">Industria JKL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dataInicio" className="text-right">
                  Data de Início
                </Label>
                <Input
                  id="dataInicio"
                  type="date"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="previsaoTermino" className="text-right">
                  Previsão de Término
                </Label>
                <Input
                  id="previsaoTermino"
                  type="date"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantidade" className="text-right">
                  Quantidade
                </Label>
                <Input
                  id="quantidade"
                  type="number"
                  min="1"
                  defaultValue="1"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="prioridade" className="text-right">
                  Prioridade
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione a prioridade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="baixa">Baixa</SelectItem>
                    <SelectItem value="media">Média</SelectItem>
                    <SelectItem value="alta">Alta</SelectItem>
                    <SelectItem value="urgente">Urgente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setIsDialogOpen(false)}>Salvar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Lista de Ordens</CardTitle>
              <CardDescription>
                Gerencie todas as ordens de produção da sua ferramentaria.
              </CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar ordens..."
                className="pl-8 w-[250px]"
              />
            </div>
          </div>
          
          <Tabs defaultValue="todas" className="mt-4" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="todas" className="flex items-center gap-1">
                <ClipboardList className="h-4 w-4" />
                <span>Todas</span>
              </TabsTrigger>
              <TabsTrigger value="em-andamento" className="flex items-center gap-1">
                <FileEdit className="h-4 w-4" />
                <span>Em Andamento</span>
              </TabsTrigger>
              <TabsTrigger value="concluidas" className="flex items-center gap-1">
                <FileEdit className="h-4 w-4" />
                <span>Concluídas</span>
              </TabsTrigger>
              <TabsTrigger value="aguardando" className="flex items-center gap-1">
                <FileEdit className="h-4 w-4" />
                <span>Aguardando Insumos</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Produto</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Data de Início</TableHead>
                <TableHead>Prazo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrdens.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                    Nenhuma ordem de produção encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrdens.map((ordem) => (
                  <TableRow key={ordem.id}>
                    <TableCell className="font-medium">{ordem.id}</TableCell>
                    <TableCell>{ordem.produto}</TableCell>
                    <TableCell>{ordem.cliente}</TableCell>
                    <TableCell>{new Date(ordem.dataInicio).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>{new Date(ordem.previsaoTermino).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>{getStatusLabel(ordem.status)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Ações</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                            <Eye className="h-4 w-4" />
                            <span>Visualizar Detalhes</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                            <FileEdit className="h-4 w-4" />
                            <span>Editar</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="flex items-center gap-2 text-destructive cursor-pointer">
                            <Trash2 className="h-4 w-4" />
                            <span>Excluir</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdemProducao;
