import { useState, useRef, useEffect, useContext } from "react";
import { Send, Bot, User } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ThemeContext } from "../App";
import API_URL from "../Api";

export function Ask_Ai() {
  const {theme} = useContext(ThemeContext)
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isSending) return;

    const userMessage = {
      id: Date.now().toString(),
      type: "user",
      text: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input.trim();
    setInput("");
    setIsSending(true);

    const loadingId = (Date.now() + 1).toString();
    setMessages((prev) => [
      ...prev,
      { id: loadingId, type: "ai", text: "", isLoading: true },
    ]);

    try {
      const url = `${API_URL}/api/ai/ask-ai`;   // Make sure this matches your route

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
       
        body: JSON.stringify({
          messages: currentInput   // ← This now matches backend destructuring
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      // Handle both { text: "..." } and possible { error: "..." }
      const aiText = data.text || data.error || "Sorry, no response from AI.";

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === loadingId
            ? { ...msg, text: aiText, isLoading: false }
            : msg
        )
      );
    } catch (err) {
      console.error("AI request failed:", err);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === loadingId
            ? {
                ...msg,
                text: "Sorry - there was an error connecting to the AI. Please try again later.",
                isLoading: false,
              }
            : msg
        )
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className={`flex flex-col h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}>
      {/* HEADER */}
      <header className={`p-4 shadow-md flex items-center gap-3 ${
          theme === "dark" 
            ? "bg-gray-800 text-white" 
            : "bg-gradient-to-r from-blue-700 to-indigo-700 text-white"
        }`}>
        <div className="bg-white rounded-full p-2.5">
          <Bot className="text-indigo-700" size={28} />
        </div>
        <div>
          <h1 className="font-bold text-xl">Academic AI Assistant</h1>
          <p className="text-sm opacity-90">Helping students succeed</p>
        </div>
      </header>

      {/* MESSAGES AREA */}
      <main className={`flex-1 overflow-y-auto p-5 space-y-5 ${
        theme === "dark" 
          ? "bg-gray-900 bg-gradient-to-b from-gray-900 to-gray-800"
          : "bg-gradient-to-b from-gray-50 to-gray-100"
      }`}>
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-600">
            <Bot className="text-indigo-500 opacity-60" size={64} />
            <h2 className="mt-5 text-xl font-semibold text-gray-500">
              Welcome to your Academic Assistant
            </h2>
            <p className="mt-2 max-w-md text-gray-600">
              Ask anything about CGPA improvement, study strategies, course choices, exam prep, or academic planning.
            </p>
            <p className="mt-4 text-sm text-gray-500">
              Example: "What grades do I need next semester to reach First Class?"
            </p>
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.type === "ai" && (
              <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Bot size={20} className="text-indigo-700" />
              </div>
            )}

            <div
              className={`p-3.5 rounded-2xl text-[15px] leading-relaxed shadow-sm max-w-[80%] ${
                msg.type === "user"
  ? "bg-indigo-600 text-white rounded-br-none"
  : "bg-white border border-gray-200 rounded-bl-none prose prose-slate prose-sm" }`}
            >
              {msg.isLoading ? (
                <div className="flex items-center gap-1.5 py-1 px-2">
                  <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-pulse" />
                  <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-pulse [animation-delay:150ms]" />
                  <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-pulse [animation-delay:300ms]" />
                </div>
              ) : (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
              )}
            </div>

            {msg.type === "user" && (
              <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <User size={20} className="text-white" />
              </div>
            )}
          </div>
        ))}

        <div ref={messagesEndRef} />
      </main>

      {/* INPUT AREA */}
      <footer className={`${theme === 'dark' ? "bg-gray-800": "bg-white"} border-t border-gray-200 p-4 shadow-inner`}>
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <input
                 type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Ask anything about your studies... (Enter to send)"
            className={`flex-1 px-5 py-3.5 rounded-full shadow-sm transition-all focus:outline-none ${
    theme === "dark"
      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
  }`}
            disabled={isSending}
          />

          <button
            onClick={handleSend}
            disabled={!input.trim() || isSending}
            className={`p-3.5 rounded-full flex items-center justify-center transition-all ${
              input.trim() && !isSending
                ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
            aria-label="Send message"
          >
            <Send size={22} />
          </button>
        </div>

        <p className="text-center text-xs text-gray-400 mt-2.5">
          Conversations are private • Academic guidance only • Verify important decisions
        </p>
      </footer>
    </div>
  );
}