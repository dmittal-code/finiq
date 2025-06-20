'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getQuizzes, Quiz } from '../../lib/quizzes';
import { supabase } from '../../supabaseClient';

export default function QuizzesPageClient() {
  const router = useRouter();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load quizzes from database
  useEffect(() => {
    async function loadQuizzes() {
      try {
        console.log('Loading quizzes from database...');
        setLoading(true);
        const data = await getQuizzes();
        console.log('Quizzes loaded:', data.length, 'quizzes found');
        console.log('Quiz data sample:', data[0]);
        setQuizzes(data);
        
        // If we have quizzes but they might not have questions, warn the user
        if (data.length > 0 && data.length < 5) {
          console.warn('Only', data.length, 'quizzes found. Expected 15 quizzes if database is fully set up.');
        }
      } catch (err) {
        console.error('Error loading quizzes:', err);
        setError('Failed to load quizzes. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    loadQuizzes();
  }, []);

  // Debug: Check if we have any quizzes loaded
  useEffect(() => {
    console.log('Quiz state updated:', { 
      quizzesCount: quizzes.length
    });
  }, [quizzes]);

  // Diagnostic function to check database state
  const runDatabaseDiagnostic = async () => {
    console.log('🔍 Running database diagnostic...');
    try {
      // Check questions table
      const { data: questions, error: questionsError } = await supabase
        .from('questions')
        .select('*')
        .limit(5);
      
      console.log('Questions table:', { 
        count: questions?.length || 0, 
        error: questionsError,
        sample: questions?.[0]
      });

      // Check question_options table
      const { data: options, error: optionsError } = await supabase
        .from('question_options')
        .select('*')
        .limit(5);
      
      console.log('Question options table:', { 
        count: options?.length || 0, 
        error: optionsError,
        sample: options?.[0]
      });

      // Check quiz_questions junction table
      const { data: quizQuestions, error: quizQuestionsError } = await supabase
        .from('quiz_questions')
        .select('*')
        .limit(5);
      
      console.log('Quiz questions junction table:', { 
        count: quizQuestions?.length || 0, 
        error: quizQuestionsError,
        sample: quizQuestions?.[0]
      });

      // Test the specific query that getQuizWithQuestions uses
      const testQuizId = quizzes[0]?.id;
      if (testQuizId) {
        const { data: testQuizQuestions, error: testError } = await supabase
          .from('quiz_questions')
          .select(`
            question_order,
            questions (
              id,
              question_text,
              question_type,
              category,
              difficulty,
              explanation
            )
          `)
          .eq('quiz_id', testQuizId)
          .order('question_order');

        console.log('Test quiz questions query for quiz', testQuizId, ':', {
          data: testQuizQuestions,
          error: testError
        });
      }

    } catch (err) {
      console.error('Diagnostic error:', err);
    }
  };

  const startQuiz = (quiz: Quiz) => {
    console.log('Navigating to quiz:', quiz.title, 'ID:', quiz.id);
    router.push(`/quizzes/${quiz.id}`);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
        <div className="max-w-4xl mx-auto text-center py-20">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-8"></div>
          <h2 className="text-heading-2 font-semibold text-gray-600">Loading quizzes...</h2>
          <p className="text-body text-gray-500 mt-4">Fetching available quizzes from database...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
        <div className="max-w-4xl mx-auto text-center py-20">
          <div className="text-6xl mb-8">❌</div>
          <h2 className="text-heading-2 font-semibold text-red-600 mb-4">Error Loading Quizzes</h2>
          <p className="text-body text-gray-600 mb-8">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Quiz Selection Screen
  console.log('Rendering quiz selection screen with', quizzes.length, 'quizzes');
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-heading-1 font-bold text-gray-900 mb-6">
            Financial Literacy Quizzes
          </h1>
          <p className="text-body-large text-gray-600 leading-relaxed mb-8">
            Test your knowledge and track your progress in financial literacy. Choose from our comprehensive collection of quizzes designed to enhance your financial understanding.
          </p>
          
          {/* Diagnostic Info */}
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800 mb-3">
              <strong>Status:</strong> {quizzes.length} quizzes loaded from database
              {quizzes.length === 0 && ' (Database might not be set up)'}
              {quizzes.length > 0 && quizzes.length < 15 && ' (Partial database setup - expected 15 quizzes)'}
              {quizzes.length >= 15 && ' (Database fully set up!)'}
            </p>
            <button
              onClick={runDatabaseDiagnostic}
              className="text-sm bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              🔍 Run Database Diagnostic (Check Console)
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-xl p-2 shadow-lg">
            <div className="flex gap-2">
              <button className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium">
                All Quizzes
              </button>
              <button className="px-6 py-3 rounded-lg text-gray-600 hover:bg-gray-100 font-medium">
                Beginner
              </button>
              <button className="px-6 py-3 rounded-lg text-gray-600 hover:bg-gray-100 font-medium">
                Intermediate
              </button>
              <button className="px-6 py-3 rounded-lg text-gray-600 hover:bg-gray-100 font-medium">
                Advanced
              </button>
            </div>
          </div>
        </div>
        
        {/* Quiz Cards */}
        {quizzes.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {quizzes.map((quiz, index) => (
              <div 
                key={quiz.id} 
                className="card p-6 hover:shadow-xl transition-all duration-300 animate-scale-in group cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => startQuiz(quiz)}
              >
                <div className="text-center">
                  <div className="flex justify-center items-center gap-2 mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      quiz.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                      quiz.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}
                    </span>
                    <span className="text-sm text-gray-500">
                      Quiz #{quiz.id}
                    </span>
                  </div>
                  
                  <h2 className="text-heading-3 font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {quiz.title}
                  </h2>
                  
                  <p className="text-body text-gray-600 mb-6 leading-relaxed line-clamp-3">
                    {quiz.description}
                  </p>
                  
                  <div className="flex justify-center items-center gap-6 mb-6 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
                      10 Questions
                    </div>
                    {quiz.time_limit && (
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></span>
                        {quiz.time_limit} Minutes
                      </div>
                    )}
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      startQuiz(quiz);
                    }}
                    className="w-full btn-primary text-lg py-3 group-hover:scale-105 transition-transform"
                    disabled={loading}
                  >
                    {loading ? '⏳ Loading...' : '🚀 Start Quiz'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-8">📚</div>
            <h2 className="text-heading-2 font-semibold text-gray-600 mb-4">No Quizzes Available</h2>
            <p className="text-body text-gray-500 mb-8">
              It looks like the quiz database hasn't been set up yet. Please run the setup scripts to populate the quizzes.
            </p>
            <button
              onClick={runDatabaseDiagnostic}
              className="btn-primary"
            >
              🔍 Check Database Status
            </button>
          </div>
        )}
        
        {/* Features */}
        <div className="card p-10 animate-fade-in">
          <h3 className="text-heading-2 font-bold text-gray-900 mb-8 text-center">What You'll Get</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-2xl">📊</span>
              </div>
              <h4 className="text-heading-3 font-semibold text-gray-900 mb-3">Detailed Results</h4>
              <p className="text-body text-gray-600 leading-relaxed">Get explanations for every question and track your progress with comprehensive feedback</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-2xl">⏱️</span>
              </div>
              <h4 className="text-heading-3 font-semibold text-gray-900 mb-3">Timed Challenges</h4>
              <p className="text-body text-gray-600 leading-relaxed">Challenge yourself with time limits to simulate real-world financial decision making</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-2xl">🎯</span>
              </div>
              <h4 className="text-heading-3 font-semibold text-gray-900 mb-3">Progressive Learning</h4>
              <p className="text-body text-gray-600 leading-relaxed">Start with basics and advance through intermediate to expert-level financial concepts</p>
            </div>
          </div>
        </div>

        {/* Categories Overview */}
        {quizzes.length > 0 && (
          <div className="mt-16">
            <h3 className="text-heading-2 font-bold text-gray-900 mb-8 text-center">Quiz Categories</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Investing', 'Savings', 'Credit', 'Planning', 'Economics', 'Taxes', 'Retirement'].map((category, index) => (
                <div 
                  key={category}
                  className="bg-white/70 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white transition-all duration-300"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="text-2xl mb-2">
                    {category === 'Investing' && '📈'}
                    {category === 'Savings' && '💰'}
                    {category === 'Credit' && '💳'}
                    {category === 'Planning' && '📋'}
                    {category === 'Economics' && '📊'}
                    {category === 'Taxes' && '📄'}
                    {category === 'Retirement' && '🏖️'}
                  </div>
                  <p className="text-sm font-medium text-gray-700">{category}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 