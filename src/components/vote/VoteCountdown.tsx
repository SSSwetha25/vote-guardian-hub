
import { Timer } from "lucide-react";

export function VoteCountdown() {
  return (
    <div className="max-w-3xl mx-auto mb-8">
      <div className="p-6 rounded-xl bg-gradient-to-r from-primary/5 to-purple-400/5 border border-primary/10 shadow-lg">
        <div className="flex items-center justify-center gap-4">
          <Timer className="w-6 h-6 text-primary" />
          <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
            {[
              { value: 24, label: 'hours' },
              { value: 35, label: 'min' },
              { value: 12, label: 'sec' },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col">
                <span className="countdown font-mono text-2xl text-primary">
                  <span style={{ '--value': value } as any}>{value}</span>
                </span>
                <span className="text-xs text-gray-500">{label}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-center text-sm text-gray-600 mt-4">
          Time remaining until voting closes
        </p>
      </div>
    </div>
  );
}
