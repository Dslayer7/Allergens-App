import { Apple, Banana, Bone, Citrus, Nut, Wheat } from 'lucide-react';
import type { AllergenInfo } from './types';
import ShrimpIcon from '@/components/icons/shrimp-icon';
import CrabIcon from '@/components/icons/crab-icon';
import BuckwheatIcon from '@/components/icons/buckwheat-icon';
import PeanutIcon from '@/components/icons/peanut-icon';
import AbaloneIcon from '@/components/icons/abalone-icon';
import SquidIcon from '@/components/icons/squid-icon';
import KiwiIcon from '@/components/icons/kiwi-icon';
import BeefIcon from '@/components/icons/beef-icon';
import SesameIcon from '@/components/icons/sesame-icon';
import SoybeanIcon from '@/components/icons/soybean-icon';
import ChickenIcon from '@/components/icons/chicken-icon';
import PorkIcon from '@/components/icons/pork-icon';
import MatsutakeIcon from '@/components/icons/matsutake-icon';
import PeachIcon from '@/components/icons/peach-icon';
import YamIcon from '@/components/icons/yam-icon';
import CeleryIcon from '@/components/icons/celery-icon';
import MustardIcon from '@/components/icons/mustard-icon';
import SulfitesIcon from '@/components/icons/sulfites-icon';
import AlcoholFreeIcon from '@/components/icons/alcohol-free-icon';
import CerealsIcon from '@/components/icons/cereals-icon';
import DairyFreeIcon from '@/components/icons/dairy-free-icon';
import EggIcon from '@/components/icons/egg-icon';
import FishIcon from '@/components/icons/fish-icon';
import GlutenFreeIcon from '@/components/icons/gluten-free-icon';
import LupinIcon from '@/components/icons/lupin-icon';
import MilkIcon from '@/components/icons/milk-icon';
import MollusksIcon from '@/components/icons/mollusks-icon';

export const ALLERGENS: AllergenInfo[] = [
  { key: 'shrimp', name: 'Shrimp (えび)', Icon: ShrimpIcon },
  { key: 'crab', name: 'Crab (かに)', Icon: CrabIcon },
  { key: 'walnut', name: 'Walnut (くるみ)', Icon: Nut },
  { key: 'wheat', name: 'Wheat (小麦)', Icon: Wheat },
  { key: 'buckwheat', name: 'Buckwheat (そば)', Icon: BuckwheatIcon },
  { key: 'egg', name: 'Egg (卵)', Icon: EggIcon },
  { key: 'milk', name: 'Milk (乳)', Icon: MilkIcon },
  { key: 'peanut', name: 'Peanut (落花生)', Icon: PeanutIcon },
  { key: 'almond', name: 'Almond (アーモンド)', Icon: Nut },
  { key: 'abalone', name: 'Abalone (あわび)', Icon: AbaloneIcon },
  { key: 'squid', name: 'Squid (いか)', Icon: SquidIcon },
  { key: 'salmon_roe', name: 'Salmon Roe (いくら)', Icon: FishIcon },
  { key: 'orange', name: 'Orange (オレンジ)', Icon: Citrus },
  { key: 'cashew', name: 'Cashew (カシューナッツ)', Icon: Nut },
  { key: 'kiwi', name: 'Kiwi (キウイフルーツ)', Icon: KiwiIcon },
  { key: 'beef', name: 'Beef (牛肉)', Icon: BeefIcon },
  { key: 'sesame', name: 'Sesame (ごま)', Icon: SesameIcon },
  { key: 'salmon', name: 'Salmon (さけ)', Icon: FishIcon },
  { key: 'mackerel', name: 'Mackerel (さば)', Icon: FishIcon },
  { key: 'soybean', name: 'Soybean (大豆)', Icon: SoybeanIcon },
  { key: 'chicken', name: 'Chicken (鶏肉)', Icon: ChickenIcon },
  { key: 'banana', name: 'Banana (バナナ)', Icon: Banana },
  { key: 'pork', name: 'Pork (豚肉)', Icon: PorkIcon },
  { key: 'matsutake', name: 'Matsutake (まつたけ)', Icon: MatsutakeIcon },
  { key: 'peach', name: 'Peach (もも)', Icon: PeachIcon },
  { key: 'yam', name: 'Yam (やまいも)', Icon: YamIcon },
  { key: 'apple', name: 'Apple (りんご)', Icon: Apple },
  { key: 'gelatin', name: 'Gelatin (ゼラチン)', Icon: Bone },
  // New ones for robustness
  { key: 'alcohol-free', name: 'Alcohol-Free', Icon: AlcoholFreeIcon },
  { key: 'celery', name: 'Celery (セロリ)', Icon: CeleryIcon },
  { key: 'cereals', name: 'Cereals', Icon: CerealsIcon },
  { key: 'dairy-free', name: 'Dairy-free', Icon: DairyFreeIcon },
  { key: 'fish', name: 'Fish (魚)', Icon: FishIcon },
  { key: 'gluten-free', name: 'Gluten-Free', Icon: GlutenFreeIcon },
  { key: 'lupin', name: 'Lupin (ルピナス)', Icon: LupinIcon },
  { key: 'mollusks', name: 'Mollusks (軟体動物)', Icon: MollusksIcon },
  { key: 'mustard', name: 'Mustard (マスタード)', Icon: MustardIcon },
  { key: 'nuts', name: 'Nuts (ナッツ類)', Icon: Nut },
  { key: 'sulfites', name: 'Sulfites (亜硫酸塩)', Icon: SulfitesIcon },
];

export const ALLERGEN_KEY_MAP = ALLERGENS.reduce((acc, allergen) => {
  acc[allergen.key] = allergen;
  return acc;
}, {} as Record<string, AllergenInfo>);
