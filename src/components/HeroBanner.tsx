import { motion } from 'framer-motion';
import { Gift, Zap } from 'lucide-react';
import { allSkins } from '../data/skins';

export default function HeroBanner() {
  // Get random items for display
  const weapons = allSkins.filter(s => s.type === 'weapon').slice(0, 3);
  const knives = allSkins.filter(s => s.rarity === 'knife').slice(0, 2);
  const agents = allSkins.filter(s => s.type === 'agent').slice(0, 1);
  const gloves = allSkins.filter(s => s.type === 'glove').slice(0, 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full h-64 sm:h-80 rounded-3xl overflow-hidden mb-8 bg-gradient-to-br from-purple-900/40 via-violet-800/30 to-fuchsia-900/40 border border-white/10"
    >
      {/* Background Items */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-20 h-20 animate-float">
          {weapons[0] && (weapons[0].image.startsWith('http') ? (
            <img src={weapons[0].image} alt={weapons[0].name} className="w-full h-full object-contain" />
          ) : (
            <span className="text-6xl">{weapons[0].image}</span>
          ))}
        </div>
        <div className="absolute top-20 right-20 w-16 h-16 animate-float" style={{ animationDelay: '0.5s' }}>
          {knives[0] && (knives[0].image.startsWith('http') ? (
            <img src={knives[0].image} alt={knives[0].name} className="w-full h-full object-contain" />
          ) : (
            <span className="text-5xl">{knives[0].image}</span>
          ))}
        </div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 animate-float" style={{ animationDelay: '1s' }}>
          {agents[0] && (agents[0].image.startsWith('http') ? (
            <img src={agents[0].image} alt={agents[0].name} className="w-full h-full object-contain" />
          ) : (
            <span className="text-5xl">{agents[0].image}</span>
          ))}
        </div>
        <div className="absolute bottom-10 right-1/3 w-14 h-14 animate-float" style={{ animationDelay: '1.5s' }}>
          {gloves[0] && (gloves[0].image.startsWith('http') ? (
            <img src={gloves[0].image} alt={gloves[0].name} className="w-full h-full object-contain" />
          ) : (
            <span className="text-4xl">{gloves[0].image}</span>
          ))}
        </div>
        <div className="absolute top-1/3 left-1/2 w-14 h-14 animate-float" style={{ animationDelay: '2s' }}>
          {weapons[1] && (weapons[1].image.startsWith('http') ? (
            <img src={weapons[1].image} alt={weapons[1].name} className="w-full h-full object-contain" />
          ) : (
            <span className="text-4xl">{weapons[1].image}</span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <motion.h1
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl sm:text-7xl font-bold text-white mb-4 caser-drop-title"
          style={{ textShadow: '0 0 30px rgba(168, 85, 247, 0.5)' }}
        >
          CASER DROP
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl sm:text-2xl text-white/80 font-medium"
        >
          Оружие • Агенты • Ножи • Музыка • Брелки • Яйца
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 flex gap-4"
        >
          <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 flex items-center gap-2">
            <Gift size={16} className="text-purple-400" />
            <span className="text-white/90 text-sm">160+ предметов</span>
          </div>
          <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 flex items-center gap-2">
            <Zap size={16} className="text-orange-400" />
            <span className="text-white/90 text-sm">Ежедневные обновления</span>
          </div>
        </motion.div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
    </motion.div>
  );
}
