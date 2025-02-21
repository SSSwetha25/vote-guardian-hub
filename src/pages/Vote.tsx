
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { VoteCard } from "@/components/VoteCard";
import { Users, ListChecks, Vote as VoteIcon, Clock, Activity, Shield, Info, Link, Database, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

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
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

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
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Blockchain Status Banner */}
        <div className="max-w-3xl mx-auto mb-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link className="w-5 h-5 text-blue-500 animate-pulse" />
              <p className="text-blue-700 text-sm">
                Connected to Blockchain Network
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-blue-600">
              <Database className="w-4 h-4" />
              <span>Latest Block: #14,532</span>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="max-w-3xl mx-auto mb-8 p-4 bg-emerald-50 rounded-lg border border-emerald-100 flex items-center gap-3">
          <Info className="w-5 h-5 text-emerald-500" />
          <p className="text-emerald-700 text-sm">
            Your vote will be cryptographically secured on the blockchain. Learn more about our{" "}
            <button onClick={showVotingRules} className="text-emerald-600 underline hover:text-emerald-800">
              voting protocol
            </button>
          </p>
        </div>

        {/* Page Header */}
        <div className="max-w-3xl mx-auto mb-16 text-center animate-fadeIn">
          <div className="inline-block p-3 rounded-full bg-primary/10 text-primary mb-4">
            <VoteIcon className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Blockchain Voting System
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Welcome back, {user?.name}! Your vote will be securely recorded on the blockchain.
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-12">
            <div className="p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-gray-700">Verified Voters</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900">127</p>
              <p className="text-sm text-gray-500 mt-1">Registered on blockchain</p>
            </div>

            <div className="p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-3 mb-2">
                <Link className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-gray-700">Blockchain Status</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900">Active</p>
              <p className="text-sm text-gray-500 mt-1">Network consensus achieved</p>
            </div>

            <div className="p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-3 mb-2">
                <Activity className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-gray-700">Confirmation Rate</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900">99.9%</p>
              <p className="text-sm text-gray-500 mt-1">Transaction success rate</p>
            </div>
          </div>

          {/* System Status */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-700 border border-green-100">
              <Shield className="w-4 h-4" />
              <span className="text-sm">Cryptographically Secured</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
              <Lock className="w-4 h-4" />
              <span className="text-sm">Zero-Knowledge Proof</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 text-purple-700 border border-purple-100">
              <Link className="w-4 h-4" />
              <span className="text-sm">Consensus Active</span>
            </div>
          </div>
        </div>

        {/* Voting Card */}
        <VoteCard
          questionId={sampleQuestion.id}
          question={sampleQuestion.question}
          options={sampleQuestion.options}
        />

        {/* Help Section */}
        <div className="max-w-2xl mx-auto mt-16 p-6 rounded-xl bg-gray-50 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Technical Support</h3>
          <p className="text-gray-600 mb-4">
            Having issues with the blockchain voting process or need help understanding how it works?
            Our blockchain specialists are here to assist you.
          </p>
          <Button variant="outline" onClick={() => toast({
            title: "Support Request Submitted",
            description: "A blockchain specialist will contact you shortly.",
          })}>
            Contact Support
          </Button>
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 text-sm text-gray-500">
          <p>© 2024 Blockchain Voting System. All rights reserved.</p>
          <p className="mt-2">Decentralized • Transparent • Immutable</p>
          <div className="flex justify-center gap-4 mt-4">
            <button className="text-gray-500 hover:text-gray-700">Smart Contract</button>
            <button className="text-gray-500 hover:text-gray-700">Network Status</button>
            <button className="text-gray-500 hover:text-gray-700">FAQ</button>
          </div>
        </footer>
      </div>
    </div>
  );
}
