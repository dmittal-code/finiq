"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";
import { signOut } from "../lib/auth";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/terms", label: "Terms" },
  { href: "/quizzes", label: "Quizzes" },
  { href: "/flashcards", label: "Flashcards" },
  { href: "/compound-interest", label: "Compound Interest" },
  { href: "/risk-vs-reward", label: "Risk vs Reward" },
  { href: "/investments", label: "Investments" },
  { href: "/savings-goal", label: "Savings Goal" },
];

const adminLinks = [
  { href: "/admin/terms", label: "Admin" },
];

export default function NavBar() {
  const pathname = usePathname();
  const { user, profile, isAdmin } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      setShowUserMenu(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white py-4 px-6 shadow-2xl backdrop-blur-sm border-b border-white/10 sticky top-0 z-20">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
        {/* Logo */}
        <Link 
          href="/" 
          className="group flex items-center space-x-2 animate-fade-in"
        >
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/30 group-hover:bg-white/30 transition-all duration-300">
            <span className="text-xl font-black text-white">💰</span>
          </div>
          <span className="text-heading-2 font-black tracking-tight text-white drop-shadow-sm group-hover:drop-shadow-md transition-all duration-300">
            FinIQ Lite
          </span>
        </Link>
        
        {/* Navigation Links */}
        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 sm:gap-1 text-body-small font-medium">
          {user && navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 animate-slide-in-left`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className={`relative px-3 py-1.5 rounded-lg transition-all duration-300 ${
                pathname === link.href 
                  ? "bg-white/25 text-white font-semibold shadow-lg backdrop-blur-sm" 
                  : "text-white/90 hover:bg-white/15 hover:text-white"
              }`}>
                {link.label}
                {pathname === link.href && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-yellow-300 rounded-full animate-pulse-slow"></div>
                )}
              </span>
            </Link>
          ))}
          
          {/* Admin Link */}
          {user && isAdmin && (
            <div className="border-l border-white/20 pl-3 ml-3 animate-slide-in-right">
              {adminLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-105`}
                >
                  <span className={`relative px-3 py-1.5 rounded-lg transition-all duration-300 ${
                    pathname.startsWith('/admin') 
                      ? "bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg" 
                      : "text-white/90 hover:bg-white/15 hover:text-white"
                  }`}>
                    {link.label}
                    {pathname.startsWith('/admin') && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-yellow-300 rounded-full animate-pulse-slow"></div>
                    )}
                  </span>
                </Link>
              ))}
            </div>
          )}

          {/* User Menu */}
          {user ? (
            <div className="relative ml-4 animate-scale-in">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-3 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/30 transform hover:scale-105"
              >
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={profile.name || 'User'}
                    className="w-8 h-8 rounded-full ring-2 ring-white/30"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg">
                    {profile?.name?.charAt(0) || user.email?.charAt(0) || 'U'}
                  </div>
                )}
                <span className="hidden sm:inline text-body-small font-medium">
                  {profile?.name || user.email}
                </span>
                <svg 
                  className={`w-4 h-4 transition-transform duration-300 ${showUserMenu ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-3 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl py-3 z-50 border border-white/20 animate-scale-in">
                  <div className="px-4 py-3 border-b border-gray-200/50">
                    <p className="text-body font-semibold text-gray-900">{profile?.name || 'User'}</p>
                    <p className="text-body-small text-gray-500">{user.email}</p>
                    {isAdmin && (
                      <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 rounded-full">
                        👑 Admin
                      </span>
                    )}
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-3 text-body-small text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="btn-primary animate-slide-in-right"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>

      {/* Mobile menu backdrop */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </nav>
  );
} 