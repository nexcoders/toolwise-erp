
import React from "react";
import { Badge } from "@/components/ui/badge";
import { PhoneCall, User } from "lucide-react";

interface FornecedorViewProps {
  data: any;
  onClose: () => void;
}

const FornecedorView: React.FC<FornecedorViewProps> = ({ data, onClose }) => {
  // Prevent event propagation
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (!data || !data.id) {
    return null;
  }

  return (
    <div className="space-y-4" onClick={handleContentClick}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Código</p>
          <p className="font-medium">{data.id}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">CNPJ</p>
          <p>{data.cnpj}</p>
        </div>
        <div className="col-span-2">
          <p className="text-sm text-muted-foreground">Nome/Razão Social</p>
          <p className="font-medium">{data.nome}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Tipo</p>
          <Badge variant="outline">{data.tipo}</Badge>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Status</p>
          {data.ativo ? (
            <Badge className="bg-green-50 text-green-700">Ativo</Badge>
          ) : (
            <Badge variant="outline" className="text-muted-foreground">Inativo</Badge>
          )}
        </div>
        <div className="col-span-2">
          <p className="text-sm text-muted-foreground">Endereço</p>
          <p>{data.endereco}</p>
        </div>
        <div className="col-span-2">
          <p className="text-sm text-muted-foreground">Informações de Contato</p>
          <div className="space-y-1 mt-1">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4 text-muted-foreground" />
              <span>{data.contato}</span>
            </div>
            <div className="flex items-center gap-1">
              <PhoneCall className="h-4 w-4 text-muted-foreground" />
              <span>{data.telefone}</span>
            </div>
            <p>{data.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FornecedorView;
