'use client';

import React, { createContext, useContext, useCallback, useState, ReactNode } from 'react';

interface SelectionContextType {
  selectedItems: string[];
  toggleItem: (id: string) => void;
  isSelected: (id: string) => boolean;
  clearSelection: () => void;
}

const SelectionContext = createContext<SelectionContextType | undefined>(undefined);

export function SelectionProvider({ children }: { children: ReactNode }) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const toggleItem = useCallback((id: string) => {
    setSelectedItems(prev => {
      if (prev.includes(id)) {
        return prev.filter(itemId => itemId !== id);
      } else {
        return [...prev, id];
      }
    });
  }, []);

  const isSelected = useCallback((id: string) => {
    return selectedItems.includes(id);
  }, [selectedItems]);

  const clearSelection = useCallback(() => {
    setSelectedItems([]);
  }, []);

  return (
    <SelectionContext.Provider value={{ selectedItems, toggleItem, isSelected, clearSelection }}>
      {children}
    </SelectionContext.Provider>
  );
}

export function useSelection() {
  const context = useContext(SelectionContext);
  if (context === undefined) {
    throw new Error('useSelection must be used within a SelectionProvider');
  }
  return context;
}
