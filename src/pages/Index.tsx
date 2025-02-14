
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";

export default function Index() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="max-w-3xl mx-auto fade-in">
        <h1 className="text-4xl font-bold mb-6">
          Welcome to VoteGuardian
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Secure, transparent, and easy-to-use voting platform
        </p>
        <Button
          onClick={() => navigate(isAuthenticated ? '/vote' : '/auth')}
          className="btn-primary text-lg"
        >
          {isAuthenticated ? 'Start Voting' : 'Get Started'}
        </Button>
      </div>
    </div>
  );
}
