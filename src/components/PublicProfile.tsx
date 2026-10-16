import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Star, Package } from 'lucide-react';
import { User, UserRole } from '../hooks/useAuth';
import { rarityColors, rarityNames } from '../data/skins';

interface PublicProfileProps {
  user: User;
  onBack: () => void;
}

const roleLabels: Record<UserRole, string> = {
  user: 'Player',
  admin: 'Admin',
  head_admin: 'Head Admin',
  curator: 'Curator',
  founder: 'Founder',
};

const roleColors: Record<UserRole, string> = {
  user: 'text-white/60',
  admin: 'text-blue-400',
  head_admin: 'text-purple-400',
  curator: 'text-orange-400',
  founder: 'text-red-400',
};

export default function PublicProfile({ user, onBack }: PublicProfileProps) {
  const isStaff = ['admin', 'head_admin', 'curator', 'founder'].includes(user.role);
  const inventoryValue = user.inventory.reduce((sum, i) => sum + (i.skin?.price || 0), 0);

  return (
    <div className="pt-20 pb-8 px-4 max-w-4xl mx-auto">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.05 }}
        onClick={onBack}
        className="flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Back to Leaderboard</span>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
          <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-lg shadow-purple-500/20 text-6xl overflow-hidden">
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt="" className="w-full h-full object-cover" />
            ) : (
              user.avatar
            )}
          </div>
          <div className="text-center sm:text-left flex-1">
            <div className="flex items-center gap-2 justify-center sm:justify-start mb-2">
              <h1 className="text-3xl font-bold text-white">{user.username}</h1>
              {isStaff && (
                <div className="group relative">
                  <Shield size={20} className="text-blue-400" />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-zinc-800 border border-white/10 rounded-xl p-3 w-64 text-left shadow-xl">
                    <p className="text-white text-sm font-medium">✓ Account Verified</p>
                    <p className="text-white/60 text-xs mt-1">This account is verified by <span className="text-purple-400">"CaserDrop"</span></p>
                  </div>
                </div>
              )}
            </div>
            <p className={`font-medium ${roleColors[user.role]}`}>{roleLabels[user.role]}</p>
            {user.bio && <p className="text-white/50 mt-2">{user.bio}</p>}
            <div className="flex items-center gap-2 mt-3 justify-center sm:justify-start">
              <Star size={16} className="text-yellow-400" />
              <span className="text-white/60">Level {user.stats.level}</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-black/30 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-green-400">${user.balance.toFixed(2)}</p>
            <p className="text-white/40 text-xs">Balance</p>
          </div>
          <div className="bg-black/30 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-yellow-400">{user.bitcoin.toFixed(4)}</p>
            <p className="text-white/40 text-xs">Bitcoin</p>
          </div>
          <div className="bg-black/30 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-white">{user.stats.casesOpened}</p>
            <p className="text-white/40 text-xs">Cases Opened</p>
          </div>
          <div className="bg-black/30 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-purple-400">${inventoryValue.toFixed(2)}</p>
            <p className="text-white/40 text-xs">Inventory Value</p>
          </div>
        </div>

        {/* Inventory Preview */}
        {user.inventory.length > 0 && (
          <div>
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <Package size={20} className="text-purple-400" />
              Inventory ({user.inventory.length} items)
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
              {user.inventory.slice(0, 12).map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-black/30 border rounded-xl p-3 text-center"
                  style={{ borderColor: (rarityColors[item.skin?.rarity as keyof typeof rarityColors] || '#fff') + '40' }}
                >
                  <div className="w-12 h-12 mx-auto mb-1 overflow-hidden rounded">
                    {item.skin?.image?.startsWith('http') || item.skin?.image?.startsWith('') ? (
                      <img src={item.skin.image} alt={item.skin.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-2xl flex items-center justify-center h-full">{item.skin?.image}</span>
                    )}
                  </div>
                  <p className="text-white/60 text-[10px] truncate">{item.skin?.weapon}</p>
                  <p className="text-green-400 text-[10px]">${item.skin?.price.toFixed(2)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
