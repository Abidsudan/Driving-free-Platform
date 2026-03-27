'use server';
/**
 * @fileOverview A Genkit flow for generating RTA-simulated driving quiz questions.
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
    output: { schema: GenerateQuizQuestionsOutputSchema },
    system: `You are an expert in designing RTA driving exam questions for Dubai. 
    Create ${input.numberOfQuestions} multiple-choice questions in ${input.language}.
    Focus on Dubai context, DSSSM rules, and RTA handbook details.`,
    prompt: `Topic: ${input.topic || 'General RTA Theory'}, Difficulty: ${input.difficulty}`,
  });

  if (!output) {
    throw new Error('Failed to generate quiz questions.');
  }
  return output;
}
