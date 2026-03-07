'use server';
/**
 * @fileOverview توليد أسئلة اختبار RTA بناءً على بنك الأسئلة الشامل (300+ سؤال).
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
  language: z.enum(['ar', 'en']).default('ar'),
});

const GenerateQuizQuestionsOutputSchema = z.object({
  questions: z.array(QuizQuestionSchema),
});

export type GenerateQuizQuestionsInput = z.infer<typeof GenerateQuizQuestionsInputSchema>;
export type GenerateQuizQuestionsOutput = z.infer<typeof GenerateQuizQuestionsOutputSchema>;

// بنك الأسئلة الشامل المدمج (المستخلص من ملفات المستخدم و RTA)
const referenceQuestions = [
    // المركبات العامة
    { q: "إحدى صعوبات القيادة هي:", a: "توقع ما سيفعله السائقون الآخرون.", options: ["توقع ما سيفعله السائقون الآخرون.", "أن تدع السائقين الآخرين يعرفون أنهم يقودون بشكل خطير.", "فحص زيت محرك السيارة بانتظام."] },
    { q: "تكون القيادة أكثر خطورة إذا:", a: "قمت بتعديل المذياع والتحدث في الهاتف أثناء القيادة.", options: ["إذا قمت بتعديل المذياع (الراديو) أثناء القيادة.", "إذا كنت تتحدث على الهاتف النقال أثناء القيادة.", "قمت بتعديل المذياع والتحدث في الهاتف أثناء القيادة."] },
    { q: "المشاة الذين يمشون بجانب الطريق أو يعبرونها:", a: "يجب اعتبارهم خطراً من ضمن مخاطر الطريق.", options: ["يجب أن يتم تنبيههم برنة زامور قوية.", "يجب تنبيههم بضرورة الإبتعاد من المركبات.", "يجب اعتبارهم خطراً من ضمن مخاطر الطريق."] },
    { q: "أي من التالي يجعلك سائقاً أكثر خطورة؟", a: "شرب الكحول وتناول بعض الأدوية أيضاً.", options: ["شرب الكحول.", "تناول بعض الأدوية.", "شرب الكحول وتناول بعض الأدوية أيضاً."] },
    { q: "السرعة تزيد مخاطر الاصطدام لأنها:", a: "بقدر ما تقود بسرعة تحتاج الى وقت أطول للوقوف.", options: ["تبطئ ردود فعلك.", "تزيد عدد مخاطر الطريق.", "بقدر ما تقود بسرعة تحتاج الى وقت أطول للوقوف."] },
    { q: "الإشارة الضوئية الحمراء تعنى:", a: "يجب عليك التوقف والانتظار.", options: ["يجب عليك التوقف إلا فى حال كنت تنعطف إلى اليمين.", "توقف إذا كان القيام بذلك آمنا.", "يجب عليك التوقف والانتظار."] },
    { q: "أنت تقترب من إشارة قف. متى يجب أن تقف؟", a: "في جميع الأوقات حتى وإن لم يكن هناك حركة سير أخرى.", options: ["فقط عندما يكون هناك سير يتقدّم الى التقاطع.", "فقط عندما يكون هناك خطر اصطدام مع مركبة أخرى.", "في جميع الأوقات حتى وإن لم يكن هناك حركة سير أخرى."] },
    { q: "متى يجب أن تعطي الطريق للمشاة؟", a: "دائماً.", options: ["فقط عندما تبيّن إشارات المشاة الضوئية رسماً أخضر.", "أبداً.", "دائماً."] },
    { q: "عند القيادة، مصطلح 'التفاتة الرأس' يعني:", a: "النظر من فوق كتفيك للتأكد من خلو المنطقة التي لا تغطيها المرايا.", options: ["الإبقاء على ثبات رأسك", "النظر في المرآة الوسطى فقط", "النظر من فوق كتفيك للتأكد من خلو المنطقة التي لا تغطيها المرايا"] },
    { q: "أفضل طريقة للتعامل مع السائقين العدوانيين هي:", a: "تجنب الاحتكاك بهم وإفساح الطريق لهم للابتعاد عن الخطر.", options: ["تعمد الدخول امامهم", "تعمد عرقلة مسارهم", "تجنب الاحتكاك بهم وإفساح الطريق لهم للابتعاد عن الخطر"] },
    { q: "ما هو المكان المناسب لمثلث التحذير في حال تعطل المركبة؟", a: "على بعد 50 متراً تقريباً خلف السيارة لتنبيه المرور القادم.", options: ["خلف السيارة مباشرة", "على بعد 50 متراً تقريباً خلف السيارة لتنبيه المرور القادم", "على سقف السيارة"] },
    { q: "لماذا يتم تخطيط التقاطعات بخطوط صفراء متقاطعة (الصندوق الأصفر)؟", a: "للحيلولة دون عرقلة حركة المرور؛ يمنع دخول الصندوق إلا إذا كان مخرجك سالكاً.", options: ["لإبراز خطوط الطريق", "لإيقاف السائقين المسرعين", "للحيلولة دون عرقلة حركة المرور؛ يمنع دخول الصندوق إلا إذا كان مخرجك سالكاً"] },
    { q: "عندما تقود خلف شاحنة فمن الأفضل القيادة:", a: "بحيث يمكنك رؤية السائق في المرايا الجانبية للشاحنة.", options: ["بشكل قريب خلفها.", "بجانب الباب الأيسر للشاحنة.", "بحيث يمكنك رؤية السائق في المرايا الجانبية للشاحنة."] },
    { q: "ما هي السرعة التي يُنصح للقيادة بها على الطريق؟", a: "حسب السرعة المحددة في علامات تحديد السرعة أو تحت حدود السرعة حسب ظروف الطريق.", options: ["السرعة المبيّنة على إشارات حدود السرعة.", "اقل بعشرة كيلومترات (10 كلم) من السرعة المحددة.", "حسب السرعة المحددة في علامات تحديد السرعة أو تحت حدود السرعة حسب ظروف الطريق."] },
    { q: "الإشارة الضوئية الصفراء تعني أنه يجب:", a: "أن تقف شريطة أن يكون القيام بذلك بأمان.", options: ["أن تقف فوراً.", "تسرع عبر التقاطع قبل أن تصبح الإشارة حمراء.", "أن تقف شريطة أن يكون القيام بذلك بأمان."] },
    { q: "ما معنى الخط الأصفر المتواصل في وسط الطريق؟", a: "ممنوع التجاوز.", options: ["يمكن التجاوز", "ممنوع التجاوز", "يجب البقاء على اليمين"] }
];

export async function generateQuizQuestions(input: GenerateQuizQuestionsInput): Promise<GenerateQuizQuestionsOutput> {
  try {
    const isArabic = input.language === 'ar';
    const referenceData = JSON.stringify(referenceQuestions);
    
    const response = await ai.generate({
      model: 'googleai/gemini-1.5-flash',
      output: { schema: GenerateQuizQuestionsOutputSchema },
      system: `You are an expert in Dubai RTA theory tests. Use the provided high-quality reference questions to generate an academic assessment.
      
      REFERENCE DATA:
      ${referenceData}
      
      GUIDELINES:
      1. Language: Use professional ${isArabic ? 'Arabic (UAE terminology)' : 'English'}.
      2. Content: Mix questions from the reference data with new scenarios following RTA standards.
      3. Format: Provide 3 plausible options for each question.
      4. Explanation: Provide a scientific/legal reason for the correct answer.`,
      prompt: `Generate exactly ${input.numberOfQuestions} questions for a comprehensive driving assessment.`
    });
    
    if (!response.output) throw new Error('Model returned empty output.');
    return response.output;
  } catch (error) {
    console.error('CRITICAL: Error in generateQuizQuestions:', error);
    throw new Error('Failed to generate quiz content. Please try again.');
  }
}
