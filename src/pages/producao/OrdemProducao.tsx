
import React, { useState, useEffect } from "react";
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
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { 
  ClipboardList, 
  FileEdit, 
  MoreVertical, 
  Plus, 
  Search,
  Eye,
  Trash2,
  X
} from "lucide-react";

// Mock data for products from the ProdutoEstrutura component
const mockProdutos = [
  {
    id: "PROD-001",
    nome: "Matriz de Corte 250mm",
    categoria: "Matriz",
    custoProducao: 1250.75,
    tempoProducao: 28,
    ativo: true,
    materiais: []
  },
  {
    id: "PROD-002",
    nome: "Molde Injeção Plástica M458",
    categoria: "Molde",
    custoProducao: 3700.25,
    tempoProducao: 45,
    ativo: true,
    materiais: []
  },
  {
    id: "PROD-003",
    nome: "Ferramenta de Dobra 120º",
    categoria: "Ferramenta",
    custoProducao: 950.00,
    tempoProducao: 18,
    ativo: true,
    materiais: []
  },
  {
    id: "PROD-004",
    nome: "Estampo Progressivo E789",
    categoria: "Estampo",
    custoProducao: 5250.50,
    tempoProducao: 60,
    ativo: true,
    materiais: []
  },
  {
    id: "PROD-005",
    nome: "Calibrador de Precisão C123",
    categoria: "Calibrador",
    custoProducao: 850.30,
    tempoProducao: 15,
    ativo: true,
    materiais: []
  },
];

// Mock data for clients
const mockClientes = [
  { id: "CLI-001", nome: "Metalúrgica ABC" },
  { id: "CLI-002", nome: "Plásticos XYZ" },
  { id: "CLI-003", nome: "Industria JKL" },
  { id: "CLI-004", nome: "Estamparia Delta" },
  { id: "CLI-005", nome: "Indústria Ômega" },
];

// Updated mock data
const mockOrdensProducao = [
  {
    id: "OP-001",
    cliente: "Metalúrgica ABC",
    dataInicio: "2023-10-15",
    previsaoTermino: "2023-11-05",
    status: "em-andamento",
    produtos: [
      { 
        id: "PROD-001", 
        nome: "Matriz de Corte 250mm", 
        quantidade: 1, 
        tempoProducao: 28 
      }
    ],
    tempoTotalProducao: 28
  },
  {
    id: "OP-002",
    cliente: "Plásticos XYZ",
    dataInicio: "2023-10-10",
    previsaoTermino: "2023-11-25",
    status: "em-andamento",
    produtos: [
      { 
        id: "PROD-002", 
        nome: "Molde Injeção Plástica M458", 
        quantidade: 1, 
        tempoProducao: 45 
      }
    ],
    tempoTotalProducao: 45
  },
  {
    id: "OP-003",
    cliente: "Industria JKL",
    dataInicio: "2023-09-25",
    previsaoTermino: "2023-10-20",
    status: "concluida",
    produtos: [
      { 
        id: "PROD-003", 
        nome: "Ferramenta de Dobra 120º", 
        quantidade: 1, 
        tempoProducao: 18 
      }
    ],
    tempoTotalProducao: 18
  },
  {
    id: "OP-004",
    cliente: "Estamparia Delta",
    dataInicio: "2023-10-01",
    previsaoTermino: "2023-12-15",
    status: "em-andamento",
    produtos: [
      { 
        id: "PROD-004", 
        nome: "Estampo Progressivo E789", 
        quantidade: 1, 
        tempoProducao: 60 
      }
    ],
    tempoTotalProducao: 60
  },
  {
    id: "OP-005",
    cliente: "Indústria Ômega",
    dataInicio: "2023-10-05",
    previsaoTermino: "2023-10-25",
    status: "aguardando-insumos",
    produtos: [
      { 
        id: "PROD-005", 
        nome: "Calibrador de Precisão C123", 
        quantidade: 1, 
        tempoProducao: 15 
      }
    ],
    tempoTotalProducao: 15
  },
];

const OrdemProducao: React.FC = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("todas");
  const [searchTerm, setSearchTerm] = useState("");
  const [ordensProducao, setOrdensProducao] = useState(mockOrdensProducao);
  
  // New order state
  const [cliente, setCliente] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [produtos, setProdutos] = useState<any[]>([]);
  const [selectedProduto, setSelectedProduto] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [tempoTotalProducao, setTempoTotalProducao] = useState(0);
  
  // Calculate end date based on start date and total production time
  const calcularPrevisaoTermino = (dataInicio: string, tempoProducao: number) => {
    if (!dataInicio) return "";
    
    const data = new Date(dataInicio);
    // Add production time in days (assuming 8-hour workdays)
    data.setDate(data.getDate() + Math.ceil(tempoProducao / 8));
    return data.toISOString().split('T')[0];
  };
  
  // Update total production time when products change
  useEffect(() => {
    const total = produtos.reduce((sum, produto) => 
      sum + (produto.tempoProducao * produto.quantidade), 0);
    setTempoTotalProducao(total);
  }, [produtos]);
  
  // Add product to the list of products for the new order
  const handleAddProduto = () => {
    if (!selectedProduto) return;
    
    const produto = mockProdutos.find(p => p.id === selectedProduto);
    if (!produto) return;
    
    // Check if product already exists in the list
    const existingProductIndex = produtos.findIndex(p => p.id === selectedProduto);
    
    if (existingProductIndex >= 0) {
      // Update quantity if product already exists
      const updatedProdutos = [...produtos];
      updatedProdutos[existingProductIndex].quantidade += quantidade;
      setProdutos(updatedProdutos);
    } else {
      // Add new product to the list
      setProdutos([
        ...produtos,
        {
          id: produto.id,
          nome: produto.nome,
          quantidade: quantidade,
          tempoProducao: produto.tempoProducao
        }
      ]);
    }
    
    // Reset selection
    setSelectedProduto("");
    setQuantidade(1);
  };
  
  // Remove product from the list
  const handleRemoveProduto = (id: string) => {
    setProdutos(produtos.filter(p => p.id !== id));
  };
  
  // Create new order
  const handleCreateOrder = () => {
    if (!cliente || !dataInicio || produtos.length === 0) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }
    
    const newOrder = {
      id: `OP-${(ordensProducao.length + 1).toString().padStart(3, '0')}`,
      cliente,
      dataInicio,
      previsaoTermino: calcularPrevisaoTermino(dataInicio, tempoTotalProducao),
      status: "em-andamento",
      produtos: [...produtos],
      tempoTotalProducao
    };
    
    setOrdensProducao([...ordensProducao, newOrder]);
    
    // Reset form
    setCliente("");
    setDataInicio("");
    setProdutos([]);
    setTempoTotalProducao(0);
    
    setIsDialogOpen(false);
    
    toast({
      title: "Ordem criada",
      description: `Ordem ${newOrder.id} criada com sucesso.`
    });
  };
  
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "em-andamento":
        return <Badge className="bg-blue-500">Em Andamento</Badge>;
      case "concluida":
        return <Badge className="bg-green-500">Concluída</Badge>;
      case "aguardando-insumos":
        return <Badge className="bg-yellow-500">Aguardando Insumos</Badge>;
      case "cancelada":
        return <Badge className="bg-red-500">Cancelada</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  const filteredOrdens = activeTab === "todas" 
    ? ordensProducao 
    : ordensProducao.filter(ordem => 
        activeTab === "em-andamento" 
          ? ordem.status === "em-andamento" 
          : activeTab === "concluidas" 
            ? ordem.status === "concluida" 
            : ordem.status === "aguardando-insumos"
      );
      
  // Apply search filter
  const searchedOrdens = searchTerm
    ? filteredOrdens.filter(ordem =>
        ordem.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ordem.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ordem.produtos.some(p => p.nome.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : filteredOrdens;

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
          <DialogContent className="sm:max-w-[650px]">
            <DialogHeader>
              <DialogTitle>Criar Nova Ordem de Produção</DialogTitle>
              <DialogDescription>
                Preencha os detalhes da nova ordem de produção.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cliente" className="text-right">
                  Cliente
                </Label>
                <Select value={cliente} onValueChange={setCliente}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione um cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockClientes.map(cliente => (
                      <SelectItem key={cliente.id} value={cliente.nome}>
                        {cliente.nome}
                      </SelectItem>
                    ))}
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
                  value={dataInicio}
                  onChange={(e) => setDataInicio(e.target.value)}
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
                  value={calcularPrevisaoTermino(dataInicio, tempoTotalProducao)}
                  readOnly
                  disabled
                />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Produtos a serem fabricados</h3>
                
                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <Label htmlFor="produto">Produto</Label>
                    <Select value={selectedProduto} onValueChange={setSelectedProduto}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um produto" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockProdutos.map(produto => (
                          <SelectItem key={produto.id} value={produto.id}>
                            {produto.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-24">
                    <Label htmlFor="quantidade">Quantidade</Label>
                    <Input
                      id="quantidade"
                      type="number"
                      min="1"
                      value={quantidade}
                      onChange={(e) => setQuantidade(parseInt(e.target.value) || 1)}
                    />
                  </div>
                  <Button 
                    type="button" 
                    onClick={handleAddProduto}
                    disabled={!selectedProduto}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Adicionar
                  </Button>
                </div>
                
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Produto</TableHead>
                        <TableHead>Quantidade</TableHead>
                        <TableHead>Tempo (h)</TableHead>
                        <TableHead>Total (h)</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {produtos.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                            Nenhum produto adicionado.
                          </TableCell>
                        </TableRow>
                      ) : (
                        produtos.map(produto => (
                          <TableRow key={produto.id}>
                            <TableCell>{produto.nome}</TableCell>
                            <TableCell>{produto.quantidade}</TableCell>
                            <TableCell>{produto.tempoProducao}</TableCell>
                            <TableCell>{produto.tempoProducao * produto.quantidade}</TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveProduto(produto.id)}
                                className="h-8 w-8"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                      
                      {produtos.length > 0 && (
                        <TableRow>
                          <TableCell colSpan={3} className="text-right font-medium">
                            Tempo Total de Produção:
                          </TableCell>
                          <TableCell colSpan={2} className="font-medium">
                            {tempoTotalProducao} horas
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button 
                onClick={handleCreateOrder}
                disabled={!cliente || !dataInicio || produtos.length === 0}
              >
                Criar Ordem
              </Button>
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
                <TableHead>Cliente</TableHead>
                <TableHead>Produtos</TableHead>
                <TableHead>Tempo Total</TableHead>
                <TableHead>Data de Início</TableHead>
                <TableHead>Prazo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {searchedOrdens.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4 text-muted-foreground">
                    Nenhuma ordem de produção encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                searchedOrdens.map((ordem) => (
                  <TableRow key={ordem.id}>
                    <TableCell className="font-medium">{ordem.id}</TableCell>
                    <TableCell>{ordem.cliente}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {ordem.produtos.map(produto => (
                          <div key={produto.id} className="text-xs">
                            {produto.nome} ({produto.quantidade}x)
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{ordem.tempoTotalProducao}h</TableCell>
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
