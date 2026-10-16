import { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Image, Save } from 'lucide-react';
import { useAuth, User } from '../hooks/useAuth';
import { useSound } from '../hooks/useSound';

interface ProfileCustomizationProps {
  currentUser: User;
  updateUser: (updates: Partial<User>) => void;
}

const BACKGROUNDS = [
  { id: 'default', name: 'Default', gradient: 'from-purple-500 to-violet-600' },
  { id: 'sunset', name: 'Sunset', gradient: 'from-orange-500 to-red-600' },
  { id: 'ocean', name: 'Ocean', gradient: 'from-blue-500 to-cyan-600' },
  { id: 'forest', name: 'Forest', gradient: 'from-green-500 to-emerald-600' },
  { id: 'night', name: 'Night', gradient: 'from-gray-800 to-black' },
  { id: 'gold', name: 'Gold', gradient: 'from-yellow-500 to-amber-600' },
];

const FRAMES = [
  { id: 'none', name: 'None', border: '' },
  { id: 'purple', name: 'Purple Glow', border: 'border-4 border-purple-500' },
  { id: 'gold', name: 'Gold', border: 'border-4 border-yellow-500' },
  { id: 'rainbow', name: 'Rainbow', border: 'border-4 border-gradient-to-r border-red-500 border-yellow-500 border-green-500 border-blue-500' },
];

export default function ProfileCustomization({ currentUser, updateUser }: ProfileCustomizationProps) {
  const [selectedBg, setSelectedBg] = useState(currentUser.profileBg || 'default');
  const [selectedFrame, setSelectedFrame] = useState(currentUser.profileFrame || 'none');
  const [saved, setSaved] = useState(false);
  const { playClick } = useSound();

  const handleSave = () => {
    updateUser({
      profileBg: selectedBg,
      profileFrame: selectedFrame,
    });
    setSaved(true);
    playClick();
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Background Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <Palette size={20} className="text-purple-400" />
          <h2 className="text-white font-bold text-lg">Profile Background</h2>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {BACKGROUNDS.map((bg) => (
            <motion.button
              key={bg.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSelectedBg(bg.id);
                playClick();
              }}
              className={`h-20 rounded-xl bg-gradient-to-br ${bg.gradient} flex items-center justify-center text-white font-medium transition-all ${
                selectedBg === bg.id ? 'ring-4 ring-purple-500' : ''
              }`}
            >
              {bg.name}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Frame Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <Image size={20} className="text-purple-400" />
          <h2 className="text-white font-bold text-lg">Avatar Frame</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {FRAMES.map((frame) => (
            <motion.button
              key={frame.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSelectedFrame(frame.id);
                playClick();
              }}
              className={`h-20 rounded-xl bg-black/30 flex items-center justify-center transition-all ${
                selectedFrame === frame.id ? 'ring-4 ring-purple-500' : ''
              }`}
            >
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 ${frame.border}`}>
                {currentUser.avatarUrl ? (
                  <img src={currentUser.avatarUrl} alt="" className="w-full h-full object-cover rounded-full" />
                ) : (
                  <span className="flex items-center justify-center h-full text-2xl">{currentUser.avatar}</span>
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Save Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleSave}
        className="w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-400 hover:to-violet-500 shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2"
      >
        <Save size={20} />
        {saved ? 'Saved!' : 'Save Customization'}
      </motion.button>
    </div>
  );
}
