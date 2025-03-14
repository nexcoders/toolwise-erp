
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import BOMTable from "./BOMTable";
import MaterialSelector from "./MaterialSelector";

interface Material {
  id: string;
  nome: string;
  quantidade: number;
  unidade: string;
  custoUnitario: number;
}

interface MaterialInStock {
  id: string;
  nome: string;
  estoque: number;
  unidade: string;
  custo: number;
}

interface Product {
  id: string;
  nome: string;
  categoria: string;
  custoProducao: number;
  tempoProducao: number;
  ativo: boolean;
  materiais: Material[];
}

interface ProductEditorProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
  availableMaterials: MaterialInStock[];
  onSave: (product: Product) => void;
  viewOnly?: boolean;
}

const ProductEditor: React.FC<ProductEditorProps> = ({
  isOpen,
  onOpenChange,
  product,
  availableMaterials,
  onSave,
  viewOnly = false,
}) => {
  const { toast } = useToast();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingMaterials, setEditingMaterials] = useState<Material[]>([]);
  const [isMaterialDialogOpen, setIsMaterialDialogOpen] = useState(false);

  // Initialize editing state when sheet opens
  React.useEffect(() => {
    if (isOpen && product) {
      setEditingProduct({ ...product });
      setEditingMaterials([...product.materiais]);
    } else {
      // Clean up state when closing
      setTimeout(() => {
        setEditingProduct(null);
        setEditingMaterials([]);
      }, 300);
    }
  }, [isOpen, product]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Product
  ) => {
    if (!editingProduct) return;

    const value =
      field === "custoProducao" || field === "tempoProducao"
        ? Number(e.target.value)
        : e.target.value;

    setEditingProduct({
      ...editingProduct,
      [field]: value,
    });
  };

  const handleCategoryChange = (value: string) => {
    if (!editingProduct) return;
    setEditingProduct({
      ...editingProduct,
      categoria: value.charAt(0).toUpperCase() + value.slice(1),
    });
  };

  const handleAddMaterial = (material: Material) => {
    setEditingMaterials([...editingMaterials, material]);
    setIsMaterialDialogOpen(false);
  };

  const handleRemoveMaterial = (materialId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingMaterials(editingMaterials.filter((m) => m.id !== materialId));

    toast({
      title: "Material removido",
      description: "O material foi removido da estrutura do produto.",
    });
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!editingProduct) return;

    // Combine product data with materials
    const updatedProduct = {
      ...editingProduct,
      materiais: editingMaterials,
    };

    onSave(updatedProduct);
    onOpenChange(false);
  };

  // If there's no product to edit, don't render anything
  if (!editingProduct) return null;

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetContent className="sm:max-w-[600px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>
              {viewOnly
                ? `Estrutura de Materiais: ${editingProduct?.nome}`
                : `Editar Produto: ${editingProduct?.nome}`}
            </SheetTitle>
            <SheetDescription>
              {viewOnly
                ? "Visualize a estrutura de materiais deste produto."
                : "Edite as informações e estrutura deste produto."}
            </SheetDescription>
          </SheetHeader>

          <div className="grid gap-6 py-6">
            {!viewOnly && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-codigo" className="text-right">
                    Código
                  </Label>
                  <Input
                    id="edit-codigo"
                    value={editingProduct?.id}
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
                    value={editingProduct?.nome}
                    className="col-span-3"
                    onChange={(e) => handleInputChange(e, "nome")}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-categoria" className="text-right">
                    Categoria
                  </Label>
                  <Select
                    defaultValue={editingProduct?.categoria.toLowerCase()}
                    onValueChange={handleCategoryChange}
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
                  <Label htmlFor="edit-tempo" className="text-right">
                    Tempo (horas)
                  </Label>
                  <Input
                    id="edit-tempo"
                    type="number"
                    value={editingProduct?.tempoProducao}
                    className="col-span-3"
                    onChange={(e) => handleInputChange(e, "tempoProducao")}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-custo" className="text-right">
                    Custo
                  </Label>
                  <Input
                    id="edit-custo"
                    type="number"
                    value={editingProduct?.custoProducao}
                    step="0.01"
                    className="col-span-3"
                    onChange={(e) => handleInputChange(e, "custoProducao")}
                  />
                </div>
              </>
            )}

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Estrutura de Materiais</h3>
                {!viewOnly && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsMaterialDialogOpen(true);
                    }}
                  >
                    <Plus className="h-3.5 w-3.5 mr-1" />
                    <span>Adicionar Material</span>
                  </Button>
                )}
              </div>

              <BOMTable 
                materials={editingMaterials} 
                onRemoveMaterial={!viewOnly ? handleRemoveMaterial : undefined}
                readOnly={viewOnly}
              />
            </div>
          </div>

          <SheetFooter className="mt-4">
            <Button
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                onOpenChange(false);
              }}
            >
              {viewOnly ? "Fechar" : "Cancelar"}
            </Button>
            {!viewOnly && (
              <Button
                onClick={handleSave}
              >
                Salvar Alterações
              </Button>
            )}
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <MaterialSelector
        isOpen={isMaterialDialogOpen}
        onClose={() => setIsMaterialDialogOpen(false)}
        onAddMaterial={handleAddMaterial}
        availableMaterials={availableMaterials}
        existingMaterialIds={editingMaterials.map((m) => m.id)}
      />
    </>
  );
};

export default ProductEditor;
