
'use client';

/**
 * Utility to execute reCAPTCHA Enterprise and get a protection token.
 * If reCAPTCHA fails or is invalid, it returns null but doesn't block.
 */
export async function getRecaptchaToken(action: string): Promise<string | null> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(null);
      return;
    }

    const grecaptcha = (window as any).grecaptcha;
    
    // Safety check: if grecaptcha is not loaded, we don't want to hang forever
    const timeout = setTimeout(() => {
      console.warn('reCAPTCHA timeout - proceeding without token');
      resolve(null);
    }, 3000);

    if (grecaptcha?.enterprise) {
      grecaptcha.enterprise.ready(async () => {
        try {
          const token = await grecaptcha.enterprise.execute(
            '6LentHosAAAAAPU47L-1tuSMFhiUQTlPguCQ15aS',
            { action }
          );
          clearTimeout(timeout);
          resolve(token);
        } catch (error) {
          console.error('reCAPTCHA execution failed:', error);
          clearTimeout(timeout);
          resolve(null);
        }
      });
    } else {
      // Re-check after a short delay if not yet loaded
      setTimeout(() => {
        const retryGrecaptcha = (window as any).grecaptcha;
        if (retryGrecaptcha?.enterprise) {
          retryGrecaptcha.enterprise.ready(async () => {
            try {
              const token = await retryGrecaptcha.enterprise.execute(
                '6LentHosAAAAAPU47L-1tuSMFhiUQTlPguCQ15aS',
                { action }
              );
              clearTimeout(timeout);
              resolve(token);
            } catch (e) {
              clearTimeout(timeout);
              resolve(null);
            }
          });
        } else {
          clearTimeout(timeout);
          resolve(null);
        }
      }, 500);
    }
  });
}
