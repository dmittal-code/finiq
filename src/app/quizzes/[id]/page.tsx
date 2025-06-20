import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getQuizById } from '../../../lib/quizzes';
import QuizPageClient from './QuizPageClient';

interface QuizPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Generate metadata for each quiz page
export async function generateMetadata({ params }: QuizPageProps): Promise<Metadata> {
  const { id } = await params;
  const quizId = parseInt(id);
  
  if (isNaN(quizId)) {
    return {
      title: 'Quiz Not Found - FinIQ',
    };
  }

  try {
    const quiz = await getQuizById(quizId);
    
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
  const { id } = await params;
  const quizId = parseInt(id);
  
  // Check if ID is valid
  if (isNaN(quizId)) {
    notFound();
  }

  // Verify quiz exists
  try {
    const quiz = await getQuizById(quizId);
    if (!quiz) {
      notFound();
    }
  } catch {
    console.error('Error loading quiz');
    notFound();
  }

  // Pass the quiz ID to the client component
  return <QuizPageClient quizId={quizId} />;
} 