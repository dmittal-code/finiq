'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../supabaseClient';

export default function AuthCallbackPageClient() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function handleAuth() {
      try {
        const { error } = await supabase.auth.getSession();
        if (error) {
          setError('Authentication failed. Please try again.');
        } else {
          router.replace('/');
        }
      } catch {
        setError('Authentication failed. Please try again.');
      }
    }
    handleAuth();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Signing you in...</h1>
        {error ? (
          <div className="text-red-600">{error}</div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-600">Please wait while we complete your sign in.</p>
          </div>
        )}
      </div>
    </div>
  );
} 