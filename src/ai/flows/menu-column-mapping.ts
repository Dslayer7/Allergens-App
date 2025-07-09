'use server';

/**
 * @fileOverview An AI agent for intelligently mapping columns from a menu file to the correct data fields.
 *
 * - intelligentColumnMapping - A function that handles the column mapping process.
 * - IntelligentColumnMappingInput - The input type for the intelligentColumnMapping function.
 * - IntelligentColumnMappingOutput - The return type for the intelligentColumnMapping function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IntelligentColumnMappingInputSchema = z.object({
  columnHeaders: z.array(z.string()).describe('An array of column headers extracted from the menu file.'),
  exampleRows: z.array(z.record(z.string())).describe('An array of example rows from the menu file.'),
});
export type IntelligentColumnMappingInput = z.infer<
  typeof IntelligentColumnMappingInputSchema
>;

const IntelligentColumnMappingOutputSchema = z.record(z.string(), z.string()).describe('A map of column headers to data fields (e.g., { "Column A": "Item Name", "Column B": "Ingredients" }).');
export type IntelligentColumnMappingOutput = z.infer<
  typeof IntelligentColumnMappingOutputSchema
>;

export async function intelligentColumnMapping(
  input: IntelligentColumnMappingInput
): Promise<IntelligentColumnMappingOutput> {
  return intelligentColumnMappingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'intelligentColumnMappingPrompt',
  input: {schema: IntelligentColumnMappingInputSchema},
  output: {schema: IntelligentColumnMappingOutputSchema},
  prompt: `You are an expert at mapping columns from a menu file to the correct data fields.

Given the following column headers and example rows, map each column header to one of the predefined fields.

Predefined Fields: "Item Name", "Japanese Name", "Ingredients", "Price", "Description", "Allergens", "Image URL".
If a column doesn't match, map it to "Other".

Column Headers:
{{#each columnHeaders}}
- {{{this}}}
{{/each}}

Example Rows:
{{#each exampleRows}}
---
{{#each this}}
"{{@key}}": "{{{this}}}"
{{/each}}
{{/each}}

Return a single JSON object where keys are the column headers and values are the mapped field names. Do not include any explanations or other text outside of the JSON object.
`,
});

const intelligentColumnMappingFlow = ai.defineFlow(
  {
    name: 'intelligentColumnMappingFlow',
    inputSchema: IntelligentColumnMappingInputSchema,
    outputSchema: IntelligentColumnMappingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);