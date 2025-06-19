"use client";

import Link from "next/link";

const modules = [
  { href: "/terms", label: "📚 Financial Terms Glossary", description: "Master essential financial concepts and terminology" },
  { href: "/quizzes", label: "📝 Interactive Quizzes", description: "Test your knowledge with fun financial quizzes" },
  { href: "/flashcards", label: "🃏 Learning Flashcards", description: "Review key concepts with interactive flashcards" },
  { href: "/compound-interest", label: "📈 Compound Interest Simulator", description: "See how your money grows over time" },
  { href: "/risk-vs-reward", label: "🎲 Risk vs Reward Explorer", description: "Understand investment risks and potential returns" },
  { href: "/investments", label: "💸 Investment Types Guide", description: "Learn about different investment options" },
  { href: "/savings-goal", label: "🎯 Savings Goal Calculator", description: "Plan and track your savings goals" },
];

const features = [
  {
    icon: "🎓",
    title: "Age-Appropriate Learning",
    description: "Designed specifically for Indian teens (grades 10-12) with relatable examples and Indian context"
  },
  {
    icon: "💰",
    title: "Practical Financial Skills",
    description: "Learn real-world money management, investing, and saving strategies you can use today"
  },
  {
    icon: "🎮",
    title: "Interactive & Fun",
    description: "Engage with interactive tools, quizzes, and simulations to make learning enjoyable"
  },
  {
    icon: "🇮🇳",
    title: "Indian Context",
    description: "Understand financial concepts in the context of Indian markets, regulations, and opportunities"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
              <span className="text-green-600">FinIQ</span> Lite
            </h1>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
              Empowering Indian Teens with Financial Literacy
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Master essential money skills through interactive learning modules designed specifically for Indian students in grades 10-12. 
              Learn about investments, savings, budgeting, and financial planning in a fun, engaging way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/terms"
                className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Start Learning
              </Link>
              <Link
                href="/quizzes"
                className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Take a Quiz
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Choose FinIQ Lite?</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform is specifically designed to help Indian teens build a strong foundation in financial literacy
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Learning Modules Section */}
      <div className="py-16 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Your Learning Journey</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our comprehensive modules designed to build your financial knowledge step by step
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((mod) => (
              <Link
                key={mod.href}
                href={mod.href}
                className="block bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 hover:border-green-300 hover:bg-green-50 group"
              >
                <div className="flex items-start space-x-4">
                  <div className="text-3xl group-hover:scale-110 transition-transform">
                    {mod.label.split(' ')[0]}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
                      {mod.label.split(' ').slice(1).join(' ')}
                    </h4>
                    <p className="text-gray-600 text-sm">{mod.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 bg-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Master Your Financial Future?
          </h3>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of Indian teens building essential money skills for life
          </p>
          <Link
            href="/terms"
            className="bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl inline-block"
          >
            Start Your Financial Education Today
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            Made with ❤️ for Indian teens • Empowering the next generation of financially literate individuals
          </p>
          <p className="text-sm text-gray-500 mt-2">
            FinIQ Lite - Your gateway to financial literacy
          </p>
        </div>
      </footer>
    </div>
  );
}
