import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Lock, Timer } from 'lucide-react';
import { cases, CaseData } from '../data/cases';
import { getRandomSkinFromList } from '../data/skins';
import { useSound } from '../hooks/useSound';

interface LimitedCasesProps {
  gameState: any;
}

const LIMITED_CASES_KEY = 'caser_drop_limited_cases';

interface LimitedCase extends CaseData {
  expiresAt: number;
  totalAvailable: number;
  remaining: number;
  originalPrice: number;
}

function generateLimitedCases(): LimitedCase[] {
  const now = Date.now();
  const baseCases = cases.slice(0, 3); // Take first 3 cases
  
  return baseCases.map((c, i) => ({
    ...c,
    id: `limited_${c.id}_${now}`,
    name: `Limited: ${c.name}`,
    originalPrice: c.price,
    price: c.price * 0.7, // 30% discount
    expiresAt: now + (24 * 60 * 60 * 1000), // 24 hours
    totalAvailable: 100 - i * 20,
    remaining: Math.floor(Math.random() * 50) + 20,
  }));
}

export default function LimitedCases({ gameState }: LimitedCasesProps) {
  const [limitedCases, setLimitedCases] = useState<LimitedCase[]>([]);
  const [currentTime, setCurrentTime] = useState(Date.now());
  const { playClick, playWin } = useSound();
  const { state, spendBalance, addToInventory } = gameState;

  useEffect(() => {
    const data = localStorage.getItem(LIMITED_CASES_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      // Check if expired
      if (parsed[0]?.expiresAt > Date.now()) {
        setLimitedCases(parsed);
      } else {
        const newCases = generateLimitedCases();
        setLimitedCases(newCases);
        localStorage.setItem(LIMITED_CASES_KEY, JSON.stringify(newCases));
      }
    } else {
      const newCases = generateLimitedCases();
      setLimitedCases(newCases);
      localStorage.setItem(LIMITED_CASES_KEY, JSON.stringify(newCases));
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimeLeft = (expiresAt: number): string => {
    const diff = expiresAt - currentTime;
    if (diff <= 0) return 'Expired';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const openLimitedCase = (caseData: LimitedCase) => {
    if (state.balance < caseData.price) {
      alert('Insufficient balance!');
      return;
    }

    if (!spendBalance(caseData.price)) {
      return;
    }

    // Get random skin from case
    const wonSkin = getRandomSkinFromList(caseData.skins, caseData.weights, caseData.id);
    
    // Add to inventory
    addToInventory(wonSkin);
    playWin(wonSkin.rarity);

    // Decrease remaining count
    const updatedCases = limitedCases.map(c => {
      if (c.id === caseData.id) {
        return { ...c, remaining: Math.max(0, c.remaining - 1) };
      }
      return c;
    });
    setLimitedCases(updatedCases);
    localStorage.setItem(LIMITED_CASES_KEY, JSON.stringify(updatedCases));

    alert(`🎉 You won: ${wonSkin.weapon} | ${wonSkin.name} ($${wonSkin.price.toFixed(2)})`);
  };

  return (
    <div className="pt-20 pb-8 px-4 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl caser-drop-title text-white mb-3">Limited Cases</h1>
        <p className="text-white/50 text-lg">Exclusive cases with limited availability!</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {limitedCases.map((caseData, i) => {
          const timeLeft = formatTimeLeft(caseData.expiresAt);
          const isExpired = caseData.expiresAt <= currentTime;
          const soldOut = caseData.remaining <= 0;
          
          return (
            <motion.div
              key={caseData.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl overflow-hidden border-2 ${
                isExpired || soldOut ? 'border-white/10 opacity-50' : 'border-purple-500/50'
              }`}
            >
              {/* Timer Badge */}
              <div className="absolute top-4 right-4 z-10 bg-black/80 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2">
                <Timer size={14} className="text-red-400" />
                <span className="text-white text-xs font-mono">{timeLeft}</span>
              </div>

              {/* Case Image */}
              <div className={`relative h-48 bg-gradient-to-b ${caseData.gradient} flex items-center justify-center`}>
                <img 
                  src={caseData.imageUrl} 
                  alt={caseData.name}
                  className="w-32 h-32 object-contain drop-shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              {/* Content */}
              <div className="bg-zinc-900/90 p-6">
                <h3 className="text-white font-bold text-lg mb-2">{caseData.name}</h3>
                <p className="text-white/40 text-sm mb-4">{caseData.description}</p>

                {/* Stats */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-white/60 text-xs">Price</p>
                    <div className="flex items-center gap-2">
                      <span className="text-white/40 line-through text-sm">${caseData.originalPrice.toFixed(2)}</span>
                      <span className="text-green-400 font-bold text-xl">${caseData.price.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white/60 text-xs">Remaining</p>
                    <p className="text-purple-400 font-bold text-xl">{caseData.remaining}/{caseData.totalAvailable}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mb-4">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 to-violet-600"
                    initial={{ width: '100%' }}
                    animate={{ width: `${(caseData.remaining / caseData.totalAvailable) * 100}%` }}
                  />
                </div>

                {/* Open Button */}
                <motion.button
                  whileHover={{ scale: !isExpired && !soldOut ? 1.03 : 1 }}
                  whileTap={{ scale: !isExpired && !soldOut ? 0.97 : 1 }}
                  onClick={() => {
                    if (!isExpired && !soldOut) {
                      playClick();
                      openLimitedCase(caseData);
                    }
                  }}
                  disabled={isExpired || soldOut}
                  className={`w-full py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 ${
                    isExpired || soldOut
                      ? 'bg-white/10 cursor-not-allowed opacity-50'
                      : 'bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-400 hover:to-violet-500'
                  }`}
                >
                  {isExpired ? (
                    <>
                      <Lock size={18} />
                      Expired
                    </>
                  ) : soldOut ? (
                    <>
                      <Lock size={18} />
                      Sold Out
                    </>
                  ) : (
                    <>
                      <Clock size={18} />
                      Open Case
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Info */}
      <div className="mt-8 bg-zinc-900/50 border border-white/10 rounded-2xl p-6">
        <h3 className="text-white font-bold mb-4">About Limited Cases</h3>
        <ul className="space-y-2 text-white/60 text-sm">
          <li>• Limited cases are available for 24 hours only</li>
          <li>• 30% discount on regular case prices</li>
          <li>• Limited quantity - once sold out, they're gone!</li>
          <li>• New limited cases appear every day</li>
          <li>• Same drop rates as regular cases</li>
        </ul>
      </div>
    </div>
  );
}
