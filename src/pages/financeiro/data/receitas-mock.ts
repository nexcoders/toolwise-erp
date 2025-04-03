
import { Receita } from "../config/receitas-columns";

export const receitasMock: Receita[] = [
  {
    id: "REC-001",
    cliente: "MetalTech Ltda",
    descricao: "Molde para injeção plástica",
    valor: 15000,
    dataEmissao: "2023-06-15",
    dataVencimento: "2023-07-15",
    dataPagamento: "2023-07-12",
    metodoPagamento: "Transferência Bancária",
    status: "recebido"
  },
  {
    id: "REC-002",
    cliente: "Precision Tools",
    descricao: "Ferramentas de corte especiais",
    valor: 8500,
    dataEmissao: "2023-06-20",
    dataVencimento: "2023-07-20",
    metodoPagamento: "Boleto",
    status: "pendente"
  },
  {
    id: "REC-003",
    cliente: "FabriAço",
    descricao: "Manutenção de moldes",
    valor: 3200,
    dataEmissao: "2023-06-25",
    dataVencimento: "2023-07-25",
    dataPagamento: "2023-07-22",
    metodoPagamento: "Cartão de Crédito",
    status: "recebido"
  },
  {
    id: "REC-004",
    cliente: "Peças & Moldes",
    descricao: "Ferramentaria para componentes automotivos",
    valor: 22000,
    dataEmissao: "2023-06-28",
    dataVencimento: "2023-07-28",
    metodoPagamento: "Transferência Bancária",
    status: "pendente"
  },
  {
    id: "REC-005",
    cliente: "IndustrialTech",
    descricao: "Projeto e fabricação de matriz",
    valor: 17500,
    dataEmissao: "2023-07-01",
    dataVencimento: "2023-08-01",
    dataPagamento: "2023-07-30",
    metodoPagamento: "Boleto",
    status: "recebido"
  },
  {
    id: "REC-006",
    cliente: "TecnoMoldes",
    descricao: "Desenvolvimento de protótipo",
    valor: 9800,
    dataEmissao: "2023-07-05",
    dataVencimento: "2023-08-05",
    metodoPagamento: "Cheque",
    status: "pendente"
  },
  {
    id: "REC-007",
    cliente: "Precision Tools",
    descricao: "Fabricação de dispositivos de usinagem",
    valor: 12300,
    dataEmissao: "2023-07-10",
    dataVencimento: "2023-08-10",
    dataPagamento: "2023-08-08",
    metodoPagamento: "PIX",
    status: "recebido"
  },
  {
    id: "REC-008",
    cliente: "MetalTech Ltda",
    descricao: "Serviços de usinagem CNC",
    valor: 6500,
    dataEmissao: "2023-07-15",
    dataVencimento: "2023-08-15",
    metodoPagamento: "Transferência Bancária",
    status: "pendente"
  }
];
