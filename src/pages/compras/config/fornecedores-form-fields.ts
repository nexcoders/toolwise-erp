
// Form fields definition for fornecedores
export const fornecedoresFormFields = [
  {
    name: "id",
    label: "Código",
    type: "text" as const,
    placeholder: "Ex: FOR-006",
    required: true,
  },
  {
    name: "nome",
    label: "Nome/Razão Social",
    type: "text" as const,
    placeholder: "Nome da empresa",
    required: true,
  },
  {
    name: "tipo",
    label: "Tipo",
    type: "select" as const,
    placeholder: "Selecione o tipo",
    required: true,
    options: [
      { value: "Matéria-Prima", label: "Matéria-Prima" },
      { value: "Componentes", label: "Componentes" },
      { value: "Ferramentas", label: "Ferramentas" },
      { value: "Serviços", label: "Serviços" },
      { value: "Insumos", label: "Insumos" },
    ],
  },
  {
    name: "cnpj",
    label: "CNPJ",
    type: "text" as const,
    placeholder: "00.000.000/0000-00",
    required: true,
  },
  {
    name: "contato",
    label: "Nome do Contato",
    type: "text" as const,
    placeholder: "Nome da pessoa de contato",
    required: true,
  },
  {
    name: "telefone",
    label: "Telefone",
    type: "text" as const,
    placeholder: "(00) 00000-0000",
    required: true,
  },
  {
    name: "email",
    label: "E-mail",
    type: "email" as const,
    placeholder: "email@empresa.com",
    required: true,
  },
  {
    name: "endereco",
    label: "Endereço",
    type: "text" as const,
    placeholder: "Endereço completo",
    required: true,
  },
  {
    name: "ativo",
    label: "Ativo",
    type: "select" as const,
    required: true,
    options: [
      { value: "true", label: "Sim" },
      { value: "false", label: "Não" },
    ],
  },
];
