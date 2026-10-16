import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRightLeft, Check, X } from 'lucide-react';
import { allSkins, Skin, rarityColors } from '../data/skins';
import { useSound } from '../hooks/useSound';
import { useGameState, InventoryItem } from '../hooks/useGameState';
import SkinDisplay from './SkinDisplay';

interface TradeOffer {
  id: string;
  offeredItems: InventoryItem[];
  requestedSkin: Skin;
  successRate: number;
}

function generateTradeOffer(inventory: InventoryItem[]): TradeOffer | null {
  if (inventory.length < 1) return null;
  
  const availableItems = [...inventory].sort(() => Math.random() - 0.5).slice(0, Math.min(3, inventory.length));
  const totalValue = availableItems.reduce((sum, i) => sum + i.skin.price, 0);
  
  // Find a skin that's worth slightly more
  const possibleTargets = allSkins.filter(s => s.price > totalValue * 0.8 && s.price < totalValue * 3);
  if (possibleTargets.length === 0) return null;
  
  const target = possibleTargets[Math.floor(Math.random() * possibleTargets.length)];
  const successRate = Math.min(90, Math.max(15, (totalValue / target.price) * 80));
  
  return {
    id: `trade_${Date.now()}`,
    offeredItems: availableItems,
    requestedSkin: target,
    successRate,
  };
}

interface TradesPageProps {
  gameState: any;
}

export default function TradesPage({ gameState }: TradesPageProps) {
  const [currentTrade, setCurrentTrade] = useState<TradeOffer | null>(null);
  const [isTrading, setIsTrading] = useState(false);
  const [tradeResult, setTradeResult] = useState<'success' | 'fail' | null>(null);
  const [tradeHistory, setTradeHistory] = useState<Array<{ type: 'success' | 'fail'; items: string[]; result: string }>>([]);
  const { playTrade, playFail, playClick } = useSound();
  const { state, removeFromInventory, addToInventory } = gameState;

  const generateNewTrade = () => {
    const offer = generateTradeOffer(state.inventory);
    setCurrentTrade(offer);
    setTradeResult(null);
    playClick();
  };

  const acceptTrade = () => {
    if (!currentTrade || isTrading) return;
    setIsTrading(true);

    setTimeout(() => {
      const success = Math.random() * 100 < currentTrade.successRate;
      setIsTrading(false);
      setTradeResult(success ? 'success' : 'fail');

      if (success) {
        currentTrade.offeredItems.forEach(item => removeFromInventory(item.id));
        addToInventory(currentTrade.requestedSkin);
        playTrade();
      } else {
        currentTrade.offeredItems.forEach(item => removeFromInventory(item.id));
        playFail();
      }

      setTradeHistory(prev => [{
        type: (success ? 'success' : 'fail') as 'success' | 'fail',
        items: currentTrade.offeredItems.map(i => `${i.skin.weapon} | ${i.skin.name}`),
        result: success ? currentTrade.requestedSkin.name : 'Lost items',
      }, ...prev].slice(0, 10));

      setTimeout(() => {
        setCurrentTrade(null);
        setTradeResult(null);
      }, 3000);
    }, 2000);
  };

  return (
    <div className="pt-20 pb-8 px-4 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl sm:text-5xl caser-drop-title text-white mb-3">Trades</h1>
        <p className="text-white/50 text-lg">Trade your items for better skins</p>
      </motion.div>

      {/* Trade Interface */}
      <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 sm:p-8 mb-8">
        {currentTrade ? (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
              {/* Offered Items */}
              <div>
                <p className="text-white/40 text-sm mb-3 text-center">You Offer</p>
                <div className="space-y-2">
                  {currentTrade.offeredItems.map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-black/50 border rounded-xl p-3 flex items-center gap-3"
                      style={{ borderColor: rarityColors[item.skin.rarity] + '40' }}
                    >
                      <div className="flex-shrink-0">
                        <SkinDisplay skin={item.skin} size="md" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">{item.skin.weapon}</p>
                        <p className="text-white/50 text-xs truncate">{item.skin.name}</p>
                      </div>
                      <p className="text-green-400 text-sm font-bold">${item.skin.price.toFixed(2)}</p>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-3 text-center">
                  <span className="text-white/40 text-sm">
                    Total: <span className="text-white font-bold">${currentTrade.offeredItems.reduce((s, i) => s + i.skin.price, 0).toFixed(2)}</span>
                  </span>
                </div>
              </div>

              {/* Arrow / Success Rate */}
              <div className="flex flex-col items-center">
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRightLeft size={32} className="text-white/30" />
                </motion.div>
                <div className="mt-4 text-center">
                  <div className={`text-2xl font-bold ${
                    currentTrade.successRate > 60 ? 'text-green-400' : 
                    currentTrade.successRate > 35 ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {currentTrade.successRate.toFixed(0)}%
                  </div>
                  <p className="text-white/40 text-xs">Success Rate</p>
                </div>
                {isTrading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-3 flex gap-1"
                  >
                    {[0, 1, 2].map(i => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full bg-blue-500"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Requested Item */}
              <div>
                <p className="text-white/40 text-sm mb-3 text-center">You Get</p>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-black/50 border-2 rounded-xl p-4 text-center"
                  style={{ borderColor: rarityColors[currentTrade.requestedSkin.rarity] }}
                >
                  <div className="mx-auto mb-2">
                    <SkinDisplay skin={currentTrade.requestedSkin} size="lg" />
                  </div>
                  <p className="text-white font-medium">{currentTrade.requestedSkin.weapon}</p>
                  <p className="text-white/50 text-sm">{currentTrade.requestedSkin.name}</p>
                  <p className="text-green-400 font-bold mt-2">${currentTrade.requestedSkin.price.toFixed(2)}</p>
                </motion.div>
              </div>
            </div>

            {/* Trade Result */}
            <AnimatePresence>
              {tradeResult && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className={`mt-6 p-4 rounded-xl text-center ${
                    tradeResult === 'success' ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'
                  }`}
                >
                  <p className={`font-bold text-lg ${tradeResult === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                    {tradeResult === 'success' ? '✅ Trade Successful!' : '❌ Trade Failed - Items Lost'}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Actions */}
            {!isTrading && !tradeResult && (
              <div className="mt-6 flex justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={acceptTrade}
                  className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 shadow-lg shadow-green-500/20 flex items-center gap-2"
                >
                  <Check size={18} /> Accept Trade
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { setCurrentTrade(null); playClick(); }}
                  className="px-6 py-3 rounded-xl font-semibold text-white bg-white/10 hover:bg-white/15 flex items-center gap-2"
                >
                  <X size={18} /> Decline
                </motion.button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <ArrowRightLeft size={48} className="text-white/20 mx-auto mb-4" />
            <p className="text-white/50 mb-6">
              {state.inventory.length === 0 ? 'You need items in your inventory to trade' : 'Generate a trade offer to exchange items'}
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={generateNewTrade}
              disabled={state.inventory.length === 0}
              className={`px-8 py-3 rounded-xl font-semibold text-white transition-all ${
                state.inventory.length === 0
                  ? 'bg-white/10 cursor-not-allowed opacity-50'
                  : 'bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-400 hover:to-cyan-500 shadow-lg shadow-blue-500/20'
              }`}
            >
              Generate Trade Offer
            </motion.button>
          </div>
        )}
      </div>

      {/* Trade History */}
      {tradeHistory.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6"
        >
          <h3 className="text-white font-bold mb-4">Trade History</h3>
          <div className="space-y-2">
            {tradeHistory.map((trade, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`flex items-center justify-between p-3 rounded-xl border ${
                  trade.type === 'success' ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{trade.type === 'success' ? '✅' : '❌'}</span>
                  <span className="text-white/70 text-sm">{trade.items.join(', ')}</span>
                </div>
                <span className={`text-sm font-medium ${trade.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                  {trade.result}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
