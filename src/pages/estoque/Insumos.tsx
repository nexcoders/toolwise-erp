
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertTriangle,
  ArrowUpDown,
  FileEdit,
  MoreVertical,
  Package,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock data
const mockInsumos = [
  {
    id: "INS-001",
    nome: "Aço Carbono 1045",
    categoria: "Matéria-Prima",
    unidade: "Kg",
    estoque: 150,
    estoqueMinimo: 100,
    custoUnitario: 18.5,
    localizacao: "A-01-02",
  },
  {
    id: "INS-002",
    nome: "Aço Inox 304",
    categoria: "Matéria-Prima",
    unidade: "Kg",
    estoque: 75,
    estoqueMinimo: 80,
    custoUnitario: 35.75,
    localizacao: "A-02-01",
  },
  {
    id: "INS-003",
    nome: "Parafuso M8x1.25",
    categoria: "Componente",
    unidade: "Unid",
    estoque: 320,
    estoqueMinimo: 150,
    custoUnitario: 1.25,
    localizacao: "B-03-04",
  },
  {
    id: "INS-004",
    nome: "Óleo Refrigerante",
    categoria: "Insumo",
    unidade: "Litro",
    estoque: 12,
    estoqueMinimo: 20,
    custoUnitario: 45.00,
    localizacao: "C-05-01",
  },
  {
    id: "INS-005",
    nome: "Rebolo Diamantado 6\"",
    categoria: "Ferramenta",
    unidade: "Unid",
    estoque: 5,
    estoqueMinimo: 3,
    custoUnitario: 420.75,
    localizacao: "D-02-03",
  },
];

const Insumos: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const getEstoqueStatus = (atual: number, minimo: number) => {
    const porcentagem = (atual / minimo) * 100;
    if (porcentagem <= 50) {
      return (
        <div className="flex items-center gap-1 text-destructive">
          <AlertTriangle className="h-4 w-4" />
          <span>Crítico</span>
        </div>
      );
    } else if (porcentagem <= 75) {
      return (
        <div className="flex items-center gap-1 text-warning">
          <AlertTriangle className="h-4 w-4" />
          <span>Baixo</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-1 text-success">
          <span>Normal</span>
        </div>
      );
    }
  };

  const filteredInsumos = mockInsumos.filter(
    (insumo) =>
      insumo.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      insumo.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      insumo.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Insumos e Materiais</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              <span>Novo Insumo</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Cadastrar Novo Insumo</DialogTitle>
              <DialogDescription>
                Adicione um novo material ou insumo ao estoque.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="codigo" className="text-right">
                  Código
                </Label>
                <Input
                  id="codigo"
                  placeholder="Ex: INS-006"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nome" className="text-right">
                  Nome
                </Label>
                <Input
                  id="nome"
                  placeholder="Nome do insumo"
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
                    <SelectItem value="materia-prima">Matéria-Prima</SelectItem>
                    <SelectItem value="componente">Componente</SelectItem>
                    <SelectItem value="insumo">Insumo</SelectItem>
                    <SelectItem value="ferramenta">Ferramenta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="unidade" className="text-right">
                  Unidade
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione uma unidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">Kg</SelectItem>
                    <SelectItem value="unid">Unidade</SelectItem>
                    <SelectItem value="litro">Litro</SelectItem>
                    <SelectItem value="metro">Metro</SelectItem>
                    <SelectItem value="m2">Metro²</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="estoque" className="text-right">
                  Estoque Inicial
                </Label>
                <Input
                  id="estoque"
                  type="number"
                  min="0"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="estoqueMinimo" className="text-right">
                  Estoque Mínimo
                </Label>
                <Input
                  id="estoqueMinimo"
                  type="number"
                  min="0"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="custoUnitario" className="text-right">
                  Custo Unitário (R$)
                </Label>
                <Input
                  id="custoUnitario"
                  type="number"
                  min="0"
                  step="0.01"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="localizacao" className="text-right">
                  Localização
                </Label>
                <Input
                  id="localizacao"
                  placeholder="Ex: A-01-02"
                  className="col-span-3"
                />
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
              <CardTitle>Controle de Estoque</CardTitle>
              <CardDescription>
                Gerencie todos os insumos, materiais e componentes da ferramentaria.
              </CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar insumos..."
                className="pl-8 w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>
                  <Button variant="ghost" className="flex items-center gap-1 -ml-4">
                    <span>Estoque</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>Unidade</TableHead>
                <TableHead>Localização</TableHead>
                <TableHead>Custo Unit.</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInsumos.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-4 text-muted-foreground">
                    Nenhum insumo encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                filteredInsumos.map((insumo) => (
                  <TableRow key={insumo.id}>
                    <TableCell className="font-medium">{insumo.id}</TableCell>
                    <TableCell>{insumo.nome}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{insumo.categoria}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {insumo.estoque < insumo.estoqueMinimo ? (
                        <span className="text-destructive">{insumo.estoque}</span>
                      ) : (
                        insumo.estoque
                      )}
                    </TableCell>
                    <TableCell>{insumo.unidade}</TableCell>
                    <TableCell>{insumo.localizacao}</TableCell>
                    <TableCell>R$ {insumo.custoUnitario.toFixed(2)}</TableCell>
                    <TableCell>
                      {getEstoqueStatus(insumo.estoque, insumo.estoqueMinimo)}
                    </TableCell>
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
                            <Package className="h-4 w-4" />
                            <span>Movimentar Estoque</span>
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

export default Insumos;
