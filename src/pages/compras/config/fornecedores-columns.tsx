
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Building2, PhoneCall, User } from "lucide-react";

export const fornecedoresColumns = [
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
