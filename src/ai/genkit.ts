import { genkit } from 'genkit';
import { googleAI, gemini15Flash } from '@genkit-ai/google-genai';

/**
 * إعداد Genkit الأساسي للأكاديمية.
 * يتم ضبط Gemini 1.5 Flash كموديل افتراضي عبر المرجع المباشر لضمان الاستقرار ومنع أخطاء الـ 404.
 */
export const ai = genkit({
  plugins: [
    googleAI()
  ],
  model: gemini15Flash,
});
