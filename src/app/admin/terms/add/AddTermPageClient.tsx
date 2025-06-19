'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createFinancialTerm, CreateFinancialTermData } from '../../../../lib/financialTerms';
import { ProtectedRoute } from '../../../../components/ProtectedRoute';

export default function AddTermPageClient() {
  const [formData, setFormData] = useState<CreateFinancialTermData>({
    term: '',
    definition: '',
    category: '',
    example: ''
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
      await createFinancialTerm(formData);
      setSuccess(true);
      setTimeout(() => {
        router.push('/admin/terms');
      }, 2000);
    } catch (err) {
      console.error('Error creating term:', err);
      setError('Failed to create term. Please try again.');
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
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Add New Financial Term
            </h1>
            <p className="text-xl text-gray-600">
              Add a new term to the FinIQ Lite glossary
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            {success ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Term Added Successfully!</h3>
                <p className="text-gray-600 mb-4">Redirecting to admin dashboard...</p>
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Term */}
                <div>
                  <label htmlFor="term" className="block text-sm font-medium text-gray-700 mb-2">
                    Term *
                  </label>
                  <input
                    type="text"
                    id="term"
                    name="term"
                    value={formData.term}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="e.g., Compound Interest"
                  />
                </div>

                {/* Definition */}
                <div>
                  <label htmlFor="definition" className="block text-sm font-medium text-gray-700 mb-2">
                    Definition *
                  </label>
                  <textarea
                    id="definition"
                    name="definition"
                    value={formData.definition}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="Provide a clear, concise definition of the term..."
                  />
                </div>

                {/* Category */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
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
                  <label htmlFor="example" className="block text-sm font-medium text-gray-700 mb-2">
                    Example (Optional)
                  </label>
                  <textarea
                    id="example"
                    name="example"
                    value={formData.example}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="Provide a practical example to help users understand the term..."
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => router.push('/admin/terms')}
                    className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Adding...' : 'Add Term'}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Tips */}
          <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-800 mb-3">💡 Tips for Adding Terms</h3>
            <ul className="space-y-2 text-sm text-green-700">
              <li>• Keep definitions clear and easy to understand for teens</li>
              <li>• Use simple language and avoid jargon when possible</li>
              <li>• Provide practical examples that relate to everyday life</li>
              <li>• Choose the most appropriate category for better organization</li>
              <li>• Ensure the term is relevant to financial literacy education</li>
            </ul>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 