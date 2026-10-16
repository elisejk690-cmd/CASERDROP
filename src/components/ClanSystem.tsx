import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Trophy, Crown, Plus } from 'lucide-react';
import { useAuth, User } from '../hooks/useAuth';
import { useSound } from '../hooks/useSound';

interface Clan {
  id: string;
  name: string;
  tag: string;
  members: string[];
  leader: string;
  totalValue: number;
  createdAt: number;
}

const CLANS_KEY = 'caser_drop_clans';

interface ClanSystemProps {
  gameState: any;
  currentUser: any;
}

export default function ClanSystem({ gameState, currentUser }: ClanSystemProps) {
  const [clans, setClans] = useState<Clan[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [clanName, setClanName] = useState('');
  const [clanTag, setClanTag] = useState('');
  const { playClick } = useSound();
  const { getAllUsers } = useAuth();

  useEffect(() => {
    const data = localStorage.getItem(CLANS_KEY);
    if (data) {
      setClans(JSON.parse(data));
    }
  }, []);

  const saveClans = (newClans: Clan[]) => {
    setClans(newClans);
    localStorage.setItem(CLANS_KEY, JSON.stringify(newClans));
  };

  const createClan = () => {
    if (!clanName || !clanTag || clanTag.length > 5) return;
    
    const newClan: Clan = {
      id: `clan_${Date.now()}`,
      name: clanName,
      tag: clanTag.toUpperCase(),
      members: [currentUser.id],
      leader: currentUser.id,
      totalValue: gameState.state.balance,
      createdAt: Date.now(),
    };
    
    saveClans([...clans, newClan]);
    setShowCreate(false);
    setClanName('');
    setClanTag('');
    playClick();
  };

  const userClan = clans.find(c => c.members.includes(currentUser.id));
  const sortedClans = [...clans].sort((a, b) => b.totalValue - a.totalValue);

  return (
    <div className="pt-20 pb-8 px-4 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl caser-drop-title text-white mb-3">Clans</h1>
        <p className="text-white/50 text-lg">Join or create a clan and compete!</p>
      </motion.div>

      {/* User's Clan */}
      {userClan && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-purple-500/20 to-violet-600/20 border border-purple-500/50 rounded-2xl p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm">Your Clan</p>
              <h2 className="text-2xl font-bold text-white">
                [{userClan.tag}] {userClan.name}
              </h2>
              <p className="text-white/60 text-sm mt-1">{userClan.members.length} members</p>
            </div>
            <div className="text-right">
              <p className="text-white/60 text-sm">Total Value</p>
              <p className="text-3xl font-bold text-purple-400">${userClan.totalValue.toFixed(2)}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Top 3 Clans */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {sortedClans.slice(0, 3).map((clan, i) => (
          <motion.div
            key={clan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`relative rounded-2xl p-6 text-center ${
              i === 0 ? 'bg-gradient-to-b from-yellow-500/20 to-yellow-600/5 border-2 border-yellow-500/30' :
              i === 1 ? 'bg-gradient-to-b from-gray-400/20 to-gray-500/5 border-2 border-gray-400/30' :
              'bg-gradient-to-b from-orange-600/20 to-orange-700/5 border-2 border-orange-600/30'
            }`}
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              {i === 0 ? <Crown size={24} className="text-yellow-400" /> :
               i === 1 ? <Trophy size={24} className="text-gray-400" /> :
               <Trophy size={24} className="text-orange-500" />}
            </div>
            <p className="text-white font-bold text-lg mb-1">[{clan.tag}]</p>
            <p className="text-white/80 text-sm mb-2">{clan.name}</p>
            <p className="text-green-400 font-bold text-xl">${clan.totalValue.toFixed(2)}</p>
            <p className="text-white/40 text-xs mt-1">{clan.members.length} members</p>
          </motion.div>
        ))}
      </div>

      {/* All Clans */}
      <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-bold text-xl">All Clans</h2>
          {!userClan && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCreate(!showCreate)}
              className="px-4 py-2 rounded-xl bg-purple-500/20 border border-purple-500/50 text-purple-400 font-medium flex items-center gap-2"
            >
              <Plus size={16} />
              Create Clan
            </motion.button>
          )}
        </div>

        {showCreate && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-black/30 rounded-xl p-4 mb-4"
          >
            <input
              type="text"
              value={clanName}
              onChange={e => setClanName(e.target.value)}
              placeholder="Clan Name"
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white mb-3 focus:border-purple-500/50 focus:outline-none"
            />
            <input
              type="text"
              value={clanTag}
              onChange={e => setClanTag(e.target.value.slice(0, 5))}
              placeholder="Tag (max 5 chars)"
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white mb-3 focus:border-purple-500/50 focus:outline-none"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={createClan}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-violet-600 text-white font-medium"
            >
              Create Clan
            </motion.button>
          </motion.div>
        )}

        {clans.length === 0 ? (
          <p className="text-white/40 text-center py-8">No clans yet. Be the first to create one!</p>
        ) : (
          <div className="space-y-2">
            {sortedClans.map((clan, i) => (
              <motion.div
                key={clan.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-black/30 rounded-xl p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="text-white/40 font-bold w-8">#{i + 1}</span>
                  <div>
                    <p className="text-white font-medium">[{clan.tag}] {clan.name}</p>
                    <p className="text-white/40 text-sm">{clan.members.length} members</p>
                  </div>
                </div>
                <p className="text-green-400 font-bold">${clan.totalValue.toFixed(2)}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
