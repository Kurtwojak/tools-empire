'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import casesData from './cases.json';
import Footer from '../components/Footer';

type Case = {
  case_name: string;
  total_price: number;
  hash: string;
  slug: string;
  tags: any;
  image_url: string;
};

const formatPrice = (price: number) => {
  return (price / 100).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

const CaseCard = ({ caseData, count = 1 }: { caseData: Case; count?: number }) => {
  const hasRiskTag = caseData.tags && Object.keys(caseData.tags).some(tag => tag.includes('%'));
  const isNew = caseData.tags && Object.keys(caseData.tags).some(tag => tag === 'New');
  const isHighRisk = ['Majesty', 'Bishop', 'Stronghold', 'Barbarian', 'King\'s Gambit', 'The Aether', 
    'Golden Ticket', 'Endgame', 'Black Death', 'Angelic', 'Sweet Dreams', 'Dream Knife', 'Black Pearl', 
    'Immoral', 'Mystery Combo', 'Digging For Gold', 'Ophidian', 'Blue Haven', 'Risky Doppler', 
    'Red Inferno', 'Sacred Sapphire', 'Freaky Felix', 'Vanilla', 'Uncut Gems', 'Touch Of Lore', 
    'Laminated', 'Man', 'Tropical Blossom', 'Onyx', 'Faded', 'Mystery Knife', 'Pandora\'s Box', 
    'Fortune', 'Emperor', 'Mystery Gloves', 'Marksman', 'Revolution', 'Olympian', 'Stolen Property', 
    'Poseidon', 'Dengi\'s Crib', 'Silent Revolution', 'Supreme', 'Rebel AK-47', 'Box Cutter', 
    'Deviate', 'Mercenary Glock-18', 'Thunder Strike', 'Kim Bomb Un', 'Jungle Luck', 'Sand Storm', 
    'Economy', 'Grim Reaper', 'Cobalt', 'One Percent Club', 'Wildfire', 'Silent Assassin', 
    'Boris and Hobbes', 'Kukri', 'Fool\'s Gold', 'Artemis', 'Please Sar'].includes(caseData.case_name);
  const isMediumRisk = ['Heirloom', 'Police Raid', 'Dream Doppler', 'Artisan', 'Commonwealth', 'Howling Dawn', 
    'Expensive Knives', 'Neon', 'Titan', 'Expensive Gloves', 'Fly High', 'Moonshot', 'Medusa', 'Mother Nature', 
    'Few Handshakes', 'Bloodshed', 'Dark Knight', 'Gauntlet', 'Silver Surfer', 'Cheap Knives', 'King of Snakes', 
    'Cheap Gloves', 'Birds Of Prey', 'Cosmic Boom', 'Crimson Web', 'N-ball', 'Desire', 'Secret Agent', 'Deep Sea', 
    'Demonic', 'Greedy Gamblers', 'Skeletal', 'Walking in London', 'Shootout', 'Amethyst Gem', 'Minted', 
    'Touching Grass', 'Gamified Racism', 'Ice Age', 'Evil Eye', 'Vibrant', 'Tiger Strike', 'Tranquillity', 
    'Primal Instinct', 'Toxic Waste', 'T Upgrade', 'Lightning', 'Rook', 'Desert Bandit', 'Lucky Dip', 
    'Natural Disaster', 'CT Upgrade', 'Navaja Ninja', 'Rush B', 'Lover Boy', 'Dark Fever', 'Printstream', 
    'Camouflaged', 'Old Steel', 'Asiimov', 'Quickscope', 'Hypnotic', 'Armed Conflict', 'Road Rash', 'Imperial', 
    'Crimson Terror', 'Red Alert'].includes(caseData.case_name);
  const isLowRisk = ['Odin', 'Kingdom', 'Marbled', 'Predator', 'Gamma Ray', 'Pot Of Gold', 'Serpent', 'Aquatic', 
    'Butterfly Effect', 'Vice', 'Toucan', 'Assault', 'Butcher', 'Blood Moon', 'Shooting Iron', 'Night Rider',
    'Doppler Effect', 'Royalty'].includes(caseData.case_name);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(caseData.case_name);
  };

  return (
    <div className="relative bg-terminal-dark border border-terminal-green p-2 rounded-lg hover:border-opacity-80 transition-all duration-300 flex flex-col items-center">
      {count > 1 && (
        <div className="absolute top-1 right-1 inline-flex items-center h-4 px-0.5 rounded text-[10px] bg-black/50 backdrop-blur-sm text-white border border-white/50 min-w-min whitespace-nowrap">
          x{count}
        </div>
      )}

      <div className="absolute top-1 left-1 flex flex-col gap-0.5">
        {/* Risk Level Tag */}
        {isHighRisk && (
          <div className="inline-flex items-center h-4 px-1.5 rounded text-[10px] bg-black/50 backdrop-blur-sm text-red-500 border border-red-500 whitespace-nowrap">
            HIGH RISK
          </div>
        )}
        {isMediumRisk && (
          <div className="inline-flex items-center h-4 px-1.5 rounded text-[10px] bg-black/50 backdrop-blur-sm text-orange-500 border border-orange-500 whitespace-nowrap">
            MEDIUM RISK
          </div>
        )}
        {isLowRisk && (
          <div className="inline-flex items-center h-4 px-1.5 rounded text-[10px] bg-black/50 backdrop-blur-sm text-green-500 border border-green-500 whitespace-nowrap">
            LOW RISK
          </div>
        )}
        
        {/* Percentage Tag */}
        {caseData.tags && typeof caseData.tags === 'object' && Object.entries(caseData.tags).map(([percentage, color]) => (
          percentage.includes('%') ? (
            <div
              key={percentage}
              className="inline-flex items-center h-4 px-0.5 rounded text-[10px] bg-black/50 backdrop-blur-sm text-red-500 border border-red-500 min-w-min whitespace-nowrap"
            >
              {percentage}
            </div>
          ) : percentage === 'New' ? (
            <div
              key={percentage}
              className="inline-flex items-center h-4 px-0.5 rounded text-[10px] bg-black/50 backdrop-blur-sm text-yellow-500 border border-yellow-500 min-w-min whitespace-nowrap"
            >
              NEW
            </div>
          ) : null
        ))}
      </div>

      <div className="w-full h-[160px] flex items-center justify-center mb-2">
        <Image
          src={`${caseData.image_url}x340`}
          alt={caseData.case_name}
          width={160}
          height={160}
          className="w-auto h-auto max-h-[140px] object-contain"
        />
      </div>

      <div className="text-center mt-auto w-full">
        <h3 className="text-terminal-green font-medium mb-1 text-sm">
          {caseData.case_name}
        </h3>
        <button
          onClick={copyToClipboard}
          className="text-white/70 hover:text-white transition-colors mb-1 flex items-center justify-center gap-1 mx-auto text-[10px]"
          title="Copy case name"
        >
          COPY
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
        <div className="flex items-center justify-center gap-1">
          <span className="text-terminal-green text-sm">{formatPrice(caseData.total_price)}</span>
          <Image src="/Coins.svg" alt="coins" width={12} height={12} />
        </div>
      </div>
    </div>
  );
};

export default function CaseBattlesBuilder() {
  const [budget, setBudget] = useState<string>('');
  const [numCases, setNumCases] = useState<number>(2);
  const [selectedCases, setSelectedCases] = useState<Case[]>([]);
  const [allowDuplicates, setAllowDuplicates] = useState<boolean>(false);
  const [riskFilter, setRiskFilter] = useState<'low' | 'medium' | 'high' | 'mixed'>('mixed');

  const generateBattle = () => {
    const budgetNum = parseFloat(budget.replace(/,/g, ''));
    if (isNaN(budgetNum) || budgetNum <= 0) return;

    let affordableCases = casesData.filter(c => (c.total_price / 100) <= budgetNum);
    
    if (riskFilter !== 'mixed') {
      affordableCases = affordableCases.filter(c => {
        const hasRiskTag = c.tags && Object.keys(c.tags).some(tag => tag.includes('%'));
        const isHighRisk = ['Majesty', 'Bishop', 'Stronghold', 'Barbarian', 'King\'s Gambit', 'The Aether', 
          'Golden Ticket', 'Endgame', 'Black Death', 'Angelic', 'Sweet Dreams', 'Dream Knife', 'Black Pearl', 
          'Immoral', 'Mystery Combo', 'Digging For Gold', 'Ophidian', 'Blue Haven', 'Risky Doppler', 
          'Red Inferno', 'Sacred Sapphire', 'Freaky Felix', 'Vanilla', 'Uncut Gems', 'Touch Of Lore', 
          'Laminated', 'Man', 'Tropical Blossom', 'Onyx', 'Faded', 'Mystery Knife', 'Pandora\'s Box', 
          'Fortune', 'Emperor', 'Mystery Gloves', 'Marksman', 'Revolution', 'Olympian', 'Stolen Property', 
          'Poseidon', 'Dengi\'s Crib', 'Silent Revolution', 'Supreme', 'Rebel AK-47', 'Box Cutter', 
          'Deviate', 'Mercenary Glock-18', 'Thunder Strike', 'Kim Bomb Un', 'Jungle Luck', 'Sand Storm', 
          'Economy', 'Grim Reaper', 'Cobalt', 'One Percent Club', 'Wildfire', 'Silent Assassin', 
          'Boris and Hobbes', 'Kukri', 'Fool\'s Gold', 'Artemis', 'Please Sar'].includes(c.case_name);
        const isMediumRisk = ['Heirloom', 'Police Raid', 'Dream Doppler', 'Artisan', 'Commonwealth', 'Howling Dawn', 
          'Expensive Knives', 'Neon', 'Titan', 'Expensive Gloves', 'Fly High', 'Moonshot', 'Medusa', 'Mother Nature', 
          'Few Handshakes', 'Bloodshed', 'Dark Knight', 'Gauntlet', 'Silver Surfer', 'Cheap Knives', 'King of Snakes', 
          'Cheap Gloves', 'Birds Of Prey', 'Cosmic Boom', 'Crimson Web', 'N-ball', 'Desire', 'Secret Agent', 'Deep Sea', 
          'Demonic', 'Greedy Gamblers', 'Skeletal', 'Walking in London', 'Shootout', 'Amethyst Gem', 'Minted', 
          'Touching Grass', 'Gamified Racism', 'Ice Age', 'Evil Eye', 'Vibrant', 'Tiger Strike', 'Tranquillity', 
          'Primal Instinct', 'Toxic Waste', 'T Upgrade', 'Lightning', 'Rook', 'Desert Bandit', 'Lucky Dip', 
          'Natural Disaster', 'CT Upgrade', 'Navaja Ninja', 'Rush B', 'Lover Boy', 'Dark Fever', 'Printstream', 
          'Camouflaged', 'Old Steel', 'Asiimov', 'Quickscope', 'Hypnotic', 'Armed Conflict', 'Road Rash', 'Imperial', 
          'Crimson Terror', 'Red Alert'].includes(c.case_name);
        const isLowRisk = ['Odin', 'Kingdom', 'Marbled', 'Predator', 'Gamma Ray', 'Pot Of Gold', 'Serpent', 'Aquatic', 
          'Butterfly Effect', 'Vice', 'Toucan', 'Assault', 'Butcher', 'Blood Moon', 'Shooting Iron', 'Night Rider',
          'Doppler Effect', 'Royalty'].includes(c.case_name);

        if (riskFilter === 'high') return hasRiskTag || isHighRisk;
        if (riskFilter === 'medium') return isMediumRisk;
        if (riskFilter === 'low') return isLowRisk;
        return true;
      });
    }

    if (affordableCases.length === 0) {
      alert('No cases available within your budget and risk filter');
      return;
    }

    const cheapestCase = Math.min(...affordableCases.map(c => c.total_price / 100));
    const maxPossibleCases = Math.floor(budgetNum / cheapestCase);
    const actualNumCases = Math.min(numCases, maxPossibleCases);

    if (actualNumCases === 0) {
      alert('Budget too low for selected number of cases');
      return;
    }

    let selected: Case[] = [];
    let remainingBudget = budgetNum;
    let availableCases = [...affordableCases];

    for (let i = 0; i < actualNumCases; i++) {
      const isLastCase = i === actualNumCases - 1;
      const targetPrice = isLastCase ? remainingBudget : remainingBudget / (actualNumCases - i);
      
      let possibleCases = availableCases.filter(c => {
        const price = c.total_price / 100;
        return isLastCase ? price <= remainingBudget : price <= targetPrice;
      });

      if (isLastCase) {
        possibleCases.sort((a, b) => (b.total_price - a.total_price));
        possibleCases = possibleCases.filter(c => (c.total_price / 100) <= remainingBudget);
      }
      
      if (possibleCases.length > 0) {
        const selectedCase = isLastCase 
          ? possibleCases[0]
          : possibleCases[Math.floor(Math.random() * possibleCases.length)];
        
        selected.push(selectedCase);
        remainingBudget -= (selectedCase.total_price / 100);

        if (!allowDuplicates) {
          availableCases = availableCases.filter(c => c.hash !== selectedCase.hash);
        }
      }
    }

    setSelectedCases(selected);
  };

  const groupedCases = selectedCases.reduce((acc, curr) => {
    const existing = acc.find(item => item.case.hash === curr.hash);
    if (existing) {
      existing.count++;
    } else {
      acc.push({ case: curr, count: 1 });
    }
    return acc;
  }, [] as { case: Case; count: number }[]);

  return (
    <main className="min-h-screen flex flex-col items-center p-8 pt-16 md:pt-8">
      <Link href="/" className="back-button">
        Back
      </Link>
      <h1 className="text-4xl font-kode font-bold mb-8 animate-glow">Case Battles Builder</h1>
      
      <div className="w-full max-w-4xl space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Budget Input */}
          <div className="space-y-2">
            <label className="block text-terminal-green flex items-center gap-1">
              Budget (coins) <Image src="/Coins.svg" alt="coins" width={14} height={14} />
            </label>
            <input
              type="text"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full bg-terminal-dark border-2 border-terminal-green p-2 text-terminal-green focus:outline-none focus:border-terminal-green/70"
              placeholder="Enter your budget"
            />
          </div>

          {/* Number of Cases Slider */}
          <div className="space-y-2">
            <label className="block text-terminal-green">Number of Cases: {numCases}</label>
            <div className="relative">
              <input
                type="range"
                min="2"
                max="100"
                value={numCases}
                onChange={(e) => setNumCases(parseInt(e.target.value))}
                className="w-full appearance-none bg-terminal-dark h-2 rounded-full border-2 border-terminal-green focus:outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-terminal-green [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-terminal-green [&::-moz-range-thumb]:cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Allow Duplicates Checkbox */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <input
              type="checkbox"
              id="allowDuplicates"
              checked={allowDuplicates}
              onChange={(e) => setAllowDuplicates(e.target.checked)}
              className="appearance-none w-5 h-5 border-2 border-terminal-green bg-terminal-dark checked:bg-terminal-green cursor-pointer"
            />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-terminal-dark">
              {allowDuplicates && (
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 6L9 17l-5-5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
          </div>
          <label htmlFor="allowDuplicates" className="text-terminal-green cursor-pointer">
            Allow Duplicate Cases
          </label>
        </div>

        {/* Risk Filter Checkboxes */}
        <div className="grid grid-cols-2 md:flex md:items-center gap-4 md:gap-6">
          <div className="flex items-center space-x-3">
            <input
              type="radio"
              id="lowRisk"
              checked={riskFilter === 'low'}
              onChange={() => setRiskFilter('low')}
              className="appearance-none w-4 h-4 rounded-full border-2 border-terminal-green bg-terminal-dark checked:bg-terminal-green cursor-pointer"
            />
            <label htmlFor="lowRisk" className="text-terminal-green cursor-pointer text-sm md:text-base">
              Only Low Risk
            </label>
          </div>
          <div className="flex items-center space-x-3">
            <input
              type="radio"
              id="mediumRisk"
              checked={riskFilter === 'medium'}
              onChange={() => setRiskFilter('medium')}
              className="appearance-none w-4 h-4 rounded-full border-2 border-terminal-green bg-terminal-dark checked:bg-terminal-green cursor-pointer"
            />
            <label htmlFor="mediumRisk" className="text-terminal-green cursor-pointer text-sm md:text-base">
              Only Medium Risk
            </label>
          </div>
          <div className="flex items-center space-x-3">
            <input
              type="radio"
              id="highRisk"
              checked={riskFilter === 'high'}
              onChange={() => setRiskFilter('high')}
              className="appearance-none w-4 h-4 rounded-full border-2 border-terminal-green bg-terminal-dark checked:bg-terminal-green cursor-pointer"
            />
            <label htmlFor="highRisk" className="text-terminal-green cursor-pointer text-sm md:text-base">
              Only High Risk
            </label>
          </div>
          <div className="flex items-center space-x-3">
            <input
              type="radio"
              id="mixedRisk"
              checked={riskFilter === 'mixed'}
              onChange={() => setRiskFilter('mixed')}
              className="appearance-none w-4 h-4 rounded-full border-2 border-terminal-green bg-terminal-dark checked:bg-terminal-green cursor-pointer"
            />
            <label htmlFor="mixedRisk" className="text-terminal-green cursor-pointer text-sm md:text-base">
              Mixed Risk
            </label>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={generateBattle}
          className="terminal-button w-full py-4"
        >
          Generate Battle
        </button>

        {/* Selected Cases Display */}
        {selectedCases.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl text-terminal-green">Your Case Battle</h2>
              <div className="text-terminal-green flex items-center gap-1">
                Total Cost: {formatPrice(selectedCases.reduce((sum, c) => sum + c.total_price, 0))}
                <Image src="/Coins.svg" alt="coins" width={14} height={14} />
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-4">
              {groupedCases.map((item, index) => (
                <CaseCard key={index} caseData={item.case} count={item.count} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
} 