import { useState } from 'react';
import { motion } from 'framer-motion';
import { Hand, Scissors, FileText } from 'lucide-react';
import { useSound } from '../hooks/useSound';

interface RPSGameProps {
  gameState: any;
}

type Choice = 'rock' | 'paper' | 'scissors' | null;

export default function RPSGame({ gameState }: RPSGameProps) {
  const [bet, setBet] = useState(5);
  const [playerChoice, setPlayerChoice] = useState<Choice>(null);
  const [botChoice, setBotChoice] = useState<Choice>(null);
  const [result, setResult] = useState<'win' | 'lose' | 'draw' | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { playClick, playWin, playFail } = useSound();
  const { state, spendBalance, addBalance } = gameState;

  const choices: { name: Choice; icon: any; label: string }[] = [
    { name: 'rock', icon: '✊', label: 'Rock' },
    { name: 'paper', icon: '✋', label: 'Paper' },
    { name: 'scissors', icon: '✌️', label: 'Scissors' },
  ];

  const getWinner = (player: Choice, bot: Choice): 'win' | 'lose' | 'draw' => {
    if (player === bot) return 'draw';
    if (
      (player === 'rock' && bot === 'scissors') ||
      (player === 'paper' && bot === 'rock') ||
      (player === 'scissors' && bot === 'paper')
    ) {
      return 'win';
    }
    return 'lose';
  };

  const play = (choice: Choice) => {
    if (state.balance < bet || isPlaying) return;
    
    spendBalance(bet);
    setPlayerChoice(choice);
    setIsPlaying(true);
    playClick();
    
    // Bot makes choice
    setTimeout(() => {
      const botChoices: Choice[] = ['rock', 'paper', 'scissors'];
      const bot = botChoices[Math.floor(Math.random() * 3)];
      setBotChoice(bot);
      
      const winner = getWinner(choice, bot);
      setResult(winner);
      
      if (winner === 'win') {
        addBalance(bet * 2);
        playWin('covert');
      } else if (winner === 'lose') {
        playFail();
      } else {
        addBalance(bet); // Return bet on draw
        playClick();
      }
      
      setIsPlaying(false);
    }, 1000);
  };

  const reset = () => {
    setPlayerChoice(null);
    setBotChoice(null);
    setResult(null);
  };

  return (
    <div className="pt-20 pb-8 px-4 max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl caser-drop-title text-white mb-3">Rock Paper Scissors</h1>
        <p className="text-white/50 text-lg">Classic game with stakes!</p>
      </motion.div>

      <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-8 mb-6">
        {/* Bet Input */}
        <div className="mb-8">
          <label className="text-white/60 text-sm mb-2 block">Bet Amount</label>
          <input
            type="number"
            value={bet}
            onChange={e => setBet(Math.max(1, parseFloat(e.target.value) || 0))}
            disabled={isPlaying}
            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500/50 focus:outline-none disabled:opacity-50"
            min="1"
          />
        </div>

        {/* Game Area */}
        <div className="grid grid-cols-3 gap-6 items-center mb-8">
          {/* Player */}
          <div className="text-center">
            <p className="text-white font-bold mb-3">You</p>
            <div className="bg-black/30 border-2 border-purple-500/50 rounded-xl p-8 min-h-[150px] flex items-center justify-center">
              {playerChoice ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-6xl"
                >
                  {choices.find(c => c.name === playerChoice)?.icon}
                </motion.div>
              ) : (
                <span className="text-white/30 text-4xl">?</span>
              )}
            </div>
          </div>

          {/* VS */}
          <div className="text-center">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: isPlaying ? Infinity : 0 }}
              className="text-4xl font-bold text-white"
            >
              VS
            </motion.div>
          </div>

          {/* Bot */}
          <div className="text-center">
            <p className="text-white font-bold mb-3">Bot</p>
            <div className="bg-black/30 border-2 border-red-500/50 rounded-xl p-8 min-h-[150px] flex items-center justify-center">
              {botChoice ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-6xl"
                >
                  {choices.find(c => c.name === botChoice)?.icon}
                </motion.div>
              ) : (
                <span className="text-white/30 text-4xl">?</span>
              )}
            </div>
          </div>
        </div>

        {/* Result */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-center p-6 rounded-xl mb-6 ${
              result === 'win' ? 'bg-green-500/10 border border-green-500/30' :
              result === 'lose' ? 'bg-red-500/10 border border-red-500/30' :
              'bg-blue-500/10 border border-blue-500/30'
            }`}
          >
            <p className={`text-2xl font-bold ${
              result === 'win' ? 'text-green-400' :
              result === 'lose' ? 'text-red-400' :
              'text-blue-400'
            }`}>
              {result === 'win' ? '🎉 You Won!' : result === 'lose' ? '💔 You Lost!' : '🤝 Draw!'}
            </p>
            {result === 'win' && <p className="text-green-400 mt-2">+${(bet * 2).toFixed(2)}</p>}
            {result === 'draw' && <p className="text-blue-400 mt-2">Bet returned</p>}
          </motion.div>
        )}

        {/* Choice Buttons */}
        {!result && (
          <div className="grid grid-cols-3 gap-4">
            {choices.map(choice => (
              <motion.button
                key={choice.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => play(choice.name)}
                disabled={isPlaying || state.balance < bet}
                className={`py-6 rounded-xl font-bold text-white text-lg ${
                  isPlaying || state.balance < bet
                    ? 'bg-white/10 cursor-not-allowed opacity-50'
                    : 'bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-400 hover:to-violet-500'
                }`}
              >
                <div className="text-4xl mb-2">{choice.icon}</div>
                {choice.label}
              </motion.button>
            ))}
          </div>
        )}

        {result && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.03 }}
            onClick={reset}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-500 to-violet-600 text-white font-bold"
          >
            Play Again
          </motion.button>
        )}
      </div>
    </div>
  );
}
