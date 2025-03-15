
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Item } from "./ItemsSelector";

export interface CotacaoViewProps {
  data: {
    id?: string;
    fornecedor?: string;
    data?: string;
    itens?: Item[];
    valorTotal?: number;
    status?: string;
    observacoes?: string;
  };
  onClose: () => void;
  onStatusChange?: (id: string, status: string) => void;
}

const CotacaoView: React.FC<CotacaoViewProps> = ({ data, onClose, onStatusChange }) => {
  if (!data.id) {
    return null;
  }

  // Handle status color based on the status value
  const getStatusBadge = () => {
    switch (data.status) {
      case "aprovada":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Aprovada</Badge>;
      case "recusada":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Recusada</Badge>;
      default:
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pendente</Badge>;
    }
  };

  // Format the date properly
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    } catch {
      return dateString;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle className="text-xl font-bold">{data.id}</CardTitle>
          <div className="text-sm text-muted-foreground mt-1">
            {data.fornecedor}
          </div>
          <div className="text-sm mt-1">
            Data: {data.data ? formatDate(data.data) : "Não informada"}
          </div>
          <div className="mt-2">
            {getStatusBadge()}
          </div>
        </div>

        {data.status === "pendente" && onStatusChange && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 hover:text-green-800"
              onClick={() => onStatusChange(data.id || "", "aprovada")}
            >
              <Check className="h-4 w-4 mr-1" /> Aprovar
            </Button>
            <Button
              variant="outline"
              className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100 hover:text-red-800"
              onClick={() => onStatusChange(data.id || "", "recusada")}
            >
              <X className="h-4 w-4 mr-1" /> Recusar
            </Button>
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">Itens da Cotação</h3>
          {data.itens && data.itens.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Unidade</TableHead>
                  <TableHead>Quantidade</TableHead>
                  <TableHead>Preço Unit.</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.itens.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.label}</TableCell>
                    <TableCell>{item.unit}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>R$ {item.price.toFixed(2)}</TableCell>
                    <TableCell>R$ {(item.quantity * item.price).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-muted-foreground">Nenhum item nesta cotação.</div>
          )}
        </div>

        <div>
          <h3 className="font-semibold mb-2">Valor Total</h3>
          <div className="text-lg font-medium">
            R$ {data.valorTotal?.toFixed(2) || "0.00"}
          </div>
        </div>

        {data.observacoes && (
          <div>
            <h3 className="font-semibold mb-2">Observações</h3>
            <p className="text-muted-foreground whitespace-pre-line">
              {data.observacoes}
            </p>
          </div>
        )}

        <div className="flex justify-end mt-4">
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CotacaoView;
