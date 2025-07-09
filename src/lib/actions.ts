'use server';

import { intelligentColumnMapping } from "@/ai/flows/menu-column-mapping";
import { detectMenuItemAllergens } from "@/ai/flows/menu-item-allergen-detection";

export async function mapColumns(
  columnHeaders: string[],
  exampleRows: Record<string, string>[]
) {
  try {
    const mappedColumns = await intelligentColumnMapping({
      columnHeaders,
      exampleRows,
    });
    return { success: true, data: mappedColumns };
  } catch (error) {
    console.error('Error in mapColumns:', error);
    return { success: false, error: 'Failed to map columns using AI.' };
  }
}

export async function findMenuItemAllergens(item: {
  menuItemName: string;
  ingredients: string;
  description: string;
}) {
  try {
    const result = await detectMenuItemAllergens(item);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error finding allergens:', error);
    return { success: false, error: 'Failed to find allergens using AI.' };
  }
}
