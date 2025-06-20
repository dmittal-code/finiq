import { supabase } from '../supabaseClient';

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface QuestionOption {
  id: number;
  question_id: number;
  option_text: string;
  is_correct: boolean;
  option_order: number;
}

export interface Question {
  id: number;
  question_text: string;
  question_type: 'single_choice' | 'multiple_choice' | 'true_false';
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  explanation: string;
  times_answered: number;
  correct_percentage: number;
  created_at?: string;
  updated_at?: string;
  options?: QuestionOption[];
}

export interface Quiz {
  id: number;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  time_limit: number; // in minutes
  randomize_questions: boolean;
  total_attempts: number;
  average_score: number;
  created_at?: string;
  updated_at?: string;
  questions?: Question[];
}

export interface QuizQuestion {
  id: number;
  quiz_id: number;
  question_id: number;
  question_order: number;
}

// User quiz attempt types (for future user progress tracking)
export interface QuizAttempt {
  id: number;
  user_id: string;
  quiz_id: number;
  score: number;
  total_questions: number;
  time_taken: number; // in seconds
  completed_at: string;
  answers: UserAnswer[];
}

export interface UserAnswer {
  question_id: number;
  selected_options: number[];
  is_correct: boolean;
  time_taken: number; // in seconds
}

// ============================================
// QUIZ FUNCTIONS
// ============================================

// Get all quizzes
export async function getQuizzes(): Promise<Quiz[]> {
  try {
    const { data, error } = await supabase
      .from('quizzes')
      .select('*')
      .order('difficulty', { ascending: true })
      .order('title', { ascending: true });

    if (error) {
      console.error('Error fetching quizzes:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in getQuizzes:', error);
    throw error;
  }
}

// Get quizzes by difficulty
export async function getQuizzesByDifficulty(difficulty: 'beginner' | 'intermediate' | 'advanced'): Promise<Quiz[]> {
  try {
    const { data, error } = await supabase
      .from('quizzes')
      .select('*')
      .eq('difficulty', difficulty)
      .order('title');

    if (error) {
      console.error('Error fetching quizzes by difficulty:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in getQuizzesByDifficulty:', error);
    throw error;
  }
}

// Get a single quiz by ID
export async function getQuizById(id: number): Promise<Quiz | null> {
  try {
    const { data, error } = await supabase
      .from('quizzes')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching quiz by ID:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in getQuizById:', error);
    throw error;
  }
}

// Get quiz with questions (for taking the quiz)
export async function getQuizWithQuestions(quizId: number): Promise<Quiz | null> {
  try {
    // First get the quiz
    const quiz = await getQuizById(quizId);
    if (!quiz) return null;

    // Get questions for this quiz with their options
    const { data: quizQuestions, error: quizQuestionsError } = await supabase
      .from('quiz_questions')
      .select(`
        question_order,
        questions (
          id,
          question_text,
          question_type,
          category,
          difficulty,
          explanation,
          times_answered,
          correct_percentage
        )
      `)
      .eq('quiz_id', quizId)
      .order('question_order');

    if (quizQuestionsError) {
      console.error('Error fetching quiz questions:', quizQuestionsError);
      throw quizQuestionsError;
    }

    // Get options for all questions
    const questionIds = quizQuestions?.map(qq => {
      const question = qq.questions as unknown as Question;
      return question.id;
    }) || [];
    
    const { data: questionOptions, error: optionsError } = await supabase
      .from('question_options')
      .select('*')
      .in('question_id', questionIds)
      .order('question_id')
      .order('option_order');

    if (optionsError) {
      console.error('Error fetching question options:', optionsError);
      throw optionsError;
    }

    // Combine questions with their options
    const questions: Question[] = quizQuestions?.map(qq => {
      const question = qq.questions as unknown as Question;
      const options = questionOptions?.filter(opt => opt.question_id === question.id) || [];
      
      return {
        ...question,
        options: options
      };
    }) || [];

    // Randomize questions if enabled
    if (quiz.randomize_questions) {
      questions.sort(() => Math.random() - 0.5);
    }

    return {
      ...quiz,
      questions: questions
    };
  } catch (error) {
    console.error('Error in getQuizWithQuestions:', error);
    throw error;
  }
}

// ============================================
// QUESTION FUNCTIONS
// ============================================

// Get all questions
export async function getQuestions(): Promise<Question[]> {
  try {
    const { data, error } = await supabase
      .from('questions')
      .select(`
        *,
        question_options (*)
      `)
      .order('category')
      .order('difficulty')
      .order('question_text');

    if (error) {
      console.error('Error fetching questions:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in getQuestions:', error);
    throw error;
  }
}

// Get questions by category
export async function getQuestionsByCategory(category: string): Promise<Question[]> {
  try {
    const { data, error } = await supabase
      .from('questions')
      .select(`
        *,
        question_options (*)
      `)
      .eq('category', category)
      .order('difficulty')
      .order('question_text');

    if (error) {
      console.error('Error fetching questions by category:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in getQuestionsByCategory:', error);
    throw error;
  }
}

// Get questions by difficulty
export async function getQuestionsByDifficulty(difficulty: 'beginner' | 'intermediate' | 'advanced'): Promise<Question[]> {
  try {
    const { data, error } = await supabase
      .from('questions')
      .select(`
        *,
        question_options (*)
      `)
      .eq('difficulty', difficulty)
      .order('category')
      .order('question_text');

    if (error) {
      console.error('Error fetching questions by difficulty:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in getQuestionsByDifficulty:', error);
    throw error;
  }
}

// Search questions
export async function searchQuestions(query: string): Promise<Question[]> {
  try {
    const { data, error } = await supabase
      .from('questions')
      .select(`
        *,
        question_options (*)
      `)
      .or(`question_text.ilike.%${query}%,explanation.ilike.%${query}%`)
      .order('category')
      .order('difficulty');

    if (error) {
      console.error('Error searching questions:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in searchQuestions:', error);
    throw error;
  }
}

// Get a single question by ID
export async function getQuestionById(id: number): Promise<Question | null> {
  try {
    const { data, error } = await supabase
      .from('questions')
      .select(`
        *,
        question_options (*)
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching question by ID:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in getQuestionById:', error);
    throw error;
  }
}

// Get all unique categories
export async function getQuestionCategories(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('questions')
      .select('category')
      .order('category');

    if (error) {
      console.error('Error fetching question categories:', error);
      throw error;
    }

    // Extract unique categories
    const categories = [...new Set(data?.map(item => item.category) || [])];
    return categories;
  } catch (error) {
    console.error('Error in getQuestionCategories:', error);
    throw error;
  }
}

// ============================================
// ADMIN FUNCTIONS - QUIZ MANAGEMENT
// ============================================

// Add a new quiz
export async function addQuiz(quiz: Omit<Quiz, 'id' | 'total_attempts' | 'average_score' | 'created_at' | 'updated_at'>): Promise<Quiz> {
  try {
    const { data, error } = await supabase
      .from('quizzes')
      .insert([quiz])
      .select()
      .single();

    if (error) {
      console.error('Error adding quiz:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in addQuiz:', error);
    throw error;
  }
}

// Update a quiz
export async function updateQuiz(id: number, updates: Partial<Omit<Quiz, 'id' | 'created_at' | 'updated_at'>>): Promise<Quiz> {
  try {
    const { data, error } = await supabase
      .from('quizzes')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating quiz:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in updateQuiz:', error);
    throw error;
  }
}

// Delete a quiz
export async function deleteQuiz(id: number): Promise<void> {
  try {
    const { error } = await supabase
      .from('quizzes')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting quiz:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in deleteQuiz:', error);
    throw error;
  }
}

// ============================================
// ADMIN FUNCTIONS - QUESTION MANAGEMENT
// ============================================

// Add a new question with options
export async function addQuestion(
  question: Omit<Question, 'id' | 'times_answered' | 'correct_percentage' | 'created_at' | 'updated_at' | 'options'>,
  options: Omit<QuestionOption, 'id' | 'question_id'>[]
): Promise<Question> {
  try {
    // Start a transaction-like process
    const { data: questionData, error: questionError } = await supabase
      .from('questions')
      .insert([question])
      .select()
      .single();

    if (questionError) {
      console.error('Error adding question:', questionError);
      throw questionError;
    }

    // Add options for the question
    const optionsWithQuestionId = options.map(option => ({
      ...option,
      question_id: questionData.id
    }));

    const { data: optionsData, error: optionsError } = await supabase
      .from('question_options')
      .insert(optionsWithQuestionId)
      .select();

    if (optionsError) {
      console.error('Error adding question options:', optionsError);
      // Clean up the question if options failed
      await supabase.from('questions').delete().eq('id', questionData.id);
      throw optionsError;
    }

    return {
      ...questionData,
      options: optionsData
    };
  } catch (error) {
    console.error('Error in addQuestion:', error);
    throw error;
  }
}

// Update a question (without options for now)
export async function updateQuestion(id: number, updates: Partial<Omit<Question, 'id' | 'created_at' | 'updated_at' | 'options'>>): Promise<Question> {
  try {
    const { data, error } = await supabase
      .from('questions')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating question:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in updateQuestion:', error);
    throw error;
  }
}

// Delete a question (cascade will handle options)
export async function deleteQuestion(id: number): Promise<void> {
  try {
    const { error } = await supabase
      .from('questions')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting question:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in deleteQuestion:', error);
    throw error;
  }
}

// ============================================
// QUIZ-QUESTION RELATIONSHIP FUNCTIONS
// ============================================

// Add questions to a quiz
export async function addQuestionsToQuiz(quizId: number, questionIds: number[]): Promise<void> {
  try {
    const quizQuestions = questionIds.map((questionId, index) => ({
      quiz_id: quizId,
      question_id: questionId,
      question_order: index + 1
    }));

    const { error } = await supabase
      .from('quiz_questions')
      .insert(quizQuestions);

    if (error) {
      console.error('Error adding questions to quiz:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in addQuestionsToQuiz:', error);
    throw error;
  }
}

// Remove questions from a quiz
export async function removeQuestionsFromQuiz(quizId: number, questionIds: number[]): Promise<void> {
  try {
    const { error } = await supabase
      .from('quiz_questions')
      .delete()
      .eq('quiz_id', quizId)
      .in('question_id', questionIds);

    if (error) {
      console.error('Error removing questions from quiz:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in removeQuestionsFromQuiz:', error);
    throw error;
  }
}

// Update question order in a quiz
export async function updateQuestionOrder(quizId: number, questionOrderMap: { questionId: number; order: number }[]): Promise<void> {
  try {
    // Delete existing quiz-question relationships
    await supabase
      .from('quiz_questions')
      .delete()
      .eq('quiz_id', quizId);

    // Insert with new order
    const quizQuestions = questionOrderMap.map(item => ({
      quiz_id: quizId,
      question_id: item.questionId,
      question_order: item.order
    }));

    const { error } = await supabase
      .from('quiz_questions')
      .insert(quizQuestions);

    if (error) {
      console.error('Error updating question order:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in updateQuestionOrder:', error);
    throw error;
  }
}

// ============================================
// ANALYTICS FUNCTIONS
// ============================================

// Get quiz statistics
export async function getQuizStatistics() {
  try {
    const { data: quizStats, error } = await supabase
      .rpc('get_quiz_statistics');

    if (error) {
      console.error('Error fetching quiz statistics:', error);
      throw error;
    }

    return quizStats;
  } catch (error) {
    console.error('Error in getQuizStatistics:', error);
    // Return basic stats if RPC doesn't exist
    const quizzes = await getQuizzes();
    const questions = await getQuestions();
    
    return {
      total_quizzes: quizzes.length,
      total_questions: questions.length,
      quizzes_by_difficulty: {
        beginner: quizzes.filter(q => q.difficulty === 'beginner').length,
        intermediate: quizzes.filter(q => q.difficulty === 'intermediate').length,
        advanced: quizzes.filter(q => q.difficulty === 'advanced').length
      },
      questions_by_category: questions.reduce((acc, q) => {
        acc[q.category] = (acc[q.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    };
  }
}

// Update question statistics (called after quiz completion)
export async function updateQuestionStats(questionId: number, wasCorrect: boolean): Promise<void> {
  try {
    const question = await getQuestionById(questionId);
    if (!question) return;

    const newTimesAnswered = question.times_answered + 1;
    const newCorrectCount = wasCorrect 
      ? Math.round((question.correct_percentage / 100) * question.times_answered) + 1
      : Math.round((question.correct_percentage / 100) * question.times_answered);
    const newCorrectPercentage = (newCorrectCount / newTimesAnswered) * 100;

    await updateQuestion(questionId, {
      times_answered: newTimesAnswered,
      correct_percentage: newCorrectPercentage
    });
  } catch (error) {
    console.error('Error updating question stats:', error);
    // Don't throw error as this is not critical for user experience
  }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Generate a quiz from question bank (smart quiz generation)
export async function generateQuizFromBank(
  category?: string,
  difficulty?: 'beginner' | 'intermediate' | 'advanced',
  questionCount: number = 10
): Promise<Question[]> {
  try {
    let query = supabase
      .from('questions')
      .select(`
        *,
        question_options (*)
      `);

    if (category) {
      query = query.eq('category', category);
    }

    if (difficulty) {
      query = query.eq('difficulty', difficulty);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error generating quiz from bank:', error);
      throw error;
    }

    // Shuffle and take the requested number of questions
    const shuffled = data?.sort(() => Math.random() - 0.5) || [];
    return shuffled.slice(0, questionCount);
  } catch (error) {
    console.error('Error in generateQuizFromBank:', error);
    throw error;
  }
}

// Check quiz answer
export function checkQuizAnswer(question: Question, selectedOptionIds: number[]): boolean {
  if (!question.options) return false;

  const correctOptions = question.options.filter(opt => opt.is_correct).map(opt => opt.id);
  
  // For single choice and true/false, should have exactly one selection
  if (question.question_type === 'single_choice' || question.question_type === 'true_false') {
    return selectedOptionIds.length === 1 && correctOptions.includes(selectedOptionIds[0]);
  }
  
  // For multiple choice, all correct options must be selected and no incorrect ones
  if (question.question_type === 'multiple_choice') {
    return correctOptions.length === selectedOptionIds.length &&
           correctOptions.every(id => selectedOptionIds.includes(id));
  }

  return false;
}

// Calculate quiz score
export function calculateQuizScore(questions: Question[], userAnswers: { questionId: number; selectedOptions: number[] }[]): number {
  let correctCount = 0;
  
  questions.forEach(question => {
    const userAnswer = userAnswers.find(ans => ans.questionId === question.id);
    if (userAnswer && checkQuizAnswer(question, userAnswer.selectedOptions)) {
      correctCount++;
    }
  });

  return Math.round((correctCount / questions.length) * 100);
}

// ============================================
// URL HELPER FUNCTIONS
// ============================================

// Generate URL-friendly slug from quiz title
export function generateQuizSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

// Get quiz by slug (for future use with pretty URLs)
export async function getQuizBySlug(slug: string): Promise<Quiz | null> {
  try {
    const { data, error } = await supabase
      .from('quizzes')
      .select('*');

    if (error) {
      console.error('Error fetching quizzes for slug lookup:', error);
      throw error;
    }

    // Find quiz with matching slug
    const quiz = data?.find(q => generateQuizSlug(q.title) === slug);
    return quiz || null;
  } catch (error) {
    console.error('Error in getQuizBySlug:', error);
    throw error;
  }
}

// Generate quiz URL (can be ID-based or slug-based)
export function getQuizUrl(quiz: Quiz, useSlug: boolean = false): string {
  if (useSlug) {
    return `/quizzes/${generateQuizSlug(quiz.title)}`;
  }
  return `/quizzes/${quiz.id}`;
}

// Parse quiz identifier (ID or slug) and return quiz
export async function getQuizByIdentifier(identifier: string): Promise<Quiz | null> {
  // Try to parse as number first (ID)
  const id = parseInt(identifier);
  if (!isNaN(id)) {
    return await getQuizById(id);
  }
  
  // If not a number, treat as slug
  return await getQuizBySlug(identifier);
} 