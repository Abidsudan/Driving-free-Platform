'use server';
/**
 * @fileOverview توليد أسئلة اختبار RTA بناءً على "مجموعة التميز" الـ 16.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const QuizQuestionSchema = z.object({
  questionText: z.string(),
  options: z.array(z.string()).min(2).max(4),
  correctAnswerIndex: z.number().int(),
  explanation: z.string(),
  category: z.string(),
});

const GenerateQuizQuestionsInputSchema = z.object({
  numberOfQuestions: z.number().int().min(1).max(16).default(16),
  topic: z.string().optional(),
  difficulty: z.enum(['easy', 'medium', 'hard']).default('hard'),
  language: z.enum(['ar', 'en']).default('en'),
});

const GenerateQuizQuestionsOutputSchema = z.object({
  questions: z.array(QuizQuestionSchema),
});

export type GenerateQuizQuestionsInput = z.infer<typeof GenerateQuizQuestionsInputSchema>;
export type GenerateQuizQuestionsOutput = z.infer<typeof GenerateQuizQuestionsOutputSchema>;

const generateQuizPrompt = ai.definePrompt({
  name: 'generateQuizPrompt',
  input: { 
    schema: GenerateQuizQuestionsInputSchema.extend({
      isArabic: z.boolean().optional()
    }) 
  },
  output: { schema: GenerateQuizQuestionsOutputSchema },
  system: `You are an expert in Dubai RTA theory tests. You MUST generate exactly {{numberOfQuestions}} questions strictly based on the "Mastery Set" rules provided below.
    
    MASTERY SET RULES:
    1. Lane: Education vehicles MUST stay in the RIGHT lane. Return to right automatically after U-turn.
    2. Shoulder Check: Move only NECK, not body.
    3. Vision: Focus on target lane CENTER during maneuver.
    4. Roundabout Priority: From left.
    5. Roundabout Signal: Right signal after passing the exit before yours.
    6. STOP Sign: Full 3-second stop.
    7. Immediate Failure: Examiner intervention, red lights, speed limit violation.
    
    Ensure questions are in {{#if isArabic}}Arabic{{else}}English{{/if}}. Include scientific explanations.`,
  prompt: `Generate a comprehensive assessment covering the RTA Mastery Set with {{numberOfQuestions}} unique questions.`,
});

export async function generateQuizQuestions(input: GenerateQuizQuestionsInput): Promise<GenerateQuizQuestionsOutput> {
  const isArabic = input.language === 'ar';
  const { output } = await generateQuizPrompt({
    ...input,
    isArabic
  });
  
  if (!output) throw new Error('Failed to generate quiz content.');
  return output;
}
