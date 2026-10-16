import { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift } from 'lucide-react';
import { allSkins, Skin, rarityColors } from '../data/skins';
import { useSound } from '../hooks/useSound';
import SkinDisplay from './SkinDisplay';

interface LuckyRouletteProps {
  gameState: any;
  currentUser: any;
}

const ROULETTE_KEY = 'caser_drop_lucky_roulette';

export default function LuckyRoulette({ gameState, currentUser }: LuckyRouletteProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [prize, setPrize] = useState<Skin | null>(null);
  const [rotation, setRotation] = useState(0);
  const { playClick, playWin } = useSound();
  const { addBalance } = gameState;

  const getLastSpin = (): string | null => {
    return localStorage.getItem(ROULETTE_KEY);
  };

  const canSpin = (): boolean => {
    const lastSpin = getLastSpin();
    if (!lastSpin) return true;
    const lastDate = new Date(lastSpin);
    const today = new Date();
    return lastDate.toDateString() !== today.toDateString();
  };

  const spin = () => {
    if (!canSpin() || isSpinning) return;
    
    setIsSpinning(true);
    setPrize(null);
    playClick();
    
    // Random prize (mostly small amounts)
    const rand = Math.random();
    let prizeAmount: number;
    if (rand < 0.5) prizeAmount = 1 + Math.random() * 4; // $1-$5 (50%)
    else if (rand < 0.8) prizeAmount = 5 + Math.random() * 15; // $5-$20 (30%)
    else if (rand < 0.95) prizeAmount = 20 + Math.random() * 30; // $20-$50 (15%)
    else prizeAmount = 50 + Math.random() * 50; // $50-$100 (5%)
    
    // Spin animation
    const spins = 5 + Math.random() * 3;
    const finalRotation = rotation + spins * 360 + Math.random() * 360;
    setRotation(finalRotation);
    
    setTimeout(() => {
      setIsSpinning(false);
      setPrize({ 
        id: 'prize', 
        name: `Cash Prize`, 
        weapon: 'Roulette', 
        rarity: 'covert', 
        price: prizeAmount, 
        image: '💰', 
        color: '#22c55e', 
        gradient: 'from-green-500 to-emerald-500' 
      });
      addBalance(prizeAmount);
      playWin('covert');
      localStorage.setItem(ROULETTE_KEY, new Date().toISOString());
    }, 4000);
  };

  const prizes = [
    { amount: 1, color: '#22c55e' },
    { amount: 5, color: '#3b82f6' },
    { amount: 10, color: '#a855f7' },
    { amount: 25, color: '#ec4899' },
    { amount: 50, color: '#f59e0b' },
    { amount: 100, color: '#ef4444' },
    { amount: 5, color: '#22c55e' },
    { amount: 10, color: '#3b82f6' },
  ];

  return (
    <div className="pt-20 pb-8 px-4 max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl caser-drop-title text-white mb-3">Lucky Roulette</h1>
        <p className="text-white/50 text-lg">Free spin every day!</p>
      </motion.div>

      <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-8 mb-6">
        {/* Roulette Wheel */}
        <div className="relative w-80 h-80 mx-auto mb-8">
          <motion.div
            animate={{ rotate: rotation }}
            transition={{ duration: 4, ease: [0.17, 0.67, 0.12, 0.99] }}
            className="w-full h-full rounded-full border-8 border-purple-500/50 relative"
            style={{
              background: `conic-gradient(${prizes.map((p, i) => 
                `${p.color} ${(i / prizes.length) * 360}deg ${((i + 1) / prizes.length) * 360}deg`
              ).join(', ')})`
            }}
          >
            {prizes.map((p, i) => {
              const angle = (i / prizes.length) * 360 + (360 / prizes.length / 2);
              const radian = (angle * Math.PI) / 180;
              const x = 50 + 35 * Math.cos(radian);
              const y = 50 + 35 * Math.sin(radian);
              return (
                <div
                  key={i}
                  className="absolute text-white font-bold text-lg"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  ${p.amount}
                </div>
              );
            })}
          </motion.div>
          
          {/* Pointer */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2">
            <div className="w-0 h-0 border-l-[15px] border-r-[15px] border-t-[30px] border-l-transparent border-r-transparent border-t-yellow-400" />
          </div>
        </div>

        {/* Result */}
        {prize && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-6"
          >
            <p className="text-green-400 text-3xl font-bold mb-2">🎉 You Won!</p>
            <p className="text-white text-4xl font-bold">${prize.price.toFixed(2)}</p>
          </motion.div>
        )}

        {/* Spin Button */}
        <motion.button
          whileHover={{ scale: canSpin() ? 1.03 : 1 }}
          whileTap={{ scale: canSpin() ? 0.97 : 1 }}
          onClick={spin}
          disabled={!canSpin() || isSpinning}
          className={`w-full py-4 rounded-xl font-bold text-white ${
            !canSpin() || isSpinning
              ? 'bg-white/10 cursor-not-allowed opacity-50'
              : 'bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-400 hover:to-violet-500'
          }`}
        >
          <Gift size={20} className="inline mr-2" />
          {isSpinning ? 'Spinning...' : canSpin() ? 'Spin for Free!' : 'Come back tomorrow!'}
        </motion.button>
      </div>

      {/* Prize Table */}
      <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6">
        <h3 className="text-white font-bold mb-4">Prize Table</h3>
        <div className="grid grid-cols-4 gap-3">
          {prizes.map((p, i) => (
            <div key={i} className="bg-black/30 rounded-xl p-3 text-center">
              <div className="w-8 h-8 rounded-full mx-auto mb-2" style={{ backgroundColor: p.color }} />
              <p className="text-white font-bold">${p.amount}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
