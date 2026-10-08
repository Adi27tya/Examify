import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, ExamResult } from '../types';

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => { success: boolean; error?: string };
  signUp: (name: string, email: string, password: string) => { success: boolean; error?: string };
  signOut: () => void;
  getUserResults: () => ExamResult[];
  getResultById: (resultId: string) => ExamResult | undefined;
  saveResult: (result: Omit<ExamResult, 'id' | 'userId' | 'completedAt'>) => ExamResult;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_STORAGE_KEY = 'examify_registered_users';
const CURRENT_USER_STORAGE_KEY = 'examify_active_session';
const RESULTS_STORAGE_KEY = 'examify_exam_results';

// Initial demo user
const INITIAL_DEMO_USER: User = {
  id: 'usr_demo_101',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  password: 'password123',
  createdAt: new Date().toISOString()
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize storage on first mount
  useEffect(() => {
    try {
      const storedUsersRaw = localStorage.getItem(USERS_STORAGE_KEY);
      if (!storedUsersRaw) {
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify([INITIAL_DEMO_USER]));
      } else {
        const users = JSON.parse(storedUsersRaw);
        if (!users.some((u: User) => u.email === INITIAL_DEMO_USER.email)) {
          users.push(INITIAL_DEMO_USER);
          localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
        }
      }

      const activeUserRaw = localStorage.getItem(CURRENT_USER_STORAGE_KEY);
      if (activeUserRaw) {
        const parsed = JSON.parse(activeUserRaw);
        setCurrentUser(parsed);
      }
    } catch (e) {
      console.error('Failed to load auth session:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getUsers = (): User[] => {
    try {
      const raw = localStorage.getItem(USERS_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [INITIAL_DEMO_USER];
    } catch {
      return [INITIAL_DEMO_USER];
    }
  };

  const signIn = (email: string, password: string): { success: boolean; error?: string } => {
    const cleanEmail = email.trim().toLowerCase();
    const users = getUsers();
    const matchedUser = users.find(u => u.email.toLowerCase() === cleanEmail);

    if (!matchedUser) {
      return { success: false, error: 'No account found with this email address.' };
    }

    if (matchedUser.password !== password) {
      return { success: false, error: 'Incorrect password. Please try again.' };
    }

    // Save session without plain password in memory state
    const sessionUser: User = {
      id: matchedUser.id,
      name: matchedUser.name,
      email: matchedUser.email,
      createdAt: matchedUser.createdAt
    };

    localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(sessionUser));
    setCurrentUser(sessionUser);
    return { success: true };
  };

  const signUp = (name: string, email: string, password: string): { success: boolean; error?: string } => {
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName || cleanName.length < 2) {
      return { success: false, error: 'Please enter your full name (at least 2 characters).' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return { success: false, error: 'Please provide a valid email address.' };
    }

    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters long.' };
    }

    const users = getUsers();
    const duplicate = users.find(u => u.email.toLowerCase() === cleanEmail);
    if (duplicate) {
      return { success: false, error: 'An account with this email already exists. Please sign in.' };
    }

    const newUser: User = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: cleanName,
      email: cleanEmail,
      password: password,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

    return { success: true };
  };

  const signOut = () => {
    localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
    setCurrentUser(null);
  };

  const getAllResults = (): ExamResult[] => {
    try {
      const raw = localStorage.getItem(RESULTS_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  };

  const getUserResults = (): ExamResult[] => {
    if (!currentUser) return [];
    const all = getAllResults();
    return all
      .filter(r => r.userId === currentUser.id)
      .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime());
  };

  const getResultById = (resultId: string): ExamResult | undefined => {
    const all = getAllResults();
    return all.find(r => r.id === resultId);
  };

  const saveResult = (resultData: Omit<ExamResult, 'id' | 'userId' | 'completedAt'>): ExamResult => {
    if (!currentUser) throw new Error('Cannot save result: user is not logged in');

    const newResult: ExamResult = {
      ...resultData,
      id: `res_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      userId: currentUser.id,
      completedAt: new Date().toISOString()
    };

    const all = getAllResults();
    all.push(newResult);
    localStorage.setItem(RESULTS_STORAGE_KEY, JSON.stringify(all));

    return newResult;
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoading,
        signIn,
        signUp,
        signOut,
        getUserResults,
        getResultById,
        saveResult
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
