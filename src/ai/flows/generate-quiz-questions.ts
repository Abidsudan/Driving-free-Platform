'use server';
/**
 * @fileOverview توليد أسئلة اختبار RTA بناءً على "مجموعة التميز" والأسئلة التدريبية المعتمدة.
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
  language: z.enum(['ar', 'en']).default('ar'),
});

const GenerateQuizQuestionsOutputSchema = z.object({
  questions: z.array(QuizQuestionSchema),
});

export type GenerateQuizQuestionsInput = z.infer<typeof GenerateQuizQuestionsInputSchema>;
export type GenerateQuizQuestionsOutput = z.infer<typeof GenerateQuizQuestionsOutputSchema>;

// مجموعة الأسئلة التدريبية المرجعية لضمان جودة المخرجات
const referenceQuestions = [
    { q: "إحدى صعوبات القيادة هي:", a: "توقع ما سيفعله السائقون الآخرون.", options: ["توقع ما سيفعله السائقون الآخرون.", "أن تدع السائقين الآخرين يعرفون أنهم يقودون بشكل خطير.", "فحص زيت محرك السيارة بانتظام."] },
    { q: "السرعة تزيد مخاطر الاصطدام لأنها:", a: "بقدر ما تقود بسرعة تحتاج الى وقت أطول للوقوف.", options: ["تبطئ ردود فعلك.", "تزيد عدد مخاطر الطريق.", "بقدر ما تقود بسرعة تحتاج الى وقت أطول للوقوف."] },
    { q: "يعاقب على القيادة تحت تأثير الكحول بـ:", a: "24 نقطة سوداء وغرامات تحددها المحكمة.", options: ["24 نقطة سوداء وغرامة قدرها 2400 درهم.", "24 نقطة سوداء وغرامات أخرى.", "24 نقطة سوداء وغرامات تحددها المحكمة."] },
    { q: "ما هي حدود السرعة في منطقة سكنية بشارع فردي لا توجد فيه إشارات حدود السرعة؟", a: "40 كم/الساعة.", options: ["40 كم/الساعة.", "50 كم/الساعة.", "60 كم/الساعة."] },
    { q: "أنت تقترب من إشارة قف. متى يجب أن تقف؟", a: "في جميع الأوقات حتى وإن لم يكن هناك حركة سير أخرى.", options: ["فقط عندما يكون هناك سير يتقدّم الى التقاطع.", "فقط عندما يكون هناك خطر اصطدام مع مركبة أخرى.", "في جميع الأوقات حتى وإن لم يكن هناك حركة سير أخرى."] }
];

const generateQuizPrompt = ai.definePrompt({
  name: 'generateQuizPrompt',
  model: 'googleai/gemini-1.5-flash',
  input: { 
    schema: GenerateQuizQuestionsInputSchema.extend({
      isArabic: z.boolean().optional()
    }) 
  },
  output: { schema: GenerateQuizQuestionsOutputSchema },
  system: `You are an expert in Dubai RTA theory tests. 
    You MUST generate unique, high-quality questions based on the following training set and RTA rules.
    
    TRAINING SAMPLE STYLE:
    - Questions must be direct and focused on safety and regulations.
    - Options should be plausible but with one clearly correct scientific answer.
    - Reference rules: STOP signs (3s stop), Speed limits (+10km/h rule), Alcohol (24 points), Residential speed (40km/h).
    
    MASTERY SET RULES:
    1. Lane: Education vehicles MUST stay in the RIGHT lane.
    2. Shoulder Check: Move only NECK, not body.
    3. Roundabout Priority: From left.
    4. Immediate Failure: Red lights, speed limit violation, examiner intervention.
    
    Output Language: {{#if isArabic}}Arabic{{else}}English{{/if}}.
    Include a scientific 'explanation' for each correct answer.`,
  prompt: `Generate a comprehensive assessment with {{numberOfQuestions}} unique questions. 
    Use the provided training samples as a guide for difficulty and tone.`,
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
