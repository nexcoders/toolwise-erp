
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
import { useToast } from "@/hooks/use-toast";
import BOMTable from "@/components/producao/BOMTable";
import ProductEditor from "@/components/producao/ProductEditor";

// Mock data for products
const mockProdutos = [
  {
    id: "PROD-001",
    nome: "Matriz de Corte 250mm",
    categoria: "Matriz",
    custoProducao: 1250.75,
    tempoProducao: 28,
    ativo: true,
    materiais: [
      { id: "MAT-001", nome: "Aço Ferramenta D2", quantidade: 12, unidade: "kg", custoUnitario: 45.5 },
      { id: "MAT-002", nome: "Mola de Pressão", quantidade: 4, unidade: "un", custoUnitario: 18.75 }
    ]
  },
  {
    id: "PROD-002",
    nome: "Molde Injeção Plástica M458",
    categoria: "Molde",
    custoProducao: 3700.25,
    tempoProducao: 45,
    ativo: true,
    materiais: [
      { id: "MAT-003", nome: "Aço P20", quantidade: 30, unidade: "kg", custoUnitario: 62.30 },
      { id: "MAT-004", nome: "Pinos Ejetores", quantidade: 8, unidade: "un", custoUnitario: 12.40 }
    ]
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
    materiais: [
      { id: "MAT-005", nome: "Aço VD2", quantidade: 45, unidade: "kg", custoUnitario: 58.90 }
    ]
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

// Mock data for materials
const mockMateriais = [
  { id: "MAT-001", nome: "Aço Ferramenta D2", estoque: 250, unidade: "kg", custo: 45.5 },
  { id: "MAT-002", nome: "Mola de Pressão", estoque: 120, unidade: "un", custo: 18.75 },
  { id: "MAT-003", nome: "Aço P20", estoque: 180, unidade: "kg", custo: 62.30 },
  { id: "MAT-004", nome: "Pinos Ejetores", estoque: 350, unidade: "un", custo: 12.40 },
  { id: "MAT-005", nome: "Aço VD2", estoque: 95, unidade: "kg", custo: 58.90 },
  { id: "MAT-006", nome: "Parafusos M8", estoque: 500, unidade: "un", custo: 0.45 },
  { id: "MAT-007", nome: "Alumínio 7075", estoque: 120, unidade: "kg", custo: 78.20 },
  { id: "MAT-008", nome: "Borracha Nitrílica", estoque: 45, unidade: "kg", custo: 35.60 },
];

const ProdutoEstrutura: React.FC = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("todos");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Product editor state
  const [selectedProduto, setSelectedProduto] = useState<any>(null);
  const [isProductEditorOpen, setIsProductEditorOpen] = useState(false);
  const [isViewingBOM, setIsViewingBOM] = useState(false);
  
  // New product creation state
  const [newProduct, setNewProduct] = useState({
    id: "",
    nome: "",
    categoria: "",
    custoProducao: 0,
    tempoProducao: 0,
    materiais: [],
  });
  
  // Handler for viewing BOM - Fixed to properly stop event propagation
  const handleViewBOM = (produto: any, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setSelectedProduto({...produto});
    setIsViewingBOM(true);
    setIsProductEditorOpen(true);
  };
  
  // Handler for editing product - Fixed to properly stop event propagation
  const handleEditProduct = (produto: any, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setSelectedProduto({...produto});
    setIsViewingBOM(false);
    setIsProductEditorOpen(true);
  };
  
  // Handler for deletion confirmation - Fixed to properly stop event propagation
  const handleDeleteProduct = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    toast({
      title: "Produto excluído",
      description: `O produto ${id} foi excluído com sucesso.`,
    });
  };
  
  // Handler for saving product
  const handleSaveProduct = (updatedProduct: any) => {
    toast({
      title: "Alterações salvas",
      description: "As alterações no produto foram salvas com sucesso.",
    });
  };
  
  const filteredProdutos = activeTab === "todos"
    ? mockProdutos
    : mockProdutos.filter(produto => 
        produto.categoria.toLowerCase() === activeTab
      );
      
  // Apply search filtering
  const searchedProdutos = searchTerm
    ? filteredProdutos.filter(produto =>
        produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        produto.id.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredProdutos;

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
          <DialogContent 
            className="sm:max-w-[600px]"
            onClick={(e) => e.stopPropagation()} // Prevent event bubbling
          >
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
                  value={newProduct.id}
                  onChange={(e) => setNewProduct({...newProduct, id: e.target.value})}
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
                  value={newProduct.nome}
                  onChange={(e) => setNewProduct({...newProduct, nome: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="categoria" className="text-right">
                  Categoria
                </Label>
                <Select
                  value={newProduct.categoria}
                  onValueChange={(value) => setNewProduct({...newProduct, categoria: value})}
                >
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
                  value={newProduct.tempoProducao || ""}
                  onChange={(e) => setNewProduct({...newProduct, tempoProducao: Number(e.target.value)})}
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
                  <BOMTable materials={[]} readOnly={false} />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDialogOpen(false);
                }}>
                Cancelar
              </Button>
              <Button 
                onClick={(e) => {
                  e.stopPropagation();
                  toast({
                    title: "Produto criado",
                    description: "O novo produto foi criado com sucesso.",
                  });
                  setIsDialogOpen(false);
                }}>
                Salvar
              </Button>
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
              {searchedProdutos.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                    Nenhum produto encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                searchedProdutos.map((produto) => (
                  <TableRow key={produto.id}>
                    <TableCell className="font-medium">{produto.id}</TableCell>
                    <TableCell>{produto.nome}</TableCell>
                    <TableCell>{produto.categoria}</TableCell>
                    <TableCell>R$ {produto.custoProducao.toFixed(2)}</TableCell>
                    <TableCell>{produto.tempoProducao}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                          <DropdownMenuLabel>Ações</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={(e) => handleViewBOM(produto, e)}
                          >
                            <Eye className="h-4 w-4" />
                            <span>Ver Estrutura</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={(e) => handleEditProduct(produto, e)}
                          >
                            <FileEdit className="h-4 w-4" />
                            <span>Editar</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="flex items-center gap-2 text-destructive cursor-pointer"
                            onClick={(e) => handleDeleteProduct(produto.id, e)}
                          >
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
      
      {/* Product editor for viewing or editing product details and BOM */}
      <ProductEditor
        isOpen={isProductEditorOpen}
        onOpenChange={setIsProductEditorOpen}
        product={selectedProduto}
        availableMaterials={mockMateriais}
        onSave={handleSaveProduct}
        viewOnly={isViewingBOM}
      />
    </div>
  );
};

export default ProdutoEstrutura;
