'use server';
/**
 * @fileOverview توليد أسئلة اختبار RTA بناءً على الأسئلة التدريبية المعتمدة.
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

// الأسئلة المرجعية الـ 20 لضمان دقة المحاكاة
const referenceQuestions = [
    { q: "إحدى صعوبات القيادة هي:", a: "توقع ما سيفعله السائقون الآخرون.", options: ["توقع ما سيفعله السائقون الآخرون.", "أن تدع السائقين الآخرين يعرفون أنهم يقودون بشكل خطير.", "فحص زيت محرك السيارة بانتظام."] },
    { q: "تكون القيادة أكثر خطورة:", a: "اذا قمت بتعديل المذياع (الراديو) والتحدث في الهاتف أثناء القيادة.", options: ["إذا قمت بتعديل المذياع (الراديو) أثناء القيادة.", "إذا كنت تتحدث على الهاتف النقال أثناء القيادة.", "اذا قمت بتعديل المذياع (الراديو) والتحدث في الهاتف أثناء القيادة."] },
    { q: "المشاة الذين يمشون بجانب الطريق أو يعبرونها:", a: "يجب اعتبارهم خطراً من ضمن مخاطر الطريق.", options: ["يجب أن يتم تنبيههم برنة زامور قوية.", "يجب تنبيههم من رجال الرقابة بضرورة الإبتعاد من المركبات.", "يجب اعتبارهم خطراً من ضمن مخاطر الطريق."] },
    { q: "أي من التالي يجعلك سائقاً أكثر خطورة؟", a: "شرب الكحول وتناول بعض الأدوية أيضاً.", options: ["شرب الكحول.", "تناول بعض الأدوية.", "شرب الكحول وتناول بعض الأدوية أيضاً."] },
    { q: "السرعة تزيد مخاطر الاصطدام لأنها:", a: "بقدر ما تقود بسرعة تحتاج الى وقت أطول للوقوف.", options: ["تبطئ ردود فعلك.", "تزيد عدد مخاطر الطريق.", "بقدر ما تقود بسرعة تحتاج الى وقت أطول للوقوف."] },
    { q: "سوف تكون سائقاً أكثر أماناً إذا قمت بالقيادة بسرعة أقل لأن ذلك:", a: "بقدر ما تقود ببطء تستطيع الوقوف بسرعة.", options: ["سيتيح لك الوقت لمشاهدة المناظر.", "سوف تحصل على خبرة أكبر بالقيادة ببطء.", "بقدر ما تقود ببطء تستطيع الوقوف بسرعة."] },
    { q: "يعاقب على القيادة تحت تأثير الكحول بـ:", a: "24 نقطة سوداء وغرامات تحددها المحكمة.", options: ["24 نقطة سوداء وغرامة قدرها 2400 درهم.", "24 نقطة سوداء وغرامات أخرى.", "24 نقطة سوداء وغرامات تحددها المحكمة."] },
    { q: "ما هي السرعة التي يُنصح للقيادة بها على الطريق؟", a: "حسب السرعة المحددة في علامات تحديد السرعة أو تحت حدود السرعة حسب ظروف الطريق.", options: ["السرعة المبيّنة على إشارات حدود السرعة.", "اقل بعشرة كيلومترات (10 كلم) من السرعة المحددة.", "حسب السرعة المحددة في علامات تحديد السرعة أو تحت حدود السرعة حسب ظروف الطريق."] },
    { q: "قبل دخولك الى تقاطع أصبحت إشارة المرور حمراء. ماذا يجب أن تفعل؟", a: "تقف.", options: ["تخفض سرعتك وتتحقق من المركبات على يسارك قبل العبور.", "تزيد سرعتك لكي تعبر التقاطع بسرعة.", "تقف."] },
    { q: "كيف يجب أن تقود في منحنى على الطريق؟", a: "تخفض سرعتك تدريجياً.", options: ["تسرع قليلاً.", "تواصل بنفس السرعة.", "تخفض سرعتك تدريجياً."] },
    { q: "ما هي حدود السرعة في منطقة سكنية بشارع فردي لا توجد فيه إشارات حدود السرعة؟", a: "40 كم/الساعة.", options: ["40 كم/الساعة.", "50 كم/الساعة.", "60 كم/الساعة."] },
    { q: "هناك خط مفرد متقطع مرسوم في وسط الطريق. أين يجب أن تقود؟", a: "يجب أن تبقى الى يمين الخط.", options: ["يجب أن تقود على الخط.", "يجب أن تبقى قريباً من الخط قدر الإمكان.", "يجب أن تبقى الى يمين الخط."] },
    { q: "الإشارة الضوئية الحمراء تعنى:", a: "يجب عليك التوقف والانتظار.", options: ["يجب عليك التوقف إال فى حال كنت تنعطف إلى اليمين.", "توقف إذا كان القيام بذلك آمنا.", "يجب عليك التوقف والانتظار."] },
    { q: "الإشارة الضوئية الصفراء تعني أنه يجب:", a: "أن تقف شريطة أن يكون القيام بذلك بأمان.", options: ["أن تقف فورا.", "تسرع عبر التقاطع قبل أن تصبح الإشارة حمراء.", "أن تقف شريطة أن يكون القيام بذلك بأمان."] },
    { q: "أنت تقترب من إشارة قف. متى يجب أن تقف؟", a: "في جميع الأوقات حتى وإن لم يكن هناك حركة سير أخرى.", options: ["فقط عندما يكون هناك سير يتقدّم الى التقاطع.", "فقط عندما يكون هناك خطر اصطدام مع مركبة أخرى.", "في جميع الأوقات حتى وإن لم يكن هناك حركة سير أخرى."] },
    { q: "كيف يمكنك مغادرة الطريق السريع بأمان؟", a: "البقاء في المسرب الصحيح وإعطاء الإشارة وتعديل السرعة في مسرب منحدر الخروج الصحيح.", options: ["الوقوف وإعطاء أولوية الطريق للمركبات الاخرى.", "تواصل القيادة بنفس السرعة.", "البقاء في المسرب الصحيح وإعطاء الإشارة وتعديل السرعة في مسرب منحدر الخروج الصحيح."] },
    { q: "متى يجب أن تقود وأنوار مركبتك الأمامية والخلفية مضاءة؟", a: "بين غروب الشمس وشروقها، وعندما تحول حالة الطقس دون الرؤية الواضحة.", options: ["فقط في الظلام.", "فقط على الطرق السريعة.", "بين غروب الشمس وشروقها، وعندما تحول حالة الطقس دون الرؤية الواضحة."] },
    { q: "أنت تقود في حركة سير مزدحمة سدّت التقاطع وأصبحت الإشارة الضوئية خضراء. ماذا يجب عليك ان تفعل؟", a: "تقف وتنتظر الى أن يصبح التقاطع خالياً.", options: ["تتحرك الى التقاطع خلف المركبة التي أمامك.", "تتحرك الى التقاطع الى جانب المركبة التي أمامك.", "تقف وتنتظر الى أن يصبح التقاطع خالياً."] },
    { q: "بهرت عيناك أنوار مركبة قادمة. يجب أن:", a: "تخفف سرعتك وتقف الى جانب الطريق إن كان ذلك مأموناً.", options: ["تضيء أنوارك الأمامية العالية لمركبتك.", "تستمر بالقيادة.", "تخفف سرعتك وتقف الى جانب الطريق إن كان ذلك مأموناً."] },
    { q: "عندما تقود خلف شاحنة فمن الأفضل القيادة:", a: "بحيث يمكنك رؤية السائق في المرايا الجانبية للشاحنة.", options: ["بشكل قريب خلفها.", "بجانب الباب الأيسر للشاحنة.", "بحيث يمكنك رؤية السائق في المرايا الجانبية للشاحنة."] }
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
  system: `You are an expert in Dubai RTA theory tests. 
    You MUST generate unique, high-quality questions based on the reference dataset provided.
    
    REFERENCE DATA:
    {{referenceData}}
    
    GUIDELINES:
    1. Language: {{#if isArabic}}Arabic{{else}}English{{/if}}.
    2. Focus: Safety, regulations, and driver psychology.
    3. Options: 3 plausible options, one clearly correct.
    4. Explanation: Provide a scientific reason for the correct answer.
    5. Category: Classify the question (e.g., Rules, Hazard, Road Signs).`,
  prompt: `Generate exactly {{numberOfQuestions}} questions for a driving assessment.`,
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
