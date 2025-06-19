'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { getFinancialTermById, updateFinancialTerm, UpdateFinancialTermData } from '../../../../../lib/financialTerms';
import { ProtectedRoute } from '../../../../../components/ProtectedRoute';

export const metadata = {
  title: 'FinIQ Lite | Admin - Edit Term',
  description: 'Edit a financial term in the FinIQ Lite glossary (admin only).'
};

export default function EditTermPage() {
  const router = useRouter();
  const params = useParams();
  const termId = parseInt(params.id as string);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [term, setTerm] = useState<any>(null);
  
  const [formData, setFormData] = useState<UpdateFinancialTermData>({
    term: '',
    definition: '',
    category: '',
    example: '',
    related_terms: []
  });

  const [relatedTermInput, setRelatedTermInput] = useState('');

  useEffect(() => {
    if (termId) {
      fetchTerm();
    }
  }, [termId]);

  const fetchTerm = async () => {
    try {
      setLoading(true);
      const termData = await getFinancialTermById(termId);
      if (termData) {
        setTerm(termData);
        setFormData({
          term: termData.term,
          definition: termData.definition,
          category: termData.category,
          example: termData.example || '',
          related_terms: termData.related_terms || []
        });
      } else {
        setError('Term not found');
      }
    } catch (err) {
      console.error('Error fetching term:', err);
      setError('Failed to load term');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof UpdateFinancialTermData, value: string | string[]) => {
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
    
    if (!formData.term?.trim() || !formData.definition?.trim() || !formData.category?.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setSaving(true);
      setError(null);
      
      await updateFinancialTerm(termId, {
        ...formData,
        term: formData.term.trim(),
        definition: formData.definition.trim(),
        category: formData.category.trim(),
        example: formData.example?.trim() || undefined,
        related_terms: formData.related_terms?.length ? formData.related_terms : undefined
      });

      router.push('/admin/terms');
    } catch (err) {
      console.error('Error updating term:', err);
      setError('Failed to update term. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute requireAdmin>
        <div className="min-h-screen bg-gray-50 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading term...</p>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (error && !term) {
    return (
      <ProtectedRoute requireAdmin>
        <div className="min-h-screen bg-gray-50 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Term</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <Link
                href="/admin/terms"
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Back to Terms
              </Link>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute requireAdmin>
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Edit Term</h1>
                <p className="text-gray-600 mt-2">Update the financial term: {term?.term}</p>
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
                  disabled={saving}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 