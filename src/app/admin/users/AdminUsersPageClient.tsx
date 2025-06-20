'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '../../../supabaseClient';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar_url: string | null;
  is_admin: boolean;
  created_at: string;
  last_sign_in_at: string | null;
}

export default function AdminUsersPageClient() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Load users
  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true);
        
        // Get users from auth.users and their profiles
        const { data: profiles, error } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error loading users:', error);
        } else {
          setUsers(profiles || []);
        }
      } catch (error) {
        console.error('Error loading users:', error);
      } finally {
        setLoading(false);
      }
    }
    loadUsers();
  }, []);

  // Filter users
  const filteredUsers = users.filter(user => {
    const searchLower = searchTerm.toLowerCase();
    return user.name?.toLowerCase().includes(searchLower) ||
           user.email?.toLowerCase().includes(searchLower);
  });

  // Toggle admin status
  const toggleAdminStatus = async (user: UserProfile) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_admin: !user.is_admin })
        .eq('id', user.id);

      if (error) {
        console.error('Error updating admin status:', error);
        alert('Error updating admin status. Please try again.');
      } else {
        setUsers(users.map(u => 
          u.id === user.id ? { ...u, is_admin: !u.is_admin } : u
        ));
      }
    } catch (error) {
      console.error('Error updating admin status:', error);
      alert('Error updating admin status. Please try again.');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-8"></div>
            <h2 className="text-2xl font-semibold text-gray-600">Loading Users...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            👥 User Management
          </h1>
          <p className="text-gray-600">
            Manage user accounts and admin privileges
          </p>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🔍 Search users...
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search by name or email..."
              />
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredUsers.length} of {users.length} users
          </p>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {filteredUsers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">User</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Joined</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Last Sign In</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          {user.avatar_url ? (
                            <img
                              src={user.avatar_url}
                              alt={user.name || 'User'}
                              className="w-10 h-10 rounded-full ring-2 ring-gray-200"
                            />
                          ) : (
                            <div className="w-10 h-10 bg-gradient-to-r from-gray-700 to-slate-700 rounded-full flex items-center justify-center text-white font-bold">
                              {user.name?.charAt(0) || user.email?.charAt(0) || 'U'}
                            </div>
                          )}
                          <div>
                            <div className="font-semibold text-gray-900">{user.name || 'No name'}</div>
                            <div className="text-sm text-gray-600">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          user.is_admin 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.is_admin ? 'Admin' : 'User'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-900">{formatDate(user.created_at)}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-900">
                          {user.last_sign_in_at ? formatDate(user.last_sign_in_at) : 'Never'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => toggleAdminStatus(user)}
                          className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                            user.is_admin
                              ? 'bg-red-500 text-white hover:bg-red-600'
                              : 'bg-green-500 text-white hover:bg-green-600'
                          }`}
                        >
                          {user.is_admin ? '⬇️ Remove Admin' : '⬆️ Make Admin'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">👥</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Users Found</h3>
              <p className="text-gray-600">
                {searchTerm ? 'No users match your search criteria.' : 'No users have registered yet.'}
              </p>
            </div>
          )}
        </div>

        {/* Statistics */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="text-2xl font-bold text-blue-600">{users.length}</div>
            <div className="text-sm text-gray-600">Total Users</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="text-2xl font-bold text-red-600">
              {users.filter(u => u.is_admin).length}
            </div>
            <div className="text-sm text-gray-600">Admins</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="text-2xl font-bold text-green-600">
              {users.filter(u => !u.is_admin).length}
            </div>
            <div className="text-sm text-gray-600">Regular Users</div>
          </div>
        </div>

        {/* Back to Admin Dashboard */}
        <div className="mt-8 text-center">
          <Link
            href="/admin"
            className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            ← Back to Admin Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
} 