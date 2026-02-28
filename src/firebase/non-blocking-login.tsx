
'use client';
import {
  Auth,
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { getRecaptchaToken } from '@/lib/recaptcha';

/** Initiate anonymous sign-in (non-blocking) with reCAPTCHA protection. */
export function initiateAnonymousSignIn(authInstance: Auth): void {
  // CRITICAL: Call grecaptcha.enterprise.execute before the sensitive action.
  getRecaptchaToken('LOGIN').then((token) => {
    // In a full production app, you would verify the token on your backend.
    // For client-side Firebase Auth, we proceed after reCAPTCHA check.
    signInAnonymously(authInstance);
  });
}

/** Initiate email/password sign-up (non-blocking) with reCAPTCHA protection. */
export function initiateEmailSignUp(authInstance: Auth, email: string, password: string): void {
  getRecaptchaToken('SIGNUP').then((token) => {
    createUserWithEmailAndPassword(authInstance, email, password);
  });
}

/** Initiate email/password sign-in (non-blocking) with reCAPTCHA protection. */
export function initiateEmailSignIn(authInstance: Auth, email: string, password: string): void {
  getRecaptchaToken('LOGIN').then((token) => {
    signInWithEmailAndPassword(authInstance, email, password);
  });
}
