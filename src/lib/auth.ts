
import { create } from 'zustand';

interface Vote {
  questionId: string;
  optionId: string;
  voterId: string;
}

interface ElectionTiming {
  endTime: Date;
  isOver: boolean;
}

interface AuthState {
  isAuthenticated: boolean;
  user: { id: string; name: string } | null;
  votes: Vote[];
  electionTiming: ElectionTiming;
  login: (name: string) => void;
  logout: () => void;
  addVote: (vote: Omit<Vote, 'voterId'>) => void;
  getVotesForQuestion: (questionId: string) => Vote[];
  checkElectionStatus: () => boolean;
}

// Set election end time to 1 hour from now (adjust as needed)
const defaultEndTime = new Date(Date.now() + 60 * 60 * 1000);

export const useAuth = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  user: null,
  votes: [],
  electionTiming: {
    endTime: defaultEndTime,
    isOver: false,
  },
  login: (name: string) =>
    set({
      isAuthenticated: true,
      user: { id: Math.random().toString(36).substr(2, 9), name },
    }),
  logout: () => set({ isAuthenticated: false, user: null }),
  addVote: (vote) => {
    const { user, electionTiming } = get();
    if (!user || electionTiming.isOver) return;
    
    set((state) => ({
      votes: [...state.votes, { ...vote, voterId: user.id }],
    }));
  },
  getVotesForQuestion: (questionId: string) => {
    const state = get();
    return state.votes.filter((vote) => vote.questionId === questionId);
  },
  checkElectionStatus: () => {
    const { electionTiming } = get();
    const isOver = new Date() >= electionTiming.endTime;
    if (isOver !== electionTiming.isOver) {
      set((state) => ({
        electionTiming: {
          ...state.electionTiming,
          isOver,
        },
      }));
    }
    return isOver;
  },
}));
