'use client';

import Link from 'next/link';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="w-full max-w-6xl mx-auto px-8 pt-8">
        <a 
          href="https://csgoempire.com/r/KURTIK" 
          target="_blank" 
          rel="noopener noreferrer"
          className="absolute top-8 right-8 px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded transition-all duration-300 animate-pulse-glow shadow-glow-yellow hover:shadow-glow-yellow-hover"
        >
          Join CSGOEmpire
        </a>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-kode font-bold mb-12 animate-glow">ToolsEmpire</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          <div className="flex flex-col items-center">
            <Link href="/xp-calculator" className="terminal-button p-6 text-center w-full">
              XP Calculator
            </Link>
            <p className="mt-4 text-terminal-green/70 text-sm text-center">
              Ever wanted to know how much you need to wager for your target level or how much XP you will get on a specific game mode? XP Calculator will calculate it for you, made for all the jews out there
            </p>
          </div>
          
          <div className="flex flex-col items-center">
            <Link href="/gift-card-generator" className="terminal-button p-6 text-center w-full">
              Gift Card Generator
            </Link>
            <p className="mt-4 text-terminal-green/70 text-sm text-center">
              So you want free coins? Rumour says Enzo uses this generator to give free coins to the people in his DMs
            </p>
          </div>
          
          <div className="flex flex-col items-center">
            <Link href="/case-battles-builder" className="terminal-button p-6 text-center w-full">
              Case Battles Builder
            </Link>
            <p className="mt-4 text-terminal-green/70 text-sm text-center">
              Don't know what cases to use for you battles? Use this to build the perfect cases for your battles
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
