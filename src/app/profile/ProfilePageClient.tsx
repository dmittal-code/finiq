'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/supabaseClient';

interface UserProfile {
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
}

const FINANCIAL_GOALS = [
  { value: 'save_for_education', label: 'Save for College/Education' },
  { value: 'emergency_fund', label: 'Build Emergency Fund' },
  { value: 'investments', label: 'Learn about Investments' },
  { value: 'start_business', label: 'Start a Business' },
  { value: 'buy_gadgets', label: 'Buy Gadgets/Electronics' },
  { value: 'travel_fund', label: 'Travel Fund' },
  { value: 'other', label: 'Other' }
];

const FINANCIAL_TOPICS = [
  'Investing', 'Savings', 'Budgeting', 'Credit & Loans', 'Insurance', 
  'Taxes', 'Retirement Planning', 'Real Estate', 'Cryptocurrency', 'Economics'
];

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 
  'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 
  'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 
  'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 
  'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Other'
];

export default function ProfilePageClient() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        throw error;
      }

      if (data) {
        setProfile(data);
      } else {
        // Create a new profile with basic info from auth
        setProfile({
          user_id: user.id,
          email: user.email || '',
          name: user.user_metadata?.full_name || user.email?.split('@')[0] || '',
          avatar_url: user.user_metadata?.avatar_url
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setMessage({ type: 'error', text: 'Failed to load profile' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile || !user) return;

    setSaving(true);
    setMessage(null);

    try {
      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          ...profile,
          user_id: user.id,
          email: user.email || profile.email
        });

      if (error) throw error;

      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error) {
      console.error('Error saving profile:', error);
      setMessage({ type: 'error', text: 'Failed to save profile' });
    } finally {
      setSaving(false);
    }
  };

  const handleGoalToggle = (goal: string) => {
    if (!profile) return;
    
    const currentGoals = profile.primary_financial_goals || [];
    const updatedGoals = currentGoals.includes(goal)
      ? currentGoals.filter(g => g !== goal)
      : [...currentGoals, goal];
    
    setProfile({ ...profile, primary_financial_goals: updatedGoals });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-blue-50 p-4 flex items-center justify-center">
        <div className="card p-8 text-center max-w-md">
          <h2 className="text-heading-2 font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-body text-gray-600 mb-6">You need to be logged in to view your profile.</p>
          <a href="/login" className="btn-primary">
            Sign In
          </a>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-blue-50 p-4 flex items-center justify-center">
        <div className="card p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-body text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-heading-1 font-bold text-gray-900 mb-6">My Profile</h1>
          <p className="text-body-large text-gray-600 leading-relaxed">
            Personalize your FinIQ experience by sharing your goals and preferences
          </p>
        </div>

        {/* Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-xl ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-8">
          {/* Basic Information */}
          <div className="card p-8 animate-scale-in">
            <h2 className="text-heading-2 font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="text-2xl">👤</span>
              Basic Information
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-body font-semibold text-gray-700 mb-3">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={profile?.name || ''}
                  onChange={(e) => setProfile(prev => prev ? { ...prev, name: e.target.value } : null)}
                  className="input-enhanced"
                  required
                />
              </div>
              
              <div>
                <label className="block text-body font-semibold text-gray-700 mb-3">
                  Email *
                </label>
                <input
                  type="email"
                  value={profile?.email || ''}
                  className="input-enhanced bg-gray-100"
                  disabled
                />
              </div>
              
              <div>
                <label className="block text-body font-semibold text-gray-700 mb-3">
                  Age
                </label>
                <input
                  type="number"
                  value={profile?.age || ''}
                  onChange={(e) => setProfile(prev => prev ? { ...prev, age: parseInt(e.target.value) || undefined } : null)}
                  className="input-enhanced"
                  min="13"
                  max="30"
                />
              </div>
              
              <div>
                <label className="block text-body font-semibold text-gray-700 mb-3">
                  City
                </label>
                <input
                  type="text"
                  value={profile?.city || ''}
                  onChange={(e) => setProfile(prev => prev ? { ...prev, city: e.target.value } : null)}
                  className="input-enhanced"
                  placeholder="e.g., Mumbai, Delhi, Bangalore"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-body font-semibold text-gray-700 mb-3">
                  State
                </label>
                <select
                  value={profile?.state || ''}
                  onChange={(e) => setProfile(prev => prev ? { ...prev, state: e.target.value } : null)}
                  className="input-enhanced"
                >
                  <option value="">Select your state</option>
                  {INDIAN_STATES.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Financial Background */}
          <div className="card p-8 animate-slide-in-left">
            <h2 className="text-heading-2 font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="text-2xl">💰</span>
              Financial Background
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-body font-semibold text-gray-700 mb-3">
                  Current Education Level
                </label>
                <select
                  value={profile?.education_level || ''}
                  onChange={(e) => setProfile(prev => prev ? { ...prev, education_level: e.target.value as 'high_school' | 'college' | 'working_professional' | 'other' } : null)}
                  className="input-enhanced"
                >
                  <option value="">Select your level</option>
                  <option value="high_school">High School (9th-12th grade)</option>
                  <option value="college">College/University</option>
                  <option value="working_professional">Working Professional</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-body font-semibold text-gray-700 mb-3">
                  Monthly Pocket Money/Income
                </label>
                <select
                  value={profile?.monthly_income_range || ''}
                  onChange={(e) => setProfile(prev => prev ? { ...prev, monthly_income_range: e.target.value as '0-1000' | '1001-5000' | '5001-10000' | '10000+' | 'prefer_not_say' } : null)}
                  className="input-enhanced"
                >
                  <option value="">Select range</option>
                  <option value="0-1000">₹0 - ₹1,000</option>
                  <option value="1001-5000">₹1,001 - ₹5,000</option>
                  <option value="5001-10000">₹5,001 - ₹10,000</option>
                  <option value="10000+">₹10,000+</option>
                  <option value="prefer_not_say">Prefer not to say</option>
                </select>
              </div>
              
              <div>
                <label className="block text-body font-semibold text-gray-700 mb-3">
                  Financial Knowledge Level
                </label>
                <select
                  value={profile?.financial_knowledge_level || ''}
                  onChange={(e) => setProfile(prev => prev ? { ...prev, financial_knowledge_level: e.target.value as 'beginner' | 'intermediate' | 'advanced' } : null)}
                  className="input-enhanced"
                >
                  <option value="">Select your level</option>
                  <option value="beginner">Beginner (just starting to learn)</option>
                  <option value="intermediate">Intermediate (know the basics)</option>
                  <option value="advanced">Advanced (comfortable with concepts)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Goals & Interests */}
          <div className="card p-8 animate-slide-in-right">
            <h2 className="text-heading-2 font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="text-2xl">🎯</span>
              Goals & Interests
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-body font-semibold text-gray-700 mb-3">
                  Primary Financial Goals (select all that apply)
                </label>
                <div className="grid md:grid-cols-2 gap-3">
                  {FINANCIAL_GOALS.map(goal => (
                    <label key={goal.value} className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                      <input
                        type="checkbox"
                        checked={profile?.primary_financial_goals?.includes(goal.value) || false}
                        onChange={() => handleGoalToggle(goal.value)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-body">{goal.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-body font-semibold text-gray-700 mb-3">
                  Preferred Learning Style
                </label>
                <select
                  value={profile?.preferred_learning_style || ''}
                  onChange={(e) => setProfile(prev => prev ? { ...prev, preferred_learning_style: e.target.value as 'visual' | 'interactive' | 'reading' | 'video' } : null)}
                  className="input-enhanced"
                >
                  <option value="">Select your style</option>
                  <option value="visual">Visual (charts, infographics)</option>
                  <option value="interactive">Interactive (calculators, games)</option>
                  <option value="reading">Reading (articles, guides)</option>
                  <option value="video">Video content</option>
                </select>
              </div>
              
              <div>
                <label className="block text-body font-semibold text-gray-700 mb-3">
                  Favorite Financial Topic
                </label>
                <select
                  value={profile?.favorite_financial_topic || ''}
                  onChange={(e) => setProfile(prev => prev ? { ...prev, favorite_financial_topic: e.target.value } : null)}
                  className="input-enhanced"
                >
                  <option value="">Select a topic</option>
                  {FINANCIAL_TOPICS.map(topic => (
                    <option key={topic} value={topic}>{topic}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Personal Touch */}
          <div className="card p-8 animate-fade-in">
            <h2 className="text-heading-2 font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="text-2xl">✨</span>
              Personal Touch
            </h2>
            
            <div>
              <label className="block text-body font-semibold text-gray-700 mb-3">
                Bio (Tell us about yourself)
              </label>
              <textarea
                value={profile?.bio || ''}
                onChange={(e) => setProfile(prev => prev ? { ...prev, bio: e.target.value } : null)}
                className="input-enhanced min-h-[100px]"
                placeholder="Share your interests, goals, or anything you'd like others to know about you..."
                maxLength={500}
              />
              <p className="text-body-small text-gray-500 mt-2">
                {(profile?.bio || '').length}/500 characters
              </p>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={saving}
              className="btn-primary px-12 py-4 text-body-large disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <div className="flex items-center gap-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Saving...
                </div>
              ) : (
                'Save Profile'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 