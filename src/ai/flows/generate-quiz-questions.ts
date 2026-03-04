'use server';
/**
 * @fileOverview A Genkit flow for generating RTA-simulated driving quiz questions.
 * Focused on the "Mastery Set" (16 mandatory questions) for the academy.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateQuizQuestionsInputSchema = z.object({
  numberOfQuestions: z.number().int().min(1).max(16).default(16),
  topic: z.string().optional(),
  difficulty: z.enum(['easy', 'medium', 'hard']).default('hard'),
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
    output: { schema: GenerateQuizQuestionsOutputSchema },
    system: `You are an expert in Dubai RTA theory tests. You MUST generate exactly ${input.numberOfQuestions} questions strictly based on the "Mastery Set" rules provided below.
    
    MASTERY SET RULES (MANDATORY):
    1. Lane: Education vehicles MUST stay in the RIGHT lane. Return to right automatically after U-turn.
    2. Shoulder Check: Move only NECK, not body, to prevent steering deviation.
    3. Vision: Focus on target lane CENTER during maneuver, not the mirrors.
    4. Roundabout Priority: Vehicles inside (from left) have priority.
    5. Roundabout Signal: Signal RIGHT after passing the exit BEFORE yours.
    6. Roundabout Positioning: Left/U-turn from the LEFT lane only.
    7. STOP Sign: Full 3-second stop (zero speed) is mandatory.
    8. Red Triangle: Means "Warning".
    9. Immediate Failure: Examiner intervention (physical), jumping red lights, ignoring STOP, entering No Entry, hitting curb strongly, or speeding.
    10. Senses: Hearing = Outer, Middle, Inner ear.
    11. Automatic Safety: Handbrake first, then 'P' to protect gearbox.
    12. Seating: 100-110 degree back angle, slight knee bend.

    Ensure questions are in ${input.language === 'ar' ? 'Arabic' : 'English'}. Include scientific explanations for each answer.`,
    prompt: `Generate a comprehensive assessment covering the RTA Mastery Set with exactly ${input.numberOfQuestions} unique questions.`,
  });

  if (!output) {
    throw new Error('Failed to generate quiz questions.');
  }
  return output;
}
