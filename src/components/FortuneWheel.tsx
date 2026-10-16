import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RotateCw } from 'lucide-react';
import { useSound } from '../hooks/useSound';

interface FortuneWheelProps {
  gameState: any;
}

const WHEEL_KEY = 'caser_drop_fortune_wheel';

const PRIZES = [
  { label: '$5', value: 5, color: '#22c55e' },
  { label: '$10', value: 10, color: '#3b82f6' },
  { label: '$2', value: 2, color: '#a855f7' },
  { label: '$20', value: 20, color: '#ec4899' },
  { label: '$1', value: 1, color: '#f59e0b' },
  { label: '$50', value: 50, color: '#ef4444' },
  { label: '$3', value: 3, color: '#14b8a6' },
  { label: '$15', value: 15, color: '#8b5cf6' },
];

export default function FortuneWheel({ gameState }: FortuneWheelProps) {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [prize, setPrize] = useState<number | null>(null);
  const [canSpin, setCanSpin] = useState(true);
  const { playClick, playWin } = useSound();
  const { addBalance } = gameState;

  useEffect(() => {
    const lastSpin = localStorage.getItem(WHEEL_KEY);
    if (lastSpin) {
      const lastDate = new Date(lastSpin);
      const now = new Date();
      const diffHours = (now.getTime() - lastDate.getTime()) / (1000 * 60 * 60);
      setCanSpin(diffHours >= 1);
    }
  }, []);

  const spin = () => {
    if (!canSpin || spinning) return;
    
    setSpinning(true);
    setPrize(null);
    playClick();
    
    // Random prize
    const prizeIndex = Math.floor(Math.random() * PRIZES.length);
    const selectedPrize = PRIZES[prizeIndex];
    
    // Calculate rotation (5-8 full spins + position)
    const spins = 5 + Math.random() * 3;
    const segmentAngle = 360 / PRIZES.length;
    const targetAngle = spins * 360 + (360 - prizeIndex * segmentAngle - segmentAngle / 2);
    
    setRotation(prev => prev + targetAngle);
    
    setTimeout(() => {
      setSpinning(false);
      setPrize(selectedPrize.value);
      addBalance(selectedPrize.value);
      playWin('covert');
      
      localStorage.setItem(WHEEL_KEY, new Date().toISOString());
      setCanSpin(false);
      
      // Re-enable after 1 hour
      setTimeout(() => setCanSpin(true), 60 * 60 * 1000);
    }, 4000);
  };

  return (
    <div className="pt-20 pb-8 px-4 max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl caser-drop-title text-white mb-3">Fortune Wheel</h1>
        <p className="text-white/50 text-lg">Spin every hour for free prizes!</p>
      </motion.div>

      <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-8 mb-6">
        {/* Wheel */}
        <div className="relative w-80 h-80 mx-auto mb-8">
          <motion.div
            animate={{ rotate: rotation }}
            transition={{ duration: 4, ease: [0.17, 0.67, 0.12, 0.99] }}
            className="w-full h-full rounded-full border-8 border-purple-500/50 relative"
            style={{
              background: `conic-gradient(${PRIZES.map((p, i) => 
                `${p.color} ${(i / PRIZES.length) * 360}deg ${((i + 1) / PRIZES.length) * 360}deg`
              ).join(', ')})`
            }}
          >
            {PRIZES.map((p, i) => {
              const angle = (i / PRIZES.length) * 360 + (360 / PRIZES.length / 2);
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
                  {p.label}
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
        {prize !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-6"
          >
            <p className="text-green-400 text-3xl font-bold mb-2">🎉 You Won!</p>
            <p className="text-white text-4xl font-bold">${prize}</p>
          </motion.div>
        )}

        {/* Spin Button */}
        <motion.button
          whileHover={{ scale: canSpin && !spinning ? 1.03 : 1 }}
          whileTap={{ scale: canSpin && !spinning ? 0.97 : 1 }}
          onClick={spin}
          disabled={!canSpin || spinning}
          className={`w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 ${
            !canSpin || spinning
              ? 'bg-white/10 cursor-not-allowed opacity-50'
              : 'bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-400 hover:to-violet-500'
          }`}
        >
          <RotateCw size={20} className={spinning ? 'animate-spin' : ''} />
          {spinning ? 'Spinning...' : canSpin ? 'Spin for Free!' : 'Come back in 1 hour!'}
        </motion.button>
      </div>

      {/* Prize Table */}
      <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6">
        <h3 className="text-white font-bold mb-4">Prizes</h3>
        <div className="grid grid-cols-4 gap-3">
          {PRIZES.map((p, i) => (
            <div key={i} className="bg-black/30 rounded-xl p-3 text-center">
              <div className="w-8 h-8 rounded-full mx-auto mb-2" style={{ backgroundColor: p.color }} />
              <p className="text-white font-bold">{p.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
