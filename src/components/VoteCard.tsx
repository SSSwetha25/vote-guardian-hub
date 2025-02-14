
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface Option {
  id: string;
  text: string;
}

interface VoteCardProps {
  question: string;
  options: Option[];
}

export function VoteCard({ question, options }: VoteCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const { toast } = useToast();

  const handleVote = () => {
    if (selectedOption) {
      setHasVoted(true);
      toast({
        title: "Vote Submitted!",
        description: "Your vote has been successfully recorded.",
      });
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-8 glass-card rounded-xl fade-in">
      <h3 className="text-xl font-semibold mb-6">{question}</h3>
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
      <Button
        onClick={handleVote}
        className="w-full mt-6 btn-primary"
        disabled={!selectedOption || hasVoted}
      >
        {hasVoted ? "Vote Submitted" : "Submit Vote"}
      </Button>
    </div>
  );
}
