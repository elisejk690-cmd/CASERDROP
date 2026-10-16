import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings, Save, RotateCcw } from 'lucide-react';
import { cases } from '../data/cases';
import { Rarity, rarityNames } from '../data/skins';
import { useAuth } from '../hooks/useAuth';
import { useSound } from '../hooks/useSound';

const ODDS_KEY = 'caser_drop_custom_odds';

interface CaseOdds {
  [caseId: string]: Partial<Record<Rarity, number>>;
}

function getCustomOdds(): CaseOdds {
  const data = localStorage.getItem(ODDS_KEY);
  return data ? JSON.parse(data) : {};
}

function saveCustomOdds(odds: CaseOdds) {
  localStorage.setItem(ODDS_KEY, JSON.stringify(odds));
}

export default function OddsSettingsPage() {
  const { currentUser } = useAuth();
  const { playClick } = useSound();
  const [customOdds, setCustomOdds] = useState<CaseOdds>(getCustomOdds());
  const [saved, setSaved] = useState(false);

  // Check if user has permission (head_admin or higher)
  const hasPermission = currentUser && ['head_admin', 'curator', 'founder'].includes(currentUser.role);

  if (!hasPermission) {
    return (
      <div className="pt-20 pb-8 px-4 max-w-4xl mx-auto text-center">
        <Settings size={64} className="text-white/20 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-white mb-2">Access Denied</h1>
        <p className="text-white/50">You need Head Admin rank or higher to access this page.</p>
      </div>
    );
  }

  const handleOddsChange = (caseId: string, rarity: Rarity, value: number) => {
    setCustomOdds(prev => ({
      ...prev,
      [caseId]: {
        ...prev[caseId],
        [rarity]: value,
      },
    }));
  };

  const handleSave = () => {
    saveCustomOdds(customOdds);
    setSaved(true);
    playClick();
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = (caseId: string) => {
    setCustomOdds(prev => {
      const newOdds = { ...prev };
      delete newOdds[caseId];
      return newOdds;
    });
    playClick();
  };

  const handleResetAll = () => {
    setCustomOdds({});
    playClick();
  };

  const getTotalWeight = (caseId: string): number => {
    const caseData = cases.find(c => c.id === caseId);
    if (!caseData) return 0;
    
    const customCaseOdds = customOdds[caseId];
    const weights = customCaseOdds || caseData.weights;
    
    return Object.values(weights).reduce((sum, weight) => sum + (weight || 0), 0);
  };

  const rarities: Rarity[] = ['consumer', 'industrial', 'milspec', 'restricted', 'classified', 'covert', 'rare_special'];

  return (
    <div className="pt-20 pb-8 px-4 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl sm:text-5xl caser-drop-title text-white mb-3">Odds Settings</h1>
        <p className="text-white/50 text-lg">Customize drop rates for each case</p>
      </motion.div>

      {/* Action Buttons */}
      <div className="flex gap-3 mb-6 justify-end">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleResetAll}
          className="px-4 py-2 rounded-xl bg-red-500/20 border border-red-500/50 text-red-400 font-medium flex items-center gap-2"
        >
          <RotateCcw size={16} />
          Reset All
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSave}
          className="px-6 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-violet-600 text-white font-medium flex items-center gap-2"
        >
          <Save size={16} />
          {saved ? 'Saved!' : 'Save Changes'}
        </motion.button>
      </div>

      {/* Cases */}
      <div className="space-y-6">
        {cases.map((caseData, index) => {
          const customCaseOdds = customOdds[caseData.id];
          const weights = customCaseOdds || caseData.weights;
          const totalWeight = getTotalWeight(caseData.id);
          const isCustomized = !!customCaseOdds;

          return (
            <motion.div
              key={caseData.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6"
            >
              {/* Case Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{caseData.image}</span>
                  <div>
                    <h3 className="text-white font-bold text-lg">{caseData.name}</h3>
                    <p className="text-white/40 text-sm">${caseData.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {isCustomized && (
                    <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/50 text-purple-400 text-xs font-medium">
                      Customized
                    </span>
                  )}
                  <button
                    onClick={() => handleReset(caseData.id)}
                    className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white/60 text-sm hover:bg-white/10 transition-colors flex items-center gap-1"
                  >
                    <RotateCcw size={14} />
                    Reset
                  </button>
                </div>
              </div>

              {/* Odds Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {rarities.map(rarity => {
                  const weight = weights[rarity] || 0;
                  const percentage = totalWeight > 0 ? (weight / totalWeight) * 100 : 0;

                  return (
                    <div key={rarity} className="bg-black/30 rounded-xl p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white/70 text-sm font-medium">{rarityNames[rarity]}</span>
                        <span className="text-white/40 text-xs">{percentage.toFixed(2)}%</span>
                      </div>
                      <input
                        type="number"
                        value={weight}
                        onChange={(e) => handleOddsChange(caseData.id, rarity, parseFloat(e.target.value) || 0)}
                        step="0.1"
                        min="0"
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-purple-500/50 focus:outline-none"
                      />
                    </div>
                  );
                })}
              </div>

              {/* Total Weight */}
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-white/60 text-sm">Total Weight:</span>
                <span className="text-white font-bold">{totalWeight.toFixed(2)}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
