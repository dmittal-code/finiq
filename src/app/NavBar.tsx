"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";
import { signOut } from "../lib/auth";
import { useState } from "react";

// Organized with Dropdowns
const mainNavLinks = [
  { href: "/", label: "Home" },
  { href: "/terms", label: "Terms" },
];

const learningModules = [
  { href: "/quizzes", label: "Quizzes", icon: "📝" },
  { href: "/flashcards", label: "Flashcards", icon: "🃏" },
];

const calculators = [
  { href: "/compound-interest", label: "Compound Interest", icon: "📈" },
  { href: "/savings-goal", label: "Savings Goal", icon: "🎯" },
  { href: "/risk-vs-reward", label: "Risk vs Reward", icon: "🎲" },
  { href: "/investments", label: "Investments", icon: "💸" },
];

export default function NavBar() {
  const pathname = usePathname();
  const { user, profile, isAdmin } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLearningDropdown, setShowLearningDropdown] = useState(false);
  const [showCalculatorsDropdown, setShowCalculatorsDropdown] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      setShowUserMenu(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="w-full bg-white/95 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="group flex items-center space-x-3 hover:opacity-80 transition-all duration-200"
          >
            <div className="w-9 h-9 bg-gradient-to-r from-gray-700 to-slate-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <span className="text-lg font-bold text-white">💰</span>
            </div>
            <span className="text-2xl font-black text-gray-900 tracking-tight">
              FinIQ
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Main Links */}
            {user && mainNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-5 py-3 rounded-lg text-base font-bold transition-all duration-200 ${
                  pathname === link.href 
                    ? "bg-gradient-to-r from-gray-700 to-slate-700 text-white shadow-md" 
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-100 hover:shadow-sm"
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Learning Dropdown */}
            {user && (
              <div className="relative">
                <button
                  onMouseEnter={() => setShowLearningDropdown(true)}
                  onMouseLeave={() => setShowLearningDropdown(false)}
                  className={`px-5 py-3 rounded-lg text-base font-bold transition-all duration-200 flex items-center space-x-1 ${
                    learningModules.some(mod => pathname === mod.href)
                      ? "bg-gradient-to-r from-gray-700 to-slate-700 text-white shadow-md" 
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-100 hover:shadow-sm"
                  }`}
                >
                  <span>Learning</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showLearningDropdown && (
                  <div 
                    className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50"
                    onMouseEnter={() => setShowLearningDropdown(true)}
                    onMouseLeave={() => setShowLearningDropdown(false)}
                  >
                    {learningModules.map((mod) => (
                      <Link
                        key={mod.href}
                        href={mod.href}
                        className={`flex items-center space-x-3 px-4 py-4 text-base font-semibold transition-all duration-200 rounded-lg mx-2 ${
                          pathname === mod.href
                            ? "bg-gradient-to-r from-gray-700 to-slate-700 text-white shadow-md"
                            : "text-gray-700 hover:bg-gradient-to-r hover:from-gray-100 hover:to-slate-100 hover:text-gray-900 hover:shadow-sm"
                        }`}
                      >
                        <span className="text-lg">{mod.icon}</span>
                        <span className="font-bold">{mod.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Calculators Dropdown */}
            {user && (
              <div className="relative">
                <button
                  onMouseEnter={() => setShowCalculatorsDropdown(true)}
                  onMouseLeave={() => setShowCalculatorsDropdown(false)}
                  className={`px-5 py-3 rounded-lg text-base font-bold transition-all duration-200 flex items-center space-x-1 ${
                    calculators.some(calc => pathname === calc.href)
                      ? "bg-gradient-to-r from-gray-700 to-slate-700 text-white shadow-md" 
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-100 hover:shadow-sm"
                  }`}
                >
                  <span>Tools</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showCalculatorsDropdown && (
                  <div 
                    className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50"
                    onMouseEnter={() => setShowCalculatorsDropdown(true)}
                    onMouseLeave={() => setShowCalculatorsDropdown(false)}
                  >
                    {calculators.map((calc) => (
                      <Link
                        key={calc.href}
                        href={calc.href}
                        className={`flex items-center space-x-3 px-4 py-4 text-base font-semibold transition-all duration-200 rounded-lg mx-2 ${
                          pathname === calc.href
                            ? "bg-gradient-to-r from-gray-700 to-slate-700 text-white shadow-md"
                            : "text-gray-700 hover:bg-gradient-to-r hover:from-gray-100 hover:to-slate-100 hover:text-gray-900 hover:shadow-sm"
                        }`}
                      >
                        <span className="text-lg">{calc.icon}</span>
                        <span className="font-bold">{calc.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {/* Admin Link */}
            {user && isAdmin && (
              <Link
                href="/admin"
                className={`px-5 py-3 rounded-lg text-base font-bold transition-all duration-200 ${
                  pathname.startsWith('/admin') 
                    ? "bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-md" 
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-100 hover:shadow-sm"
                }`}
              >
                Admin
              </Link>
            )}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200"
                >
                  {profile?.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt={profile.name || 'User'}
                      className="w-8 h-8 rounded-full ring-2 ring-gray-200"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gradient-to-r from-gray-700 to-slate-700 rounded-full flex items-center justify-center text-sm font-bold text-white">
                      {profile?.name?.charAt(0) || user.email?.charAt(0) || 'U'}
                    </div>
                  )}
                  <span className="hidden sm:block text-sm font-medium text-gray-700">
                    {profile?.name || user.email}
                  </span>
                  <svg 
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{profile?.name || 'User'}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                      {isAdmin && (
                        <span className="inline-block mt-2 px-2 py-1 text-xs font-medium bg-slate-100 text-slate-700 rounded-full">
                          Admin
                        </span>
                      )}
                    </div>
                    <Link
                      href="/profile"
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>My Profile</span>
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2"
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
                className="px-4 py-2 bg-gradient-to-r from-gray-700 to-slate-700 text-white text-sm font-medium rounded-lg hover:from-gray-800 hover:to-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {user && (
          <div className="lg:hidden border-t border-gray-200 py-3">
            <div className="space-y-2">
              {mainNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-3 rounded-md text-base font-bold transition-all duration-200 ${
                    pathname === link.href 
                      ? "bg-gradient-to-r from-gray-700 to-slate-700 text-white shadow-md" 
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="pt-2 border-t border-gray-100">
                <p className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">Learning</p>
                {learningModules.map((mod) => (
                  <Link
                    key={mod.href}
                    href={mod.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-md text-base font-semibold transition-all duration-200 ${
                      pathname === mod.href 
                        ? "bg-gradient-to-r from-gray-700 to-slate-700 text-white shadow-md" 
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <span>{mod.icon}</span>
                    <span>{mod.label}</span>
                  </Link>
                ))}
              </div>
              
              <div className="pt-2 border-t border-gray-100">
                <p className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tools</p>
                {calculators.map((calc) => (
                  <Link
                    key={calc.href}
                    href={calc.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-md text-base font-semibold transition-all duration-200 ${
                      pathname === calc.href 
                        ? "bg-gradient-to-r from-gray-700 to-slate-700 text-white shadow-md" 
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <span>{calc.icon}</span>
                    <span>{calc.label}</span>
                  </Link>
                ))}
              </div>
              
              <div className="pt-2 border-t border-gray-100">
                <p className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">Account</p>
                <Link
                  href="/profile"
                  className={`flex items-center space-x-3 px-4 py-3 rounded-md text-base font-semibold transition-all duration-200 ${
                    pathname === '/profile' 
                      ? "bg-gradient-to-r from-gray-700 to-slate-700 text-white shadow-md" 
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <span>👤</span>
                  <span>My Profile</span>
                </Link>
              </div>
              
              {isAdmin && (
                <div className="pt-2 border-t border-gray-100">
                  <Link
                    href="/admin"
                    className={`block px-4 py-3 rounded-md text-base font-bold transition-all duration-200 ${
                      pathname.startsWith('/admin') 
                        ? "bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-md" 
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    Admin
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
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