
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { VoteCard } from "@/components/VoteCard";
import { Users, ListChecks, Vote } from "lucide-react";

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

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="max-w-3xl mx-auto mb-16 text-center animate-fadeIn">
          <div className="inline-block p-3 rounded-full bg-primary/10 text-primary mb-4">
            <Vote className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Online Voting System
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Welcome back, {user?.name}! Your vote matters.
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-12">
            <div className="p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-gray-700">Total Voters</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900">127</p>
              <p className="text-sm text-gray-500 mt-1">Registered participants</p>
            </div>

            <div className="p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-3 mb-2">
                <ListChecks className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-gray-700">Active Polls</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900">1</p>
              <p className="text-sm text-gray-500 mt-1">Currently running</p>
            </div>
          </div>
        </div>

        {/* Voting Card */}
        <VoteCard
          questionId={sampleQuestion.id}
          question={sampleQuestion.question}
          options={sampleQuestion.options}
        />

        {/* Footer */}
        <footer className="text-center mt-16 text-sm text-gray-500">
          <p>© 2024 Online Voting System. All rights reserved.</p>
          <p className="mt-2">Secure • Transparent • Reliable</p>
        </footer>
      </div>
    </div>
  );
}
