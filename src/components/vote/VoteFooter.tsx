
export function VoteFooter() {
  return (
    <footer className="text-center mt-16 text-sm text-gray-500">
      <p>© 2024 Blockchain Voting System. All rights reserved.</p>
      <p className="mt-2">Decentralized • Transparent • Immutable</p>
      <div className="flex justify-center gap-4 mt-4">
        <button className="text-gray-500 hover:text-primary transition-colors">Smart Contract</button>
        <button className="text-gray-500 hover:text-primary transition-colors">Network Status</button>
        <button className="text-gray-500 hover:text-primary transition-colors">FAQ</button>
      </div>
    </footer>
  );
}
