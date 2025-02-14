
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => navigate('/')} 
            className="text-xl font-semibold tracking-tight hover:opacity-80 transition-opacity"
          >
            VoteGuardian
          </button>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
                <Button
                  variant="ghost"
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                onClick={() => navigate('/auth')}
                variant="ghost"
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
