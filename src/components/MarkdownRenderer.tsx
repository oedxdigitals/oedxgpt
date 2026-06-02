import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { useState } from "react";

function CodeBlock({ children }: any) {
  const copy = async () => {
    await navigator.clipboard.writeText(String(children));
  };

  return (
    <div className="relative bg-black rounded-lg overflow-hidden">
      <button
        onClick={copy}
        className="absolute top-2 right-2 text-xs bg-gray-800 px-2 py-1 rounded"
      >
        Copy
      </button>

      <pre className="p-3 overflow-x-auto">
        <code>{children}</code>
      </pre>
    </div>
  );
}

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          code({ inline, children }: any) {
            return inline ? (
              <code className="bg-gray-800 px-1 py-0.5 rounded">
                {children}
              </code>
            ) : (
              <CodeBlock>{children}</CodeBlock>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
