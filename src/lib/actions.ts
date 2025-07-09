'use server';

import { detectMenuItemAllergens } from "@/ai/flows/menu-item-allergen-detection";

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
