
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Search, 
  Plus, 
  MoreVertical, 
  Edit, 
  Trash, 
  DollarSign,
  Percent,
  Calendar,
  User,
  ChevronUp,
  ChevronDown,
  KanbanSquare,
  List
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import KanbanBoard, { KanbanColumn, Opportunity } from "@/components/crm/KanbanBoard";
import OportunidadesTable from "@/components/crm/OportunidadesTable";

// Mock data
const mockOportunidades = [
  {
    id: "OP-001",
    cliente: "Indústria Metálica SA",
    titulo: "Ferramentas personalizadas para linha de produção",
    valor: 45000,
    probabilidade: 75,
    fase: "proposta",
    dataPrevisao: "30/07/2023",
    responsavel: "Maria Santos"
  },
  {
    id: "OP-002",
    cliente: "Ferramentas Precisão Ltda",
    titulo: "Componentes de alta precisão",
    valor: 28000,
    probabilidade: 50,
    fase: "qualificacao",
    dataPrevisao: "15/08/2023",
    responsavel: "João Silva"
  },
  {
    id: "OP-003",
    cliente: "Componentes Industriais",
    titulo: "Moldes para injeção plástica",
    valor: 63000,
    probabilidade: 90,
    fase: "fechamento",
    dataPrevisao: "05/07/2023",
    responsavel: "Ana Costa"
  },
  {
    id: "OP-004",
    cliente: "Peças & Moldes Especiais",
    titulo: "Desenvolvimento de protótipos",
    valor: 12500,
    probabilidade: 30,
    fase: "prospecção",
    dataPrevisao: "20/09/2023",
    responsavel: "Carlos Mendes"
  },
  {
    id: "OP-005",
    cliente: "Automação Industrial S.A.",
    titulo: "Ferramentas para automação",
    valor: 85000,
    probabilidade: 60,
    fase: "negociacao",
    dataPrevisao: "10/08/2023",
    responsavel: "Fernanda Lima"
  },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { 
    style: 'currency', 
    currency: 'BRL'
  }).format(value);
};

const Oportunidades: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const { toast } = useToast();
  
  // Initialize kanban columns
  const [kanbanColumns, setKanbanColumns] = useState<KanbanColumn[]>([
    {
      id: "prospecção",
      title: "Prospecção",
      items: mockOportunidades.filter(op => op.fase === "prospecção"),
      color: "bg-gray-500"
    },
    {
      id: "qualificacao",
      title: "Qualificação",
      items: mockOportunidades.filter(op => op.fase === "qualificacao"),
      color: "bg-blue-500"
    },
    {
      id: "proposta",
      title: "Proposta",
      items: mockOportunidades.filter(op => op.fase === "proposta"),
      color: "bg-yellow-500"
    },
    {
      id: "negociacao",
      title: "Negociação",
      items: mockOportunidades.filter(op => op.fase === "negociacao"),
      color: "bg-purple-500"
    },
    {
      id: "fechamento",
      title: "Fechamento",
      items: mockOportunidades.filter(op => op.fase === "fechamento"),
      color: "bg-brand-primary"
    }
  ]);
  
  const allOportunidades = kanbanColumns.flatMap(col => col.items);
  
  const filteredOportunidades = [...allOportunidades]
    .filter(oportunidade =>
      oportunidade.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      oportunidade.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortConfig.key === '') return 0;
      
      const aValue = a[sortConfig.key as keyof typeof a];
      const bValue = b[sortConfig.key as keyof typeof b];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        if (sortConfig.direction === 'ascending') {
          return aValue.localeCompare(bValue);
        }
        return bValue.localeCompare(aValue);
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        if (sortConfig.direction === 'ascending') {
          return aValue - bValue;
        }
        return bValue - aValue;
      }
      return 0;
    });

  const handleSaveOportunidade = () => {
    setIsOpen(false);
    toast({
      title: "Oportunidade salva",
      description: "A oportunidade foi salva com sucesso.",
      variant: "default"
    });
  };

  const requestSort = (key: string) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (name: string) => {
    if (sortConfig.key === name) {
      return sortConfig.direction === 'ascending' 
        ? <ChevronUp className="h-4 w-4" /> 
        : <ChevronDown className="h-4 w-4" />;
    }
    return null;
  };

  return (
    <div className="container mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Oportunidades</h1>
          <p className="text-muted-foreground">Gerencie suas oportunidades de negócio</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-brand-primary hover:bg-brand-primary/90">
              <Plus className="mr-2 h-4 w-4" /> Nova Oportunidade
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Adicionar Nova Oportunidade</DialogTitle>
              <DialogDescription>
                Preencha os dados da oportunidade para adicioná-la ao sistema.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cliente">Cliente</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Indústria Metálica SA</SelectItem>
                      <SelectItem value="2">Ferramentas Precisão Ltda</SelectItem>
                      <SelectItem value="3">Componentes Industriais</SelectItem>
                      <SelectItem value="4">Peças & Moldes Especiais</SelectItem>
                      <SelectItem value="5">Automação Industrial S.A.</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="responsavel">Responsável</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um responsável" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Maria Santos</SelectItem>
                      <SelectItem value="2">João Silva</SelectItem>
                      <SelectItem value="3">Ana Costa</SelectItem>
                      <SelectItem value="4">Carlos Mendes</SelectItem>
                      <SelectItem value="5">Fernanda Lima</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="titulo">Título da Oportunidade</Label>
                <Input id="titulo" placeholder="Descreva brevemente a oportunidade" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="valor">Valor Estimado (R$)</Label>
                  <Input id="valor" type="number" placeholder="0,00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="probabilidade">Probabilidade (%)</Label>
                  <Input id="probabilidade" type="number" min="0" max="100" placeholder="50" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fase">Fase</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma fase" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="prospecção">Prospecção</SelectItem>
                      <SelectItem value="qualificacao">Qualificação</SelectItem>
                      <SelectItem value="proposta">Proposta</SelectItem>
                      <SelectItem value="negociacao">Negociação</SelectItem>
                      <SelectItem value="fechamento">Fechamento</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dataPrevisao">Previsão de Fechamento</Label>
                  <Input id="dataPrevisao" type="date" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea id="observacoes" placeholder="Adicione notas ou detalhes sobre a oportunidade" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>Cancelar</Button>
              <Button className="bg-brand-primary hover:bg-brand-primary/90" onClick={handleSaveOportunidade}>Salvar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total de Oportunidades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{allOportunidades.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Oportunidades ativas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Valor Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {formatCurrency(allOportunidades.reduce((acc, curr) => acc + curr.valor, 0))}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Todas as oportunidades</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Valor Ponderado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {formatCurrency(allOportunidades.reduce((acc, curr) => acc + (curr.valor * curr.probabilidade / 100), 0))}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Baseado na probabilidade</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>Oportunidades</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar oportunidade..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="kanban">
            <TabsList className="mb-4">
              <TabsTrigger value="kanban" className="flex items-center">
                <KanbanSquare className="h-4 w-4 mr-2" /> Kanban
              </TabsTrigger>
              <TabsTrigger value="lista" className="flex items-center">
                <List className="h-4 w-4 mr-2" /> Lista
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="kanban" className="mt-0">
              <KanbanBoard columns={kanbanColumns} setColumns={setKanbanColumns} />
            </TabsContent>
            
            <TabsContent value="lista" className="mt-0">
              <OportunidadesTable 
                oportunidades={filteredOportunidades} 
                sortConfig={sortConfig}
                requestSort={requestSort}
                getSortIcon={getSortIcon}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Oportunidades;
