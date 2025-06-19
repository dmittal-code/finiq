'use client';

import { useState, useEffect } from 'react';

interface Flashcard {
  id: number;
  term: string;
  definition: string;
  category: string;
}

const flashcards: Flashcard[] = [
  { id: 1, term: 'Compound Interest', definition: 'Interest earned on both the principal amount and any previously earned interest. It\'s often called \'interest on interest\' and helps money grow faster over time.', category: 'Investing' },
  { id: 2, term: 'Emergency Fund', definition: 'A savings account with 3-6 months of living expenses set aside for unexpected financial emergencies like job loss or medical bills.', category: 'Savings' },
  { id: 3, term: 'Diversification', definition: 'Spreading investments across different assets, sectors, or geographic regions to reduce risk. The saying goes: \'Don\'t put all your eggs in one basket.\'', category: 'Investing' },
  { id: 4, term: 'Credit Score', definition: 'A three-digit number (300-850) that represents your creditworthiness. Higher scores help you get better loan terms and lower interest rates.', category: 'Credit' },
  { id: 5, term: 'Budget', definition: 'A financial plan that tracks income and expenses to help you spend within your means and save for goals.', category: 'Planning' },
  { id: 6, term: 'Inflation', definition: 'The rate at which prices for goods and services increase over time, reducing the purchasing power of money.', category: 'Economics' },
  { id: 7, term: 'Mutual Fund', definition: 'An investment vehicle that pools money from many investors to buy a diversified portfolio of stocks, bonds, or other securities.', category: 'Investing' },
  { id: 8, term: 'Net Worth', definition: 'The difference between your total assets (what you own) and total liabilities (what you owe). It\'s a measure of your financial health.', category: 'Planning' },
  { id: 9, term: 'ROI (Return on Investment)', definition: 'A measure of the profitability of an investment, calculated as (Gain - Cost) / Cost × 100. Shows how much money you made relative to what you invested.', category: 'Investing' },
  { id: 10, term: 'Liquidity', definition: 'How easily an asset can be converted to cash without losing value. Cash is the most liquid asset, while real estate is less liquid.', category: 'Investing' },
  { id: 11, term: 'Debt-to-Income Ratio', definition: 'A percentage that compares your monthly debt payments to your monthly income. Lenders use this to assess your ability to take on new debt.', category: 'Credit' },
  { id: 12, term: 'Tax Deduction', definition: 'An expense that can be subtracted from your taxable income, reducing the amount of tax you owe. Examples include student loan interest and charitable donations.', category: 'Taxes' },
  { id: 13, term: 'Asset Allocation', definition: 'The distribution of investments across different asset classes (stocks, bonds, cash, real estate) based on your goals, time horizon, and risk tolerance.', category: 'Investing' },
  { id: 14, term: 'APR (Annual Percentage Rate)', definition: 'The yearly interest rate charged on loans or credit cards, including fees. It helps you compare the true cost of borrowing money.', category: 'Credit' },
  { id: 15, term: 'Capital Gains', definition: 'Profits earned from selling an investment or asset for more than you paid for it. These may be subject to capital gains tax.', category: 'Investing' },
  { id: 16, term: '401(k)', definition: 'A retirement savings plan offered by employers where you can contribute pre-tax money, often with employer matching contributions.', category: 'Retirement' },
  { id: 17, term: 'Index Fund', definition: 'A type of mutual fund that tracks a specific market index (like the S&P 500), providing broad market exposure at low costs.', category: 'Investing' },
  { id: 18, term: 'Amortization', definition: 'The process of paying off a loan through regular payments that include both principal and interest. Early payments are mostly interest, later payments are mostly principal.', category: 'Credit' },
  { id: 19, term: 'Risk Tolerance', definition: 'Your ability and willingness to lose some or all of your original investment in exchange for greater potential returns. It affects your investment strategy.', category: 'Investing' },
  { id: 20, term: 'Time Value of Money', definition: 'The concept that money available today is worth more than the same amount in the future due to its potential earning capacity through interest or investment returns.', category: 'Economics' },
];

export default function FlashcardsPageClient() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [completedCards, setCompletedCards] = useState<Set<number>>(new Set());

  const currentCard = flashcards[currentCardIndex];
  const progress = (completedCards.size / flashcards.length) * 100;

  const handleNext = () => {
    setCompletedCards(prev => new Set([...prev, currentCard.id]));
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
    flashcards.splice(0, flashcards.length, ...shuffled);
    setCurrentCardIndex(0);
  };

  const handleReset = () => {
    setIsFlipped(false);
    setCurrentCardIndex(0);
    setCompletedCards(new Set());
  };

  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent) {
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          handlePrevious();
          break;
        case 'ArrowRight':
          event.preventDefault();
          handleNext();
          break;
        case ' ':
          event.preventDefault();
          handleFlip();
          break;
        case 'r':
        case 'R':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            handleReset();
          }
          break;
      }
    }
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentCardIndex, isFlipped, handleNext, handleFlip]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Financial Literacy Flashcards
          </h1>
          <p className="text-gray-600 mb-4">
            Master 20 essential financial concepts through interactive flashcards
          </p>
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div 
              className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Progress: {completedCards.size}/{flashcards.length} completed</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>
        {/* Flashcard */}
        <div className="flex justify-center mb-8">
          <div 
            className="w-full max-w-md h-64 cursor-pointer perspective-1000"
            onClick={handleFlip}
          >
            <div className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
              isFlipped ? 'rotate-y-180' : ''
            }`}>
              {/* Front of card */}
              <div className="absolute w-full h-full bg-white rounded-xl shadow-lg p-6 flex flex-col justify-center items-center border-2 border-gray-200 backface-hidden">
                <div className="text-sm text-blue-600 font-medium mb-2">
                  {currentCard.category}
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 text-center mb-4">
                  {currentCard.term}
                </h2>
                <div className="text-sm text-gray-500 text-center">
                  Tap to see definition
                </div>
                <div className="mt-4 text-xs text-gray-400">
                  Card {currentCardIndex + 1} of {flashcards.length}
                </div>
              </div>
              {/* Back of card */}
              <div className="absolute w-full h-full bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg p-6 flex flex-col justify-center items-center border-2 border-green-400 backface-hidden rotate-y-180">
                <div className="text-sm text-blue-100 font-medium mb-2">
                  {currentCard.category}
                </div>
                <p className="text-white text-center leading-relaxed">
                  {currentCard.definition}
                </p>
                <div className="mt-4 text-xs text-blue-200">
                  Card {currentCardIndex + 1} of {flashcards.length}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Controls */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={handlePrevious}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            ← Previous
          </button>
          <button
            onClick={handleFlip}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            {isFlipped ? 'Show Term' : 'Show Definition'}
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Next Card
          </button>
        </div>
        {/* Additional Controls */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={handleShuffle}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Shuffle
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Reset Progress
          </button>
          <button
            onClick={() => setShowProgress(!showProgress)}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            {showProgress ? 'Hide Progress' : 'Show Progress'}
          </button>
        </div>
        {/* Progress Details */}
        {showProgress && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Progress Details</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {flashcards.map((card) => (
                <div
                  key={card.id}
                  className={`p-3 rounded-lg text-center text-sm ${
                    completedCards.has(card.id)
                      ? 'bg-green-100 text-green-800 border border-green-300'
                      : 'bg-gray-100 text-gray-600 border border-gray-300'
                  }`}
                >
                  <div className="font-medium">{card.term}</div>
                  <div className="text-xs mt-1">{card.category}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Keyboard Shortcuts */}
        <div className="text-center text-sm text-gray-500">
          <p>💡 Tip: Use arrow keys to navigate, spacebar to flip cards, Ctrl+R to reset</p>
        </div>
      </div>
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
} 