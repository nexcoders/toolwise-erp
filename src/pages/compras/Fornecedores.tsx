
import React from "react";
import CrudPage from "@/components/shared/CrudPage";
import { ShoppingCart } from "lucide-react";
import FornecedorView from "./components/FornecedorView";
import { mockFornecedores } from "./data/fornecedores-mock";
import { fornecedoresFormFields } from "./config/fornecedores-form-fields";
import { fornecedoresColumns } from "./config/fornecedores-columns";

const Fornecedores: React.FC = () => {
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
      columns={fornecedoresColumns}
      data={mockFornecedores}
      formFields={fornecedoresFormFields}
      onCreateItem={handleCreateItem}
      onUpdateItem={handleUpdateItem}
      onDeleteItem={handleDeleteItem}
      viewComponent={<FornecedorView data={{}} onClose={() => {}} />}
      customActions={customActions}
    />
  );
};

export default Fornecedores;
