
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { VoteCard } from "@/components/VoteCard";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

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

export default function VoteQuestion() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-purple-50/30">
      <div className="container mx-auto px-4 py-12">
        <Button 
          variant="ghost" 
          className="mb-8" 
          onClick={() => navigate("/vote")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        
        <VoteCard
          questionId={sampleQuestion.id}
          question={sampleQuestion.question}
          options={sampleQuestion.options}
        />
      </div>
    </div>
  );
}
