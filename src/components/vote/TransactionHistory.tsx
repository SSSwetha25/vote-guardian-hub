
import { History, Activity } from "lucide-react";
import type { Block } from "@/lib/auth";

interface TransactionHistoryProps {
  blockchain: Block[];
}

export function TransactionHistory({ blockchain }: TransactionHistoryProps) {
  return (
    <div className="max-w-3xl mx-auto mb-8 mt-8">
      <div className="p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-gray-100 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Recent Transactions</h3>
          <History className="w-5 h-5 text-gray-400" />
        </div>
        <div className="space-y-3">
          {blockchain.slice(-3).reverse().map((block, index) => (
            <div key={block.hash} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Activity className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Vote Recorded</p>
                  <p className="text-xs text-gray-500">Block #{blockchain.length - 3 + index}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500">
                {new Date(block.timestamp).toLocaleTimeString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
