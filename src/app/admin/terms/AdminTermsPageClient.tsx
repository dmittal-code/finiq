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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Admin: Manage Financial Terms
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              Search, edit, or delete terms in the glossary
            </p>
            <button
              onClick={() => router.push('/admin/terms/add')}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              + Add New Term
            </button>
          </div>

          {/* Search Bar */}
          <div className="mb-6 flex justify-center">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search terms..."
              className="w-full max-w-xl px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center">
              {error}
            </div>
          )}

          {/* Terms Table */}
          <div className="bg-white rounded-xl shadow-lg p-6 overflow-x-auto">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading terms...</p>
              </div>
            ) : (
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left">Term</th>
                    <th className="px-4 py-2 text-left">Definition</th>
                    <th className="px-4 py-2 text-left">Category</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTerms.map(term => (
                    <tr key={term.id} className="border-b">
                      <td className="px-4 py-2 font-semibold text-gray-800">{term.term}</td>
                      <td className="px-4 py-2 text-gray-600 max-w-xs truncate">{term.definition}</td>
                      <td className="px-4 py-2 text-gray-700">{term.category}</td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => router.push(`/admin/terms/edit/${term.id}`)}
                          className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(term.id)}
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                          disabled={deletingId === term.id}
                        >
                          {deletingId === term.id ? 'Deleting...' : 'Delete'}
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredTerms.length === 0 && (
                    <tr>
                      <td colSpan={4} className="text-center text-gray-500 py-8">
                        No terms found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 