
export const cotacoesFormFields = [
  {
    name: "fornecedor",
    label: "Fornecedor",
    type: "select",
    options: [
      { value: "ferramentas-abc", label: "Ferramentas ABC" },
      { value: "metalsupply", label: "MetalSupply Ltda" },
      { value: "acos-especiais", label: "Aços Especiais S.A." },
      { value: "parafusos-cia", label: "Parafusos & Cia" },
      { value: "ferragens-industrial", label: "Ferragens Industrial" },
    ],
    required: true,
  },
  {
    name: "data",
    label: "Data da Solicitação",
    type: "date",
    defaultValue: new Date().toISOString().split('T')[0],
    required: true,
  },
  {
    name: "itensIds",
    label: "Itens da Cotação",
    type: "multiselect",
    options: [
      { value: "aco-carbono", label: "Aço Carbono 1045" },
      { value: "aco-inox", label: "Aço Inox 304" },
      { value: "parafuso-m8", label: "Parafuso M8x1.25" },
      { value: "porca-m8", label: "Porca M8x1.25" },
      { value: "arruela-m8", label: "Arruela M8" },
    ],
    required: true,
  },
  {
    name: "quantidades",
    label: "Quantidades (separadas por vírgula)",
    type: "text",
    placeholder: "10, 20, 5",
    required: true,
  },
  {
    name: "observacoes",
    label: "Observações",
    type: "textarea",
    required: false,
  },
];
