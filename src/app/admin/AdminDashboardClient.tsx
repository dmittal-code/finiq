'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getQuizzes, getQuestions } from '../../lib/quizzes';
import { supabase } from '../../supabaseClient';

interface DashboardStats {
  totalQuizzes: number;
  totalQuestions: number;
  totalTerms: number;
  totalFlashcards: number;
  totalUsers: number;
}

export default function AdminDashboardClient() {
  const [stats, setStats] = useState<DashboardStats>({
    totalQuizzes: 0,
    totalQuestions: 0,
    totalTerms: 0,
    totalFlashcards: 0,
    totalUsers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        setLoading(true);
        
        // Get quizzes count
        const quizzes = await getQuizzes();
        
        // Get questions count
        const questions = await getQuestions();
        
        // Get terms count
        const { count: termsCount } = await supabase
          .from('financial_terms')
          .select('*', { count: 'exact', head: true });
        
        // Get flashcards count
        const { count: flashcardsCount } = await supabase
          .from('flashcards')
          .select('*', { count: 'exact', head: true });
        
        // Get users count
        const { count: usersCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });
        
        setStats({
          totalQuizzes: quizzes.length,
          totalQuestions: questions.length,
          totalTerms: termsCount || 0,
          totalFlashcards: flashcardsCount || 0,
          totalUsers: usersCount || 0,
        });
      } catch (error) {
        console.error('Error loading admin stats:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadStats();
  }, []);

  const adminSections = [
    {
      title: 'Quiz Management',
      description: 'Manage quizzes, questions, and quiz settings',
      href: '/admin/quizzes',
      icon: '📝',
      stats: `${stats.totalQuizzes} quizzes, ${stats.totalQuestions} questions`,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Terms Management',
      description: 'Add, edit, and manage financial terminology',
      href: '/admin/terms',
      icon: '📚',
      stats: `${stats.totalTerms} terms`,
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Flashcards Management',
      description: 'Create and manage flashcard content',
      href: '/admin/flashcards',
      icon: '🃏',
      stats: `${stats.totalFlashcards} flashcards`,
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'User Management',
      description: 'View and manage user accounts and progress',
      href: '/admin/users',
      icon: '👥',
      stats: `${stats.totalUsers} users`,
      color: 'from-orange-500 to-red-500',
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-8"></div>
            <h2 className="text-2xl font-semibold text-gray-600">Loading Dashboard...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🛠️ Admin Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Manage all aspects of the FinIQ platform
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-blue-600">{stats.totalQuizzes}</div>
            <div className="text-sm text-gray-600">Quizzes</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-green-600">{stats.totalQuestions}</div>
            <div className="text-sm text-gray-600">Questions</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-purple-600">{stats.totalTerms}</div>
            <div className="text-sm text-gray-600">Terms</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-pink-600">{stats.totalFlashcards}</div>
            <div className="text-sm text-gray-600">Flashcards</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-orange-600">{stats.totalUsers}</div>
            <div className="text-sm text-gray-600">Users</div>
          </div>
        </div>

        {/* Admin Sections */}
        <div className="grid md:grid-cols-2 gap-6">
          {adminSections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="group block"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${section.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                    <span className="text-3xl">{section.icon}</span>
                  </div>
                  <svg 
                    className="w-6 h-6 text-gray-400 group-hover:text-gray-600 transition-colors" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {section.title}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {section.description}
                </p>
                
                <div className="text-sm font-medium text-gray-500">
                  {section.stats}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">🚀 Quick Actions</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <Link
              href="/admin/quizzes/add"
              className="flex items-center space-x-3 p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors group"
            >
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">➕</span>
              </div>
              <div>
                <div className="font-semibold text-gray-900 group-hover:text-blue-600">Add New Quiz</div>
                <div className="text-sm text-gray-600">Create a new quiz</div>
              </div>
            </Link>
            
            <Link
              href="/admin/terms/add"
              className="flex items-center space-x-3 p-4 rounded-xl bg-green-50 hover:bg-green-100 transition-colors group"
            >
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">📝</span>
              </div>
              <div>
                <div className="font-semibold text-gray-900 group-hover:text-green-600">Add New Term</div>
                <div className="text-sm text-gray-600">Add financial term</div>
              </div>
            </Link>
            
            <Link
              href="/admin/flashcards/add"
              className="flex items-center space-x-3 p-4 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors group"
            >
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">🃏</span>
              </div>
              <div>
                <div className="font-semibold text-gray-900 group-hover:text-purple-600">Add New Flashcard</div>
                <div className="text-sm text-gray-600">Create flashcard</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 