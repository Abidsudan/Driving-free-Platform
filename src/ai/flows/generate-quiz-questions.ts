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
});

export type GenerateQuizQuestionsInput = z.infer<typeof GenerateQuizQuestionsInputSchema>;

const QuizQuestionSchema = z.object({
  questionText: z.string().describe('The question text in Arabic.'),
  options: z.array(z.string()).min(2).max(4).describe('An array of possible answer options in Arabic.'),
  correctAnswerIndex: z.number().int().describe('The zero-based index of the correct answer in the options array.'),
  explanation: z.string().describe('A detailed explanation in Arabic of why the chosen answer is correct.'),
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
  prompt: `أنت خبير في تصميم أسئلة امتحانات القيادة لهيئة الطرق والمواصلات (RTA) في دبي. مهمتك هي إنشاء ${'{{{numberOfQuestions}}}'} سؤالاً متعدد الخيارات باللغة العربية.

الأسئلة يجب أن تحاكي اختبار RTA النظري، مع التركيز على سيناريوهات القيادة وفهم القواعد واللوائح. يجب أن تستند الأسئلة إلى دليل القيادة الخاص بهيئة الطرق والمواصلات وقواعد نظام DSSSM، بالإضافة إلى أسباب الرسوب الفوري في الاختبارات العملية والأسئلة النظرية الشائعة.

الموضوع: ${'{{{topic}}}'}
مستوى الصعوبة: ${'{{{difficulty}}}'}

لكل سؤال، قم بتوفير:
- نص السؤال (بالعربية).
- قائمة بالخيارات الممكنة (2-4 خيارات، بالعربية).
- فهرس الإجابة الصحيحة (فهرس صفري).
- شرح مفصل للإجابة الصحيحة (بالعربية).
- فئة السؤال (مثل "سيناريو قيادة"، "فهم القواعد"، "إشارات المرور").

تأكد من أن الأسئلة متنوعة وذات صلة بسياق القيادة في دبي.
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
