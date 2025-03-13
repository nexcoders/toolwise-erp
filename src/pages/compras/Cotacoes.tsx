
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  FileText,
  MoreVertical,
  Plus,
  Search,
  ShoppingCart,
  Eye,
  FileEdit,
  Trash2,
  Send,
} from "lucide-react";

// Mock data
const mockCotacoes = [
  {
    id: "COT-001",
    data: "2023-10-20",
    fornecedor: "Ferramentas ABC",
    itens: 5,
    valorTotal: 1250.75,
    status: "pendente",
  },
  {
    id: "COT-002",
    data: "2023-10-18",
    fornecedor: "MetalSupply Ltda",
    itens: 3,
    valorTotal: 875.30,
    status: "aprovada",
  },
  {
    id: "COT-003",
    data: "2023-10-15",
    fornecedor: "Aços Especiais S.A.",
    itens: 2,
    valorTotal: 3200.00,
    status: "aprovada",
  },
  {
    id: "COT-004",
    data: "2023-10-10",
    fornecedor: "Parafusos & Cia",
    itens: 8,
    valorTotal: 420.50,
    status: "recusada",
  },
  {
    id: "COT-005",
    data: "2023-10-08",
    fornecedor: "Ferragens Industrial",
    itens: 4,
    valorTotal: 1870.25,
    status: "pendente",
  },
];

const Cotacoes: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("todas");
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pendente":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700">Pendente</Badge>;
      case "aprovada":
        return <Badge variant="outline" className="bg-green-50 text-green-700">Aprovada</Badge>;
      case "recusada":
        return <Badge variant="outline" className="bg-red-50 text-red-700">Recusada</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredCotacoes = mockCotacoes
    .filter(
      (cotacao) =>
        (activeTab === "todas" ||
          (activeTab === "pendentes" && cotacao.status === "pendente") ||
          (activeTab === "aprovadas" && cotacao.status === "aprovada") ||
          (activeTab === "recusadas" && cotacao.status === "recusada")) &&
        (cotacao.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cotacao.fornecedor.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Cotações de Fornecedores</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              <span>Nova Cotação</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Criar Nova Cotação</DialogTitle>
              <DialogDescription>
                Preencha os dados para solicitar uma nova cotação.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fornecedor" className="text-right">
                  Fornecedor
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione um fornecedor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ferramentas-abc">Ferramentas ABC</SelectItem>
                    <SelectItem value="metalsupply">MetalSupply Ltda</SelectItem>
                    <SelectItem value="acos-especiais">Aços Especiais S.A.</SelectItem>
                    <SelectItem value="parafusos-cia">Parafusos & Cia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="data" className="text-right">
                  Data da Solicitação
                </Label>
                <Input
                  id="data"
                  type="date"
                  className="col-span-3"
                  defaultValue={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right col-span-4 font-bold">
                  Itens da Cotação
                </Label>
              </div>
              <div className="grid grid-cols-12 items-center gap-4">
                <Label htmlFor="item1" className="text-right col-span-3">
                  Item 1
                </Label>
                <Select className="col-span-5">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um insumo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aco-carbono">Aço Carbono 1045</SelectItem>
                    <SelectItem value="aco-inox">Aço Inox 304</SelectItem>
                    <SelectItem value="parafuso">Parafuso M8x1.25</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  placeholder="Qtde"
                  min="1"
                  className="col-span-2"
                />
                <Button variant="outline" size="icon" className="col-span-2">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="observacoes" className="text-right">
                  Observações
                </Label>
                <Input
                  id="observacoes"
                  placeholder="Observações adicionais"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setIsDialogOpen(false)}>Solicitar Cotação</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Cotações</CardTitle>
              <CardDescription>
                Gerencie e acompanhe todas as cotações com fornecedores.
              </CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar cotações..."
                className="pl-8 w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <Tabs defaultValue="todas" className="mt-4" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="todas" className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                <span>Todas</span>
              </TabsTrigger>
              <TabsTrigger value="pendentes" className="flex items-center gap-1">
                <ShoppingCart className="h-4 w-4" />
                <span>Pendentes</span>
              </TabsTrigger>
              <TabsTrigger value="aprovadas" className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                <span>Aprovadas</span>
              </TabsTrigger>
              <TabsTrigger value="recusadas" className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                <span>Recusadas</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Fornecedor</TableHead>
                <TableHead>Itens</TableHead>
                <TableHead>Valor Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCotacoes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                    Nenhuma cotação encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                filteredCotacoes.map((cotacao) => (
                  <TableRow key={cotacao.id}>
                    <TableCell className="font-medium">{cotacao.id}</TableCell>
                    <TableCell>{new Date(cotacao.data).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>{cotacao.fornecedor}</TableCell>
                    <TableCell>{cotacao.itens}</TableCell>
                    <TableCell>R$ {cotacao.valorTotal.toFixed(2)}</TableCell>
                    <TableCell>{getStatusBadge(cotacao.status)}</TableCell>
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
                          {cotacao.status === "pendente" && (
                            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                              <Send className="h-4 w-4" />
                              <span>Aprovar</span>
                            </DropdownMenuItem>
                          )}
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

export default Cotacoes;
