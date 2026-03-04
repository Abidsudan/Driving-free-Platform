'use server';
/**
 * @fileOverview A Genkit flow for the AI Driving Tutor.
 *
 * - askDrivingTutor - A function that handles the tutor interaction.
 * - TutorInput - The input type for the function.
 * - TutorOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { gemini15Flash } from '@genkit-ai/google-genai';

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

const tutorPrompt = ai.definePrompt({
  name: 'tutorPrompt',
  model: gemini15Flash,
  input: { 
    schema: TutorInputSchema.extend({
      isArabic: z.boolean().optional()
    }) 
  },
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
    1. Respond in {{#if isArabic}}Arabic{{else}}English{{/if}}.
    2. Tone: Professional, academic, and encouraging.
    3. Always refer to these as "Rules of Mastery" if applicable.`,
  prompt: `{{question}}`,
});

const tutorFlow = ai.defineFlow(
  {
    name: 'tutorFlow',
    inputSchema: TutorInputSchema,
    outputSchema: TutorOutputSchema,
  },
  async (input) => {
    const isArabic = input.language === 'ar';
    // Explicitly pass the model in options to ensure it is recognized
    const { output } = await tutorPrompt(
      {
        ...input,
        isArabic
      },
      {
        model: gemini15Flash
      }
    );
    if (!output) throw new Error('Failed to get response from AI Tutor.');
    return output;
  }
);

export async function askDrivingTutor(input: TutorInput): Promise<TutorOutput> {
  return tutorFlow(input);
}
