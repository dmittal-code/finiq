'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { getQuizWithQuestions, Quiz, checkQuizAnswer, calculateQuizScore, updateQuestionStats } from '../../../lib/quizzes';

interface QuizState {
  currentQuiz: Quiz | null;
  currentQuestionIndex: number;
  selectedAnswers: { questionId: number; selectedOptions: number[] }[];
  showResults: boolean;
  timeRemaining: number;
  isTimerRunning: boolean;
}

interface QuizPageClientProps {
  quizId: number;
}

export default function QuizPageClient({ quizId }: QuizPageClientProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuiz: null,
    currentQuestionIndex: 0,
    selectedAnswers: [],
    showResults: false,
    timeRemaining: 0,
    isTimerRunning: false
  });

  // Load the quiz when component mounts
  useEffect(() => {
    async function loadQuiz() {
      try {
        console.log('Loading quiz with ID:', quizId);
        setLoading(true);
        setError(null);
        
        const quizWithQuestions = await getQuizWithQuestions(quizId);
        console.log('Quiz with questions loaded:', quizWithQuestions);
        
        if (!quizWithQuestions) {
          setError('Quiz not found. Please check the URL and try again.');
          setLoading(false);
          return;
        }

        if (!quizWithQuestions.questions || quizWithQuestions.questions.length === 0) {
          setError('This quiz has no questions yet. Please try another quiz.');
          setLoading(false);
          return;
        }

        console.log('Setting quiz state with', quizWithQuestions.questions.length, 'questions');
        setQuizState({
          currentQuiz: quizWithQuestions,
          currentQuestionIndex: 0,
          selectedAnswers: [],
          showResults: false,
          timeRemaining: (quizWithQuestions.time_limit || 0) * 60,
          isTimerRunning: quizWithQuestions.time_limit ? true : false
        });
        setLoading(false);
      } catch (err) {
        console.error('Error loading quiz:', err);
        
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        if (errorMessage.includes('relation') || errorMessage.includes('does not exist')) {
          setError('Database tables not found. Please set up the quiz database first.');
        } else if (errorMessage.includes('permission')) {
          setError('Database permission error. Please check your Supabase configuration.');
        } else {
          setError(`Failed to load quiz: ${errorMessage}`);
        }
        setLoading(false);
      }
    }

    loadQuiz();
  }, [quizId]);

  const selectAnswer = (optionId: number) => {
    if (!quizState.currentQuiz?.questions) return;
    
    const currentQuestion = quizState.currentQuiz.questions[quizState.currentQuestionIndex];
    const existingAnswerIndex = quizState.selectedAnswers.findIndex(
      answer => answer.questionId === currentQuestion.id
    );

    const newSelectedAnswers = [...quizState.selectedAnswers];

    if (currentQuestion.question_type === 'multiple_choice') {
      // For multiple choice, toggle the option
      if (existingAnswerIndex >= 0) {
        const currentOptions = newSelectedAnswers[existingAnswerIndex].selectedOptions;
        if (currentOptions.includes(optionId)) {
          newSelectedAnswers[existingAnswerIndex].selectedOptions = currentOptions.filter(id => id !== optionId);
        } else {
          newSelectedAnswers[existingAnswerIndex].selectedOptions = [...currentOptions, optionId];
        }
      } else {
        newSelectedAnswers.push({
          questionId: currentQuestion.id,
          selectedOptions: [optionId]
        });
      }
    } else {
      // For single choice and true/false, replace the selection
      if (existingAnswerIndex >= 0) {
        newSelectedAnswers[existingAnswerIndex].selectedOptions = [optionId];
      } else {
        newSelectedAnswers.push({
          questionId: currentQuestion.id,
          selectedOptions: [optionId]
        });
      }
    }

    setQuizState(prev => ({
      ...prev,
      selectedAnswers: newSelectedAnswers
    }));
  };

  const nextQuestion = () => {
    if (!quizState.currentQuiz?.questions) return;
    
    if (quizState.currentQuestionIndex < quizState.currentQuiz.questions.length - 1) {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }));
    } else {
      finishQuiz();
    }
  };

  const previousQuestion = () => {
    if (quizState.currentQuestionIndex > 0) {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1
      }));
    }
  };

  const finishQuiz = useCallback(async () => {
    if (!quizState.currentQuiz?.questions) return;

    // Update question statistics
    for (const question of quizState.currentQuiz.questions) {
      const userAnswer = quizState.selectedAnswers.find(answer => answer.questionId === question.id);
      if (userAnswer) {
        const isCorrect = checkQuizAnswer(question, userAnswer.selectedOptions);
        await updateQuestionStats(question.id, isCorrect);
      }
    }

    setQuizState(prev => ({
      ...prev,
      showResults: true,
      isTimerRunning: false
    }));
  }, [quizState.currentQuiz?.questions, quizState.selectedAnswers]);

  const goBackToQuizzes = () => {
    router.push('/quizzes');
  };

  const restartQuiz = () => {
    if (!quizState.currentQuiz) return;
    
    setQuizState({
      currentQuiz: quizState.currentQuiz,
      currentQuestionIndex: 0,
      selectedAnswers: [],
      showResults: false,
      timeRemaining: (quizState.currentQuiz.time_limit || 0) * 60,
      isTimerRunning: quizState.currentQuiz.time_limit ? true : false
    });
  };

  const calculateScore = () => {
    if (!quizState.currentQuiz?.questions) return { correct: 0, total: 0, percentage: 0 };
    
    const score = calculateQuizScore(quizState.currentQuiz.questions, quizState.selectedAnswers);
    const total = quizState.currentQuiz.questions.length;
    const correct = Math.round((score / 100) * total);
    
    return { correct, total, percentage: score };
  };

  const getScoreMessage = (percentage: number) => {
    if (percentage >= 90) return { message: 'Excellent! You\'re a financial expert!', color: 'text-green-600', icon: '🏆' };
    if (percentage >= 80) return { message: 'Great job! You have strong financial knowledge!', color: 'text-green-500', icon: '🎉' };
    if (percentage >= 70) return { message: 'Good work! You understand the basics well!', color: 'text-blue-500', icon: '👍' };
    if (percentage >= 60) return { message: 'Not bad! Keep learning to improve!', color: 'text-yellow-600', icon: '📚' };
    return { message: 'Keep studying! Financial literacy is a journey!', color: 'text-red-500', icon: '💪' };
  };

  const getCurrentQuestionAnswer = () => {
    if (!quizState.currentQuiz?.questions) return null;
    const currentQuestion = quizState.currentQuiz.questions[quizState.currentQuestionIndex];
    return quizState.selectedAnswers.find(answer => answer.questionId === currentQuestion.id);
  };

  const isOptionSelected = (optionId: number) => {
    const currentAnswer = getCurrentQuestionAnswer();
    return currentAnswer?.selectedOptions.includes(optionId) || false;
  };

  const isCurrentQuestionAnswered = () => {
    const currentAnswer = getCurrentQuestionAnswer();
    return currentAnswer && currentAnswer.selectedOptions.length > 0;
  };

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (quizState.isTimerRunning && quizState.timeRemaining > 0) {
      interval = setInterval(() => {
        setQuizState(prev => {
          if (prev.timeRemaining <= 1) {
            finishQuiz();
            return { ...prev, timeRemaining: 0, isTimerRunning: false };
          }
          return { ...prev, timeRemaining: prev.timeRemaining - 1 };
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [quizState.isTimerRunning, quizState.timeRemaining, finishQuiz]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
        <div className="max-w-4xl mx-auto text-center py-20">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-8"></div>
          <h2 className="text-heading-2 font-semibold text-gray-600">Loading quiz...</h2>
          <p className="text-body text-gray-500 mt-4">Preparing your quiz experience...</p>
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
          <h2 className="text-heading-2 font-semibold text-red-600 mb-4">Error Loading Quiz</h2>
          <p className="text-body text-gray-600 mb-8">{error}</p>
          <div className="flex gap-4 justify-center">
            <button onClick={goBackToQuizzes} className="btn-primary">
              Back to Quizzes
            </button>
            <button onClick={() => window.location.reload()} className="btn-secondary">
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Results screen
  if (quizState.currentQuiz && quizState.showResults) {
    const score = calculateScore();
    const scoreMessage = getScoreMessage(score.percentage);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Results Header */}
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-heading-1 font-bold text-gray-900 mb-4">Quiz Results</h1>
            <h2 className="text-heading-2 text-gray-600 mb-8">{quizState.currentQuiz.title}</h2>
            
            {/* Score Display */}
            <div className="card p-10 mb-8 animate-scale-in">
              <div className="text-7xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                {score.percentage}%
              </div>
              <div className={`text-heading-2 font-semibold mb-4 ${scoreMessage.color} flex items-center justify-center gap-3`}>
                <span>{scoreMessage.icon}</span>
                {scoreMessage.message}
              </div>
              <div className="text-body-large text-gray-600">
                You got <span className="font-semibold text-blue-600">{score.correct}</span> out of <span className="font-semibold text-gray-800">{score.total}</span> questions correct.
              </div>
            </div>
          </div>
          
          {/* Detailed Results */}
          <div className="card p-8 mb-8 animate-slide-in-left">
            <h3 className="text-heading-2 font-bold text-gray-900 mb-8">Question Review</h3>
            <div className="space-y-8">
              {quizState.currentQuiz.questions?.map((question, index) => {
                const userAnswer = quizState.selectedAnswers.find(answer => answer.questionId === question.id);
                const isCorrect = userAnswer ? checkQuizAnswer(question, userAnswer.selectedOptions) : false;
                
                return (
                  <div key={question.id} className="border-l-4 border-gray-200 pl-6 py-4">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg ${
                        isCorrect ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' : 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
                      }`}>
                        {isCorrect ? '✓' : '✗'}
                      </div>
                      <div className="flex-1">
                        <p className="text-heading-3 font-semibold text-gray-900 mb-4 leading-relaxed">
                          Question {index + 1}: {question.question_text}
                        </p>
                        <div className="space-y-2 mb-4">
                          {question.options?.map((option) => {
                            const isUserSelected = userAnswer?.selectedOptions.includes(option.id) || false;
                            const isCorrectOption = option.is_correct;
                            
                            return (
                              <div
                                key={option.id}
                                className={`p-4 rounded-xl border-2 ${
                                  isCorrectOption
                                    ? 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-800 border-green-300'
                                    : isUserSelected && !isCorrect
                                    ? 'bg-gradient-to-r from-red-50 to-pink-50 text-red-800 border-red-300'
                                    : 'bg-gray-50 text-gray-600 border-gray-200'
                                }`}
                              >
                                <span className="font-semibold mr-3">
                                  {String.fromCharCode(65 + (option.option_order - 1))}.
                                </span> 
                                <span className="text-body">{option.option_text}</span>
                                {isCorrectOption && <span className="float-right text-green-600">✓ Correct</span>}
                                {isUserSelected && !isCorrectOption && <span className="float-right text-red-600">✗ Your choice</span>}
                              </div>
                            );
                          })}
                        </div>
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-400 p-4 rounded-r-xl">
                          <p className="text-body text-blue-800 leading-relaxed">
                            <strong>Explanation:</strong> {question.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-center gap-6">
            <button onClick={restartQuiz} className="btn-secondary text-lg px-10 py-4">
              🔄 Retake Quiz
            </button>
            <button onClick={goBackToQuizzes} className="btn-primary text-lg px-10 py-4">
              🎯 Browse More Quizzes
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz taking screen
  if (quizState.currentQuiz && !quizState.showResults) {
    const currentQuestion = quizState.currentQuiz.questions?.[quizState.currentQuestionIndex];
    if (!currentQuestion) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
          <div className="max-w-4xl mx-auto text-center py-20">
            <div className="text-6xl mb-8">❓</div>
            <h2 className="text-heading-2 font-semibold text-red-600 mb-4">Question Not Found</h2>
            <p className="text-body text-gray-600 mb-8">Unable to load quiz question.</p>
            <button onClick={goBackToQuizzes} className="btn-primary">Back to Quizzes</button>
          </div>
        </div>
      );
    }

    const isAnswered = isCurrentQuestionAnswered();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-heading-1 font-bold text-gray-900 mb-4">
              {quizState.currentQuiz.title}
            </h1>
            <p className="text-body-large text-gray-600 mb-6">{quizState.currentQuiz.description}</p>
            {/* Progress and Timer */}
            <div className="flex justify-between items-center mb-6">
              <div className="text-body text-gray-600">
                Question <span className="font-semibold text-blue-600">{quizState.currentQuestionIndex + 1}</span> of <span className="font-semibold text-gray-800">{quizState.currentQuiz.questions?.length || 0}</span>
              </div>
              {quizState.currentQuiz.time_limit && (
                <div className="text-body font-medium text-gray-700 bg-white/80 px-4 py-2 rounded-xl shadow-sm">
                  ⏱️ Time: {formatTime(quizState.timeRemaining)}
                </div>
              )}
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-8">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${((quizState.currentQuestionIndex + 1) / (quizState.currentQuiz.questions?.length || 1)) * 100}%` }}
              ></div>
            </div>
          </div>
          
          {/* Question */}
          <div className="card p-8 mb-8 animate-scale-in">
            <h2 className="text-heading-2 font-semibold text-gray-900 mb-8 leading-relaxed">
              {currentQuestion.question_text}
            </h2>
            
            {/* Category and Difficulty Badge */}
            <div className="flex gap-2 mb-6">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {currentQuestion.category}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                currentQuestion.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                currentQuestion.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)}
              </span>
            </div>

            {/* Instructions for multiple choice */}
            {currentQuestion.question_type === 'multiple_choice' && (
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <strong>Multiple Choice:</strong> Select all correct answers.
                </p>
              </div>
            )}
            
            {/* Options */}
            <div className="space-y-4">
              {currentQuestion.options?.map((option) => (
                <button
                  key={option.id}
                  onClick={() => selectAnswer(option.id)}
                  className={`w-full p-6 text-left rounded-xl border-2 transition-all duration-300 transform hover:scale-[1.02] ${
                    isOptionSelected(option.id)
                      ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-800 shadow-lg'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                  }`}
                >
                  <span className="font-semibold mr-4 text-lg">
                    {String.fromCharCode(65 + (option.option_order - 1))}.
                  </span>
                  <span className="text-body leading-relaxed">{option.option_text}</span>
                  {currentQuestion.question_type === 'multiple_choice' && isOptionSelected(option.id) && (
                    <span className="float-right text-blue-600">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
          
          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button onClick={goBackToQuizzes} className="btn-secondary">
              🚪 Exit Quiz
            </button>
            <div className="flex gap-4">
              <button
                onClick={previousQuestion}
                disabled={quizState.currentQuestionIndex === 0}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ← Previous
              </button>
              <button
                onClick={nextQuestion}
                disabled={!isAnswered}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {quizState.currentQuestionIndex === (quizState.currentQuiz.questions?.length || 1) - 1 ? '🎯 Finish' : 'Next →'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback (shouldn't reach here)
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto text-center py-20">
        <div className="text-6xl mb-8">🤔</div>
        <h2 className="text-heading-2 font-semibold text-gray-600 mb-4">Something went wrong</h2>
        <button onClick={goBackToQuizzes} className="btn-primary">
          Back to Quizzes
        </button>
      </div>
    </div>
  );
} 