import { supabase } from '@/supabaseClient';

export interface UserProfile {
  id?: number;
  user_id: string;
  email: string;
  name: string;
  avatar_url?: string;
  age?: number;
  city?: string;
  state?: string;
  education_level?: 'high_school' | 'college' | 'working_professional' | 'other';
  monthly_income_range?: '0-1000' | '1001-5000' | '5001-10000' | '10000+' | 'prefer_not_say';
  financial_knowledge_level?: 'beginner' | 'intermediate' | 'advanced';
  primary_financial_goals?: string[];
  preferred_learning_style?: 'visual' | 'interactive' | 'reading' | 'video';
  favorite_financial_topic?: string;
  bio?: string;
  created_at?: string;
  updated_at?: string;
}

export const getProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
};

export const createOrUpdateProfile = async (profile: UserProfile): Promise<UserProfile | null> => {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .upsert(profile)
      .select()
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error saving profile:', error);
    throw error;
  }
};

export const deleteProfile = async (userId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('user_profiles')
      .delete()
      .eq('user_id', userId);

    if (error) throw error;

    return true;
  } catch (error) {
    console.error('Error deleting profile:', error);
    return false;
  }
};

// Helper functions for profile data
export const getEducationLevelLabel = (level?: string): string => {
  const labels: Record<string, string> = {
    'high_school': 'High School (9th-12th grade)',
    'college': 'College/University',
    'working_professional': 'Working Professional',
    'other': 'Other'
  };
  return labels[level || ''] || '';
};

export const getIncomeRangeLabel = (range?: string): string => {
  const labels: Record<string, string> = {
    '0-1000': '₹0 - ₹1,000',
    '1001-5000': '₹1,001 - ₹5,000',
    '5001-10000': '₹5,001 - ₹10,000',
    '10000+': '₹10,000+',
    'prefer_not_say': 'Prefer not to say'
  };
  return labels[range || ''] || '';
};

export const getKnowledgeLevelLabel = (level?: string): string => {
  const labels: Record<string, string> = {
    'beginner': 'Beginner (just starting to learn)',
    'intermediate': 'Intermediate (know the basics)',
    'advanced': 'Advanced (comfortable with concepts)'
  };
  return labels[level || ''] || '';
};

export const getLearningStyleLabel = (style?: string): string => {
  const labels: Record<string, string> = {
    'visual': 'Visual (charts, infographics)',
    'interactive': 'Interactive (calculators, games)',
    'reading': 'Reading (articles, guides)',
    'video': 'Video content'
  };
  return labels[style || ''] || '';
};

export const getFinancialGoalLabel = (goal: string): string => {
  const labels: Record<string, string> = {
    'save_for_education': 'Save for College/Education',
    'emergency_fund': 'Build Emergency Fund',
    'investments': 'Learn about Investments',
    'start_business': 'Start a Business',
    'buy_gadgets': 'Buy Gadgets/Electronics',
    'travel_fund': 'Travel Fund',
    'other': 'Other'
  };
  return labels[goal] || goal;
}; 