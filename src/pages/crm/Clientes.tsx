
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  Phone, 
  Mail, 
  MapPin,
  User,
  Building2,
  List,
  UserPlus
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ContactAssignment, { ContactGroup, Contact } from "@/components/crm/ContactAssignment";

// Mock data
const mockClientes = [
  {
    id: "CLI-001",
    nome: "Carlos Ferreira",
    telefone: "(11) 4567-8901",
    email: "carlos@metalica.com.br",
    empresa: "Indústria Metálica SA",
    cidade: "São Paulo",
    estado: "SP",
    tipo: "A",
    ultimoContato: "15/06/2023",
    assignedTo: "user1"
  },
  {
    id: "CLI-002",
    nome: "Ana Silva",
    telefone: "(21) 3456-7890",
    email: "ana@precisao.com.br",
    empresa: "Ferramentas Precisão Ltda",
    cidade: "Rio de Janeiro",
    estado: "RJ",
    tipo: "B",
    ultimoContato: "20/06/2023",
    assignedTo: "user2"
  },
  {
    id: "CLI-003",
    nome: "Roberto Almeida",
    telefone: "(31) 2345-6789",
    email: "roberto@cindustriais.com.br",
    empresa: "Componentes Industriais",
    cidade: "Belo Horizonte",
    estado: "MG",
    tipo: "A",
    ultimoContato: "12/06/2023",
    assignedTo: "user3"
  },
  {
    id: "CLI-004",
    nome: "Juliana Costa",
    telefone: "(41) 9876-5432",
    email: "juliana@pecasmoldes.com.br",
    empresa: "Peças & Moldes Especiais",
    cidade: "Curitiba",
    estado: "PR",
    tipo: "C",
    ultimoContato: "05/06/2023"
  },
  {
    id: "CLI-005",
    nome: "Marcos Oliveira",
    telefone: "(51) 8765-4321",
    email: "marcos@automacao.com.br",
    empresa: "Automação Industrial S.A.",
    cidade: "Porto Alegre",
    estado: "RS",
    tipo: "B",
    ultimoContato: "18/06/2023"
  },
];

// Mock users
const mockUsers = [
  { id: "user1", name: "Maria Santos", avatar: "" },
  { id: "user2", name: "João Silva", avatar: "" },
  { id: "user3", name: "Ana Costa", avatar: "" },
];

const getClienteTypeLabel = (tipo: string) => {
  switch (tipo) {
    case "A":
      return <Badge className="bg-brand-primary">Premium</Badge>;
    case "B":
      return <Badge className="bg-blue-500">Padrão</Badge>;
    case "C":
      return <Badge variant="outline">Básico</Badge>;
    default:
      return <Badge variant="outline">Indefinido</Badge>;
  }
};

const Clientes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  // Initialize contact groups
  const [contactGroups, setContactGroups] = useState<ContactGroup[]>([
    {
      id: "unassigned",
      title: "Não atribuídos",
      contacts: mockClientes
        .filter(cliente => !cliente.assignedTo)
        .map(cliente => ({
          id: cliente.id,
          nome: cliente.nome,
          telefone: cliente.telefone,
          email: cliente.email,
          empresa: cliente.empresa,
          tipo: cliente.tipo
        })),
      color: "bg-gray-500"
    },
    ...mockUsers.map(user => ({
      id: user.id,
      title: user.name,
      contacts: mockClientes
        .filter(cliente => cliente.assignedTo === user.id)
        .map(cliente => ({
          id: cliente.id,
          nome: cliente.nome,
          telefone: cliente.telefone,
          email: cliente.email,
          empresa: cliente.empresa,
          tipo: cliente.tipo,
          assignedTo: cliente.assignedTo
        })),
      color: "bg-brand-primary"
    }))
  ]);

  const filteredClientes = mockClientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveCliente = () => {
    setIsOpen(false);
    toast({
      title: "Cliente salvo",
      description: "O cliente foi salvo com sucesso.",
      variant: "default"
    });
  };

  return (
    <div className="container mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Clientes</h1>
          <p className="text-muted-foreground">Gerencie seus clientes e contatos</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-brand-primary hover:bg-brand-primary/90">
              <Plus className="mr-2 h-4 w-4" /> Novo Cliente
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Cliente</DialogTitle>
              <DialogDescription>
                Preencha os dados do cliente para adicioná-lo ao sistema.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome/Razão Social</Label>
                  <Input id="nome" placeholder="Nome do cliente ou empresa" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contato">Nome do Contato</Label>
                  <Input id="contato" placeholder="Nome do contato principal" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input id="telefone" placeholder="(00) 0000-0000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" type="email" placeholder="email@exemplo.com" />
                </div>
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
                  <Label htmlFor="tipo">Classificação</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">Premium (A)</SelectItem>
                      <SelectItem value="B">Padrão (B)</SelectItem>
                      <SelectItem value="C">Básico (C)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>Cancelar</Button>
              <Button className="bg-brand-primary hover:bg-brand-primary/90" onClick={handleSaveCliente}>Salvar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>Clientes</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar cliente..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="lista">
            <TabsList className="mb-4">
              <TabsTrigger value="lista" className="flex items-center">
                <List className="h-4 w-4 mr-2" /> Lista
              </TabsTrigger>
              <TabsTrigger value="atribuicao" className="flex items-center">
                <UserPlus className="h-4 w-4 mr-2" /> Atribuição de Contatos
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="lista" className="mt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Empresa</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>Cidade/UF</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Último Contato</TableHead>
                    <TableHead className="w-[80px]">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClientes.map((cliente) => (
                    <TableRow key={cliente.id}>
                      <TableCell className="font-medium">{cliente.id}</TableCell>
                      <TableCell>{cliente.nome}</TableCell>
                      <TableCell>{cliente.empresa}</TableCell>
                      <TableCell>{cliente.telefone}</TableCell>
                      <TableCell>{`${cliente.cidade}/${cliente.estado}`}</TableCell>
                      <TableCell>{getClienteTypeLabel(cliente.tipo)}</TableCell>
                      <TableCell>{cliente.ultimoContato}</TableCell>
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
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Editar</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <Phone className="mr-2 h-4 w-4" />
                              <span>Ligar</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <Mail className="mr-2 h-4 w-4" />
                              <span>Email</span>
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
            </TabsContent>
            
            <TabsContent value="atribuicao" className="mt-0">
              <ContactAssignment 
                groups={contactGroups} 
                setGroups={setContactGroups} 
                agents={mockUsers} 
              />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between border-t p-4">
          <div className="text-xs text-muted-foreground">
            Mostrando {filteredClientes.length} de {mockClientes.length} clientes
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Clientes;
