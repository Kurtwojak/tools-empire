'use client';

import Link from 'next/link';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col relative">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 pt-4 sm:pt-8">
        <div className="relative sm:absolute sm:top-8 sm:right-8">
          <a 
            href="https://csgoempire.com/r/KURTIK" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-yellow-400 hover:bg-yellow-500 text-black text-sm sm:text-base font-bold rounded transition-all duration-300 animate-pulse-glow shadow-glow-yellow hover:shadow-glow-yellow-hover"
          >
            Join CSGOEmpire
          </a>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-kode font-bold mb-8 sm:mb-12 animate-glow">ToolsEmpire</h1>
        
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
            <p className="text-sm text-terminal-green/70 max-w-[500px] text-center mb-8">
              Build your own case battle with ease. Choose from a wide variety of cases and create your perfect battle setup.
            </p>
          </div>
          
          <div className="flex flex-col items-center">
            <Link href="/commission-calculator" className="terminal-button p-6 text-center w-full">
              Commission Calculator
            </Link>
            <p className="text-sm text-terminal-green/70 max-w-[500px] text-center mb-8">
              Wanna be the ultimate jew and calculate how much commission you&apos;ll earn off of your referrals? Perfect tool for you
            </p>
          </div>
        </div>

        <Footer />
      </div>
    </main>
  );
}
