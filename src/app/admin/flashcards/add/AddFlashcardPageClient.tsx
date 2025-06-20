'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addFlashcard } from '../../../../lib/flashcards';
import { ProtectedRoute } from '../../../../components/ProtectedRoute';

interface AddFlashcardData {
  term: string;
  definition: string;
  category: string;
}

export default function AddFlashcardPageClient() {
  const [formData, setFormData] = useState<AddFlashcardData>({
    term: '',
    definition: '',
    category: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await addFlashcard(formData);
      setSuccess(true);
      setTimeout(() => {
        router.push('/admin/flashcards');
      }, 2000);
    } catch (err) {
      console.error('Error creating flashcard:', err);
      setError('Failed to create flashcard. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Categories from the existing flashcards data
  const categories = [
    'Credit',
    'Economics', 
    'Investing',
    'Planning',
    'Retirement',
    'Savings',
    'Taxes'
  ];

  return (
    <ProtectedRoute requireAdmin>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-heading-1 font-bold text-gray-900 mb-6">
              Add New Flashcard
            </h1>
            <p className="text-body-large text-gray-600 leading-relaxed">
              Add a new flashcard to the FinIQ learning system
            </p>
          </div>

          {/* Form */}
          <div className="card p-10 animate-scale-in">
            {success ? (
              <div className="text-center py-16 animate-fade-in">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-heading-2 font-bold text-gray-900 mb-4">Flashcard Added Successfully!</h3>
                <p className="text-body-large text-gray-600 mb-6">Redirecting to admin dashboard...</p>
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent mx-auto"></div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Term */}
                <div>
                  <label htmlFor="term" className="block text-heading-3 font-semibold text-gray-900 mb-3">
                    Term *
                  </label>
                  <input
                    type="text"
                    id="term"
                    name="term"
                    value={formData.term}
                    onChange={handleInputChange}
                    required
                    className="input-enhanced"
                    placeholder="e.g., Compound Interest"
                  />
                </div>

                {/* Definition */}
                <div>
                  <label htmlFor="definition" className="block text-heading-3 font-semibold text-gray-900 mb-3">
                    Definition *
                  </label>
                  <textarea
                    id="definition"
                    name="definition"
                    value={formData.definition}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="input-enhanced resize-none"
                    placeholder="Provide a clear, concise definition of the term..."
                  />
                </div>

                {/* Category */}
                <div>
                  <label htmlFor="category" className="block text-heading-3 font-semibold text-gray-900 mb-3">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="input-enhanced"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-400 p-6 rounded-r-xl animate-fade-in">
                    <p className="text-body text-red-800 leading-relaxed">{error}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end gap-6 pt-8 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => router.push('/admin/flashcards')}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? '✨ Creating...' : '🃏 Add Flashcard'}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Tips */}
          <div className="card p-8 mt-8 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 animate-slide-in-left">
            <h3 className="text-heading-3 font-bold text-green-800 mb-6">💡 Tips for Adding Flashcards</h3>
            <ul className="space-y-3 text-body text-green-700">
              <li className="flex items-start gap-3">
                <span className="text-green-600 mt-1">•</span>
                <span>Keep definitions clear and easy to understand for teens</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 mt-1">•</span>
                <span>Use simple language and avoid complex jargon when possible</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 mt-1">•</span>
                <span>Focus on practical financial concepts relevant for learning</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 mt-1">•</span>
                <span>Choose the most appropriate category for better organization</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 mt-1">•</span>
                <span>Ensure the flashcard adds value to the financial literacy education</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 