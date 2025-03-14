import React from "react";
import CrudPage from "@/components/shared/CrudPage";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Package } from "lucide-react";
import FormComponent from "@/components/shared/FormComponent";

// Mock data (keeping the same mock data)
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

// Get estoque status component
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

const Insumos: React.FC = () => {
  // Form fields definition for create/edit
  const formFields = [
    {
      name: "id",
      label: "Código",
      type: "text" as const,
      placeholder: "Ex: INS-006",
      required: true,
    },
    {
      name: "nome",
      label: "Nome",
      type: "text" as const,
      placeholder: "Nome do insumo",
      required: true,
    },
    {
      name: "categoria",
      label: "Categoria",
      type: "select" as const,
      required: true,
      options: [
        { value: "Matéria-Prima", label: "Matéria-Prima" },
        { value: "Componente", label: "Componente" },
        { value: "Insumo", label: "Insumo" },
        { value: "Ferramenta", label: "Ferramenta" },
      ],
    },
    {
      name: "unidade",
      label: "Unidade",
      type: "select" as const,
      required: true,
      options: [
        { value: "Kg", label: "Kg" },
        { value: "Unid", label: "Unidade" },
        { value: "Litro", label: "Litro" },
        { value: "Metro", label: "Metro" },
        { value: "m2", label: "Metro²" },
      ],
    },
    {
      name: "estoque",
      label: "Estoque Inicial",
      type: "number" as const,
      min: 0,
      required: true,
    },
    {
      name: "estoqueMinimo",
      label: "Estoque Mínimo",
      type: "number" as const,
      min: 0,
      required: true,
    },
    {
      name: "custoUnitario",
      label: "Custo Unitário (R$)",
      type: "number" as const,
      min: 0,
      step: 0.01,
      required: true,
    },
    {
      name: "localizacao",
      label: "Localização",
      type: "text" as const,
      placeholder: "Ex: A-01-02",
      required: true,
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
    },
    {
      header: "Categoria",
      accessorKey: "categoria",
      cell: (item: any) => (
        <Badge variant="outline">{item.categoria}</Badge>
      ),
    },
    {
      header: "Estoque",
      accessorKey: "estoque",
      cell: (item: any) => (
        <span className={item.estoque < item.estoqueMinimo ? "text-destructive font-medium" : "font-medium"}>
          {item.estoque}
        </span>
      ),
    },
    {
      header: "Unidade",
      accessorKey: "unidade",
    },
    {
      header: "Localização",
      accessorKey: "localizacao",
    },
    {
      header: "Custo Unit.",
      accessorKey: "custoUnitario",
      cell: (item: any) => (
        <span>R$ {item.custoUnitario.toFixed(2)}</span>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (item: any) => getEstoqueStatus(item.estoque, item.estoqueMinimo),
    },
  ];

  // Custom actions for material movement
  const customActions = (item: any) => (
    <div
      className="flex items-center gap-2 cursor-pointer px-2 py-1.5 text-sm rounded-sm hover:bg-accent"
      onClick={(e) => {
        e.stopPropagation();
        console.log("Movimentar estoque para:", item.id);
      }}
    >
      <Package className="h-4 w-4" />
      <span>Movimentar Estoque</span>
    </div>
  );

  // View component for detailed view
  const InsumoView = ({ data, onClose }: { data: any, onClose: () => void }) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Código</p>
          <p className="font-medium">{data.id}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Categoria</p>
          <Badge variant="outline">{data.categoria}</Badge>
        </div>
        <div className="col-span-2">
          <p className="text-sm text-muted-foreground">Nome</p>
          <p className="font-medium">{data.nome}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Unidade</p>
          <p>{data.unidade}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Localização</p>
          <p>{data.localizacao}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Estoque Atual</p>
          <p className={data.estoque < data.estoqueMinimo ? "text-destructive font-medium" : "font-medium"}>
            {data.estoque} {data.unidade}
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Estoque Mínimo</p>
          <p>{data.estoqueMinimo} {data.unidade}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Custo Unitário</p>
          <p>R$ {data.custoUnitario.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Status</p>
          {getEstoqueStatus(data.estoque, data.estoqueMinimo)}
        </div>
      </div>
    </div>
  );

  // Handlers for CRUD operations
  const handleCreateItem = (data: any) => {
    console.log("Criar novo insumo:", data);
    // In a real app, we would call an API here
  };

  const handleUpdateItem = (id: string, data: any) => {
    console.log("Atualizar insumo:", id, data);
    // In a real app, we would call an API here
  };

  const handleDeleteItem = (id: string) => {
    console.log("Excluir insumo:", id);
    // In a real app, we would call an API here
  };

  return (
    <CrudPage
      title="Insumos e Materiais"
      description="Controle de Estoque"
      entityName="Insumo"
      columns={columns}
      data={mockInsumos}
      formFields={formFields}
      onCreateItem={handleCreateItem}
      onUpdateItem={handleUpdateItem}
      onDeleteItem={handleDeleteItem}
      viewComponent={<InsumoView data={{}} onClose={() => {}} />}
      customActions={customActions}
    />
  );
};

export default Insumos;
