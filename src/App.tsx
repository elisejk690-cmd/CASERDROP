import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import Navbar from './components/Navbar';
import CasesPage from './components/CasesPage';
import UpgraderPage from './components/UpgraderPage';
import TradesPage from './components/TradesPage';
import ProfilePage from './components/ProfilePage';
import LeaderboardPage from './components/LeaderboardPage';
import IndexPage from './components/IndexPage';
import AuthPage from './components/AuthPage';
import AdminPanel from './components/AdminPanel';
import AutumnEvent from './components/AutumnEvent';
import TimeCasesPage from './components/TimeCasesPage';
import OddsSettingsPage from './components/OddsSettingsPage';
import BattlePage from './components/BattlePage';
import CrashGame from './components/CrashGame';
import ClanSystem from './components/ClanSystem';
import GuessPriceGame from './components/GuessPriceGame';
import LimitedCases from './components/LimitedCases';
import { useAuth } from './hooks/useAuth';
import { useGameState } from './hooks/useGameState';
import { soundEngine } from './hooks/useSound';

function App() {
  const [currentPage, setCurrentPage] = useState('cases');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const { currentUser, isAuthenticated, logout, updateUser } = useAuth();

  useEffect(() => {
    soundEngine.enabled = soundEnabled;
  }, [soundEnabled]);

  const toggleSound = () => setSoundEnabled(prev => !prev);

  // Хук должен вызываться всегда, даже если пользователь не авторизован
  const gameState = useGameState({ 
    user: currentUser || { 
      id: '', username: '', email: '', phone: '', password: '', 
      avatar: '🎮', language: 'en', balance: 0, bitcoin: 0, 
      inventory: [], stats: { casesOpened: 0, upgradesWon: 0, level: 1, xp: 0 }, 
      createdAt: 0, role: 'user' as const, status: 'active' as const, ownedSkinIds: [], bio: ''
    }, 
    updateUser 
  });

  if (!isAuthenticated || !currentUser) {
    return <AuthPage />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'cases':
        return <CasesPage gameState={gameState} onNavigate={setCurrentPage} currentUser={currentUser} />;
      case 'upgrader':
        return <UpgraderPage gameState={gameState} />;
      case 'trades':
        return <TradesPage gameState={gameState} />;
      case 'profile':
        return <ProfilePage gameState={gameState} currentUser={currentUser} updateUser={updateUser} />;
      case 'leaderboard':
        return <LeaderboardPage />;
      case 'index':
        return <IndexPage currentUser={currentUser} />;
      case 'admin':
        return <AdminPanel />;
      case 'autumn':
        return <AutumnEvent />;
      case 'time-cases':
        return <TimeCasesPage gameState={gameState} />;
      case 'odds-settings':
        return <OddsSettingsPage />;
      case 'battle':
        return <BattlePage gameState={gameState} currentUser={currentUser} />;
      case 'crash':
        return <CrashGame gameState={gameState} />;
      case 'clans':
        return <ClanSystem gameState={gameState} currentUser={currentUser} />;
      case 'guess':
        return <GuessPriceGame gameState={gameState} />;
      case 'limited':
        return <LimitedCases gameState={gameState} />;
      default:
        return <CasesPage gameState={gameState} onNavigate={setCurrentPage} currentUser={currentUser} />;
    }
  };

  return (
      <div className="min-h-screen bg-black text-white">
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-fuchsia-500/5 rounded-full blur-3xl" />
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="relative z-10">
        <Navbar 
          currentPage={currentPage} 
          onNavigate={setCurrentPage}
          balance={gameState.state.balance}
          bitcoin={gameState.state.bitcoin}
          username={currentUser.username}
          avatar={currentUser.avatarUrl || currentUser.avatar}
          userRole={currentUser.role}
          onLogout={logout}
        />          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleSound}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-white/10 border border-white/20 backdrop-blur-xl flex items-center justify-center text-white/70 hover:text-white transition-colors shadow-lg"
        >
          {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </motion.button>

        <footer className="relative z-10 border-t border-white/5 py-6 mt-8">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-white/20 text-sm caser-drop-title">Caser Drop — Premium Case Opening Experience</p>
            <p className="text-white/10 text-xs mt-1">For entertainment purposes only</p>
          </div>
        </footer>
      </div>
  );
}

export default App;
