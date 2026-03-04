import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

/**
 * إعداد Genkit الأساسي للأكاديمية.
 * نستخدم الموديل المستقر gemini-1.5-flash لضمان أعلى سرعة وأقل تكلفة.
 */
export const ai = genkit({
  plugins: [
    googleAI()
  ],
  model: 'googleai/gemini-1.5-flash',
});
