'use server';
/**
 * @fileOverview المعلم الذكي "معلم القيادة" للإجابة على تساؤلات الطلاب.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const TutorInputSchema = z.object({
  question: z.string().describe('The student question about driving in Dubai.'),
  language: z.enum(['ar', 'en']).default('en').describe('The language for the response.'),
});

const TutorOutputSchema = z.object({
  answer: z.string().describe('The expert answer.'),
  reference: z.string().optional().describe('The RTA rule or manual section reference.'),
});

export type TutorInput = z.infer<typeof TutorInputSchema>;
export type TutorOutput = z.infer<typeof TutorOutputSchema>;

const tutorPrompt = ai.definePrompt({
  name: 'tutorPrompt',
  input: { 
    schema: TutorInputSchema.extend({
      isArabic: z.boolean().optional()
    }) 
  },
  output: { schema: TutorOutputSchema },
  system: `You are "Maalam Al-Qiada", the Senior AI Driving Tutor at Driving Free Academy.
    Expertise: Lane rules, shoulder checks, roundabouts, and RTA immediate failure criteria.
    Guidelines:
    1. Respond in {{#if isArabic}}Arabic{{else}}English{{/if}}.
    2. Tone: Professional and academic.`,
  prompt: `{{question}}`,
});

export async function askDrivingTutor(input: TutorInput): Promise<TutorOutput> {
  const isArabic = input.language === 'ar';
  const { output } = await tutorPrompt({
    ...input,
    isArabic
  });
  
  if (!output) throw new Error('Failed to get response from AI Tutor.');
  return output;
}
