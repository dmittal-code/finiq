import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getQuizByIdentifier } from '../../../lib/quizzes';
import QuizPageClient from './QuizPageClient';

interface QuizPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate metadata for each quiz page
export async function generateMetadata({ params }: QuizPageProps): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const quiz = await getQuizByIdentifier(slug);
    
    if (!quiz) {
      return {
        title: 'Quiz Not Found - FinIQ',
      };
    }

    return {
      title: `${quiz.title} - FinIQ Quiz`,
      description: quiz.description,
      openGraph: {
        title: quiz.title,
        description: quiz.description,
        type: 'website',
      },
    };
  } catch {
    return {
      title: 'Quiz Not Found - FinIQ',
    };
  }
}

export default async function QuizPage({ params }: QuizPageProps) {
  const { slug } = await params;
  
  // Get quiz by identifier (can be slug or numeric ID for backward compatibility)
  try {
    const quiz = await getQuizByIdentifier(slug);
    if (!quiz) {
      notFound();
    }

    // Pass the quiz ID to the client component
    return <QuizPageClient quizId={quiz.id} />;
  } catch {
    console.error('Error loading quiz');
    notFound();
  }
} 