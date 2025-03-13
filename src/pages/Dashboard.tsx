
import React from "react";
import { Card } from "@/components/ui/card";
import {
  AlertTriangle,
  ArrowDownIcon,
  ArrowUpIcon,
  ClipboardList,
  Package,
  ShoppingCart,
  Wrench,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from "recharts";

// Mock data for charts
const productionData = [
  { name: "Jan", concluidas: 24, emProgresso: 18 },
  { name: "Fev", concluidas: 18, emProgresso: 22 },
  { name: "Mar", concluidas: 29, emProgresso: 13 },
  { name: "Abr", concluidas: 31, emProgresso: 15 },
  { name: "Mai", concluidas: 26, emProgresso: 17 },
  { name: "Jun", concluidas: 32, emProgresso: 19 },
];

const inventoryData = [
  { name: "Jan", estoque: 65 },
  { name: "Fev", estoque: 59 },
  { name: "Mar", estoque: 80 },
  { name: "Abr", estoque: 81 },
  { name: "Mai", estoque: 76 },
  { name: "Jun", estoque: 85 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      {/* Metrics summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="dashboard-card">
          <div className="metric-card">
            <div className="flex justify-between items-start">
              <div>
                <div className="metric-value">42</div>
                <div className="metric-label">Ordens de produção ativas</div>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <ClipboardList className="h-5 w-5 text-blue-700" />
              </div>
            </div>
            <div className="text-xs flex items-center text-success">
              <ArrowUpIcon className="h-3 w-3 mr-1" />
              <span>8% em relação ao mês anterior</span>
            </div>
          </div>
        </Card>
        
        <Card className="dashboard-card">
          <div className="metric-card">
            <div className="flex justify-between items-start">
              <div>
                <div className="metric-value">217</div>
                <div className="metric-label">Insumos em estoque</div>
              </div>
              <div className="p-2 bg-emerald-100 rounded-full">
                <Package className="h-5 w-5 text-emerald-700" />
              </div>
            </div>
            <div className="text-xs flex items-center text-destructive">
              <ArrowDownIcon className="h-3 w-3 mr-1" />
              <span>3% em relação ao mês anterior</span>
            </div>
          </div>
        </Card>
        
        <Card className="dashboard-card">
          <div className="metric-card">
            <div className="flex justify-between items-start">
              <div>
                <div className="metric-value">15</div>
                <div className="metric-label">Cotações pendentes</div>
              </div>
              <div className="p-2 bg-amber-100 rounded-full">
                <ShoppingCart className="h-5 w-5 text-amber-700" />
              </div>
            </div>
            <div className="text-xs flex items-center text-success">
              <ArrowUpIcon className="h-3 w-3 mr-1" />
              <span>12% em relação ao mês anterior</span>
            </div>
          </div>
        </Card>
        
        <Card className="dashboard-card">
          <div className="metric-card">
            <div className="flex justify-between items-start">
              <div>
                <div className="metric-value">89</div>
                <div className="metric-label">Produtos finalizados</div>
              </div>
              <div className="p-2 bg-indigo-100 rounded-full">
                <Wrench className="h-5 w-5 text-indigo-700" />
              </div>
            </div>
            <div className="text-xs flex items-center text-success">
              <ArrowUpIcon className="h-3 w-3 mr-1" />
              <span>15% em relação ao mês anterior</span>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Ordens de Produção</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="concluidas" name="Concluídas" fill="hsl(var(--success))" />
              <Bar dataKey="emProgresso" name="Em Progresso" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Níveis de Estoque</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={inventoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="estoque"
                name="Nível de Estoque"
                stroke="hsl(var(--primary))"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
      
      {/* Progress cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Eficiência da Produção</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Meta mensal</span>
                <span>75%</span>
              </div>
              <Progress value={68} className="h-2" />
              <p className="text-xs text-muted-foreground">68% alcançado</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Tempo de entrega</span>
                <span>90%</span>
              </div>
              <Progress value={82} className="h-2" />
              <p className="text-xs text-muted-foreground">82% dentro do prazo</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Qualidade</span>
                <span>95%</span>
              </div>
              <Progress value={91} className="h-2" />
              <p className="text-xs text-muted-foreground">91% aprovação</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Alertas do Sistema</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-md">
              <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-sm">Estoque Baixo: Aço Carbono 1045</h3>
                <p className="text-xs text-muted-foreground mt-1">O estoque atual está em 15% do mínimo recomendado.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-md">
              <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-sm">Estoque Baixo: Parafusos M8x1.25</h3>
                <p className="text-xs text-muted-foreground mt-1">O estoque atual está em 22% do mínimo recomendado.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-md">
              <AlertTriangle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-sm">Ordem #12458 atrasada</h3>
                <p className="text-xs text-muted-foreground mt-1">A ordem está 2 dias atrasada em relação ao cronograma.</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
