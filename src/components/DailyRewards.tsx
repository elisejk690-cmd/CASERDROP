import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Gift, Check } from 'lucide-react';
import { useSound } from '../hooks/useSound';

interface DailyRewardsProps {
  gameState: any;
  currentUser: any;
}

const DAILY_REWARDS_KEY = 'caser_drop_daily_rewards';

const REWARDS = [
  { day: 1, reward: 10, type: 'balance' },
  { day: 2, reward: 15, type: 'balance' },
  { day: 3, reward: 20, type: 'balance' },
  { day: 4, reward: 30, type: 'balance' },
  { day: 5, reward: 50, type: 'balance' },
  { day: 6, reward: 75, type: 'balance' },
  { day: 7, reward: 100, type: 'balance' },
];

export default function DailyRewards({ gameState, currentUser }: DailyRewardsProps) {
  const [streak, setStreak] = useState(0);
  const [lastClaim, setLastClaim] = useState<string | null>(null);
  const [claimed, setClaimed] = useState(false);
  const { playClick, playWin } = useSound();
  const { addBalance } = gameState;

  useEffect(() => {
    const data = localStorage.getItem(DAILY_REWARDS_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      setStreak(parsed.streak || 0);
      setLastClaim(parsed.lastClaim);
      
      // Check if streak should reset
      if (parsed.lastClaim) {
        const lastDate = new Date(parsed.lastClaim);
        const today = new Date();
        const diffDays = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays > 1) {
          setStreak(0);
        }
      }
      
      // Check if already claimed today
      if (parsed.lastClaim) {
        const lastDate = new Date(parsed.lastClaim);
        const today = new Date();
        setClaimed(lastDate.toDateString() === today.toDateString());
      }
    }
  }, []);

  const claimReward = () => {
    if (claimed) return;
    
    const currentDay = (streak % 7) + 1;
    const reward = REWARDS[currentDay - 1];
    
    addBalance(reward.reward);
    playWin('covert');
    
    const newStreak = streak + 1;
    setStreak(newStreak);
    setClaimed(true);
    
    const today = new Date().toISOString();
    setLastClaim(today);
    
    localStorage.setItem(DAILY_REWARDS_KEY, JSON.stringify({
      streak: newStreak,
      lastClaim: today,
    }));
  };

  return (
    <div className="pt-20 pb-8 px-4 max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl caser-drop-title text-white mb-3">Daily Rewards</h1>
        <p className="text-white/50 text-lg">Claim your reward every day!</p>
      </motion.div>

      <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-8 mb-6">
        <div className="text-center mb-8">
          <p className="text-white/60 text-sm mb-2">Current Streak</p>
          <p className="text-4xl font-bold text-purple-400">{streak} days</p>
        </div>

        {/* Rewards Grid */}
        <div className="grid grid-cols-7 gap-3 mb-8">
          {REWARDS.map((r, i) => {
            const isCurrentDay = (streak % 7) === i;
            const isPastDay = i < (streak % 7);
            
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`rounded-xl p-4 text-center border-2 ${
                  isCurrentDay && !claimed
                    ? 'bg-purple-500/20 border-purple-500/50'
                    : isPastDay || (isCurrentDay && claimed)
                    ? 'bg-green-500/20 border-green-500/50'
                    : 'bg-white/5 border-white/10'
                }`}
              >
                <p className="text-white/60 text-xs mb-2">Day {r.day}</p>
                <Gift size={24} className={`mx-auto mb-2 ${
                  isCurrentDay && !claimed ? 'text-purple-400' : 
                  isPastDay || (isCurrentDay && claimed) ? 'text-green-400' : 'text-white/30'
                }`} />
                <p className={`font-bold ${
                  isCurrentDay && !claimed ? 'text-purple-400' : 
                  isPastDay || (isCurrentDay && claimed) ? 'text-green-400' : 'text-white/60'
                }`}>
                  ${r.reward}
                </p>
                {(isPastDay || (isCurrentDay && claimed)) && (
                  <Check size={16} className="text-green-400 mx-auto mt-1" />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Claim Button */}
        <motion.button
          whileHover={{ scale: !claimed ? 1.03 : 1 }}
          whileTap={{ scale: !claimed ? 0.97 : 1 }}
          onClick={claimReward}
          disabled={claimed}
          className={`w-full py-4 rounded-xl font-bold text-white ${
            claimed
              ? 'bg-white/10 cursor-not-allowed opacity-50'
              : 'bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-400 hover:to-violet-500'
          }`}
        >
          {claimed ? '✓ Claimed Today' : `Claim Day ${(streak % 7) + 1} Reward ($${REWARDS[streak % 7].reward})`}
        </motion.button>

        {claimed && (
          <p className="text-white/40 text-sm text-center mt-4">Come back tomorrow for the next reward!</p>
        )}
      </div>

      {/* Info */}
      <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6">
        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
          <Calendar size={20} className="text-purple-400" />
          How it works
        </h3>
        <ul className="space-y-2 text-white/60 text-sm">
          <li>• Claim your reward every day</li>
          <li>• Rewards increase each day of your streak</li>
          <li>• After 7 days, the cycle resets</li>
          <li>• Miss a day and your streak resets to Day 1</li>
          <li>• Maximum reward: $100 on Day 7!</li>
        </ul>
      </div>
    </div>
  );
}
