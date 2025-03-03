import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './app/Home';
import XPCalculator from './app/xp-calculator/XPCalculator';
import GiftCardGenerator from './app/gift-card-generator/GiftCardGenerator';
import CaseBattlesBuilder from './app/case-battles-builder/CaseBattlesBuilder';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/xp-calculator" element={<XPCalculator />} />
        <Route path="/gift-card-generator" element={<GiftCardGenerator />} />
        <Route path="/case-battles-builder" element={<CaseBattlesBuilder />} />
      </Routes>
    </Router>
  );
}

export default App; 