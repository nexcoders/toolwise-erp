
import React from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { DollarSign, Users } from "lucide-react";

// Types
export type Opportunity = {
  id: string;
  cliente: string;
  titulo: string;
  valor: number;
  probabilidade: number;
  fase: string;
  dataPrevisao: string;
  responsavel: string;
};

export type KanbanColumn = {
  id: string;
  title: string;
  items: Opportunity[];
  color?: string;
};

type KanbanBoardProps = {
  columns: KanbanColumn[];
  setColumns: React.Dispatch<React.SetStateAction<KanbanColumn[]>>;
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { 
    style: 'currency', 
    currency: 'BRL'
  }).format(value);
};

const KanbanBoard: React.FC<KanbanBoardProps> = ({ columns, setColumns }) => {
  const { toast } = useToast();

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    const { source, destination } = result;
    
    // If dropped in the same column but different position
    if (source.droppableId === destination.droppableId) {
      const column = columns.find(col => col.id === source.droppableId);
      if (!column) return;
      
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      
      const newColumns = columns.map(col => {
        if (col.id === source.droppableId) {
          return { ...col, items: copiedItems };
        }
        return col;
      });
      
      setColumns(newColumns);
    } 
    // If dropped in a different column
    else {
      const sourceColumn = columns.find(col => col.id === source.droppableId);
      const destColumn = columns.find(col => col.id === destination.droppableId);
      
      if (!sourceColumn || !destColumn) return;
      
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      
      // Update the phase of the opportunity to match the new column
      const updatedItem = { ...removed, fase: destColumn.id };
      
      destItems.splice(destination.index, 0, updatedItem);
      
      const newColumns = columns.map(col => {
        if (col.id === source.droppableId) {
          return { ...col, items: sourceItems };
        }
        if (col.id === destination.droppableId) {
          return { ...col, items: destItems };
        }
        return col;
      });
      
      setColumns(newColumns);
      
      toast({
        title: "Oportunidade movida",
        description: `${removed.titulo} foi movida para a fase ${destColumn.title}`,
      });
    }
  };

  return (
    <div className="mt-6">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {columns.map(column => (
            <div key={column.id} className="flex flex-col">
              <h3 className="text-sm font-semibold mb-3 flex items-center">
                <Badge className={`mr-2 ${column.color ? column.color : 'bg-gray-200'}`}>
                  {column.items.length}
                </Badge>
                {column.title}
              </h3>
              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`flex-1 p-2 rounded-md min-h-[500px] ${
                      snapshot.isDraggingOver ? 'bg-gray-100' : 'bg-gray-50'
                    }`}
                  >
                    {column.items.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided, snapshot) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`mb-3 ${
                              snapshot.isDragging ? 'shadow-lg' : ''
                            }`}
                          >
                            <CardHeader className="p-3 pb-0">
                              <CardTitle className="text-sm font-medium">
                                {item.titulo}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="p-3 text-xs space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">{item.cliente}</span>
                                <Badge variant="outline">{item.probabilidade}%</Badge>
                              </div>
                              <div className="flex justify-between items-center">
                                <div className="flex items-center text-brand-primary font-medium">
                                  <DollarSign className="h-3 w-3 mr-1" /> 
                                  {formatCurrency(item.valor)}
                                </div>
                                <div className="flex items-center text-muted-foreground">
                                  <Users className="h-3 w-3 mr-1" /> 
                                  {item.responsavel}
                                </div>
                              </div>
                              <div className="text-muted-foreground">
                                Previsão: {item.dataPrevisao}
                              </div>
                            </CardContent>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
