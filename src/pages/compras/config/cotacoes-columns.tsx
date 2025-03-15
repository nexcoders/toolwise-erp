
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Calendar, FileText, DollarSign } from "lucide-react";

export const cotacoesColumns = [
  {
    header: "Código",
    accessorKey: "id",
  },
  {
    header: "Data",
    accessorKey: "data",
    cell: (item: any) => (
      <div className="flex items-center gap-1">
        <Calendar className="h-4 w-4 text-muted-foreground" />
        <span>{new Date(item.data).toLocaleDateString('pt-BR')}</span>
      </div>
    ),
  },
  {
    header: "Fornecedor",
    accessorKey: "fornecedor",
    cell: (item: any) => (
      <div className="flex items-center gap-1">
        <FileText className="h-4 w-4 text-muted-foreground" />
        <span>{item.fornecedor}</span>
      </div>
    ),
  },
  {
    header: "Itens",
    accessorKey: "itens",
  },
  {
    header: "Valor Total",
    accessorKey: "valorTotal",
    cell: (item: any) => (
      <div className="flex items-center gap-1">
        <DollarSign className="h-4 w-4 text-muted-foreground" />
        <span>R$ {item.valorTotal.toFixed(2)}</span>
      </div>
    ),
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: (item: any) => {
      switch (item.status) {
        case "pendente":
          return <Badge variant="outline" className="bg-yellow-50 text-yellow-700">Pendente</Badge>;
        case "aprovada":
          return <Badge variant="outline" className="bg-green-50 text-green-700">Aprovada</Badge>;
        case "recusada":
          return <Badge variant="outline" className="bg-red-50 text-red-700">Recusada</Badge>;
        default:
          return <Badge variant="outline">{item.status}</Badge>;
      }
    },
  },
];
