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
  prompt: `You are an expert at mapping columns from a menu file to the correct data fields. Your task is to analyze the provided column headers and example rows, and then map each column header to one of the specified predefined fields.

**Predefined Fields:**
- "Item Name"
- "Japanese Name"
- "Description"
- "Ingredients"
- "Price"
- "Allergens"
- "Image URL"
- "Other" (Use this for any column that does not fit the other categories)

**Input Data:**

Column Headers:
{{#each columnHeaders}}
- \`{{{this}}}\`
{{/each}}

Example Rows (JSON array of objects):
[
{{#each exampleRows}}
  {
  {{#each this}}
    "{{@key}}": "{{{this}}}"{{#unless @last}},{{/unless}}
  {{/each}}
  }{{#unless @last}},{{/unless}}
{{/each}}
]

**Instructions:**
Based on the input data, provide a mapping for each column header. Your response MUST be a single, valid JSON object. The keys of this object should be the exact column headers from the input, and the values must be one of the predefined fields listed above. Do not include any explanations, comments, or any text outside of the JSON object.

Example Output Format:
{
  "Header 1": "Item Name",
  "Header 2": "Description",
  "価格": "Price",
  "アレルギー": "Allergens",
  "Unmatched Column": "Other"
}
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
