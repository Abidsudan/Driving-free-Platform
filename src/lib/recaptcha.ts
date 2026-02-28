
'use client';

/**
 * Utility to execute reCAPTCHA Enterprise and get a protection token.
 * @param action The action name to protect (e.g., 'LOGIN', 'SUBMIT_QUIZ').
 * @returns A promise that resolves with the reCAPTCHA token or null if it fails.
 */
export async function getRecaptchaToken(action: string): Promise<string | null> {
  return new Promise((resolve) => {
    const grecaptcha = (window as any).grecaptcha;
    
    if (typeof window !== 'undefined' && grecaptcha?.enterprise) {
      grecaptcha.enterprise.ready(async () => {
        try {
          const token = await grecaptcha.enterprise.execute(
            '6LentHosAAAAAPU47L-1tuSMFhiUQTlPguCQ15aS',
            { action }
          );
          resolve(token);
        } catch (error) {
          console.error('reCAPTCHA execution failed:', error);
          resolve(null);
        }
      });
    } else {
      console.warn('reCAPTCHA is not loaded yet or unavailable.');
      resolve(null);
    }
  });
}
