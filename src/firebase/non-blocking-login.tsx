'use client';
import {
  Auth,
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { getRecaptchaToken } from '@/lib/recaptcha';
import { toast } from '@/hooks/use-toast';

/** Helper to create or update user profile in Firestore */
async function syncUserProfile(user: User) {
  const db = getFirestore();
  const userRef = doc(db, 'users', user.uid);
  
  // Basic profile data mapping from Firebase Auth
  const profileData = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName || user.email?.split('@')[0] || 'سائق محترف',
    photoUrl: user.photoURL || '',
    createdAt: serverTimestamp(),
    isPremium: true, // Defaulting to true for Driving Free Academy
  };

  try {
    // Using setDoc with merge: true to avoid overwriting existing data if they just login
    await setDoc(userRef, profileData, { merge: true });
  } catch (error) {
    console.error('Error syncing user profile:', error);
  }
}

/** Helper to handle common Auth errors */
function handleAuthError(error: any) {
  if (error instanceof FirebaseError) {
    if (error.code === 'auth/unauthorized-domain') {
      toast({
        variant: "destructive",
        title: "نطاق غير مصرح به",
        description: "يرجى إضافة هذا النطاق إلى 'Authorized domains' في لوحة تحكم Firebase Console.",
      });
    } else if (error.code === 'auth/email-already-in-use') {
      toast({
        variant: "destructive",
        title: "البريد مستخدم بالفعل",
        description: "هذا البريد الإلكتروني مسجل مسبقاً، يرجى تسجيل الدخول بدلاً من ذلك.",
      });
    } else if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
      toast({
        variant: "destructive",
        title: "بيانات غير صحيحة",
        description: "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "خطأ في النظام",
        description: error.message,
      });
    }
  }
}

/** Initiate anonymous sign-in (non-blocking) */
export function initiateAnonymousSignIn(authInstance: Auth): void {
  getRecaptchaToken('LOGIN').then((token) => {
    signInAnonymously(authInstance)
      .then((result) => syncUserProfile(result.user))
      .catch(handleAuthError);
  });
}

/** Initiate email/password sign-up (non-blocking) */
export function initiateEmailSignUp(authInstance: Auth, email: string, password: string): void {
  getRecaptchaToken('SIGNUP').then((token) => {
    createUserWithEmailAndPassword(authInstance, email, password)
      .then((result) => syncUserProfile(result.user))
      .catch(handleAuthError);
  });
}

/** Initiate email/password sign-in (non-blocking) */
export function initiateEmailSignIn(authInstance: Auth, email: string, password: string): void {
  getRecaptchaToken('LOGIN').then((token) => {
    signInWithEmailAndPassword(authInstance, email, password)
      .then((result) => syncUserProfile(result.user))
      .catch(handleAuthError);
  });
}

/** Initiate Google sign-in (non-blocking). */
export function initiateGoogleSignIn(authInstance: Auth): void {
  const provider = new GoogleAuthProvider();
  getRecaptchaToken('LOGIN').then((token) => {
    signInWithPopup(authInstance, provider)
      .then((result) => syncUserProfile(result.user))
      .catch(handleAuthError);
  });
}
