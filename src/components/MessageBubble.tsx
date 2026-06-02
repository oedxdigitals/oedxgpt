"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MessageBubble({
  role,
  content
}:any){

  return (

    <div
      className={
        role==="user"
          ? "text-right"
          : "text-left"
      }
    >

      <div className="rounded-xl p-4">

        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
        >
          {content}
        </ReactMarkdown>

      </div>

    </div>

  );
}
