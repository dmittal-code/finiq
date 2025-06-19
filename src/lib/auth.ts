import { supabase } from '../supabaseClient';
import { User } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  created_at: string;
  is_admin: boolean;
}

// Get admin emails from config file
export async function getAdminEmails(): Promise<string[]> {
  try {
    const response = await fetch('/config/admins.txt');
    if (!response.ok) {
      console.warn('Could not load admin config, using fallback');
      return ['deepak.mittal@cloudkeeper.com'];
    }
    
    const text = await response.text();
    const emails = text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('#'))
      .map(email => email.toLowerCase());
    
    return emails;
  } catch (error) {
    console.warn('Error loading admin config, using fallback:', error);
    return ['deepak.mittal@cloudkeeper.com'];
  }
}

// Check if user is admin
export async function isUserAdmin(email: string): Promise<boolean> {
  const adminEmails = await getAdminEmails();
  return adminEmails.includes(email.toLowerCase());
}

// Sign in with Google
export async function signInWithGoogle() {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });

    if (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in signInWithGoogle:', error);
    throw error;
  }
}

// Sign out
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in signOut:', error);
    throw error;
  }
}

// Get current user
export async function getCurrentUser(): Promise<User | null> {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
      console.error('Error getting current user:', error);
      return null;
    }
    return user;
  } catch (error) {
    console.error('Error in getCurrentUser:', error);
    return null;
  }
}

// Get user profile with admin status
export async function getUserProfile(): Promise<UserProfile | null> {
  try {
    const user = await getCurrentUser();
    if (!user) return null;

    const profile: UserProfile = {
      id: user.id,
      email: user.email || '',
      name: user.user_metadata?.full_name || user.user_metadata?.name,
      avatar_url: user.user_metadata?.avatar_url,
      created_at: user.created_at,
      is_admin: await isUserAdmin(user.email || '')
    };

    return profile;
  } catch (error) {
    console.error('Error in getUserProfile:', error);
    return null;
  }
}

// Listen to auth state changes
export function onAuthStateChange(callback: (user: User | null) => void) {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(session?.user || null);
  });
} 