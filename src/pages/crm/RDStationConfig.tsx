
import React from "react";
import RDStationIntegration, { RDStationSettings } from "@/components/crm/RDStationIntegration";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet";

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
        <div>
          <h1 className="text-3xl font-bold">Integração RD Station</h1>
          <p className="text-muted-foreground">
            Configure a integração entre seu CRM e o RD Station Marketing
          </p>
        </div>
        
        <RDStationIntegration onSaveSettings={handleSaveSettings} />
      </div>
    </>
  );
};

export default RDStationConfig;
