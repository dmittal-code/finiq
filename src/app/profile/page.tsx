import { Metadata } from 'next';
import ProfilePageClient from './ProfilePageClient';

export const metadata: Metadata = {
  title: 'My Profile | FinIQ - Personalize Your Financial Learning',
  description: 'Customize your FinIQ profile to get personalized financial education content tailored to your goals and learning style.',
  keywords: 'profile, personalization, financial goals, learning preferences, FinIQ',
};

export default function ProfilePage() {
  return <ProfilePageClient />;
} 