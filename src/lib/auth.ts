
import { create } from 'zustand';
import { sha256 } from 'crypto-js'; // We'll simulate blockchain hashing

interface Block {
  hash: string;
  previousHash: string;
  timestamp: number;
  data: Vote;
  nonce: number;
}

interface Vote {
  questionId: string;
  optionId: string;
  voterId: string;
  timestamp: number;
  transactionHash: string;
}

interface ElectionTiming {
  endTime: Date;
  isOver: boolean;
}

interface AuthState {
  isAuthenticated: boolean;
  user: { id: string; name: string; walletAddress?: string } | null;
  blockchain: Block[];
  pendingVotes: Vote[];
  electionTiming: ElectionTiming;
  login: (name: string) => void;
  logout: () => void;
  addVote: (vote: Omit<Vote, 'voterId' | 'timestamp' | 'transactionHash'>) => Promise<boolean>;
  getVotesForQuestion: (questionId: string) => Vote[];
  checkElectionStatus: () => boolean;
  getLatestBlock: () => Block | null;
}

const defaultEndTime = new Date(Date.now() + 60 * 60 * 1000);

const calculateHash = (block: Omit<Block, 'hash'>) => {
  return sha256(
    block.previousHash +
    block.timestamp +
    JSON.stringify(block.data) +
    block.nonce
  ).toString();
};

const createGenesisBlock = (): Block => ({
  hash: '0000Genesis',
  previousHash: '0',
  timestamp: Date.now(),
  data: {
    questionId: '0',
    optionId: '0',
    voterId: '0',
    timestamp: Date.now(),
    transactionHash: '0'
  },
  nonce: 0
});

export const useAuth = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  user: null,
  blockchain: [createGenesisBlock()],
  pendingVotes: [],
  electionTiming: {
    endTime: defaultEndTime,
    isOver: false,
  },
  login: (name: string) => {
    const id = sha256(name).toString().slice(0, 12);
    const walletAddress = '0x' + sha256(id).toString().slice(0, 40);
    set({
      isAuthenticated: true,
      user: { id, name, walletAddress },
    });
  },
  logout: () => set({ isAuthenticated: false, user: null }),
  addVote: async (vote) => {
    const { user, blockchain, electionTiming } = get();
    if (!user || electionTiming.isOver) return false;

    // Check if user has already voted
    const existingVote = get().blockchain.find(
      block => block.data.questionId === vote.questionId && 
               block.data.voterId === user.id
    );

    if (existingVote) {
      console.log('Vote already exists in blockchain');
      return false;
    }

    // Create new vote with blockchain characteristics
    const timestamp = Date.now();
    const transactionHash = sha256(
      user.id + vote.questionId + vote.optionId + timestamp
    ).toString();

    const newVote: Vote = {
      ...vote,
      voterId: user.id,
      timestamp,
      transactionHash
    };

    // Simulate blockchain mining delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create new block
    const previousBlock = get().blockchain[get().blockchain.length - 1];
    const newBlock: Block = {
      previousHash: previousBlock.hash,
      timestamp: Date.now(),
      data: newVote,
      nonce: Math.floor(Math.random() * 1000000),
      hash: '' // Will be calculated
    };

    // Calculate hash
    newBlock.hash = calculateHash(newBlock);

    // Add block to chain
    set(state => ({
      blockchain: [...state.blockchain, newBlock]
    }));

    return true;
  },
  getVotesForQuestion: (questionId: string) => {
    const state = get();
    return state.blockchain
      .filter(block => block.data.questionId === questionId)
      .map(block => block.data);
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
  getLatestBlock: () => {
    const { blockchain } = get();
    return blockchain[blockchain.length - 1];
  }
}));
