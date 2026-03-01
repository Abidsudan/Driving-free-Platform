'use server';
/**
 * @fileOverview A Genkit flow for generating daily academic driving tips.
 *
 * - getDailyDrivingTip - A function that returns a professional driving tip.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const DailyTipOutputSchema = z.object({
  title: z.string().describe('The title of the tip.'),
  content: z.string().describe('The detailed professional advice in Arabic.'),
  category: z.string().describe('The category (e.g., Physics of Driving, Psychology, RTA Rules).'),
});

export type DailyTipOutput = z.infer<typeof DailyTipOutputSchema>;

export async function getDailyDrivingTip(): Promise<DailyTipOutput> {
  const { output } = await ai.generate({
    model: 'googleai/gemini-2.5-flash',
    output: { schema: DailyTipOutputSchema },
    prompt: `أنت كبير مدربي القيادة في دبي. قدم نصيحة أكاديمية وعلمية قصيرة واحترافية اليوم لطلاب القيادة باللغة العربية. 
    ركز على جوانب تقنية مثل (فيزياء الكبح، التعامل مع النقاط العمياء، سيكولوجية القيادة تحت الضغط، أو قواعد نظام DSSSM).
    اجعل الأسلوب علمياً، رصيناً ومفيداً جداً.`,
  });

  if (!output) {
    throw new Error('Failed to generate daily tip.');
  }
  return output;
}
