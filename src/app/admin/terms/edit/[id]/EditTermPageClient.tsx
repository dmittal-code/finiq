'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getFinancialTermById, updateFinancialTerm, UpdateFinancialTermData } from '../../../../../lib/financialTerms';
import { ProtectedRoute } from '../../../../../components/ProtectedRoute';

export default function EditTermPageClient() {
  const router = useRouter();
  const params = useParams();
  // Ensure id is a number
  const idParam = typeof params?.id === 'string' ? params.id : Array.isArray(params?.id) ? params.id[0] : '';
  const id = Number(idParam);

  const [formData, setFormData] = useState<UpdateFinancialTermData>({
    term: '',
    definition: '',
    category: '',
    example: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function fetchTerm() {
      try {
        setIsLoading(true);
        const term = await getFinancialTermById(id);
        if (term) {
          setFormData({
            term: term.term,
            definition: term.definition,
            category: term.category,
            example: term.example || ''
          });
        } else {
          setError('Term not found.');
        }
      } catch {
        setError('Failed to load term.');
      } finally {
        setIsLoading(false);
      }
    }
    if (id) fetchTerm();
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
      await updateFinancialTerm(id, formData);
      setSuccess(true);
      setTimeout(() => {
        router.push('/admin/terms');
      }, 2000);
    } catch {
      setError('Failed to update term. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = [
    'Investing',
    'Savings',
    'Credit',
    'Planning',
    'Economics',
    'Taxes',
    'Retirement',
    'Insurance',
    'Budgeting',
    'Other'
  ];

  return (
    <ProtectedRoute requireAdmin>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-heading-1 font-bold text-gray-900 mb-6">
              Edit Financial Term
            </h1>
            <p className="text-body-large text-gray-600 leading-relaxed">
              Update the details of this glossary term
            </p>
          </div>

          {/* Form */}
          <div className="card p-10 animate-scale-in">
            {isLoading ? (
              <div className="text-center py-16">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-6"></div>
                <p className="text-body-large text-gray-600">Loading term details...</p>
              </div>
            ) : success ? (
              <div className="text-center py-16 animate-fade-in">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-heading-2 font-bold text-gray-900 mb-4">Term Updated Successfully!</h3>
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

                {/* Example */}
                <div>
                  <label htmlFor="example" className="block text-heading-3 font-semibold text-gray-900 mb-3">
                    Example (Optional)
                  </label>
                  <textarea
                    id="example"
                    name="example"
                    value={formData.example}
                    onChange={handleInputChange}
                    rows={3}
                    className="input-enhanced resize-none"
                    placeholder="Provide a practical example to help users understand the term..."
                  />
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
                    onClick={() => router.push('/admin/terms')}
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
        </div>
      </div>
    </ProtectedRoute>
  );
} 