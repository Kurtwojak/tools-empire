'use client';

import Link from 'next/link';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">CSGOEmpire Tools</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/xp-calculator" 
          className="p-6 border rounded-lg hover:bg-gray-100 transition-colors">
          <h2 className="text-2xl font-semibold mb-2">XP Calculator</h2>
          <p>Calculate your CSGOEmpire XP and rewards</p>
        </Link>
        
        <Link href="/gift-card-generator"
          className="p-6 border rounded-lg hover:bg-gray-100 transition-colors">
          <h2 className="text-2xl font-semibold mb-2">Gift Card Generator</h2>
          <p>Generate gift card codes for CSGOEmpire</p>
        </Link>
        
        <Link href="/case-battles-builder"
          className="p-6 border rounded-lg hover:bg-gray-100 transition-colors">
          <h2 className="text-2xl font-semibold mb-2">Case Battles Builder</h2>
          <p>Create and customize case battles</p>
        </Link>
      </div>

      <Footer />
    </main>
  );
}
