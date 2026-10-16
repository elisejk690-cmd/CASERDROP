import { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign } from 'lucide-react';
import { allSkins, Skin } from '../data/skins';
import { useSound } from '../hooks/useSound';
import SkinDisplay from './SkinDisplay';

interface GuessPriceGameProps {
  gameState: any;
}

export default function GuessPriceGame({ gameState }: GuessPriceGameProps) {
  const [currentSkin, setCurrentSkin] = useState<Skin | null>(null);
  const [guess, setGuess] = useState('');
  const [result, setResult] = useState<'win' | 'lose' | null>(null);
  const [prize, setPrize] = useState(0);
  const { playClick, playWin, playFail } = useSound();
  const { addBalance } = gameState;

  const startRound = () => {
    const skin = allSkins[Math.floor(Math.random() * allSkins.length)];
    setCurrentSkin(skin);
    setGuess('');
    setResult(null);
    setPrize(0);
    playClick();
  };

  const submitGuess = () => {
    if (!currentSkin || !guess) return;
    
    const guessValue = parseFloat(guess);
    const actualPrice = currentSkin.price;
    const difference = Math.abs(guessValue - actualPrice) / actualPrice;
    
    if (difference <= 0.1) { // Within 10%
      const prizeAmount = actualPrice * 0.5; // Win 50% of actual price
      setPrize(prizeAmount);
      addBalance(prizeAmount);
      setResult('win');
      playWin('covert');
    } else {
      setResult('lose');
      playFail();
    }
  };

  return (
    <div className="pt-20 pb-8 px-4 max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl caser-drop-title text-white mb-3">Guess the Price</h1>
        <p className="text-white/50 text-lg">Guess the skin price within 10% to win!</p>
      </motion.div>

      <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-8 mb-6">
        {!currentSkin ? (
          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={startRound}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-violet-600 text-white font-bold"
            >
              Start Game
            </motion.button>
          </div>
        ) : (
          <>
            {/* Skin Display */}
            <div className="text-center mb-8">
              <div className="w-40 h-40 mx-auto mb-4">
                <SkinDisplay skin={currentSkin} size="lg" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">{currentSkin.weapon}</h2>
              <p className="text-white/60 text-lg">{currentSkin.name}</p>
            </div>

            {/* Guess Input */}
            {!result && (
              <div className="mb-6">
                <label className="text-white/60 text-sm mb-2 block">Your Guess (USD)</label>
                <input
                  type="number"
                  value={guess}
                  onChange={e => setGuess(e.target.value)}
                  placeholder="Enter price..."
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500/50 focus:outline-none"
                  min="0"
                  step="0.01"
                />
              </div>
            )}

            {/* Result */}
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-center p-6 rounded-xl mb-6 ${
                  result === 'win' ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'
                }`}
              >
                {result === 'win' ? (
                  <>
                    <p className="text-green-400 text-2xl font-bold mb-2">🎉 Correct!</p>
                    <p className="text-white mb-2">Actual price: <span className="text-green-400 font-bold">${currentSkin.price.toFixed(2)}</span></p>
                    <p className="text-green-400 text-xl font-bold">You won ${prize.toFixed(2)}!</p>
                  </>
                ) : (
                  <>
                    <p className="text-red-400 text-2xl font-bold mb-2">❌ Wrong!</p>
                    <p className="text-white">Actual price: <span className="text-green-400 font-bold">${currentSkin.price.toFixed(2)}</span></p>
                    <p className="text-white/60 text-sm mt-2">Your guess: ${parseFloat(guess).toFixed(2)}</p>
                  </>
                )}
              </motion.div>
            )}

            {/* Action Button */}
            {!result ? (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={submitGuess}
                disabled={!guess}
                className={`w-full py-4 rounded-xl font-bold text-white ${
                  !guess ? 'bg-white/10 cursor-not-allowed opacity-50' : 'bg-gradient-to-r from-purple-500 to-violet-600'
                }`}
              >
                Submit Guess
              </motion.button>
            ) : (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.03 }}
                onClick={startRound}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-500 to-violet-600 text-white font-bold"
              >
                Next Round
              </motion.button>
            )}
          </>
        )}
      </div>

      {/* Rules */}
      <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6">
        <h3 className="text-white font-bold mb-4">How to Play</h3>
        <ul className="space-y-2 text-white/60 text-sm">
          <li>• A random skin will be shown</li>
          <li>• Guess the price of the skin</li>
          <li>• If your guess is within 10% of the actual price, you win!</li>
          <li>• Prize: 50% of the actual skin price</li>
          <li>• Play as many rounds as you want!</li>
        </ul>
      </div>
    </div>
  );
}
