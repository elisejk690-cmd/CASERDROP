import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cases, CaseData } from '../data/cases';
import { Skin, rarityColors, rarityNames, getRandomSkin, getRandomSkinFromList, allSkins } from '../data/skins';
import { useSound } from '../hooks/useSound';
import { useTranslation } from '../hooks/useTranslation';
import confetti from 'canvas-confetti';
import HeroBanner from './HeroBanner';
import SkinDisplay from './SkinDisplay';
import RareSpecialRoll from './RareSpecialRoll';

interface LiveDrop {
  id: string;
  skin: Skin;
  user: string;
  timestamp: number;
}

// Generate real-time live drops from real users
function useLiveDrops() {
  const [drops, setDrops] = useState<LiveDrop[]>([]);

  useEffect(() => {
    // Get real users from localStorage
    const getRealUsers = () => {
      try {
        const usersData = localStorage.getItem('caser_drop_users');
        if (usersData) {
          const users = JSON.parse(usersData);
          return users.filter((u: any) => u.inventory && u.inventory.length > 0);
        }
      } catch (e) {
        console.error('Error loading users:', e);
      }
      return [];
    };

    const realUsers = getRealUsers();
    
    // Initial drops from real users
    const initialDrops: LiveDrop[] = [];
    if (realUsers.length > 0) {
      for (let i = 0; i < Math.min(20, realUsers.length * 3); i++) {
        const user = realUsers[Math.floor(Math.random() * realUsers.length)];
        if (user.inventory && user.inventory.length > 0) {
          const item = user.inventory[Math.floor(Math.random() * user.inventory.length)];
          initialDrops.push({
            id: `drop_${Date.now()}_${i}`,
            skin: item.skin,
            user: user.username,
            timestamp: Date.now() - (20 - i) * 3000,
          });
        }
      }
    }
    
    // If no real users, show empty
    if (initialDrops.length === 0) {
      setDrops([]);
    } else {
      setDrops(initialDrops);
    }

    // Add new drop every 3-6 seconds from real users
    const interval = setInterval(() => {
      const currentUsers = getRealUsers();
      if (currentUsers.length > 0) {
        const user = currentUsers[Math.floor(Math.random() * currentUsers.length)];
        if (user.inventory && user.inventory.length > 0) {
          const item = user.inventory[Math.floor(Math.random() * user.inventory.length)];
          const newDrop: LiveDrop = {
            id: `drop_${Date.now()}_${Math.random()}`,
            skin: item.skin,
            user: user.username,
            timestamp: Date.now(),
          };
          setDrops(prev => [newDrop, ...prev].slice(0, 30));
        }
      }
    }, 3000 + Math.random() * 3000);

    return () => clearInterval(interval);
  }, []);

  return drops;
}

interface CasesPageProps {
  gameState: any;
  onNavigate?: (page: string) => void;
  currentUser?: any;
}

export default function CasesPage({ gameState, onNavigate, currentUser }: CasesPageProps) {
  const [selectedCase, setSelectedCase] = useState<CaseData | null>(null);
  const [isOpening, setIsOpening] = useState(false);
  const [wonSkin, setWonSkin] = useState<Skin | null>(null);
  const [reelItems, setReelItems] = useState<Skin[]>([]);
  const [reelPosition, setReelPosition] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'usd' | 'btc'>('usd');
  const [showRareSpecialRoll, setShowRareSpecialRoll] = useState(false);
  const reelRef = useRef<HTMLDivElement>(null);
  const { playTick, playWin, playClick, playSpin } = useSound();
  const { t } = useTranslation();
  const { state, spendBalance, spendBitcoin, addToInventory } = gameState;
  const liveDrops = useLiveDrops();

  // Convert case price to BTC (1 BTC = $50,000)
  const getBtcPrice = (usdPrice: number) => usdPrice / 50000;

  const openCase = () => {
    if (!selectedCase || isOpening) return;
    
    // Try to spend based on payment method
    if (paymentMethod === 'usd') {
      if (!spendBalance(selectedCase.price)) return;
    } else {
      const btcPrice = getBtcPrice(selectedCase.price);
      if (!spendBitcoin(btcPrice)) return;
    }

    playClick();
    setIsOpening(true);
    setShowResult(false);
    setWonSkin(null);

    // Check if user has personal rare item chance
    const userRareChance = currentUser?.rareItemChance || 0;
    const shouldForceRare = Math.random() * 100 < userRareChance;

    // Generate reel items
    const items: Skin[] = [];
    for (let i = 0; i < 60; i++) {
      items.push(getRandomSkinFromList(selectedCase.skins, selectedCase.weights, selectedCase.id));
    }
    
    // Place winning item at position 50
    let winSkin: Skin;
    if (shouldForceRare) {
      // Force rare special item
      winSkin = allSkins.find(s => s.type === 'rare_special') || getRandomSkinFromList(selectedCase.skins, selectedCase.weights, selectedCase.id);
    } else {
      winSkin = getRandomSkinFromList(selectedCase.skins, selectedCase.weights, selectedCase.id);
    }
    items[50] = winSkin;
    setReelItems(items);
    setWonSkin(winSkin);
    setReelPosition(0);

    // Wait for items to render, then start animation
    setTimeout(() => {
      playSpin();
      
      // Target position: item 50 centered under the marker
      // Item 50 starts at 50*120 = 6000px from reel's left edge
      // Item 50's center is at 6060px
      // Center marker is at 50% of container width
      // We need translateX so that item 50's center aligns with marker
      // translateX = -(item50Center - containerCenter) = -(6060 - containerWidth/2)
      const containerWidth = reelRef.current?.parentElement?.offsetWidth || 600;
      // Точная позиция без случайного смещения
      const targetPosition = 50 * 140 + 70 - containerWidth / 2;
      let currentPos = 0;
      let tickCounter = 0;
      const duration = 5000; // 5 seconds
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function: ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        currentPos = eased * targetPosition;
        
        // Tick sound on each item pass
        const currentItem = Math.floor(currentPos / 140);
        if (currentItem > tickCounter) {
          tickCounter = currentItem;
          playTick();
        }

        setReelPosition(currentPos);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
        // Done
        setTimeout(() => {
          setIsOpening(false);
          setShowResult(true);
          
          // Update autumn event task progress
          if ((window as any).updateAutumnTask) {
            (window as any).updateAutumnTask('task3', 1); // Cases opened
          }
          
          // Check if won rare special item
          if (winSkin.type === 'rare_special') {
            // Open second roll for knives/gloves
            setTimeout(() => {
              setShowRareSpecialRoll(true);
            }, 1000);
          } else {
            addToInventory(winSkin);
            playWin(winSkin.rarity);
            
            if (['classified', 'covert', 'knife'].includes(winSkin.rarity)) {
              confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: [rarityColors[winSkin.rarity], '#ffffff'],
              });
            }
          }
        }, 300);        }
      };
      
      requestAnimationFrame(animate);
    }, 100);
  };

  // Populate reel with preview items when a case is selected
  useEffect(() => {
    if (selectedCase && reelItems.length === 0) {
      const previewItems: Skin[] = [];
      for (let i = 0; i < 30; i++) {
        previewItems.push(getRandomSkinFromList(selectedCase.skins, selectedCase.weights, selectedCase.id));
      }
      setReelItems(previewItems);
    }
  }, [selectedCase]);

  return (
    <div className="pt-20 pb-8 px-4 max-w-7xl mx-auto">
      <HeroBanner />

      {/* Autumn Event Banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        onClick={() => onNavigate && onNavigate('autumn')}
        className="mb-6 cursor-pointer group"
      >
        <div className="relative h-32 rounded-2xl overflow-hidden bg-gradient-to-r from-orange-500/20 via-red-500/20 to-purple-500/20 border border-orange-500/30 group-hover:border-orange-500/50 transition-all">
          <div className="absolute inset-0 flex items-center justify-between px-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">Autumn Event</h3>
              <p className="text-white/60 text-sm">Выполняй задания и получай ключи!</p>
            </div>
            <div className="w-20 h-20 opacity-50 group-hover:opacity-80 transition-opacity">
              <img 
                src="https://image.qwenlm.ai/generated-images/3c8c5fcc-79a0-4aba-b127-b2b8fb5af89f/_result.png" 
                alt="Autumn Event" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      </motion.div>

      {/* Live Drops Ticker */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8 overflow-hidden rounded-2xl bg-zinc-900/50 border border-white/10 p-3"
      >
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-full">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-red-400 text-xs font-medium">{t('cases.live')}</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <motion.div 
              className="flex gap-4 whitespace-nowrap"
              animate={{ x: [0, -2000] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              {[...liveDrops, ...liveDrops].map((drop) => (
                <div key={drop.id} className="flex items-center gap-2 flex-shrink-0">
                  <div className="w-6 h-6">
                    <SkinDisplay skin={drop.skin} size="sm" />
                  </div>
                  <span className="text-white/40 text-xs">{drop.user}</span>
                  <span className="text-xs font-medium" style={{ color: rarityColors[drop.skin.rarity as keyof typeof rarityColors] }}>
                    {drop.skin.weapon} | {drop.skin.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Cases Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6 mb-10">
        {cases.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.03, y: -5 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => { setSelectedCase(c); playClick(); }}
            className={`relative cursor-pointer rounded-2xl border ${c.borderColor} bg-gradient-to-b ${c.gradient} p-4 sm:p-6 backdrop-blur-sm overflow-hidden group`}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="relative z-10 text-center">
              <motion.div 
                className="mb-4 relative"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <img 
                  src={c.imageUrl} 
                  alt={c.name}
                  className="w-24 h-24 sm:w-32 sm:h-32 mx-auto object-contain drop-shadow-2xl"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-xl" />
              </motion.div>
              <h3 className="text-white font-semibold text-sm sm:text-lg mb-1">{c.name}</h3>
              <p className="text-white/40 text-xs mb-3 hidden sm:block">{c.description}</p>
              <div className="inline-flex items-center gap-1 bg-white/10 rounded-full px-3 py-1">
                <span className="text-green-400 font-bold text-sm">${c.price.toFixed(2)}</span>
              </div>
            </div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-white/5" />
          </motion.div>
        ))}
      </div>

      {/* Case Opening Modal */}
      <AnimatePresence>
        {selectedCase && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
            onClick={() => {
              if (!isOpening) {
                setSelectedCase(null);
                setReelItems([]);
                setReelPosition(0);
                setShowResult(false);
                setWonSkin(null);
              }
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-4xl bg-zinc-900/90 border border-white/10 rounded-3xl overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img 
                    src={selectedCase.imageUrl} 
                    alt={selectedCase.name}
                    className="w-12 h-12 object-contain"
                  />
                  <div>
                    <h2 className="text-white font-bold text-xl">{selectedCase.name}</h2>
                    <p className="text-white/40 text-sm">{selectedCase.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (!isOpening) {
                      setSelectedCase(null);
                      setReelItems([]);
                      setReelPosition(0);
                      setShowResult(false);
                      setWonSkin(null);
                    }
                  }}
                  className="text-white/40 hover:text-white transition-colors text-2xl"
                >
                  ✕
                </button>
              </div>

              {/* Reel */}
              <div className="relative h-40 overflow-hidden bg-black/50">
                {/* Center marker */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-full bg-yellow-400 z-20" />
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
                {showResult && wonSkin && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="p-8 text-center"
                  >
                    <motion.div
                      initial={{ rotateY: 180, opacity: 0 }}
                      animate={{ rotateY: 0, opacity: 1 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="inline-block"
                    >
                      <div 
                        className="w-32 h-32 rounded-2xl flex items-center justify-center mx-auto mb-4 border-2 overflow-hidden"
                        style={{ borderColor: rarityColors[wonSkin.rarity], background: `linear-gradient(135deg, ${rarityColors[wonSkin.rarity]}20, ${rarityColors[wonSkin.rarity]}05)` }}
                      >
                        <SkinDisplay skin={wonSkin} size="lg" />
                      </div>
                    </motion.div>
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-white/50 text-sm mb-1"
                    >
                      {rarityNames[wonSkin.rarity]}
                    </motion.p>
                    <motion.h3 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-white font-bold text-xl mb-1"
                    >
                      {wonSkin.weapon} | {wonSkin.name}
                    </motion.h3>
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="text-green-400 font-bold text-lg"
                    >
                      ${wonSkin.price.toFixed(2)}
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Payment Method & Open Button */}
              <div className="p-6 border-t border-white/10">
                <div className="flex justify-center gap-2 mb-4">
                  <button
                    onClick={() => setPaymentMethod('usd')}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      paymentMethod === 'usd'
                        ? 'bg-green-500/20 border border-green-500/50 text-green-400'
                        : 'bg-white/5 border border-white/10 text-white/50 hover:text-white/80'
                    }`}
                  >
                    💵 USD (${selectedCase.price.toFixed(2)})
                  </button>
                  <button
                    onClick={() => setPaymentMethod('btc')}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      paymentMethod === 'btc'
                        ? 'bg-yellow-500/20 border border-yellow-500/50 text-yellow-400'
                        : 'bg-white/5 border border-white/10 text-white/50 hover:text-white/80'
                    }`}
                  >
                    ₿ BTC ({getBtcPrice(selectedCase.price).toFixed(6)})
                  </button>
                </div>
                <div className="flex justify-center">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={openCase}
                    disabled={isOpening || (paymentMethod === 'usd' ? state.balance < selectedCase.price : state.bitcoin < getBtcPrice(selectedCase.price))}
                    className={`px-8 py-3 rounded-xl font-semibold text-white transition-all ${
                      isOpening || (paymentMethod === 'usd' ? state.balance < selectedCase.price : state.bitcoin < getBtcPrice(selectedCase.price))
                        ? 'bg-white/10 cursor-not-allowed opacity-50'
                        : 'bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-400 hover:to-violet-500 shadow-lg shadow-purple-500/20'
                    }`}
                  >
                    {isOpening ? 'Opening...' : `Open Case`}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rare Special Item Roll */}
      <RareSpecialRoll
        isOpen={showRareSpecialRoll}
        onClose={(wonItem) => {
          addToInventory(wonItem);
          setShowRareSpecialRoll(false);
          confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#e4ae39', '#ffffff', '#ffd700'],
          });
        }}
      />
    </div>
  );
}
