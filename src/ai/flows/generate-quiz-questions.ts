'use server';
/**
 * @fileOverview A Genkit flow for generating RTA-simulated driving quiz questions.
 * Integrated with the official 112+ question bank knowledge.
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
    Your generation must be strictly informed by the following official RTA question bank concepts:
    
    1. Defensive Driving: Low-risk driving, focus on reducing risks to minimum, safety-first decisions.
    2. Hazards: Experienced drivers notice MORE hazards. New drivers fail due to following too closely or lack of experience.
    3. Violations: Most (like red lights) are due to bad driver behavior, not skill.
    4. Mobile Phones: Strictly prohibited even at red lights. Causes unnecessary speed changes.
    5. Learning: Takes several years to be a truly good driver.
    6. Fatigue: Drifting lanes means it's time to rest. Driving while tired causes loss of control and collisions.
    7. Road Markings: Double solid lines = No overtaking. Broken white lines = Lane change allowed.
    8. Safety: Child seats in back (avoids front airbags). School zones require extra caution for children.
    9. Procedures: Lights on from sunset to sunrise. Cover pickup loads. Report injury accidents to police immediately.
    10. Points System: 24 points limit. 2nd violation = 1-year license withdrawal. 3rd violation = 2-year license withdrawal.
    11. Mechanics: Gear L or 1 is First Gear. Gear 2 is Second Gear. 
    12. Ergonomics: Sit first then lift legs. Slight bend in legs is correct. Headrest aligned with head.
    13. Highway: Left lane for overtaking only. Cruise control reduces fuel consumption. Shoulders are for emergency vehicles only.
    
    Create ${input.numberOfQuestions} multiple-choice questions in ${input.language}.
    Difficulty: ${input.difficulty}. Topic: ${input.topic || 'General RTA Theory'}.`,
    prompt: `Generate a professional quiz. Ensure at least one question specifically covers the UAE points system or technical vehicle mechanics (gears/sitting position).`,
  });

  if (!output) {
    throw new Error('Failed to generate quiz questions.');
  }
  return output;
}
