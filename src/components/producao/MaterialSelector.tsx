
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { useToast } from "@/hooks/use-toast";

interface Material {
  id: string;
  nome: string;
  estoque: number;
  unidade: string;
  custo: number;
}

interface MaterialSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMaterial: (material: {
    id: string;
    nome: string;
    quantidade: number;
    unidade: string;
    custoUnitario: number;
  }) => void;
  availableMaterials: Material[];
  existingMaterialIds?: string[];
}

const MaterialSelector: React.FC<MaterialSelectorProps> = ({
  isOpen,
  onClose,
  onAddMaterial,
  availableMaterials,
  existingMaterialIds = [],
}) => {
  const { toast } = useToast();
  const [materialToAdd, setMaterialToAdd] = useState<{
    id: string;
    quantidade: number;
  }>({
    id: "",
    quantidade: 1,
  });

  const handleAddMaterial = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!materialToAdd.id || materialToAdd.quantidade <= 0) {
      toast({
        title: "Erro ao adicionar material",
        description: "Selecione um material e informe uma quantidade válida.",
        variant: "destructive",
      });
      return;
    }

    const materialSelected = availableMaterials.find(
      (m) => m.id === materialToAdd.id
    );
    if (!materialSelected) return;

    // Check if material already exists
    if (existingMaterialIds.includes(materialToAdd.id)) {
      toast({
        title: "Material já adicionado",
        description: "Este material já está na estrutura do produto.",
        variant: "destructive",
      });
      return;
    }

    const newMaterial = {
      id: materialSelected.id,
      nome: materialSelected.nome,
      quantidade: materialToAdd.quantidade,
      unidade: materialSelected.unidade,
      custoUnitario: materialSelected.custo,
    };

    onAddMaterial(newMaterial);

    toast({
      title: "Material adicionado",
      description: `${materialSelected.nome} foi adicionado à estrutura do produto.`,
    });
  };

  const resetForm = () => {
    setMaterialToAdd({ id: "", quantidade: 1 });
  };

  const handleClose = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    resetForm();
    onClose();
  };

  const selectedMaterial = materialToAdd.id 
    ? availableMaterials.find(m => m.id === materialToAdd.id) 
    : null;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      <DialogContent className="sm:max-w-[500px]" onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>Adicionar Material</DialogTitle>
          <DialogDescription>
            Selecione um material do estoque para adicionar à estrutura do
            produto.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="material" className="text-right">
              Material
            </Label>
            <Select
              value={materialToAdd.id}
              onValueChange={(value) =>
                setMaterialToAdd({ ...materialToAdd, id: value })
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione um material" />
              </SelectTrigger>
              <SelectContent>
                {availableMaterials.map((material) => (
                  <SelectItem key={material.id} value={material.id}>
                    {material.nome} ({material.estoque} {material.unidade}{" "}
                    disponível)
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
              onChange={(e) =>
                setMaterialToAdd({
                  ...materialToAdd,
                  quantidade: parseFloat(e.target.value) || 0,
                })
              }
              className="col-span-3"
            />
          </div>

          {selectedMaterial && (
            <div className="bg-muted p-3 rounded-md mt-2">
              <h4 className="font-medium mb-1">Informações do Material</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Nome:</span>{" "}
                  {selectedMaterial.nome}
                </div>
                <div>
                  <span className="text-muted-foreground">Estoque:</span>{" "}
                  {selectedMaterial.estoque} {selectedMaterial.unidade}
                </div>
                <div>
                  <span className="text-muted-foreground">
                    Custo Unitário:
                  </span>{" "}
                  R$ {selectedMaterial.custo.toFixed(2)}
                </div>
                <div>
                  <span className="text-muted-foreground">Subtotal:</span>{" "}
                  R${" "}
                  {(selectedMaterial.custo * materialToAdd.quantidade).toFixed(
                    2
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={handleAddMaterial}>Adicionar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MaterialSelector;
