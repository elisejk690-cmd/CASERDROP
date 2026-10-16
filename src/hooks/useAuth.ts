import { useState, useEffect } from 'react';

export type UserRole = 'user' | 'admin' | 'head_admin' | 'curator' | 'founder';
export type UserStatus = 'active' | 'banned';

export interface User {
  id: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  avatar: string;
  avatarUrl?: string;
  language: string;
  balance: number;
  bitcoin: number;
  inventory: any[];
  stats: {
    casesOpened: number;
    upgradesWon: number;
    level: number;
    xp: number;
  };
  createdAt: number;
  role: UserRole;
  status: UserStatus;
  bio?: string;
  ownedSkinIds?: string[]; // Track all skins ever owned for index
  rareItemChance?: number; // Personal rare item drop chance (0-100%)
  profileBg?: string; // Profile background theme
  profileFrame?: string; // Avatar frame style
  referredBy?: string; // User ID who referred this user
  referralCode?: string; // This user's referral code
}

const USERS_KEY = 'caser_drop_users';
const CURRENT_USER_KEY = 'caser_drop_current_user';

function getUsers(): User[] {
  try {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  } catch {
    return [];
  }
}

function saveUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getCurrentUser(): User | null {
  try {
    const userId = localStorage.getItem(CURRENT_USER_KEY);
    if (!userId) return null;
    const users = getUsers();
    return users.find(u => u.id === userId) || null;
  } catch {
    return null;
  }
}

function setCurrentUser(userId: string | null) {
  if (userId) {
    localStorage.setItem(CURRENT_USER_KEY, userId);
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
}

export function useAuth() {
  const [currentUser, setCurrentUserState] = useState<User | null>(getCurrentUser());

  useEffect(() => {
    setCurrentUserState(getCurrentUser());
  }, []);

  const register = (username: string, email: string, phone: string, password: string, referralCode?: string): { success: boolean; error?: string } => {
    const users = getUsers();
    
    // Check if username exists
    if (users.find(u => u.username.toLowerCase() === username.toLowerCase())) {
      return { success: false, error: 'Username already exists' };
    }

    // Check if email exists
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: 'Email already registered' };
    }

    // Check referral code
    let referredBy: string | undefined;
    if (referralCode) {
      const referrer = users.find(u => u.referralCode === referralCode);
      if (referrer) {
        referredBy = referrer.id;
        // Give bonus to referrer
        referrer.balance += 50;
      }
    }

    // Create new user
    const newUser: User = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      username,
      email,
      phone,
      password,
      avatar: '🎮',
      language: 'en',
      balance: referralCode && referredBy ? 25 : 5, // Bonus for using referral code
      bitcoin: 0,
      inventory: [],
      stats: {
        casesOpened: 0,
        upgradesWon: 0,
        level: 1,
        xp: 0,
      },
      createdAt: Date.now(),
      role: 'user',
      status: 'active',
      ownedSkinIds: [],
      bio: '',
      profileBg: 'default',
      profileFrame: 'none',
      referralCode: `REF${Date.now().toString(36).toUpperCase()}`,
      referredBy,
    };

    users.push(newUser);
    saveUsers(users);
    setCurrentUser(newUser.id);
    setCurrentUserState(newUser);

    return { success: true };
  };

  const login = (username: string, password: string): { success: boolean; error?: string } => {
    const users = getUsers();
    const user = users.find(u => 
      (u.username.toLowerCase() === username.toLowerCase() || u.email.toLowerCase() === username.toLowerCase()) && 
      u.password === password
    );

    if (!user) {
      return { success: false, error: 'Invalid credentials' };
    }

    setCurrentUser(user.id);
    setCurrentUserState(user);
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentUserState(null);
  };

  const updateUser = (updates: Partial<User>) => {
    if (!currentUser) return;
    
    const users = getUsers();
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    
    if (userIndex === -1) return;

    users[userIndex] = { ...users[userIndex], ...updates };
    saveUsers(users);
    setCurrentUserState(users[userIndex]);
  };

  const refreshUser = () => {
    setCurrentUserState(getCurrentUser());
  };

  const banUser = (userId: string) => {
    const users = getUsers();
    const idx = users.findIndex(u => u.id === userId);
    if (idx === -1) return;
    users[idx].status = 'banned';
    saveUsers(users);
    if (currentUser?.id === userId) {
      setCurrentUser(null);
      setCurrentUserState(null);
    }
  };

  const unbanUser = (userId: string) => {
    const users = getUsers();
    const idx = users.findIndex(u => u.id === userId);
    if (idx === -1) return;
    users[idx].status = 'active';
    saveUsers(users);
  };

  const setUserRole = (userId: string, role: UserRole) => {
    const users = getUsers();
    const idx = users.findIndex(u => u.id === userId);
    if (idx === -1) return;
    users[idx].role = role;
    saveUsers(users);
    if (currentUser?.id === userId) {
      setCurrentUserState(users[idx]);
    }
  };

  const giveBalance = (userId: string, amount: number) => {
    const users = getUsers();
    const idx = users.findIndex(u => u.id === userId);
    if (idx === -1) return;
    users[idx].balance += amount;
    saveUsers(users);
    if (currentUser?.id === userId) {
      setCurrentUserState(users[idx]);
    }
  };

  const takeBalance = (userId: string, amount: number) => {
    const users = getUsers();
    const idx = users.findIndex(u => u.id === userId);
    if (idx === -1) return;
    users[idx].balance = Math.max(0, users[idx].balance - amount);
    saveUsers(users);
    if (currentUser?.id === userId) {
      setCurrentUserState(users[idx]);
    }
  };

  const setRareItemChance = (userId: string, chance: number) => {
    const users = getUsers();
    const idx = users.findIndex(u => u.id === userId);
    if (idx === -1) return;
    users[idx].rareItemChance = Math.max(0, Math.min(100, chance));
    saveUsers(users);
    if (currentUser?.id === userId) {
      setCurrentUserState(users[idx]);
    }
  };

  const canManageRole = (managerRole: UserRole, targetRole: UserRole): boolean => {
    const hierarchy: Record<UserRole, number> = {
      user: 0, admin: 1, head_admin: 2, curator: 3, founder: 4,
    };
    if (managerRole === 'founder') return true;
    if (managerRole === 'curator') return hierarchy[targetRole] < hierarchy.curator;
    return false;
  };

  const getAllUsers = () => getUsers();

  return {
    currentUser,
    register,
    login,
    logout,
    updateUser,
    refreshUser,
    isAuthenticated: !!currentUser,
    banUser,
    unbanUser,
    setUserRole,
    giveBalance,
    takeBalance,
    setRareItemChance,
    canManageRole,
    getAllUsers,
  };
}

export function getLeaderboard(): User[] {
  const users = getUsers();
  return users
    .sort((a, b) => (b.balance + b.bitcoin * 100) - (a.balance + a.bitcoin * 100))
    .slice(0, 50);
}
