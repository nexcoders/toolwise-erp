
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
  ArrowDownIcon,
  ArrowUpIcon,
  Calendar,
  FileText,
  Plus,
  Search,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock data
const mockMovimentacoes = [
  {
    id: "MOV-001",
    data: "2023-10-25",
    tipo: "entrada",
    insumo: "Aço Carbono 1045",
    quantidade: 50,
    unidade: "Kg",
    responsavel: "João Silva",
    documento: "NF-12345",
    observacao: "Compra emergencial",
  },
  {
    id: "MOV-002",
    data: "2023-10-24",
    tipo: "saida",
    insumo: "Aço Carbono 1045",
    quantidade: 12.5,
    unidade: "Kg",
    responsavel: "Maria Oliveira",
    documento: "OP-001",
    observacao: "Para produção da Matriz 250mm",
  },
  {
    id: "MOV-003",
    data: "2023-10-23",
    tipo: "entrada",
    insumo: "Parafuso M8x1.25",
    quantidade: 100,
    unidade: "Unid",
    responsavel: "José Santos",
    documento: "NF-12348",
    observacao: "",
  },
  {
    id: "MOV-004",
    data: "2023-10-22",
    tipo: "saida",
    insumo: "Óleo Refrigerante",
    quantidade: 5,
    unidade: "Litro",
    responsavel: "Carlos Pereira",
    documento: "REQ-078",
    observacao: "Manutenção de máquinas",
  },
  {
    id: "MOV-005",
    data: "2023-10-21",
    tipo: "entrada",
    insumo: "Rebolo Diamantado 6\"",
    quantidade: 2,
    unidade: "Unid",
    responsavel: "Ana Costa",
    documento: "NF-12350",
    observacao: "",
  },
];

const Movimentacoes: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("todas");
  const [searchTerm, setSearchTerm] = useState("");

  const getTipoLabel = (tipo: string) => {
    if (tipo === "entrada") {
      return (
        <div className="flex items-center gap-1 text-success">
          <ArrowDownIcon className="h-4 w-4" />
          <span>Entrada</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-1 text-destructive">
          <ArrowUpIcon className="h-4 w-4" />
          <span>Saída</span>
        </div>
      );
    }
  };

  const filteredMovimentacoes = mockMovimentacoes
    .filter(
      (mov) =>
        (activeTab === "todas" ||
          (activeTab === "entradas" && mov.tipo === "entrada") ||
          (activeTab === "saidas" && mov.tipo === "saida")) &&
        (mov.insumo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          mov.documento.toLowerCase().includes(searchTerm.toLowerCase()) ||
          mov.responsavel.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Movimentações de Estoque</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              <span>Nova Movimentação</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Registrar Movimentação</DialogTitle>
              <DialogDescription>
                Registre uma entrada ou saída de material do estoque.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tipo" className="text-right">
                  Tipo
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entrada">Entrada</SelectItem>
                    <SelectItem value="saida">Saída</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="insumo" className="text-right">
                  Insumo
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione o insumo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aco-carbono">Aço Carbono 1045</SelectItem>
                    <SelectItem value="aco-inox">Aço Inox 304</SelectItem>
                    <SelectItem value="parafuso">Parafuso M8x1.25</SelectItem>
                    <SelectItem value="oleo">Óleo Refrigerante</SelectItem>
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
                  min="0"
                  step="0.01"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="documento" className="text-right">
                  Documento
                </Label>
                <Input
                  id="documento"
                  placeholder="Ex: NF-12345, OP-001"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="responsavel" className="text-right">
                  Responsável
                </Label>
                <Input
                  id="responsavel"
                  placeholder="Nome do responsável"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="observacao" className="text-right">
                  Observação
                </Label>
                <Input
                  id="observacao"
                  placeholder="Observações (opcional)"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setIsDialogOpen(false)}>Registrar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Histórico de Movimentações</CardTitle>
              <CardDescription>
                Visualize todas as entradas e saídas de materiais.
              </CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar movimentações..."
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
              <TabsTrigger value="entradas" className="flex items-center gap-1">
                <ArrowDownIcon className="h-4 w-4" />
                <span>Entradas</span>
              </TabsTrigger>
              <TabsTrigger value="saidas" className="flex items-center gap-1">
                <ArrowUpIcon className="h-4 w-4" />
                <span>Saídas</span>
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
                <TableHead>Tipo</TableHead>
                <TableHead>Insumo</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead>Documento</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead>Observação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMovimentacoes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4 text-muted-foreground">
                    Nenhuma movimentação encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                filteredMovimentacoes.map((movimentacao) => (
                  <TableRow key={movimentacao.id}>
                    <TableCell className="font-medium">{movimentacao.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{new Date(movimentacao.data).toLocaleDateString('pt-BR')}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getTipoLabel(movimentacao.tipo)}</TableCell>
                    <TableCell>{movimentacao.insumo}</TableCell>
                    <TableCell>
                      {movimentacao.quantidade} {movimentacao.unidade}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{movimentacao.documento}</Badge>
                    </TableCell>
                    <TableCell>{movimentacao.responsavel}</TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {movimentacao.observacao || "—"}
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

export default Movimentacoes;
