import { genkit } from 'genkit';
import { googleAI, gemini15Flash } from '@genkit-ai/google-genai';

/**
 * إعداد Genkit باستخدام موديل Gemini 1.5 Flash.
 * تم استخدام المرجع المباشر gemini15Flash لضمان الاستقرار وتجنب أخطاء 404.
 */
export const ai = genkit({
  plugins: [
    googleAI()
  ],
  model: gemini15Flash,
});
