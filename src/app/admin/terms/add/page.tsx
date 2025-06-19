'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createFinancialTerm, CreateFinancialTermData } from '../../../../lib/financialTerms';
import { ProtectedRoute } from '../../../../components/ProtectedRoute';

export const metadata = {
  title: 'FinIQ Lite | Admin - Add Term',
  description: 'Add a new financial term to the FinIQ Lite glossary (admin only).'
};

export default function AddTermPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<CreateFinancialTermData>({
    term: '',
    definition: '',
    category: '',
    example: '',
    related_terms: []
  });

  const [relatedTermInput, setRelatedTermInput] = useState('');

  const handleInputChange = (field: keyof CreateFinancialTermData, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addRelatedTerm = () => {
    if (relatedTermInput.trim() && !formData.related_terms?.includes(relatedTermInput.trim())) {
      handleInputChange('related_terms', [...(formData.related_terms || []), relatedTermInput.trim()]);
      setRelatedTermInput('');
    }
  };

  const removeRelatedTerm = (index: number) => {
    const updatedTerms = formData.related_terms?.filter((_, i) => i !== index) || [];
    handleInputChange('related_terms', updatedTerms);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.term.trim() || !formData.definition.trim() || !formData.category.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      await createFinancialTerm({
        ...formData,
        term: formData.term.trim(),
        definition: formData.definition.trim(),
        category: formData.category.trim(),
        example: formData.example?.trim() || undefined,
        related_terms: formData.related_terms?.length ? formData.related_terms : undefined
      });

      router.push('/admin/terms');
    } catch (err) {
      console.error('Error creating term:', err);
      setError('Failed to create term. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute requireAdmin>
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Add New Term</h1>
                <p className="text-gray-600 mt-2">Create a new financial term for your glossary</p>
              </div>
              <Link
                href="/admin/terms"
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Back to Terms
              </Link>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-800">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Term Name */}
              <div>
                <label htmlFor="term" className="block text-sm font-medium text-gray-700 mb-2">
                  Term Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="term"
                  value={formData.term}
                  onChange={(e) => handleInputChange('term', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Compound Interest"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Investing">Investing</option>
                  <option value="Credit">Credit</option>
                  <option value="Savings">Savings</option>
                  <option value="Planning">Planning</option>
                  <option value="Economics">Economics</option>
                  <option value="Taxes">Taxes</option>
                  <option value="Retirement">Retirement</option>
                  <option value="Insurance">Insurance</option>
                  <option value="Real Estate">Real Estate</option>
                  <option value="Banking">Banking</option>
                </select>
              </div>

              {/* Definition */}
              <div>
                <label htmlFor="definition" className="block text-sm font-medium text-gray-700 mb-2">
                  Definition <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="definition"
                  value={formData.definition}
                  onChange={(e) => handleInputChange('definition', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Provide a clear, comprehensive definition of the term..."
                  required
                />
              </div>

              {/* Example */}
              <div>
                <label htmlFor="example" className="block text-sm font-medium text-gray-700 mb-2">
                  Example (Optional)
                </label>
                <textarea
                  id="example"
                  value={formData.example}
                  onChange={(e) => handleInputChange('example', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Provide a practical example to help users understand the concept..."
                />
              </div>

              {/* Related Terms */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Related Terms (Optional)
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={relatedTermInput}
                    onChange={(e) => setRelatedTermInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRelatedTerm())}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Add a related term..."
                  />
                  <button
                    type="button"
                    onClick={addRelatedTerm}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Add
                  </button>
                </div>
                
                {formData.related_terms && formData.related_terms.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.related_terms.map((term, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                      >
                        {term}
                        <button
                          type="button"
                          onClick={() => removeRelatedTerm(index)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <Link
                  href="/admin/terms"
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Creating...' : 'Create Term'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 