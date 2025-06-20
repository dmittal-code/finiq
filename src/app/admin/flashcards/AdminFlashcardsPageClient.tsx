'use client';

import { useState, useEffect } from 'react';
import { Flashcard, getFlashcards, deleteFlashcard } from '../../../lib/flashcards';
import { ProtectedRoute } from '../../../components/ProtectedRoute';
import { useRouter } from 'next/navigation';

export default function AdminFlashcardsPageClient() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchFlashcards() {
      setLoading(true);
      setError(null);
      try {
        const data = await getFlashcards();
        setFlashcards(data);
      } catch {
        setError('Failed to load flashcards.');
      } finally {
        setLoading(false);
      }
    }
    fetchFlashcards();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this flashcard?')) return;
    setDeletingId(id);
    try {
      await deleteFlashcard(id);
      setFlashcards(prev => prev.filter(flashcard => flashcard.id !== id));
    } catch {
      setError('Failed to delete flashcard.');
    } finally {
      setDeletingId(null);
    }
  };

  const filteredFlashcards = flashcards.filter(flashcard =>
    flashcard.term.toLowerCase().includes(search.toLowerCase()) ||
    flashcard.definition.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ProtectedRoute requireAdmin>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-blue-50 p-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-heading-1 font-bold text-gray-900 mb-6">
              👑 Admin: Manage Flashcards
            </h1>
            <p className="text-body-large text-gray-600 mb-8 leading-relaxed">
              Search, edit, or delete flashcards in the learning system
            </p>
            <button
              onClick={() => router.push('/admin/flashcards/add')}
              className="btn-primary text-lg px-8 py-4"
            >
              ✨ Add New Flashcard
            </button>
          </div>

          {/* Search Bar */}
          <div className="mb-8 flex justify-center animate-scale-in">
            <div className="w-full max-w-2xl">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="🔍 Search flashcards or definitions..."
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

          {/* Flashcards Table */}
          <div className="card p-8 overflow-x-auto animate-fade-in">
            {loading ? (
              <div className="text-center py-16">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-6"></div>
                <p className="text-body-large text-gray-600 font-semibold">Loading flashcards...</p>
              </div>
            ) : (
              <div className="overflow-hidden rounded-xl border border-gray-200">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-700 via-slate-700 to-blue-700 text-white">
                      <th className="px-6 py-4 text-left text-body font-bold">Term</th>
                      <th className="px-6 py-4 text-left text-body font-bold">Definition</th>
                      <th className="px-6 py-4 text-left text-body font-bold">Category</th>
                      <th className="px-6 py-4 text-left text-body font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {filteredFlashcards.map((flashcard, index) => (
                      <tr key={flashcard.id} className={`border-b border-gray-200 hover:bg-gradient-to-r hover:from-gray-50 hover:to-slate-50 transition-all duration-200 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                        <td className="px-6 py-4">
                          <span className="text-body font-bold text-gray-900">{flashcard.term}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-body text-gray-600 max-w-md">
                            <div className="line-clamp-2">{flashcard.definition}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 rounded-full text-body-small font-semibold">
                            {flashcard.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-3">
                            <button
                              onClick={() => router.push(`/admin/flashcards/edit/${flashcard.id}`)}
                              className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-lg hover:from-yellow-500 hover:to-orange-500 transition-all duration-300 text-body-small font-semibold shadow-lg hover:shadow-xl"
                            >
                              ✏️ Edit
                            </button>
                            <button
                              onClick={() => handleDelete(flashcard.id)}
                              className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-300 text-body-small font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                              disabled={deletingId === flashcard.id}
                            >
                              {deletingId === flashcard.id ? '🔄 Deleting...' : '🗑️ Delete'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredFlashcards.length === 0 && (
                      <tr>
                        <td colSpan={4} className="text-center py-16">
                          <div className="flex flex-col items-center gap-4">
                            <span className="text-6xl">🃏</span>
                            <div>
                              <h3 className="text-heading-3 font-bold text-gray-900 mb-2">No flashcards found</h3>
                              <p className="text-body text-gray-600">
                                {search ? 'Try adjusting your search criteria' : 'Get started by adding your first flashcard'}
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
            <h3 className="text-heading-2 font-bold text-gray-900 mb-6 text-center">📊 Flashcards Statistics</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl">
                <div className="text-4xl font-black text-gray-700 mb-2">{flashcards.length}</div>
                <div className="text-body font-semibold text-gray-700">Total Flashcards</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl">
                <div className="text-4xl font-black text-slate-700 mb-2">{new Set(flashcards.map(f => f.category)).size}</div>
                <div className="text-body font-semibold text-gray-700">Categories</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl">
                <div className="text-4xl font-black text-blue-600 mb-2">{filteredFlashcards.length}</div>
                <div className="text-body font-semibold text-gray-700">Filtered Results</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 