
'use client';

import { useState, useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

/**
 * تحسين مكون الاستماع للأخطاء ليكون أكثر صمتاً في بيئة الإنتاج
 * لتجنب إزعاج المستخدم برسائل تقنية.
 */
export function FirebaseErrorListener() {
  const [error, setError] = useState<FirestorePermissionError | null>(null);

  useEffect(() => {
    const handleError = (error: FirestorePermissionError) => {
      // فقط نقوم بتسجيل الخطأ في الكونسول إذا كنا في بيئة التطوير
      if (process.env.NODE_ENV === 'development') {
        console.error("Firestore Permission Error Context:", error.request);
        setError(error);
      } else {
        // في الإنتاج، نكتفي بتسجيل صامت لمنع تعليق الصفحة
        console.warn("Security policy prevented a data operation.");
      }
    };

    errorEmitter.on('permission-error', handleError);
    return () => {
      errorEmitter.off('permission-error', handleError);
    };
  }, []);

  if (error && process.env.NODE_ENV === 'development') {
    throw error;
  }

  return null;
}
