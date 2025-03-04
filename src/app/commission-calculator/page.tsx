'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function CommissionCalculator() {
  const [wager, setWager] = useState<string>('');

  const calculateCommission = (wager: number, houseEdge: number) => {
    return (wager * houseEdge * 0.3) * 0.55;
  };

  const gameModesData = [
    {
      name: 'Roulette',
      icon: '/Roulette.svg',
      houseEdge: 0.0666,
    },
    {
      name: 'Cases & Case Battles',
      icon: '/Cases.svg',
      houseEdge: 0.088,
    },
    {
      name: 'Coinflip',
      icon: '/Coinflip.svg',
      houseEdge: 0.005,
    },
    {
      name: 'Match Betting',
      icon: '/Matchbet.svg',
      houseEdge: 0.04,
    },
  ];

  return (
    <main className="min-h-screen flex flex-col items-center p-8">
      <Link href="/" className="back-button">
        Back
      </Link>
      
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 animate-glow">Commission Calculator</h1>
      
      <div className="w-full max-w-2xl">
        <div className="terminal-box p-6 mb-8">
          <label className="block text-terminal-green mb-2">Enter Wager Amount:</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={wager}
              onChange={(e) => setWager(e.target.value)}
              className="w-full bg-black border border-terminal-green p-2 rounded text-terminal-green focus:outline-none focus:border-terminal-green/70"
              placeholder="Enter amount..."
            />
            <Image src="/Coins.svg" alt="coins" width={20} height={20} />
          </div>
        </div>

        <h2 className="text-terminal-green mb-4 text-lg">Commission Earned:</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {gameModesData.map((mode) => (
            <div key={mode.name} className="terminal-box p-4">
              <div className="flex items-center gap-2 mb-2">
                <Image src={mode.icon} alt={mode.name} width={24} height={24} />
                <h3 className="text-lg">{mode.name}</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-terminal-green">
                  {wager ? calculateCommission(Number(wager), mode.houseEdge).toFixed(4) : '0.0000'}
                </span>
                <Image src="/Coins.svg" alt="coins" width={16} height={16} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-sm text-terminal-green/70">
          <p>Commission calculation formula: (Wager * House Edge * 0.3) * 0.55</p>
          <p className="mt-2">House Edges:</p>
          <ul className="list-disc list-inside mt-1">
            <li>Roulette: 6.66%</li>
            <li>Cases & Case Battles: 8.8%</li>
            <li>Coinflip: 0.5%</li>
            <li>Match Betting: 4%</li>
          </ul>
        </div>
      </div>
    </main>
  );
} 