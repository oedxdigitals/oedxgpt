"use client";

import { useEffect, useState, useRef } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import MessageBubble from "@/components/MessageBubble";
import { streamChat } from "@/lib/chat-stream";

type Message = {
  role: "user" | "assistant";
  content: string;
  streaming?: boolean;
};

export default function ChatPage() {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetch("/api/chats")
      .then((r) => r.json())
      .then(setChats);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: input,
    };

    const assistantMessage: Message = {
      role: "assistant",
      content: "",
      streaming: true,
    };

    const updatedMessages = [...messages, userMessage, assistantMessage];

    setMessages(updatedMessages);
    setInput("");
    setIsTyping(true);

    await streamChat(updatedMessages, (chunk) => {
      setMessages((prev) => {
        const copy = [...prev];
        const last = copy[copy.length - 1];
        last.content += chunk;
        return copy;
      });
    });

    setMessages((prev) => {
      const copy = [...prev];
      copy[copy.length - 1].streaming = false;
      return copy;
    });

    setIsTyping(false);
  };

  return (
    <div className="flex h-screen">
      
      {/* Sidebar */}
      <Sidebar
        chats={chats}
        activeChat={activeChat}
        setActiveChat={setActiveChat}
      />

      {/* Main Area */}
      <div className="flex-1 flex flex-col">

        <Header />

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, i) => (
            <MessageBubble key={i} message={msg} />
          ))}

          {isTyping && (
            <div className="text-gray-400 text-sm">
              OEDX AI is typing...
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input Box */}
        <div className="p-3 border-t flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 rounded bg-gray-800 text-white"
            placeholder="Ask OEDX AI..."
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />

          <button
            onClick={handleSend}
            className="px-4 py-2 bg-blue-600 rounded text-white"
          >
            Send
          </button>
        </div>

      </div>
    </div>
  );
}
