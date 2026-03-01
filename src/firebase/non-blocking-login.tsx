'use client';
import {
  Auth,
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { getRecaptchaToken } from '@/lib/recaptcha';

/** Initiate anonymous sign-in (non-blocking) with reCAPTCHA protection. */
export function initiateAnonymousSignIn(authInstance: Auth): void {
  getRecaptchaToken('LOGIN').then((token) => {
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

/** Initiate Google sign-in (non-blocking). */
export function initiateGoogleSignIn(authInstance: Auth): void {
  const provider = new GoogleAuthProvider();
  getRecaptchaToken('LOGIN').then((token) => {
    signInWithPopup(authInstance, provider);
  });
}
