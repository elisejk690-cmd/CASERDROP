import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { allSkins, Skin, rarityColors } from '../data/skins';
import { useSound } from '../hooks/useSound';
import SkinDisplay from './SkinDisplay';

interface RareSpecialRollProps {
  isOpen: boolean;
  onClose: (wonItem: Skin) => void;
}

export default function RareSpecialRoll({ isOpen, onClose }: RareSpecialRollProps) {
  const [reelItems, setReelItems] = useState<Skin[]>([]);
  const [reelPosition, setReelPosition] = useState(0);
  const [wonItem, setWonItem] = useState<Skin | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const reelRef = useRef<HTMLDivElement>(null);
  const { playTick, playWin } = useSound();

  // Get all knives and gloves
  const rareItems = allSkins.filter(s => s.rarity === 'knife' || s.type === 'glove');

  useEffect(() => {
    if (isOpen && !isRolling) {
      startRoll();
    }
  }, [isOpen]);

  const startRoll = () => {
    setIsRolling(true);
    setWonItem(null);

    // Generate reel items (only knives and gloves)
    const items: Skin[] = [];
    for (let i = 0; i < 60; i++) {
      items.push(rareItems[Math.floor(Math.random() * rareItems.length)]);
    }

    // Place winning item at position 50
    const winItem = rareItems[Math.floor(Math.random() * rareItems.length)];
    items[50] = winItem;
    setReelItems(items);
    setWonItem(winItem);
    setReelPosition(0);

    // Animate reel
    setTimeout(() => {
      const containerWidth = reelRef.current?.parentElement?.offsetWidth || 600;
      const targetPosition = 50 * 140 + 70 - containerWidth / 2;
      let currentPos = 0;
      let tickCounter = 0;
      const duration = 5000;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        currentPos = eased * targetPosition;

        const currentItem = Math.floor(currentPos / 140);
        if (currentItem > tickCounter) {
          tickCounter = currentItem;
          playTick();
        }

        setReelPosition(currentPos);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setTimeout(() => {
            setIsRolling(false);
            playWin('knife');
          }, 300);
        }
      };

      requestAnimationFrame(animate);
    }, 100);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-5xl bg-zinc-900/90 border-2 border-yellow-500/50 rounded-3xl overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-yellow-500/30 bg-gradient-to-r from-yellow-500/10 to-amber-500/10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                <span className="text-4xl">⭐</span>
                Rare Special Item!
              </h2>
              <p className="text-yellow-400 mt-1">You won a rare special item! Roll for knives or gloves!</p>
            </div>
          </div>
        </div>

        {/* Reel */}
        <div className="relative h-40 overflow-hidden bg-black/50 my-6">
          {/* Center marker */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-yellow-400 z-20" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
            <div className="w-4 h-4 bg-yellow-400 rotate-45 -mt-2" />
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20">
            <div className="w-4 h-4 bg-yellow-400 rotate-45 translate-y-2" />
          </div>

          {/* Gradient overlays */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-zinc-900 to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-zinc-900 to-transparent z-10" />

          {/* Items */}
          <div
            ref={reelRef}
            className="flex items-center h-full transition-none"
            style={{ transform: `translateX(${-reelPosition}px)` }}
          >
            {reelItems.map((skin, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[140px] h-32 mx-0 rounded-lg flex flex-col items-center justify-center border-2"
                style={{ borderColor: rarityColors[skin.rarity] + '60', background: rarityColors[skin.rarity] + '10' }}
              >
                <div className="mb-2">
                  <SkinDisplay skin={skin} size="lg" />
                </div>
                <span className="text-white/70 text-xs text-center px-1 truncate w-full font-medium">{skin.weapon}</span>
                <span className="text-white/50 text-[10px]">{skin.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Result */}
        <AnimatePresence>
          {!isRolling && wonItem && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 text-center"
            >
              <motion.div
                initial={{ rotateY: 180, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="inline-block"
              >
                <div className="w-40 h-40 mx-auto mb-4">
                  <SkinDisplay skin={wonItem} size="lg" />
                </div>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-yellow-400 text-sm mb-1"
              >
                {wonItem.rarity === 'knife' ? '★ Knife' : '★ Gloves'}
              </motion.p>
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-white font-bold text-2xl mb-1"
              >
                {wonItem.weapon} | {wonItem.name}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-green-400 font-bold text-xl"
              >
                ${wonItem.price.toFixed(2)}
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onClose(wonItem)}
                className="mt-6 px-8 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 shadow-lg shadow-yellow-500/20"
              >
                Collect Item
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
