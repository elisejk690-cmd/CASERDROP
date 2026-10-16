import { motion } from 'framer-motion';
import { Wallet, Box, ArrowUpCircle, Repeat, User, Settings, Trophy, Package, LogOut, Bitcoin, Shield, Timer, Swords, TrendingUp, DollarSign, Users } from 'lucide-react';
import { UserRole } from '../hooks/useAuth';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  balance: number;
  bitcoin: number;
  username: string;
  avatar: string;
  userRole: UserRole;
  onLogout: () => void;
}

const getNavItems = (role: UserRole) => {
  const items = [
    { id: 'cases', label: 'Cases', icon: Box },
    { id: 'limited', label: 'Limited', icon: Timer },
    { id: 'battle', label: 'Battle', icon: Swords },
    { id: 'crash', label: 'Crash', icon: TrendingUp },
    { id: 'upgrader', label: 'Upgrader', icon: ArrowUpCircle },
    { id: 'guess', label: 'Guess', icon: DollarSign },
    { id: 'clans', label: 'Clans', icon: Users },
    { id: 'trades', label: 'Trades', icon: Repeat },
    { id: 'index', label: 'Index', icon: Package },
    { id: 'leaderboard', label: 'Top', icon: Trophy },
    { id: 'profile', label: 'Profile', icon: User },
  ];
  
  if (['admin', 'head_admin', 'curator', 'founder'].includes(role)) {
    items.push({ id: 'admin', label: 'Admin', icon: Shield });
  }
  
  if (['head_admin', 'curator', 'founder'].includes(role)) {
    items.push({ id: 'odds-settings', label: 'Odds', icon: Settings });
  }
  
  return items;
};

export default function Navbar({ currentPage, onNavigate, balance, bitcoin, username, avatar, userRole, onLogout }: NavbarProps) {
  const navItems = getNavItems(userRole);
  const isStaff = ['admin', 'head_admin', 'curator', 'founder'].includes(userRole);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-2 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate('cases')}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">CD</span>
            </div>
            <span className="text-white caser-drop-title text-lg hidden sm:block">Caser Drop</span>
          </motion.div>

          {/* Nav Items */}
          <div className="flex items-center gap-1 overflow-x-auto">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`relative px-2 sm:px-3 py-2 rounded-xl flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                    isActive ? 'text-white' : 'text-white/50 hover:text-white/80'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute inset-0 bg-white/10 rounded-xl"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <Icon size={14} className="relative z-10" />
                  <span className="relative z-10 hidden md:block">{item.label}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Balance & User */}
          <div className="flex items-center gap-2">
            <motion.div 
              className="hidden sm:flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-xl px-2 py-1.5"
              whileHover={{ scale: 1.02 }}
            >
              <Bitcoin size={14} className="text-yellow-400" />
              <span className="text-yellow-400 font-semibold text-xs">{bitcoin.toFixed(4)}</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-xl px-2 py-1.5"
              whileHover={{ scale: 1.02 }}
            >
              <Wallet size={14} className="text-green-400" />
              <span className="text-white font-semibold text-xs">${balance.toFixed(2)}</span>
            </motion.div>
            <div className="hidden sm:flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-2 py-1.5">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-xs overflow-hidden">
                {avatar && (avatar.startsWith('http') || avatar.startsWith('')) ? (
                  <img src={avatar} alt="Avatar" className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <span className="text-sm">{avatar || '🎮'}</span>
                )}
              </div>
              <div className="flex items-center gap-1">
                <span className="text-white/70 text-xs font-medium">{username}</span>
                {isStaff && (
                  <div className="group relative">
                    <Shield size={12} className="text-blue-400" />
                    <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block bg-zinc-800 border border-white/10 rounded-xl p-3 w-64 text-left shadow-xl z-50">
                      <p className="text-white text-sm font-medium">✓ Account Verified</p>
                      <p className="text-white/60 text-xs mt-1">This account is verified by <span className="text-purple-400">"CaserDrop"</span></p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onLogout}
              className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-red-400 transition-colors"
              title="Logout"
            >
              <LogOut size={14} />
            </motion.button>
          </div>
        </div>
      </div>
    </nav>
  );
}
