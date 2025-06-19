'use client';

import { useState, useEffect } from 'react';
import { FinancialTerm, getAllFinancialTerms, deleteFinancialTerm } from '../../../lib/financialTerms';
import { ProtectedRoute } from '../../../components/ProtectedRoute';
import { useRouter } from 'next/navigation';

export default function AdminTermsPageClient() {
  const [terms, setTerms] = useState<FinancialTerm[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchTerms() {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllFinancialTerms();
        setTerms(data);
      } catch {
        setError('Failed to load terms.');
      } finally {
        setLoading(false);
      }
    }
    fetchTerms();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this term?')) return;
    setDeletingId(id);
    try {
      await deleteFinancialTerm(id);
      setTerms(prev => prev.filter(term => term.id !== id));
    } catch {
      setError('Failed to delete term.');
    } finally {
      setDeletingId(null);
    }
  };

  const filteredTerms = terms.filter(term =>
    term.term.toLowerCase().includes(search.toLowerCase()) ||
    term.definition.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ProtectedRoute requireAdmin>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-heading-1 font-bold text-gray-900 mb-6">
              👑 Admin: Manage Financial Terms
            </h1>
            <p className="text-body-large text-gray-600 mb-8 leading-relaxed">
              Search, edit, or delete terms in the glossary
            </p>
            <button
              onClick={() => router.push('/admin/terms/add')}
              className="btn-primary text-lg px-8 py-4"
            >
              ✨ Add New Term
            </button>
          </div>

          {/* Search Bar */}
          <div className="mb-8 flex justify-center animate-scale-in">
            <div className="w-full max-w-2xl">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="🔍 Search terms or definitions..."
                className="input-enhanced text-lg"
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-8 p-6 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-xl text-red-700 text-center animate-slide-in-left">
              <div className="flex items-center justify-center gap-3">
                <span className="text-2xl">⚠️</span>
                <span className="text-body font-semibold">{error}</span>
              </div>
            </div>
          )}

          {/* Terms Table */}
          <div className="card p-8 overflow-x-auto animate-fade-in">
            {loading ? (
              <div className="text-center py-16">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-6"></div>
                <p className="text-body-large text-gray-600 font-semibold">Loading terms...</p>
              </div>
            ) : (
              <div className="overflow-hidden rounded-xl border border-gray-200">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
                      <th className="px-6 py-4 text-left text-body font-bold">Term</th>
                      <th className="px-6 py-4 text-left text-body font-bold">Definition</th>
                      <th className="px-6 py-4 text-left text-body font-bold">Category</th>
                      <th className="px-6 py-4 text-left text-body font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {filteredTerms.map((term, index) => (
                      <tr key={term.id} className={`border-b border-gray-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                        <td className="px-6 py-4">
                          <span className="text-body font-bold text-gray-900">{term.term}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-body text-gray-600 max-w-md">
                            <div className="line-clamp-2">{term.definition}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-body-small font-semibold">
                            {term.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-3">
                            <button
                              onClick={() => router.push(`/admin/terms/edit/${term.id}`)}
                              className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-lg hover:from-yellow-500 hover:to-orange-500 transition-all duration-300 text-body-small font-semibold shadow-lg hover:shadow-xl"
                            >
                              ✏️ Edit
                            </button>
                            <button
                              onClick={() => handleDelete(term.id)}
                              className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-300 text-body-small font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                              disabled={deletingId === term.id}
                            >
                              {deletingId === term.id ? '🔄 Deleting...' : '🗑️ Delete'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredTerms.length === 0 && (
                      <tr>
                        <td colSpan={4} className="text-center py-16">
                          <div className="flex flex-col items-center gap-4">
                            <span className="text-6xl">📚</span>
                            <div>
                              <h3 className="text-heading-3 font-bold text-gray-900 mb-2">No terms found</h3>
                              <p className="text-body text-gray-600">
                                {search ? 'Try adjusting your search criteria' : 'Get started by adding your first term'}
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Stats Card */}
          <div className="card p-8 mt-8 animate-slide-in-left">
            <h3 className="text-heading-2 font-bold text-gray-900 mb-6 text-center">📊 Glossary Statistics</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                <div className="text-4xl font-black text-blue-600 mb-2">{terms.length}</div>
                <div className="text-body font-semibold text-gray-700">Total Terms</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                <div className="text-4xl font-black text-green-600 mb-2">{new Set(terms.map(t => t.category)).size}</div>
                <div className="text-body font-semibold text-gray-700">Categories</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl">
                <div className="text-4xl font-black text-orange-600 mb-2">{filteredTerms.length}</div>
                <div className="text-body font-semibold text-gray-700">Filtered Results</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 