import { useCallback } from 'react';
import { Skin } from '../data/skins';
import { User } from './useAuth';

export interface InventoryItem {
  id: string;
  skin: Skin;
  obtainedAt: number;
  float: number;
}

interface UseGameStateProps {
  user: User;
  updateUser: (updates: Partial<User>) => void;
}

export function useGameState({ user, updateUser }: UseGameStateProps) {
  const state = {
    balance: user.balance,
    bitcoin: user.bitcoin,
    inventory: user.inventory as InventoryItem[],
    totalOpened: user.stats.casesOpened,
    totalSpent: 0,
    totalWon: user.inventory.reduce((sum: number, i: any) => sum + (i.skin?.price || 0), 0),
    bestDrop: user.inventory.length > 0 
      ? user.inventory.reduce((best: any, curr: any) => (curr.skin?.price || 0) > (best?.skin?.price || 0) ? curr : best, user.inventory[0])?.skin || null
      : null,
    level: user.stats.level,
    xp: user.stats.xp,
    username: user.username,
    avatar: user.avatar,
  };

  const addBalance = useCallback((amount: number) => {
    updateUser({ balance: user.balance + amount });
  }, [user.balance, updateUser]);

  const addBitcoin = useCallback((amount: number) => {
    updateUser({ bitcoin: user.bitcoin + amount });
  }, [user.bitcoin, updateUser]);

  const spendBalance = useCallback((amount: number): boolean => {
    if (user.balance >= amount) {
      updateUser({ balance: user.balance - amount });
      return true;
    }
    return false;
  }, [user.balance, updateUser]);

  const spendBitcoin = useCallback((amount: number): boolean => {
    if (user.bitcoin >= amount) {
      updateUser({ bitcoin: user.bitcoin - amount });
      return true;
    }
    return false;
  }, [user.bitcoin, updateUser]);

  const addToInventory = useCallback((skin: Skin) => {
    const item: InventoryItem = {
      id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      skin,
      obtainedAt: Date.now(),
      float: Math.random(),
    };
    const xpGain = Math.floor(skin.price * 1.5);
    const newXp = user.stats.xp + xpGain;
    const xpRequired = Math.floor(100 * Math.pow(1.5, user.stats.level - 1));
    const newLevel = Math.floor(newXp / xpRequired) + 1;
    
    // Track owned skins for index
    const ownedSkinIds = user.ownedSkinIds || [];
    const newOwnedSkinIds = ownedSkinIds.includes(skin.id) ? ownedSkinIds : [...ownedSkinIds, skin.id];
    
    updateUser({
      inventory: [item, ...user.inventory],
      ownedSkinIds: newOwnedSkinIds,
      stats: {
        ...user.stats,
        casesOpened: user.stats.casesOpened + 1,
        xp: newXp,
        level: newLevel,
      },
    });
  }, [user, updateUser]);

  const incrementUpgradesWon = useCallback(() => {
    updateUser({
      stats: {
        ...user.stats,
        upgradesWon: user.stats.upgradesWon + 1,
      },
    });
  }, [user.stats, updateUser]);

  const removeFromInventory = useCallback((itemId: string) => {
    updateUser({
      inventory: user.inventory.filter((i: any) => i.id !== itemId),
    });
  }, [user.inventory, updateUser]);

  const upgradeItem = useCallback((itemId: string, newSkin: Skin) => {
    const newItem: InventoryItem = {
      id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      skin: newSkin,
      obtainedAt: Date.now(),
      float: Math.random(),
    };
    
    const xpGain = Math.floor(newSkin.price * 1.5);
    const newXp = user.stats.xp + xpGain;
    const xpRequired = Math.floor(100 * Math.pow(1.5, user.stats.level - 1));
    const newLevel = Math.floor(newXp / xpRequired) + 1;
    
    const ownedSkinIds = user.ownedSkinIds || [];
    const newOwnedSkinIds = ownedSkinIds.includes(newSkin.id) ? ownedSkinIds : [...ownedSkinIds, newSkin.id];
    
    updateUser({
      inventory: [newItem, ...user.inventory.filter((i: any) => i.id !== itemId)],
      ownedSkinIds: newOwnedSkinIds,
      stats: {
        ...user.stats,
        upgradesWon: user.stats.upgradesWon + 1,
        xp: newXp,
        level: newLevel,
      },
    });
  }, [user, updateUser]);

  const sellItem = useCallback((itemId: string) => {
    const item = user.inventory.find((i: any) => i.id === itemId);
    if (!item) return;
    updateUser({
      inventory: user.inventory.filter((i: any) => i.id !== itemId),
      balance: user.balance + item.skin.price,
    });
  }, [user, updateUser]);

  const sellAll = useCallback(() => {
    const total = user.inventory.reduce((sum: number, i: any) => sum + i.skin.price, 0);
    updateUser({
      inventory: [],
      balance: user.balance + total,
    });
  }, [user, updateUser]);

  return {
    state,
    addBalance,
    addBitcoin,
    spendBalance,
    spendBitcoin,
    addToInventory,
    incrementUpgradesWon,
    removeFromInventory,
    sellItem,
    sellAll,
  };
}
