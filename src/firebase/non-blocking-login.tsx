'use client';
import {
  Auth,
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
  
  const profileData = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName || user.email?.split('@')[0] || 'Professional Driver',
    photoUrl: user.photoURL || '',
    updatedAt: serverTimestamp(),
    isPremium: true, // All users get premium features in this academy
  };

  try {
    await setDoc(userRef, profileData, { merge: true });
  } catch (error) {
    console.error('Error syncing user profile:', error);
  }
}

/** Helper to handle common Auth errors with localization support */
function handleAuthError(error: any, language: 'ar' | 'en') {
  if (error instanceof FirebaseError) {
    let title = language === 'ar' ? "خطأ في النظام" : "System Error";
    let description = error.message;

    if (error.code === 'auth/email-already-in-use') {
      title = language === 'ar' ? "البريد مستخدم بالفعل" : "Email Already in Use";
      description = language === 'ar' ? "هذا البريد الإلكتروني مسجل مسبقاً، يرجى تسجيل الدخول بدلاً من ذلك." : "This email is already registered. Please sign in instead.";
    } else if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
      title = language === 'ar' ? "بيانات غير صحيحة" : "Invalid Credentials";
      description = language === 'ar' ? "البريد الإلكتروني أو كلمة المرور غير صحيحة." : "The email or password you entered is incorrect.";
    } else if (error.code === 'auth/popup-closed-by-user') {
      title = language === 'ar' ? "تم إلغاء العملية" : "Operation Cancelled";
      description = language === 'ar' ? "تم إغلاق نافذة تسجيل الدخول قبل إتمام العملية." : "The sign-in window was closed before completion.";
    } else if (error.code === 'auth/unauthorized-domain') {
      title = language === 'ar' ? "نطاق غير مصرح به" : "Unauthorized Domain";
      description = language === 'ar' 
        ? "يرجى إضافة 'drivingfree.online' إلى النطاقات المعتمدة في Firebase Console." 
        : "Please add 'drivingfree.online' to Authorized Domains in Firebase Console Settings.";
    }

    toast({
      variant: "destructive",
      title,
      description,
    });
  } else {
    toast({
      variant: "destructive",
      title: language === 'ar' ? "خطأ غير متوقع" : "Unexpected Error",
      description: language === 'ar' ? "حدث خطأ غير متوقع، يرجى المحاولة لاحقاً." : "An unexpected error occurred. Please try again later.",
    });
  }
}

export async function initiateEmailSignUp(authInstance: Auth, email: string, password: string, language: 'ar' | 'en'): Promise<void> {
  try {
    await getRecaptchaToken('SIGNUP');
    const result = await createUserWithEmailAndPassword(authInstance, email, password);
    await syncUserProfile(result.user);
    toast({
      title: language === 'ar' ? "تم إنشاء الحساب بنجاح" : "Account Created Successfully",
      description: language === 'ar' ? "مرحباً بك في أكاديمية القيادة الحرة." : "Welcome to Driving Free Academy.",
    });
  } catch (error) {
    handleAuthError(error, language);
  }
}

export async function initiateEmailSignIn(authInstance: Auth, email: string, password: string, language: 'ar' | 'en'): Promise<void> {
  try {
    await getRecaptchaToken('LOGIN');
    const result = await signInWithEmailAndPassword(authInstance, email, password);
    await syncUserProfile(result.user);
    toast({
      title: language === 'ar' ? "تم تسجيل الدخول" : "Signed In Successfully",
      description: language === 'ar' ? "مرحباً بك مجدداً." : "Welcome back.",
    });
  } catch (error) {
    handleAuthError(error, language);
  }
}

export async function initiateGoogleSignIn(authInstance: Auth, language: 'ar' | 'en'): Promise<void> {
  const provider = new GoogleAuthProvider();
  try {
    await getRecaptchaToken('LOGIN');
    const result = await signInWithPopup(authInstance, provider);
    await syncUserProfile(result.user);
    toast({
      title: language === 'ar' ? "تم تسجيل الدخول بنجاح" : "Signed In Successfully",
      description: language === 'ar' ? `مرحباً بك ${result.user.displayName}` : `Welcome ${result.user.displayName}`,
    });
  } catch (error) {
    handleAuthError(error, language);
  }
}
