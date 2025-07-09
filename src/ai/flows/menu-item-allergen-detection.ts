// use server'

/**
 * @fileOverview This file contains a Genkit flow for detecting potential allergens in menu items.
 *
 * - detectMenuItemAllergens - A function that triggers the allergen detection flow.
 * - MenuItemAllergenDetectionInput - The input type for the detectMenuItemAllergens function.
 * - MenuItemAllergenDetectionOutput - The output type for the detectMenuItemAllergens function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MenuItemAllergenDetectionInputSchema = z.object({
  menuItemName: z.string().describe('The name of the menu item.'),
  ingredients: z.string().describe('The list of ingredients in the menu item.'),
  description: z.string().describe('A description of the menu item.'),
});

export type MenuItemAllergenDetectionInput = z.infer<typeof MenuItemAllergenDetectionInputSchema>;

const MenuItemAllergenDetectionOutputSchema = z.object({
  allergens: z
    .array(z.string())
    .describe('A list of potential allergens detected in the menu item.'),
  confidenceScores: z
    .record(z.number())
    .describe(
      'A map of allergen to confidence score, indicating the likelihood of each allergen being present.'
    ),
  reasoning: z
    .string()
    .describe('Explanation for why the system thinks the specified allergens exist in the item.'),
});

export type MenuItemAllergenDetectionOutput = z.infer<typeof MenuItemAllergenDetectionOutputSchema>;

export async function detectMenuItemAllergens(
  input: MenuItemAllergenDetectionInput
): Promise<MenuItemAllergenDetectionOutput> {
  return detectMenuItemAllergensFlow(input);
}

const detectMenuItemAllergensPrompt = ai.definePrompt({
  name: 'detectMenuItemAllergensPrompt',
  input: {schema: MenuItemAllergenDetectionInputSchema},
  output: {schema: MenuItemAllergenDetectionOutputSchema},
  prompt: `You are an AI assistant designed to detect potential allergens in menu items.

  Analyze the menu item name, ingredients, and description to identify any potential allergens.
  Provide a list of allergens and a confidence score for each allergen.

  Menu Item Name: {{{menuItemName}}}
  Ingredients: {{{ingredients}}}
  Description: {{{description}}}

  Output the allergens in JSON format:
  {
    "allergens": ["allergen1", "allergen2", ...],
    "confidenceScores": {
      "allergen1": 0.8,
      "allergen2": 0.6,
      ...
    },
    "reasoning": "Explanation for why the system thinks the specified allergens exist in the item."
  }`,
});

const detectMenuItemAllergensFlow = ai.defineFlow(
  {
    name: 'detectMenuItemAllergensFlow',
    inputSchema: MenuItemAllergenDetectionInputSchema,
    outputSchema: MenuItemAllergenDetectionOutputSchema,
  },
  async input => {
    const {output} = await detectMenuItemAllergensPrompt(input);
    return output!;
  }
);
