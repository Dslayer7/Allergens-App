
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
  prompt: `You are an expert system that maps spreadsheet columns to predefined data fields. You ONLY respond with valid JSON.
The user will provide you with column headers and example rows from a menu spreadsheet.
Your task is to create a JSON object that maps every column header to one of these specific fields:
- "Item Name"
- "Japanese Name"
- "Description"
- "Ingredients"
- "Price"
- "Allergens"
- "Image URL"
- "Other"

IMPORTANT RULES:
1.  Your entire response MUST be a single, valid JSON object.
2.  Do NOT include any text, explanations, or markdown fences (like \`\`\`json) before or after the JSON object.
3.  Every single column header from the input must be a key in your output JSON object.
4.  The value for each key must be one of the predefined fields listed above.

Input Data:

Column Headers:
{{#each columnHeaders}}
- \`{{{this}}}\`
{{/each}}

Example Rows (for context):
\`\`\`json
{{{exampleRowsJson}}}
\`\`\`

Your JSON Output:`,
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
      console.log('--- intelligentColumnMappingFlow ---');
      console.log('[1] Received input:', JSON.stringify(input, null, 2));

      if (!input.columnHeaders || input.columnHeaders.length === 0) {
        console.error('[!] Error: No column headers provided.');
        throw new Error('No column headers provided to AI flow.');
      }

      const promptInput = {
        columnHeaders: input.columnHeaders,
        exampleRowsJson: JSON.stringify(input.exampleRows, null, 2),
      };
      
      console.log('[2] Prepared prompt input:', JSON.stringify(promptInput, null, 2));
      console.log('[3] Calling AI prompt...');

      const {output} = await prompt(promptInput);

      console.log('[4] Parsed output from AI:', JSON.stringify(output, null, 2));

      if (!output) {
        console.error('[!] Error: AI prompt returned a null or undefined output after parsing.');
        throw new Error('AI prompt returned no output.');
      }
      
      console.log('[5] Flow finished successfully. Returning output.');
      console.log('--- END intelligentColumnMappingFlow ---');
      return output;
    } catch (e: any) {
      console.error('--- intelligentColumnMappingFlow FAILED ---');
      console.error('[!] Critical error in flow. This likely means the AI output was not valid JSON or did not match the required schema.');
      console.error('[!] Error message:', e.message);
      if (e.stack) {
        console.error('[!] Stack trace:', e.stack);
      }
      if (e.details) {
        console.error("[!] Genkit error details:", e.details);
      }
      console.error('--- END intelligentColumnMappingFlow ---');
      throw e;
    }
  }
);
    