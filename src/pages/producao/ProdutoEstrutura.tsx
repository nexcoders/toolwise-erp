
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
  X,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";

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
  
  // States for edit mode
  const [selectedProduto, setSelectedProduto] = useState<any>(null);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [isViewingBOM, setIsViewingBOM] = useState(false);
  
  // State for material dialog 
  const [isMaterialDialogOpen, setIsMaterialDialogOpen] = useState(false);
  const [materialToAdd, setMaterialToAdd] = useState<{id: string; quantidade: number}>({
    id: "",
    quantidade: 1
  });
  
  // State for product materials (editing)
  const [editingMateriais, setEditingMateriais] = useState<any[]>([]);
  
  // Handler for viewing BOM
  const handleViewBOM = (produto: any) => {
    setSelectedProduto(produto);
    setEditingMateriais([...produto.materiais]);
    setIsViewingBOM(true);
    setIsEditSheetOpen(true);
  };
  
  // Handler for editing product
  const handleEditProduct = (produto: any) => {
    setSelectedProduto(produto);
    setEditingMateriais([...produto.materiais]);
    setIsViewingBOM(false);
    setIsEditSheetOpen(true);
  };
  
  // Handler for deletion confirmation
  const handleDeleteProduct = (id: string) => {
    toast({
      title: "Produto excluído",
      description: `O produto ${id} foi excluído com sucesso.`,
    });
  };
  
  // Handler for saving product
  const handleSaveProduct = () => {
    toast({
      title: "Alterações salvas",
      description: "As alterações no produto foram salvas com sucesso.",
    });
    setIsEditSheetOpen(false);
  };
  
  // Handler for adding material to BOM
  const handleAddMaterial = () => {
    if (!materialToAdd.id || materialToAdd.quantidade <= 0) {
      toast({
        title: "Erro ao adicionar material",
        description: "Selecione um material e informe uma quantidade válida.",
        variant: "destructive"
      });
      return;
    }
    
    const materialSelected = mockMateriais.find(m => m.id === materialToAdd.id);
    if (!materialSelected) return;
    
    // Check if material already exists
    const materialExists = editingMateriais.some(m => m.id === materialToAdd.id);
    if (materialExists) {
      toast({
        title: "Material já adicionado",
        description: "Este material já está na estrutura do produto.",
        variant: "destructive"
      });
      return;
    }
    
    const newMaterial = {
      id: materialSelected.id,
      nome: materialSelected.nome,
      quantidade: materialToAdd.quantidade,
      unidade: materialSelected.unidade,
      custoUnitario: materialSelected.custo
    };
    
    setEditingMateriais([...editingMateriais, newMaterial]);
    setIsMaterialDialogOpen(false);
    setMaterialToAdd({ id: "", quantidade: 1 });
    
    toast({
      title: "Material adicionado",
      description: `${materialSelected.nome} foi adicionado à estrutura do produto.`
    });
  };
  
  // Handler for removing material from BOM
  const handleRemoveMaterial = (materialId: string) => {
    setEditingMateriais(editingMateriais.filter(m => m.id !== materialId));
    
    toast({
      title: "Material removido",
      description: "O material foi removido da estrutura do produto."
    });
  };

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
                          <DropdownMenuItem 
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={() => handleViewBOM(produto)}
                          >
                            <Eye className="h-4 w-4" />
                            <span>Ver Estrutura</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={() => handleEditProduct(produto)}
                          >
                            <FileEdit className="h-4 w-4" />
                            <span>Editar</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="flex items-center gap-2 text-destructive cursor-pointer"
                            onClick={() => handleDeleteProduct(produto.id)}
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
      
      {/* Sheet for editing product or viewing BOM */}
      <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
        <SheetContent className="sm:max-w-[600px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>
              {isViewingBOM 
                ? `Estrutura de Materiais: ${selectedProduto?.nome}`
                : `Editar Produto: ${selectedProduto?.nome}`
              }
            </SheetTitle>
            <SheetDescription>
              {isViewingBOM 
                ? "Visualize e edite a estrutura de materiais deste produto."
                : "Edite as informações e estrutura deste produto."
              }
            </SheetDescription>
          </SheetHeader>
          
          <div className="grid gap-6 py-6">
            {!isViewingBOM && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-codigo" className="text-right">
                    Código
                  </Label>
                  <Input
                    id="edit-codigo"
                    value={selectedProduto?.id}
                    className="col-span-3"
                    readOnly
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-nome" className="text-right">
                    Nome
                  </Label>
                  <Input
                    id="edit-nome"
                    value={selectedProduto?.nome}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-categoria" className="text-right">
                    Categoria
                  </Label>
                  <Select defaultValue={selectedProduto?.categoria.toLowerCase()}>
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
                  <Label htmlFor="edit-tempo" className="text-right">
                    Tempo (horas)
                  </Label>
                  <Input
                    id="edit-tempo"
                    type="number"
                    value={selectedProduto?.tempoProducao}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-custo" className="text-right">
                    Custo
                  </Label>
                  <Input
                    id="edit-custo"
                    type="number"
                    value={selectedProduto?.custoProducao}
                    step="0.01"
                    className="col-span-3"
                  />
                </div>
              </>
            )}
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Estrutura de Materiais</h3>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setIsMaterialDialogOpen(true)}
                >
                  <Plus className="h-3.5 w-3.5 mr-1" />
                  <span>Adicionar Material</span>
                </Button>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Material</TableHead>
                    <TableHead>Quantidade</TableHead>
                    <TableHead>Unidade</TableHead>
                    <TableHead>Custo Un.</TableHead>
                    <TableHead>Subtotal</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {editingMateriais.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                        Nenhum material adicionado à estrutura.
                      </TableCell>
                    </TableRow>
                  ) : (
                    editingMateriais.map((material) => (
                      <TableRow key={material.id}>
                        <TableCell>{material.nome}</TableCell>
                        <TableCell>{material.quantidade}</TableCell>
                        <TableCell>{material.unidade}</TableCell>
                        <TableCell>R$ {material.custoUnitario.toFixed(2)}</TableCell>
                        <TableCell>
                          R$ {(material.quantidade * material.custoUnitario).toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleRemoveMaterial(material.id)}
                          >
                            <X className="h-4 w-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                  {editingMateriais.length > 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-right font-medium">
                        Custo Total de Materiais:
                      </TableCell>
                      <TableCell className="font-bold">
                        R$ {editingMateriais
                          .reduce((total, mat) => total + (mat.quantidade * mat.custoUnitario), 0)
                          .toFixed(2)}
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
          
          <SheetFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsEditSheetOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveProduct}>
              Salvar Alterações
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      
      {/* Dialog for adding material to BOM */}
      <Dialog open={isMaterialDialogOpen} onOpenChange={setIsMaterialDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Adicionar Material</DialogTitle>
            <DialogDescription>
              Selecione um material do estoque para adicionar à estrutura do produto.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="material" className="text-right">
                Material
              </Label>
              <Select 
                value={materialToAdd.id} 
                onValueChange={(value) => setMaterialToAdd({...materialToAdd, id: value})}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione um material" />
                </SelectTrigger>
                <SelectContent>
                  {mockMateriais.map((material) => (
                    <SelectItem key={material.id} value={material.id}>
                      {material.nome} ({material.estoque} {material.unidade} disponível)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantidade" className="text-right">
                Quantidade
              </Label>
              <Input
                id="quantidade"
                type="number"
                min="0.1"
                step="0.1"
                value={materialToAdd.quantidade}
                onChange={(e) => setMaterialToAdd({
                  ...materialToAdd, 
                  quantidade: parseFloat(e.target.value) || 0
                })}
                className="col-span-3"
              />
            </div>
            
            {materialToAdd.id && (
              <div className="bg-muted p-3 rounded-md mt-2">
                <h4 className="font-medium mb-1">Informações do Material</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Nome:</span>{" "}
                    {mockMateriais.find(m => m.id === materialToAdd.id)?.nome}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Estoque:</span>{" "}
                    {mockMateriais.find(m => m.id === materialToAdd.id)?.estoque}{" "}
                    {mockMateriais.find(m => m.id === materialToAdd.id)?.unidade}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Custo Unitário:</span>{" "}
                    R$ {mockMateriais.find(m => m.id === materialToAdd.id)?.custo.toFixed(2)}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Subtotal:</span>{" "}
                    R$ {(
                      (mockMateriais.find(m => m.id === materialToAdd.id)?.custo || 0) * 
                      materialToAdd.quantidade
                    ).toFixed(2)}
                  </div>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsMaterialDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddMaterial}>Adicionar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProdutoEstrutura;
