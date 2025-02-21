import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/lib/auth";
import { Progress } from "@/components/ui/progress";
import { Timer, CheckCircle, AlertCircle, Award, BarChart2 } from "lucide-react";

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
  const [isProcessing, setIsProcessing] = useState(false);
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
    }).sort((a, b) => b.percentage - a.percentage);
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

  const handleVote = async () => {
    if (selectedOption && !hasVoted && !isElectionOver) {
      setIsProcessing(true);
      
      toast({
        title: "Processing Vote",
        description: "Your vote is being added to the blockchain...",
      });

      const success = await addVote({
        questionId,
        optionId: selectedOption,
      });

      if (success) {
        toast({
          title: "Vote Confirmed!",
          description: "Your vote has been successfully recorded on the blockchain.",
        });
      } else {
        toast({
          title: "Vote Failed",
          description: "There was an error recording your vote. Please try again.",
          variant: "destructive",
        });
      }

      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-8 glass-card rounded-xl shadow-lg animate-fadeIn">
      <div className="flex justify-between items-center mb-8">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-800">{question}</h3>
          <p className="text-sm text-gray-500 mt-1">
            {hasVoted ? "Thank you for voting!" : "Select your choice and submit"}
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium">
          <Timer className="w-4 h-4" />
          <span className="text-sm">{timeLeft}</span>
        </div>
      </div>
      
      {!isElectionOver ? (
        <div className="space-y-4">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => !hasVoted && !isProcessing && setSelectedOption(option.id)}
              className={`w-full p-5 rounded-lg transition-all duration-300 transform hover:scale-[1.02] ${
                selectedOption === option.id
                  ? "bg-primary/10 border-primary shadow-md translate-y-[-2px]"
                  : "bg-white/50 border-gray-200 hover:bg-gray-50/80 hover:border-primary/30"
              } border-2 ${hasVoted || isProcessing ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
              disabled={hasVoted || isProcessing}
            >
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                  selectedOption === option.id 
                    ? "border-primary bg-primary scale-110" 
                    : "border-gray-300"
                }`} />
                <span className="text-lg">{option.text}</span>
              </div>
            </button>
          ))}
          
          <div className="mt-8">
            <Button
              onClick={handleVote}
              className={`w-full py-6 text-lg font-medium transition-all duration-300 ${
                hasVoted ? "bg-green-600" : "hover:scale-[1.02] shadow-lg hover:shadow-xl"
              }`}
              disabled={!selectedOption || hasVoted || isProcessing}
            >
              <div className="flex items-center justify-center gap-2">
                {isProcessing ? (
                  <>
                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                    <span>Mining Block...</span>
                  </>
                ) : hasVoted ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>Vote Confirmed</span>
                  </>
                ) : (
                  <>
                    {selectedOption ? "Sign & Submit Vote" : "Select an option"}
                  </>
                )}
              </div>
            </Button>
            
            {hasVoted && (
              <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500 animate-fadeIn">
                <AlertCircle className="w-4 h-4" />
                <p>Transaction confirmed in latest block</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-6 rounded-lg bg-primary/10 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-2 mb-3">
              <BarChart2 className="w-5 h-5 text-primary" />
              <h4 className="text-xl font-bold text-gray-800">Final Results</h4>
            </div>
            <p className="text-sm text-center text-gray-600">
              Total Votes Cast: {votes.length}
            </p>
          </div>
          
          {results.map((option, index) => (
            <div key={option.id} 
              className={`p-4 rounded-lg border-2 transition-all duration-500 animate-slideIn ${
                index === 0 && option.percentage > 0 
                  ? "border-primary/30 bg-primary/5 shadow-lg" 
                  : "border-gray-100 hover:border-gray-200"
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  {index === 0 && option.percentage > 0 && (
                    <Award className="w-5 h-5 text-primary animate-pulse" />
                  )}
                  <span className="font-medium">{option.text}</span>
                </div>
                <span className="text-sm font-medium">
                  {option.votes} votes ({option.percentage}%)
                </span>
              </div>
              <Progress 
                value={option.percentage} 
                className="h-3 rounded-full transition-all duration-500"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
