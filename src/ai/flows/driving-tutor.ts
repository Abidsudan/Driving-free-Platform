'use server';
/**
 * @fileOverview المعلم الذكي للإجابة على تساؤلات الطلاب.
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

export async function askDrivingTutor(input: TutorInput): Promise<TutorOutput> {
  try {
    const isArabic = input.language === 'ar';
    
    const response = await ai.generate({
      model: 'googleai/gemini-1.5-flash',
      output: { schema: TutorOutputSchema },
      system: `You are "Maalam Al-Qiada", the Senior AI Driving Tutor at Driving Free Academy in Dubai.
      Respond in ${isArabic ? 'Arabic' : 'English'}. 
      Tone: Professional, academic, and supportive. Use Dubai RTA rules as your primary source.`,
      prompt: `Student Question: ${input.question}`
    });
    
    if (!response.output) throw new Error('No response from AI Tutor.');
    return response.output;
  } catch (error) {
    console.error('Error in askDrivingTutor:', error);
    throw new Error('Failed to connect to AI Tutor.');
  }
}
