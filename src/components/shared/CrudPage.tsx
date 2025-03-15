
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Eye,
  FileEdit,
  MoreVertical,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import FormComponent from "./FormComponent";

interface CrudPageProps {
  title: string;
  description: string;
  entityName: string;
  columns: {
    header: string;
    accessorKey: string;
    cell?: (item: any) => React.ReactNode;
  }[];
  data: any[];
  formFields: any[];
  onCreateItem: (data: any) => void;
  onUpdateItem: (id: string, data: any) => void;
  onDeleteItem: (id: string) => void;
  viewComponent: React.ReactNode;
  customViewProps?: Record<string, any>;
  actionButtons?: {
    icon: React.ReactNode;
    label: string;
    action: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  }[];
  tabOptions?: {
    value: string;
    label: string;
    icon?: React.ReactNode;
  }[];
  activeTab?: string;
  onTabChange?: (value: string) => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  customFilters?: React.ReactNode;
}

const CrudPage: React.FC<CrudPageProps> = ({
  title,
  description,
  entityName,
  columns,
  data,
  formFields,
  onCreateItem,
  onUpdateItem,
  onDeleteItem,
  viewComponent,
  customViewProps,
  actionButtons,
  tabOptions,
  activeTab,
  onTabChange,
  searchValue = "",
  onSearchChange,
  searchPlaceholder = "Buscar...",
  customFilters,
}) => {
  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [isViewSheetOpen, setIsViewSheetOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleView = (item: any, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedItem(item);
    setIsViewSheetOpen(true);
  };

  const handleEdit = (item: any, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedItem(item);
    setIsEditSheetOpen(true);
  };

  const handleDelete = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    
    if (onDeleteItem) {
      onDeleteItem(id);
    }
    
    toast({
      title: `${entityName} excluído`,
      description: `O ${entityName.toLowerCase()} foi excluído com sucesso.`,
    });
  };

  const handleCreate = (data: any) => {
    if (onCreateItem) {
      onCreateItem(data);
    }
    
    setIsCreateDialogOpen(false);
    toast({
      title: `${entityName} criado`,
      description: `Um novo ${entityName.toLowerCase()} foi criado com sucesso.`,
    });
  };

  const handleUpdate = (data: any) => {
    if (selectedItem && onUpdateItem) {
      onUpdateItem(selectedItem.id, data);
    }
    
    setIsEditSheetOpen(false);
    toast({
      title: `${entityName} atualizado`,
      description: `O ${entityName.toLowerCase()} foi atualizado com sucesso.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{title}</h1>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              <span>Novo {entityName}</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]" onClick={(e) => e.stopPropagation()}>
            <DialogHeader>
              <DialogTitle>Criar Novo {entityName}</DialogTitle>
              <DialogDescription>
                Preencha os dados para criar um novo {entityName.toLowerCase()}.
              </DialogDescription>
            </DialogHeader>
            
            <FormComponent
              title=""
              fields={formFields}
              onSubmit={handleCreate}
              submitLabel="Criar"
              cancelLabel="Cancelar"
              onCancel={() => setIsCreateDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {tabOptions && (
        <div className="flex space-x-2 border-b pb-2">
          {tabOptions.map((tab) => (
            <Button
              key={tab.value}
              variant={activeTab === tab.value ? "default" : "ghost"}
              className="flex items-center gap-1"
              onClick={() => onTabChange && onTabChange(tab.value)}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </Button>
          ))}
        </div>
      )}

      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>{description}</CardTitle>
              <CardDescription>
                Gerencie {title.toLowerCase()} do sistema.
              </CardDescription>
            </div>
            <div className="flex items-center gap-4">
              {customFilters}
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={searchPlaceholder}
                  className="pl-8 w-[250px]"
                  value={searchValue}
                  onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column, index) => (
                  <TableHead key={index}>{column.header}</TableHead>
                ))}
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length + 1}
                    className="text-center py-4 text-muted-foreground"
                  >
                    Nenhum registro encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                data.map((item) => (
                  <TableRow key={item.id}>
                    {columns.map((column, index) => (
                      <TableCell key={index}>
                        {column.cell
                          ? column.cell(item)
                          : item[column.accessorKey]}
                      </TableCell>
                    ))}
                    <TableCell className="text-right">
                      {actionButtons ? (
                        <div className="flex justify-end gap-2">
                          {actionButtons.map((button, index) => {
                            if (button.action === "view" && viewComponent) {
                              return (
                                <Button
                                  key={index}
                                  variant={button.variant || "ghost"}
                                  size="icon"
                                  onClick={(e) => handleView(item, e)}
                                  title={button.label}
                                >
                                  {button.icon}
                                </Button>
                              );
                            }
                            if (button.action === "edit") {
                              return (
                                <Button
                                  key={index}
                                  variant={button.variant || "ghost"}
                                  size="icon"
                                  onClick={(e) => handleEdit(item, e)}
                                  title={button.label}
                                >
                                  {button.icon}
                                </Button>
                              );
                            }
                            if (button.action === "delete") {
                              return (
                                <Button
                                  key={index}
                                  variant={button.variant || "ghost"}
                                  size="icon"
                                  onClick={(e) => handleDelete(item.id, e)}
                                  title={button.label}
                                >
                                  {button.icon}
                                </Button>
                              );
                            }
                            return null;
                          })}
                        </div>
                      ) : (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {viewComponent && (
                              <DropdownMenuItem
                                className="flex items-center gap-2 cursor-pointer"
                                onClick={(e) => handleView(item, e)}
                              >
                                <Eye className="h-4 w-4" />
                                <span>Visualizar</span>
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              className="flex items-center gap-2 cursor-pointer"
                              onClick={(e) => handleEdit(item, e)}
                            >
                              <FileEdit className="h-4 w-4" />
                              <span>Editar</span>
                            </DropdownMenuItem>
                            
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="flex items-center gap-2 text-destructive cursor-pointer"
                              onClick={(e) => handleDelete(item.id, e)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span>Excluir</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Sheet */}
      <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
        <SheetContent className="sm:max-w-[600px]" onClick={(e) => e.stopPropagation()}>
          <SheetHeader>
            <SheetTitle>Editar {entityName}</SheetTitle>
            <SheetDescription>
              Atualize as informações do {entityName.toLowerCase()}.
            </SheetDescription>
          </SheetHeader>
          
          {selectedItem && (
            <div className="py-6">
              <FormComponent
                title=""
                fields={formFields}
                onSubmit={handleUpdate}
                defaultValues={selectedItem}
                submitLabel="Salvar"
                cancelLabel="Cancelar"
                onCancel={() => setIsEditSheetOpen(false)}
              />
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* View Sheet */}
      {viewComponent && (
        <Sheet open={isViewSheetOpen} onOpenChange={setIsViewSheetOpen}>
          <SheetContent className="sm:max-w-[600px]" onClick={(e) => e.stopPropagation()}>
            <SheetHeader>
              <SheetTitle>Visualizar {entityName}</SheetTitle>
              <SheetDescription>
                Detalhes do {entityName.toLowerCase()}.
              </SheetDescription>
            </SheetHeader>
            
            {selectedItem && (
              <div className="py-6">
                {React.cloneElement(viewComponent as React.ReactElement, {
                  data: selectedItem,
                  onClose: () => setIsViewSheetOpen(false),
                  ...customViewProps
                })}
              </div>
            )}
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
};

export default CrudPage;
