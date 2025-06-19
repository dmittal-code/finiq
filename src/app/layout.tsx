import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./NavBar";
import { AuthProvider } from "../contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FinIQ Lite - Teen Financial Literacy",
  description: "Empowering Indian teens with financial literacy through interactive learning modules, quizzes, and tools.",
  keywords: "financial literacy, teen education, Indian students, investments, savings, money management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <NavBar />
          {children}
          <footer className="w-full text-center py-4 mt-12 text-gray-500 text-sm border-t border-gray-200 bg-white/80 backdrop-blur-sm">
            Built by Kartik Mittal – proud student of SBS, Noida.
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
