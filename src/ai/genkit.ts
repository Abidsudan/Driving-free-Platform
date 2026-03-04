import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

/**
 * إعداد Genkit الأساسي للأكاديمية.
 * يتم استخدام الإعدادات الافتراضية للبلجن لضمان أقصى درجات الاستقرار.
 */
export const ai = genkit({
  plugins: [
    googleAI()
  ],
});
