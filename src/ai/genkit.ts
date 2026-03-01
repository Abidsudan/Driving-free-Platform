
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

/**
 * إعداد Genkit باستخدام موديل Gemini 1.5 Flash.
 * يتطلب وجود مفتاح GOOGLE_GENAI_API_KEY في ملف .env
 */
export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GOOGLE_GENAI_API_KEY,
    })
  ],
  model: 'googleai/gemini-1.5-flash',
});
