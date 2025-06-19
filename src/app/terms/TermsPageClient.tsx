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
        <div className="min-h-screen bg-gradient-to-br from-gray-100 via-slate-100 to-blue-100 p-4">
          <div className="max-w-6xl mx-auto">
            {/* Header Skeleton */}
            <div className="text-center mb-12 animate-fade-in">
              <div className="skeleton-title w-96 h-12 mx-auto mb-4"></div>
              <div className="skeleton-text w-2/3 h-6 mx-auto mb-8"></div>
              
              {/* Search Bar Skeleton */}
              <div className="max-w-2xl mx-auto mb-8">
                <div className="skeleton h-16 rounded-xl"></div>
              </div>

              {/* Category Filter Skeleton */}
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="skeleton w-24 h-10 rounded-full"></div>
                ))}
              </div>

              {/* Results Count Skeleton */}
              <div className="skeleton-text w-48 h-4 mx-auto mb-8"></div>
            </div>

            {/* Terms Grid Skeleton */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="card p-6 animate-pulse">
                  <div className="flex items-start justify-between mb-4">
                    <div className="skeleton-title w-3/4 h-6"></div>
                    <div className="skeleton w-20 h-6 rounded-full"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="skeleton-text w-full"></div>
                    <div className="skeleton-text w-5/6"></div>
                    <div className="skeleton-text w-4/6"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (error) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-gray-100 via-slate-100 to-blue-100 p-4 flex items-center justify-center">
          <div className="text-center animate-fade-in">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-red-100 to-pink-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-heading-2 font-semibold text-gray-800 mb-3">Error Loading Terms</h3>
            <p className="text-body text-gray-600 mb-6 max-w-md mx-auto">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-gray-700 to-slate-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-gray-800 hover:to-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              🔄 Try Again
            </button>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-slate-100 to-blue-100 p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-heading-1 font-bold text-gray-900 mb-6">
              Financial Terms Glossary
            </h1>
            <p className="text-body-large text-gray-600 mb-10 leading-relaxed">
              Master essential financial concepts with our comprehensive glossary
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-10">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search for financial terms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-enhanced text-lg pl-14 pr-6 py-4 w-full"
                />
                <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
                  <svg className="w-6 h-6 text-gray-400 group-focus-within:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === 'All'
                    ? 'bg-gradient-to-r from-gray-700 to-slate-700 text-white shadow-lg'
                    : 'bg-white/80 text-gray-600 hover:bg-white border border-gray-200/50 hover:border-gray-300/50 shadow-md hover:shadow-lg'
                }`}
              >
                All Categories
              </button>
              {categories.map((category, index) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 animate-slide-in-left`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className={`relative px-3 py-1.5 rounded-lg transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-gray-700 to-slate-700 text-white shadow-lg'
                      : 'bg-white/80 text-gray-600 hover:bg-white border border-gray-200/50 hover:border-gray-300/50 shadow-md hover:shadow-lg'
                  }`}>
                    {category}
                  </span>
                </button>
              ))}
            </div>

            {/* Results Count */}
            <div className="text-body text-gray-600 mb-10">
              Showing <span className="font-semibold text-gray-700">{filteredTerms.length}</span> of <span className="font-semibold text-gray-800">{financialTerms.length}</span> terms
            </div>
          </div>

          {/* Terms Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredTerms.map((term, index) => (
              <div
                key={term.id}
                onClick={() => handleTermClick(term)}
                className="card card-hover p-8 cursor-pointer group animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-6">
                  <h3 className="text-heading-3 font-bold text-gray-900 group-hover:text-gray-700 transition-colors leading-tight">
                    {term.term}
                  </h3>
                  <span className="px-4 py-2 text-xs font-semibold bg-gradient-to-r from-gray-100 to-slate-100 text-gray-700 rounded-full shadow-sm">
                    {term.category}
                  </span>
                </div>
                <p className="text-body text-gray-600 leading-relaxed line-clamp-3 mb-6">
                  {term.definition}
                </p>
                <div className="flex items-center text-gray-600 text-body-small font-medium group-hover:text-gray-700 transition-colors">
                  <span>Read more</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredTerms.length === 0 && (
            <div className="text-center py-16 animate-fade-in">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 6.3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-heading-2 font-semibold text-gray-800 mb-3">No terms found</h3>
              <p className="text-body text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="bg-white text-gray-600 border-2 border-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Features Section */}
          <div className="card p-10 animate-fade-in">
            <h3 className="text-heading-2 font-bold text-gray-900 mb-8 text-center">Glossary Features</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-slate-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <span className="text-2xl">🔍</span>
                </div>
                <h4 className="text-heading-3 font-semibold text-gray-900 mb-3">Smart Search</h4>
                <p className="text-body text-gray-600 leading-relaxed">Find terms by name or definition with instant search results</p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-slate-600 to-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <span className="text-2xl">📂</span>
                </div>
                <h4 className="text-heading-3 font-semibold text-gray-900 mb-3">Category Filter</h4>
                <p className="text-body text-gray-600 leading-relaxed">Browse terms by category to focus on specific topics</p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-gray-700 to-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <span className="text-2xl">💡</span>
                </div>
                <h4 className="text-heading-3 font-semibold text-gray-900 mb-3">Detailed Explanations</h4>
                <p className="text-body text-gray-600 leading-relaxed">Get comprehensive definitions with examples and related terms</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        {showModal && selectedTerm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
              <div className="p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                  <div className="flex-1">
                    <h2 className="text-heading-2 font-bold text-gray-900 mb-4">{selectedTerm.term}</h2>
                    <span className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-gray-100 to-slate-100 text-gray-700 rounded-full shadow-sm">
                      {selectedTerm.category}
                    </span>
                  </div>
                  <button
                    onClick={closeModal}
                    className="ml-4 p-3 text-gray-400 hover:text-gray-600 transition-colors rounded-xl hover:bg-gray-100"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Definition */}
                <div className="mb-8">
                  <h3 className="text-heading-3 font-semibold text-gray-900 mb-4">Definition</h3>
                  <p className="text-body text-gray-700 leading-relaxed">{selectedTerm.definition}</p>
                </div>

                {/* Example */}
                {selectedTerm.example && (
                  <div className="mb-8">
                    <h3 className="text-heading-3 font-semibold text-gray-900 mb-4">Example</h3>
                    <div className="bg-gradient-to-r from-gray-50 to-slate-50 border-l-4 border-gray-400 p-6 rounded-r-xl">
                      <p className="text-body text-gray-700 italic leading-relaxed">{selectedTerm.example}</p>
                    </div>
                  </div>
                )}

                {/* Related Terms */}
                {selectedTerm.related_terms && selectedTerm.related_terms.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-heading-3 font-semibold text-gray-900 mb-4">Related Terms</h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedTerm.related_terms.map((relatedTerm, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-body-small font-medium hover:bg-gray-200 transition-colors cursor-pointer"
                        >
                          {relatedTerm}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 pt-8 border-t border-gray-200">
                  <button
                    onClick={closeModal}
                    className="bg-white text-gray-600 border-2 border-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
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