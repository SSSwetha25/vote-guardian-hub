
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { VoteCard } from "@/components/VoteCard";

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
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto mt-16">
        <VoteCard
          questionId={sampleQuestion.id}
          question={sampleQuestion.question}
          options={sampleQuestion.options}
        />
      </div>
    </div>
  );
}
