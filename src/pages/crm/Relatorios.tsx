
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  BarChart, 
  Bar, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  LineChart,
  Line
} from "recharts";
import { 
  Download, 
  Filter, 
  BarChart as BarChartIcon, 
  PieChart as PieChartIcon, 
  LineChart as LineChartIcon
} from "lucide-react";

// Mock data for charts
const oportunidadesPorEstagioData = [
  { name: 'Prospecção', value: 8 },
  { name: 'Qualificação', value: 12 },
  { name: 'Proposta', value: 15 },
  { name: 'Negociação', value: 7 },
  { name: 'Fechamento', value: 5 },
];

const clientesPorSegmentoData = [
  { name: 'Indústria Metalúrgica', value: 12 },
  { name: 'Ferramentaria', value: 8 },
  { name: 'Componentes Industriais', value: 15 },
  { name: 'Fabricação de Moldes', value: 10 },
  { name: 'Automação Industrial', value: 7 },
];

const vendasMensaisData = [
  { name: 'Jan', vendas: 45000 },
  { name: 'Fev', vendas: 52000 },
  { name: 'Mar', vendas: 48000 },
  { name: 'Abr', vendas: 61000 },
  { name: 'Mai', vendas: 55000 },
  { name: 'Jun', vendas: 67000 },
  { name: 'Jul', vendas: 72000 },
  { name: 'Ago', vendas: 68000 },
  { name: 'Set', vendas: 70000 },
  { name: 'Out', vendas: 65000 },
  { name: 'Nov', vendas: 75000 },
  { name: 'Dez', vendas: 85000 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { 
    style: 'currency', 
    currency: 'BRL'
  }).format(value);
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border rounded shadow">
        <p className="font-medium">{`${label}`}</p>
        <p className="text-brand-primary">{`${payload[0].name}: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const Relatorios: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("vendas");
  const [periodoFiltro, setPeriodoFiltro] = useState("anual");
  
  return (
    <div className="container mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Relatórios CRM</h1>
          <p className="text-muted-foreground">Análise de desempenho e métricas de CRM</p>
        </div>
        <div className="flex gap-2">
          <Select value={periodoFiltro} onValueChange={setPeriodoFiltro}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mensal">Mensal</SelectItem>
              <SelectItem value="trimestral">Trimestral</SelectItem>
              <SelectItem value="semestral">Semestral</SelectItem>
              <SelectItem value="anual">Anual</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" /> Filtrar
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Exportar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total de Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">127</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-brand-primary">+12%</span> em relação ao período anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Vendas Fechadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {formatCurrency(762500)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-brand-primary">+8%</span> em relação ao período anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Taxa de Conversão</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              38%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-brand-primary">+5%</span> em relação ao período anterior
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="vendas" className="w-full" value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full md:w-auto grid-cols-3">
          <TabsTrigger value="vendas" className="flex items-center gap-2">
            <LineChartIcon className="h-4 w-4" /> Vendas
          </TabsTrigger>
          <TabsTrigger value="oportunidades" className="flex items-center gap-2">
            <BarChartIcon className="h-4 w-4" /> Oportunidades
          </TabsTrigger>
          <TabsTrigger value="clientes" className="flex items-center gap-2">
            <PieChartIcon className="h-4 w-4" /> Clientes
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="vendas">
          <Card>
            <CardHeader>
              <CardTitle>Tendência de Vendas</CardTitle>
              <CardDescription>Evolução de vendas fechadas ao longo do período</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={vendasMensaisData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => `R$ ${value/1000}k`} />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="vendas" 
                    name="Vendas" 
                    stroke="#33cc33" 
                    activeDot={{ r: 8 }} 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="oportunidades">
          <Card>
            <CardHeader>
              <CardTitle>Oportunidades por Estágio</CardTitle>
              <CardDescription>Distribuição de oportunidades por fase do pipeline</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={oportunidadesPorEstagioData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" name="Quantidade" fill="#33cc33">
                    {oportunidadesPorEstagioData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="clientes">
          <Card>
            <CardHeader>
              <CardTitle>Clientes por Segmento</CardTitle>
              <CardDescription>Distribuição de clientes por segmento de atuação</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={clientesPorSegmentoData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {clientesPorSegmentoData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top 5 Clientes por Volume</CardTitle>
            <CardDescription>Clientes com maior volume de negócios</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Indústria Metálica SA", valor: 120000 },
                { name: "Componentes Industriais", valor: 95000 },
                { name: "Automação Industrial S.A.", valor: 85000 },
                { name: "Ferramentas Precisão Ltda", valor: 72000 },
                { name: "Peças & Moldes Especiais", valor: 58000 }
              ].map((cliente, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="bg-brand-primary/20 text-brand-primary w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                    <span>{cliente.name}</span>
                  </div>
                  <span className="font-medium">{formatCurrency(cliente.valor)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Eficiência da Equipe</CardTitle>
            <CardDescription>Desempenho da equipe de vendas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Maria Santos", oportunidades: 15, conversao: 80 },
                { name: "João Silva", oportunidades: 12, conversao: 60 },
                { name: "Ana Costa", oportunidades: 18, conversao: 75 },
                { name: "Carlos Mendes", oportunidades: 10, conversao: 70 },
                { name: "Fernanda Lima", oportunidades: 14, conversao: 85 }
              ].map((vendedor, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span>{vendedor.name}</span>
                    <span className="text-sm text-muted-foreground">{vendedor.conversao}% conversão</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-brand-primary h-2 rounded-full" 
                      style={{ width: `${vendedor.conversao}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {vendedor.oportunidades} oportunidades gerenciadas
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Relatorios;
