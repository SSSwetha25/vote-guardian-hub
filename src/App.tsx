
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Index from "@/pages/Index";
import Vote from "@/pages/Vote";
import VoteQuestion from "@/pages/VoteQuestion";
import Auth from "@/pages/Auth";
import NotFound from "@/pages/NotFound";
import { Header } from "@/components/Header";
import { ChatbotModal } from "@/components/vote/ChatbotModal";

import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/vote" element={<Vote />} />
        <Route path="/vote-question" element={<VoteQuestion />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ChatbotModal />
      <Toaster />
    </Router>
  );
}

export default App;
