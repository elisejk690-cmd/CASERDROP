import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Crown, Shield } from 'lucide-react';
import { getLeaderboard, User, UserRole } from '../hooks/useAuth';
import PublicProfile from './PublicProfile';

const roleLabels: Record<UserRole, string> = {
  user: 'Player',
  admin: 'Admin',
  head_admin: 'Head Admin',
  curator: 'Curator',
  founder: 'Founder',
};

export default function LeaderboardPage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const leaderboard = getLeaderboard();

  if (selectedUser) {
    return <PublicProfile user={selectedUser} onBack={() => setSelectedUser(null)} />;
  }

  return (
    <div className="pt-20 pb-8 px-4 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl sm:text-5xl caser-drop-title text-white mb-3">Leaderboard</h1>
        <p className="text-white/50 text-lg">Top players by total wealth</p>
      </motion.div>

      {/* Top 3 */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {leaderboard.slice(0, 3).map((user, i) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.03, y: -3 }}
            onClick={() => setSelectedUser(user)}
            className={`relative rounded-2xl p-6 text-center cursor-pointer transition-all ${
              i === 0 ? 'bg-gradient-to-b from-purple-400/20 to-purple-500/5 border-2 border-purple-400/30' :
              i === 1 ? 'bg-gradient-to-b from-violet-400/20 to-violet-500/5 border-2 border-violet-400/30' :
              'bg-gradient-to-b from-fuchsia-500/20 to-fuchsia-600/5 border-2 border-fuchsia-500/30'
            }`}
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              {i === 0 ? <Crown size={24} className="text-purple-300" /> :
               i === 1 ? <Medal size={24} className="text-violet-300" /> :
               <Medal size={24} className="text-fuchsia-400" />}
            </div>
            <div className="w-16 h-16 mx-auto mb-2 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-3xl overflow-hidden">
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt="" className="w-full h-full object-cover" />
              ) : (
                user.avatar
              )}
            </div>
            <div className="flex items-center gap-1 justify-center">
              <p className="text-white font-bold text-sm mb-1 truncate">{user.username}</p>
              {['admin', 'head_admin', 'curator', 'founder'].includes(user.role) && (
                <Shield size={14} className="text-blue-400 flex-shrink-0" />
              )}
            </div>
            <p className="text-green-400 font-bold">${(user.balance + user.bitcoin * 100).toFixed(2)}</p>
            <p className="text-white/40 text-xs mt-1">Level {user.stats.level}</p>
          </motion.div>
        ))}
      </div>

      {/* Rest of leaderboard */}
      <div className="bg-zinc-900/50 border border-white/10 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-white/10 flex items-center gap-2">
          <Trophy size={20} className="text-purple-400" />
          <h2 className="text-white font-bold">Rankings</h2>
        </div>
        <div className="divide-y divide-white/5">
          {leaderboard.map((user, i) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelectedUser(user)}
              className="p-4 flex items-center gap-4 hover:bg-white/5 transition-colors cursor-pointer"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                i < 3 ? 'bg-purple-500/20 text-purple-400' : 'bg-white/5 text-white/40'
              }`}>
                {i + 1}
              </div>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center overflow-hidden">
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt="" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-lg">{user.avatar}</span>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1">
                  <p className="text-white font-medium">{user.username}</p>
                  {['admin', 'head_admin', 'curator', 'founder'].includes(user.role) && (
                    <Shield size={14} className="text-blue-400" />
                  )}
                </div>
                <p className="text-white/40 text-xs">Level {user.stats.level}</p>
              </div>
              <div className="text-right">
                <p className="text-green-400 font-bold">${(user.balance + user.bitcoin * 100).toFixed(2)}</p>
                <p className="text-white/40 text-xs">{user.bitcoin.toFixed(4)} BTC</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
