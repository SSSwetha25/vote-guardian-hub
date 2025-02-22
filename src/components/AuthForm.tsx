
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export function AuthForm() {
  const [name, setName] = useState("");
  const [voterId, setVoterId] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && voterId.trim()) {
      login(name);
      toast({
        title: "Welcome!",
        description: "You have successfully logged in.",
      });
      navigate('/vote');
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow letters and spaces
    if (value === '' || /^[A-Za-z\s]*$/.test(value)) {
      setName(value);
    }
  };

  const handleVoterIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers
    if (value === '' || /^\d*$/.test(value)) {
      setVoterId(value);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 glass-card rounded-xl fade-in">
      <h2 className="text-2xl font-semibold text-center mb-6">Welcome Back</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={handleNameChange}
            className="auth-input"
            required
            pattern="[A-Za-z\s]+"
            title="Please enter only letters and spaces"
          />
        </div>
        <div>
          <label htmlFor="voterId" className="block text-sm font-medium text-gray-700 mb-1">
            Voter ID
          </label>
          <Input
            id="voterId"
            type="text"
            placeholder="Enter your voter ID"
            value={voterId}
            onChange={handleVoterIdChange}
            className="auth-input"
            required
            pattern="\d+"
            title="Please enter only numbers"
          />
        </div>
        <Button type="submit" className="w-full btn-primary">
          Continue
        </Button>
      </form>
    </div>
  );
}
