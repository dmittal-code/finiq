"use client";

import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";

const modules = [
  { href: "/terms", label: "📚 Financial Terms Glossary", description: "Master essential financial concepts and terminology", color: "from-gray-600 to-slate-600" },
  { href: "/quizzes", label: "📝 Interactive Quizzes", description: "Test your knowledge with fun financial quizzes", color: "from-slate-600 to-gray-600" },
  { href: "/flashcards", label: "🃏 Learning Flashcards", description: "Review key concepts with interactive flashcards", color: "from-gray-700 to-slate-700" },
  { href: "/compound-interest", label: "📈 Compound Interest Simulator", description: "See how your money grows over time", color: "from-slate-700 to-gray-700" },
  { href: "/risk-vs-reward", label: "🎲 Risk vs Reward Explorer", description: "Understand investment risks and potential returns", color: "from-gray-600 to-slate-600" },
  { href: "/investments", label: "💸 Investment Types Guide", description: "Learn about different investment options", color: "from-slate-600 to-gray-600" },
  { href: "/savings-goal", label: "🎯 Savings Goal Calculator", description: "Plan and track your savings goals", color: "from-gray-700 to-slate-700" },
];

const features = [
  {
    icon: "🎓",
    title: "Age-Appropriate Learning",
    description: "Designed specifically for Indian teens (grades 10-12) with relatable examples and Indian context",
    gradient: "from-gray-600 to-slate-600"
  },
  {
    icon: "💰",
    title: "Practical Financial Skills",
    description: "Learn real-world money management, investing, and saving strategies you can use today",
    gradient: "from-slate-600 to-gray-600"
  },
  {
    icon: "🎮",
    title: "Interactive & Fun",
    description: "Engage with interactive tools, quizzes, and simulations to make learning enjoyable",
    gradient: "from-gray-700 to-slate-700"
  },
  {
    icon: "🇮🇳",
    title: "Indian Context",
    description: "Understand financial concepts in the context of Indian markets, regulations, and opportunities",
    gradient: "from-slate-700 to-gray-700"
  }
];

export default function Home() {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-slate-100 to-blue-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-600/5 via-slate-600/5 to-gray-700/5"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center animate-fade-in">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-gray-700 to-slate-700 rounded-3xl shadow-2xl mb-6 animate-scale-in">
                <span className="text-3xl">💰</span>
              </div>
            </div>
            
            <h1 className="text-display font-black text-gray-900 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-gray-700 via-slate-700 to-gray-800 bg-clip-text text-transparent">
                FinIQ
              </span>
            </h1>
            
            <h2 className="text-heading-2 font-bold text-gray-800 mb-8 leading-relaxed">
              Empowering Indian Teens with Financial Literacy
            </h2>
            
            <p className="text-body-large text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Master essential money skills through interactive learning modules designed specifically for Indian students in grades 10-12. 
              Learn about investments, savings, budgeting, and financial planning in a fun, engaging way.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-slide-in-left">
              <Link
                href="/terms"
                className="bg-gradient-to-r from-gray-700 to-slate-700 text-white text-lg px-10 py-4 rounded-lg font-semibold hover:from-gray-800 hover:to-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                🚀 Start Learning
              </Link>
              {user && (
                <Link
                  href="/quizzes"
                  className="bg-white text-gray-600 border-2 border-gray-300 text-lg px-10 py-4 rounded-lg font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
                >
                  🎯 Take a Quiz
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h3 className="text-heading-1 font-bold text-gray-900 mb-6">Why Choose FinIQ?</h3>
            <p className="text-body-large text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our platform is specifically designed to help Indian teens build a strong foundation in financial literacy
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group text-center p-8 rounded-2xl bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-500 border border-gray-200/50 hover:border-gray-300/50 shadow-lg hover:shadow-xl animate-slide-in-left"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h4 className="text-heading-3 font-semibold text-gray-900 mb-4">{feature.title}</h4>
                <p className="text-body text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Learning Modules Section */}
      <div className="py-20 bg-gradient-to-br from-gray-100 via-slate-100 to-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h3 className="text-heading-1 font-bold text-gray-900 mb-6">Your Learning Journey</h3>
            <p className="text-body-large text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Explore our comprehensive modules designed to build your financial knowledge step by step
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modules.filter(mod => user || mod.href !== "/quizzes").map((mod, index) => (
              <Link
                key={mod.href}
                href={mod.href}
                className="group block animate-scale-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="card card-hover p-8 h-full">
                  <div className="flex items-start space-x-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${mod.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <span className="text-2xl">{mod.label.split(' ')[0]}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-heading-3 font-semibold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors leading-tight">
                        {mod.label.split(' ').slice(1).join(' ')}
                      </h4>
                      <p className="text-body text-gray-600 leading-relaxed">{mod.description}</p>
                      <div className="mt-4 flex items-center text-gray-600 text-body-small font-medium group-hover:text-gray-700 transition-colors">
                        <span>Explore module</span>
                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-20 bg-gradient-to-r from-gray-700 via-slate-700 to-gray-800 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 animate-fade-in">
          <h3 className="text-heading-1 font-bold text-white mb-6">
            Ready to Master Your Financial Future?
          </h3>
          <p className="text-body-large text-gray-100 mb-10 leading-relaxed">
            Join thousands of Indian teens building essential money skills for life
          </p>
          <Link
            href="/terms"
            className="bg-white text-gray-800 text-lg px-12 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center space-x-2"
          >
            <span>Start Your Financial Education Today</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-gray-700 to-slate-700 rounded-xl mb-4">
              <span className="text-lg">💰</span>
            </div>
                          <h4 className="text-heading-3 font-bold text-white mb-2">FinIQ</h4>
          </div>
          <p className="text-body text-gray-400 mb-4 leading-relaxed">
            Made with ❤️ for Indian teens • Empowering the next generation of financially literate individuals
          </p>
          <p className="text-body-small text-gray-500">
            Your gateway to financial literacy
          </p>
          <div className="mt-6 pt-6 border-t border-gray-800">
            <p className="text-body-small text-gray-500">
              Built by Kartik Mittal – proud student of SBS, Noida.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
