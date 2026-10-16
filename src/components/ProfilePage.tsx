import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Package, DollarSign, TrendingUp, Star, Bitcoin, Settings, MessageSquare, Save, Upload, Globe, User as UserIcon, Tag, Repeat } from 'lucide-react';
import { rarityColors, rarityNames, Rarity } from '../data/skins';
import { useSound } from '../hooks/useSound';
import { useTranslation } from '../hooks/useTranslation';
import { InventoryItem } from '../hooks/useGameState';
import { User } from '../hooks/useAuth';
import SupportPage from './SupportPage';
import UserTradesPage from './UserTradesPage';
import SkinDisplay from './SkinDisplay';
import ProfileCustomization from './ProfileCustomization';

interface ProfilePageProps {
  gameState: any;
  currentUser: User;
  updateUser: (updates: Partial<User>) => void;
}

const avatars = ['🎮', '🎯', '🔥', '💎', '👑', '⚡', '🌟', '🎪', '🦊', '🐺', '🦅', '🐉'];
const languages = [
  { code: 'en', name: 'English' },
  { code: 'ru', name: 'Русский' },
  { code: 'es', name: 'Español' },
  { code: 'de', name: 'Deutsch' },
  { code: 'fr', name: 'Français' },
];

export default function ProfilePage({ gameState, currentUser, updateUser }: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState<'inventory' | 'settings' | 'support'>('inventory');
  const [sortBy, setSortBy] = useState<'date' | 'price' | 'rarity'>('date');
  const [filterRarity, setFilterRarity] = useState<string>('all');
  const [showSellConfirm, setShowSellConfirm] = useState<string | null>(null);
  const [username, setUsername] = useState(currentUser.username);
  const [avatar, setAvatar] = useState(currentUser.avatar);
  const [language, setLanguage] = useState(currentUser.language);
  const [saved, setSaved] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoMessage, setPromoMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { playClick } = useSound();
  const { t } = useTranslation();
  const { state, sellItem, sellAll, addBalance } = gameState;

  const applyPromoCode = () => {
    if (promoCode === 'j6uoz21') {
      addBalance(450);
      setPromoMessage('✅ Промокод активирован! +$450');
      setPromoCode('');
      playClick();
      setTimeout(() => setPromoMessage(''), 3000);
    } else {
      setPromoMessage('❌ Неверный промокод');
      setTimeout(() => setPromoMessage(''), 3000);
    }
  };

  const rarityOrder: Record<Rarity, number> = {
    knife: 9, rare_special: 8, contraband: 7, covert: 6, classified: 5, restricted: 4, milspec: 3, industrial: 2, consumer: 1,
  };

  const filteredInventory = (state.inventory as InventoryItem[])
    .filter(item => filterRarity === 'all' || item.skin.rarity === filterRarity)
    .sort((a, b) => {
      if (sortBy === 'price') return b.skin.price - a.skin.price;
      if (sortBy === 'rarity') return rarityOrder[b.skin.rarity] - rarityOrder[a.skin.rarity];
      return b.obtainedAt - a.obtainedAt;
    });

  const inventoryValue = (state.inventory as InventoryItem[]).reduce((sum, i) => sum + i.skin.price, 0);
  const xpForNextLevel = (state.level) * 100;
  const currentLevelXp = state.xp % 100;

  return (
    <div className="pt-20 pb-8 px-4 max-w-6xl mx-auto">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 sm:p-8 mb-8"
      >
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Avatar */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-lg shadow-purple-500/20 text-5xl overflow-hidden"
          >
            {currentUser.avatarUrl && (currentUser.avatarUrl.startsWith('http') || currentUser.avatarUrl.startsWith('data:')) ? (
              <img src={currentUser.avatarUrl} alt="Avatar" className="w-full h-full object-cover rounded-2xl" />
            ) : (
              <span className="text-5xl">{currentUser.avatar || '🎮'}</span>
            )}
          </motion.div>

          {/* Info */}
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">{currentUser.username}</h1>
            <p className="text-white/40 text-sm mb-2">{currentUser.email}</p>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <Star size={16} className="text-yellow-400" />
              <span className="text-white/60">Level {state.level}</span>
              <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentLevelXp / 100) * 100}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              <span className="text-white/40 text-xs">{currentLevelXp}/100 XP</span>
            </div>
          </div>

          {/* Quick Actions - removed */}
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => { setActiveTab('inventory'); playClick(); }}
          className={`px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2 ${
            activeTab === 'inventory'
              ? 'bg-purple-500/20 border border-purple-500/50 text-white'
              : 'bg-white/5 border border-white/10 text-white/50 hover:text-white/80'
          }`}
        >
          <Package size={16} />
          Инвентарь
        </button>
        <button
          onClick={() => { setActiveTab('settings'); playClick(); }}
          className={`px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2 ${
            activeTab === 'settings'
              ? 'bg-purple-500/20 border border-purple-500/50 text-white'
              : 'bg-white/5 border border-white/10 text-white/50 hover:text-white/80'
          }`}
        >
          <Settings size={16} />
          Настройки
        </button>
        <button
          onClick={() => { setActiveTab('support'); playClick(); }}
          className={`px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2 ${
            activeTab === 'support'
              ? 'bg-purple-500/20 border border-purple-500/50 text-white'
              : 'bg-white/5 border border-white/10 text-white/50 hover:text-white/80'
          }`}
        >
          <MessageSquare size={16} />
          Техподдержка
        </button>
      </div>

      {activeTab === 'support' && <SupportPage />}

      {activeTab === 'settings' && (
        <div className="space-y-6">
          {/* Avatar Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <UserIcon size={20} className="text-purple-400" />
              <h2 className="text-white font-bold text-lg">{t('settings.avatar')}</h2>
            </div>

            {/* Upload Photo */}
            <div className="mb-4">
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    const base64 = reader.result as string;
                    updateUser({ avatarUrl: base64 });
                    playClick();
                  };
                  reader.readAsDataURL(file);
                }}
                accept="image/*"
                className="hidden"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-3 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 font-medium hover:bg-purple-500/20 transition-colors flex items-center justify-center gap-2"
              >
                <Upload size={18} />
                {t('settings.uploadAvatar')}
              </motion.button>
              {currentUser.avatarUrl && (
                <div className="mt-3 flex justify-center">
                  <img 
                    src={currentUser.avatarUrl} 
                    alt="Avatar" 
                    className="w-20 h-20 rounded-xl object-cover border-2 border-purple-500"
                  />
                </div>
              )}
            </div>

            {/* Emoji Avatars */}
            <p className="text-white/40 text-sm mb-3">Or choose an emoji:</p>
            <div className="grid grid-cols-6 gap-3">
              {avatars.map((av) => (
                <motion.button
                  key={av}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => { 
                    setAvatar(av); 
                    updateUser({ avatar: av, avatarUrl: undefined });
                    playClick(); 
                  }}
                  className={`aspect-square rounded-xl flex items-center justify-center text-3xl transition-all ${
                    avatar === av && !currentUser.avatarUrl
                      ? 'bg-purple-500/20 border-2 border-purple-500'
                      : 'bg-white/5 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  {av}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Username */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <UserIcon size={20} className="text-purple-400" />
              <h2 className="text-white font-bold text-lg">{t('settings.username')}</h2>
            </div>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500/50 focus:outline-none transition-colors"
              placeholder={t('auth.enterUsername')}
            />
          </motion.div>

          {/* Language */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Globe size={20} className="text-purple-400" />
              <h2 className="text-white font-bold text-lg">{t('settings.language')}</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {languages.map((lang) => (
                <motion.button
                  key={lang.code}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { 
                    setLanguage(lang.code); 
                    updateUser({ language: lang.code });
                    playClick(); 
                  }}
                  className={`py-3 rounded-xl font-medium transition-all ${
                    language === lang.code
                      ? 'bg-purple-500/20 border-2 border-purple-500 text-white'
                      : 'bg-white/5 border border-white/10 text-white/60 hover:bg-white/10'
                  }`}
                >
                  {lang.name}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Theme Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Settings size={20} className="text-purple-400" />
              <h2 className="text-white font-bold text-lg">Theme</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="py-3 rounded-xl bg-black border-2 border-purple-500 text-white font-medium"
              >
                🌙 Dark
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="py-3 rounded-xl bg-white/5 border border-white/10 text-white/60 font-medium"
              >
                ☀️ Light (Coming Soon)
              </motion.button>
            </div>
          </motion.div>

          {/* Profile Customization */}
          <ProfileCustomization currentUser={currentUser} updateUser={updateUser} />

          {/* Save Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              updateUser({ username, avatar, language });
              setSaved(true);
              playClick();
              setTimeout(() => setSaved(false), 2000);
            }}
            className="w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-400 hover:to-violet-500 shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2"
          >
            <Save size={20} />
            {saved ? t('settings.saved') : t('settings.save')}
          </motion.button>

          {/* Promo Code */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Tag size={20} className="text-purple-400" />
              <h2 className="text-white font-bold text-lg">Промокод</h2>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={e => setPromoCode(e.target.value)}
                placeholder="Введите промокод"
                className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500/50 focus:outline-none transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={applyPromoCode}
                className="px-6 py-3 rounded-xl bg-purple-500 text-white font-medium"
              >
                Активировать
              </motion.button>
            </div>
            {promoMessage && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`mt-3 text-sm ${promoMessage.includes('✅') ? 'text-green-400' : 'text-red-400'}`}
              >
                {promoMessage}
              </motion.p>
            )}
          </motion.div>

          {/* User Trades Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Repeat size={20} className="text-purple-400" />
              <h2 className="text-white font-bold text-lg">Трейды между пользователями</h2>
            </div>
            <UserTradesPage gameState={gameState} currentUser={currentUser} />
          </motion.div>
        </div>
      )}

      {activeTab === 'inventory' && (
        <>
      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
        {[
          { icon: Package, label: 'Items', value: state.inventory.length.toString(), color: 'from-blue-500 to-cyan-500' },
          { icon: DollarSign, label: 'Balance', value: `$${state.balance.toFixed(2)}`, color: 'from-green-500 to-emerald-500' },
          { icon: Bitcoin, label: 'Bitcoin', value: `${state.bitcoin.toFixed(4)}`, color: 'from-yellow-500 to-orange-500' },
          { icon: Trophy, label: 'Cases Opened', value: state.totalOpened.toString(), color: 'from-orange-500 to-red-500' },
          { icon: TrendingUp, label: 'Inventory Value', value: `$${inventoryValue.toFixed(2)}`, color: 'from-purple-500 to-pink-500' },
          { icon: Star, label: 'Level', value: state.level.toString(), color: 'from-indigo-500 to-purple-500' },
          { icon: Trophy, label: 'Upgrades Won', value: currentUser.stats.upgradesWon.toString(), color: 'from-pink-500 to-rose-500' },
          { icon: Package, label: 'Collection', value: `${(currentUser.ownedSkinIds?.length || 0)}/160`, color: 'from-teal-500 to-cyan-500' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-zinc-900/50 border border-white/10 rounded-2xl p-4"
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
              <stat.icon size={18} className="text-white" />
            </div>
            <p className="text-white/40 text-xs mb-1">{stat.label}</p>
            <p className="text-white font-bold text-lg truncate">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Best Drop */}
      {state.bestDrop && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900/50 border border-white/10 rounded-2xl p-4 mb-8 flex items-center gap-4"
        >
          <div 
            className="w-14 h-14 rounded-xl flex items-center justify-center border-2 overflow-hidden"
            style={{ borderColor: rarityColors[state.bestDrop.rarity as Rarity], background: rarityColors[state.bestDrop.rarity as Rarity] + '15' }}
          >
            {state.bestDrop.image.startsWith('http') || state.bestDrop.image.startsWith('data:image') ? (
              <img src={state.bestDrop.image} alt={state.bestDrop.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-2xl">{state.bestDrop.image}</span>
            )}
          </div>
          <div>
            <p className="text-white/40 text-xs">Best Drop</p>
            <p className="text-white font-medium">{state.bestDrop.weapon} | {state.bestDrop.name}</p>
            <p className="text-green-400 font-bold">${state.bestDrop.price.toFixed(2)}</p>
          </div>
        </motion.div>
      )}

      {/* Inventory */}
      <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-white font-bold text-xl">Inventory ({state.inventory.length} items)</h2>
          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as 'date' | 'price' | 'rarity')}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white text-sm appearance-none cursor-pointer"
            >
              <option value="date">Newest</option>
              <option value="price">Price</option>
              <option value="rarity">Rarity</option>
            </select>
            
            <select
              value={filterRarity}
              onChange={e => setFilterRarity(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white text-sm appearance-none cursor-pointer"
            >
              <option value="all">All Rarities</option>
              {Object.entries(rarityNames).map(([key, name]) => (
                <option key={key} value={key}>{name}</option>
              ))}
            </select>

            {state.inventory.length > 0 && (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => { sellAll(); playClick(); }}
                className="px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-medium hover:bg-green-500/20 transition-colors"
              >
                Sell All (${inventoryValue.toFixed(2)})
              </motion.button>
            )}
          </div>
        </div>

        {filteredInventory.length === 0 ? (
          <div className="text-center py-12">
            <Package size={48} className="text-white/20 mx-auto mb-4" />
            <p className="text-white/50">
              {state.inventory.length === 0 ? 'Your inventory is empty. Open some cases!' : 'No items match your filter'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            <AnimatePresence>
              {filteredInventory.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: i * 0.02 }}
                  whileHover={{ scale: 1.03, y: -3 }}
                  className="relative bg-black/50 border rounded-xl p-4 group cursor-pointer"
                  style={{ borderColor: rarityColors[item.skin.rarity] + '40' }}
                >
                  <div 
                    className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl"
                    style={{ background: rarityColors[item.skin.rarity] }}
                  />
                  
                  <div className="text-center">
                    <div className="mx-auto mb-2">
                      <SkinDisplay skin={item.skin} size="lg" />
                    </div>
                    <p className="text-white/40 text-[10px]">{rarityNames[item.skin.rarity]}</p>
                    <p className="text-white text-xs font-medium truncate">{item.skin.weapon}</p>
                    <p className="text-white/60 text-[10px] truncate">{item.skin.name}</p>
                    <p className="text-green-400 font-bold text-sm mt-2">${item.skin.price.toFixed(2)}</p>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-black/70 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowSellConfirm(item.id);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-green-500 text-white text-xs font-medium"
                    >
                      Sell ${item.skin.price.toFixed(2)}
                    </motion.button>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Sell Confirmation Modal */}
      <AnimatePresence>
        {showSellConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setShowSellConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={e => e.stopPropagation()}
              className="bg-zinc-900 border border-white/10 rounded-2xl p-6 max-w-sm w-full text-center"
            >
              <p className="text-white font-medium mb-4">Sell this item?</p>
              <div className="flex gap-3 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { sellItem(showSellConfirm); setShowSellConfirm(null); playClick(); }}
                  className="px-6 py-2 rounded-xl bg-green-500 text-white font-medium"
                >
                  Sell
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowSellConfirm(null)}
                  className="px-6 py-2 rounded-xl bg-white/10 text-white font-medium"
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
        </>
      )}
    </div>
  );
}
