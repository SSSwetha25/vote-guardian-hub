
import { useState, useMemo, useEffect } from "react";
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
  const [timeLeft, setTimeLeft] = useState<string>("");
  const { toast } = useToast();
  const { user, addVote, getVotesForQuestion, electionTiming, checkElectionStatus } = useAuth();

  const votes = getVotesForQuestion(questionId);
  const hasVoted = votes.some((vote) => vote.voterId === user?.id);
  const isElectionOver = checkElectionStatus();

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

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const timeDiff = electionTiming.endTime.getTime() - now.getTime();
      
      if (timeDiff <= 0) {
        setTimeLeft("Election Ended");
        checkElectionStatus();
        return;
      }

      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [electionTiming.endTime, checkElectionStatus]);

  const handleVote = () => {
    if (selectedOption && !hasVoted && !isElectionOver) {
      addVote({
        questionId,
        optionId: selectedOption,
      });
      
      toast({
        title: "Vote Submitted!",
        description: "Your vote has been successfully recorded.",
      });
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-8 glass-card rounded-xl fade-in">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">{question}</h3>
        <div className="text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
          {timeLeft}
        </div>
      </div>
      
      {!isElectionOver ? (
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
          <Button
            onClick={handleVote}
            className="w-full mt-6 btn-primary"
            disabled={!selectedOption || hasVoted}
          >
            {hasVoted ? "Vote Submitted" : "Submit Vote"}
          </Button>
          {hasVoted && (
            <p className="text-sm text-center text-gray-500 mt-4">
              Results will be displayed when the election ends
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-4 mb-4 bg-primary/10 rounded-lg">
            <h4 className="font-semibold text-center mb-2">Election Results</h4>
            <p className="text-sm text-center text-gray-600">
              Total Votes Cast: {votes.length}
            </p>
          </div>
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
        </div>
      )}
    </div>
  );
}
