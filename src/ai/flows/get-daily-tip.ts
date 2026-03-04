'use server';
/**
 * @fileOverview A Genkit flow for generating daily academic driving tips.
 *
 * - getDailyDrivingTip - A function that handles generating a daily tip.
 * - DailyTipOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const DailyTipInputSchema = z.object({
  language: z.enum(['ar', 'en']).default('en'),
});

const DailyTipOutputSchema = z.object({
  title: z.string().describe('The title of the tip.'),
  content: z.string().describe('The detailed professional advice.'),
  category: z.string().describe('The category (e.g., Physics of Driving, Psychology, RTA Rules).'),
});

export type DailyTipOutput = z.infer<typeof DailyTipOutputSchema>;

const dailyTipPrompt = ai.definePrompt({
  name: 'dailyTipPrompt',
  model: 'googleai/gemini-1.5-flash',
  input: { schema: DailyTipInputSchema },
  output: { schema: DailyTipOutputSchema },
  prompt: `You are a senior driving instructor in Dubai. Provide a short, professional, academic driving tip for today in the language: {{language}}. 
    Focus on technical aspects like (Braking Physics, Blind Spot Management, Psychology under pressure, or DSSSM rules).
    Keep the style scientific, formal, and highly informative.`,
});

const dailyTipFlow = ai.defineFlow(
  {
    name: 'dailyTipFlow',
    inputSchema: DailyTipInputSchema,
    outputSchema: DailyTipOutputSchema,
  },
  async (input) => {
    const { output } = await dailyTipPrompt(input);
    
    if (!output) throw new Error('Failed to generate daily tip.');
    return output;
  }
);

export async function getDailyDrivingTip(language: 'ar' | 'en' = 'en'): Promise<DailyTipOutput> {
  return dailyTipFlow({ language });
}
