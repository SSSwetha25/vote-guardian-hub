
import { Users, Link, Activity } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface VoteStatsProps {
  progress: number;
}

export function VoteStats({ progress }: VoteStatsProps) {
  return (
    <>
      <div className="max-w-2xl mx-auto mb-8 p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-gray-100 shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-700">Overall Voting Progress</h3>
          <span className="text-sm text-gray-500">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
        <p className="text-xs text-gray-500 mt-2">Based on expected voter turnout</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-12">
        <div className="p-6 rounded-xl bg-gradient-to-br from-white to-purple-50/50 backdrop-blur-sm border border-purple-100/50 shadow-xl shadow-purple-100/20 hover:shadow-2xl hover:shadow-purple-100/30 transition-all duration-300">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-gray-700">Verified Voters</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">127</p>
          <p className="text-sm text-gray-500 mt-1">Registered on blockchain</p>
        </div>

        <div className="p-6 rounded-xl bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm border border-blue-100/50 shadow-xl shadow-blue-100/20 hover:shadow-2xl hover:shadow-blue-100/30 transition-all duration-300">
          <div className="flex items-center gap-3 mb-2">
            <Link className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-gray-700">Blockchain Status</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">Active</p>
          <p className="text-sm text-gray-500 mt-1">Network consensus achieved</p>
        </div>

        <div className="p-6 rounded-xl bg-gradient-to-br from-white to-green-50/50 backdrop-blur-sm border border-green-100/50 shadow-xl shadow-green-100/20 hover:shadow-2xl hover:shadow-green-100/30 transition-all duration-300">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-gray-700">Confirmation Rate</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">99.9%</p>
          <p className="text-sm text-gray-500 mt-1">Transaction success rate</p>
        </div>
      </div>
    </>
  );
}
