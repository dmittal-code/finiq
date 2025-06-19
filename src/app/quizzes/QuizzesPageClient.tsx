'use client';

import { useState, useEffect } from 'react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  timeLimit?: number; // in minutes
}

const quizzes: Quiz[] = [
  // ... (copy the quizzes array from page.tsx) ...
];

interface QuizState {
  currentQuiz: Quiz | null;
  currentQuestionIndex: number;
  selectedAnswers: number[];
  showResults: boolean;
  timeRemaining: number;
  isTimerRunning: boolean;
}

export default function QuizzesPageClient() {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuiz: null,
    currentQuestionIndex: 0,
    selectedAnswers: [],
    showResults: false,
    timeRemaining: 0,
    isTimerRunning: false
  });

  const startQuiz = (quiz: Quiz) => {
    setQuizState({
      currentQuiz: quiz,
      currentQuestionIndex: 0,
      selectedAnswers: new Array(quiz.questions.length).fill(-1),
      showResults: false,
      timeRemaining: (quiz.timeLimit || 0) * 60,
      isTimerRunning: true
    });
  };

  const selectAnswer = (answerIndex: number) => {
    if (!quizState.currentQuiz) return;
    const newSelectedAnswers = [...quizState.selectedAnswers];
    newSelectedAnswers[quizState.currentQuestionIndex] = answerIndex;
    setQuizState(prev => ({
      ...prev,
      selectedAnswers: newSelectedAnswers
    }));
  };

  const nextQuestion = () => {
    if (!quizState.currentQuiz) return;
    if (quizState.currentQuestionIndex < quizState.currentQuiz.questions.length - 1) {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }));
    } else {
      setQuizState(prev => ({
        ...prev,
        showResults: true,
        isTimerRunning: false
      }));
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

  const resetQuiz = () => {
    setQuizState({
      currentQuiz: null,
      currentQuestionIndex: 0,
      selectedAnswers: [],
      showResults: false,
      timeRemaining: 0,
      isTimerRunning: false
    });
  };

  const calculateScore = () => {
    if (!quizState.currentQuiz) return { correct: 0, total: 0, percentage: 0 };
    let correct = 0;
    quizState.currentQuiz.questions.forEach((question, index) => {
      if (quizState.selectedAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    const total = quizState.currentQuiz.questions.length;
    const percentage = Math.round((correct / total) * 100);
    return { correct, total, percentage };
  };

  const getScoreMessage = (percentage: number) => {
    if (percentage >= 90) return { message: 'Excellent! You\'re a financial expert!', color: 'text-green-600', icon: '🏆' };
    if (percentage >= 80) return { message: 'Great job! You have strong financial knowledge!', color: 'text-green-500', icon: '🎉' };
    if (percentage >= 70) return { message: 'Good work! You understand the basics well!', color: 'text-blue-500', icon: '👍' };
    if (percentage >= 60) return { message: 'Not bad! Keep learning to improve!', color: 'text-yellow-600', icon: '📚' };
    return { message: 'Keep studying! Financial literacy is a journey!', color: 'text-red-500', icon: '💪' };
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (quizState.isTimerRunning && quizState.timeRemaining > 0) {
      interval = setInterval(() => {
        setQuizState(prev => {
          if (prev.timeRemaining <= 1) {
            return { ...prev, showResults: true, isTimerRunning: false };
          }
          return { ...prev, timeRemaining: prev.timeRemaining - 1 };
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [quizState.isTimerRunning, quizState.timeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (quizState.currentQuiz && !quizState.showResults) {
    const currentQuestion = quizState.currentQuiz.questions[quizState.currentQuestionIndex];
    const isAnswered = quizState.selectedAnswers[quizState.currentQuestionIndex] !== -1;
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
                Question <span className="font-semibold text-blue-600">{quizState.currentQuestionIndex + 1}</span> of <span className="font-semibold text-gray-800">{quizState.currentQuiz.questions.length}</span>
              </div>
              {quizState.currentQuiz.timeLimit && (
                <div className="text-body font-medium text-gray-700 bg-white/80 px-4 py-2 rounded-xl shadow-sm">
                  ⏱️ Time: {formatTime(quizState.timeRemaining)}
                </div>
              )}
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-8">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${((quizState.currentQuestionIndex + 1) / quizState.currentQuiz.questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
          {/* Question */}
          <div className="card p-8 mb-8 animate-scale-in">
            <h2 className="text-heading-2 font-semibold text-gray-900 mb-8 leading-relaxed">
              {currentQuestion.question}
            </h2>
            {/* Options */}
            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => selectAnswer(index)}
                  className={`w-full p-6 text-left rounded-xl border-2 transition-all duration-300 transform hover:scale-[1.02] ${
                    quizState.selectedAnswers[quizState.currentQuestionIndex] === index
                      ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-800 shadow-lg'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                  }`}
                >
                  <span className="font-semibold mr-4 text-lg">{String.fromCharCode(65 + index)}.</span>
                  <span className="text-body leading-relaxed">{option}</span>
                </button>
              ))}
            </div>
          </div>
          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={resetQuiz}
              className="btn-secondary"
            >
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
                {quizState.currentQuestionIndex === quizState.currentQuiz.questions.length - 1 ? '🎯 Finish' : 'Next →'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (quizState.currentQuiz && quizState.showResults) {
    const score = calculateScore();
    const scoreMessage = getScoreMessage(score.percentage);
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Results Header */}
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-heading-1 font-bold text-gray-900 mb-4">
              Quiz Results
            </h1>
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
              {quizState.currentQuiz.questions.map((question, index) => {
                const selectedAnswer = quizState.selectedAnswers[index];
                const isCorrect = selectedAnswer === question.correctAnswer;
                return (
                  <div key={index} className="border-l-4 border-gray-200 pl-6 py-4">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg ${
                        isCorrect ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' : 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
                      }`}>
                        {isCorrect ? '✓' : '✗'}
                      </div>
                      <div className="flex-1">
                        <p className="text-heading-3 font-semibold text-gray-900 mb-4 leading-relaxed">
                          Question {index + 1}: {question.question}
                        </p>
                        <div className="space-y-2 mb-4">
                          {question.options.map((option, optionIndex) => (
                            <div
                              key={optionIndex}
                              className={`p-4 rounded-xl border-2 ${
                                optionIndex === question.correctAnswer
                                  ? 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-800 border-green-300'
                                  : optionIndex === selectedAnswer && !isCorrect
                                  ? 'bg-gradient-to-r from-red-50 to-pink-50 text-red-800 border-red-300'
                                  : 'bg-gray-50 text-gray-600 border-gray-200'
                              }`}
                            >
                              <span className="font-semibold mr-3">{String.fromCharCode(65 + optionIndex)}.</span> 
                              <span className="text-body">{option}</span>
                            </div>
                          ))}
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
            <button
              onClick={resetQuiz}
              className="btn-primary text-lg px-10 py-4"
            >
              🎯 Take Another Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Selection Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-heading-1 font-bold text-gray-900 mb-6">
            Financial Literacy Quizzes
          </h1>
          <p className="text-body-large text-gray-600 leading-relaxed">
            Test your knowledge and track your progress in financial literacy
          </p>
        </div>
        {/* Quiz Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {quizzes.map((quiz, index) => (
            <div 
              key={quiz.id} 
              className="card p-8 hover:shadow-xl transition-all duration-300 animate-scale-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="text-center">
                <h2 className="text-heading-2 font-bold text-gray-900 mb-4">{quiz.title}</h2>
                <p className="text-body text-gray-600 mb-8 leading-relaxed">{quiz.description}</p>
                <div className="flex justify-center items-center gap-8 mb-8 text-body-small text-gray-500">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
                    {quiz.questions.length} Questions
                  </div>
                  {quiz.timeLimit && (
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></span>
                      {quiz.timeLimit} Minutes
                    </div>
                  )}
                </div>
                <button
                  onClick={() => startQuiz(quiz)}
                  className="w-full btn-primary text-lg py-4"
                >
                  🚀 Start Quiz
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Features */}
        <div className="card p-10 animate-fade-in">
          <h3 className="text-heading-2 font-bold text-gray-900 mb-8 text-center">Quiz Features</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-2xl">📊</span>
              </div>
              <h4 className="text-heading-3 font-semibold text-gray-900 mb-3">Detailed Results</h4>
              <p className="text-body text-gray-600 leading-relaxed">Get explanations for every question and track your progress</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-2xl">⏱️</span>
              </div>
              <h4 className="text-heading-3 font-semibold text-gray-900 mb-3">Timed Quizzes</h4>
              <p className="text-body text-gray-600 leading-relaxed">Challenge yourself with time limits to simulate real exam conditions</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-2xl">🎯</span>
              </div>
              <h4 className="text-heading-3 font-semibold text-gray-900 mb-3">Multiple Topics</h4>
              <p className="text-body text-gray-600 leading-relaxed">Cover various financial concepts from basic terms to investment strategies</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 