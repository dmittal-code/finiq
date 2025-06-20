import EditQuizPageClient from './EditQuizPageClient';

interface EditQuizPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditQuizPage({ params }: EditQuizPageProps) {
  const { id } = await params;
  return <EditQuizPageClient quizId={parseInt(id)} />;
} 