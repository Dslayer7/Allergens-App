import type { LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

export interface AllergenInfo {
  key: string;
  name: string;
  Icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
}

export interface MenuItem {
  id: string;
  name: string;
  japaneseName?: string;
  description?: string;
  price?: number | string;
  allergens: string[];
  [key: string]: any; 
}
