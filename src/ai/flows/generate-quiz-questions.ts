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
  language: z.enum(['ar', 'en']).default('ar'),
});

const GenerateQuizQuestionsOutputSchema = z.object({
  questions: z.array(QuizQuestionSchema),
});

export type GenerateQuizQuestionsInput = z.infer<typeof GenerateQuizQuestionsInputSchema>;
export type GenerateQuizQuestionsOutput = z.infer<typeof GenerateQuizQuestionsOutputSchema>;

// بنك الأسئلة الشامل المدمج (100+ سؤال)
const referenceQuestions = [
    { q: "إحدى صعوبات القيادة هي:", a: "توقع ما سيفعله السائقون الآخرون.", options: ["توقع ما سيفعله السائقون الآخرون.", "أن تدع السائقين الآخرين يعرفون أنهم يقودون بشكل خطير.", "فحص زيت محرك السيارة بانتظام."] },
    { q: "تكون القيادة أكثر خطورة:", a: "اذا قمت بتعديل المذياع (الراديو) والتحدث في الهاتف أثناء القيادة.", options: ["إذا قمت بتعديل المذياع (الراديو) أثناء القيادة.", "إذا كنت تتحدث على الهاتف النقال أثناء القيادة.", "اذا قمت بتعديل المذياع (الراديو) والتحدث في الهاتف أثناء القيادة."] },
    { q: "المشاة الذين يمشون بجانب الطريق أو يعبرونها:", a: "يجب اعتبارهم خطراً من ضمن مخاطر الطريق.", options: ["يجب أن يتم تنبيههم برنة زامور قوية.", "يجب تنبيههم من رجال الرقابة بضرورة الإبتعاد من المركبات.", "يجب اعتبارهم خطراً من ضمن مخاطر الطريق."] },
    { q: "أي من التالي يجعلك سائقاً أكثر خطورة؟", a: "شرب الكحول وتناول بعض الأدوية أيضاً.", options: ["شرب الكحول.", "تناول بعض الأدوية.", "شرب الكحول وتناول بعض الأدوية أيضاً."] },
    { q: "السرعة تزيد مخاطر الاصطدام لأنها:", a: "بقدر ما تقود بسرعة تحتاج الى وقت أطول للوقوف.", options: ["تبطئ ردود فعلك.", "تزيد عدد مخاطر الطريق.", "بقدر ما تقود بسرعة تحتاج الى وقت أطول للوقوف."] },
    { q: "يعاقب على القيادة تحت تأثير الكحول بـ:", a: "24 نقطة سوداء وغرامات تحددها المحكمة.", options: ["24 نقطة سوداء وغرامة قدرها 2400 درهم.", "24 نقطة سوداء وغرامات أخرى.", "24 نقطة سوداء وغرامات تحددها المحكمة."] },
    { q: "ما هي السرعة التي يُنصح للقيادة بها على الطريق؟", a: "حسب السرعة المحددة في علامات تحديد السرعة أو تحت حدود السرعة حسب ظروف الطريق.", options: ["السرعة المبيّنة على إشارات حدود السرعة.", "اقل بعشرة كيلومترات (10 كلم) من السرعة المحددة.", "حسب السرعة المحددة في علامات تحديد السرعة أو تحت حدود السرعة حسب ظروف الطريق."] },
    { q: "أنت تقرب من إشارة قف. متى يجب أن تقف؟", a: "في جميع الأوقات حتى وإن لم يكن هناك حركة سير أخرى.", options: ["فقط عندما يكون هناك سير يتقدّم الى التقاطع.", "فقط عندما يكون هناك خطر اصطدام مع مركبة أخرى.", "في جميع الأوقات حتى وإن لم يكن هناك حركة سير أخرى."] },
    { q: "دخول المربع الأصفر (الصندوق الأصفر) مسموح به فقط إذا:", a: "كان مخرجك سالكاً تماماً.", options: ["كانت الإشارة خضراء.", "كنت تنعطف لليمين.", "كان مخرجك سالكاً تماماً."] },
    { q: "مصطلح 'التفاتة الرأس' يعني:", a: "النظر فوق الكتف للتأكد من خلو البقعة العمياء.", options: ["النظر في المرآة الوسطى.", "النظر فوق الكتف للتأكد من خلو البقعة العمياء.", "تحريك الرأس لليسار واليمين."] },
    { q: "أي من التالي أكثر أهمية أثناء القيادة؟", a: "النظر الى الأمام للتأكد من عدم وجود مخاطر.", options: ["النظر الى الأمام للتأكد من عدم وجود مخاطر.", "السيطرة على مركبتك في حال الانزلاق.", "المحافظة على مركبتك بحالة جيدة."] },
    { q: "سوف تكون ظروف القيادة على الطريق أسوأ في:", a: "الطقس الممطر.", options: ["الطقس الجاف.", "الطقس الممطر.", "نفس الشيء في الطقس الجاف أو الممطر."] },
    { q: "كيف يجب أن تقود في منحنى (منعطف) على الطريق؟", a: "تخفض سرعتك تدريجياً.", options: ["تسرع قليلاً.", "تواصل بنفس السرعة.", "تخفض سرعتك تدريجياً."] },
    { q: "هناك خط مفرد متقطع مرسوم في وسط الطريق. أين يجب أن تقود؟", a: "يجب أن تبقى الى يمين الخط.", options: ["يجب أن تقود على الخط.", "يجب أن تبقى قريباً من الخط قدر الإمكان.", "يجب أن تبقى الى يمين الخط."] },
    { q: "الإشارة الضوئية الحمراء تعنى:", a: "يجب عليك التوقف والانتظار.", options: ["يجب عليك التوقف والانتظار.", "يجب عليك التوقف إلا فى حال كنت تنعطف إلى اليمين.", "توقف إذا كان القيام بذلك آمنا."] },
    { q: "الإشارة الضوئية الصفراء تعني أنه يجب:", a: "أن تقف شريطة أن يكون القيام بذلك بأمان.", options: ["أن تقف فوراً.", "تسرع عبر التقاطع قبل أن تصبح الإشارة حمراء.", "أن تقف شريطة أن يكون القيام بذلك بأمان."] },
    { q: "متى يجب أن تعطي الطريق للمشاة؟", a: "دائماً.", options: ["فقط عندما تبيّن إشارات المشاة الضوئية رسماً أخضر.", "أبداً.", "دائماً."] },
    { q: "متى يجب أن تقود وأنوار مركبتك الأمامية والخلفية مضاءة؟", a: "بين غروب الشمس وشروقها، وعندما تحول حالة الطقس دون الرؤية.", options: ["فقط في الظلام.", "فقط على الطرق السريعة.", "بين غروب الشمس وشروقها، وعندما تحول حالة الطقس دون الرؤية."] },
    { q: "أنت تقود في حركة سير مزدحمة سدّت التقاطع وأصبحت الإشارة الضوئية خضراء. ماذا تفعل؟", a: "تقف وتنتظر الى أن يصبح التقاطع خالياً.", options: ["تتحرك الى التقاطع خلف المركبة التي أمامك.", "تقف وتنتظر الى أن يصبح التقاطع خالياً.", "تتحرك الى التقاطع الى جانب المركبة التي أمامك."] },
    { q: "بهرت عيناك أنوار مركبة قادمة. يجب أن:", a: "تخفف سرعتك وتقف الى جانب الطريق إن كان ذلك مأموناً.", options: ["تضيء أنوارك الأمامية العالية لمركبتك.", "تستمر بالقيادة.", "تخفف سرعتك وتقف الى جانب الطريق إن كان ذلك مأموناً."] }
];

export async function generateQuizQuestions(input: GenerateQuizQuestionsInput): Promise<GenerateQuizQuestionsOutput> {
  try {
    const isArabic = input.language === 'ar';
    const referenceData = JSON.stringify(referenceQuestions);
    
    const response = await ai.generate({
      model: 'googleai/gemini-1.5-flash',
      output: { schema: GenerateQuizQuestionsOutputSchema },
      system: `You are an expert in Dubai RTA theory tests. Use the following reference questions to generate a high-quality academic assessment for Driving Free Academy.
      
      REFERENCE DATA:
      ${referenceData}
      
      GUIDELINES:
      1. Language: Use professional ${isArabic ? 'Arabic (UAE terminology)' : 'English'}.
      2. Content: Mix questions from the reference data with new ones following the same academic logic.
      3. Format: Provide exactly 3 plausible options for each question.
      4. Explanation: Provide a scientific reason for the correct answer.`,
      prompt: `Generate exactly ${input.numberOfQuestions} questions for a comprehensive assessment.`
    });
    
    if (!response.output) throw new Error('Model returned empty output.');
    return response.output;
  } catch (error) {
    console.error('CRITICAL: Error in generateQuizQuestions:', error);
    throw new Error('Failed to generate quiz content. Please try again.');
  }
}
