'use server';
/**
 * @fileOverview A Genkit flow for generating daily academic driving tips.
 *
 * - getDailyDrivingTip - A function that returns a professional driving tip.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const DailyTipInputSchema = z.object({
  language: z.enum(['ar', 'en']).default('ar').describe('The language for the tip.'),
});

const DailyTipOutputSchema = z.object({
  title: z.string().describe('The title of the tip.'),
  content: z.string().describe('The detailed professional advice.'),
  category: z.string().describe('The category (e.g., Physics of Driving, Psychology, RTA Rules).'),
});

export type DailyTipOutput = z.infer<typeof DailyTipOutputSchema>;

export async function getDailyDrivingTip(language: 'ar' | 'en' = 'ar'): Promise<DailyTipOutput> {
  const { output } = await ai.generate({
    model: 'googleai/gemini-2.5-flash',
    output: { schema: DailyTipOutputSchema },
    prompt: `You are a senior driving instructor in Dubai. Provide a short, professional, academic driving tip for today in the language: ${language}. 
    Focus on technical aspects like (Braking Physics, Blind Spot Management, Psychology under pressure, or DSSSM rules).
    Keep the style scientific, formal, and highly informative.`,
  });

  if (!output) {
    throw new Error('Failed to generate daily tip.');
  }
  return output;
}
