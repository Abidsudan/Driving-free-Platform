
'use server';
/**
 * @fileOverview A Genkit flow for generating RTA-simulated driving quiz questions.
 * Integrated with the official 112+ question bank and lane maneuvering knowledge.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateQuizQuestionsInputSchema = z.object({
  numberOfQuestions: z.number().int().min(1).max(10).default(5),
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
    input: { schema: GenerateQuizQuestionsInputSchema, data: input },
    output: { schema: GenerateQuizQuestionsOutputSchema },
    system: `You are an expert in designing RTA driving exam questions for Dubai. 
    Your generation must be strictly informed by the following official RTA concepts:
    
    1. Lane Maneuvers: Signal 3-5 seconds before. Check mirrors AND shoulder (blind spot). Overtake with acceleration. Return when seeing full front of other car in center mirror.
    2. Overtaking Prohibitions: No overtaking on solid lines, curves, hills, pedestrian crossings, or intersections.
    3. Defensive Driving: Focus on reducing risks to minimum, safety-first. Notice MORE hazards through anticipation (15-20 cars ahead).
    4. Violations: Most accidents (red lights) are driver behavior issues. Mobile usage is prohibited at ALL times, even at red lights.
    5. Fatigue: Drifting lanes means rest is needed. Driving while tired is as dangerous as driving under influence.
    6. Safety: Child seats in back. School zones require extreme caution. Report injury accidents to police immediately.
    7. Points System: 24 points limit. 2nd violation = 1-year license withdrawal. 3rd violation = 2-year license withdrawal.
    8. Mechanics: Gear L/1 is First Gear. Gear 2 is Second. 
    9. Ergonomics: Sit first then lift legs. Slight bend in legs (100-110 degrees backrest). Headrest aligned with head.
    10. Highway: Left lane for overtaking only. Shoulders are for emergency vehicles only.
    
    Create ${input.numberOfQuestions} multiple-choice questions in ${input.language}.
    Difficulty: ${input.difficulty}. Topic: ${input.topic || 'General RTA Theory'}.`,
    prompt: `Generate a professional quiz. Ensure at least one question specifically covers lane changing procedures (signaling time or blind spot check) or overtaking safety protocols.`,
  });

  if (!output) {
    throw new Error('Failed to generate quiz questions.');
  }
  return output;
}
