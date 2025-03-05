
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Send, MessageSquare } from "lucide-react";

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
};

const botResponses = [
  { keywords: ["hello", "hi", "hey"], response: "Hello! How can I help you today?" },
  { keywords: ["vote", "voting", "cast"], response: "To cast your vote, go to the 'Cast Your Vote' button and follow the prompts." },
  { keywords: ["blockchain", "secure"], response: "Your vote is secured using blockchain technology, ensuring it cannot be tampered with." },
  { keywords: ["id", "voter id"], response: "Your Voter ID is a unique identifier that allows you to participate in the election." },
  { keywords: ["when", "time", "deadline"], response: "Please check the countdown timer at the top of the voting page for the remaining time." },
  { keywords: ["problem", "issue", "help"], response: "If you're experiencing technical issues, please use the 'Technical Support' section on the voting page." },
  { keywords: ["thank", "thanks"], response: "You're welcome! Is there anything else I can help you with?" },
  { keywords: ["who", "candidate", "candidates"], response: "You can view all the candidates and their information on the voting question page." },
];

export function ChatbotModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! I'm VoteBot. How can I help you today?", sender: "bot" },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    const newUserMessage = { id: Date.now(), text: message, sender: "user" as const };
    setMessages((prev) => [...prev, newUserMessage]);
    setMessage("");

    // Generate bot response
    setTimeout(() => {
      const botMessage = getBotResponse(message);
      setMessages((prev) => [...prev, { id: Date.now(), text: botMessage, sender: "bot" }]);
    }, 500);
  };

  const getBotResponse = (userMessage: string) => {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    // Check for keyword matches
    for (const item of botResponses) {
      if (item.keywords.some(keyword => lowerCaseMessage.includes(keyword))) {
        return item.response;
      }
    }
    
    // Default response if no keywords match
    return "I'm not sure I understand. Could you please rephrase your question?";
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 rounded-full w-12 h-12 p-0 shadow-lg hover:shadow-xl bg-primary text-white"
      >
        <MessageSquare className="h-6 w-6" />
        <span className="sr-only">Open Chatbot</span>
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 h-[80vh] flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-semibold text-lg">VoteBot Assistant</h3>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      msg.sender === "user"
                        ? "bg-primary text-white rounded-br-none"
                        : "bg-gray-100 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button type="submit">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
