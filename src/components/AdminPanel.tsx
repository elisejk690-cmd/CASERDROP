import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Ban, DollarSign, UserX, UserCheck, Crown, Users, MessageSquare } from 'lucide-react';
import { useAuth, UserRole } from '../hooks/useAuth';
import { useSound } from '../hooks/useSound';

const roleLabels: Record<UserRole, string> = {
  user: 'User',
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

export default function AdminPanel() {
  const { currentUser, getAllUsers, banUser, unbanUser, setUserRole, giveBalance, takeBalance, setRareItemChance, canManageRole } = useAuth();
  const { playClick } = useSound();
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [amount, setAmount] = useState('');
  const [rareChance, setRareChance] = useState('');
  const [tab, setTab] = useState<'users' | 'support'>('users');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  // Check if user has admin role
  const hasAdminRole = currentUser && ['admin', 'head_admin', 'curator', 'founder'].includes(currentUser.role);

  // Password check
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '2209') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Неверный пароль');
    }
  };

  // Show password form if not authenticated
  if (!isAuthenticated && hasAdminRole) {
    return (
      <div className="pt-20 pb-8 px-4 max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900/50 border border-white/10 rounded-2xl p-8"
        >
          <Shield size={48} className="text-purple-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white text-center mb-6">Вход в админ-панель</h1>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500/50 focus:outline-none"
              autoFocus
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-400 hover:to-violet-500"
            >
              Войти
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  if (!hasAdminRole) {
    return (
      <div className="pt-20 pb-8 px-4 max-w-4xl mx-auto text-center">
        <Shield size={64} className="text-white/20 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-white mb-2">Access Denied</h1>
        <p className="text-white/50">You don't have permission to access this page.</p>
      </div>
    );
  }

  const users = getAllUsers();
  const canAssignRole = (targetRole: UserRole) => canManageRole(currentUser.role, targetRole);

  const handleBan = (userId: string) => {
    banUser(userId);
    playClick();
  };

  const handleUnban = (userId: string) => {
    unbanUser(userId);
    playClick();
  };

  const handleGiveBalance = (userId: string) => {
    const val = parseFloat(amount);
    if (val > 0) {
      giveBalance(userId, val);
      setAmount('');
      playClick();
    }
  };

  const handleTakeBalance = (userId: string) => {
    const val = parseFloat(amount);
    if (val > 0) {
      takeBalance(userId, val);
      setAmount('');
      playClick();
    }
  };

  const handleSetRareChance = (userId: string) => {
    const val = parseFloat(rareChance);
    if (!isNaN(val) && val >= 0 && val <= 100) {
      setRareItemChance(userId, val);
      setRareChance('');
      playClick();
    }
  };

  const handleSetRole = (userId: string, role: UserRole) => {
    setUserRole(userId, role);
    playClick();
  };

  return (
    <div className="pt-20 pb-8 px-4 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <div className="inline-flex items-center gap-2 mb-3">
          <Shield size={32} className="text-purple-400" />
          <h1 className="text-4xl sm:text-5xl caser-drop-title text-white">Admin Panel</h1>
        </div>
        <p className="text-white/50">Your role: <span className={`font-bold ${roleColors[currentUser.role]}`}>{roleLabels[currentUser.role]}</span></p>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button onClick={() => { setTab('users'); playClick(); }} className={`px-4 py-2 rounded-xl font-medium transition-all ${tab === 'users' ? 'bg-purple-500/20 border border-purple-500/50 text-white' : 'bg-white/5 border border-white/10 text-white/50'}`}>
          <Users size={16} className="inline mr-2" />Users ({users.length})
        </button>
        <button onClick={() => { setTab('support'); playClick(); }} className={`px-4 py-2 rounded-xl font-medium transition-all ${tab === 'support' ? 'bg-purple-500/20 border border-purple-500/50 text-white' : 'bg-white/5 border border-white/10 text-white/50'}`}>
          <MessageSquare size={16} className="inline mr-2" />Support
        </button>
      </div>

      {tab === 'users' && (
        <div className="bg-zinc-900/50 border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 text-white/60 text-sm font-medium">User</th>
                  <th className="text-left p-4 text-white/60 text-sm font-medium">Role</th>
                  <th className="text-left p-4 text-white/60 text-sm font-medium">Balance</th>
                  <th className="text-left p-4 text-white/60 text-sm font-medium">Rare %</th>
                  <th className="text-left p-4 text-white/60 text-sm font-medium">Status</th>
                  <th className="text-left p-4 text-white/60 text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center overflow-hidden">
                          {user.avatarUrl ? (
                            <img src={user.avatarUrl} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-lg">{user.avatar}</span>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-1">
                            <p className="text-white font-medium">{user.username}</p>
                            {['admin', 'head_admin', 'curator', 'founder'].includes(user.role) && (
                              <span className="text-blue-400" title="Verified Account">✓</span>
                            )}
                          </div>
                          <p className="text-white/40 text-xs">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      {selectedUser === user.id && canAssignRole(user.role) ? (
                        <select
                          value={user.role}
                          onChange={e => handleSetRole(user.id, e.target.value as UserRole)}
                          className="bg-black/50 border border-purple-500/50 rounded-lg px-2 py-1 text-white text-sm"
                        >
                          {(['user', 'admin', 'head_admin', 'curator', 'founder'] as UserRole[]).map(r => (
                            <option key={r} value={r}>{roleLabels[r]}</option>
                          ))}
                        </select>
                      ) : (
                        <span className={`font-medium ${roleColors[user.role]}`}>{roleLabels[user.role]}</span>
                      )}
                    </td>
                    <td className="p-4">
                      <span className="text-green-400 font-medium">${user.balance.toFixed(2)}</span>
                      <span className="text-yellow-400 text-xs ml-2">{user.bitcoin.toFixed(4)} BTC</span>
                    </td>
                    <td className="p-4">
                      <span className={`font-medium ${user.rareItemChance && user.rareItemChance > 0 ? 'text-yellow-400' : 'text-white/40'}`}>
                        {user.rareItemChance ? `${user.rareItemChance}%` : '0%'}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        {selectedUser === user.id ? (
                          <>
                            {['head_admin', 'curator', 'founder'].includes(currentUser.role) && (
                              <>
                                <input
                                  type="number"
                                  value={amount}
                                  onChange={e => setAmount(e.target.value)}
                                  placeholder="Amount"
                                  className="w-20 bg-black/50 border border-white/10 rounded-lg px-2 py-1 text-white text-xs"
                                />
                                <button onClick={() => handleGiveBalance(user.id)} className="px-2 py-1 rounded-lg bg-green-500/20 text-green-400 text-xs hover:bg-green-500/30">+</button>
                                <button onClick={() => handleTakeBalance(user.id)} className="px-2 py-1 rounded-lg bg-red-500/20 text-red-400 text-xs hover:bg-red-500/30">-</button>
                                <input
                                  type="number"
                                  value={rareChance}
                                  onChange={e => setRareChance(e.target.value)}
                                  placeholder="Rare %"
                                  min="0"
                                  max="100"
                                  className="w-20 bg-black/50 border border-yellow-500/30 rounded-lg px-2 py-1 text-white text-xs"
                                />
                                <button onClick={() => handleSetRareChance(user.id)} className="px-2 py-1 rounded-lg bg-yellow-500/20 text-yellow-400 text-xs hover:bg-yellow-500/30">⭐</button>
                              </>
                            )}
                            {user.status === 'active' ? (
                              <button onClick={() => handleBan(user.id)} className="px-2 py-1 rounded-lg bg-red-500/20 text-red-400 text-xs hover:bg-red-500/30 flex items-center gap-1">
                                <Ban size={12} /> Ban
                              </button>
                            ) : (
                              <button onClick={() => handleUnban(user.id)} className="px-2 py-1 rounded-lg bg-green-500/20 text-green-400 text-xs hover:bg-green-500/30 flex items-center gap-1">
                                <UserCheck size={12} /> Unban
                              </button>
                            )}
                            <button onClick={() => { setSelectedUser(null); setAmount(''); setRareChance(''); }} className="px-2 py-1 rounded-lg bg-white/10 text-white/60 text-xs hover:bg-white/20">Done</button>
                          </>
                        ) : (
                          <button onClick={() => { setSelectedUser(user.id); playClick(); }} className="px-3 py-1 rounded-lg bg-purple-500/20 text-purple-400 text-xs hover:bg-purple-500/30">Manage</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'support' && (
        <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-8 text-center">
          <MessageSquare size={48} className="text-white/20 mx-auto mb-4" />
          <p className="text-white/50">Support tickets will appear here</p>
          <p className="text-white/30 text-sm mt-2">No tickets yet</p>
        </div>
      )}
    </div>
  );
}
