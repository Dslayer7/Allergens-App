import { Apple, Banana, Citrus, Egg, Milk, Nut, Wheat } from 'lucide-react';
import type { AllergenInfo } from './types';
import ShrimpIcon from '@/components/icons/shrimp-icon';
import CrabIcon from '@/components/icons/crab-icon';
import BeefIcon from '@/components/icons/beef-icon';
import ChickenIcon from '@/components/icons/chicken-icon';
import PorkIcon from '@/components/icons/pork-icon';
import AbaloneIcon from '@/components/icons/abalone-icon';
import BuckwheatIcon from '@/components/icons/buckwheat-icon';
import MackerelIcon from '@/components/icons/mackerel-icon';
import PeanutIcon from '@/components/icons/peanut-icon';
import SalmonIcon from '@/components/icons/salmon-icon';
import SoybeanIcon from '@/components/icons/soybean-icon';
import SquidIcon from '@/components/icons/squid-icon';

export const ALLERGENS: AllergenInfo[] = [
  { key: 'shrimp', name: 'Shrimp (えび)', Icon: ShrimpIcon },
  { key: 'crab', name: 'Crab (かに)', Icon: CrabIcon },
  { key: 'wheat', name: 'Wheat (小麦)', Icon: Wheat },
  { key: 'buckwheat', name: 'Buckwheat (そば)', Icon: BuckwheatIcon },
  { key: 'egg', name: 'Egg (卵)', Icon: Egg },
  { key: 'milk', name: 'Milk (乳)', Icon: Milk },
  { key: 'peanut', name: 'Peanut (落花生)', Icon: PeanutIcon },
  // 7 specified items above. Recommended 13 items below.
  { key: 'abalone', name: 'Abalone (あわび)', Icon: AbaloneIcon },
  { key: 'squid', name: 'Squid (いか)', Icon: SquidIcon },
  { key: 'salmon_roe', name: 'Salmon Roe (いくら)', Icon: Egg },
  { key: 'orange', name: 'Orange (オレンジ)', Icon: Citrus },
  { key: 'kiwi', name: 'Kiwi (キウイフルーツ)', Icon: Apple },
  { key: 'beef', name: 'Beef (牛肉)', Icon: BeefIcon },
  { key: 'walnut', name: 'Walnut (くるみ)', Icon: Nut },
  { key: 'salmon', name: 'Salmon (さけ)', Icon: SalmonIcon },
  { key: 'mackerel', name: 'Mackerel (さば)', Icon: MackerelIcon },
  { key: 'soybean', name: 'Soybean (大豆)', Icon: SoybeanIcon },
  { key: 'chicken', name: 'Chicken (鶏肉)', Icon: ChickenIcon },
  { key: 'banana', name: 'Banana (バナナ)', Icon: Banana },
  { key: 'pork', name: 'Pork (豚肉)', Icon: PorkIcon },
];

export const ALLERGEN_KEY_MAP = ALLERGENS.reduce((acc, allergen) => {
  acc[allergen.key] = allergen;
  return acc;
}, {} as Record<string, AllergenInfo>);
