
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import { BarChart3, ClipboardList, Package, ShoppingCart, Layers, Settings, Wrench, Users, FileText, UserPlus, Building2, BarChart, CalendarCheck, DollarSign, TrendingUp, ArrowDownRight, PieChart } from "lucide-react";
import { cn } from "@/lib/utils";

const AppSidebar: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  
  return <Sidebar>
      <SidebarHeader className="flex items-center justify-center py-4">
        <div className="flex items-center gap-2">
          <Wrench className="h-6 w-6 text-brand-primary" />
          <h1 className="font-bold text-xl">Nex G.E</h1>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Geral</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className={cn(isActive("/") && "bg-sidebar-accent text-sidebar-accent-foreground")}>
                  <Link to="/">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>CRM</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className={cn(isActive("/crm/clientes") && "bg-sidebar-accent text-sidebar-accent-foreground")}>
                  <Link to="/crm/clientes">
                    <Users className="h-5 w-5 mr-2" />
                    <span>Clientes</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className={cn(isActive("/crm/oportunidades") && "bg-sidebar-accent text-sidebar-accent-foreground")}>
                  <Link to="/crm/oportunidades">
                    <UserPlus className="h-5 w-5 mr-2" />
                    <span>Oportunidades</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className={cn(isActive("/crm/empresas") && "bg-sidebar-accent text-sidebar-accent-foreground")}>
                  <Link to="/crm/empresas">
                    <Building2 className="h-5 w-5 mr-2" />
                    <span>Empresas</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className={cn(isActive("/crm/relatorios") && "bg-sidebar-accent text-sidebar-accent-foreground")}>
                  <Link to="/crm/relatorios">
                    <BarChart className="h-5 w-5 mr-2" />
                    <span>Relatórios</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Produção</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className={cn(isActive("/producao/planejamento") && "bg-sidebar-accent text-sidebar-accent-foreground")}>
                  <Link to="/producao/planejamento">
                    <CalendarCheck className="h-5 w-5 mr-2" />
                    <span>Planejamento de Produção</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className={cn(isActive("/producao/ordens") && "bg-sidebar-accent text-sidebar-accent-foreground")}>
                  <Link to="/producao/ordens">
                    <ClipboardList className="h-5 w-5 mr-2" />
                    <span>Ordens de Produção</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className={cn(isActive("/producao/produtos") && "bg-sidebar-accent text-sidebar-accent-foreground")}>
                  <Link to="/producao/produtos">
                    <Layers className="h-5 w-5 mr-2" />
                    <span>Estrutura de Produtos</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Estoque</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className={cn(isActive("/estoque/insumos") && "bg-sidebar-accent text-sidebar-accent-foreground")}>
                  <Link to="/estoque/insumos">
                    <Package className="h-5 w-5 mr-2" />
                    <span>Insumos</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className={cn(isActive("/estoque/movimentacoes") && "bg-sidebar-accent text-sidebar-accent-foreground")}>
                  <Link to="/estoque/movimentacoes">
                    <FileText className="h-5 w-5 mr-2" />
                    <span>Movimentações</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Compras</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className={cn(isActive("/compras/cotacoes") && "bg-sidebar-accent text-sidebar-accent-foreground")}>
                  <Link to="/compras/cotacoes">
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    <span>Cotações</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className={cn(isActive("/compras/fornecedores") && "bg-sidebar-accent text-sidebar-accent-foreground")}>
                  <Link to="/compras/fornecedores">
                    <Users className="h-5 w-5 mr-2" />
                    <span>Fornecedores</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Financeiro</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className={cn(isActive("/financeiro/receitas") && "bg-sidebar-accent text-sidebar-accent-foreground")}>
                  <Link to="/financeiro/receitas">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    <span>Receitas</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className={cn(isActive("/financeiro/despesas") && "bg-sidebar-accent text-sidebar-accent-foreground")}>
                  <Link to="/financeiro/despesas">
                    <ArrowDownRight className="h-5 w-5 mr-2" />
                    <span>Despesas</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className={cn(isActive("/financeiro/relatorios") && "bg-sidebar-accent text-sidebar-accent-foreground")}>
                  <Link to="/financeiro/relatorios">
                    <PieChart className="h-5 w-5 mr-2" />
                    <span>Relatórios</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Sistema</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className={cn(isActive("/configuracoes") && "bg-sidebar-accent text-sidebar-accent-foreground")}>
                  <Link to="/configuracoes">
                    <Settings className="h-5 w-5 mr-2" />
                    <span>Configurações</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-3 py-4">
        <div className="text-xs text-muted-foreground/70">
          ToolWise ERP v1.0.0
        </div>
      </SidebarFooter>
    </Sidebar>;
};
export default AppSidebar;
