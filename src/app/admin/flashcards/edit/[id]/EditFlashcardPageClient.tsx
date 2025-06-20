'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getFlashcardById, updateFlashcard } from '../../../../../lib/flashcards';
import { ProtectedRoute } from '../../../../../components/ProtectedRoute';

interface UpdateFlashcardData {
  term: string;
  definition: string;
  category: string;
}

export default function EditFlashcardPageClient() {
  const router = useRouter();
  const params = useParams();
  // Ensure id is a number
  const idParam = typeof params?.id === 'string' ? params.id : Array.isArray(params?.id) ? params.id[0] : '';
  const id = Number(idParam);

  const [formData, setFormData] = useState<UpdateFlashcardData>({
    term: '',
    definition: '',
    category: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function fetchFlashcard() {
      try {
        setIsLoading(true);
        const flashcard = await getFlashcardById(id);
        if (flashcard) {
          setFormData({
            term: flashcard.term,
            definition: flashcard.definition,
            category: flashcard.category
          });
        } else {
          setError('Flashcard not found.');
        }
      } catch {
        setError('Failed to load flashcard.');
      } finally {
        setIsLoading(false);
      }
    }
    if (id) fetchFlashcard();
  }, [id]);

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
      await updateFlashcard(id, formData);
      setSuccess(true);
      setTimeout(() => {
        router.push('/admin/flashcards');
      }, 2000);
    } catch {
      setError('Failed to update flashcard. Please try again.');
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-heading-1 font-bold text-gray-900 mb-6">
              Edit Flashcard
            </h1>
            <p className="text-body-large text-gray-600 leading-relaxed">
              Update the details of this flashcard
            </p>
          </div>

          {/* Form */}
          <div className="card p-10 animate-scale-in">
            {isLoading ? (
              <div className="text-center py-16">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-6"></div>
                <p className="text-body-large text-gray-600">Loading flashcard details...</p>
              </div>
            ) : success ? (
              <div className="text-center py-16 animate-fade-in">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-heading-2 font-bold text-gray-900 mb-4">Flashcard Updated Successfully!</h3>
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
                    {isSubmitting ? '💾 Saving...' : '✅ Save Changes'}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Tips */}
          <div className="card p-8 mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 animate-slide-in-left">
            <h3 className="text-heading-3 font-bold text-blue-800 mb-6">💡 Editing Tips</h3>
            <ul className="space-y-3 text-body text-blue-700">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 mt-1">•</span>
                <span>Make sure the term and definition are clear and accurate</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 mt-1">•</span>
                <span>Choose the most appropriate category for the flashcard</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 mt-1">•</span>
                <span>Keep the language simple and teen-friendly</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 mt-1">•</span>
                <span>Ensure changes maintain educational value</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 