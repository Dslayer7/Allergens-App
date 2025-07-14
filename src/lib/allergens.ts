import { createElement, forwardRef } from 'react';
import { HelpCircle } from 'lucide-react';
import type { AllergenInfo } from './types';

// Import all 21 specific allergen icons
import AlcoholFreeIcon from '@/components/icons/alcohol-free-icon';
import CeleryIcon from '@/components/icons/celery-icon';
import CerealsIcon from '@/components/icons/cereals-icon';
import DairyFreeIcon from '@/components/icons/dairy-free-icon';
import EggIcon from '@/components/icons/egg-icon';
import FishIcon from '@/components/icons/fish-icon';
import GlutenFreeIcon from '@/components/icons/gluten-free-icon';
import LupinIcon from '@/components/icons/lupin-icon';
import MilkIcon from '@/components/icons/milk-icon';
import MollusksIcon from '@/components/icons/mollusks-icon';
import MustardIcon from '@/components/icons/mustard-icon';
import NutsIcon from '@/components/icons/nuts-icon';
import PeanutIcon from '@/components/icons/peanut-icon';
import PorkFreeIcon from '@/components/icons/pork-free-icon';
import SesameSeedsIcon from '@/components/icons/sesame-seeds-icon';
import ShellfishIcon from '@/components/icons/shellfish-icon';
import SobaIcon from '@/components/icons/soba-icon';
import SoybeanIcon from '@/components/icons/soybean-icon';
import SulfitesIcon from '@/components/icons/sulfites-icon';
import VeganIcon from '@/components/icons/vegan-icon';
import VegetarianIcon from '@/components/icons/vegetarian-icon';

// Helper function to create typed icon components with forwardRef
function createIconComponent(IconComponent: React.ComponentType<any>) {
  return forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>((props, ref) => 
    createElement(IconComponent, { ...props, ref })
  );
}

// Define the 21 specific allergens with their icons
export const ALLERGENS: AllergenInfo[] = [
  // Special case for unknown allergens
  { 
    key: 'unknown', 
    name: 'Unknown Allergen (不明)', 
    Icon: createIconComponent(HelpCircle) 
  },
  
  // The 21 specific allergens
  { 
    key: 'alcohol-free', 
    name: 'Alcohol-Free (アルコールフリー)', 
    Icon: createIconComponent(AlcoholFreeIcon) 
  },
  { 
    key: 'celery', 
    name: 'Celery (セロリ)', 
    Icon: createIconComponent(CeleryIcon) 
  },
  { 
    key: 'cereals', 
    name: 'Cereals (穀物)', 
    Icon: createIconComponent(CerealsIcon) 
  },
  { 
    key: 'dairy-free', 
    name: 'Dairy-Free (乳製品フリー)', 
    Icon: createIconComponent(DairyFreeIcon) 
  },
  { 
    key: 'egg', 
    name: 'Egg (卵)', 
    Icon: createIconComponent(EggIcon) 
  },
  { 
    key: 'fish', 
    name: 'Fish (魚)', 
    Icon: createIconComponent(FishIcon) 
  },
  { 
    key: 'gluten-free', 
    name: 'Gluten-Free (グルテンフリー)', 
    Icon: createIconComponent(GlutenFreeIcon) 
  },
  { 
    key: 'lupin', 
    name: 'Lupin (ルピナス)', 
    Icon: createIconComponent(LupinIcon) 
  },
  { 
    key: 'milk', 
    name: 'Milk (牛乳)', 
    Icon: createIconComponent(MilkIcon) 
  },
  { 
    key: 'mollusks', 
    name: 'Mollusks (軟体動物)', 
    Icon: createIconComponent(MollusksIcon) 
  },
  { 
    key: 'mustard', 
    name: 'Mustard (からし)', 
    Icon: createIconComponent(MustardIcon) 
  },
  { 
    key: 'nuts', 
    name: 'Nuts (ナッツ類)', 
    Icon: createIconComponent(NutsIcon) 
  },
  { 
    key: 'peanut', 
    name: 'Peanut (ピーナッツ)', 
    Icon: createIconComponent(PeanutIcon) 
  },
  { 
    key: 'pork-free', 
    name: 'Pork-Free (豚肉フリー)', 
    Icon: createIconComponent(PorkFreeIcon) 
  },
  { 
    key: 'sesame-seeds', 
    name: 'Sesame Seeds (ごまの種)', 
    Icon: createIconComponent(SesameSeedsIcon) 
  },
  { 
    key: 'shellfish', 
    name: 'Shellfish (甲殻類)', 
    Icon: createIconComponent(ShellfishIcon) 
  },
  { 
    key: 'soba', 
    name: 'Soba (蕎麦)', 
    Icon: createIconComponent(SobaIcon) 
  },
  { 
    key: 'soybean', 
    name: 'Soybean (大豆)', 
    Icon: createIconComponent(SoybeanIcon) 
  },
  { 
    key: 'sulfites', 
    name: 'Sulfites (亜硫酸塩)', 
    Icon: createIconComponent(SulfitesIcon) 
  },
  { 
    key: 'vegan', 
    name: 'Vegan (ビーガン)', 
    Icon: createIconComponent(VeganIcon) 
  },
  { 
    key: 'vegetarian', 
    name: 'Vegetarian (ベジタリアン)', 
    Icon: createIconComponent(VegetarianIcon) 
  },
];

// Create a map for quick lookup
export const ALLERGEN_KEY_MAP = ALLERGENS.reduce((acc, allergen) => {
  acc[allergen.key] = allergen;
  return acc;
}, {} as Record<string, AllergenInfo>);

// Export a list of just the allergen keys for easy reference
export const ALLERGEN_KEYS = ALLERGENS.map(a => a.key);
