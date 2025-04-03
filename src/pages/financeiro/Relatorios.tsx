
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, PieChart, ResponsiveContainer, Pie, Cell, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { receitasMock } from "./data/receitas-mock";
import { despesasMock } from "./data/despesas-mock";
import { format, subDays } from "date-fns";
import { pt } from "date-fns/locale";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Relatorios = () => {
  const today = new Date();
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(today, 30),
    to: today,
  });

  // Calcula total de receitas e despesas
  const totalReceitas = receitasMock.reduce((acc, item) => acc + item.valor, 0);
  const totalDespesas = despesasMock.reduce((acc, item) => acc + item.valor, 0);
  const saldo = totalReceitas - totalDespesas;

  // Dados para gráfico de fluxo de caixa
  const fluxoCaixaData = [
    { name: 'Receitas', valor: totalReceitas },
    { name: 'Despesas', valor: totalDespesas },
    { name: 'Saldo', valor: saldo },
  ];

  // Dados para gráfico de categorias de despesas
  const categoriasDespesas = despesasMock.reduce((acc, item) => {
    const existingCategory = acc.find(cat => cat.name === item.categoria);
    if (existingCategory) {
      existingCategory.valor += item.valor;
    } else {
      acc.push({ name: item.categoria, valor: item.valor });
    }
    return acc;
  }, [] as { name: string; valor: number }[]);

  // Dados para gráfico de métodos de pagamento receitas
  const metodosPagamento = receitasMock.reduce((acc, item) => {
    const existingMethod = acc.find(method => method.name === item.metodoPagamento);
    if (existingMethod) {
      existingMethod.valor += item.valor;
    } else {
      acc.push({ name: item.metodoPagamento, valor: item.valor });
    }
    return acc;
  }, [] as { name: string; valor: number }[]);

  // Formatador para valores monetários
  const currencyFormatter = (value: number) => `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Relatórios Financeiros</h1>
          <p className="text-muted-foreground">Análise e visualização financeira</p>
        </div>
        <div className="mt-4 md:mt-0">
          <DatePickerWithRange date={date} setDate={setDate} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card className={saldo >= 0 ? "border-green-500" : "border-red-500"}>
          <CardHeader>
            <CardTitle>Saldo</CardTitle>
            <CardDescription>Diferença entre receitas e despesas</CardDescription>
          </CardHeader>
          <CardContent>
            <p className={`text-2xl font-bold ${saldo >= 0 ? "text-green-500" : "text-red-500"}`}>
              {currencyFormatter(saldo)}
            </p>
            <div className="flex justify-between mt-2 text-sm">
              <div>
                <p className="text-muted-foreground">Receitas:</p>
                <p className="font-medium text-green-500">{currencyFormatter(totalReceitas)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Despesas:</p>
                <p className="font-medium text-red-500">{currencyFormatter(totalDespesas)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Previsto x Realizado</CardTitle>
            <CardDescription>Análise de orçamento</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-sm text-muted-foreground">Do orçamento utilizado</p>
            <div className="mt-4 h-2 w-full bg-gray-200 rounded-full">
              <div className="h-2 bg-blue-500 rounded-full" style={{ width: "85%" }}></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Próximos Vencimentos</CardTitle>
            <CardDescription>Despesas a vencer nos próximos 7 dias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {despesasMock
                .filter(item => item.status === "pendente")
                .slice(0, 3)
                .map((despesa, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{despesa.descricao}</p>
                      <p className="text-xs text-muted-foreground">{format(new Date(despesa.dataVencimento), "dd/MM/yyyy")}</p>
                    </div>
                    <p className="font-medium text-red-500">{currencyFormatter(despesa.valor)}</p>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="fluxo-caixa" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="fluxo-caixa">Fluxo de Caixa</TabsTrigger>
          <TabsTrigger value="categorias">Categorias de Despesas</TabsTrigger>
          <TabsTrigger value="metodos">Métodos de Pagamento</TabsTrigger>
        </TabsList>
        
        <TabsContent value="fluxo-caixa">
          <Card>
            <CardHeader>
              <CardTitle>Fluxo de Caixa</CardTitle>
              <CardDescription>Visão geral de receitas e despesas</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={fluxoCaixaData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => `R$ ${value}`} />
                  <Tooltip formatter={(value) => [currencyFormatter(value as number), ""]} />
                  <Legend />
                  <Bar dataKey="valor" name="Valor" fill="#8884d8">
                    {fluxoCaixaData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={index === 0 ? "#4ade80" : index === 1 ? "#f87171" : "#60a5fa"} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="categorias">
          <Card>
            <CardHeader>
              <CardTitle>Categorias de Despesas</CardTitle>
              <CardDescription>Distribuição por categoria</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoriasDespesas}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="valor"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoriasDespesas.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [currencyFormatter(value as number), ""]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="metodos">
          <Card>
            <CardHeader>
              <CardTitle>Métodos de Pagamento</CardTitle>
              <CardDescription>Receitas por método de pagamento</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={metodosPagamento}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="valor"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {metodosPagamento.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [currencyFormatter(value as number), ""]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Relatorios;
