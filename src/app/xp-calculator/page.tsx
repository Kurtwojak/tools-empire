/* eslint-disable react/no-unescaped-entities */
'use client';

import { useState, ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '../components/Footer';

type CalculatorMode = 'wager' | 'level';
type RankName = 'Rust' | 'Bronze' | 'Silver' | 'Gold' | 'Diamond' | 'Uranium' | 'Unbreakable';
type GameMode = 'Roulette' | 'Cases' | 'CaseBattle' | 'Coinflip' | 'MatchbetSingle' | 'MatchbetCombo';

const GAME_MODE_XP: Record<GameMode, number> = {
  'Roulette': 100,
  'Cases': 90,
  'CaseBattle': 90,
  'Coinflip': 10,
  'MatchbetSingle': 25,
  'MatchbetCombo': 50
};

const GAME_MODE_ICONS: Record<GameMode, string> = {
  'Roulette': '/Roulette.svg',
  'Cases': '/Cases.svg',
  'CaseBattle': '/CaseBattle.svg',
  'Coinflip': '/Coinflip.svg',
  'MatchbetSingle': '/Matchbet.svg',
  'MatchbetCombo': '/Matchbet.svg'
};

const RANK_ICONS: Record<RankName, string> = {
  'Rust': '/ranks/rust.png',
  'Bronze': '/ranks/bronze.png',
  'Silver': '/ranks/silver.png',
  'Gold': '/ranks/gold.png',
  'Diamond': '/ranks/diamond.png',
  'Uranium': '/ranks/uranium.png',
  'Unbreakable': '/ranks/unbreakable.png'
};

const LEVEL_XP_MAP: { [key: number]: number } = {
  1: 0.1, 2: 100, 3: 250, 4: 500, 5: 800, 6: 1200, 7: 1900, 8: 3000, 9: 4500, 10: 6200,
  11: 8300, 12: 10800, 13: 13800, 14: 17300, 15: 21300, 16: 25800, 17: 30900, 18: 36600, 19: 42900, 20: 50000,
  21: 58000, 22: 67000, 23: 77000, 24: 87500, 25: 99000, 26: 111500, 27: 125000, 28: 139500, 29: 156000, 30: 175000,
  31: 197000, 32: 223000, 33: 255000, 34: 293000, 35: 339000, 36: 394000, 37: 460000, 38: 537000, 39: 629000, 40: 740000,
  41: 878000, 42: 1036000, 43: 1214000, 44: 1413000, 45: 1634000, 46: 1879000, 47: 2149000, 48: 2445000, 49: 2777000, 50: 3127000,
  51: 3513000, 52: 3934000, 53: 4389000, 54: 4882000, 55: 5412000, 56: 5983000, 57: 6596000, 58: 7253000, 59: 7956000, 60: 8700000,
  61: 9500000, 62: 10350000, 63: 11260000, 64: 12220000, 65: 13240000, 66: 14320000, 67: 15460000, 68: 16660000, 69: 17930000, 70: 19270000,
  71: 20670000, 72: 22150000, 73: 23700000, 74: 25340000, 75: 27050000, 76: 28840000, 77: 30720000, 78: 32680000, 79: 34730000, 80: 37000000,
  81: 40000000, 82: 43000000, 83: 47000000, 84: 51000000, 85: 56000000, 86: 61000000, 87: 67000000, 88: 73000000, 89: 80000000, 90: 87000000,
  91: 96000000, 92: 106000000, 93: 118000000, 94: 133000000, 95: 150000000, 96: 170000000, 97: 195000000, 98: 225000000, 99: 260000000, 100: 300000000,
  101: 350000000, 102: 410000000, 103: 480000000, 104: 560000000, 105: 650000000, 106: 750000000, 107: 850000000, 108: 960000000, 109: 1080000000, 110: 1200000000,
  111: 1335000000, 112: 1485000000, 113: 1655000000, 114: 1850000000, 115: 2070000000, 116: 2340000000, 117: 2655000000, 118: 3030000000, 119: 3475000000, 120: 4200000000,
  121: 5000000000, 122: 6000000000, 123: 7200000000, 124: 8500000000, 125: 10000000000, 126: 11700000000, 127: 13500000000, 128: 15500000000, 129: 18000000000
};

const getLevelName = (level: number): RankName => {
  if (level <= 19) return 'Rust';
  if (level <= 39) return 'Bronze';
  if (level <= 59) return 'Silver';
  if (level <= 79) return 'Gold';
  if (level <= 99) return 'Diamond';
  if (level <= 119) return 'Uranium';
  return 'Unbreakable';
};

const getCurrentLevel = (xp: number): number => {
  let level = 1;
  for (let i = 1; i <= 129; i++) {
    if (xp >= LEVEL_XP_MAP[i]) {
      level = i;
    } else {
      break;
    }
  }
  return level;
};

const getNextLevelXP = (currentLevel: number): number => {
  return currentLevel < 129 ? LEVEL_XP_MAP[currentLevel + 1] : LEVEL_XP_MAP[129];
};

const GameModeIcon = ({ mode }: { mode: GameMode }) => (
  <Image
    src={GAME_MODE_ICONS[mode]}
    alt={mode}
    width={20}
    height={20}
    className="inline-block ml-1 align-middle"
  />
);

const RankIcon = ({ rank }: { rank: RankName }) => (
  <Image
    src={RANK_ICONS[rank]}
    alt={rank}
    width={24}
    height={24}
    className="inline-block ml-2 align-middle"
  />
);

const CoinIcon = () => (
  <Image
    src="/coins.svg"
    alt="coins"
    width={16}
    height={16}
    className="inline-block ml-1 align-middle"
  />
);

const CoinsWithIcon = () => (
  <span className="whitespace-nowrap">
    coins <CoinIcon />
  </span>
);

const InfoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="inline-block ml-2 cursor-help text-terminal-green/70 hover:text-terminal-green"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const TooltipImage = () => (
  <div className="absolute z-50 -right-32 top-8 bg-terminal-dark border-2 border-terminal-green p-2 rounded-lg shadow-lg">
    <Image
      src="/xp_guide.jpg"
      alt="XP Guide"
      width={500}
      height={167}
      className="rounded"
    />
    <div className="text-xs text-terminal-green mt-2 text-center">
      Your progress XP is the amount shown before the "/" in your XP display
    </div>
  </div>
);

const LevelProgressBar = ({ currentXP, currentLevel }: { currentXP: number, currentLevel: number }) => {
  const currentLevelXP = LEVEL_XP_MAP[currentLevel];
  const nextLevelXP = getNextLevelXP(currentLevel);
  const progress = ((currentXP - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;
  const nextLevel = currentLevel + 1;
  const currentRank = getLevelName(currentLevel);
  const nextRank = getLevelName(nextLevel);

  return (
    <div className="mt-6 p-4 border-2 border-terminal-green bg-terminal-dark/50">
      <div className="flex items-center justify-between mb-2">
        <div>
          Level {currentLevel} <RankIcon rank={currentRank} />
        </div>
        <div>
          Level {nextLevel} <RankIcon rank={nextRank} />
        </div>
      </div>
      <div className="w-full h-4 bg-terminal-dark border-2 border-terminal-green">
        <div 
          className="h-full bg-yellow-500 transition-all duration-500 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
      <div className="text-center mt-2 text-terminal-green">
        {progress.toFixed(2)}% to Level {nextLevel}
      </div>
      <div className="text-center text-sm text-terminal-green/70">
        {(nextLevelXP - currentXP).toLocaleString()} XP remaining
      </div>
    </div>
  );
};

export default function XPCalculator() {
  const [mode, setMode] = useState<CalculatorMode>('wager');
  const [currentLevel, setCurrentLevel] = useState('');
  const [progressXP, setProgressXP] = useState('');
  const [wagerAmount, setWagerAmount] = useState('');
  const [desiredLevel, setDesiredLevel] = useState('');
  const [result, setResult] = useState<ReactNode | null>(null);

  const calculateTotalXP = (level: number, progress: number): number => {
    const baseXP = LEVEL_XP_MAP[level];
    return baseXP + progress;
  };

  const calculateXPFromWager = (level: number, progress: number, wager: number, mode: GameMode) => {
    const currentXP = calculateTotalXP(level, progress);
    const xpGain = wager * GAME_MODE_XP[mode];
    const newXP = currentXP + xpGain;
    const newLevel = getCurrentLevel(newXP);
    const currentRank = getLevelName(level);
    const newRank = getLevelName(newLevel);
    
    return {
      xp: newXP,
      xpGain,
      currentLevel: level,
      newLevel,
      currentRank,
      newRank
    };
  };

  const calculateRequiredWager = (level: number, progress: number, targetLevel: number) => {
    const currentXP = calculateTotalXP(level, progress);
    const targetXP = LEVEL_XP_MAP[targetLevel];
    return Math.max(0, targetXP - currentXP);
  };

  const handleCalculate = () => {
    const level = parseInt(currentLevel);
    const progress = parseFloat(progressXP);
    
    if (isNaN(level) || level < 1 || level > 129) {
      setResult(<>Please enter a valid level (1-129)</>);
      return;
    }

    const maxProgress = LEVEL_XP_MAP[level + 1] - LEVEL_XP_MAP[level];
    if (isNaN(progress) || progress < 0 || progress > maxProgress) {
      setResult(
        <>Please enter a valid progress XP (0-{maxProgress.toLocaleString()})</>
      );
      return;
    }

    if (mode === 'wager') {
      const wager = parseFloat(wagerAmount);
      if (isNaN(wager) || wager < 0) {
        setResult(<>Please enter a valid wager amount</>);
        return;
      }

      const currentRank = getLevelName(level);
      
      const resultJSX = (
        <>
          Current: Level {level} ({currentRank}) <RankIcon rank={currentRank} />
          {'\n\n'}With a wager of {wager.toLocaleString()} <CoinsWithIcon />:
          {'\n\n'}
          {Object.entries(GAME_MODE_XP).map(([gameMode, multiplier]) => {
            const { xp: newXP, xpGain, newLevel, newRank } = calculateXPFromWager(level, progress, wager, gameMode as GameMode);
            const levelDiff = newLevel - level;
            const nextLevelXP = getNextLevelXP(newLevel);
            
            return (
              <div key={gameMode} className="mt-4">
                • {gameMode} <GameModeIcon mode={gameMode as GameMode} /> ({multiplier}xp per coin wagered)
                {'\n'}  → Gain {xpGain.toLocaleString()} XP
                {'\n'}  → Total XP: {newXP.toLocaleString()}
                {'\n'}  → New Level: {newLevel} ({newRank}) <RankIcon rank={newRank} />
                {levelDiff > 0 && (
                  <>{'\n'}  → Level up! +{levelDiff} levels</>
                )}
                {newLevel < 129 && (
                  <>{'\n'}  → XP needed for next level: {(nextLevelXP - newXP).toLocaleString()}</>
                )}
              </div>
            );
          })}
        </>
      );
      
      setResult(resultJSX);
    } else {
      const targetLevel = parseInt(desiredLevel);
      if (isNaN(targetLevel) || targetLevel < 1 || targetLevel > 129) {
        setResult(<>Please enter a valid desired level (1-129)</>);
        return;
      }

      if (targetLevel <= level) {
        const currentRank = getLevelName(level);
        setResult(
          <>
            You are already level {level} ({currentRank}) <RankIcon rank={currentRank} />!
          </>
        );
        return;
      }

      const requiredWager = calculateRequiredWager(level, progress, targetLevel);
      const currentRank = getLevelName(level);
      const targetRank = getLevelName(targetLevel);
      
      const resultJSX = (
        <>
          Current: Level {level} ({currentRank}) <RankIcon rank={currentRank} />
          {'\n'}Target: Level {targetLevel} ({targetRank}) <RankIcon rank={targetRank} />
          {'\n'}To reach Level {targetLevel}, you need to wager:
          {'\n'}• {Math.ceil(requiredWager / GAME_MODE_XP['Roulette']).toLocaleString()} coins in Roulette <GameModeIcon mode=&quot;Roulette&quot; />
          {'\n'}• {Math.ceil(requiredWager / GAME_MODE_XP['Cases']).toLocaleString()} coins in Cases <GameModeIcon mode=&quot;Cases&quot; />
          {'\n'}• {Math.ceil(requiredWager / GAME_MODE_XP['CaseBattle']).toLocaleString()} coins in Case Battles <GameModeIcon mode=&quot;CaseBattle&quot; />
          {'\n'}• {Math.ceil(requiredWager / GAME_MODE_XP['Coinflip']).toLocaleString()} coins in Coinflip <GameModeIcon mode=&quot;Coinflip&quot; />
          {'\n'}• {Math.ceil(requiredWager / GAME_MODE_XP['MatchbetSingle']).toLocaleString()} coins in Single Matchbet <GameModeIcon mode=&quot;MatchbetSingle&quot; />
          {'\n'}• {Math.ceil(requiredWager / GAME_MODE_XP['MatchbetCombo']).toLocaleString()} coins in Combo Matchbet <GameModeIcon mode=&quot;MatchbetCombo&quot; />
        </>
      );
      
      setResult(resultJSX);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center p-8 pt-16 md:pt-8">
      <Link href="/" className="back-button">
        Back
      </Link>
      
      <h1 className="text-4xl font-kode font-bold mb-8 animate-glow">XP Calculator</h1>
      
      <div className="w-full max-w-md space-y-6 mb-8">
        <div className="flex gap-4">
          <button
            className={`flex-1 terminal-button ${mode === 'wager' ? 'bg-terminal-green/20' : ''}`}
            onClick={() => setMode('wager')}
          >
            XP After Wager
          </button>
          <button
            className={`flex-1 terminal-button ${mode === 'level' ? 'bg-terminal-green/20' : ''}`}
            onClick={() => setMode('level')}
          >
            Wager for Level
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-terminal-green">Current Level (1-129)</label>
            <input
              type="number"
              value={currentLevel}
              onChange={(e) => setCurrentLevel(e.target.value)}
              className="w-full bg-terminal-dark border-2 border-terminal-green p-2 text-terminal-green focus:outline-none focus:ring-2 focus:ring-terminal-green"
              placeholder="Enter your current level"
              min="1"
              max="129"
            />
          </div>

          <div>
            <label className="block mb-2 text-terminal-green relative group inline-flex items-center">
              Progress XP to Next Level
              <span className="relative">
                <InfoIcon />
                <div className="hidden group-hover:block">
                  <TooltipImage />
                </div>
              </span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={progressXP}
                onChange={(e) => {
                  const cleanValue = e.target.value.replace(/[^\d.]/g, '');
                  if (/^\d*\.?\d*$/.test(cleanValue) || cleanValue === '') {
                    setProgressXP(cleanValue);
                  }
                }}
                onPaste={(e) => {
                  e.preventDefault();
                  const pastedText = e.clipboardData.getData('text');
                  const cleanValue = pastedText.replace(/[^\d.]/g, '');
                  if (/^\d*\.?\d*$/.test(cleanValue) || cleanValue === '') {
                    setProgressXP(cleanValue);
                  }
                }}
                className="flex-1 bg-terminal-dark border-2 border-terminal-green p-2 text-terminal-green focus:outline-none focus:ring-2 focus:ring-terminal-green"
                placeholder="Enter your progress XP to next level"
              />
              <button
                onClick={async () => {
                  try {
                    const text = await navigator.clipboard.readText();
                    const cleanValue = text.replace(/[^\d.]/g, '');
                    if (/^\d*\.?\d*$/.test(cleanValue) || cleanValue === '') {
                      setProgressXP(cleanValue);
                    }
                  } catch (err) {
                    console.error('Failed to read clipboard:', err);
                  }
                }}
                className="terminal-button px-2 md:px-4 flex items-center gap-2 hover:bg-terminal-green/20"
                aria-label="Paste from clipboard"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                </svg>
                <span className="hidden md:inline">Paste</span>
              </button>
            </div>
          </div>

          {mode === 'wager' && (
            <div>
              <label className="block mb-2 text-terminal-green">Wager Amount (coins <CoinIcon />)</label>
              <input
                type="number"
                value={wagerAmount}
                onChange={(e) => setWagerAmount(e.target.value)}
                className="w-full bg-terminal-dark border-2 border-terminal-green p-2 text-terminal-green focus:outline-none focus:ring-2 focus:ring-terminal-green"
                placeholder="Enter wager amount in coins"
              />
            </div>
          )}

          {mode === 'level' && (
            <div>
              <label className="block mb-2 text-terminal-green">Desired Level (1-129)</label>
              <input
                type="number"
                value={desiredLevel}
                onChange={(e) => setDesiredLevel(e.target.value)}
                className="w-full bg-terminal-dark border-2 border-terminal-green p-2 text-terminal-green focus:outline-none focus:ring-2 focus:ring-terminal-green"
                placeholder="Enter desired level"
                min="1"
                max="129"
              />
            </div>
          )}

          <button
            onClick={handleCalculate}
            className="w-full terminal-button py-4"
          >
            Calculate
          </button>

          {currentLevel && progressXP && !isNaN(parseInt(currentLevel)) && !isNaN(parseFloat(progressXP)) && (
            <LevelProgressBar 
              currentXP={calculateTotalXP(parseInt(currentLevel), parseFloat(progressXP))}
              currentLevel={parseInt(currentLevel)}
            />
          )}

          {result && (
            <div className="mt-6 p-4 border-2 border-terminal-green bg-terminal-dark whitespace-pre-line">
              <div className="text-terminal-green">{result}</div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </main>
  );
} 