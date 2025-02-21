
import { Shield, Lock, Link } from "lucide-react";

export function SystemStatus() {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-100 shadow-sm">
        <Shield className="w-4 h-4" />
        <span className="text-sm font-medium">Cryptographically Secured</span>
      </div>
      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-100 shadow-sm">
        <Lock className="w-4 h-4" />
        <span className="text-sm font-medium">Zero-Knowledge Proof</span>
      </div>
      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-50 to-fuchsia-50 text-purple-700 border border-purple-100 shadow-sm">
        <Link className="w-4 h-4" />
        <span className="text-sm font-medium">Consensus Active</span>
      </div>
    </div>
  );
}
