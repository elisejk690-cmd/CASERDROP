import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Repeat, Check, X, User } from 'lucide-react';
import { useSound } from '../hooks/useSound';
import { User as UserType } from '../hooks/useAuth';
import { InventoryItem } from '../hooks/useGameState';
import SkinDisplay from './SkinDisplay';

interface UserTrade {
  id: string;
  fromUserId: string;
  fromUsername: string;
  toUserId: string;
  toUsername: string;
  offeredItems: InventoryItem[];
  requestedItems: InventoryItem[];
  status: 'pending' | 'accepted' | 'declined';
  createdAt: number;
}

const TRADES_KEY = 'caser_drop_user_trades';

function getUserTrades(): UserTrade[] {
  const data = localStorage.getItem(TRADES_KEY);
  return data ? JSON.parse(data) : [];
}

function saveUserTrades(trades: UserTrade[]) {
  localStorage.setItem(TRADES_KEY, JSON.stringify(trades));
}

interface UserTradesPageProps {
  gameState: any;
  currentUser: UserType;
}

export default function UserTradesPage({ gameState, currentUser }: UserTradesPageProps) {
  const { state, removeFromInventory, addToInventory } = gameState;
  const { playTrade, playFail, playClick } = useSound();
  const [trades, setTrades] = useState<UserTrade[]>(getUserTrades());
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [offeredItems, setOfferedItems] = useState<InventoryItem[]>([]);
  const [requestedItems, setRequestedItems] = useState<InventoryItem[]>([]);
  const [showCreateTrade, setShowCreateTrade] = useState(false);

  const myTrades = trades.filter(t => t.fromUserId === currentUser.id || t.toUserId === currentUser.id);
  const pendingTrades = myTrades.filter(t => t.status === 'pending');

  const allUsers = JSON.parse(localStorage.getItem('caser_drop_users') || '[]').filter(
    (u: UserType) => u.id !== currentUser.id
  );

  const createTrade = () => {
    if (!selectedUser || offeredItems.length === 0 || requestedItems.length === 0) return;

    const newTrade: UserTrade = {
      id: `trade_${Date.now()}`,
      fromUserId: currentUser.id,
      fromUsername: currentUser.username,
      toUserId: selectedUser.id,
      toUsername: selectedUser.username,
      offeredItems,
      requestedItems,
      status: 'pending',
      createdAt: Date.now(),
    };

    const updatedTrades = [newTrade, ...trades];
    setTrades(updatedTrades);
    saveUserTrades(updatedTrades);
    setShowCreateTrade(false);
    setOfferedItems([]);
    setRequestedItems([]);
    setSelectedUser(null);
    playClick();
  };

  const acceptTrade = (trade: UserTrade) => {
    // Check if items still exist
    const myItems = state.inventory.filter((i: InventoryItem) => 
      trade.requestedItems.some(ri => ri.id === i.id)
    );

    if (myItems.length !== trade.requestedItems.length) {
      alert('❌ Некоторые предметы больше недоступны!');
      return;
    }

    // Remove items from both users
    trade.offeredItems.forEach(item => addToInventory(item.skin));
    trade.requestedItems.forEach(item => removeFromInventory(item.id));

    const updatedTrades = trades.map(t => 
      t.id === trade.id ? { ...t, status: 'accepted' as const } : t
    );
    setTrades(updatedTrades);
    saveUserTrades(updatedTrades);
    playTrade();
  };

  const declineTrade = (trade: UserTrade) => {
    const updatedTrades = trades.map(t => 
      t.id === trade.id ? { ...t, status: 'declined' as const } : t
    );
    setTrades(updatedTrades);
    saveUserTrades(updatedTrades);
    playFail();
  };

  return (
    <div className="pt-20 pb-8 px-4 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl sm:text-5xl caser-drop-title text-white mb-3">Трейды</h1>
        <p className="text-white/50 text-lg">Обменивайся предметами с другими игроками</p>
      </motion.div>

      {/* Create Trade Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setShowCreateTrade(true)}
        className="w-full mb-6 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-violet-600 text-white font-semibold flex items-center justify-center gap-2"
      >
        <Repeat size={20} />
        Создать трейд
      </motion.button>

      {/* Pending Trades */}
      {pendingTrades.length > 0 && (
        <div className="mb-8">
          <h2 className="text-white font-bold text-xl mb-4">Ожидающие трейды</h2>
          <div className="space-y-3">
            {pendingTrades.map((trade, i) => (
              <motion.div
                key={trade.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <User size={20} className="text-purple-400" />
                    <div>
                      <p className="text-white font-medium">
                        {trade.fromUserId === currentUser.id ? `Вы → ${trade.toUsername}` : `${trade.fromUsername} → Вы`}
                      </p>
                      <p className="text-white/40 text-xs">
                        {new Date(trade.createdAt).toLocaleString('ru-RU')}
                      </p>
                    </div>
                  </div>
                  {trade.toUserId === currentUser.id && (
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => acceptTrade(trade)}
                        className="w-10 h-10 rounded-xl bg-green-500/20 border border-green-500/50 flex items-center justify-center text-green-400"
                      >
                        <Check size={20} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => declineTrade(trade)}
                        className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/50 flex items-center justify-center text-red-400"
                      >
                        <X size={20} />
                      </motion.button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-white/60 text-sm mb-2">Предлагает:</p>
                    <div className="grid grid-cols-3 gap-2">
                      {trade.offeredItems.map((item, idx) => (
                        <div key={idx} className="bg-black/30 rounded-lg p-2 text-center">
                          <div className="text-2xl mb-1">{item.skin.image}</div>
                          <p className="text-white/70 text-xs truncate">{item.skin.weapon}</p>
                          <p className="text-green-400 text-xs">${item.skin.price.toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm mb-2">Запрашивает:</p>
                    <div className="grid grid-cols-3 gap-2">
                      {trade.requestedItems.map((item, idx) => (
                        <div key={idx} className="bg-black/30 rounded-lg p-2 text-center">
                          <div className="text-2xl mb-1">{item.skin.image}</div>
                          <p className="text-white/70 text-xs truncate">{item.skin.weapon}</p>
                          <p className="text-green-400 text-xs">${item.skin.price.toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Trade History */}
      {trades.filter(t => t.status !== 'pending').length > 0 && (
        <div>
          <h2 className="text-white font-bold text-xl mb-4">История трейдов</h2>
          <div className="space-y-2">
            {trades.filter(t => t.status !== 'pending').slice(0, 10).map((trade, i) => (
              <motion.div
                key={trade.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`bg-zinc-900/50 border rounded-xl p-4 flex items-center justify-between ${
                  trade.status === 'accepted' ? 'border-green-500/30' : 'border-red-500/30'
                }`}
              >
                <div>
                  <p className="text-white text-sm">
                    {trade.fromUsername} ↔ {trade.toUsername}
                  </p>
                  <p className="text-white/40 text-xs">
                    {new Date(trade.createdAt).toLocaleString('ru-RU')}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  trade.status === 'accepted' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {trade.status === 'accepted' ? 'Принят' : 'Отклонен'}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Create Trade Modal */}
      <AnimatePresence>
        {showCreateTrade && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
            onClick={() => setShowCreateTrade(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={e => e.stopPropagation()}
              className="bg-zinc-900 border border-white/10 rounded-3xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Создать трейд</h2>

              {/* Select User */}
              {!selectedUser && (
                <div>
                  <p className="text-white/60 mb-3">Выберите игрока:</p>
                  <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                    {allUsers.map((user: UserType) => (
                      <motion.button
                        key={user.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedUser(user)}
                        className="bg-white/5 border border-white/10 rounded-xl p-3 text-left hover:bg-white/10 transition-colors"
                      >
                        <p className="text-white font-medium">{user.username}</p>
                        <p className="text-white/40 text-xs">Уровень {user.stats.level}</p>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Select Items */}
              {selectedUser && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-white font-medium">Трейд с {selectedUser.username}</p>
                    <button onClick={() => setSelectedUser(null)} className="text-white/40 hover:text-white">
                      ← Назад
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-white/60 text-sm mb-2">Вы предлагаете:</p>
                      <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto">
                        {state.inventory.map((item: InventoryItem) => (
                          <motion.button
                            key={item.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              if (!offeredItems.find(i => i.id === item.id)) {
                                setOfferedItems([...offeredItems, item]);
                              }
                            }}
                            className={`bg-black/30 border rounded-lg p-2 text-center ${
                              offeredItems.find(i => i.id === item.id)
                                ? 'border-purple-500'
                                : 'border-white/10'
                            }`}
                          >
                            <div className="text-2xl mb-1">{item.skin.image}</div>
                            <p className="text-white/70 text-xs truncate">{item.skin.weapon}</p>
                            <p className="text-green-400 text-xs">${item.skin.price.toFixed(2)}</p>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm mb-2">Вы запрашиваете:</p>
                      <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto">
                        {selectedUser.inventory.map((item: InventoryItem) => (
                          <motion.button
                            key={item.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              if (!requestedItems.find(i => i.id === item.id)) {
                                setRequestedItems([...requestedItems, item]);
                              }
                            }}
                            className={`bg-black/30 border rounded-lg p-2 text-center ${
                              requestedItems.find(i => i.id === item.id)
                                ? 'border-purple-500'
                                : 'border-white/10'
                            }`}
                          >
                            <div className="text-2xl mb-1">{item.skin.image}</div>
                            <p className="text-white/70 text-xs truncate">{item.skin.weapon}</p>
                            <p className="text-green-400 text-xs">${item.skin.price.toFixed(2)}</p>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={createTrade}
                    disabled={offeredItems.length === 0 || requestedItems.length === 0}
                    className={`w-full py-3 rounded-xl font-semibold ${
                      offeredItems.length > 0 && requestedItems.length > 0
                        ? 'bg-gradient-to-r from-purple-500 to-violet-600 text-white'
                        : 'bg-white/10 text-white/40 cursor-not-allowed'
                    }`}
                  >
                    Отправить трейд
                  </motion.button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
