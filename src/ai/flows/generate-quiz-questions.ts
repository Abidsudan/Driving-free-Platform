'use server';
/**
 * @fileOverview A Genkit flow for generating RTA-simulated driving quiz questions.
 * Updated with the "Mastery Set" (16 mandatory questions) for the academy.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateQuizQuestionsInputSchema = z.object({
  numberOfQuestions: z.number().int().min(1).max(16).default(5),
  topic: z.string().optional(),
  difficulty: z.enum(['easy', 'medium', 'hard']).default('medium'),
  language: z.enum(['ar', 'en']).default('en'),
});

export type GenerateQuizQuestionsInput = z.infer<typeof GenerateQuizQuestionsInputSchema>;

const QuizQuestionSchema = z.object({
  questionText: z.string(),
  options: z.array(z.string()).min(2).max(4),
  correctAnswerIndex: z.number().int(),
  explanation: z.string(),
  category: z.string(),
});

const GenerateQuizQuestionsOutputSchema = z.object({
  questions: z.array(QuizQuestionSchema),
});

export type GenerateQuizQuestionsOutput = z.infer<typeof GenerateQuizQuestionsOutputSchema>;

export async function generateQuizQuestions(input: GenerateQuizQuestionsInput): Promise<GenerateQuizQuestionsOutput> {
  const { output } = await ai.generate({
    model: 'googleai/gemini-1.5-flash',
    input: { schema: GenerateQuizQuestionsInputSchema, data: input },
    output: { schema: GenerateQuizQuestionsOutputSchema },
    system: `You are an expert in Dubai RTA theory tests. You MUST prioritize generating questions based on the "Mastery Set" provided by the academy. 
    
    MASTERY SET RULES:
    1. Lane: Education vehicles MUST stay in the RIGHT lane. Return to right automatically after U-turn.
    2. Shoulder Check: Move only NECK, not body, to prevent steering deviation.
    3. Vision: Focus on target lane CENTER, not mirrors, during maneuver.
    4. Roundabout Priority: Vehicles inside (from left) have priority.
    5. Roundabout Signal: Signal RIGHT after passing the exit before yours.
    6. STOP Sign: Full 3-second stop (zero speed).
    7. Red Triangle: Warning signs.
    8. Immediate Failure: Examiner intervention, jumping red lights, ignoring STOP, entering No Entry, hitting curb, or speeding.
    9. Senses: Hearing = Outer, Middle, Inner ear.

    Ensure questions are in ${input.language}. Return exactly ${input.numberOfQuestions} questions.`,
    prompt: `Generate a quiz that specifically tests the "Mastery Set" knowledge. Ensure at least one question covers "Immediate Failure" rules and one covers "Roundabout" logic.`,
  });

  if (!output) {
    throw new Error('Failed to generate quiz questions.');
  }
  return output;
}
