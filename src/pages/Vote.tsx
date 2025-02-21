import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { VoteCard } from "@/components/VoteCard";
import { Users, ListChecks, Vote as VoteIcon, Clock, Activity, Shield, Info, Link, Database, Lock, History, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";

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
  const { toast } = useToast();
  const [progress, setProgress] = useState(45);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  const showVotingRules = () => {
    toast({
      title: "Blockchain Voting Rules",
      description: "1. Each vote is recorded as an immutable transaction\n2. Votes are cryptographically secured\n3. Full transparency with anonymous voting",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-purple-50/30">
      <div className="container mx-auto px-4 py-12">
        <div className="pt-20">
          <div className="max-w-3xl mx-auto mb-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100 shadow-lg shadow-blue-100/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Link className="w-5 h-5 text-blue-500 animate-pulse" />
                <p className="text-blue-700 text-sm font-medium">
                  Connected to Blockchain Network
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-blue-600 bg-white/80 px-3 py-1 rounded-full shadow-sm">
                <Database className="w-4 h-4" />
                <span>Latest Block: #14,532</span>
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto mb-8 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-100 flex items-center gap-3 shadow-lg shadow-emerald-100/20">
            <Info className="w-5 h-5 text-emerald-500" />
            <p className="text-emerald-700 text-sm">
              Your vote will be cryptographically secured on the blockchain. Learn more about our{" "}
              <button onClick={showVotingRules} className="text-emerald-600 underline hover:text-emerald-800 font-medium">
                voting protocol
              </button>
            </p>
          </div>

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

            <div className="max-w-2xl mx-auto mb-8 p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-gray-100 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-700">Overall Voting Progress</h3>
                <span className="text-sm text-gray-500">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-gray-500 mt-2">Based on expected voter turnout</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-12">
              <div className="p-6 rounded-xl bg-gradient-to-br from-white to-purple-50/50 backdrop-blur-sm border border-purple-100/50 shadow-xl shadow-purple-100/20 hover:shadow-2xl hover:shadow-purple-100/30 transition-all duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-gray-700">Verified Voters</h3>
                </div>
                <p className="text-2xl font-bold text-gray-900">127</p>
                <p className="text-sm text-gray-500 mt-1">Registered on blockchain</p>
              </div>

              <div className="p-6 rounded-xl bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm border border-blue-100/50 shadow-xl shadow-blue-100/20 hover:shadow-2xl hover:shadow-blue-100/30 transition-all duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <Link className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-gray-700">Blockchain Status</h3>
                </div>
                <p className="text-2xl font-bold text-gray-900">Active</p>
                <p className="text-sm text-gray-500 mt-1">Network consensus achieved</p>
              </div>

              <div className="p-6 rounded-xl bg-gradient-to-br from-white to-green-50/50 backdrop-blur-sm border border-green-100/50 shadow-xl shadow-green-100/20 hover:shadow-2xl hover:shadow-green-100/30 transition-all duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <Activity className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-gray-700">Confirmation Rate</h3>
                </div>
                <p className="text-2xl font-bold text-gray-900">99.9%</p>
                <p className="text-sm text-gray-500 mt-1">Transaction success rate</p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-100 shadow-sm">
                <Shield className="w-4 h-4" />
                <span className="text-sm font-medium">Cryptographically Secured</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-100 shadow-sm">
                <Lock className="w-4 h-4" />
                <span className="text-sm font-medium">Zero-Knowledge Proof</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-50 to-fuchsia-50 text-purple-700 border border-purple-100 shadow-sm">
                <Link className="w-4 h-4" />
                <span className="text-sm font-medium">Consensus Active</span>
              </div>
            </div>
          </div>

          <VoteCard
            questionId={sampleQuestion.id}
            question={sampleQuestion.question}
            options={sampleQuestion.options}
          />

          <div className="max-w-3xl mx-auto mb-8 mt-8">
            <div className="p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-gray-100 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Recent Transactions</h3>
                <History className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-3">
                {blockchain.slice(-3).reverse().map((block, index) => (
                  <div key={block.hash} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Activity className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Vote Recorded</p>
                        <p className="text-xs text-gray-500">Block #{blockchain.length - 3 + index}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">
                      {new Date(block.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto mb-8">
            <div className="p-6 rounded-xl bg-gradient-to-r from-primary/5 to-purple-400/5 border border-primary/10 shadow-lg">
              <div className="flex items-center justify-center gap-4">
                <Timer className="w-6 h-6 text-primary" />
                <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
                  {[
                    { value: 24, label: 'hours' },
                    { value: 35, label: 'min' },
                    { value: 12, label: 'sec' },
                  ].map(({ value, label }) => (
                    <div key={label} className="flex flex-col">
                      <span className="countdown font-mono text-2xl text-primary">
                        <span style={{ '--value': value } as any}>{value}</span>
                      </span>
                      <span className="text-xs text-gray-500">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-center text-sm text-gray-600 mt-4">
                Time remaining until voting closes
              </p>
            </div>
          </div>

          <div className="max-w-2xl mx-auto mt-16 p-6 rounded-xl bg-gradient-to-br from-gray-50 to-slate-50 border border-gray-100 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Technical Support</h3>
            <p className="text-gray-600 mb-4">
              Having issues with the blockchain voting process or need help understanding how it works?
              Our blockchain specialists are here to assist you.
            </p>
            <Button variant="outline" onClick={() => toast({
              title: "Support Request Submitted",
              description: "A blockchain specialist will contact you shortly.",
            })} className="bg-white hover:bg-gray-50">
              Contact Support
            </Button>
          </div>

          <footer className="text-center mt-16 text-sm text-gray-500">
            <p>© 2024 Blockchain Voting System. All rights reserved.</p>
            <p className="mt-2">Decentralized • Transparent • Immutable</p>
            <div className="flex justify-center gap-4 mt-4">
              <button className="text-gray-500 hover:text-primary transition-colors">Smart Contract</button>
              <button className="text-gray-500 hover:text-primary transition-colors">Network Status</button>
              <button className="text-gray-500 hover:text-primary transition-colors">FAQ</button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
