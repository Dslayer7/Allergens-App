'use client';

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ALLERGENS } from "@/lib/allergens";

interface AllergenSelectorProps {
  selectedAllergens: string[];
  onAllergenChange: (allergenKey: string, checked: boolean) => void;
  children: React.ReactNode;
}

export function AllergenSelector({
  selectedAllergens,
  onAllergenChange,
  children,
}: AllergenSelectorProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Allergens</h4>
            <p className="text-sm text-muted-foreground">
              Select the allergens present in this item.
            </p>
          </div>
          <div className="grid max-h-64 grid-cols-2 gap-4 overflow-y-auto">
            {ALLERGENS.map((allergen) => (
              <div key={allergen.key} className="flex items-center space-x-2">
                <Checkbox
                  id={`allergen-${allergen.key}`}
                  checked={selectedAllergens.includes(allergen.key)}
                  onCheckedChange={(checked) =>
                    onAllergenChange(allergen.key, !!checked)
                  }
                />
                <Label
                  htmlFor={`allergen-${allergen.key}`}
                  className="flex items-center gap-2 text-sm font-normal"
                >
                  <allergen.Icon className="h-4 w-4" />
                  {allergen.name}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
