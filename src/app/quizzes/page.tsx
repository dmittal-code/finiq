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
  {
    id: 'basic-financial-terms',
    title: 'Basic Financial Terms',
    description: 'Test your knowledge of fundamental financial concepts and terminology.',
    timeLimit: 15,
    questions: [
      {
        id: 1,
        question: 'What is compound interest?',
        options: [
          'Interest earned only on the principal amount',
          'Interest earned on both principal and previously earned interest',
          'A type of bank account',
          'A government tax on savings'
        ],
        correctAnswer: 1,
        explanation: 'Compound interest is interest earned on both the principal amount and any previously earned interest. This is why it\'s often called "interest on interest" and helps money grow faster over time.'
      },
      {
        id: 2,
        question: 'What is an emergency fund?',
        options: [
          'Money saved for vacation',
          'A savings account with 3-6 months of living expenses',
          'Investment in stocks',
          'A type of insurance policy'
        ],
        correctAnswer: 1,
        explanation: 'An emergency fund is a savings account with 3-6 months of living expenses set aside for unexpected financial emergencies like job loss or medical bills.'
      },
      {
        id: 3,
        question: 'What does APR stand for?',
        options: [
          'Annual Payment Rate',
          'Annual Percentage Rate',
          'Average Payment Return',
          'Annual Profit Ratio'
        ],
        correctAnswer: 1,
        explanation: 'APR stands for Annual Percentage Rate. It\'s the yearly interest rate charged on loans or credit cards, including fees, and helps you compare the true cost of borrowing money.'
      },
      {
        id: 4,
        question: 'What is diversification in investing?',
        options: [
          'Putting all money in one stock',
          'Spreading investments across different assets to reduce risk',
          'Only investing in government bonds',
          'Saving money in a bank account'
        ],
        correctAnswer: 1,
        explanation: 'Diversification is spreading investments across different assets, sectors, or geographic regions to reduce risk. The saying goes: "Don\'t put all your eggs in one basket."'
      },
      {
        id: 5,
        question: 'What is a credit score?',
        options: [
          'Your bank account balance',
          'A three-digit number representing your creditworthiness',
          'The amount of money you earn',
          'Your monthly expenses'
        ],
        correctAnswer: 1,
        explanation: 'A credit score is a three-digit number (300-850) that represents your creditworthiness. Higher scores help you get better loan terms and lower interest rates.'
      },
      {
        id: 6,
        question: 'What is inflation?',
        options: [
          'When prices decrease over time',
          'The rate at which prices increase over time',
          'A type of investment',
          'A government subsidy'
        ],
        correctAnswer: 1,
        explanation: 'Inflation is the rate at which prices for goods and services increase over time, reducing the purchasing power of money.'
      },
      {
        id: 7,
        question: 'What is a budget?',
        options: [
          'A type of bank account',
          'A financial plan tracking income and expenses',
          'A government program',
          'A type of investment'
        ],
        correctAnswer: 1,
        explanation: 'A budget is a financial plan that tracks income and expenses to help you spend within your means and save for goals.'
      },
      {
        id: 8,
        question: 'What is net worth?',
        options: [
          'Your monthly salary',
          'The difference between assets and liabilities',
          'Your bank account balance',
          'The amount you owe on loans'
        ],
        correctAnswer: 1,
        explanation: 'Net worth is the difference between your total assets (what you own) and total liabilities (what you owe). It\'s a measure of your financial health.'
      },
      {
        id: 9,
        question: 'What is liquidity?',
        options: [
          'The amount of water you drink',
          'How easily an asset can be converted to cash',
          'A type of investment fund',
          'Your monthly expenses'
        ],
        correctAnswer: 1,
        explanation: 'Liquidity is how easily an asset can be converted to cash without losing value. Cash is the most liquid asset, while real estate is less liquid.'
      },
      {
        id: 10,
        question: 'What is a mutual fund?',
        options: [
          'A type of bank account',
          'An investment vehicle pooling money from many investors',
          'A government bond',
          'A type of insurance'
        ],
        correctAnswer: 1,
        explanation: 'A mutual fund is an investment vehicle that pools money from many investors to buy a diversified portfolio of stocks, bonds, or other securities.'
      }
    ]
  },
  {
    id: 'investment-fundamentals',
    title: 'Investment Fundamentals',
    description: 'Test your understanding of investment concepts, strategies, and financial markets.',
    timeLimit: 20,
    questions: [
      {
        id: 1,
        question: 'What is ROI?',
        options: [
          'Return on Insurance',
          'Return on Investment',
          'Rate of Interest',
          'Return on Income'
        ],
        correctAnswer: 1,
        explanation: 'ROI (Return on Investment) is a measure of the profitability of an investment, calculated as (Gain - Cost) / Cost × 100. It shows how much money you made relative to what you invested.'
      },
      {
        id: 2,
        question: 'What is an index fund?',
        options: [
          'A fund that tracks a specific market index',
          'A type of bank account',
          'A government bond',
          'A type of insurance policy'
        ],
        correctAnswer: 0,
        explanation: 'An index fund is a type of mutual fund that tracks a specific market index (like the S&P 500), providing broad market exposure at low costs.'
      },
      {
        id: 3,
        question: 'What is asset allocation?',
        options: [
          'The distribution of investments across different asset classes',
          'How much money you have in the bank',
          'A type of investment strategy',
          'The amount of taxes you pay'
        ],
        correctAnswer: 0,
        explanation: 'Asset allocation is the distribution of investments across different asset classes (stocks, bonds, cash, real estate) based on your goals, time horizon, and risk tolerance.'
      },
      {
        id: 4,
        question: 'What are capital gains?',
        options: [
          'Money you earn from a job',
          'Profits from selling investments for more than you paid',
          'Interest earned on savings',
          'Government benefits'
        ],
        correctAnswer: 1,
        explanation: 'Capital gains are profits earned from selling an investment or asset for more than you paid for it. These may be subject to capital gains tax.'
      },
      {
        id: 5,
        question: 'What is risk tolerance?',
        options: [
          'How much money you can afford to lose',
          'Your ability and willingness to lose some investment for greater returns',
          'The amount of insurance you need',
          'Your monthly budget'
        ],
        correctAnswer: 1,
        explanation: 'Risk tolerance is your ability and willingness to lose some or all of your original investment in exchange for greater potential returns. It affects your investment strategy.'
      },
      {
        id: 6,
        question: 'What is a 401(k)?',
        options: [
          'A type of bank account',
          'A retirement savings plan offered by employers',
          'A government bond',
          'A type of insurance'
        ],
        correctAnswer: 1,
        explanation: 'A 401(k) is a retirement savings plan offered by employers where you can contribute pre-tax money, often with employer matching contributions.'
      },
      {
        id: 7,
        question: 'What is the time value of money?',
        options: [
          'How much time you spend managing money',
          'Money available today is worth more than the same amount in the future',
          'The time it takes to earn money',
          'A type of investment strategy'
        ],
        correctAnswer: 1,
        explanation: 'The time value of money is the concept that money available today is worth more than the same amount in the future due to its potential earning capacity through interest or investment returns.'
      },
      {
        id: 8,
        question: 'What is a stock?',
        options: [
          'A type of bond',
          'A share of ownership in a company',
          'A type of bank account',
          'A government security'
        ],
        correctAnswer: 1,
        explanation: 'A stock represents a share of ownership in a company. When you buy stock, you become a partial owner of that company and may receive dividends and voting rights.'
      },
      {
        id: 9,
        question: 'What is a bond?',
        options: [
          'A type of stock',
          'A loan you make to a company or government',
          'A type of bank account',
          'A type of insurance'
        ],
        correctAnswer: 1,
        explanation: 'A bond is essentially a loan you make to a company or government. In return, they promise to pay you back with interest over a specified period.'
      },
      {
        id: 10,
        question: 'What is dollar-cost averaging?',
        options: [
          'Spending exactly one dollar per day',
          'Investing a fixed amount regularly regardless of market conditions',
          'A type of budgeting method',
          'A way to calculate interest'
        ],
        correctAnswer: 1,
        explanation: 'Dollar-cost averaging is investing a fixed amount of money regularly (like monthly) regardless of market conditions. This strategy can help reduce the impact of market volatility.'
      }
    ]
  }
];

interface QuizState {
  currentQuiz: Quiz | null;
  currentQuestionIndex: number;
  selectedAnswers: number[];
  showResults: boolean;
  timeRemaining: number;
  isTimerRunning: boolean;
}

export default function QuizzesPage() {
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
    if (percentage >= 90) return { message: 'Excellent! You\'re a financial expert!', color: 'text-green-600' };
    if (percentage >= 80) return { message: 'Great job! You have strong financial knowledge!', color: 'text-green-500' };
    if (percentage >= 70) return { message: 'Good work! You understand the basics well!', color: 'text-blue-500' };
    if (percentage >= 60) return { message: 'Not bad! Keep learning to improve!', color: 'text-yellow-600' };
    return { message: 'Keep studying! Financial literacy is a journey!', color: 'text-red-500' };
  };

  // Timer effect
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
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              {quizState.currentQuiz.title}
            </h1>
            <p className="text-gray-600 mb-4">{quizState.currentQuiz.description}</p>
            
            {/* Progress and Timer */}
            <div className="flex justify-between items-center mb-6">
              <div className="text-sm text-gray-600">
                Question {quizState.currentQuestionIndex + 1} of {quizState.currentQuiz.questions.length}
              </div>
              {quizState.currentQuiz.timeLimit && (
                <div className="text-sm font-medium text-gray-700">
                  Time: {formatTime(quizState.timeRemaining)}
                </div>
              )}
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div 
                className="bg-gradient-to-r from-purple-400 to-indigo-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${((quizState.currentQuestionIndex + 1) / quizState.currentQuiz.questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">
              {currentQuestion.question}
            </h2>
            
            {/* Options */}
            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => selectAnswer(index)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                    quizState.selectedAnswers[quizState.currentQuestionIndex] === index
                      ? 'border-purple-500 bg-purple-50 text-purple-800'
                      : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                  }`}
                >
                  <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={resetQuiz}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Exit Quiz
            </button>
            
            <div className="flex gap-4">
              <button
                onClick={previousQuestion}
                disabled={quizState.currentQuestionIndex === 0}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ← Previous
              </button>
              
              <button
                onClick={nextQuestion}
                disabled={!isAnswered}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {quizState.currentQuestionIndex === quizState.currentQuiz.questions.length - 1 ? 'Finish' : 'Next →'}
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
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Results Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Quiz Results
            </h1>
            <h2 className="text-xl text-gray-600 mb-6">{quizState.currentQuiz.title}</h2>
            
            {/* Score Display */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <div className="text-6xl font-bold text-purple-600 mb-4">
                {score.percentage}%
              </div>
              <div className={`text-xl font-semibold mb-4 ${scoreMessage.color}`}>
                {scoreMessage.message}
              </div>
              <div className="text-gray-600">
                You got {score.correct} out of {score.total} questions correct.
              </div>
            </div>
          </div>

          {/* Detailed Results */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Question Review</h3>
            <div className="space-y-6">
              {quizState.currentQuiz.questions.map((question, index) => {
                const selectedAnswer = quizState.selectedAnswers[index];
                const isCorrect = selectedAnswer === question.correctAnswer;
                
                return (
                  <div key={index} className="border-l-4 border-gray-200 pl-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                        isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                      }`}>
                        {isCorrect ? '✓' : '✗'}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 mb-2">
                          Question {index + 1}: {question.question}
                        </p>
                        <div className="space-y-1">
                          {question.options.map((option, optionIndex) => (
                            <div
                              key={optionIndex}
                              className={`p-2 rounded ${
                                optionIndex === question.correctAnswer
                                  ? 'bg-green-100 text-green-800 border border-green-300'
                                  : optionIndex === selectedAnswer && !isCorrect
                                  ? 'bg-red-100 text-red-800 border border-red-300'
                                  : 'bg-gray-50 text-gray-600'
                              }`}
                            >
                              <span className="font-medium">{String.fromCharCode(65 + optionIndex)}.</span> {option}
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm text-blue-800">
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
          <div className="flex justify-center gap-4">
            <button
              onClick={resetQuiz}
              className="px-8 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              Take Another Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Selection Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Financial Literacy Quizzes
          </h1>
          <p className="text-xl text-gray-600">
            Test your knowledge and track your progress in financial literacy
          </p>
        </div>

        {/* Quiz Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {quizzes.map((quiz) => (
            <div key={quiz.id} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">{quiz.title}</h2>
                <p className="text-gray-600 mb-6">{quiz.description}</p>
                
                <div className="flex justify-center items-center gap-6 mb-6 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    {quiz.questions.length} Questions
                  </div>
                  {quiz.timeLimit && (
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      {quiz.timeLimit} Minutes
                    </div>
                  )}
                </div>
                
                <button
                  onClick={() => startQuiz(quiz)}
                  className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg hover:from-purple-600 hover:to-indigo-600 transition-all duration-200 font-semibold"
                >
                  Start Quiz
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Quiz Features</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📊</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Detailed Results</h4>
              <p className="text-gray-600 text-sm">Get explanations for every question and track your progress</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">⏱️</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Timed Quizzes</h4>
              <p className="text-gray-600 text-sm">Challenge yourself with time limits to simulate real exam conditions</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🎯</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Multiple Topics</h4>
              <p className="text-gray-600 text-sm">Cover various financial concepts from basic terms to investment strategies</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 