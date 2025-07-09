import { Apple, Banana, Bean, Citrus, Egg, Fish, Leaf, Milk, Nut, Wheat } from 'lucide-react';
import type { AllergenInfo } from './types';
import ShrimpIcon from '@/components/icons/shrimp-icon';
import CrabIcon from '@/components/icons/crab-icon';
import BeefIcon from '@/components/icons/beef-icon';
import ChickenIcon from '@/components/icons/chicken-icon';
import PorkIcon from '@/components/icons/pork-icon';

export const ALLERGENS: AllergenInfo[] = [
  { key: 'shrimp', name: 'Shrimp (えび)', Icon: ShrimpIcon },
  { key: 'crab', name: 'Crab (かに)', Icon: CrabIcon },
  { key: 'wheat', name: 'Wheat (小麦)', Icon: Wheat },
  { key: 'buckwheat', name: 'Buckwheat (そば)', Icon: Leaf },
  { key: 'egg', name: 'Egg (卵)', Icon: Egg },
  { key: 'milk', name: 'Milk (乳)', Icon: Milk },
  { key: 'peanut', name: 'Peanut (落花生)', Icon: Bean },
  // 7 specified items above. Recommended 13 items below.
  { key: 'abalone', name: 'Abalone (あわび)', Icon: Fish },
  { key: 'squid', name: 'Squid (いか)', Icon: Fish },
  { key: 'salmon_roe', name: 'Salmon Roe (いくら)', Icon: Egg },
  { key: 'orange', name: 'Orange (オレンジ)', Icon: Citrus },
  { key: 'kiwi', name: 'Kiwi (キウイフルーツ)', Icon: Apple },
  { key: 'beef', name: 'Beef (牛肉)', Icon: BeefIcon },
  { key: 'walnut', name: 'Walnut (くるみ)', Icon: Nut },
  { key: 'salmon', name: 'Salmon (さけ)', Icon: Fish },
  { key: 'mackerel', name: 'Mackerel (さば)', Icon: Fish },
  { key: 'soybean', name: 'Soybean (大豆)', Icon: Bean },
  { key: 'chicken', name: 'Chicken (鶏肉)', Icon: ChickenIcon },
  { key: 'banana', name: 'Banana (バナナ)', Icon: Banana },
  { key: 'pork', name: 'Pork (豚肉)', Icon: PorkIcon },
];

export const ALLERGEN_KEY_MAP = ALLERGENS.reduce((acc, allergen) => {
  acc[allergen.key] = allergen;
  return acc;
}, {} as Record<string, AllergenInfo>);
