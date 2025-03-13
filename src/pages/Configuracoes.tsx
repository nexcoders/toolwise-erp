
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Save,
  Settings,
  User2,
  Lock,
  Bell,
  Shield,
} from "lucide-react";

const Configuracoes: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Configurações</h1>
      </div>

      <Tabs defaultValue="empresa" className="space-y-4">
        <TabsList>
          <TabsTrigger value="empresa" className="flex items-center gap-1">
            <Building2 className="h-4 w-4" />
            <span>Empresa</span>
          </TabsTrigger>
          <TabsTrigger value="usuarios" className="flex items-center gap-1">
            <User2 className="h-4 w-4" />
            <span>Usuários</span>
          </TabsTrigger>
          <TabsTrigger value="preferencias" className="flex items-center gap-1">
            <Settings className="h-4 w-4" />
            <span>Preferências</span>
          </TabsTrigger>
          <TabsTrigger value="seguranca" className="flex items-center gap-1">
            <Shield className="h-4 w-4" />
            <span>Segurança</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="empresa" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Dados da Empresa</CardTitle>
              <CardDescription>
                Informações básicas sobre sua empresa.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 py-2">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="razao-social" className="text-right">
                    Razão Social
                  </Label>
                  <Input
                    id="razao-social"
                    value="Ferramentaria Precisão Ltda"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="nome-fantasia" className="text-right">
                    Nome Fantasia
                  </Label>
                  <Input
                    id="nome-fantasia"
                    value="Precisão Tools"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="cnpj" className="text-right">
                    CNPJ
                  </Label>
                  <Input
                    id="cnpj"
                    value="12.345.678/0001-90"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="telefone" className="text-right">
                    Telefone
                  </Label>
                  <Input
                    id="telefone"
                    value="(11) 3456-7890"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    value="contato@precisaotools.com.br"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="site" className="text-right">
                    Site
                  </Label>
                  <Input
                    id="site"
                    value="www.precisaotools.com.br"
                    className="col-span-3"
                  />
                </div>
              </div>
              <Separator />
              <div className="grid gap-4 py-2">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="endereco" className="text-right">
                    Endereço
                  </Label>
                  <Input
                    id="endereco"
                    value="Rua das Ferramentas, 123"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="cidade" className="text-right">
                    Cidade
                  </Label>
                  <Input
                    id="cidade"
                    value="São Paulo"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="estado" className="text-right">
                    Estado
                  </Label>
                  <Select defaultValue="sp">
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecione o estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sp">São Paulo</SelectItem>
                      <SelectItem value="rj">Rio de Janeiro</SelectItem>
                      <SelectItem value="mg">Minas Gerais</SelectItem>
                      <SelectItem value="rs">Rio Grande do Sul</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="cep" className="text-right">
                    CEP
                  </Label>
                  <Input
                    id="cep"
                    value="12345-678"
                    className="col-span-3"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <Button className="flex items-center gap-1">
                  <Save className="h-4 w-4" />
                  <span>Salvar Alterações</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usuarios" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Usuários do Sistema</CardTitle>
              <CardDescription>
                Gerenciamento de usuários e permissões.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex justify-end">
                <Button className="flex items-center gap-1">
                  <User2 className="h-4 w-4" />
                  <span>Adicionar Usuário</span>
                </Button>
              </div>
              <div className="space-y-4">
                {[
                  { nome: "Admin", email: "admin@precisaotools.com.br", cargo: "Administrador", ativo: true },
                  { nome: "João Silva", email: "joao@precisaotools.com.br", cargo: "Gerente", ativo: true },
                  { nome: "Maria Oliveira", email: "maria@precisaotools.com.br", cargo: "Operador", ativo: true },
                  { nome: "Pedro Santos", email: "pedro@precisaotools.com.br", cargo: "Vendas", ativo: false },
                ].map((usuario, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-md">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <User2 className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{usuario.nome}</p>
                        <p className="text-sm text-muted-foreground">{usuario.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="outline">{usuario.cargo}</Badge>
                      <div className="flex items-center gap-2">
                        <Label htmlFor={`user-status-${index}`} className="text-muted-foreground">
                          {usuario.ativo ? "Ativo" : "Inativo"}
                        </Label>
                        <Switch id={`user-status-${index}`} checked={usuario.ativo} />
                      </div>
                      <Button variant="outline" size="sm">Editar</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferencias" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Preferências Gerais</CardTitle>
              <CardDescription>
                Personalize o sistema conforme suas necessidades.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="notificacoes">Notificações por Email</Label>
                    <p className="text-sm text-muted-foreground">
                      Receba alertas importantes por email
                    </p>
                  </div>
                  <Switch id="notificacoes" defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="alertas-estoque">Alertas de Estoque Baixo</Label>
                    <p className="text-sm text-muted-foreground">
                      Notificações quando o estoque atingir o mínimo
                    </p>
                  </div>
                  <Switch id="alertas-estoque" defaultChecked />
                </div>

                <Separator />

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="tema" className="text-right">
                    Tema do Sistema
                  </Label>
                  <Select defaultValue="light">
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecione o tema" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Claro</SelectItem>
                      <SelectItem value="dark">Escuro</SelectItem>
                      <SelectItem value="system">Sistema</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="idioma" className="text-right">
                    Idioma
                  </Label>
                  <Select defaultValue="pt-BR">
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecione o idioma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                      <SelectItem value="en-US">English (US)</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end mt-4">
                  <Button className="flex items-center gap-1">
                    <Save className="h-4 w-4" />
                    <span>Salvar Preferências</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seguranca" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Segurança</CardTitle>
              <CardDescription>
                Gerencie a segurança e acesso ao sistema.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <Lock className="h-5 w-5" />
                      <span>Alterar Senha</span>
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Altere a senha da sua conta para maior segurança
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="senha-atual" className="text-right">
                        Senha Atual
                      </Label>
                      <Input
                        id="senha-atual"
                        type="password"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="nova-senha" className="text-right">
                        Nova Senha
                      </Label>
                      <Input
                        id="nova-senha"
                        type="password"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="confirmar-senha" className="text-right">
                        Confirmar Senha
                      </Label>
                      <Input
                        id="confirmar-senha"
                        type="password"
                        className="col-span-3"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    <span>Autenticação em Duas Etapas</span>
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Adicione uma camada extra de segurança à sua conta
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Autenticação via SMS</p>
                      <p className="text-sm text-muted-foreground">
                        Receba códigos de verificação por mensagem de texto
                      </p>
                    </div>
                    <Switch id="autenticacao-sms" />
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    <span>Registro de Atividades</span>
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Monitore as atividades dos usuários no sistema
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Ativar Registro de Atividades</p>
                      <p className="text-sm text-muted-foreground">
                        Grave todas as ações realizadas no sistema
                      </p>
                    </div>
                    <Switch id="registro-atividades" defaultChecked />
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <Button className="flex items-center gap-1">
                    <Save className="h-4 w-4" />
                    <span>Salvar Configurações</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Configuracoes;
