'use server';
/**
 * @fileOverview توليد أسئلة اختبار RTA بناءً على بنك الأسئلة الشامل (100+ سؤال).
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

// بنك الأسئلة الشامل المدمج كمرجع للذكاء الاصطناعي
const referenceQuestions = [
    { q: "إحدى صعوبات القيادة هي:", a: "توقع ما سيفعله السائقون الآخرون.", options: ["توقع ما سيفعله السائقون الآخرون.", "أن تدع السائقين الآخرين يعرفون أنهم يقودون بشكل خطير.", "فحص زيت محرك السيارة بانتظام."] },
    { q: "تكون القيادة أكثر خطورة:", a: "اذا قمت بتعديل المذياع (الراديو) والتحدث في الهاتف أثناء القيادة.", options: ["إذا قمت بتعديل المذياع (الراديو) أثناء القيادة.", "إذا كنت تتحدث على الهاتف النقال أثناء القيادة.", "اذا قمت بتعديل المذياع (الراديو) والتحدث في الهاتف أثناء القيادة."] },
    { q: "المشاة الذين يمشون بجانب الطريق أو يعبرونها:", a: "يجب اعتبارهم خطراً من ضمن مخاطر الطريق.", options: ["يجب أن يتم تنبيههم برنة زامور قوية.", "يجب تنبيههم من رجال الرقابة بضرورة الإبتعاد من المركبات.", "يجب اعتبارهم خطراً من ضمن مخاطر الطريق."] },
    { q: "أي من التالي يجعلك سائقاً أكثر خطورة؟", a: "شرب الكحول وتناول بعض الأدوية أيضاً.", options: ["شرب الكحول.", "تناول بعض الأدوية.", "شرب الكحول وتناول بعض الأدوية أيضاً."] },
    { q: "السرعة تزيد مخاطر الاصطدام لأنها:", a: "بقدر ما تقود بسرعة تحتاج الى وقت أطول للوقوف.", options: ["تبطئ ردود فعلك.", "تزيد عدد مخاطر الطريق.", "بقدر ما تقود بسرعة تحتاج الى وقت أطول للوقوف."] },
    { q: "يعاقب على القيادة تحت تأثير الكحول بـ:", a: "24 نقطة سوداء وغرامات تحددها المحكمة.", options: ["24 نقطة سوداء وغرامة قدرها 2400 درهم.", "24 نقطة سوداء وغرامات أخرى.", "24 نقطة سوداء وغرامات تحددها المحكمة."] },
    { q: "ما هي السرعة التي يُنصح للقيادة بها على الطريق؟", a: "حسب السرعة المحددة في علامات تحديد السرعة أو تحت حدود السرعة حسب ظروف الطريق.", options: ["السرعة المبيّنة على إشارات حدود السرعة.", "اقل بعشرة كيلومترات (10 كلم) من السرعة المحددة.", "حسب السرعة المحددة في علامات تحديد السرعة أو تحت حدود السرعة حسب ظروف الطريق."] },
    { q: "أنت تقترب من إشارة قف. متى يجب أن تقف؟", a: "في جميع الأوقات حتى وإن لم يكن هناك حركة سير أخرى.", options: ["فقط عندما يكون هناك سير يتقدّم الى التقاطع.", "فقط عندما يكون هناك خطر اصطدام مع مركبة أخرى.", "في جميع الأوقات حتى وإن لم يكن هناك حركة سير أخرى."] },
    { q: "دخول المربع الأصفر (الصندوق الأصفر) مسموح به فقط إذا:", a: "كان مخرجك سالكاً تماماً.", options: ["كانت الإشارة خضراء.", "كنت تنعطف لليمين.", "كان مخرجك سالكاً تماماً."] },
    { q: "مصطلح 'التفاتة الرأس' يعني:", a: "النظر فوق الكتف للتأكد من خلو البقعة العمياء.", options: ["النظر في المرآة الوسطى.", "النظر فوق الكتف للتأكد من خلو البقعة العمياء.", "تحريك الرأس لليسار واليمين."] },
    { q: "القيادة في الضباب تتطلب:", a: "زيادة مسافة الأمان واستخدام الأنوار المنخفضة.", options: ["استخدام أنوار التحذير الرباعية باستمرار.", "زيادة مسافة الأمان واستخدام الأنوار المنخفضة.", "القيادة بسرعة الطريق العادية."] },
    { q: "قاعدة الثانيتين تستخدم لـ:", a: "قياس مسافة الأمان الكافية خلف المركبة الأمامية.", options: ["توقيت تغيير الإشارة الضوئية.", "قياس مسافة الأمان الكافية خلف المركبة الأمامية.", "تحديد وقت الوقوف عند علامة قف."] },
    { q: "عندما يتم تجاوزك من مركبة أخرى يجب عليك:", a: "الحفاظ على سرعتك أو تخفيفها لتسهيل العملية.", options: ["زيادة سرعتك لمنع التجاوز.", "تشغيل الأضواء العالية.", "الحفاظ على سرعتك أو تخفيفها لتسهيل العملية."] },
    { q: "تأثير الهاتف النقال على السائق:", a: "يقلل التركيز ويزيد من احتمال الاصطدام.", options: ["يساعد على البقاء مستيقظاً.", "يقلل التركيز ويزيد من احتمال الاصطدام.", "لا يؤثر إذا كان السائق محترفاً."] },
    { q: "المكان الصحيح لمثلث التحذير عند العطل:", a: "على بعد 50 متراً تقريباً خلف المركبة.", options: ["خلف المركبة مباشرة.", "على بعد 50 متراً تقريباً خلف المركبة.", "فوق سقف المركبة."] }
];

const generateQuizPrompt = ai.definePrompt({
  name: 'generateQuizPrompt',
  model: 'googleai/gemini-1.5-flash',
  input: { 
    schema: GenerateQuizQuestionsInputSchema.extend({
      isArabic: z.boolean().optional(),
      referenceData: z.string().optional()
    }) 
  },
  output: { schema: GenerateQuizQuestionsOutputSchema },
  system: `You are an expert in Dubai RTA theory tests and academic driving instructor. 
    You MUST generate unique, high-quality questions for the "Driving Free Academe".
    
    REFERENCE KNOWLEDGE BASE:
    {{referenceData}}
    
    STRICT GUIDELINES:
    1. Language: Use professional {{#if isArabic}}Arabic (UAE terminology){{else}}English{{/if}}.
    2. Variety: Mix questions from the knowledge base with newly generated ones following the same logic.
    3. Accuracy: Ensure technical accuracy regarding RTA rules (Points, Fines, Physics, Signs).
    4. Options: Provide exactly 3 plausible options.
    5. Explanation: Provide a scientific/academic reason for the correct answer.
    6. Category: Use categories like (Safety, Rules, Hazard, Signs, Mechanics).`,
  prompt: `Generate exactly {{numberOfQuestions}} questions for a comprehensive assessment.`,
});

export async function generateQuizQuestions(input: GenerateQuizQuestionsInput): Promise<GenerateQuizQuestionsOutput> {
  try {
    const isArabic = input.language === 'ar';
    const referenceData = JSON.stringify(referenceQuestions);
    
    const { output } = await generateQuizPrompt({
      ...input,
      isArabic,
      referenceData
    });
    
    if (!output) throw new Error('Model returned empty output.');
    return output;
  } catch (error) {
    console.error('Error in generateQuizQuestions:', error);
    throw new Error('Failed to generate quiz content.');
  }
}
