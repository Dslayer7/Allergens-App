import { ALLERGEN_KEY_MAP } from "@/lib/allergens";
import { CircleHelp } from "lucide-react";

interface AllergenIconProps {
  allergenKey: string;
  className?: string;
}

export function AllergenIcon({ allergenKey, className }: AllergenIconProps) {
  const allergenInfo = ALLERGEN_KEY_MAP[allergenKey];
  if (!allergenInfo) {
    return <CircleHelp className={className} />;
  }
  const { Icon } = allergenInfo;
  return <Icon className={className} />;
}
