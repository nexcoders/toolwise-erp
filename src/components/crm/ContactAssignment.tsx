
import React from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, Building2 } from "lucide-react";

// Types
export type Contact = {
  id: string;
  nome: string;
  telefone: string;
  email: string;
  empresa: string;
  tipo: string;
  assignedTo?: string;
};

export type ContactGroup = {
  id: string;
  title: string;
  contacts: Contact[];
  color?: string;
};

type ContactAssignmentProps = {
  groups: ContactGroup[];
  setGroups: React.Dispatch<React.SetStateAction<ContactGroup[]>>;
  agents: { id: string; name: string; avatar?: string }[];
};

const ContactAssignment: React.FC<ContactAssignmentProps> = ({ groups, setGroups, agents }) => {
  const { toast } = useToast();

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    const { source, destination } = result;
    
    // If dropped in the same group
    if (source.droppableId === destination.droppableId) {
      const group = groups.find(g => g.id === source.droppableId);
      if (!group) return;
      
      const copiedContacts = [...group.contacts];
      const [removed] = copiedContacts.splice(source.index, 1);
      copiedContacts.splice(destination.index, 0, removed);
      
      const newGroups = groups.map(g => {
        if (g.id === source.droppableId) {
          return { ...g, contacts: copiedContacts };
        }
        return g;
      });
      
      setGroups(newGroups);
    } 
    // If dropped in a different group
    else {
      const sourceGroup = groups.find(g => g.id === source.droppableId);
      const destGroup = groups.find(g => g.id === destination.droppableId);
      
      if (!sourceGroup || !destGroup) return;
      
      const sourceContacts = [...sourceGroup.contacts];
      const destContacts = [...destGroup.contacts];
      const [removed] = sourceContacts.splice(source.index, 1);
      
      // Update the assignedTo of the contact
      const assignedTo = destGroup.id === "unassigned" ? undefined : destGroup.id;
      const updatedContact = { ...removed, assignedTo };
      
      destContacts.splice(destination.index, 0, updatedContact);
      
      const newGroups = groups.map(g => {
        if (g.id === source.droppableId) {
          return { ...g, contacts: sourceContacts };
        }
        if (g.id === destination.droppableId) {
          return { ...g, contacts: destContacts };
        }
        return g;
      });
      
      setGroups(newGroups);
      
      const agentName = agents.find(a => a.id === destGroup.id)?.name || "Não atribuído";
      
      toast({
        title: "Contato atribuído",
        description: `${removed.nome} foi atribuído para ${agentName}`,
      });
    }
  };

  return (
    <div className="mt-6">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {groups.map(group => (
            <div key={group.id} className="flex flex-col">
              <h3 className="text-sm font-semibold mb-3 flex items-center">
                <Badge className={`mr-2 ${group.color ? group.color : 'bg-gray-200'}`}>
                  {group.contacts.length}
                </Badge>
                
                {group.id !== "unassigned" && (
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarImage src={agents.find(a => a.id === group.id)?.avatar} />
                    <AvatarFallback className="text-xs">
                      {agents.find(a => a.id === group.id)?.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                )}
                
                {group.title}
              </h3>
              <Droppable droppableId={group.id}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`flex-1 p-2 rounded-md min-h-[500px] ${
                      snapshot.isDraggingOver ? 'bg-gray-100' : 'bg-gray-50'
                    }`}
                  >
                    {group.contacts.map((contact, index) => (
                      <Draggable key={contact.id} draggableId={contact.id} index={index}>
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
                                {contact.nome}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="p-3 text-xs space-y-2">
                              <div className="flex items-center text-muted-foreground">
                                <Building2 className="h-3 w-3 mr-1" /> 
                                {contact.empresa}
                              </div>
                              <div className="flex items-center text-muted-foreground">
                                <Phone className="h-3 w-3 mr-1" /> 
                                {contact.telefone}
                              </div>
                              <div className="flex items-center text-muted-foreground">
                                <Mail className="h-3 w-3 mr-1" /> 
                                {contact.email}
                              </div>
                              {contact.tipo && (
                                <Badge variant="outline" className="mt-2">
                                  {contact.tipo === "A" ? "Premium" : 
                                   contact.tipo === "B" ? "Padrão" : "Básico"}
                                </Badge>
                              )}
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

export default ContactAssignment;
