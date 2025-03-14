import React from "react";
import CrudPage from "@/components/shared/CrudPage";
import { Badge } from "@/components/ui/badge";
import { Building2, PhoneCall, ShoppingCart, User } from "lucide-react";
import FormComponent from "@/components/shared/FormComponent";

// Mock data (keeping the same mock data)
const mockFornecedores = [
  {
    id: "FOR-001",
    nome: "Ferramentas ABC",
    tipo: "Ferramentas",
    contato: "João Silva",
    telefone: "(11) 98765-4321",
    email: "contato@ferramentasabc.com",
    ativo: true,
    cnpj: "12.345.678/0001-90",
    endereco: "Av. Industrial, 1000, São Paulo - SP",
  },
  {
    id: "FOR-002",
    nome: "MetalSupply Ltda",
    tipo: "Matéria-Prima",
    contato: "Maria Oliveira",
    telefone: "(11) 91234-5678",
    email: "vendas@metalsupply.com.br",
    ativo: true,
    cnpj: "98.765.432/0001-10",
    endereco: "Rua dos Metais, 456, Guarulhos - SP",
  },
  {
    id: "FOR-003",
    nome: "Aços Especiais S.A.",
    tipo: "Matéria-Prima",
    contato: "Roberto Santos",
    telefone: "(21) 99876-5432",
    email: "comercial@acosespeciais.com.br",
    ativo: true,
    cnpj: "45.678.901/0001-23",
    endereco: "Av. das Indústrias, 789, Rio de Janeiro - RJ",
  },
  {
    id: "FOR-004",
    nome: "Parafusos & Cia",
    tipo: "Componentes",
    contato: "Ana Costa",
    telefone: "(11) 97654-3210",
    email: "vendas@parafusosecia.com.br",
    ativo: false,
    cnpj: "23.456.789/0001-34",
    endereco: "Rua dos Parafusos, 123, São Paulo - SP",
  },
  {
    id: "FOR-005",
    nome: "Ferragens Industrial",
    tipo: "Componentes",
    contato: "Carlos Ferreira",
    telefone: "(11) 95555-9999",
    email: "contato@ferragensindustrial.com.br",
    ativo: true,
    cnpj: "34.567.890/0001-45",
    endereco: "Av. das Ferragens, 567, Campinas - SP",
  },
];

const Fornecedores: React.FC = () => {
  // Form fields definition for create/edit
  const formFields = [
    {
      name: "id",
      label: "Código",
      type: "text" as const,
      placeholder: "Ex: FOR-006",
      required: true,
    },
    {
      name: "nome",
      label: "Nome/Razão Social",
      type: "text" as const,
      placeholder: "Nome da empresa",
      required: true,
    },
    {
      name: "tipo",
      label: "Tipo",
      type: "select" as const,
      placeholder: "Selecione o tipo",
      required: true,
      options: [
        { value: "Matéria-Prima", label: "Matéria-Prima" },
        { value: "Componentes", label: "Componentes" },
        { value: "Ferramentas", label: "Ferramentas" },
        { value: "Serviços", label: "Serviços" },
        { value: "Insumos", label: "Insumos" },
      ],
    },
    {
      name: "cnpj",
      label: "CNPJ",
      type: "text" as const,
      placeholder: "00.000.000/0000-00",
      required: true,
    },
    {
      name: "contato",
      label: "Nome do Contato",
      type: "text" as const,
      placeholder: "Nome da pessoa de contato",
      required: true,
    },
    {
      name: "telefone",
      label: "Telefone",
      type: "text" as const,
      placeholder: "(00) 00000-0000",
      required: true,
    },
    {
      name: "email",
      label: "E-mail",
      type: "email" as const,
      placeholder: "email@empresa.com",
      required: true,
    },
    {
      name: "endereco",
      label: "Endereço",
      type: "text" as const,
      placeholder: "Endereço completo",
      required: true,
    },
    {
      name: "ativo",
      label: "Ativo",
      type: "select" as const,
      required: true,
      options: [
        { value: "true", label: "Sim" },
        { value: "false", label: "Não" },
      ],
    },
  ];

  // Column definition for the table
  const columns = [
    {
      header: "Código",
      accessorKey: "id",
    },
    {
      header: "Nome",
      accessorKey: "nome",
      cell: (item: any) => (
        <div className="flex items-center gap-1">
          <Building2 className="h-4 w-4 text-muted-foreground" />
          <span>{item.nome}</span>
        </div>
      ),
    },
    {
      header: "Tipo",
      accessorKey: "tipo",
      cell: (item: any) => (
        <Badge variant="outline">{item.tipo}</Badge>
      ),
    },
    {
      header: "Contato",
      accessorKey: "contato",
      cell: (item: any) => (
        <div className="flex items-center gap-1">
          <User className="h-4 w-4 text-muted-foreground" />
          <span>{item.contato}</span>
        </div>
      ),
    },
    {
      header: "Telefone",
      accessorKey: "telefone",
      cell: (item: any) => (
        <div className="flex items-center gap-1">
          <PhoneCall className="h-4 w-4 text-muted-foreground" />
          <span>{item.telefone}</span>
        </div>
      ),
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Status",
      accessorKey: "ativo",
      cell: (item: any) => (
        item.ativo ? (
          <Badge className="bg-green-50 text-green-700">Ativo</Badge>
        ) : (
          <Badge variant="outline" className="text-muted-foreground">Inativo</Badge>
        )
      ),
    },
  ];

  // Custom actions for cotação
  const customActions = (item: any) => (
    <div
      className="flex items-center gap-2 cursor-pointer px-2 py-1.5 text-sm rounded-sm hover:bg-accent"
      onClick={(e) => {
        e.stopPropagation();
        console.log("Solicitar cotação para:", item.id);
      }}
    >
      <ShoppingCart className="h-4 w-4" />
      <span>Solicitar Cotação</span>
    </div>
  );

  // View component for detailed view
  const FornecedorView = ({ data, onClose }: { data: any, onClose: () => void }) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Código</p>
          <p className="font-medium">{data.id}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">CNPJ</p>
          <p>{data.cnpj}</p>
        </div>
        <div className="col-span-2">
          <p className="text-sm text-muted-foreground">Nome/Razão Social</p>
          <p className="font-medium">{data.nome}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Tipo</p>
          <Badge variant="outline">{data.tipo}</Badge>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Status</p>
          {data.ativo ? (
            <Badge className="bg-green-50 text-green-700">Ativo</Badge>
          ) : (
            <Badge variant="outline" className="text-muted-foreground">Inativo</Badge>
          )}
        </div>
        <div className="col-span-2">
          <p className="text-sm text-muted-foreground">Endereço</p>
          <p>{data.endereco}</p>
        </div>
        <div className="col-span-2">
          <p className="text-sm text-muted-foreground">Informações de Contato</p>
          <div className="space-y-1 mt-1">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4 text-muted-foreground" />
              <span>{data.contato}</span>
            </div>
            <div className="flex items-center gap-1">
              <PhoneCall className="h-4 w-4 text-muted-foreground" />
              <span>{data.telefone}</span>
            </div>
            <p>{data.email}</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Handlers for CRUD operations
  const handleCreateItem = (data: any) => {
    // Convert string 'true'/'false' to boolean for ativo field
    const newData = {
      ...data,
      ativo: data.ativo === "true",
    };
    console.log("Criar novo fornecedor:", newData);
    // In a real app, we would call an API here
  };

  const handleUpdateItem = (id: string, data: any) => {
    // Convert string 'true'/'false' to boolean for ativo field
    const updatedData = {
      ...data,
      ativo: data.ativo === "true",
    };
    console.log("Atualizar fornecedor:", id, updatedData);
    // In a real app, we would call an API here
  };

  const handleDeleteItem = (id: string) => {
    console.log("Excluir fornecedor:", id);
    // In a real app, we would call an API here
  };

  return (
    <CrudPage
      title="Fornecedores"
      description="Cadastro de Fornecedores"
      entityName="Fornecedor"
      columns={columns}
      data={mockFornecedores}
      formFields={formFields}
      onCreateItem={handleCreateItem}
      onUpdateItem={handleUpdateItem}
      onDeleteItem={handleDeleteItem}
      viewComponent={<FornecedorView data={{}} onClose={() => {}} />}
      customActions={customActions}
    />
  );
};

export default Fornecedores;
