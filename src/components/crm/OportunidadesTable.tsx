
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Edit, 
  Trash, 
  MoreVertical,
  Percent,
  Calendar
} from "lucide-react";
import { Opportunity } from "./KanbanBoard";

type OportunidadesTableProps = {
  oportunidades: Opportunity[];
  sortConfig: { key: string; direction: string };
  requestSort: (key: string) => void;
  getSortIcon: (name: string) => React.ReactNode;
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { 
    style: 'currency', 
    currency: 'BRL'
  }).format(value);
};

const getOportunidadeStageLabel = (fase: string) => {
  switch (fase) {
    case "prospecção":
      return <Badge variant="outline">Prospecção</Badge>;
    case "qualificacao":
      return <Badge className="bg-blue-500">Qualificação</Badge>;
    case "proposta":
      return <Badge className="bg-yellow-500 text-black">Proposta</Badge>;
    case "negociacao":
      return <Badge className="bg-purple-500">Negociação</Badge>;
    case "fechamento":
      return <Badge className="bg-brand-primary">Fechamento</Badge>;
    default:
      return <Badge variant="outline">Indefinido</Badge>;
  }
};

const OportunidadesTable: React.FC<OportunidadesTableProps> = ({
  oportunidades,
  sortConfig,
  requestSort,
  getSortIcon
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[80px]">ID</TableHead>
          <TableHead 
            className="cursor-pointer hover:text-primary"
            onClick={() => requestSort('cliente')}
          >
            <div className="flex items-center">
              Cliente {getSortIcon('cliente')}
            </div>
          </TableHead>
          <TableHead>Título</TableHead>
          <TableHead 
            className="cursor-pointer hover:text-primary"
            onClick={() => requestSort('valor')}
          >
            <div className="flex items-center">
              Valor {getSortIcon('valor')}
            </div>
          </TableHead>
          <TableHead 
            className="cursor-pointer hover:text-primary"
            onClick={() => requestSort('probabilidade')}
          >
            <div className="flex items-center">
              Prob. {getSortIcon('probabilidade')}
            </div>
          </TableHead>
          <TableHead 
            className="cursor-pointer hover:text-primary"
            onClick={() => requestSort('fase')}
          >
            <div className="flex items-center">
              Fase {getSortIcon('fase')}
            </div>
          </TableHead>
          <TableHead 
            className="cursor-pointer hover:text-primary"
            onClick={() => requestSort('dataPrevisao')}
          >
            <div className="flex items-center">
              Previsão {getSortIcon('dataPrevisao')}
            </div>
          </TableHead>
          <TableHead>Responsável</TableHead>
          <TableHead className="w-[80px]">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {oportunidades.map((oportunidade) => (
          <TableRow key={oportunidade.id}>
            <TableCell className="font-medium">{oportunidade.id}</TableCell>
            <TableCell>{oportunidade.cliente}</TableCell>
            <TableCell>{oportunidade.titulo}</TableCell>
            <TableCell>{formatCurrency(oportunidade.valor)}</TableCell>
            <TableCell>{oportunidade.probabilidade}%</TableCell>
            <TableCell>{getOportunidadeStageLabel(oportunidade.fase)}</TableCell>
            <TableCell>{oportunidade.dataPrevisao}</TableCell>
            <TableCell>{oportunidade.responsavel}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Ações</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <Edit className="mr-2 h-4 w-4" />
                    <span>Editar</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Percent className="mr-2 h-4 w-4" />
                    <span>Atualizar Probabilidade</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Agendar Contato</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive focus:text-destructive cursor-pointer">
                    <Trash className="mr-2 h-4 w-4" />
                    <span>Excluir</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OportunidadesTable;
