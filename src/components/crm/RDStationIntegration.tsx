
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Code2, Database, SendHorizonal, Settings2, Zap } from "lucide-react";

interface RDStationIntegrationProps {
  onSaveSettings?: (settings: RDStationSettings) => void;
}

export interface RDStationSettings {
  apiKey: string;
  apiUrl: string;
  isEnabled: boolean;
  syncContacts: boolean;
  syncOportunidades: boolean;
  syncEmpresas: boolean;
}

const RDStationIntegration: React.FC<RDStationIntegrationProps> = ({ onSaveSettings }) => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<RDStationSettings>({
    apiKey: "",
    apiUrl: "https://api.rd.services",
    isEnabled: false,
    syncContacts: true,
    syncOportunidades: true,
    syncEmpresas: false,
  });
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [isSettingsChanged, setIsSettingsChanged] = useState(false);

  // Handle settings change
  const handleSettingChange = (key: keyof RDStationSettings, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
    setIsSettingsChanged(true);
  };

  // Test connection
  const handleTestConnection = () => {
    setIsTestingConnection(true);
    // Simulate API call
    setTimeout(() => {
      setIsTestingConnection(false);
      toast({
        title: "Conexão bem-sucedida",
        description: "A API do RD Station Marketing está acessível com as credenciais fornecidas.",
      });
    }, 1500);
  };

  // Save settings
  const handleSaveSettings = () => {
    if (onSaveSettings) {
      onSaveSettings(settings);
    }
    setIsSettingsChanged(false);
    toast({
      title: "Configurações salvas",
      description: "As configurações de integração foram salvas com sucesso.",
    });
  };

  // Perform manual sync
  const handleManualSync = () => {
    toast({
      title: "Sincronização iniciada",
      description: "A sincronização manual foi iniciada. Isso pode levar alguns minutos.",
    });
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Sincronização concluída",
        description: "Todos os dados foram sincronizados com o RD Station Marketing.",
      });
    }, 3000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-orange-500" />
          <span>Integração com RD Station Marketing</span>
        </CardTitle>
        <CardDescription>
          Conecte seu CRM ao RD Station Marketing para sincronizar contatos, oportunidades e empresas.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="settings" className="space-y-4">
          <TabsList>
            <TabsTrigger value="settings" className="flex items-center gap-1">
              <Settings2 className="h-4 w-4" />
              <span>Configurações</span>
            </TabsTrigger>
            <TabsTrigger value="mapping" className="flex items-center gap-1">
              <Database className="h-4 w-4" />
              <span>Mapeamento</span>
            </TabsTrigger>
            <TabsTrigger value="webhooks" className="flex items-center gap-1">
              <Code2 className="h-4 w-4" />
              <span>Webhooks</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="settings" className="space-y-4">
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="text-base font-medium">Status da Integração</h3>
                  <p className="text-sm text-muted-foreground">
                    Ative para sincronizar dados com o RD Station
                  </p>
                </div>
                <Switch
                  checked={settings.isEnabled}
                  onCheckedChange={(checked) => handleSettingChange("isEnabled", checked)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="apiKey">Chave de API (API Key)</Label>
                <Input
                  id="apiKey"
                  value={settings.apiKey}
                  onChange={(e) => handleSettingChange("apiKey", e.target.value)}
                  placeholder="Insira sua chave de API do RD Station"
                />
                <p className="text-xs text-muted-foreground">
                  A chave de API pode ser encontrada nas configurações da sua conta do RD Station.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="apiUrl">URL da API</Label>
                <Input
                  id="apiUrl"
                  value={settings.apiUrl}
                  onChange={(e) => handleSettingChange("apiUrl", e.target.value)}
                />
              </div>

              <div className="space-y-2 pt-2">
                <h3 className="text-base font-medium mb-2">Opções de Sincronização</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="syncContacts"
                      checked={settings.syncContacts}
                      onCheckedChange={(checked) => handleSettingChange("syncContacts", checked)}
                    />
                    <Label htmlFor="syncContacts">Sincronizar Contatos</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="syncOportunidades"
                      checked={settings.syncOportunidades}
                      onCheckedChange={(checked) => handleSettingChange("syncOportunidades", checked)}
                    />
                    <Label htmlFor="syncOportunidades">Sincronizar Oportunidades</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="syncEmpresas"
                      checked={settings.syncEmpresas}
                      onCheckedChange={(checked) => handleSettingChange("syncEmpresas", checked)}
                    />
                    <Label htmlFor="syncEmpresas">Sincronizar Empresas</Label>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="mapping" className="space-y-4">
            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-md">
                <h3 className="text-base font-medium mb-2">Mapeamento de Campos</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Configure como os campos do seu CRM serão mapeados para o RD Station Marketing.
                </p>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Campo no CRM</Label>
                      <div className="bg-background p-2 rounded border">Nome</div>
                    </div>
                    <div className="space-y-2">
                      <Label>Campo no RD Station</Label>
                      <div className="bg-background p-2 rounded border">name</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Campo no CRM</Label>
                      <div className="bg-background p-2 rounded border">Email</div>
                    </div>
                    <div className="space-y-2">
                      <Label>Campo no RD Station</Label>
                      <div className="bg-background p-2 rounded border">email</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Campo no CRM</Label>
                      <div className="bg-background p-2 rounded border">Telefone</div>
                    </div>
                    <div className="space-y-2">
                      <Label>Campo no RD Station</Label>
                      <div className="bg-background p-2 rounded border">mobile_phone</div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" size="sm">
                    Editar Mapeamento
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="webhooks" className="space-y-4">
            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-md">
                <h3 className="text-base font-medium mb-2">Configuração de Webhooks</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Configure webhooks para receber atualizações em tempo real do RD Station.
                </p>
                
                <div className="space-y-2">
                  <Label htmlFor="webhookUrl">URL do Webhook</Label>
                  <div className="flex">
                    <Input
                      id="webhookUrl"
                      value="https://sua-aplicacao.com/api/webhooks/rdstation"
                      readOnly
                      className="rounded-r-none"
                    />
                    <Button className="rounded-l-none">Copiar</Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Configure esta URL no painel de desenvolvedor do RD Station.
                  </p>
                </div>
                
                <div className="mt-6 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="text-sm font-medium">Webhook para Conversões</h4>
                      <p className="text-xs text-muted-foreground">
                        Receba atualizações quando novos leads forem convertidos.
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="text-sm font-medium">Webhook para Oportunidades</h4>
                      <p className="text-xs text-muted-foreground">
                        Receba atualizações quando novas oportunidades forem criadas.
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t p-4">
        <div className="flex gap-2">
          <Button 
            onClick={handleTestConnection} 
            variant="outline" 
            size="sm" 
            disabled={!settings.apiKey || isTestingConnection}
          >
            {isTestingConnection ? "Testando..." : "Testar Conexão"}
          </Button>
          
          <Button
            onClick={handleManualSync}
            variant="outline"
            size="sm"
            disabled={!settings.isEnabled}
            className="flex items-center gap-1"
          >
            <SendHorizonal className="h-4 w-4" />
            <span>Sincronizar Agora</span>
          </Button>
        </div>
        
        <Button 
          onClick={handleSaveSettings}
          disabled={!isSettingsChanged}
        >
          Salvar Configurações
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RDStationIntegration;
