'use client';

import Link from 'next/link';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center p-8 pt-16 md:pt-8">
      <h1 className="text-4xl font-kode font-bold mb-8 animate-glow">CSGOEmpire Tools</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        <Link href="/xp-calculator" className="terminal-card">
          <h2>XP Calculator</h2>
          <p>Calculate your CSGOEmpire XP and rewards</p>
        </Link>
        
        <Link href="/gift-card-generator" className="terminal-card">
          <h2>Gift Card Generator</h2>
          <p>Generate gift card codes for CSGOEmpire</p>
        </Link>
        
        <Link href="/case-battles-builder" className="terminal-card">
          <h2>Case Battles Builder</h2>
          <p>Create and customize case battles</p>
        </Link>
      </div>

      <a 
        href="https://csgoempire.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="terminal-button mt-12 animate-pulse-subtle"
      >
        Join CSGOEmpire
      </a>

      <Footer />
    </main>
  );
}
