
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { VoteCard } from "@/components/VoteCard";
import { Vote as VoteIcon } from "lucide-react";
import { BlockchainStatusBanner } from "@/components/vote/BlockchainStatusBanner";
import { VotingInfoBanner } from "@/components/vote/VotingInfoBanner";
import { VoteStats } from "@/components/vote/VoteStats";
import { SystemStatus } from "@/components/vote/SystemStatus";
import { VoteCountdown } from "@/components/vote/VoteCountdown";
import { TransactionHistory } from "@/components/vote/TransactionHistory";
import { TechnicalSupport } from "@/components/vote/TechnicalSupport";
import { VoteFooter } from "@/components/vote/VoteFooter";

const sampleQuestion = {
  id: "q1",
  question: "What's your favorite programming language?",
  options: [
    { id: "1", text: "JavaScript" },
    { id: "2", text: "Python" },
    { id: "3", text: "Java" },
    { id: "4", text: "C++" },
  ],
};

export default function Vote() {
  const { isAuthenticated, user, blockchain } = useAuth();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(45);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-purple-50/30">
      <div className="container mx-auto px-4 py-12">
        <div className="pt-20">
          <BlockchainStatusBanner />
          <VotingInfoBanner />

          <div className="max-w-3xl mx-auto mb-16 text-center animate-fadeIn">
            <div className="inline-block p-3 rounded-full bg-gradient-to-br from-primary/20 to-purple-400/20 text-primary mb-4">
              <VoteIcon className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
              Blockchain Voting System
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Welcome back, <span className="font-medium text-primary">{user?.name}</span>! Your vote will be securely recorded on the blockchain.
            </p>

            <VoteStats progress={progress} />
            <SystemStatus />
          </div>

          <VoteCountdown />

          <VoteCard
            questionId={sampleQuestion.id}
            question={sampleQuestion.question}
            options={sampleQuestion.options}
          />

          <TransactionHistory blockchain={blockchain} />
          <TechnicalSupport />
          <VoteFooter />
        </div>
      </div>
    </div>
  );
}
