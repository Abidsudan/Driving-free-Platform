
'use server';
/**
 * @fileOverview A Genkit flow for the AI Driving Tutor (Maalam Al-Qiada).
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const TutorInputSchema = z.object({
  question: z.string().describe('The student question about driving in Dubai.'),
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
  })).optional().describe('Chat history for context.'),
  language: z.enum(['ar', 'en']).default('ar').describe('The language for the response.'),
});

const TutorOutputSchema = z.object({
  answer: z.string().describe('The expert answer in a scientific and professional tone.'),
  reference: z.string().optional().describe('The RTA rule or manual section reference.'),
});

export type TutorInput = z.infer<typeof TutorInputSchema>;
export type TutorOutput = z.infer<typeof TutorOutputSchema>;

export async function askDrivingTutor(input: TutorInput): Promise<TutorOutput> {
  const { output } = await ai.generate({
    output: { schema: TutorOutputSchema },
    system: `You are "Maalam Al-Qiada", the Senior AI Driving Tutor at Driving Free Academe in Dubai.
    Your expertise is strictly limited to Dubai RTA rules, DSSSM system, vehicle physics, and driving psychology.
    
    Guidelines:
    1. Language: Always respond in ${input.language === 'ar' ? 'Arabic' : 'English'}.
    2. Tone: Professional, academic, scientific, and encouraging.
    3. Accuracy: Base your answers on the RTA Driving Manual and official UAE traffic laws.
    4. Safety: Prioritize safety and rule adherence above all.
    5. If a question is not related to driving or UAE traffic, politely redirect the student to driving topics.
    
    Structure your answer clearly with a reference if possible.`,
    prompt: input.question,
  });

  if (!output) {
    throw new Error('Failed to get response from AI Tutor.');
  }
  return output;
}
