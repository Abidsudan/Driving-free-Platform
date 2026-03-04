
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

/**
 * إعداد Genkit باستخدام موديل Gemini 1.5 Flash.
 */
export const ai = genkit({
  plugins: [
    googleAI()
  ],
  model: 'googleai/gemini-1.5-flash',
});
