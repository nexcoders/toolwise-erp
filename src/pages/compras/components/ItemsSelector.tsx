
import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Plus, X } from "lucide-react";
import { preRegisteredItems } from "../config/cotacoes-form-fields";

export interface Item {
  id: string;
  label: string;
  quantity: number;
  unit: string;
  price: number;
}

interface ItemsSelectorProps {
  value: Item[];
  onChange: (items: Item[]) => void;
  supplierFilter?: string; // New prop to filter items by supplier
}

const ItemsSelector: React.FC<ItemsSelectorProps> = ({ value = [], onChange, supplierFilter }) => {
  const [items, setItems] = useState<Item[]>(value);
  const [selectedItemId, setSelectedItemId] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [filteredItems, setFilteredItems] = useState(preRegisteredItems);

  // Filter items based on the supplier
  useEffect(() => {
    if (supplierFilter) {
      const filtered = preRegisteredItems.filter(item => 
        item.suppliers && item.suppliers.includes(supplierFilter)
      );
      setFilteredItems(filtered);
      
      // Reset selection if previously selected item is no longer available
      if (selectedItemId && !filtered.some(item => item.id === selectedItemId)) {
        setSelectedItemId("");
      }
    } else {
      setFilteredItems(preRegisteredItems);
    }
  }, [supplierFilter, selectedItemId]);

  const addItem = () => {
    if (!selectedItemId || quantity <= 0) return;
    
    const itemExists = items.some(item => item.id === selectedItemId);
    if (itemExists) {
      // Update quantity if item already exists
      const updatedItems = items.map(item => 
        item.id === selectedItemId ? { ...item, quantity: item.quantity + quantity } : item
      );
      setItems(updatedItems);
      onChange(updatedItems);
    } else {
      // Add new item
      const preRegisteredItem = preRegisteredItems.find(item => item.id === selectedItemId);
      if (preRegisteredItem) {
        const newItem: Item = {
          id: preRegisteredItem.id,
          label: preRegisteredItem.label,
          quantity: quantity,
          unit: preRegisteredItem.unit,
          price: preRegisteredItem.price
        };
        const newItems = [...items, newItem];
        setItems(newItems);
        onChange(newItems);
      }
    }
    
    // Reset selection
    setSelectedItemId("");
    setQuantity(1);
  };

  const removeItem = (itemId: string) => {
    const updatedItems = items.filter(item => item.id !== itemId);
    setItems(updatedItems);
    onChange(updatedItems);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <select
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          value={selectedItemId}
          onChange={(e) => setSelectedItemId(e.target.value)}
        >
          <option value="">Selecione um item</option>
          {filteredItems.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label} ({item.unit})
            </option>
          ))}
        </select>
        <Input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
          className="w-24"
        />
        <Button type="button" size="sm" onClick={addItem}>
          <Plus className="h-4 w-4 mr-1" /> Adicionar
        </Button>
      </div>

      {filteredItems.length === 0 && supplierFilter && (
        <div className="text-center py-4 text-amber-600 bg-amber-50 border border-amber-200 rounded-md">
          Este fornecedor não possui itens registrados. Selecione outro fornecedor ou cadastre novos itens no estoque.
        </div>
      )}

      {items.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Unidade</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Preço Unit.</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.label}</TableCell>
                <TableCell>{item.unit}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>R$ {item.price.toFixed(2)}</TableCell>
                <TableCell>R$ {(item.quantity * item.price).toFixed(2)}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" onClick={() => removeItem(item.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {items.length === 0 && (
        <div className="text-center py-4 text-muted-foreground">
          Nenhum item adicionado
        </div>
      )}
    </div>
  );
};

export default ItemsSelector;
