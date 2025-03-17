
import React from "react";
import RDStationIntegration, { RDStationSettings } from "@/components/crm/RDStationIntegration";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { BookOpen, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const RDStationConfig: React.FC = () => {
  const { toast } = useToast();

  const handleSaveSettings = (settings: RDStationSettings) => {
    console.log("Saving RD Station settings:", settings);
    // In a real implementation, we would save these to a database or API
    toast({
      title: "Configurações salvas",
      description: "As configurações do RD Station foram atualizadas com sucesso.",
    });
  };

  return (
    <>
      <Helmet>
        <title>Configuração RD Station | Nex G.E</title>
      </Helmet>
      
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Zap className="h-8 w-8 text-orange-500" />
              Integração RD Station
            </h1>
            <p className="text-muted-foreground">
              Configure a integração entre seu CRM e o RD Station Marketing
            </p>
          </div>
          
          <Button variant="outline" asChild>
            <Link to="/crm/rd-station-tutorial">
              <BookOpen className="mr-2 h-4 w-4" />
              Ver Tutorial
            </Link>
          </Button>
        </div>
        
        <RDStationIntegration onSaveSettings={handleSaveSettings} />
      </div>
    </>
  );
};

export default RDStationConfig;
