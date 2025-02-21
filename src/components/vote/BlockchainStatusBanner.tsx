
import { Link, Database } from "lucide-react";

export function BlockchainStatusBanner() {
  return (
    <div className="max-w-3xl mx-auto mb-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100 shadow-lg shadow-blue-100/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link className="w-5 h-5 text-blue-500 animate-pulse" />
          <p className="text-blue-700 text-sm font-medium">
            Connected to Blockchain Network
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-blue-600 bg-white/80 px-3 py-1 rounded-full shadow-sm">
          <Database className="w-4 h-4" />
          <span>Latest Block: #14,532</span>
        </div>
      </div>
    </div>
  );
}
