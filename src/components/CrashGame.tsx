import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useSound } from '../hooks/useSound';

interface CrashGameProps {
  gameState: any;
}

export default function CrashGame({ gameState }: CrashGameProps) {
  const [bet, setBet] = useState(10);
  const [multiplier, setMultiplier] = useState(1.0);
  const [isRunning, setIsRunning] = useState(false);
  const [crashed, setCrashed] = useState(false);
  const [cashedOut, setCashedOut] = useState(false);
  const [crashPoint, setCrashPoint] = useState(0);
  const { playClick, playWin, playFail } = useSound();
  const { state, spendBalance, addBalance } = gameState;
  const intervalRef = useRef<any>(null);

  const startGame = () => {
    if (state.balance < bet) return;
    spendBalance(bet);
    
    setIsRunning(true);
    setCrashed(false);
    setCashedOut(false);
    setMultiplier(1.0);
    
    // Generate random crash point (weighted towards lower values)
    const crash = 1 + Math.random() * Math.random() * 10;
    setCrashPoint(crash);
    
    playClick();
    
    intervalRef.current = setInterval(() => {
      setMultiplier(prev => {
        const newMult = prev + 0.01 + (prev * 0.005);
        if (newMult >= crash) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
          setCrashed(true);
          playFail();
          return crash;
        }
        return newMult;
      });
    }, 50);
  };

  const cashOut = () => {
    if (!isRunning || cashedOut || crashed) return;
    
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setCashedOut(true);
    
    const winnings = bet * multiplier;
    addBalance(winnings);
    playWin('covert');
  };

  const reset = () => {
    setCrashed(false);
    setCashedOut(false);
    setMultiplier(1.0);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="pt-20 pb-8 px-4 max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl caser-drop-title text-white mb-3">Crash Game</h1>
        <p className="text-white/50 text-lg">Cash out before it crashes!</p>
      </motion.div>

      <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-8 mb-6">
        {/* Multiplier Display */}
        <div className="text-center mb-8">
          <motion.div
            animate={{ scale: isRunning ? [1, 1.1, 1] : 1 }}
            transition={{ duration: 0.5, repeat: isRunning ? Infinity : 0 }}
            className={`text-6xl font-bold mb-4 ${
              crashed ? 'text-red-500' : cashedOut ? 'text-green-400' : 'text-white'
            }`}
          >
            {multiplier.toFixed(2)}x
          </motion.div>
          {crashed && <p className="text-red-400 text-xl font-bold">CRASHED!</p>}
          {cashedOut && <p className="text-green-400 text-xl font-bold">Cashed out at {multiplier.toFixed(2)}x!</p>}
        </div>

        {/* Graph Visualization */}
        <div className="h-32 bg-black/30 rounded-xl mb-6 relative overflow-hidden">
          <svg className="w-full h-full">
            <motion.path
              d={`M 0 128 ${Array.from({ length: 100 }, (_, i) => {
                const x = (i / 100) * 400;
                const y = 128 - (multiplier - 1) * (i / 100) * 128;
                return `L ${x} ${Math.max(0, y)}`;
              }).join(' ')}`}
              stroke={crashed ? '#ef4444' : cashedOut ? '#22c55e' : '#a855f7'}
              strokeWidth="3"
              fill="none"
            />
          </svg>
          {isRunning && (
            <motion.div
              className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-purple-500 to-transparent"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
          )}
        </div>

        {/* Controls */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="text-white/60 text-sm mb-2 block">Bet Amount</label>
            <input
              type="number"
              value={bet}
              onChange={e => setBet(Math.max(1, parseFloat(e.target.value) || 0))}
              disabled={isRunning}
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500/50 focus:outline-none disabled:opacity-50"
              min="1"
            />
          </div>
          <div>
            <label className="text-white/60 text-sm mb-2 block">Potential Win</label>
            <div className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-green-400 font-bold">
              ${(bet * multiplier).toFixed(2)}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {!isRunning && !crashed && !cashedOut && (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={startGame}
            disabled={state.balance < bet}
            className={`w-full py-4 rounded-xl font-bold text-white ${
              state.balance < bet
                ? 'bg-white/10 cursor-not-allowed opacity-50'
                : 'bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-400 hover:to-violet-500'
            }`}
          >
            <TrendingUp size={20} className="inline mr-2" />
            Start Game (${bet})
          </motion.button>
        )}

        {isRunning && !cashedOut && (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={cashOut}
            className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500"
          >
            💰 Cash Out (${(bet * multiplier).toFixed(2)})
          </motion.button>
        )}

        {(crashed || cashedOut) && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.03 }}
            onClick={reset}
            className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-purple-500 to-violet-600"
          >
            Play Again
          </motion.button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-zinc-900/50 border border-white/10 rounded-xl p-4 text-center">
          <p className="text-white/60 text-sm mb-1">Balance</p>
          <p className="text-white font-bold text-xl">${state.balance.toFixed(2)}</p>
        </div>
        <div className="bg-zinc-900/50 border border-white/10 rounded-xl p-4 text-center">
          <p className="text-white/60 text-sm mb-1">Current Bet</p>
          <p className="text-purple-400 font-bold text-xl">${bet.toFixed(2)}</p>
        </div>
        <div className="bg-zinc-900/50 border border-white/10 rounded-xl p-4 text-center">
          <p className="text-white/60 text-sm mb-1">Multiplier</p>
          <p className={`font-bold text-xl ${crashed ? 'text-red-400' : cashedOut ? 'text-green-400' : 'text-white'}`}>
            {multiplier.toFixed(2)}x
          </p>
        </div>
      </div>
    </div>
  );
}
