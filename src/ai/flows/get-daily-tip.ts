'use server';
/**
 * @fileOverview توليد نصيحة أكاديمية يومية.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const DailyTipInputSchema = z.object({
  language: z.enum(['ar', 'en']).default('en'),
});

const DailyTipOutputSchema = z.object({
  title: z.string(),
  content: z.string(),
  category: z.string(),
});

export type DailyTipOutput = z.infer<typeof DailyTipOutputSchema>;

const dailyTipPrompt = ai.definePrompt({
  name: 'dailyTipPrompt',
  model: 'googleai/gemini-1.5-flash',
  input: { schema: DailyTipInputSchema },
  output: { schema: DailyTipOutputSchema },
  system: `You are a senior driving instructor in Dubai. 
    Provide a professional academic driving tip. 
    Focus on Braking Physics, Blind Spot Management, or RTA Rules.`,
  prompt: `Provide a tip in the language: {{language}}.`,
});

export async function getDailyDrivingTip(language: 'ar' | 'en' = 'en'): Promise<DailyTipOutput> {
  const { output } = await dailyTipPrompt({ language });
  if (!output) throw new Error('Failed to generate daily tip.');
  return output;
}
