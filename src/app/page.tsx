'use client';

import Link from 'next/link';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center p-8 pt-16 md:pt-8">
      <h1 className="text-4xl font-kode font-bold mb-8 animate-glow">ToolsEmpire</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        <Link href="/xp-calculator" className="terminal-button p-6 text-center">
          XP Calculator
        </Link>
        <Link href="/gift-card-generator" className="terminal-button p-6 text-center">
          Gift Card Generator
        </Link>
        <Link href="/case-battles-builder" className="terminal-button p-6 text-center">
          Case Battles Builder
        </Link>
      </div>

      <Footer />
    </main>
  );
}
