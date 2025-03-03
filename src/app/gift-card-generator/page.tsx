'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '../components/Footer';

const COIN_OPTIONS = [10, 25, 50, 100, 250, 500, 1000, 1500];

const CoinIcon = () => (
  <Image
    src="/Coins.svg"
    alt="coins"
    width={16}
    height={16}
    className="inline-block ml-1 align-middle"
  />
);

export default function GiftCardGenerator() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [scrambledCode, setScrambledCode] = useState('');
  const [showCopied, setShowCopied] = useState(false);
  const duration = 2000;

  const generateRandomCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 5; j++) {
        code += chars[Math.floor(Math.random() * chars.length)];
      }
      if (i < 2) code += '-';
    }
    return code;
  };

  const scrambleAnimation = async () => {
    setIsGenerating(true);
    const finalCode = generateRandomCode();
    const duration = 2000; // 2 seconds
    const steps = 20;
    const stepDuration = duration / steps;

    for (let i = 0; i < steps; i++) {
      await new Promise(resolve => setTimeout(resolve, stepDuration));
      setScrambledCode(generateRandomCode());
    }

    setGeneratedCode(finalCode);
    setScrambledCode('');
    setIsGenerating(false);
  };

  const handleGenerate = () => {
    if (!selectedAmount) return;
    setShowCopied(false);
    scrambleAnimation();
  };

  const handleCopy = () => {
    if (!generatedCode) return;
    navigator.clipboard.writeText(generatedCode);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  return (
    <main className="min-h-screen flex flex-col items-center pt-16 md:pt-8 px-4 md:px-8">
      <Link href="/" className="back-button">
        Back
      </Link>
      <h1 className="text-4xl font-kode font-bold mb-8 animate-glow">Gift Card Generator</h1>
      
      <div className="w-full max-w-md space-y-8">
        <div className="grid grid-cols-2 gap-4">
          {COIN_OPTIONS.map((amount) => (
            <label
              key={amount}
              className={`
                flex items-center justify-between p-4 border-2 cursor-pointer
                ${selectedAmount === amount 
                  ? 'border-terminal-green bg-terminal-green/20' 
                  : 'border-terminal-green/50 hover:border-terminal-green/70'}
              `}
            >
              <span className="text-terminal-green">
                {amount.toLocaleString()} coins <CoinIcon />
              </span>
              <input
                type="radio"
                name="coinAmount"
                checked={selectedAmount === amount}
                onChange={() => setSelectedAmount(amount)}
                className="hidden"
              />
              <div className={`
                w-4 h-4 border-2 rounded-full
                ${selectedAmount === amount 
                  ? 'border-terminal-green bg-terminal-green' 
                  : 'border-terminal-green/50'}
              `} />
            </label>
          ))}
        </div>

        <button
          onClick={handleGenerate}
          disabled={!selectedAmount || isGenerating}
          className={`
            w-full terminal-button py-4
            ${(!selectedAmount || isGenerating) ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          Generate
        </button>

        {(isGenerating || generatedCode) && (
          <div className="mt-8 p-6 border-2 border-terminal-green bg-terminal-dark/50">
            <div className="text-center">
              <p className="text-sm text-terminal-green/70 mb-2">Your gift card code:</p>
              <p className="text-2xl font-mono text-terminal-green tracking-wider">
                {isGenerating ? scrambledCode : generatedCode}
              </p>
            </div>
            
            {!isGenerating && generatedCode && (
              <button
                onClick={handleCopy}
                className="w-full mt-4 terminal-button py-2 text-sm"
              >
                {showCopied ? 'Copied!' : 'Copy to Clipboard'}
              </button>
            )}
          </div>
        )}

        <div className="mt-8 p-4 border-2 border-yellow-500 bg-yellow-500/10 rounded">
          <p className="text-yellow-500 text-sm text-center">
            This is for satire/meme use only, if you&apos;re looking for free coins DM Enzo on CSGOEmpire Discord.
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
} 