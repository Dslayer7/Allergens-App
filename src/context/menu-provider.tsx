'use client';

import type { MenuItem } from '@/lib/types';
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from 'react';

interface MenuContextType {
  menuItems: MenuItem[];
  setMenuItems: (items: MenuItem[]) => void;
  updateMenuItem: (id: string, updatedItem: Partial<MenuItem>) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  isDataLoaded: boolean;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [menuItems, setMenuItemsState] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const setMenuItems = useCallback((items: MenuItem[]) => {
    setMenuItemsState(items);
  }, []);

  const updateMenuItem = useCallback((id: string, updatedItem: Partial<MenuItem>) => {
    setMenuItemsState((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, ...updatedItem } : item
      )
    );
  }, []);

  const isDataLoaded = useMemo(() => menuItems.length > 0, [menuItems]);

  const value = useMemo(() => ({
    menuItems,
    setMenuItems,
    updateMenuItem,
    isLoading,
    setIsLoading,
    isDataLoaded,
  }), [menuItems, setMenuItems, updateMenuItem, isLoading, setIsLoading, isDataLoaded]);

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
}
