
'use server';
/**
 * @fileOverview A Genkit flow for generating RTA-simulated driving quiz questions.
 * Updated with the "Mastery Set" (16 mandatory questions) provided by the instructor.
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
    
    CORE KNOWLEDGE BANK (Mastery Set):
    1. Lane Commitment: Education vehicles must ALWAYS stay in the RIGHT lane.
    2. Post U-Turn/Left Exit: If you end up in the left lane, move back to the RIGHT lane immediately without instructions.
    3. Shoulder Check Error: Avoid moving your entire body; move only your neck to prevent steering deviation.
    4. Vision during Lane Change: Focus on the center of the target lane, NOT the mirror, during the maneuver.
    5. Roundabout Priority: Priority is ALWAYS for vehicles inside (from the left).
    6. Roundabout Exit Signal: Signal RIGHT after passing the exit before your intended exit.
    7. Roundabout U-Turn/Left: Take the LEFT lane before entry and stay in it until exit.
    8. STOP Sign: Absolute full stop (zero speed) even if the road is empty.
    9. Red Triangle Sign: Warning signs (danger ahead).
    10. Solid vs Broken Lines: Solid = No crossing/overtaking. Broken = Crossing allowed after checking.
    11. Immediate Failure (Intervention): Physical intervention by examiner (touching wheel/brake) = Instant fail.
    12. Immediate Failure (Violations): Jumping red lights or ignoring STOP signs = Instant fail.
    13. Immediate Failure (No Entry): Entering a "No Entry" street = Instant fail.
    14. Immediate Failure (Curb): Strong hitting of the curb = Instant fail.
    15. Immediate Failure (Speed): Exceeding the speed limit = Instant fail.
    16. Human Senses: Hearing system consists of Outer, Middle, and Inner ear.

    Ensure questions are in ${input.language}. Return exactly ${input.numberOfQuestions} questions.`,
    prompt: `Generate a quiz that specifically tests the "Mastery Set" knowledge. Ensure at least one question covers "Immediate Failure" rules and one covers "Roundabout" logic.`,
  });

  if (!output) {
    throw new Error('Failed to generate quiz questions.');
  }
  return output;
}
