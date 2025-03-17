
import React from "react";
import { Helmet } from "react-helmet";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Alert,
  AlertDescription,
  AlertTitle
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AlertCircle, BookOpen, Code, Cpu, Database, ExternalLink, Key, Layers, MessageSquareText, Settings, Zap } from "lucide-react";

const RDStationTutorial: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Tutorial RD Station | Nex G.E</title>
      </Helmet>
      
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <BookOpen className="h-8 w-8 text-orange-500" />
              Tutorial de Integração com RD Station
            </h1>
            <p className="text-muted-foreground">
              Aprenda a configurar e utilizar a integração entre seu CRM e o RD Station Marketing
            </p>
          </div>
          
          <Button asChild>
            <Link to="/crm/rd-station">
              <Settings className="mr-2 h-4 w-4" />
              Ir para Configurações
            </Link>
          </Button>
        </div>
        
        <Alert className="bg-orange-50 border-orange-200">
          <AlertCircle className="h-4 w-4 text-orange-500" />
          <AlertTitle>Importante!</AlertTitle>
          <AlertDescription>
            Para utilizar esta integração, você precisará de uma conta ativa no RD Station Marketing 
            e permissões adequadas para gerar tokens de API.
          </AlertDescription>
        </Alert>
        
        <Tabs defaultValue="intro" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="intro" className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span>Introdução</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-1">
              <Settings className="h-4 w-4" />
              <span>Configuração</span>
            </TabsTrigger>
            <TabsTrigger value="data" className="flex items-center gap-1">
              <Database className="h-4 w-4" />
              <span>Mapeamento</span>
            </TabsTrigger>
            <TabsTrigger value="webhooks" className="flex items-center gap-1">
              <Code className="h-4 w-4" />
              <span>Webhooks</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="intro" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>O que é o RD Station Marketing?</CardTitle>
                <CardDescription>
                  Entenda como o RD Station pode ajudar nos seus esforços de marketing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  RD Station Marketing é uma plataforma completa para automação de marketing, 
                  que ajuda empresas a atrair visitantes, convertê-los em leads e transformá-los 
                  em clientes. A plataforma oferece recursos como:
                </p>
                
                <ul className="list-disc pl-6 space-y-2">
                  <li>Criação de landing pages e formulários</li>
                  <li>Automação de email marketing</li>
                  <li>Nutrição de leads</li>
                  <li>Segmentação avançada de contatos</li>
                  <li>Análise e relatórios de marketing</li>
                </ul>
                
                <div className="flex items-center justify-center p-4">
                  <img 
                    src="https://rdstation-static.s3.amazonaws.com/media/filer_public/98/b2/98b2d165-8618-4643-8de9-db576840aedb/rd-station-marketing-logo.png" 
                    alt="RD Station Marketing Logo" 
                    className="max-w-xs"
                  />
                </div>
                
                <h3 className="text-lg font-medium mt-4">Benefícios da Integração</h3>
                <p>
                  Ao integrar seu CRM com o RD Station Marketing, você consegue:
                </p>
                
                <ul className="list-disc pl-6 space-y-2">
                  <li>Sincronizar contatos automaticamente entre as plataformas</li>
                  <li>Enviar informações de oportunidades para segmentação no RD Station</li>
                  <li>Automatizar ações de marketing baseadas em eventos do CRM</li>
                  <li>Ter uma visão unificada da jornada do cliente</li>
                  <li>Mensurar o ROI das suas campanhas de marketing</li>
                </ul>
                
                <div className="flex justify-end">
                  <Button variant="outline" className="flex items-center" asChild>
                    <a 
                      href="https://rdstation.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Visitar site do RD Station
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurando a Integração</CardTitle>
                <CardDescription>
                  Passo a passo para configurar a conexão com o RD Station Marketing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">1. Obtendo a Chave de API</h3>
                  <p>
                    Para integrar com o RD Station, você precisará de uma chave de API (API Key).
                    Siga estes passos para obter sua chave:
                  </p>
                  
                  <div className="border rounded-md p-4 space-y-2 bg-muted/50">
                    <p className="font-medium">No RD Station Marketing:</p>
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>Acesse sua conta do RD Station Marketing</li>
                      <li>No menu superior, clique em "Configurações"</li>
                      <li>No menu lateral, selecione "Integrações"</li>
                      <li>Busque por "API" ou role até encontrar "API RD Station"</li>
                      <li>Clique em "Gerar Token"</li>
                      <li>Copie o token gerado</li>
                    </ol>
                    
                    <div className="flex items-center mt-4 p-2 bg-orange-50 rounded border border-orange-200">
                      <Key className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0" />
                      <p className="text-sm">
                        Importante: Este token dá acesso à sua conta. Nunca compartilhe este token 
                        ou exponha-o publicamente.
                      </p>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-medium mt-6">2. Configurando no CRM</h3>
                  <p>
                    Após obter sua chave de API, configure-a no sistema:
                  </p>
                  
                  <div className="border rounded-md p-4 space-y-2 bg-muted/50">
                    <p className="font-medium">No Nex G.E:</p>
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>Acesse a página "RD Station" no menu lateral do CRM</li>
                      <li>Na aba "Configurações", insira a chave de API obtida</li>
                      <li>Defina o URL da API (normalmente é "https://api.rd.services")</li>
                      <li>Ative a integração usando o botão "Status da Integração"</li>
                      <li>Selecione quais entidades deseja sincronizar (Contatos, Oportunidades, Empresas)</li>
                      <li>Clique em "Testar Conexão" para verificar se tudo está funcionando</li>
                      <li>Salve as configurações</li>
                    </ol>
                  </div>
                  
                  <div className="mt-4 rounded-md overflow-hidden border">
                    <img 
                      src="https://rdstation-static.s3.amazonaws.com/cms/files/14554/1584110055-rd-station-integracoes-api-key.png" 
                      alt="Exemplo de página de API do RD Station" 
                      className="w-full"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="data" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mapeamento de Dados</CardTitle>
                <CardDescription>
                  Como mapear campos entre o CRM e o RD Station Marketing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <p>
                  O mapeamento de campos é essencial para garantir que os dados sejam transferidos 
                  corretamente entre os sistemas. Cada campo do CRM precisa ser mapeado para um 
                  campo correspondente no RD Station.
                </p>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border p-2 text-left">Campo no CRM</th>
                        <th className="border p-2 text-left">Campo no RD Station</th>
                        <th className="border p-2 text-left">Descrição</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border p-2">Nome</td>
                        <td className="border p-2">name</td>
                        <td className="border p-2">Nome do contato</td>
                      </tr>
                      <tr>
                        <td className="border p-2">Email</td>
                        <td className="border p-2">email</td>
                        <td className="border p-2">Email principal do contato (obrigatório)</td>
                      </tr>
                      <tr>
                        <td className="border p-2">Telefone</td>
                        <td className="border p-2">mobile_phone</td>
                        <td className="border p-2">Número de celular do contato</td>
                      </tr>
                      <tr>
                        <td className="border p-2">Empresa</td>
                        <td className="border p-2">company_name</td>
                        <td className="border p-2">Nome da empresa do contato</td>
                      </tr>
                      <tr>
                        <td className="border p-2">Cargo</td>
                        <td className="border p-2">job_title</td>
                        <td className="border p-2">Cargo do contato</td>
                      </tr>
                      <tr>
                        <td className="border p-2">Status da Oportunidade</td>
                        <td className="border p-2">cf_status_oportunidade</td>
                        <td className="border p-2">Campo personalizado para status</td>
                      </tr>
                      <tr>
                        <td className="border p-2">Valor da Oportunidade</td>
                        <td className="border p-2">cf_valor_oportunidade</td>
                        <td className="border p-2">Campo personalizado para valor</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <h3 className="text-lg font-medium mt-6">Campos Personalizados</h3>
                <p>
                  O RD Station permite a criação de campos personalizados para armazenar informações 
                  específicas do seu negócio. Siga estas etapas para criar campos personalizados:
                </p>
                
                <div className="border rounded-md p-4 space-y-2 bg-muted/50">
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>No RD Station, acesse "Configurações" > "Campos de contato"</li>
                    <li>Clique em "Criar campo"</li>
                    <li>Escolha o tipo de campo (texto, número, data, etc.)</li>
                    <li>Defina um nome para o campo (ex: "Status da Oportunidade")</li>
                    <li>O sistema criará um identificador técnico como "cf_status_oportunidade"</li>
                    <li>Use este identificador técnico no mapeamento de campos do CRM</li>
                  </ol>
                </div>
                
                <div className="flex items-center mt-4 p-4 bg-slate-50 rounded border">
                  <Layers className="h-5 w-5 text-slate-500 mr-3 flex-shrink-0" />
                  <p>
                    <strong>Dica:</strong> Ao sincronizar oportunidades, considere criar campos 
                    personalizados para todas as informações relevantes como status, valor, 
                    fase do funil, produtos de interesse e data prevista de fechamento.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="webhooks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuração de Webhooks</CardTitle>
                <CardDescription>
                  Como configurar webhooks para sincronização em tempo real
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <p>
                  Os webhooks permitem que o RD Station envie dados automaticamente para o seu CRM 
                  sempre que ocorrer um evento específico, como a conversão de um lead ou a 
                  mudança no estágio de um contato.
                </p>
                
                <h3 className="text-lg font-medium">Configurando Webhooks no RD Station</h3>
                
                <div className="border rounded-md p-4 space-y-2 bg-muted/50">
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>No RD Station, acesse "Configurações" > "Integrações" > "Webhooks"</li>
                    <li>Clique em "Criar webhook"</li>
                    <li>Selecione o evento que deseja monitorar (ex: "Conversão de Lead", "Oportunidade Criada")</li>
                    <li>No campo URL, insira a URL de webhook do seu CRM</li>
                    <li>Escolha o método HTTP (geralmente POST)</li>
                    <li>Defina um formato de payload (JSON recomendado)</li>
                    <li>Salve a configuração</li>
                  </ol>
                </div>
                
                <h3 className="text-lg font-medium mt-6">URL de Webhook do CRM</h3>
                <p>
                  Para receber os dados do RD Station, configure a URL do webhook no seu CRM:
                </p>
                
                <div className="bg-slate-100 p-4 rounded-md font-mono text-sm border my-4 overflow-x-auto">
                  https://sua-aplicacao.com/api/webhooks/rdstation
                </div>
                
                <div className="flex items-center p-4 bg-blue-50 rounded border border-blue-100">
                  <Cpu className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Eventos disponíveis para webhook:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Conversão de Lead</li>
                      <li>Atualização de Contato</li>
                      <li>Mudança de Estágio no Funil</li>
                      <li>Oportunidade Criada/Atualizada</li>
                      <li>Email Aberto/Clicado</li>
                    </ul>
                  </div>
                </div>
                
                <h3 className="text-lg font-medium mt-6">Exemplos de Payloads</h3>
                <p>
                  Abaixo está um exemplo de payload enviado pelo RD Station quando um novo lead é convertido:
                </p>
                
                <div className="bg-slate-900 text-slate-100 p-4 rounded-md font-mono text-sm my-4 overflow-x-auto">
{`{
  "event_type": "CONVERSION",
  "event_uuid": "5e686a00-7f48-11eb-8c91-0b0d21ed2c7a",
  "conversion_identifier": "formulario-contato",
  "leads": [{
    "id": "1",
    "uuid": "c4ce33c5-sample-uuid-test-9adb60a21",
    "email": "exemplo@empresa.com.br",
    "name": "João Silva",
    "company_name": "Empresa LTDA",
    "job_title": "Diretor",
    "bio": "",
    "created_at": "2021-05-25T21:10:32.575Z",
    "opportunity": true,
    "number_conversions": 2,
    "user": "usuario@suaempresa.com.br",
    "custom_fields": {
      "cf_status_oportunidade": "Qualificado"
    }
  }]
}`}
                </div>
                
                <div className="flex items-center p-4 bg-green-50 rounded border border-green-100 mt-6">
                  <MessageSquareText className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <p>
                    <strong>Dica:</strong> Teste seus webhooks usando ferramentas como 
                    <a href="https://webhook.site" target="_blank" rel="noopener noreferrer" className="text-green-600 mx-1 underline">
                      webhook.site
                    </a>
                    ou
                    <a href="https://requestbin.com" target="_blank" rel="noopener noreferrer" className="text-green-600 mx-1 underline">
                      requestbin.com
                    </a>
                    antes de implementá-los no ambiente de produção.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default RDStationTutorial;
