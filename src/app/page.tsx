"use client";

import Link from "next/link";

const modules = [
  { href: "/terms", label: "📚 Financial Terms Glossary", description: "Master essential financial concepts and terminology", color: "from-blue-500 to-cyan-500" },
  { href: "/quizzes", label: "📝 Interactive Quizzes", description: "Test your knowledge with fun financial quizzes", color: "from-purple-500 to-pink-500" },
  { href: "/flashcards", label: "🃏 Learning Flashcards", description: "Review key concepts with interactive flashcards", color: "from-green-500 to-emerald-500" },
  { href: "/compound-interest", label: "📈 Compound Interest Simulator", description: "See how your money grows over time", color: "from-orange-500 to-red-500" },
  { href: "/risk-vs-reward", label: "🎲 Risk vs Reward Explorer", description: "Understand investment risks and potential returns", color: "from-indigo-500 to-purple-500" },
  { href: "/investments", label: "💸 Investment Types Guide", description: "Learn about different investment options", color: "from-teal-500 to-blue-500" },
  { href: "/savings-goal", label: "🎯 Savings Goal Calculator", description: "Plan and track your savings goals", color: "from-yellow-500 to-orange-500" },
];

const features = [
  {
    icon: "🎓",
    title: "Age-Appropriate Learning",
    description: "Designed specifically for Indian teens (grades 10-12) with relatable examples and Indian context",
    gradient: "from-blue-500 to-purple-500"
  },
  {
    icon: "💰",
    title: "Practical Financial Skills",
    description: "Learn real-world money management, investing, and saving strategies you can use today",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    icon: "🎮",
    title: "Interactive & Fun",
    description: "Engage with interactive tools, quizzes, and simulations to make learning enjoyable",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: "🇮🇳",
    title: "Indian Context",
    description: "Understand financial concepts in the context of Indian markets, regulations, and opportunities",
    gradient: "from-orange-500 to-red-500"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-indigo-600/5"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center animate-fade-in">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl shadow-2xl mb-6 animate-scale-in">
                <span className="text-3xl">💰</span>
              </div>
            </div>
            
            <h1 className="text-display font-black text-gray-900 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                FinIQ
              </span>
              <span className="text-gray-800"> Lite</span>
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
                className="btn-primary text-lg px-10 py-4"
              >
                🚀 Start Learning
              </Link>
              <Link
                href="/quizzes"
                className="btn-secondary text-lg px-10 py-4"
              >
                🎯 Take a Quiz
              </Link>
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
      <div className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h3 className="text-heading-1 font-bold text-gray-900 mb-6">Your Learning Journey</h3>
            <p className="text-body-large text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Explore our comprehensive modules designed to build your financial knowledge step by step
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modules.map((mod, index) => (
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
                      <h4 className="text-heading-3 font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                        {mod.label.split(' ').slice(1).join(' ')}
                      </h4>
                      <p className="text-body text-gray-600 leading-relaxed">{mod.description}</p>
                      <div className="mt-4 flex items-center text-blue-600 text-body-small font-medium group-hover:text-blue-700 transition-colors">
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
      <div className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 animate-fade-in">
          <h3 className="text-heading-1 font-bold text-white mb-6">
            Ready to Master Your Financial Future?
          </h3>
          <p className="text-body-large text-blue-100 mb-10 leading-relaxed">
            Join thousands of Indian teens building essential money skills for life
          </p>
          <Link
            href="/terms"
            className="btn-accent text-lg px-12 py-4 inline-flex items-center space-x-2"
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
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl mb-4">
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
