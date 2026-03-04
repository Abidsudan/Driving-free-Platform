import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

/**
 * إعداد Genkit الأساسي للأكاديمية.
 * يتم استخدام المعرف النصي الموحد لضمان التوافق التام مع API ومنع أخطاء الاستيراد.
 */
export const ai = genkit({
  plugins: [
    googleAI()
  ],
  model: 'googleai/gemini-1.5-flash',
});
