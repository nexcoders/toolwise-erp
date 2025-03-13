
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Eye,
  FileEdit,
  Layers,
  MoreVertical,
  Plus,
  Search,
  Trash2,
} from "lucide-react";

// Mock data
const mockProdutos = [
  {
    id: "PROD-001",
    nome: "Matriz de Corte 250mm",
    categoria: "Matriz",
    custoProducao: 1250.75,
    tempoProducao: 28,
    ativo: true,
  },
  {
    id: "PROD-002",
    nome: "Molde Injeção Plástica M458",
    categoria: "Molde",
    custoProducao: 3700.25,
    tempoProducao: 45,
    ativo: true,
  },
  {
    id: "PROD-003",
    nome: "Ferramenta de Dobra 120º",
    categoria: "Ferramenta",
    custoProducao: 950.00,
    tempoProducao: 18,
    ativo: true,
  },
  {
    id: "PROD-004",
    nome: "Estampo Progressivo E789",
    categoria: "Estampo",
    custoProducao: 5250.50,
    tempoProducao: 60,
    ativo: true,
  },
  {
    id: "PROD-005",
    nome: "Calibrador de Precisão C123",
    categoria: "Calibrador",
    custoProducao: 850.30,
    tempoProducao: 15,
    ativo: true,
  },
];

const ProdutoEstrutura: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("todos");

  const filteredProdutos = activeTab === "todos"
    ? mockProdutos
    : mockProdutos.filter(produto => 
        produto.categoria.toLowerCase() === activeTab
      );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Estrutura de Produtos</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              <span>Novo Produto</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Criar Novo Produto</DialogTitle>
              <DialogDescription>
                Defina os detalhes do novo produto e sua estrutura.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="codigo" className="text-right">
                  Código
                </Label>
                <Input
                  id="codigo"
                  placeholder="Ex: PROD-006"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nome" className="text-right">
                  Nome
                </Label>
                <Input
                  id="nome"
                  placeholder="Nome do produto"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="categoria" className="text-right">
                  Categoria
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="matriz">Matriz</SelectItem>
                    <SelectItem value="molde">Molde</SelectItem>
                    <SelectItem value="ferramenta">Ferramenta</SelectItem>
                    <SelectItem value="estampo">Estampo</SelectItem>
                    <SelectItem value="calibrador">Calibrador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tempoProducao" className="text-right">
                  Tempo de Produção (horas)
                </Label>
                <Input
                  id="tempoProducao"
                  type="number"
                  min="1"
                  className="col-span-3"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Estrutura de Materiais</h3>
                <div className="border rounded-md p-4">
                  <div className="flex justify-between mb-3">
                    <span className="text-sm text-muted-foreground">Adicione os insumos necessários</span>
                    <Button variant="outline" size="sm" className="h-8">
                      <Plus className="h-3.5 w-3.5 mr-1" />
                      <span>Adicionar Material</span>
                    </Button>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Insumo</TableHead>
                        <TableHead>Quantidade</TableHead>
                        <TableHead>Unidade</TableHead>
                        <TableHead>Custo Unitário</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                          Nenhum material adicionado.
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
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
              <CardTitle>Catálogo de Produtos</CardTitle>
              <CardDescription>
                Gerencie a estrutura e composição dos seus produtos.
              </CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar produtos..."
                className="pl-8 w-[250px]"
              />
            </div>
          </div>
          
          <Tabs defaultValue="todos" className="mt-4" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="todos" className="flex items-center gap-1">
                <Layers className="h-4 w-4" />
                <span>Todos</span>
              </TabsTrigger>
              <TabsTrigger value="matriz" className="flex items-center gap-1">
                <Layers className="h-4 w-4" />
                <span>Matrizes</span>
              </TabsTrigger>
              <TabsTrigger value="molde" className="flex items-center gap-1">
                <Layers className="h-4 w-4" />
                <span>Moldes</span>
              </TabsTrigger>
              <TabsTrigger value="ferramenta" className="flex items-center gap-1">
                <Layers className="h-4 w-4" />
                <span>Ferramentas</span>
              </TabsTrigger>
              <TabsTrigger value="estampo" className="flex items-center gap-1">
                <Layers className="h-4 w-4" />
                <span>Estampos</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Custo de Produção</TableHead>
                <TableHead>Tempo (horas)</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProdutos.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                    Nenhum produto encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                filteredProdutos.map((produto) => (
                  <TableRow key={produto.id}>
                    <TableCell className="font-medium">{produto.id}</TableCell>
                    <TableCell>{produto.nome}</TableCell>
                    <TableCell>{produto.categoria}</TableCell>
                    <TableCell>R$ {produto.custoProducao.toFixed(2)}</TableCell>
                    <TableCell>{produto.tempoProducao}</TableCell>
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
                            <span>Ver Estrutura</span>
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

export default ProdutoEstrutura;
