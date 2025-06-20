'use client';

import { useState, useEffect, useCallback } from 'react';
import { getFlashcards, type Flashcard } from '../../lib/flashcards';

export default function FlashcardsPageClient() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [completedCards, setCompletedCards] = useState<Set<number>>(new Set());

  // Fetch flashcards from database
  useEffect(() => {
    async function fetchFlashcards() {
      try {
        setLoading(true);
        setError(null);
        const data = await getFlashcards();
        setFlashcards(data);
      } catch (err) {
        console.error('Error fetching flashcards:', err);
        setError('Failed to load flashcards. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchFlashcards();
  }, []);

  // Get current card safely
  const currentCard = flashcards.length > 0 ? flashcards[currentCardIndex] : null;
  const progress = flashcards.length > 0 ? (completedCards.size / flashcards.length) * 100 : 0;

  const handleNext = useCallback(() => {
    if (currentCard) {
      setCompletedCards(prev => new Set([...prev, currentCard.id]));
      setIsFlipped(false);
      setCurrentCardIndex((prev) => (prev + 1) % flashcards.length);
    }
  }, [currentCard, flashcards.length]);

  const handlePrevious = useCallback(() => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  }, [flashcards.length]);

  const handleFlip = useCallback(() => {
    setIsFlipped(!isFlipped);
  }, [isFlipped]);

  const handleShuffle = useCallback(() => {
    setIsFlipped(false);
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
    setFlashcards(shuffled);
    setCurrentCardIndex(0);
  }, [flashcards]);

  const handleReset = useCallback(() => {
    setIsFlipped(false);
    setCurrentCardIndex(0);
    setCompletedCards(new Set());
  }, []);

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
  }, [handleNext, handleFlip, handlePrevious, handleReset]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-blue-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <h2 className="text-heading-2 font-semibold text-gray-700">Loading Flashcards...</h2>
            <p className="text-body text-gray-500 mt-2">Please wait while we fetch your learning materials</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-blue-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚠️</span>
            </div>
            <h2 className="text-heading-2 font-semibold text-gray-900 mb-4">Unable to Load Flashcards</h2>
            <p className="text-body text-gray-600 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show empty state
  if (flashcards.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-blue-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📚</span>
            </div>
            <h2 className="text-heading-2 font-semibold text-gray-900 mb-4">No Flashcards Available</h2>
            <p className="text-body text-gray-600">There are no flashcards available at the moment.</p>
          </div>
        </div>
      </div>
    );
  }

  // Show message if no current card (shouldn't happen, but safety check)
  if (!currentCard) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-blue-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔄</span>
            </div>
            <h2 className="text-heading-2 font-semibold text-gray-900 mb-4">Loading Card...</h2>
            <p className="text-body text-gray-600">Please wait while we prepare your flashcard.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-heading-1 font-bold text-gray-900 mb-6">
            Financial Literacy Flashcards
          </h1>
          <p className="text-body-large text-gray-600 leading-relaxed mb-8">
            Master {flashcards.length} essential financial concepts through interactive flashcards
          </p>
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div 
              className="bg-gradient-to-r from-gray-600 to-slate-600 h-3 rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-body-small text-gray-600">
            <span>Progress: <span className="font-semibold text-gray-700">{completedCards.size}</span>/{flashcards.length} completed</span>
            <span className="font-semibold text-gray-800">{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Flashcard */}
        <div className="flex justify-center mb-12">
          <div 
            className="w-full max-w-lg h-80 cursor-pointer perspective-1000"
            onClick={handleFlip}
          >
            <div className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
              isFlipped ? 'rotate-y-180' : ''
            }`}>
              {/* Front of card */}
              <div className="absolute w-full h-full card p-8 flex flex-col justify-center items-center backface-hidden animate-scale-in">
                <div className="text-body-small text-gray-700 font-semibold mb-4 px-3 py-1 bg-gray-100 rounded-full">
                  {currentCard.category}
                </div>
                <h2 className="text-heading-1 font-bold text-gray-900 text-center mb-6 leading-tight">
                  {currentCard.term}
                </h2>
                <div className="text-body text-gray-500 text-center mb-6">
                  💡 Tap to see definition
                </div>
                <div className="text-body-small text-gray-400">
                  Card <span className="font-semibold text-gray-700">{currentCardIndex + 1}</span> of <span className="font-semibold text-gray-600">{flashcards.length}</span>
                </div>
              </div>
              {/* Back of card */}
              <div className="absolute w-full h-full bg-gradient-to-br from-gray-700 via-slate-700 to-blue-700 rounded-2xl shadow-xl p-8 flex flex-col justify-center items-center backface-hidden rotate-y-180 border border-gray-300">
                <div className="text-body-small text-gray-100 font-semibold mb-4 px-3 py-1 bg-white/20 rounded-full backdrop-blur-sm">
                  {currentCard.category}
                </div>
                <p className="text-white text-center leading-relaxed text-body-large mb-6">
                  {currentCard.definition}
                </p>
                <div className="text-body-small text-gray-200">
                  Card <span className="font-semibold text-white">{currentCardIndex + 1}</span> of <span className="font-semibold text-gray-100">{flashcards.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={handlePrevious}
            className="btn-secondary"
          >
            ← Previous
          </button>
          <button
            onClick={handleFlip}
            className="btn-primary text-lg px-8"
          >
            {isFlipped ? '🔄 Show Term' : '💡 Show Definition'}
          </button>
          <button
            onClick={handleNext}
            className="btn-secondary"
          >
            Next Card →
          </button>
        </div>

        {/* Additional Controls */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={handleShuffle}
            className="btn-accent"
          >
            🔀 Shuffle
          </button>
          <button
            onClick={handleReset}
            className="btn-accent"
          >
            🔄 Reset Progress
          </button>
          <button
            onClick={() => setShowProgress(!showProgress)}
            className="btn-accent"
          >
            {showProgress ? '📊 Hide Progress' : '📈 Show Progress'}
          </button>
        </div>

        {/* Progress Details */}
        {showProgress && (
          <div className="card p-8 mb-12 animate-slide-in-left">
            <h3 className="text-heading-2 font-bold text-gray-900 mb-8">Progress Details</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {flashcards.map((card) => (
                <div
                  key={card.id}
                  className={`p-4 rounded-xl text-center transition-all duration-300 ${
                    completedCards.has(card.id)
                      ? 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-800 border-2 border-green-300 shadow-sm'
                      : 'bg-gray-50 text-gray-600 border-2 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-semibold text-body-small mb-1">{card.term}</div>
                  <div className="text-xs text-gray-500">{card.category}</div>
                  {completedCards.has(card.id) && (
                    <div className="text-green-600 mt-2">✓</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Features */}
        <div className="card p-10 animate-fade-in">
          <h3 className="text-heading-2 font-bold text-gray-900 mb-8 text-center">Flashcard Features</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-slate-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-2xl">🃏</span>
              </div>
              <h4 className="text-heading-3 font-semibold text-gray-900 mb-3">Interactive Cards</h4>
              <p className="text-body text-gray-600 leading-relaxed">Flip cards to reveal definitions and test your knowledge</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-slate-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-2xl">📊</span>
              </div>
              <h4 className="text-heading-3 font-semibold text-gray-900 mb-3">Progress Tracking</h4>
              <p className="text-body text-gray-600 leading-relaxed">Track which terms you've mastered and monitor your progress</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-slate-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-2xl">⌨️</span>
              </div>
              <h4 className="text-heading-3 font-semibold text-gray-900 mb-3">Keyboard Shortcuts</h4>
              <p className="text-body text-gray-600 leading-relaxed">Use arrow keys to navigate and spacebar to flip cards</p>
            </div>
          </div>
        </div>

        {/* Keyboard Shortcuts */}
        <div className="text-center text-body-small text-gray-500 mt-8">
          <p>💡 <strong>Tip:</strong> Use arrow keys to navigate, spacebar to flip cards, Ctrl+R to reset</p>
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