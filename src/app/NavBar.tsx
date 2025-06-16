"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

export default function NavBar() {
  const pathname = usePathname();
  return (
    <nav className="w-full bg-green-700 text-white py-3 px-6 shadow-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 sticky top-0 z-20">
      <span className="font-extrabold text-xl tracking-tight drop-shadow-sm">
        <Link href="/">FinIQ Lite</Link>
      </span>
      <div className="flex flex-wrap justify-end gap-2 sm:gap-4 text-sm font-medium">
        {navLinks.map(link => (
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
      </div>
    </nav>
  );
} 