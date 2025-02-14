
import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  user: { id: string; name: string } | null;
  login: (name: string) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: (name: string) =>
    set({
      isAuthenticated: true,
      user: { id: Math.random().toString(36).substr(2, 9), name },
    }),
  logout: () => set({ isAuthenticated: false, user: null }),
}));
