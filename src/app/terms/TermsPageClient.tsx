'use client';

import { useState, useEffect } from 'react';
import { FinancialTerm, getAllFinancialTerms, getCategories } from '../../lib/financialTerms';
import { ProtectedRoute } from '../../components/ProtectedRoute';

export default function TermsPageClient() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTerm, setSelectedTerm] = useState<FinancialTerm | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [financialTerms, setFinancialTerms] = useState<FinancialTerm[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [termsData, categoriesData] = await Promise.all([
          getAllFinancialTerms(),
          getCategories()
        ]);
        setFinancialTerms(termsData);
        setCategories(categoriesData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load financial terms. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredTerms = financialTerms.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         term.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || term.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleTermClick = (term: FinancialTerm) => {
    setSelectedTerm(term);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTerm(null);
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 p-4 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading financial terms...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (error) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 p-4 flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Terms</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Financial Terms Glossary
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Master essential financial concepts with our comprehensive glossary
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for financial terms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 pl-12 text-lg border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === 'All'
                    ? 'bg-emerald-500 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-emerald-50 border border-gray-200'
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-emerald-500 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-emerald-50 border border-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Results Count */}
            <div className="text-gray-600 mb-8">
              Showing {filteredTerms.length} of {financialTerms.length} terms
            </div>
          </div>

          {/* Terms Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredTerms.map((term) => (
              <div
                key={term.id}
                onClick={() => handleTermClick(term)}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-emerald-200 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-800 group-hover:text-emerald-600 transition-colors">
                    {term.term}
                  </h3>
                  <span className="px-3 py-1 text-xs font-medium bg-emerald-100 text-emerald-700 rounded-full">
                    {term.category}
                  </span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                  {term.definition}
                </p>
                <div className="mt-4 flex items-center text-emerald-600 text-sm font-medium">
                  <span>Read more</span>
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredTerms.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 6.3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No terms found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}

          {/* Features Section */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Glossary Features</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🔍</span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Smart Search</h4>
                <p className="text-gray-600 text-sm">Find terms by name or definition with instant search results</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">📂</span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Category Filter</h4>
                <p className="text-gray-600 text-sm">Browse terms by category to focus on specific topics</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">💡</span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Detailed Explanations</h4>
                <p className="text-gray-600 text-sm">Get comprehensive definitions with examples and related terms</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        {showModal && selectedTerm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedTerm.term}</h2>
                    <span className="px-4 py-2 text-sm font-medium bg-emerald-100 text-emerald-700 rounded-full">
                      {selectedTerm.category}
                    </span>
                  </div>
                  <button
                    onClick={closeModal}
                    className="ml-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Definition */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Definition</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedTerm.definition}</p>
                </div>

                {/* Example */}
                {selectedTerm.example && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Example</h3>
                    <div className="bg-emerald-50 border-l-4 border-emerald-400 p-4 rounded-r-lg">
                      <p className="text-gray-700 italic">{selectedTerm.example}</p>
                    </div>
                  </div>
                )}

                {/* Related Terms */}
                {selectedTerm.related_terms && selectedTerm.related_terms.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Related Terms</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedTerm.related_terms.map((relatedTerm, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          {relatedTerm}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                  <button
                    onClick={closeModal}
                    className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
} 