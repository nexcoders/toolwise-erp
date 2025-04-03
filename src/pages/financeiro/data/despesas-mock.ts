
import { Despesa } from "../config/despesas-columns";

export const despesasMock: Despesa[] = [
  {
    id: "DESP-001",
    fornecedor: "Aços Brasil",
    descricao: "Matéria-prima - Aço inox",
    valor: 5800,
    dataEmissao: "2023-06-10",
    dataVencimento: "2023-07-10",
    dataPagamento: "2023-07-08",
    categoria: "Matéria-prima",
    status: "pago"
  },
  {
    id: "DESP-002",
    fornecedor: "Ferramentas Industriais",
    descricao: "Ferramentas de corte",
    valor: 2300,
    dataEmissao: "2023-06-15",
    dataVencimento: "2023-07-15",
    categoria: "Ferramentas",
    status: "pendente"
  },
  {
    id: "DESP-003",
    fornecedor: "Energia Elétrica SA",
    descricao: "Conta de energia elétrica",
    valor: 3800,
    dataEmissao: "2023-06-20",
    dataVencimento: "2023-07-20",
    dataPagamento: "2023-07-18",
    categoria: "Utilidades",
    status: "pago"
  },
  {
    id: "DESP-004",
    fornecedor: "Lubrificantes Ind",
    descricao: "Óleos e lubrificantes para maquinário",
    valor: 1200,
    dataEmissao: "2023-06-25",
    dataVencimento: "2023-07-25",
    categoria: "Manutenção",
    status: "pendente"
  },
  {
    id: "DESP-005",
    fornecedor: "Transportadora Rápida",
    descricao: "Frete de materiais",
    valor: 980,
    dataEmissao: "2023-07-01",
    dataVencimento: "2023-08-01",
    dataPagamento: "2023-07-30",
    categoria: "Logística",
    status: "pago"
  },
  {
    id: "DESP-006",
    fornecedor: "Seguros Industriais",
    descricao: "Apólice de seguro anual",
    valor: 5600,
    dataEmissao: "2023-07-05",
    dataVencimento: "2023-08-05",
    categoria: "Seguros",
    status: "pendente"
  },
  {
    id: "DESP-007",
    fornecedor: "Fornecedor de EPI",
    descricao: "Equipamentos de proteção individual",
    valor: 1800,
    dataEmissao: "2023-07-10",
    dataVencimento: "2023-08-10",
    dataPagamento: "2023-08-09",
    categoria: "Segurança",
    status: "pago"
  },
  {
    id: "DESP-008",
    fornecedor: "Manutenção de Maquinário",
    descricao: "Serviço técnico especializado",
    valor: 3500,
    dataEmissao: "2023-07-15",
    dataVencimento: "2023-08-15",
    categoria: "Manutenção",
    status: "pendente"
  }
];
