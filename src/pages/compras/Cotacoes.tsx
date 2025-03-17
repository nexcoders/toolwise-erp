import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import CrudPage from "@/components/shared/CrudPage";
import { cotacoesColumns } from "./config/cotacoes-columns";
import { cotacoesFormFields } from "./config/cotacoes-form-fields";
import { mockCotacoes } from "./data/cotacoes-mock";
import CotacaoView from "./components/CotacaoView";
import { FileEdit, Eye, Trash2, Filter, Search } from "lucide-react";
import ItemsSelector, { Item } from "./components/ItemsSelector";

// Add a custom field renderer for the ItemsSelector component
const customFieldRenderers = {
  itemsSelector: (field: any, value: any, onChange: (value: any) => void, formValues: any) => (
    <ItemsSelector 
      value={value || []} 
      onChange={(items) => onChange(items)}
      supplierFilter={formValues.fornecedor} // Pass the selected supplier to filter items
    />
  ),
};

const Cotacoes: React.FC = () => {
  const { toast } = useToast();
  const [cotacoes, setCotacoes] = useState(mockCotacoes);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todas");

  const handleCreateItem = (data: any) => {
    // Simular geração de ID
    const newId = `COT-${String(cotacoes.length + 1).padStart(3, '0')}`;
    
    // Calcular valor total da cotação baseado nos itens selecionados
    const itens = data.itens || [];
    const valorTotal = itens.reduce(
      (total: number, item: Item) => total + (item.quantity * item.price), 
      0
    );
    
    // Criar nova cotação
    const newCotacao = {
      ...data,
      id: newId,
      itensCount: itens.length,
      valorTotal: parseFloat(valorTotal.toFixed(2)),
      status: "pendente",
    };
    
    setCotacoes([...cotacoes, newCotacao]);
    toast({
      title: "Cotação criada",
      description: `Cotação ${newId} criada com sucesso.`,
    });
    
    return newCotacao;
  };

  const handleUpdateItem = (id: string, data: any) => {
    const index = cotacoes.findIndex((cotacao) => cotacao.id === id);
    if (index !== -1) {
      // Calcular valor total da cotação baseado nos itens selecionados
      const itens = data.itens || [];
      const valorTotal = itens.reduce(
        (total: number, item: Item) => total + (item.quantity * item.price), 
        0
      );
      
      // Atualizar cotação
      const updatedCotacao = {
        ...cotacoes[index],
        ...data,
        itensCount: itens.length,
        valorTotal: parseFloat(valorTotal.toFixed(2)),
      };
      
      const updatedCotacoes = [...cotacoes];
      updatedCotacoes[index] = updatedCotacao;
      setCotacoes(updatedCotacoes);
      
      toast({
        title: "Cotação atualizada",
        description: `Cotação ${id} atualizada com sucesso.`,
      });
      
      return updatedCotacao;
    }
    return null;
  };

  const handleDeleteItem = (id: string) => {
    setCotacoes(cotacoes.filter((cotacao) => cotacao.id !== id));
    toast({
      title: "Cotação excluída",
      description: `Cotação ${id} excluída com sucesso.`,
    });
  };

  const handleStatusChange = (id: string, status: string) => {
    const index = cotacoes.findIndex((cotacao) => cotacao.id === id);
    if (index !== -1) {
      const updatedCotacoes = [...cotacoes];
      updatedCotacoes[index] = {
        ...updatedCotacoes[index],
        status,
      };
      setCotacoes(updatedCotacoes);
      
      const statusText = status === "aprovada" ? "aprovada" : "recusada";
      toast({
        title: `Cotação ${statusText}`,
        description: `Cotação ${id} foi ${statusText} com sucesso.`,
      });
    }
  };

  const filteredCotacoes = cotacoes
    .filter(
      (cotacao) =>
        (statusFilter === "todas" ||
          (statusFilter === "pendentes" && cotacao.status === "pendente") ||
          (statusFilter === "aprovadas" && cotacao.status === "aprovada") ||
          (statusFilter === "recusadas" && cotacao.status === "recusada")) &&
        (cotacao.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cotacao.fornecedor.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());

  const actionButtons = [
    {
      icon: <Eye />,
      label: "Visualizar",
      action: "view",
    },
    {
      icon: <FileEdit />,
      label: "Editar",
      action: "edit",
    },
    {
      icon: <Trash2 />,
      label: "Excluir",
      action: "delete",
      variant: "destructive" as const,
    },
  ];

  const tabOptions = [
    { value: "todas", label: "Todas", icon: <Search className="h-4 w-4" /> },
    { value: "pendentes", label: "Pendentes", icon: <Filter className="h-4 w-4" /> },
    { value: "aprovadas", label: "Aprovadas", icon: <Filter className="h-4 w-4" /> },
    { value: "recusadas", label: "Recusadas", icon: <Filter className="h-4 w-4" /> },
  ];

  return (
    <CrudPage
      title="Cotações de Fornecedores"
      description="Gerencie e acompanhe todas as cotações com fornecedores."
      data={filteredCotacoes}
      columns={cotacoesColumns}
      formFields={cotacoesFormFields}
      onCreateItem={handleCreateItem}
      onUpdateItem={handleUpdateItem}
      onDeleteItem={handleDeleteItem}
      viewComponent={<CotacaoView data={{}} onClose={() => {}} />}
      customViewProps={{ onStatusChange: handleStatusChange }}
      actionButtons={actionButtons}
      tabOptions={tabOptions}
      activeTab={statusFilter}
      onTabChange={setStatusFilter}
      searchValue={searchTerm}
      onSearchChange={setSearchTerm}
      searchPlaceholder="Buscar cotações..."
      entityName="Cotação"
      customFieldRenderers={customFieldRenderers}
    />
  );
};

export default Cotacoes;
