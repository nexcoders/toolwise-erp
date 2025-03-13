
import React from "react";
import { Outlet } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import AppHeader from "./AppHeader";
import { SidebarProvider } from "@/components/ui/sidebar";

const AppLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-h-screen">
          <AppHeader />
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            <Outlet />
          </main>
          <footer className="py-4 px-6 text-center text-sm text-muted-foreground border-t">
            ToolWise ERP © {new Date().getFullYear()} - Sistema especializado para ferramentarias
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
