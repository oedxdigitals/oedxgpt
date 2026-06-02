"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MessageBubble({ message }: any) {
  return (
    <div className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
      <div className="max-w-[75%] p-3 rounded-lg bg-gray-800 text-white">
        
        {message.content}

        {message.streaming && (
          <span className="inline-flex gap-1 ml-2">
            <span className="animate-bounce">.</span>
            <span className="animate-bounce delay-75">.</span>
            <span className="animate-bounce delay-150">.</span>
          </span>
        )}

      </div>
    </div>
  );
}
