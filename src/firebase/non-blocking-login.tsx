'use client';
import {
  Auth,
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { getRecaptchaToken } from '@/lib/recaptcha';
import { toast } from '@/hooks/use-toast';

/** Helper to handle common Auth errors */
function handleAuthError(error: any) {
  if (error instanceof FirebaseError) {
    if (error.code === 'auth/unauthorized-domain') {
      toast({
        variant: "destructive",
        title: "نطاق غير مصرح به",
        description: "يجب إضافة هذا النطاق إلى 'Authorized domains' في لوحة تحكم Firebase.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "خطأ في تسجيل الدخول",
        description: error.message,
      });
    }
  }
}

/** Initiate anonymous sign-in (non-blocking) with reCAPTCHA protection. */
export function initiateAnonymousSignIn(authInstance: Auth): void {
  getRecaptchaToken('LOGIN').then((token) => {
    signInAnonymously(authInstance).catch(handleAuthError);
  });
}

/** Initiate email/password sign-up (non-blocking) with reCAPTCHA protection. */
export function initiateEmailSignUp(authInstance: Auth, email: string, password: string): void {
  getRecaptchaToken('SIGNUP').then((token) => {
    createUserWithEmailAndPassword(authInstance, email, password).catch(handleAuthError);
  });
}

/** Initiate email/password sign-in (non-blocking) with reCAPTCHA protection. */
export function initiateEmailSignIn(authInstance: Auth, email: string, password: string): void {
  getRecaptchaToken('LOGIN').then((token) => {
    signInWithEmailAndPassword(authInstance, email, password).catch(handleAuthError);
  });
}

/** Initiate Google sign-in (non-blocking). */
export function initiateGoogleSignIn(authInstance: Auth): void {
  const provider = new GoogleAuthProvider();
  getRecaptchaToken('LOGIN').then((token) => {
    signInWithPopup(authInstance, provider).catch(handleAuthError);
  });
}
