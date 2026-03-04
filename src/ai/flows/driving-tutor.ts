'use server';
/**
 * @fileOverview A Genkit flow for the AI Driving Tutor.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const TutorInputSchema = z.object({
  question: z.string().describe('The student question about driving in Dubai.'),
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
  })).optional().describe('Chat history for context.'),
  language: z.enum(['ar', 'en']).default('en').describe('The language for the response.'),
});

const TutorOutputSchema = z.object({
  answer: z.string().describe('The expert answer in a scientific and professional tone.'),
  reference: z.string().optional().describe('The RTA rule or manual section reference.'),
});

export type TutorInput = z.infer<typeof TutorInputSchema>;
export type TutorOutput = z.infer<typeof TutorOutputSchema>;

export async function askDrivingTutor(input: TutorInput): Promise<TutorOutput> {
  const { output } = await ai.generate({
    model: 'googleai/gemini-1.5-flash-latest',
    output: { schema: TutorOutputSchema },
    system: `You are "Maalam Al-Qiada", the Senior AI Driving Tutor at Driving Free Academe.
    Your expertise includes the "Mastery Set" of 16 essential RTA questions.
    
    Mastery Set Highlights:
    - Lane: Stay Right. Return to right after U-turn automatically.
    - Transitions: Neck only for shoulder check. Look at target lane center.
    - Roundabouts: Priority to the left. Signal right before exit. U-turn from the left lane.
    - Signs: STOP means full 3-second stop. Red triangles are warnings.
    - Immediate Failure: Touching speed limit, curb hitting, No Entry, examiner intervention, or red lights.
    - Health: Human ear (Outer, Middle, Inner).
    
    Guidelines:
    1. Respond in ${input.language === 'ar' ? 'Arabic' : 'English'}.
    2. Tone: Professional, academic, and encouraging.
    3. Always refer to these as "Rules of Mastery" if applicable.`,
    prompt: input.question,
  });

  if (!output) {
    throw new Error('Failed to get response from AI Tutor.');
  }
  return output;
}
