import { genkit } from 'genkit';
import { googleAI, gemini15Flash } from '@genkit-ai/google-genai';

/**
 * إعداد Genkit الأساسي للأكاديمية.
 * يتم ضبط Gemini 1.5 Flash كموديل افتراضي لضمان السرعة والاستقرار.
 */
export const ai = genkit({
  plugins: [
    googleAI()
  ],
  model: gemini15Flash,
});
