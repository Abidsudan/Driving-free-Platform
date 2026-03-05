'use server';
/**
 * @fileOverview توليد نصيحة أكاديمية يومية.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const DailyTipOutputSchema = z.object({
  title: z.string(),
  content: z.string(),
  category: z.string(),
});

export type DailyTipOutput = z.infer<typeof DailyTipOutputSchema>;

export async function getDailyDrivingTip(language: 'ar' | 'en' = 'en'): Promise<DailyTipOutput> {
  try {
    const isArabic = language === 'ar';
    
    const response = await ai.generate({
      model: 'googleai/gemini-1.5-flash',
      output: { schema: DailyTipOutputSchema },
      system: `You are a senior driving instructor in Dubai. Provide a professional academic driving tip. 
      Focus on Braking Physics, Blind Spot Management, or RTA Rules.
      Language: ${isArabic ? 'Arabic' : 'English'}.`,
      prompt: "Generate one expert driving tip."
    });
    
    if (!response.output) throw new Error('No tip generated.');
    return response.output;
  } catch (error) {
    console.error('Error in getDailyDrivingTip:', error);
    throw new Error('Failed to generate daily tip.');
  }
}
