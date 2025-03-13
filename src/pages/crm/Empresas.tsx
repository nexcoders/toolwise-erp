
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  Building2,
  MapPin,
  Globe,
  PhoneCall,
  Mail,
  Eye
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data
const mockEmpresas = [
  {
    id: "EMP-001",
    nome: "Indústria Metálica SA",
    cnpj: "12.345.678/0001-90",
    telefone: "(11) 4567-8901",
    email: "contato@metalica.com.br",
    endereco: "Av. Industrial, 1000",
    cidade: "São Paulo",
    estado: "SP",
    site: "www.metalica.com.br",
    segmento: "Indústria Metalúrgica",
    contatos: 3,
    oportunidades: 2
  },
  {
    id: "EMP-002",
    nome: "Ferramentas Precisão Ltda",
    cnpj: "23.456.789/0001-01",
    telefone: "(21) 3456-7890",
    email: "contato@precisao.com.br",
    endereco: "Rua das Ferramentas, 500",
    cidade: "Rio de Janeiro",
    estado: "RJ",
    site: "www.precisao.com.br",
    segmento: "Ferramentaria",
    contatos: 2,
    oportunidades: 1
  },
  {
    id: "EMP-003",
    nome: "Componentes Industriais",
    cnpj: "34.567.890/0001-12",
    telefone: "(31) 2345-6789",
    email: "contato@cindustriais.com.br",
    endereco: "Rua dos Componentes, 250",
    cidade: "Belo Horizonte",
    estado: "MG",
    site: "www.cindustriais.com.br",
    segmento: "Componentes Industriais",
    contatos: 4,
    oportunidades: 3
  },
  {
    id: "EMP-004",
    nome: "Peças & Moldes Especiais",
    cnpj: "45.678.901/0001-23",
    telefone: "(41) 9876-5432",
    email: "contato@pecasmoldes.com.br",
    endereco: "Av. dos Moldes, 750",
    cidade: "Curitiba",
    estado: "PR",
    site: "www.pecasmoldes.com.br",
    segmento: "Fabricação de Moldes",
    contatos: 2,
    oportunidades: 1
  },
  {
    id: "EMP-005",
    nome: "Automação Industrial S.A.",
    cnpj: "56.789.012/0001-34",
    telefone: "(51) 8765-4321",
    email: "contato@automacao.com.br",
    endereco: "Rua da Automação, 350",
    cidade: "Porto Alegre",
    estado: "RS",
    site: "www.automacao.com.br",
    segmento: "Automação Industrial",
    contatos: 3,
    oportunidades: 1
  },
];

const Empresas: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const filteredEmpresas = mockEmpresas.filter(empresa =>
    empresa.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    empresa.segmento.toLowerCase().includes(searchTerm.toLowerCase()) ||
    empresa.cidade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveEmpresa = () => {
    setIsOpen(false);
    toast({
      title: "Empresa salva",
      description: "A empresa foi salva com sucesso.",
      variant: "default"
    });
  };

  return (
    <div className="container mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Empresas</h1>
          <p className="text-muted-foreground">Gerencie informações de empresas</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-brand-primary hover:bg-brand-primary/90">
              <Plus className="mr-2 h-4 w-4" /> Nova Empresa
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Adicionar Nova Empresa</DialogTitle>
              <DialogDescription>
                Preencha os dados da empresa para adicioná-la ao sistema.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome/Razão Social</Label>
                  <Input id="nome" placeholder="Nome da empresa" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <Input id="cnpj" placeholder="00.000.000/0000-00" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input id="telefone" placeholder="(00) 0000-0000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" type="email" placeholder="contato@empresa.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="endereco">Endereço</Label>
                <Input id="endereco" placeholder="Endereço completo" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cidade">Cidade</Label>
                  <Input id="cidade" placeholder="Cidade" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estado">Estado</Label>
                  <Input id="estado" placeholder="UF" maxLength={2} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="segmento">Segmento</Label>
                  <Input id="segmento" placeholder="Segmento de atuação" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="site">Website</Label>
                <Input id="site" placeholder="www.exemplo.com.br" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea id="observacoes" placeholder="Informações adicionais sobre a empresa" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>Cancelar</Button>
              <Button className="bg-brand-primary hover:bg-brand-primary/90" onClick={handleSaveEmpresa}>Salvar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>Lista de Empresas</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar empresa..."
                className="pl-8"
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
                <TableHead>ID</TableHead>
                <TableHead>Empresa</TableHead>
                <TableHead>Segmento</TableHead>
                <TableHead>Cidade/UF</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Contatos</TableHead>
                <TableHead>Oportunidades</TableHead>
                <TableHead className="w-[80px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmpresas.map((empresa) => (
                <TableRow key={empresa.id}>
                  <TableCell className="font-medium">{empresa.id}</TableCell>
                  <TableCell>{empresa.nome}</TableCell>
                  <TableCell>{empresa.segmento}</TableCell>
                  <TableCell>{`${empresa.cidade}/${empresa.estado}`}</TableCell>
                  <TableCell>{empresa.telefone}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{empresa.contatos}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{empresa.oportunidades}</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer">
                          <Eye className="mr-2 h-4 w-4" />
                          <span>Ver Detalhes</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Editar</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Mail className="mr-2 h-4 w-4" />
                          <span>Enviar Email</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Globe className="mr-2 h-4 w-4" />
                          <span>Visitar Site</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive focus:text-destructive cursor-pointer">
                          <Trash className="mr-2 h-4 w-4" />
                          <span>Excluir</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between border-t p-4">
          <div className="text-xs text-muted-foreground">
            Mostrando {filteredEmpresas.length} de {mockEmpresas.length} empresas
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Empresas;
