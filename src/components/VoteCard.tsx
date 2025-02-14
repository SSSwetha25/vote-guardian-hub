
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/lib/auth";
import { Progress } from "@/components/ui/progress";

interface Option {
  id: string;
  text: string;
}

interface VoteCardProps {
  question: string;
  questionId: string;
  options: Option[];
}

export function VoteCard({ question, questionId, options }: VoteCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();
  const { user, addVote, getVotesForQuestion } = useAuth();

  const votes = getVotesForQuestion(questionId);
  const hasVoted = votes.some((vote) => vote.voterId === user?.id);

  const results = useMemo(() => {
    const totalVotes = votes.length;
    return options.map((option) => {
      const optionVotes = votes.filter((vote) => vote.optionId === option.id).length;
      const percentage = totalVotes === 0 ? 0 : (optionVotes / totalVotes) * 100;
      return {
        ...option,
        votes: optionVotes,
        percentage: Math.round(percentage),
      };
    });
  }, [votes, options]);

  const handleVote = () => {
    if (selectedOption && !hasVoted) {
      addVote({
        questionId,
        optionId: selectedOption,
      });
      
      toast({
        title: "Vote Submitted!",
        description: "Your vote has been successfully recorded.",
      });
      
      setShowResults(true);
    }
  };

  const toggleResults = () => {
    setShowResults(!showResults);
  };

  return (
    <div className="w-full max-w-lg mx-auto p-8 glass-card rounded-xl fade-in">
      <h3 className="text-xl font-semibold mb-6">{question}</h3>
      
      {!showResults ? (
        <div className="space-y-3">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => !hasVoted && setSelectedOption(option.id)}
              className={`w-full p-4 rounded-lg transition-all duration-200 ${
                selectedOption === option.id
                  ? "bg-primary/10 border-primary"
                  : "bg-white border-gray-200 hover:bg-gray-50"
              } border ${hasVoted ? "cursor-not-allowed" : "cursor-pointer"}`}
              disabled={hasVoted}
            >
              {option.text}
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {results.map((option) => (
            <div key={option.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{option.text}</span>
                <span className="text-sm text-gray-500">
                  {option.votes} votes ({option.percentage}%)
                </span>
              </div>
              <Progress value={option.percentage} className="h-2" />
            </div>
          ))}
          <p className="text-sm text-gray-500 text-center mt-4">
            Total Votes: {votes.length}
          </p>
        </div>
      )}

      <div className="flex gap-4 mt-6">
        {!hasVoted ? (
          <Button
            onClick={handleVote}
            className="flex-1 btn-primary"
            disabled={!selectedOption || hasVoted}
          >
            Submit Vote
          </Button>
        ) : (
          <Button
            onClick={toggleResults}
            className="flex-1 btn-primary"
          >
            {showResults ? "Hide Results" : "Show Results"}
          </Button>
        )}
      </div>
    </div>
  );
}
