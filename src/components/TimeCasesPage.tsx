import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, Gift, Timer, Package } from 'lucide-react';
import { User } from '../hooks/useAuth';
import { useSound } from '../hooks/useSound';

interface TimeCasesPageProps {
  gameState: any;
}

const TIME_CASES_KEY = 'caser_drop_time_cases';

interface TimeCase {
  id: string;
  name: string;
  duration: number; // in minutes
  unlockTime: number | null;
  opened: boolean;
}

const TIME_CASES_CONFIG = [
  { id: 'time_15', name: '15 минут', duration: 15 },
  { id: 'time_30', name: '30 минут', duration: 30 },
  { id: 'time_60', name: '1 час', duration: 60 },
  { id: 'time_180', name: '3 часа', duration: 180 },
  { id: 'time_300', name: '5 часов', duration: 300 },
  { id: 'time_600', name: '10 часов', duration: 600 },
];

function getTimeCases(): TimeCase[] {
  const data = localStorage.getItem(TIME_CASES_KEY);
  if (!data) {
    return TIME_CASES_CONFIG.map(c => ({
      ...c,
      unlockTime: null,
      opened: false,
    }));
  }
  return JSON.parse(data);
}

function saveTimeCases(cases: TimeCase[]) {
  localStorage.setItem(TIME_CASES_KEY, JSON.stringify(cases));
}

export default function TimeCasesPage({ gameState }: TimeCasesPageProps) {
  const { playClick, playWin } = useSound();
  const [timeCases, setTimeCases] = useState<TimeCase[]>(getTimeCases());
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const startCase = (caseId: string) => {
    const caseData = timeCases.find(c => c.id === caseId);
    if (!caseData || caseData.unlockTime) return;

    const updatedCases = timeCases.map(c => {
      if (c.id === caseId) {
        return { ...c, unlockTime: Date.now() + c.duration * 60 * 1000 };
      }
      return c;
    });

    setTimeCases(updatedCases);
    saveTimeCases(updatedCases);
    playClick();
  };

  const openCase = (caseId: string) => {
    const caseData = timeCases.find(c => c.id === caseId);
    if (!caseData || !caseData.unlockTime || currentTime < caseData.unlockTime) return;

    // Give random reward based on case duration
    const rewards = [
      { min: 10, max: 50 },
      { min: 25, max: 100 },
      { min: 50, max: 200 },
      { min: 150, max: 500 },
      { min: 300, max: 1000 },
      { min: 500, max: 2000 },
    ];

    const caseIndex = TIME_CASES_CONFIG.findIndex(c => c.id === caseId);
    const reward = rewards[caseIndex];
    const amount = Math.floor(Math.random() * (reward.max - reward.min)) + reward.min;

    const updatedCases = timeCases.map(c => {
      if (c.id === caseId) {
        return { ...c, opened: true, unlockTime: null };
      }
      return c;
    });

    setTimeCases(updatedCases);
    saveTimeCases(updatedCases);

    // Add balance
    gameState.addBalance(amount);
    playWin('covert');

    alert(`🎉 Вы получили $${amount}!`);
  };

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}д ${hours % 24}ч`;
    if (hours > 0) return `${hours}ч ${minutes % 60}м`;
    if (minutes > 0) return `${minutes}м ${seconds % 60}с`;
    return `${seconds}с`;
  };

  return (
    <div className="pt-20 pb-8 px-4 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl sm:text-5xl caser-drop-title text-white mb-3">Time Cases</h1>
        <p className="text-white/50 text-lg">Запускай кейсы и жди, пока они откроются!</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {timeCases.map((caseData, index) => {
          const isRunning = caseData.unlockTime && currentTime < caseData.unlockTime;
          const isReady = caseData.unlockTime && currentTime >= caseData.unlockTime;
          const timeLeft = caseData.unlockTime ? caseData.unlockTime - currentTime : 0;

          return (
            <motion.div
              key={caseData.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-2xl border-2 p-6 ${
                caseData.opened
                  ? 'bg-zinc-900/30 border-white/5 opacity-50'
                  : isReady
                  ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/50'
                  : isRunning
                  ? 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/50'
                  : 'bg-zinc-900/50 border-white/10 hover:border-purple-500/50'
              } transition-all`}
            >
              <div className="text-center">
                <div className="text-5xl mb-4">
                  {caseData.opened ? <CheckCircle size={48} className="text-green-400" /> : 
                   isReady ? <Gift size={48} className="text-yellow-400" /> : 
                   isRunning ? <Timer size={48} className="text-blue-400" /> : 
                   <Package size={48} className="text-white/40" />}
                </div>
                <h3 className="text-white font-bold text-xl mb-2">{caseData.name}</h3>
                
                {caseData.opened ? (
                  <p className="text-white/40 text-sm">Открыт</p>
                ) : isReady ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openCase(caseData.id)}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold"
                  >
                    Открыть
                  </motion.button>
                ) : isRunning ? (
                  <div>
                    <div className="text-3xl font-bold text-white mb-2">
                      {formatTime(timeLeft)}
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                        initial={{ width: '100%' }}
                        animate={{ width: `${(timeLeft / (caseData.duration * 60 * 1000)) * 100}%` }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                  </div>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => startCase(caseData.id)}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-violet-600 text-white font-bold flex items-center justify-center gap-2"
                  >
                    <Clock size={20} />
                    Запустить
                  </motion.button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
