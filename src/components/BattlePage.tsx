import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swords, Bot, Users, Trophy } from 'lucide-react';
import { allSkins, Skin, rarityColors } from '../data/skins';
import { useSound } from '../hooks/useSound';
import SkinDisplay from './SkinDisplay';

interface BattlePageProps {
  gameState: any;
  currentUser: any;
}

export default function BattlePage({ gameState, currentUser }: BattlePageProps) {
  const [mode, setMode] = useState<'menu' | 'bot' | 'player'>('menu');
  const [bet, setBet] = useState(10);
  const [isBattling, setIsBattling] = useState(false);
  const [playerSkin, setPlayerSkin] = useState<Skin | null>(null);
  const [opponentSkin, setOpponentSkin] = useState<Skin | null>(null);
  const [result, setResult] = useState<'win' | 'lose' | null>(null);
  const { playClick, playWin, playFail } = useSound();
  const { state, spendBalance, addBalance, addToInventory } = gameState;

  const getRandomSkin = (): Skin => {
    const pool = allSkins.filter(s => s.price > 0 && s.price < 500);
    return pool[Math.floor(Math.random() * pool.length)];
  };

  const startBattle = (isBot: boolean) => {
    if (state.balance < bet) return;
    spendBalance(bet);
    
    setIsBattling(true);
    setResult(null);
    
    // Player opens case
    const pSkin = getRandomSkin();
    setPlayerSkin(pSkin);
    
    // Opponent (bot or simulated player)
    setTimeout(() => {
      const oSkin = getRandomSkin();
      setOpponentSkin(oSkin);
      
      setTimeout(() => {
        setIsBattling(false);
        if (pSkin.price > oSkin.price) {
          setResult('win');
          addBalance(bet * 2);
          playWin('covert');
        } else {
          setResult('lose');
          playFail();
        }
      }, 1500);
    }, 2000);
  };

  if (mode === 'menu') {
    return (
      <div className="pt-20 pb-8 px-4 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl caser-drop-title text-white mb-3">Battle Mode</h1>
          <p className="text-white/50 text-lg">Compete against bots or other players</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setMode('bot')}
            className="bg-zinc-900/50 border border-white/10 rounded-2xl p-8 text-center hover:border-purple-500/50 transition-all"
          >
            <Bot size={48} className="text-purple-400 mx-auto mb-4" />
            <h2 className="text-white font-bold text-xl mb-2">VS Bot</h2>
            <p className="text-white/50 text-sm">Battle against AI opponent</p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setMode('player')}
            className="bg-zinc-900/50 border border-white/10 rounded-2xl p-8 text-center hover:border-purple-500/50 transition-all"
          >
            <Users size={48} className="text-purple-400 mx-auto mb-4" />
            <h2 className="text-white font-bold text-xl mb-2">VS Player</h2>
            <p className="text-white/50 text-sm">Coming soon!</p>
          </motion.button>
        </div>

        <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6">
          <h3 className="text-white font-bold mb-4">Set Bet Amount</h3>
          <div className="flex gap-3 items-center">
            <input
              type="number"
              value={bet}
              onChange={e => setBet(Math.max(1, parseFloat(e.target.value) || 0))}
              className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500/50 focus:outline-none"
              min="1"
            />
            <span className="text-white/60">USD</span>
          </div>
          <p className="text-white/40 text-sm mt-2">Winner takes all!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-8 px-4 max-w-4xl mx-auto">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => { setMode('menu'); setPlayerSkin(null); setOpponentSkin(null); setResult(null); }}
        className="text-white/60 hover:text-white mb-6"
      >
        ← Back
      </motion.button>

      <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Bet: ${bet}</h2>
          <p className="text-white/50">{mode === 'bot' ? 'VS Bot' : 'VS Player'}</p>
        </div>

        <div className="grid grid-cols-3 gap-6 items-center mb-8">
          {/* Player */}
          <div className="text-center">
            <p className="text-white font-bold mb-3">You</p>
            <div className="bg-black/30 border-2 border-purple-500/50 rounded-xl p-4 min-h-[200px] flex items-center justify-center">
              {playerSkin ? (
                <div>
                  <SkinDisplay skin={playerSkin} size="lg" />
                  <p className="text-white text-sm mt-2">{playerSkin.weapon}</p>
                  <p className="text-green-400 font-bold">${playerSkin.price.toFixed(2)}</p>
                </div>
              ) : (
                <span className="text-white/30">Waiting...</span>
              )}
            </div>
          </div>

          {/* VS */}
          <div className="text-center">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: isBattling ? Infinity : 0 }}
              className="text-4xl font-bold text-white"
            >
              VS
            </motion.div>
          </div>

          {/* Opponent */}
          <div className="text-center">
            <p className="text-white font-bold mb-3">{mode === 'bot' ? 'Bot' : 'Player'}</p>
            <div className="bg-black/30 border-2 border-red-500/50 rounded-xl p-4 min-h-[200px] flex items-center justify-center">
              {opponentSkin ? (
                <div>
                  <SkinDisplay skin={opponentSkin} size="lg" />
                  <p className="text-white text-sm mt-2">{opponentSkin.weapon}</p>
                  <p className="text-green-400 font-bold">${opponentSkin.price.toFixed(2)}</p>
                </div>
              ) : (
                <span className="text-white/30">Waiting...</span>
              )}
            </div>
          </div>
        </div>

        {/* Result */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-center p-6 rounded-xl ${result === 'win' ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}
            >
              <p className={`text-2xl font-bold ${result === 'win' ? 'text-green-400' : 'text-red-400'}`}>
                {result === 'win' ? '🎉 You Won!' : '💔 You Lost!'}
              </p>
              {result === 'win' && <p className="text-green-400 mt-2">+${(bet * 2).toFixed(2)}</p>}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Start Button */}
        {!isBattling && !result && (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => startBattle(mode === 'bot')}
            disabled={state.balance < bet}
            className={`w-full py-4 rounded-xl font-bold text-white ${
              state.balance < bet
                ? 'bg-white/10 cursor-not-allowed opacity-50'
                : 'bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-400 hover:to-violet-500'
            }`}
          >
            <Swords size={20} className="inline mr-2" />
            Start Battle (${bet})
          </motion.button>
        )}

        {result && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.03 }}
            onClick={() => { setPlayerSkin(null); setOpponentSkin(null); setResult(null); }}
            className="w-full mt-4 py-3 rounded-xl bg-white/10 text-white font-medium"
          >
            Play Again
          </motion.button>
        )}
      </div>
    </div>
  );
}
