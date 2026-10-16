import { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Check, ArrowUpDown } from 'lucide-react';
import { allSkins, rarityColors, rarityNames } from '../data/skins';
import { User } from '../hooks/useAuth';
import SkinDisplay from './SkinDisplay';

interface IndexPageProps {
  currentUser: User;
}

export default function IndexPage({ currentUser }: IndexPageProps) {
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');
  
  // Use ownedSkinIds to track ALL skins ever owned (even if sold)
  const ownedSkinIds = new Set(currentUser.ownedSkinIds || []);
  const totalSkins = allSkins.length;
  const ownedCount = allSkins.filter(s => ownedSkinIds.has(s.id)).length;
  const completionPercent = (ownedCount / totalSkins) * 100;

  // Sort skins based on selected option
  const sortedSkins = [...allSkins].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return 0; // default order
  });

  return (
    <div className="pt-20 pb-8 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl sm:text-5xl caser-drop-title text-white mb-3">Skin Index</h1>
        <p className="text-white/50 text-lg">Track your collection progress</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 text-center"
        >
          <Package size={32} className="text-purple-400 mx-auto mb-2" />
          <p className="text-3xl font-bold text-white">{ownedCount}</p>
          <p className="text-white/40 text-sm">Owned</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 text-center"
        >
          <Package size={32} className="text-blue-400 mx-auto mb-2" />
          <p className="text-3xl font-bold text-white">{totalSkins}</p>
          <p className="text-white/40 text-sm">Total</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 text-center"
        >
          <Check size={32} className="text-green-400 mx-auto mb-2" />
          <p className="text-3xl font-bold text-white">{completionPercent.toFixed(1)}%</p>
          <p className="text-white/40 text-sm">Completion</p>
        </motion.div>
      </div>

      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 mb-8"
      >
        <div className="flex justify-between mb-2">
          <span className="text-white/60 text-sm">Collection Progress</span>
          <span className="text-white font-bold">{ownedCount}/{totalSkins}</span>
        </div>
        <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-violet-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${completionPercent}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </motion.div>

      {/* Sort Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex gap-2 mb-6 justify-end"
      >
        <button
          onClick={() => setSortBy('default')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
            sortBy === 'default'
              ? 'bg-purple-500/20 border border-purple-500/50 text-white'
              : 'bg-white/5 border border-white/10 text-white/50 hover:text-white/80'
          }`}
        >
          <ArrowUpDown size={14} />
          По умолчанию
        </button>
        <button
          onClick={() => setSortBy('price-asc')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
            sortBy === 'price-asc'
              ? 'bg-purple-500/20 border border-purple-500/50 text-white'
              : 'bg-white/5 border border-white/10 text-white/50 hover:text-white/80'
          }`}
        >
          Цена ↑
        </button>
        <button
          onClick={() => setSortBy('price-desc')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
            sortBy === 'price-desc'
              ? 'bg-purple-500/20 border border-purple-500/50 text-white'
              : 'bg-white/5 border border-white/10 text-white/50 hover:text-white/80'
          }`}
        >
          Цена ↓
        </button>
      </motion.div>

      {/* Skins Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {sortedSkins.map((skin, i) => {
          const owned = ownedSkinIds.has(skin.id);
          return (
            <motion.div
              key={skin.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.02 }}
              className={`relative rounded-xl p-4 border-2 ${
                owned ? 'border-opacity-100' : 'border-opacity-30 opacity-40'
              }`}
              style={{ borderColor: rarityColors[skin.rarity] }}
            >
              {owned && (
                <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                  <Check size={14} className="text-white" />
                </div>
              )}
              <div className="text-center">
                <div className="mx-auto mb-2">
                  <SkinDisplay skin={skin} size="lg" />
                </div>
                <p className="text-white/40 text-[10px]">{rarityNames[skin.rarity]}</p>
                <p className="text-white text-xs font-medium truncate">{skin.weapon}</p>
                <p className="text-white/60 text-[10px] truncate">{skin.name}</p>
                <p className="text-green-400 font-bold text-sm mt-2">${skin.price.toFixed(2)}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
