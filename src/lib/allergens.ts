import { Carrot, Egg, Fish, FlaskConical, Flower, Leaf, Milk, MilkOff, Nut, Wheat, WheatOff, WineOff } from 'lucide-react';
import type { AllergenInfo } from './types';
import BuckwheatIcon from '@/components/icons/buckwheat-icon';
import CrabIcon from '@/components/icons/crab-icon';
import PeanutIcon from '@/components/icons/peanut-icon';
import PorkIcon from '@/components/icons/pork-icon';
import SoybeanIcon from '@/components/icons/soybean-icon';
import SquidIcon from '@/components/icons/squid-icon';
import CeleryIcon from '@/components/icons/celery-icon';
import SesameIcon from '@/components/icons/sesame-icon';
import MustardIcon from '@/components/icons/mustard-icon';

export const ALLERGENS: AllergenInfo[] = [
  { key: 'wheat', name: 'Wheat (小麦)', Icon: Wheat },
  { key: 'gluten_free', name: 'Gluten-Free (グルテンフリー)', Icon: WheatOff },
  { key: 'fish', name: 'Fish (魚)', Icon: Fish },
  { key: 'crustaceans', name: 'Crustaceans (甲殻類)', Icon: CrabIcon },
  { key: 'molluscs', name: 'Molluscs (軟体動物)', Icon: SquidIcon },
  { key: 'egg', name: 'Egg (卵)', Icon: Egg },
  { key: 'soybean', name: 'Soybean (大豆)', Icon: SoybeanIcon },
  { key: 'celery', name: 'Celery (セロリ)', Icon: CeleryIcon },
  { key: 'sulfites', name: 'Sulfites (亜硫酸塩)', Icon: FlaskConical },
  { key: 'pork_free', name: 'Pork-Free (ポークフリー)', Icon: PorkIcon },
  { key: 'milk', name: 'Milk (牛乳)', Icon: Milk },
  { key: 'dairy_free', name: 'Dairy-Free (デイリーフリー)', Icon: MilkOff },
  { key: 'lupin', name: 'Lupin (ルピナス)', Icon: Flower },
  { key: 'sesame', name: 'Sesame (ごま)', Icon: SesameIcon },
  { key: 'mustard', name: 'Mustard (マスタード)', Icon: MustardIcon },
  { key: 'peanut', name: 'Peanut (ピーナッツ)', Icon: PeanutIcon },
  { key: 'nuts', name: 'Nuts (ナッツ類)', Icon: Nut },
  { key: 'vegetarian', name: 'Vegetarian (ベジタリアン)', Icon: Carrot },
  { key: 'vegan', name: 'Vegan (ヴィーガン)', Icon: Leaf },
  { key: 'alcohol_free', name: 'Alcohol-Free (アルコールフリー)', Icon: WineOff },
  { key: 'buckwheat', name: 'Buckwheat (そば)', Icon: BuckwheatIcon },
];

export const ALLERGEN_KEY_MAP = ALLERGENS.reduce((acc, allergen) => {
  acc[allergen.key] = allergen;
  return acc;
}, {} as Record<string, AllergenInfo>);
