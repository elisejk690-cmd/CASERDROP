import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Key, Gift, Clock, CheckCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface Task {
  id: string;
  title: string;
  description: string;
  requirement: number;
  progress: number;
  reward: number;
  completed: boolean;
  type: 'time' | 'upgrades' | 'cases' | 'trades';
}

const AUTUMN_EVENT_KEY = 'caser_drop_autumn_event';

function getAutumnEventData() {
  const data = localStorage.getItem(AUTUMN_EVENT_KEY);
  if (!data) return null;
  return JSON.parse(data);
}

function saveAutumnEventData(data: any) {
  localStorage.setItem(AUTUMN_EVENT_KEY, JSON.stringify(data));
}

function generateDailyTasks(): Task[] {
  return [
    {
      id: 'task1',
      title: 'Активный пользователь',
      description: 'Проведи 30 минут в приложении',
      requirement: 30,
      progress: 0,
      reward: 1,
      completed: false,
      type: 'time',
    },
    {
      id: 'task2',
      title: 'Мастер апгрейдов',
      description: 'Сделай 3 успешных апгрейда',
      requirement: 3,
      progress: 0,
      reward: 2,
      completed: false,
      type: 'upgrades',
    },
    {
      id: 'task3',
      title: 'Кейсоман',
      description: 'Открой 5 кейсов',
      requirement: 5,
      progress: 0,
      reward: 2,
      completed: false,
      type: 'cases',
    },
  ];
}

export default function AutumnEvent() {
  const { currentUser } = useAuth();
  const [keys, setKeys] = useState(0);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showSafe, setShowSafe] = useState(false);
  const [safeOpened, setSafeOpened] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
    // Load or initialize autumn event data
    const data = getAutumnEventData();
    const today = new Date().toDateString();
    
    if (!data || data.lastUpdate !== today) {
      // Reset tasks for new day
      const newTasks = generateDailyTasks();
      setTasks(newTasks);
      saveAutumnEventData({
        lastUpdate: today,
        tasks: newTasks,
        keys: 0,
        safeOpened: false,
        timeSpent: 0,
      });
    } else {
      setTasks(data.tasks);
      setKeys(data.keys || 0);
      setSafeOpened(data.safeOpened || false);
      setTimeSpent(data.timeSpent || 0);
    }
  }, []);

  // Timer for tracking time spent in app
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => {
        const newTime = prev + 1;
        const data = getAutumnEventData();
        if (data) {
          saveAutumnEventData({ ...data, timeSpent: newTime });
        }
        
        // Update task progress for time spent
        setTasks(currentTasks => {
          const updatedTasks = currentTasks.map(task => {
            if (task.id === 'task1' && !task.completed) {
              const newProgress = Math.min(newTime / 60, task.requirement); // Convert seconds to minutes
              const completed = newProgress >= task.requirement;
              return { ...task, progress: newProgress, completed };
            }
            return task;
          });
          
          // Check if task just completed
          const timeTask = updatedTasks.find(t => t.id === 'task1');
          if (timeTask && timeTask.completed && !currentTasks.find(t => t.id === 'task1')?.completed) {
            setKeys(prev => prev + timeTask.reward);
          }
          
          const data = getAutumnEventData();
          if (data) {
            saveAutumnEventData({ ...data, tasks: updatedTasks });
          }
          
          return updatedTasks;
        });
        
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const updateTaskProgress = (taskId: string, increment: number) => {
    setTasks(currentTasks => {
      const updatedTasks = currentTasks.map(task => {
        if (task.id === taskId && !task.completed) {
          const newProgress = Math.min(task.progress + increment, task.requirement);
          const completed = newProgress >= task.requirement;
          if (completed && !task.completed) {
            setKeys(prev => {
              const newKeys = prev + task.reward;
              const data = getAutumnEventData();
              if (data) {
                saveAutumnEventData({ ...data, keys: newKeys, tasks: updatedTasks });
              }
              return newKeys;
            });
          }
          return { ...task, progress: newProgress, completed };
        }
        return task;
      });
      
      const data = getAutumnEventData();
      if (data) {
        saveAutumnEventData({ ...data, tasks: updatedTasks });
      }
      
      return updatedTasks;
    });
  };

  // Export function for other components to call
  useEffect(() => {
    (window as any).updateAutumnTask = updateTaskProgress;
    return () => {
      delete (window as any).updateAutumnTask;
    };
  }, [tasks]);

  const openSafe = () => {
    if (keys >= 9 && !safeOpened) {
      setKeys(prev => prev - 9);
      setSafeOpened(true);
      setShowSafe(false);
      
      const data = getAutumnEventData();
      saveAutumnEventData({
        ...data,
        keys: keys - 9,
        safeOpened: true,
      });
      
      // TODO: Open special case with knives, agents, gloves, admin signature
    }
  };

  return (
    <div className="pt-20 pb-8 px-4 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl sm:text-5xl caser-drop-title text-white mb-3">Autumn Event</h1>
        <p className="text-white/50 text-lg">Выполняй задания и получай ключи для открытия сейфа!</p>
      </motion.div>

      {/* Keys Display */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-amber-500/20 to-orange-600/20 border border-amber-500/30 rounded-2xl p-6 mb-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-amber-500/20 flex items-center justify-center">
              <Key size={32} className="text-amber-400" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Ключи</p>
              <p className="text-3xl font-bold text-white">{keys} / 9</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowSafe(true)}
            disabled={keys < 9 || safeOpened}
            className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 ${
              keys >= 9 && !safeOpened
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white'
                : 'bg-white/10 text-white/40 cursor-not-allowed'
            }`}
          >
            <Lock size={20} />
            {safeOpened ? 'Сейф открыт' : 'Открыть сейф'}
          </motion.button>
        </div>
      </motion.div>

      {/* Tasks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {tasks.map((task, i) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
            className={`bg-zinc-900/50 border rounded-2xl p-6 ${
              task.completed ? 'border-green-500/30' : 'border-white/10'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-white font-bold text-lg mb-1">{task.title}</h3>
                <p className="text-white/50 text-sm">{task.description}</p>
              </div>
              {task.completed && (
                <CheckCircle size={24} className="text-green-400 flex-shrink-0" />
              )}
            </div>
            
            <div className="mb-3">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-white/60">Прогресс</span>
                <span className="text-white font-medium">
                  {task.progress} / {task.requirement}
                </span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${
                    task.completed
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                      : 'bg-gradient-to-r from-purple-500 to-violet-600'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${(task.progress / task.requirement) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Key size={16} className="text-amber-400" />
                <span className="text-amber-400 font-medium">+{task.reward} ключей</span>
              </div>
              <div className="flex items-center gap-1 text-white/40 text-sm">
                <Clock size={14} />
                <span>Обновление в 00:00</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Safe Modal */}
      <AnimatePresence>
        {showSafe && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
            onClick={() => setShowSafe(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={e => e.stopPropagation()}
              className="bg-zinc-900 border border-white/10 rounded-3xl p-8 max-w-md w-full"
            >
              <div className="text-center mb-6">
                <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-600/20 border-2 border-amber-500/50 flex items-center justify-center">
                  <Lock size={48} className="text-amber-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Осенний Сейф</h2>
                <p className="text-white/50">Вставь 9 ключей чтобы открыть сейф</p>
              </div>

              {/* Key Slots */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    className={`aspect-square rounded-xl border-2 flex items-center justify-center ${
                      i < keys
                        ? 'bg-amber-500/20 border-amber-500/50'
                        : 'bg-white/5 border-white/10'
                    }`}
                  >
                    {i < keys && <Key size={24} className="text-amber-400" />}
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowSafe(false)}
                  className="flex-1 py-3 rounded-xl bg-white/10 text-white font-medium"
                >
                  Закрыть
                </motion.button>
                <motion.button
                  whileHover={{ scale: keys >= 9 ? 1.02 : 1 }}
                  whileTap={{ scale: keys >= 9 ? 0.98 : 1 }}
                  onClick={openSafe}
                  disabled={keys < 9}
                  className={`flex-1 py-3 rounded-xl font-medium ${
                    keys >= 9
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white'
                      : 'bg-white/10 text-white/40 cursor-not-allowed'
                  }`}
                >
                  Открыть сейф
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
