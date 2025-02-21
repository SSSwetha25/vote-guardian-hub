
import { Info } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function VotingInfoBanner() {
  const { toast } = useToast();

  const showVotingRules = () => {
    toast({
      title: "Blockchain Voting Rules",
      description: "1. Each vote is recorded as an immutable transaction\n2. Votes are cryptographically secured\n3. Full transparency with anonymous voting",
    });
  };

  return (
    <div className="max-w-3xl mx-auto mb-8 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-100 flex items-center gap-3 shadow-lg shadow-emerald-100/20">
      <Info className="w-5 h-5 text-emerald-500" />
      <p className="text-emerald-700 text-sm">
        Your vote will be cryptographically secured on the blockchain. Learn more about our{" "}
        <button onClick={showVotingRules} className="text-emerald-600 underline hover:text-emerald-800 font-medium">
          voting protocol
        </button>
      </p>
    </div>
  );
}
