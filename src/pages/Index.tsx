
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { Vote as VoteIcon } from "lucide-react";

export default function Index() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-gradient-to-b from-white via-blue-50/30 to-purple-50/30">
      <div className="max-w-3xl mx-auto fade-in">
        <div className="inline-block p-3 rounded-full bg-gradient-to-br from-primary/20 to-purple-400/20 text-primary mb-4">
          <VoteIcon className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          Welcome to VoteGuardian
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Secure, transparent, and easy-to-use voting platform
        </p>
        
        <div className="max-w-lg mx-auto p-8 glass-card rounded-xl shadow-lg mb-8 bg-white/50 backdrop-blur-sm border border-gray-100">
          <h2 className="text-2xl font-semibold mb-4">Ready to Cast Your Vote?</h2>
          <p className="text-gray-600 mb-6">
            Join our blockchain-powered voting system and make your voice heard securely and transparently.
          </p>
          <Button
            onClick={() => navigate(isAuthenticated ? '/vote' : '/auth')}
            className="w-full py-6 text-lg font-medium transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl"
          >
            <VoteIcon className="mr-2 h-5 w-5" />
            {isAuthenticated ? 'Continue to Voting' : 'Get Started'}
          </Button>
        </div>

        <div className="flex justify-center gap-8 text-sm text-gray-500">
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            Blockchain Active
          </span>
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            Secure Connection
          </span>
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-500"></div>
            Real-time Updates
          </span>
        </div>
      </div>
    </div>
  );
}
