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

const PromptInputSchema = z.object({
  columnHeaders: z.array(z.string()),
  exampleRowsJson: z.string(),
});


const prompt = ai.definePrompt({
  name: 'intelligentColumnMappingPrompt',
  input: {schema: PromptInputSchema},
  output: {schema: IntelligentColumnMappingOutputSchema},
  prompt: `You are an intelligent data mapper. Your task is to map column headers from a spreadsheet to a set of predefined fields.

Here are the column headers you need to map:
{{#each columnHeaders}}
- "{{{this}}}"
{{/each}}

Here are some example rows to give you context:
\`\`\`json
{{{exampleRowsJson}}}
\`\`\`

Please map EACH of the column headers to one of the following predefined fields:
- "Item Name"
- "Japanese Name"
- "Description"
- "Ingredients"
- "Price"
- "Allergens"
- "Image URL"
- "Other"

Your response must be a valid JSON object where each key is a column header from the input and the value is one of the predefined fields. Do not include any explanations, comments, or any text outside of the JSON object.`,
  config: {
    temperature: 0,
  }
});

const intelligentColumnMappingFlow = ai.defineFlow(
  {
    name: 'intelligentColumnMappingFlow',
    inputSchema: IntelligentColumnMappingInputSchema,
    outputSchema: IntelligentColumnMappingOutputSchema,
  },
  async input => {
    try {
      console.log('Flow input:', JSON.stringify(input, null, 2));

      const promptInput = {
        columnHeaders: input.columnHeaders,
        exampleRowsJson: JSON.stringify(input.exampleRows, null, 2),
      };
      
      console.log('Prompt input:', JSON.stringify(promptInput, null, 2));

      const {output} = await prompt(promptInput);

      console.log('Prompt output:', output);
      if (!output) {
        throw new Error('AI prompt returned no output.');
      }
      return output;
    } catch (e) {
      console.error("Critical error in intelligentColumnMappingFlow:", e);
      // Re-throwing the error is important so the calling action knows about the failure.
      throw e;
    }
  }
);
