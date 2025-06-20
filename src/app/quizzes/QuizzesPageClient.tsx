'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getQuizzes, Quiz, generateQuizSlug } from '../../lib/quizzes';

export default function QuizzesPageClient() {
  const router = useRouter();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState<Quiz[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
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
        setFilteredQuizzes(data); // Initialize filtered quizzes
        
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

  // Map quiz titles to their primary categories
  const getQuizCategory = (quiz: Quiz): string => {
    const title = quiz.title.toLowerCase();
    if (title.includes('invest')) return 'investing';
    if (title.includes('saving') || title.includes('emergency')) return 'savings';
    if (title.includes('credit')) return 'credit';
    if (title.includes('planning') || title.includes('budget')) return 'planning';
    if (title.includes('economic')) return 'economics';
    if (title.includes('tax')) return 'taxes';
    if (title.includes('retirement')) return 'retirement';
    return 'planning'; // default category
  };

  // Filter quizzes based on selected difficulty and category
  useEffect(() => {
    let filtered = quizzes;
    
    // Filter by difficulty
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(quiz => quiz.difficulty === selectedDifficulty);
    }
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(quiz => getQuizCategory(quiz) === selectedCategory);
    }
    
    setFilteredQuizzes(filtered);
  }, [quizzes, selectedDifficulty, selectedCategory]);

  const handleDifficultyFilter = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
    setSelectedCategory('all'); // Clear category filter when selecting difficulty
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    setSelectedDifficulty('all'); // Clear difficulty filter when selecting category
  };

  const startQuiz = (quiz: Quiz) => {
    const slug = generateQuizSlug(quiz.title);
    console.log('Navigating to quiz:', quiz.title, 'Slug:', slug);
    router.push(`/quizzes/${slug}`);
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
          

        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-xl p-2 shadow-lg">
            {selectedCategory !== 'all' && (
              <div className="text-center mb-3 px-4">
                <span className="text-sm text-blue-600 font-medium">
                  Filtered by category: {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
                </span>
              </div>
            )}
            <div className="flex gap-2">
              <button 
                onClick={() => handleDifficultyFilter('all')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  selectedDifficulty === 'all' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                All Quizzes
              </button>
              <button 
                onClick={() => handleDifficultyFilter('beginner')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  selectedDifficulty === 'beginner' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Beginner
              </button>
              <button 
                onClick={() => handleDifficultyFilter('intermediate')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  selectedDifficulty === 'intermediate' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Intermediate
              </button>
              <button 
                onClick={() => handleDifficultyFilter('advanced')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  selectedDifficulty === 'advanced' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Advanced
              </button>
            </div>
          </div>
        </div>
        
        {/* Quiz Cards */}
        {filteredQuizzes.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 items-stretch">
            {filteredQuizzes.map((quiz, index) => (
              <div 
                key={quiz.id} 
                className="card p-6 hover:shadow-xl transition-all duration-300 animate-scale-in group cursor-pointer h-full"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => startQuiz(quiz)}
              >
                <div className="text-center h-full flex flex-col">
                  <div className="flex justify-center items-center gap-2 mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      quiz.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                      quiz.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}
                    </span>
                    <span className="text-sm text-gray-500">
                      {quiz.time_limit} min
                    </span>
                  </div>
                  
                  <h2 className="text-heading-3 font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {quiz.title}
                  </h2>
                  
                  <p className="text-body text-gray-600 mb-6 leading-relaxed flex-grow line-clamp-4">
                    {quiz.description}
                  </p>
                  
                  <div className="mt-auto">
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
              </div>
            ))}
          </div>
        ) : quizzes.length > 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-8">🔍</div>
            <h2 className="text-heading-2 font-semibold text-gray-600 mb-4">No Quizzes Found</h2>
            <p className="text-body text-gray-500 mb-8">
              {selectedDifficulty !== 'all' && selectedCategory !== 'all' 
                ? `No quizzes match the selected difficulty (${selectedDifficulty}) and category (${selectedCategory}) filters.`
                : selectedDifficulty !== 'all' 
                ? `No quizzes match the selected difficulty level: ${selectedDifficulty}.`
                : `No quizzes match the selected category: ${selectedCategory}.`
              }
            </p>
            <div className="flex gap-4 justify-center">
              {selectedDifficulty !== 'all' && (
                <button
                  onClick={() => handleDifficultyFilter('all')}
                  className="btn-primary"
                >
                  Clear Difficulty Filter
                </button>
              )}
              {selectedCategory !== 'all' && (
                <button
                  onClick={() => handleCategoryFilter('all')}
                  className="btn-primary"
                >
                  Clear Category Filter
                </button>
              )}
              <button
                onClick={() => {
                  handleDifficultyFilter('all');
                  handleCategoryFilter('all');
                }}
                                 className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Show All Quizzes
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-8">📚</div>
            <h2 className="text-heading-2 font-semibold text-gray-600 mb-4">No Quizzes Available</h2>
            <p className="text-body text-gray-500 mb-8">
              It looks like the quiz database hasn't been set up yet. Please run the setup scripts to populate the quizzes.
            </p>
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
            <h3 className="text-heading-2 font-bold text-gray-900 mb-8 text-center">Filter by Category</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'All Categories', key: 'all', emoji: '📚' },
                { name: 'Investing', key: 'investing', emoji: '📈' },
                { name: 'Savings', key: 'savings', emoji: '💰' },
                { name: 'Credit', key: 'credit', emoji: '💳' },
                { name: 'Planning', key: 'planning', emoji: '📋' },
                { name: 'Economics', key: 'economics', emoji: '📊' },
                { name: 'Taxes', key: 'taxes', emoji: '📄' },
                { name: 'Retirement', key: 'retirement', emoji: '🏖️' }
              ].map((category, index) => (
                <button
                  key={category.key}
                  onClick={() => handleCategoryFilter(category.key)}
                  className={`rounded-xl p-4 text-center transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === category.key
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white/70 backdrop-blur-sm hover:bg-white text-gray-700 hover:shadow-md'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="text-2xl mb-2">{category.emoji}</div>
                  <p className="text-sm font-medium">{category.name}</p>
                  {selectedCategory === category.key && (
                    <div className="mt-2">
                      <div className="w-2 h-2 bg-white rounded-full mx-auto"></div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 