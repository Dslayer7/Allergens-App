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

const IntelligentColumnMappingOutputSchema = z.record(z.string(), z.string()).describe('A map of column headers to data fields (e.g., { \"Column A\": \"Item Name\", \"Column B\": \"Ingredients\" }).');
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

  Given the following column headers and example rows from a menu file, determine the most appropriate data field for each column.

  The possible data fields are: Item Name, Japanese Name, Ingredients, Price, Description, Allergens, Image URL.

  Return a JSON object where the keys are the column headers and the values are the corresponding data fields.

  Column Headers:
  {{#each columnHeaders}}
  - {{{this}}}
  {{/each}}

  Example Rows:
  {{#each exampleRows}}
  - {{#each this}}{{@key}}: '{{{this}}}' {{/each}}
  {{/each}}

  Ensure that the output is a valid JSON object. Do not include any explanations or introductory text. Output only valid JSON that conforms to the IntelligentColumnMappingOutputSchema schema.
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
