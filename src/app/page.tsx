'use client';

import Link from 'next/link';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center p-8 pt-16 md:pt-8">
      <div className="w-full max-w-6xl relative">
        <a 
          href="https://csgoempire.com/r/KURTIK" 
          target="_blank" 
          rel="noopener noreferrer"
          className="terminal-button absolute top-0 right-0 bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
        >
          Join CSGOEmpire
        </a>
      </div>

      <h1 className="text-4xl font-kode font-bold mb-8 animate-glow">ToolsEmpire</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        <div className="flex flex-col">
          <Link href="/xp-calculator" className="terminal-button p-6 text-center">
            XP Calculator
          </Link>
          <p className="mt-4 text-terminal-green/70 text-sm">
            Ever wanted to know how much you need to wager for your target level or how much XP you will get on a specific game mode? XP Calculator will calculate it for you, made for all the jews out there
          </p>
        </div>
        
        <div className="flex flex-col">
          <Link href="/gift-card-generator" className="terminal-button p-6 text-center">
            Gift Card Generator
          </Link>
          <p className="mt-4 text-terminal-green/70 text-sm">
            So you want free coins? Rumour says Enzo uses this generator to give free coins to the people in his DMs
          </p>
        </div>
        
        <div className="flex flex-col">
          <Link href="/case-battles-builder" className="terminal-button p-6 text-center">
            Case Battles Builder
          </Link>
          <p className="mt-4 text-terminal-green/70 text-sm">
            Don't know what cases to use for you battles? Use this to build the perfect cases for your battles
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
