import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpCircle, Bitcoin } from 'lucide-react';
import { allSkins, Skin, rarityColors, rarityNames } from '../data/skins';
import { useSound } from '../hooks/useSound';
import { InventoryItem } from '../hooks/useGameState';
import SkinDisplay from './SkinDisplay';

interface UpgraderPageProps {
  gameState: any;
}

export default function UpgraderPage({ gameState }: UpgraderPageProps) {
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [targetSkin, setTargetSkin] = useState<Skin | null>(null);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [result, setResult] = useState<'win' | 'lose' | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [filterRarity, setFilterRarity] = useState<string>('all');
  const [btcReward, setBtcReward] = useState(0);
  const [arrowAngle, setArrowAngle] = useState(0);
  const { playUpgrade, playFail, playClick } = useSound();
  const { state, removeFromInventory, upgradeItem, addBitcoin } = gameState;

  const getChance = (): number => {
    if (!selectedItem || !targetSkin) return 0;
    const inputPrice = selectedItem.skin.price;
    const targetPrice = targetSkin.price;
    if (targetPrice <= inputPrice) return 0;
    const chance = Math.min(95, (inputPrice / targetPrice) * 85);
    return Math.max(1, chance);
  };

  const doUpgrade = () => {
    if (!selectedItem || !targetSkin || isUpgrading) return;
    
    // Save item ID before any state changes
    const itemId = selectedItem.id;
    
    // Reset arrow to starting position
    setArrowAngle(0);
    
    setIsUpgrading(true);
    setResult(null);

    const chance = getChance();
    const roll = Math.random() * 100;
    const success = roll < chance;

    // Calculate final arrow angle based on success/failure
    // Green zone: 0 to chance% (success)
    // Red zone: chance% to 100% (failure)
    let finalAngle: number;
    if (success) {
      // Stop in green zone (random position within 0 to chance%)
      finalAngle = Math.random() * (chance / 100) * 360;
    } else {
      // Stop in red zone (random position within chance% to 100%)
      finalAngle = (chance / 100) * 360 + Math.random() * ((100 - chance) / 100) * 360;
    }

    // Animate arrow to final position
    setArrowAngle(finalAngle + 720); // Add 720 for 2 full rotations before stopping

    setTimeout(() => {
      setIsUpgrading(false);
      if (success) {
        setResult('win');
        upgradeItem(itemId, targetSkin);
        // Award bitcoin based on skin value
        const btc = Math.max(0.00001, targetSkin.price / 100000);
        setBtcReward(btc);
        addBitcoin(btc);
        playUpgrade();
        
        // Update autumn event task progress
        if ((window as any).updateAutumnTask) {
          (window as any).updateAutumnTask('task2', 1); // Upgrades won
        }
      } else {
        setResult('lose');
        removeFromInventory(itemId);
        setBtcReward(0);
        playFail();
      }
      setSelectedItem(null);
      setTargetSkin(null);
    }, 2500);
  };

  const filteredSkins = allSkins.filter(s => {
    if (filterRarity === 'all') return true;
    return s.rarity === filterRarity;
  });

  return (
    <div className="pt-20 pb-8 px-4 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl sm:text-5xl caser-drop-title text-white mb-3">Upgrader</h1>
        <p className="text-white/50 text-lg">Upgrade your skins and earn Bitcoin</p>
        <div className="mt-3 inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full px-4 py-1.5">
          <Bitcoin size={16} className="text-yellow-400" />
          <span className="text-yellow-400 text-sm font-medium">Earn BTC on successful upgrades!</span>
        </div>
      </motion.div>

      {/* Upgrade Interface */}
      <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 sm:p-8 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
          {/* Input Item */}
          <motion.div whileHover={{ scale: 1.02 }} className="relative">
            <p className="text-white/40 text-sm mb-3 text-center">Your Item</p>
            {selectedItem ? (
              <motion.div
                layout
                className="bg-black/50 border-2 rounded-2xl p-6 text-center cursor-pointer"
                style={{ borderColor: rarityColors[selectedItem.skin.rarity] }}
                onClick={() => setSelectedItem(null)}
              >
                <div className="mx-auto mb-2">
                  <SkinDisplay skin={selectedItem.skin} size="lg" />
                </div>
                <p className="text-white font-medium text-sm">{selectedItem.skin.weapon}</p>
                <p className="text-white/50 text-xs">{selectedItem.skin.name}</p>
                <p className="text-green-400 font-bold mt-2">${selectedItem.skin.price.toFixed(2)}</p>
              </motion.div>
            ) : (
              <div
                onClick={() => setShowPicker(true)}
                className="bg-black/30 border-2 border-dashed border-white/20 rounded-2xl p-6 text-center cursor-pointer hover:border-white/40 transition-colors min-h-[180px] flex flex-col items-center justify-center"
              >
                <ArrowUpCircle size={32} className="text-white/30 mb-2" />
                <p className="text-white/40 text-sm">Select item from inventory</p>
              </div>
            )}
          </motion.div>

          {/* Chance Circle with Spinning Arrow */}
          <div className="flex flex-col items-center">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                
                {/* Red zone (failure zone) */}
                <circle
                  cx="50" cy="50" r="42"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="8"
                  strokeDasharray={`${(100 - getChance()) * 2.64} 264`}
                  strokeDashoffset={`-${getChance() * 2.64}`}
                  opacity="0.3"
                />
                
                {/* Green zone (success zone) */}
                <motion.circle
                  cx="50" cy="50" r="42"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${getChance() * 2.64} 264`}
                  initial={{ strokeDasharray: '0 264' }}
                  animate={{ strokeDasharray: `${getChance() * 2.64} 264` }}
                  transition={{ duration: 0.5 }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-bold text-2xl">{getChance().toFixed(1)}%</span>
              </div>
              
              {/* Spinning Arrow */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ rotate: arrowAngle }}
                transition={{ duration: 2.5, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="w-1 h-16 bg-gradient-to-t from-transparent via-yellow-400 to-yellow-400 rounded-full origin-bottom" />
              </motion.div>
            </div>
            {isUpgrading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-3 flex gap-1"
              >
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-orange-500"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </motion.div>
            )}
          </div>

          {/* Target Item */}
          <motion.div whileHover={{ scale: 1.02 }}>
            <p className="text-white/40 text-sm mb-3 text-center">Target Item</p>
            {targetSkin ? (
              <motion.div
                layout
                className="bg-black/50 border-2 rounded-2xl p-6 text-center cursor-pointer"
                style={{ borderColor: rarityColors[targetSkin.rarity] }}
                onClick={() => setTargetSkin(null)}
              >
                <div className="mx-auto mb-2">
                  <SkinDisplay skin={targetSkin} size="lg" />
                </div>
                <p className="text-white font-medium text-sm">{targetSkin.weapon}</p>
                <p className="text-white/50 text-xs">{targetSkin.name}</p>
                <p className="text-green-400 font-bold mt-2">${targetSkin.price.toFixed(2)}</p>
              </motion.div>
            ) : (
              <div
                onClick={() => setShowPicker(true)}
                className="bg-black/30 border-2 border-dashed border-white/20 rounded-2xl p-6 text-center cursor-pointer hover:border-white/40 transition-colors min-h-[180px] flex flex-col items-center justify-center"
              >
                <ArrowUpCircle size={32} className="text-white/30 mb-2" />
                <p className="text-white/40 text-sm">Select target skin</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Upgrade Button */}
        <div className="mt-8 text-center">
          <motion.button
            whileHover={{ scale: selectedItem && targetSkin ? 1.03 : 1 }}
            whileTap={{ scale: selectedItem && targetSkin ? 0.97 : 1 }}
            onClick={doUpgrade}
            disabled={!selectedItem || !targetSkin || isUpgrading}
            className={`px-8 py-3 rounded-xl font-semibold text-white transition-all ${
              !selectedItem || !targetSkin || isUpgrading
                ? 'bg-white/10 cursor-not-allowed opacity-50'
                : 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 shadow-lg shadow-purple-500/20'
            }`}
          >
            {isUpgrading ? 'Upgrading...' : 'Upgrade'}
          </motion.button>
        </div>

        {/* Result */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`mt-6 p-4 rounded-xl text-center ${
                result === 'win' ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'
              }`}
            >
              <p className={`font-bold text-lg ${result === 'win' ? 'text-green-400' : 'text-red-400'}`}>
                {result === 'win' ? '🎉 Upgrade Successful!' : '💔 Upgrade Failed'}
              </p>
              {result === 'win' && btcReward > 0 && (
                <div className="mt-2 flex items-center justify-center gap-2">
                  <Bitcoin size={16} className="text-yellow-400" />
                  <span className="text-yellow-400 font-bold">+{btcReward.toFixed(4)} BTC earned!</span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Skin Picker Modal */}
      <AnimatePresence>
        {showPicker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
            onClick={() => setShowPicker(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-3xl max-h-[80vh] bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden flex flex-col"
            >
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-white font-bold">Select Item</h3>
                <button onClick={() => setShowPicker(false)} className="text-white/40 hover:text-white text-xl">✕</button>
              </div>
              
              <div className="p-4 border-b border-white/10 flex gap-2 flex-wrap">
                {(['all', 'milspec', 'restricted', 'classified', 'covert', 'knife'] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => { setFilterRarity(r); playClick(); }}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      filterRarity === r ? 'bg-white/20 text-white' : 'bg-white/5 text-white/50 hover:text-white/80'
                    }`}
                  >
                    {r === 'all' ? 'All' : rarityNames[r]}
                  </button>
                ))}
              </div>

              <div className="p-4 overflow-y-auto flex-1">
                {!targetSkin && state.inventory.length > 0 && (
                  <div className="mb-6">
                    <p className="text-white/40 text-sm mb-3">From Inventory</p>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {state.inventory.map((item: InventoryItem) => (
                        <motion.div
                          key={item.id}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => { setSelectedItem(item); setShowPicker(false); playClick(); }}
                          className="bg-black/50 border rounded-xl p-3 text-center cursor-pointer hover:border-white/30 transition-colors"
                          style={{ borderColor: rarityColors[item.skin.rarity] + '40' }}
                        >
                          <div className="mx-auto mb-1">
                            <SkinDisplay skin={item.skin} size="md" />
                          </div>
                          <p className="text-white/70 text-[10px] truncate mt-1">{item.skin.weapon}</p>
                          <p className="text-green-400 text-[10px]">${item.skin.price.toFixed(2)}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <p className="text-white/40 text-sm mb-3">Available Skins (to upgrade to)</p>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {filteredSkins.filter(skin => {
                      // Only show skins that are more expensive than selected item
                      if (!selectedItem) return true;
                      return skin.price > selectedItem.skin.price;
                    }).map(skin => (
                      <motion.div
                        key={skin.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => { setTargetSkin(skin); setShowPicker(false); playClick(); }}
                        className="bg-black/50 border rounded-xl p-3 text-center cursor-pointer hover:border-white/30 transition-colors"
                        style={{ borderColor: rarityColors[skin.rarity] + '40' }}
                      >
                        <div className="mx-auto mb-1">
                          <SkinDisplay skin={skin} size="md" />
                        </div>
                        <p className="text-white/70 text-[10px] truncate mt-1">{skin.weapon}</p>
                        <p className="text-white/50 text-[9px] truncate">{skin.name}</p>
                        <p className="text-green-400 text-[10px]">${skin.price.toFixed(2)}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
