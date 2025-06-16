"use client";

import Link from "next/link";

const modules = [
  { href: "/terms", label: "📚 Basic Financial Terms" },
  { href: "/quizzes", label: "📝 Quizzes" },
  { href: "/flashcards", label: "🃏 Flashcards" },
  { href: "/compound-interest", label: "📈 Compound Interest Simulator" },
  { href: "/risk-vs-reward", label: "🎲 Risk vs Reward" },
  { href: "/investments", label: "💸 Types of Investments" },
  { href: "/savings-goal", label: "🎯 Savings Goal Calculator" },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-blue-100 p-6">
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 text-green-800 text-center drop-shadow">FinIQ Lite – Teen Financial Literacy</h1>
      <p className="mb-8 text-lg text-gray-700 text-center max-w-xl">Empowering Indian teens (grades 10–12) to master money skills with fun, interactive modules. Start your journey below!</p>
      <div className="w-full max-w-md grid gap-4">
        {modules.map((mod) => (
          <Link
            key={mod.href}
            href={mod.href}
            className="block bg-white rounded-lg shadow hover:shadow-lg transition px-6 py-4 text-lg font-semibold flex items-center gap-3 border border-green-200 hover:bg-green-50"
          >
            {mod.label}
          </Link>
        ))}
      </div>
      <footer className="mt-12 text-gray-400 text-xs text-center">Made for Indian teens • FinIQ Lite</footer>
    </div>
  );
}
