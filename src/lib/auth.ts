
import { create } from 'zustand';

interface Vote {
  questionId: string;
  optionId: string;
  voterId: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: { id: string; name: string } | null;
  votes: Vote[];
  login: (name: string) => void;
  logout: () => void;
  addVote: (vote: Omit<Vote, 'voterId'>) => void;
  getVotesForQuestion: (questionId: string) => Vote[];
}

export const useAuth = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  user: null,
  votes: [],
  login: (name: string) =>
    set({
      isAuthenticated: true,
      user: { id: Math.random().toString(36).substr(2, 9), name },
    }),
  logout: () => set({ isAuthenticated: false, user: null }),
  addVote: (vote) => {
    const { user } = get();
    if (!user) return;
    
    set((state) => ({
      votes: [...state.votes, { ...vote, voterId: user.id }],
    }));
  },
  getVotesForQuestion: (questionId: string) => {
    const state = get();
    return state.votes.filter((vote) => vote.questionId === questionId);
  },
}));
