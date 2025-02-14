
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export function AuthForm() {
  const [name, setName] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      login(name);
      toast({
        title: "Welcome!",
        description: "You have successfully logged in.",
      });
      navigate('/vote');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 glass-card rounded-xl fade-in">
      <h2 className="text-2xl font-semibold text-center mb-6">Welcome Back</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="auth-input"
            required
          />
        </div>
        <Button type="submit" className="w-full btn-primary">
          Continue
        </Button>
      </form>
    </div>
  );
}
