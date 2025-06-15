"use client";

import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import type { User } from "@supabase/supabase-js";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user ?? null);
      setLoading(false);
    };
    getUser();
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({ provider: "google" });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 flex flex-col items-center gap-6">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">Hello World</h1>
        {loading ? (
          <div className="text-gray-500">Loading...</div>
        ) : user ? (
          <>
            <div className="text-lg text-gray-800 dark:text-gray-200 mb-2">Logged in as <span className="font-mono">{user.email}</span></div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={handleLogin}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Login with Google
          </button>
        )}
      </div>
    </div>
  );
}
