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
    <nav className="w-full bg-green-700 text-white py-3 px-6 shadow-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 sticky top-0 z-20">
      <span className="font-extrabold text-xl tracking-tight drop-shadow-sm">
        <Link href="/">FinIQ Lite</Link>
      </span>
      
      <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-4 text-sm font-medium">
        {/* Navigation Links - Only show if user is authenticated */}
        {user && navLinks.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={`px-3 py-1 rounded transition-all duration-150
              hover:bg-green-600 hover:text-yellow-200
              ${pathname === link.href ? "bg-white/20 font-bold text-yellow-200" : ""}
            `}
          >
            {link.label}
          </Link>
        ))}
        
        {/* Admin Link - Only show if user is admin */}
        {user && isAdmin && (
          <div className="border-l border-green-600 pl-2 ml-2">
            {adminLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1 rounded transition-all duration-150
                  hover:bg-green-600 hover:text-yellow-200
                  ${pathname.startsWith('/admin') ? "bg-white/20 font-bold text-yellow-200" : ""}
                `}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}

        {/* User Menu */}
        {user ? (
          <div className="relative ml-4">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 px-3 py-1 rounded hover:bg-green-600 transition-colors"
            >
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt={profile.name || 'User'}
                  className="w-6 h-6 rounded-full"
                />
              ) : (
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-xs font-bold">
                  {profile?.name?.charAt(0) || user.email?.charAt(0) || 'U'}
                </div>
              )}
              <span className="hidden sm:inline">{profile?.name || user.email}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-900">{profile?.name || 'User'}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                  {isAdmin && (
                    <span className="inline-block mt-1 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                      Admin
                    </span>
                  )}
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            href="/login"
            className="px-4 py-2 bg-white text-green-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            Sign In
          </Link>
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