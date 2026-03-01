'use server';
/**
 * @fileOverview A Genkit flow for generating RTA-simulated driving quiz questions.
 *
 * - generateQuizQuestions - A function that handles the generation of quiz questions.
 * - GenerateQuizQuestionsInput - The input type for the generateQuizQuestions function.
 * - GenerateQuizQuestionsOutput - The return type for the generateQuizQuestions function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateQuizQuestionsInputSchema = z.object({
  numberOfQuestions: z
    .number()
    .int()
    .min(1)
    .max(10)
    .default(5)
    .describe('The number of quiz questions to generate (between 1 and 10).'),
  topic: z
    .string()
    .optional()
    .describe('An optional topic or category for the questions (e.g., "parking rules", "road signs").'),
  difficulty: z
    .enum(['easy', 'medium', 'hard'])
    .default('medium')
    .describe('The difficulty level of the generated questions.'),
  language: z
    .enum(['ar', 'en'])
    .default('ar')
    .describe('The language of the generated questions.'),
});

export type GenerateQuizQuestionsInput = z.infer<typeof GenerateQuizQuestionsInputSchema>;

const QuizQuestionSchema = z.object({
  questionText: z.string().describe('The question text in the requested language.'),
  options: z.array(z.string()).min(2).max(4).describe('An array of possible answer options.'),
  correctAnswerIndex: z.number().int().describe('The zero-based index of the correct answer in the options array.'),
  explanation: z.string().describe('A detailed explanation of why the chosen answer is correct.'),
  category: z
    .string()
    .describe('The category of the question (e.g., "Driving Scenario", "Rule Comprehension", "Road Sign").'),
});

const GenerateQuizQuestionsOutputSchema = z.object({
  questions: z.array(QuizQuestionSchema).describe('An array of generated quiz questions.'),
});

export type GenerateQuizQuestionsOutput = z.infer<typeof GenerateQuizQuestionsOutputSchema>;

export async function generateQuizQuestions(
  input: GenerateQuizQuestionsInput
): Promise<GenerateQuizQuestionsOutput> {
  return generateQuizQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuizQuestionsPrompt',
  input: { schema: GenerateQuizQuestionsInputSchema },
  output: { schema: GenerateQuizQuestionsOutputSchema },
  config: { model: 'googleai/gemini-1.5-flash' },
  prompt: `You are an expert in designing RTA driving exam questions for Dubai. 
Your task is to create {{{numberOfQuestions}}} multiple-choice questions in the language: {{{language}}}.

The questions must simulate the official RTA theory test, focusing on driving scenarios, rules, and regulations. Use RTA handbooks, DSSSM rules, and common failure reasons.

Topic: {{{topic}}}
Difficulty: {{{difficulty}}}

For each question, provide:
- Question text.
- List of possible options (2-4).
- Correct answer index (zero-based).
- Detailed explanation.
- Category (e.g., "Driving Scenario", "Rule Comprehension", "Road Sign").

Ensure the questions are diverse and relevant to the Dubai context.
`,
});

const generateQuizQuestionsFlow = ai.defineFlow(
  {
    name: 'generateQuizQuestionsFlow',
    inputSchema: GenerateQuizQuestionsInputSchema,
    outputSchema: GenerateQuizQuestionsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate quiz questions.');
    }
    return output;
  }
);
