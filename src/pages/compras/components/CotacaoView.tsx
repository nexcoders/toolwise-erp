
import React from "react";
import { Badge } from "@/components/ui/badge";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CalendarIcon, FileText, DollarSign, ShoppingCart, Send, Check, X } from "lucide-react";

interface CotacaoViewProps {
  data: any;
  onClose: () => void;
  onStatusChange?: (id: string, status: string) => void;
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "pendente":
      return <Badge variant="outline" className="bg-yellow-50 text-yellow-700">Pendente</Badge>;
    case "aprovada":
      return <Badge variant="outline" className="bg-green-50 text-green-700">Aprovada</Badge>;
    case "recusada":
      return <Badge variant="outline" className="bg-red-50 text-red-700">Recusada</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const CotacaoView: React.FC<CotacaoViewProps> = ({ data, onClose, onStatusChange }) => {
  if (!data) return null;

  const itensList = Array.isArray(data.itensIds) 
    ? data.itensIds.map((id: string, index: number) => {
        const quantities = data.quantidades.split(',').map((q: string) => q.trim());
        let quantity = quantities[index] || "1";
        
        // Map dos IDs para nomes legíveis
        const itemsMap: Record<string, string> = {
          'aco-carbono': 'Aço Carbono 1045',
          'aco-inox': 'Aço Inox 304',
          'parafuso-m8': 'Parafuso M8x1.25',
          'porca-m8': 'Porca M8x1.25',
          'arruela-m8': 'Arruela M8',
        };
        
        return { id, nome: itemsMap[id] || id, quantidade: quantity };
      })
    : [];

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl">{data.id}</CardTitle>
            <CardDescription>Cotação para {data.fornecedor}</CardDescription>
          </div>
          <div>{getStatusBadge(data.status)}</div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Data</p>
            <p className="flex items-center gap-1">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              {new Date(data.data).toLocaleDateString('pt-BR')}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Valor Total</p>
            <p className="flex items-center gap-1">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              R$ {data.valorTotal.toFixed(2)}
            </p>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-medium mb-2 flex items-center gap-1">
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            <span>Itens da Cotação</span>
          </h3>
          <div className="bg-accent/50 rounded-md p-3">
            <ul className="space-y-2">
              {itensList.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>{item.nome}</span>
                  <span className="font-medium">{item.quantidade} unid.</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {data.observacoes && (
          <>
            <Separator />
            <div>
              <h3 className="font-medium mb-2 flex items-center gap-1">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span>Observações</span>
              </h3>
              <div className="bg-accent/50 rounded-md p-3">
                <p>{data.observacoes}</p>
              </div>
            </div>
          </>
        )}

        <Separator />

        <div className="flex justify-between items-center pt-2">
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
          <div className="flex gap-2">
            {data.status === "pendente" && onStatusChange && (
              <>
                <Button
                  variant="destructive"
                  className="flex items-center gap-1"
                  onClick={() => onStatusChange(data.id, "recusada")}
                >
                  <X className="h-4 w-4" />
                  <span>Recusar</span>
                </Button>
                <Button
                  className="flex items-center gap-1"
                  onClick={() => onStatusChange(data.id, "aprovada")}
                >
                  <Check className="h-4 w-4" />
                  <span>Aprovar</span>
                </Button>
              </>
            )}
            {data.status === "aprovada" && (
              <Button className="flex items-center gap-1">
                <Send className="h-4 w-4" />
                <span>Enviar</span>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CotacaoView;
