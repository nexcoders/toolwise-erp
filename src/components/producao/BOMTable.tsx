
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { X } from "lucide-react";

interface Material {
  id: string;
  nome: string;
  quantidade: number;
  unidade: string;
  custoUnitario: number;
}

interface BOMTableProps {
  materials: Material[];
  onRemoveMaterial?: (id: string, e: React.MouseEvent) => void;
  readOnly?: boolean;
}

const BOMTable: React.FC<BOMTableProps> = ({
  materials,
  onRemoveMaterial,
  readOnly = false,
}) => {
  // Calculate total cost of materials
  const totalCost = materials.reduce(
    (total, mat) => total + mat.quantidade * mat.custoUnitario,
    0
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Material</TableHead>
          <TableHead>Quantidade</TableHead>
          <TableHead>Unidade</TableHead>
          <TableHead>Custo Un.</TableHead>
          <TableHead>Subtotal</TableHead>
          {!readOnly && <TableHead className="text-right">Ações</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {materials.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={readOnly ? 5 : 6}
              className="text-center py-4 text-muted-foreground"
            >
              Nenhum material adicionado à estrutura.
            </TableCell>
          </TableRow>
        ) : (
          materials.map((material) => (
            <TableRow key={material.id}>
              <TableCell>{material.nome}</TableCell>
              <TableCell>{material.quantidade}</TableCell>
              <TableCell>{material.unidade}</TableCell>
              <TableCell>R$ {material.custoUnitario.toFixed(2)}</TableCell>
              <TableCell>
                R$ {(material.quantidade * material.custoUnitario).toFixed(2)}
              </TableCell>
              {!readOnly && (
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => onRemoveMaterial && onRemoveMaterial(material.id, e)}
                  >
                    <X className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))
        )}
        {materials.length > 0 && (
          <TableRow>
            <TableCell
              colSpan={4}
              className="text-right font-medium"
            >
              Custo Total de Materiais:
            </TableCell>
            <TableCell className="font-bold">
              R$ {totalCost.toFixed(2)}
            </TableCell>
            {!readOnly && <TableCell></TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default BOMTable;
