
// Define pre-registered items with their details
const preRegisteredItems = [
  { id: "aco-carbono", label: "Aço Carbono 1045", unit: "kg", price: 15.75 },
  { id: "aco-inox", label: "Aço Inox 304", unit: "kg", price: 32.50 },
  { id: "parafuso-m8", label: "Parafuso M8x1.25", unit: "unid", price: 0.75 },
  { id: "porca-m8", label: "Porca M8x1.25", unit: "unid", price: 0.45 },
  { id: "arruela-m8", label: "Arruela M8", unit: "unid", price: 0.25 },
  { id: "tubo-10mm", label: "Tubo 10mm", unit: "m", price: 8.50 },
  { id: "chapa-2mm", label: "Chapa 2mm", unit: "m²", price: 45.00 },
];

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
    name: "itens",
    label: "Itens da Cotação",
    type: "itemsSelector",
    items: preRegisteredItems,
    required: true,
  },
  {
    name: "observacoes",
    label: "Observações",
    type: "textarea",
    required: false,
  },
];

// Export pre-registered items for use in other components
export { preRegisteredItems };
